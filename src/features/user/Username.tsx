import { useSelector } from 'react-redux';
import { getUserName } from './userSlice';

function Username() {
  const userName = useSelector(getUserName);
  return (
    <div className="text-sm font-semibold hidden md:block">{userName}</div>
  );
}

export default Username;
