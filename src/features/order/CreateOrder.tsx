import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { NewOrderErrors, NewOrderType } from '../../types';
import { APP_ROUTS } from '../../const';
import Button from '../../UI/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData() as NewOrderErrors;
  const nav = useNavigation();
  const isSubmitting = nav.state === 'submitting';

  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className="input" />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input" />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required className="input" />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Receiving order...' : 'Order now'}
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
  return redirect(`${APP_ROUTS.ORDER}/${newOrder.id}`);
}
