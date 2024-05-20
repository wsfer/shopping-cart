import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Sidebar from './Sidebar';

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

test('Should have links within a navigation to products categories', async () => {
  const user = userEvent.setup();

  render(<Sidebar />, { wrapper: routerWrapper });
  const nav = screen.getByRole('navigation', { name: /categories/i });
  const menClothes = within(nav).getByRole('link', {
    name: "Men's clothing",
  });
  const Jewelry = within(nav).getByRole('link', { name: 'Jewelery' });
  const womenClothes = within(nav).getByRole('link', {
    name: "Women's clothing",
  });

  await user.click(menClothes);
  expect(window.location.pathname).toBe('/products/men-clothing');

  await user.click(Jewelry);
  expect(window.location.pathname).toBe('/products/jewelery');

  await user.click(womenClothes);
  expect(window.location.pathname).toBe('/products/women-clothing');
});
