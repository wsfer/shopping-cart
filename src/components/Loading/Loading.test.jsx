import { render, screen, within } from '@testing-library/react';
import Loading from './Loading';

describe('When loading', () => {
  test('should present to screen reader that content is loading', () => {
    const { container } = render(
      <Loading loading={true} message="">
        <h1>test</h1>
      </Loading>
    );

    const loading = container.firstChild;
    expect(loading.ariaBusy).toBeTruthy;
  });

  test('should render an spinner element with name loading', () => {
    render(
      <Loading loading={true} message="">
        <h1>test</h1>
      </Loading>
    );

    const spinner = screen.getByLabelText(/loading/i);
    expect(spinner).toBeInTheDocument();
  });

  test('should render the message text', () => {
    render(
      <Loading loading={true} message="hello, world">
        <h1>test</h1>
      </Loading>
    );

    const message = screen.getByText('hello, world');
    expect(message).toBeInTheDocument();
  });

  test('Should not render children', () => {
    render(
      <Loading loading={true} message="">
        <h1 data-testid="children">test</h1>
      </Loading>
    );

    const message = screen.queryByTestId('children');
    expect(message).toBeNull();
  });
});

describe('After loading', () => {
  test('should present to screen reader that content is loaded', () => {
    const { container } = render(
      <Loading loading={false} message="">
        <h1>test</h1>
      </Loading>
    );

    const loading = container.firstChild;
    expect(loading.ariaBusy).toBeFalsy;
  });

  test('Should render children', () => {
    render(
      <Loading loading={false} message="">
        <h1 data-testid="children">test</h1>
      </Loading>
    );

    const message = screen.getByTestId('children');
    expect(message).toBeInTheDocument();
  });
});
