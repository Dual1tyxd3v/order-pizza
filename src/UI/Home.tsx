import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import { StoreType } from '../store';
import Button from './Button';
import { APP_ROUTS } from '../const';

function Home() {
  const { userName } = useSelector((state: StoreType) => state.user);
  return (
    <div className="text-center my-10 sm:my-16 px-4">
      <h1 className="text-xl text-stone-700 mb-8 font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <Button type="primary" to={APP_ROUTS.MENU}>
          Continue ordering, {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
