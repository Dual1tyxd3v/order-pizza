import { useSelector } from 'react-redux';
import { StoreType } from '../../store';

function Username() {
  const { userName } = useSelector((state: StoreType) => state.user);
  return (
    <div className="text-sm font-semibold hidden md:block">{userName}</div>
  );
}

export default Username;
