import { render, screen } from '@testing-library/react';
import Container from './Container';

test('Should render children elements', () => {
  const element = <div>hello</div>;

  render(<Container>{element}</Container>);

  const children = screen.getByText('hello');
  expect(children).toBeInTheDocument();
});
