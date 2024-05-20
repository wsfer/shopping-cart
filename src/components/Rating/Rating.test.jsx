import { render, screen } from '@testing-library/react';
import Rating from './Rating';

test('Should render with an accessible label', () => {
  render(<Rating rate={3.7} />);
  const rating = screen.getByLabelText('Rating: 3.7');
  expect(rating).toBeInTheDocument();
});
