import LinkButton from '../../UI/LinkButton';
import { APP_ROUTS } from '../../const';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';

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

function Cart() {
  const { userName } = useSelector((state: StoreType) => state.user);
  const cart = fakeCart;

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
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
