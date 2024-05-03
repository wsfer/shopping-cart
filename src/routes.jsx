import App from './App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:category', element: <Products /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
];

export default routes;
