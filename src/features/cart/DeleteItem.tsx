import Button from '../../UI/Button';
import { useCallback } from 'react';
import { deleteItem } from './cartSlice';
import { useAppDispatch } from '../../store';

type DeleteItemProps = {
  id: number;
};

function DeleteItem({ id }: DeleteItemProps) {
  const dispatch = useAppDispatch();

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
