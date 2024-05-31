import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// Render popup opened
const setup = (onAccept, onRefuse, onClose) => {
  const popup = createRef();

  render(
    <Popup
      ref={popup}
      onAccept={onAccept}
      onRefuse={onRefuse}
      onClose={onClose}
    >
      <div data-testid="children">Hello</div>
    </Popup>
  );

  popup.current.showModal();

  return popup;
};

test('Should render children components', () => {
  setup();
  const children = screen.getByTestId('children');
  expect(children).toBeVisible();
});

describe('When onAccept function is defined', () => {
  test('should render accept button to call that function', async () => {
    const onAccept = vi.fn();
    const user = userEvent.setup();

    setup(onAccept);

    const acceptBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(acceptBtn);
    expect(onAccept).toHaveBeenCalled();
  });
});

describe('When onRefuse is defined', () => {
  test('should render refuse button to call that function', async () => {
    const onRefuse = vi.fn();
    const user = userEvent.setup();

    setup(undefined, onRefuse);

    const refuseBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(refuseBtn);
    expect(onRefuse).toHaveBeenCalled();
  });
});

describe('When onClose is defined', () => {
  test('cancel button should call that function', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    setup(undefined, undefined, onClose);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});

describe('When event functions are undefined', () => {
  test('should render only close button', () => {
    setup();
    const closeBtn = screen.queryByRole('button', { name: /close/i });
    const acceptBtn = screen.queryByRole('button', { name: /confirm/i });
    const refuseBtn = screen.queryByRole('button', { name: /cancel/i });

    expect(closeBtn).toBeInTheDocument();
    expect(acceptBtn).toBeNull();
    expect(refuseBtn).toBeNull();
  });
});
