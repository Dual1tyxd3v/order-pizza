import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './UI/Home';
import Menu, {loader as menuLoader} from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './UI/AppLayout';
import NotFound from './UI/Error';

const router = createBrowserRouter([
  { element: <AppLayout />, children: [
    { path: '/', element: <Home /> },
    { path: '/menu', element: <Menu />, errorElement: <NotFound />, loader: menuLoader },
    { path: '/cart', element: <Cart /> },
    { path: '/order/:id', element: <Order /> },
    { path: '/order/new', element: <CreateOrder /> },
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
