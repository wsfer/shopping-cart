import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quantity from './Quantity';

describe('Should display', () => {
  test('a button to decrease quantity', async () => {
    render(<Quantity quantity={1} setQuantity={() => {}} />);
    const button = screen.getByRole('button', { name: /decrease/i });
    expect(button).toBeInTheDocument();
  });

  test('a button to increase quantity', async () => {
    render(<Quantity quantity={1} setQuantity={() => {}} />);
    const button = screen.getByRole('button', { name: /increase/i });
    expect(button).toBeInTheDocument();
  });

  test('an input element', () => {
    render(<Quantity quantity={1} setQuantity={() => {}} />);
    const input = screen.getByLabelText('Quantity');
    expect(input).toBeInTheDocument();
  });
});

describe('Should call setQuantity function correctly', () => {
  test('when user clicks on decrease button', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={5} setQuantity={setQuantity} />);
    const button = screen.getByRole('button', { name: /decrease/i });

    await user.click(button);
    expect(setQuantity).toHaveBeenCalledWith(4);
  });

  test('when user clicks on increase button', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={5} setQuantity={setQuantity} />);
    const button = screen.getByRole('button', { name: /increase/i });

    await user.click(button);
    expect(setQuantity).toHaveBeenCalledWith(6);
  });

  test('when user interact with input element', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={2} setQuantity={setQuantity} />);
    const input = screen.getByLabelText('Quantity');

    await user.type(input, '4');
    expect(setQuantity).toHaveBeenLastCalledWith(24);
  });
});

describe("Shouldn't call setQuantity function", () => {
  test('when quantity is 1 on decrease button interaction', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={1} setQuantity={setQuantity} />);
    const button = screen.getByRole('button', { name: /decrease/i });

    await user.click(button);
    expect(setQuantity).not.toHaveBeenCalled();
  });

  test('when quantity is 999 on increase button interaction', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={999} setQuantity={setQuantity} />);
    const button = screen.getByRole('button', { name: /increase/i });

    await user.click(button);
    expect(setQuantity).not.toHaveBeenCalled();
  });

  test("when typed value isn't an integer on input", async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={5} setQuantity={setQuantity} />);
    const input = screen.getByLabelText('Quantity');

    await user.type(input, 'a');
    expect(setQuantity).not.toHaveBeenCalled();
  });

  test('when typed value is less than 1 on input', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={5} setQuantity={setQuantity} />);
    const input = screen.getByLabelText('Quantity');

    input.focus();
    await user.keyboard('{ArrowLeft}-');
    expect(setQuantity).not.toHaveBeenCalled();
  });

  test('when typed value is more than 999 on input', async () => {
    const user = userEvent.setup();
    const setQuantity = vi.fn();

    render(<Quantity quantity={999} setQuantity={setQuantity} />);
    const input = screen.getByLabelText('Quantity');

    await user.type(input, '0');
    expect(setQuantity).not.toHaveBeenCalled();
  });
});
