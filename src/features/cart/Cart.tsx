import LinkButton from '../../UI/LinkButton';
import { APP_ROUTS } from '../../const';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { getUserName } from '../user/userSlice';
import { useCallback } from 'react';
import EmptyCart from './EmptyCart';
import { useAppDispatch } from '../../store';

function Cart() {
  const userName = useSelector(getUserName);
  const cart = useSelector(getCart);
  const dispatch = useAppDispatch();

  
  const onClearHandle = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);
  
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to={APP_ROUTS.MENU}>&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((cartItem) => (
          <CartItem
            item={cartItem}
            key={`cart_${cartItem.pizzaId}_${cartItem.name}`}
          />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type="primary" to={APP_ROUTS.NEW_ORDER}>
          Order pizzas
        </Button>
        <Button type="secondary" click={onClearHandle}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
