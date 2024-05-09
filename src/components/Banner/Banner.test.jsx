import { render, screen } from '@testing-library/react';
import Banner from './Banner';

test('Should display an acessible heading', () => {
  render(<Banner title="Hello" />);
  const heading = screen.getByRole('heading', { name: 'Hello' });
  expect(heading).toBeInTheDocument();
});

test('Should have image url as background', () => {
  const { container } = render(<Banner title="cats" image="cats.png" />);
  const banner = container.firstChild;
  expect(banner).toHaveStyle(
    'background-image: linear-gradient(var(--opaque-dark), var(--opaque-dark)), url(cats.png)'
  );
});
