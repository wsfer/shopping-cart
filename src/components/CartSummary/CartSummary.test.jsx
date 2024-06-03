import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CartSummary from './CartSummary';
import { test } from 'vitest';

const fakeCart = [
  { title: 'product1', price: 13.5, quantity: 1 },
  { title: 'cats', price: 5.54, quantity: 2 },
  { title: 'dogs', price: 3.12, quantity: 4 },
];

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('When cart is empty', () => {
  test('should render a paragraph telling that cart is empty', () => {
    render(<CartSummary products={[]} finishOrder={() => {}} />, {
      wrapper: routerWrapper,
    });

    const paragraph = screen.getByText('Your cart is empty');
    expect(paragraph).toBeInTheDocument();
  });

  test('should render a link to products page', async () => {
    const user = userEvent.setup();

    render(<CartSummary products={[]} finishOrder={() => {}} />, {
      wrapper: routerWrapper,
    });

    const link = screen.getByRole('link', { name: 'Go to store' });
    await user.click(link);
    expect(window.location.pathname).toBe('/products');
  });
});

describe('When cart is not empty', () => {
  test('should render a heading named "Summary"', () => {
    render(<CartSummary products={fakeCart} finishOrder={() => {}} />, {
      wrapper: routerWrapper,
    });

    const heading = screen.getByRole('heading', { name: 'Summary' });
    expect(heading).toBeInTheDocument();
  });

  test('should render subtotal and fee price', () => {
    const expectedTotalPrice = fakeCart
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
      .toFixed(2);

    render(<CartSummary products={fakeCart} finishOrder={() => {}} />, {
      wrapper: routerWrapper,
    });

    const subtotal = screen.getByText('Subtotal:', { exact: false });
    const fee = screen.getByText('Fee:', { exact: false });

    expect(subtotal.textContent).toBe(`Subtotal: $${expectedTotalPrice}`);
    expect(fee.textContent).toBe('Fee: $0.00');
  });

  test('should render a button to call finishOrder function', async () => {
    const finishOrder = vi.fn();
    const user = userEvent.setup();

    render(<CartSummary products={fakeCart} finishOrder={finishOrder} />, {
      wrapper: routerWrapper,
    });

    const button = screen.getByRole('button', { name: 'Finish order' });
    await user.click(button);
    expect(finishOrder).toHaveBeenCalled();
  });
});
