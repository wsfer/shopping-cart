import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartCard from './CartCard';

vi.mock('../Quantity/Quantity', () => {
  return {
    default: () => <input data-testid="input" />,
  };
});

const fakeProduct = {
  id: 123,
  title: 'Product 123',
  price: 77.99,
  description: 'Lorem ipsum dolor sit amet',
  category: 'cats',
  image: 'cat-image.jpg',
  rating: { rate: 3.7, count: 123 },
  quantity: 5,
};

describe('Card textual content', () => {
  test('should display an heading with product title', () => {
    render(
      <CartCard
        product={fakeProduct}
        updateQuantity={() => {}}
        removeProduct={() => {}}
      />
    );

    const heading = screen.getByRole('heading', { name: fakeProduct.title });
    expect(heading).toBeInTheDocument();
  });

  test('should display product price on format: $ 12.34', () => {
    render(
      <CartCard
        product={fakeProduct}
        updateQuantity={() => {}}
        removeProduct={() => {}}
      />
    );

    const price = screen.getByText(`$ ${fakeProduct.price.toFixed(2)}`);
    expect(price).toBeInTheDocument();
  });
});

describe('Card visual content', () => {
  test('should display product image', () => {
    render(
      <CartCard
        product={fakeProduct}
        updateQuantity={() => {}}
        removeProduct={() => {}}
      />
    );

    const image = screen.getByAltText(fakeProduct.title);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(fakeProduct.image);
  });
});

describe('Card controls', () => {
  test('should have a button to delete product', async () => {
    const removeProduct = vi.fn();
    const user = userEvent.setup();

    render(
      <CartCard
        product={fakeProduct}
        updateQuantity={() => {}}
        removeProduct={removeProduct}
      />
    );

    const button = screen.getByRole('button', { name: /delete/i });
    await user.click(button);
    expect(removeProduct).toHaveBeenLastCalledWith(fakeProduct.id);
  });

  test('should render quantity input component', () => {
    render(
      <CartCard
        product={fakeProduct}
        updateQuantity={() => {}}
        removeProduct={() => {}}
      />
    );

    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });
});
