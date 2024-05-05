import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Should display a link', () => {
  test('To privacy policy', () => {
    render(<Footer />, { wrapper: routerWrapper });
    const link = screen.getByRole('link', { name: /privacy policy/i });
    expect(link).toBeInTheDocument();
  });

  test('To terms of use', () => {
    render(<Footer />, { wrapper: routerWrapper });
    const link = screen.getByRole('link', { name: /terms of use/i });
    expect(link).toBeInTheDocument();
  });
});

describe('Should display a navigation', () => {
  test('Named pages with links to home, products and cart', async () => {
    const user = userEvent.setup();

    render(<Footer />, { wrapper: routerWrapper });
    const nav = screen.getByRole('navigation', { name: /pages/i });
    const homeLink = within(nav).getByRole('link', { name: /home/i });
    const productsLink = within(nav).getByRole('link', { name: /products/i });
    const cartLink = within(nav).getByRole('link', { name: /cart/i });

    await user.click(homeLink);
    expect(window.location.pathname).toBe('/');

    await user.click(productsLink);
    expect(window.location.pathname).toBe('/products');

    await user.click(cartLink);
    expect(window.location.pathname).toBe('/cart');
  });

  test('Named categories with links to products categories', async () => {
    const user = userEvent.setup();

    render(<Footer />, { wrapper: routerWrapper });
    const nav = screen.getByRole('navigation', { name: /categories/i });
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
});
