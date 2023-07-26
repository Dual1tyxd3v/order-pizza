import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { OrderCart } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import { useCallback } from 'react';
import { deleteItem } from './cartSlice';

type CartItemProps = {
  item: OrderCart;
};

function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, totalPrice } = item;

  const onDeleteHandle = useCallback(() => {
    dispatch(deleteItem(pizzaId));
  }, [dispatch, pizzaId]);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" click={onDeleteHandle}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
