import LinkButton from '../../UI/LinkButton';
import { APP_ROUTS } from '../../const';

function EmptyCart() {
  return (
    <div className="py-3 px-4">
      <LinkButton to={APP_ROUTS.MENU}>&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
