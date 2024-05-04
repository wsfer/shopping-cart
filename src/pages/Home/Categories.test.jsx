import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Categories from './Categories';

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

test('Should display an heading', () => {
  render(<Categories />, { wrapper: routerWrapper });
  const heading = getByRole('heading');
  expect(heading).toBeInTheDocument();
});

test('Should have a nav with links to products categories', async () => {
  const user = userEvent.setup();

  render(<Categories />, { wrapper: routerWrapper });
  const nav = screen.getByRole('navigation');
  const menClothes = within(nav).getByRole('link', { name: "Men's clothes" });
  const Jewelry = within(nav).getByRole('link', { name: 'Jewelry' });
  const womenClothes = within(nav).getByRole('link', {
    name: "Women's clothes",
  });

  await user.click(menClothes);
  expect(window.location.pathname).toBe('/products/men-clothes');

  await user.click(Jewelry);
  expect(window.location.pathname).toBe('/products/jewelry');

  await user.click(womenClothes);
  expect(window.location.pathname).toBe('/products/women-clothes');
});
