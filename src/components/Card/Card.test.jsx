import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

vi.mock('../Quantity/Quantity', () => {
  return {
    default: () => <input data-testid="input" />,
  };
});

vi.mock('../Rating/Rating', () => {
  return {
    default: () => <div data-testid="rating"></div>,
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
};

describe('Card textual content', () => {
  test('should display an heading with product title', () => {
    render(<Card product={fakeProduct} addToCart={() => {}} />);
    const heading = screen.getByRole('heading', { name: fakeProduct.title });
    expect(heading).toBeInTheDocument();
  });

  test('should display product description', () => {
    render(<Card product={fakeProduct} addToCart={() => {}} />);
    const description = screen.getByText(fakeProduct.description);
    expect(description).toBeInTheDocument();
  });

  test('should display product price on format: $ 12.34', () => {
    render(<Card product={fakeProduct} addToCart={() => {}} />);
    const price = screen.getByText(`$ ${fakeProduct.price.toFixed(2)}`);
    expect(price).toBeInTheDocument();
  });
});

describe('Card visual content', () => {
  test('should display product image', () => {
    render(<Card product={fakeProduct} addToCart={() => {}} />);
    const image = screen.getByAltText(fakeProduct.title);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(fakeProduct.image);
  });

  test('should render rating component', () => {
    render(<Card product={fakeProduct} addToCart={() => {}} />);
    const rating = screen.getByTestId('rating');
    expect(rating).toBeInTheDocument();
  });
});

describe('Card controls', () => {
  test('should have a button to call addToCart function', async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();

    render(<Card product={fakeProduct} addToCart={addToCart} />);
    const button = screen.getByRole('button', { name: /add/i });

    await user.click(button);
    expect(addToCart).toHaveBeenCalled();
  });

  test('should display quantity input component', () => {
    render(<Card product={fakeProduct} addToCart={() => {}} />);
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });
});
