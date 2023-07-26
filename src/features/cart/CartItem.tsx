import { useSelector } from 'react-redux';
import { OrderCart } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';

type CartItemProps = {
  item: OrderCart;
};

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
