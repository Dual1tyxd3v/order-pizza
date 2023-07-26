import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { decreaseQuantity, increaseQuantity } from './cartSlice';

type UpdateItemQuantityProps = {
  id: number;
  currentQuantity: number;
};

function UpdateItemQuantity({ id, currentQuantity }: UpdateItemQuantityProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center md:gap-2">
      <Button type="round" click={() => dispatch(decreaseQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" click={() => dispatch(increaseQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
