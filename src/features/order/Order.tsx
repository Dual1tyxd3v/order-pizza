import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import { MenuType, OrderType } from '../../types';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import { APP_ROUTS } from '../../const';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData() as OrderType;
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load(APP_ROUTS.MENU);
  }, [fetcher]);
  const isLoadingIngredients = fetcher.state === 'loading';

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="main px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50 tracking-wide">
              Priority
            </span>
          )}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((cartItem) => (
          <OrderItem
            key={`order_${cartItem.pizzaId}_${cartItem.name}`}
            item={cartItem}
            isLoadingIngredients={isLoadingIngredients}
            ingredients={
              fetcher.data
                ? ((fetcher.data as MenuType).find(
                    (menuItem) => menuItem.id === cartItem.pizzaId,
                  )?.ingredients as string[])
                : []
            }
          />
        ))}
      </ul>

      <div className="pizza space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export default Order;

type LoaderProps = {
  params: {
    orderId?: string;
  };
};

export async function loader({ params }: LoaderProps) {
  const order = await getOrder(params.orderId as string);
  return order;
}
