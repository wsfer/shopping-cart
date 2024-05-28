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
  const general = within(nav).getByRole('link', { name: 'General' });
  const menClothes = within(nav).getByRole('link', {
    name: "Men's clothing",
  });
  const Jewelry = within(nav).getByRole('link', { name: 'Jewelery' });
  const womenClothes = within(nav).getByRole('link', {
    name: "Women's clothing",
  });

  await user.click(general);
  expect(window.location.pathname).toBe('/products');

  await user.click(menClothes);
  expect(window.location.pathname).toBe('/products/men-clothing');

  await user.click(Jewelry);
  expect(window.location.pathname).toBe('/products/jewelery');

  await user.click(womenClothes);
  expect(window.location.pathname).toBe('/products/women-clothing');
});

/**
 * It's not possible to test CSS properties from CSS files, so the number of classes is tested here
 *    hidden = 2 CSS Classes (default class + hidden class)
 *    visible = 1 CSS Class (default class only)
 *
 * How it's hidden with CSS is irrelevant here
 */
describe('Responsivity functionality', () => {
  describe('On render', () => {
    test('Should render nav toggler button', () => {
      render(<Sidebar />, { wrapper: routerWrapper });
      const toggler = screen.getByRole('button', { name: 'Sidebar' });
      expect(toggler).toBeInTheDocument();
    });

    test('Navigation should be hidden by default with CSS', () => {
      render(<Sidebar />, { wrapper: routerWrapper });
      const nav = screen.getByRole('navigation', { name: /categories/i });
      expect(nav.classList.length).toBe(2); // default class + hidden class
    });
  });

  describe('On interaction', () => {
    test('Nav toggler should show navigation', async () => {
      const user = userEvent.setup();

      render(<Sidebar />, { wrapper: routerWrapper });
      const toggler = screen.getByRole('button', { name: 'Sidebar' });
      const nav = screen.getByRole('navigation', { name: /categories/i });

      await user.click(toggler);
      expect(nav.classList.length).toBe(1); // default class only
    });

    test('Nav toggler should hide navigation again', async () => {
      const user = userEvent.setup();

      render(<Sidebar />, { wrapper: routerWrapper });
      const toggler = screen.getByRole('button', { name: 'Sidebar' });
      const nav = screen.getByRole('navigation', { name: /categories/i });

      await user.click(toggler);
      await user.click(toggler);

      expect(nav.classList.length).toBe(2); // default class + hidden class
    });
  });
});
