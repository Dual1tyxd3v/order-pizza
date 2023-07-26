import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice, getTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalQuantity) return null;

  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
