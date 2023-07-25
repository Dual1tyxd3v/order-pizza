import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder, {
  action as newOrderAction,
} from './features/order/CreateOrder';
import AppLayout from './UI/AppLayout';
import NotFound from './UI/Error';
import { APP_ROUTS } from './const';
// import './App.css';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: APP_ROUTS.MAIN, element: <Home /> },
      {
        path: APP_ROUTS.MENU,
        element: <Menu />,
        errorElement: <NotFound />,
        loader: menuLoader,
      },
      { path: APP_ROUTS.CART, element: <Cart /> },
      {
        path: `${APP_ROUTS.ORDER}/:orderId`,
        element: <Order />,
        errorElement: <NotFound />,
        loader: orderLoader,
      },
      {
        path: APP_ROUTS.NEW_ORDER,
        element: <CreateOrder />,
        action: newOrderAction,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
