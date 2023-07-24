import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { MenuType } from '../../types';

function Menu() {
  const menu = useLoaderData() as MenuType;
  return (
    <>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={`menu_${pizza.id}`} />
      ))}
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
