import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './UI/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/order/:id',
    element: <Order />,
  },
  {
    path: '/order/new',
    element: <CreateOrder />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
