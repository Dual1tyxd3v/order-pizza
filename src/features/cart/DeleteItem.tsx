import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { useCallback } from 'react';
import { deleteItem } from './cartSlice';

type DeleteItemProps = {
  id: number;
};

function DeleteItem({ id }: DeleteItemProps) {
  const dispatch = useDispatch();

  const onDeleteHandle = useCallback(() => {
    dispatch(deleteItem(id));
  }, [dispatch, id]);

  return (
    <Button type="small" click={onDeleteHandle}>
      Delete
    </Button>
  );
}

export default DeleteItem;
