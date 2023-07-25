import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { MenuType } from '../../types';

function Menu() {
  const menu = useLoaderData() as MenuType;
  return (
    <ul className="divide-y divide-stone-200 px-">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={`menu_${pizza.id}`} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
