import { render, screen } from '@testing-library/react';
import CardList from './CardList';

test('Should render all cards', () => {
  const cards = [
    <div data-testid="one" key="1">
      card
    </div>,
    <article data-testid="two" key="2">
      card
    </article>,
  ];

  render(<CardList size="100px">{cards}</CardList>);
  const cardOne = screen.getByTestId('one');
  const cardTwo = screen.getByTestId('two');

  expect(cardOne).toBeInTheDocument();
  expect(cardTwo).toBeInTheDocument();
});
