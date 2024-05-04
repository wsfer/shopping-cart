import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

test('Logo should be a link to homepage', async () => {
  const user = userEvent.setup();

  render(<Header />, { wrapper: routerWrapper });
  const logo = screen.getByRole('link', { name: /Fashion\s*Store/i });

  await user.click(logo);

  expect(logo).toBeInTheDocument();
});

test('Navbar should have links to home, products and cart', async () => {
  const user = userEvent.setup();

  render(<Header />, { wrapper: routerWrapper });
  const homeLink = screen.getByRole('link', { name: /home/i });
  const productsLink = screen.getByRole('link', { name: /products/i });
  const cartLink = screen.getByRole('link', { name: /cart/i });

  await user.click(homeLink);
  expect(window.location.pathname).toBe('/');

  await user.click(productsLink);
  expect(window.location.pathname).toBe('/products');

  await user.click(cartLink);
  expect(window.location.pathname).toBe('/cart');
});
