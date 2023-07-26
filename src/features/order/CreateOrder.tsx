import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { NewOrderErrors, NewOrderType } from '../../types';
import { APP_ROUTS } from '../../const';
import Button from '../../UI/Button';
import { useSelector } from 'react-redux';
import { formatCurrency, isValidPhone } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store, { StoreType, useAppDispatch } from '../../store';
import { useState } from 'react';

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData() as NewOrderErrors;

  const {
    userName,
    errorMessage,
    status: geolocationStatus,
    address,
    position,
  } = useSelector((state: StoreType) => state.user);
  const totalCartPrice = useSelector(getTotalPrice);
  const cart = useSelector(getCart);
  const dispatch = useAppDispatch();

  const nav = useNavigation();

  if (!cart.length) return <EmptyCart />;

  const isGeoLoading = geolocationStatus === 'loading';

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = nav.state === 'submitting';

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-400">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-400">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-400">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isGeoLoading}
            />
            {errorMessage.length > 0 && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {errorMessage}
              </p>
            )}
          </div>
          {!position?.latitude && !position?.longitude && (
            <span className="absolute right-[3px] z-10 top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isGeoLoading}
                click={() => dispatch(fetchAddress())}
              >
                Get Geolocation
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority ? 'on' : 'off'}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Receiving order...'
              : `Order now (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart as string),
  } as NewOrderType;

  const errors: NewOrderErrors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please enter the correct number!';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`${APP_ROUTS.ORDER}/${newOrder.id}`);
}
