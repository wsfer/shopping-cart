import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import About from './About';

const routerWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

test('Should display an heading', () => {
  render(<About />, { wrapper: routerWrapper });
  const heading = screen.getByRole('heading');
  expect(heading).toBeInTheDocument();
});

test('Should display an image', () => {
  render(<About />, { wrapper: routerWrapper });
  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();
});

test('Should have a link to products', async () => {
  const user = userEvent.setup();

  render(<About />, { wrapper: routerWrapper });
  const link = screen.getByRole('link');

  await user.click(link);
  expect(window.location.pathname).toBe('/products');
});
