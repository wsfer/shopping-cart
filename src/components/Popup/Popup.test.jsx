import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Popup from './Popup';

/**
 * Dialog Element is not yet supported on jsdom on the date of creation of this test
 * https://github.com/jsdom/jsdom/issues/3294
 */

// Workaround to test this component
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function mock() {
    this.open = true;
  });
});

test('Should render children components', () => {
  const ref = createRef();

  render(
    <Popup ref={ref}>
      <div data-testid="children">Hello</div>
    </Popup>
  );

  ref.current.showModal();
  const children = screen.getByTestId('children');
  expect(children).toBeVisible();
});
