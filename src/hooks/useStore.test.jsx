import { renderHook, act } from '@testing-library/react';
import useStore from './useStore';

const fakeProductsData = [
  { category: "men's clothing" },
  { category: "men's clothing" },
  { category: 'jewelery' },
  { category: 'jewelery' },
  { category: "women's clothing" },
  { category: "women's clothing" },
];

const createFetchResponse = (data, status = 200) => {
  // Resolve
  if (status > 199 && status < 300) {
    return {
      ok: true,
      status: status,
      json: () => new Promise((resolve) => resolve(data)),
    };
  }

  // Reject
  return { ok: false, status };
};

const simulateNetworkDelay = (value, delay = 1000) => {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
};

const setup = (category, data) => {
  vi.useFakeTimers();
  const response = createFetchResponse(data);
  fetch.mockResolvedValue(simulateNetworkDelay(response));

  return renderHook(() => useStore(category));
};

beforeEach(() => {
  window.fetch = vi.fn();
});

describe('Data fetching', () => {
  describe('On initialization', () => {
    describe('Should fetch data from correctly endpoint', () => {
      const expectedEndpoint = 'https://fakestoreapi.com/products';

      test('When category is empty', async () => {
        fetch.mockResolvedValue(createFetchResponse([]));
        await act(async () => renderHook(() => useStore()));
        expect(fetch.mock.calls[0][0]).toBe(expectedEndpoint);
      });

      test('When category is not empty', async () => {
        fetch.mockResolvedValue(createFetchResponse([]));
        await act(async () => renderHook(() => useStore('jewelery')));
        expect(fetch.mock.calls[0][0]).toBe(expectedEndpoint);
      });
    });
  });

  describe('On rerender', () => {
    test("Shouldn't fetch data again", async () => {
      fetch.mockResolvedValue(createFetchResponse([]));
      const { rerender } = renderHook(() => useStore('jewelery'));
      await act(async () => rerender('women-clothing'));
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Returned state properties', () => {
  test('While fetching data', () => {
    const { result } = setup(undefined, fakeProductsData);
    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBe('');
  });

  test('Immediately after successfully fetching data', async () => {
    const { result } = setup(undefined, fakeProductsData);

    await act(async () => vi.runAllTimers());

    expect(result.current.products).toEqual(fakeProductsData);
    expect(result.current.loading).toBeTruthy(); // There's a delay on loading
    expect(result.current.error).toBe('');
  });

  test('Slight after successfully fetching data', async () => {
    const { result } = setup(undefined, fakeProductsData);

    await act(async () => vi.runAllTimers());
    await act(async () => vi.runAllTimers()); // Run loading timer

    expect(result.current.products).toEqual(fakeProductsData);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe('');
  });

  test('After unsuccessfull data fetching', async () => {
    vi.useFakeTimers();
    const response = createFetchResponse(null, 418);
    fetch.mockRejectedValue(simulateNetworkDelay(response));

    const { result } = renderHook(() => useStore());

    await act(async () => vi.runAllTimers());

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).not.toBe('');
  });
});

describe('Filter products by category', () => {
  test('Only jewelery products when category is jewelery', async () => {
    const { result } = setup('jewelery', fakeProductsData);
    const expectedValue = [{ category: 'jewelery' }, { category: 'jewelery' }];

    await act(async () => vi.runAllTimers());

    expect(result.current.products).toEqual(expectedValue);
  });

  test("Only men's clothing products when category is men-clothing", async () => {
    const { result } = setup('men-clothing', fakeProductsData);
    const expectedValue = [
      { category: "men's clothing" },
      { category: "men's clothing" },
    ];

    await act(async () => vi.runAllTimers());

    expect(result.current.products).toEqual(expectedValue);
  });

  test("Only women's clothing products when category is women-clothing", async () => {
    const { result } = setup('women-clothing', fakeProductsData);
    const expectedValue = [
      { category: "women's clothing" },
      { category: "women's clothing" },
    ];

    await act(async () => vi.runAllTimers());

    expect(result.current.products).toEqual(expectedValue);
  });

  test('All supported category products when category is empty', async () => {
    const supportedCategories = [
      "men's clothing",
      'jewelery',
      "women's clothing",
    ];
    const fakeData = [
      { category: "men's clothing" },
      { category: "men's clothing" },
      { category: 'cats' },
      { category: 'jewelery' },
      { category: 'electronics' },
      { category: 'jewelery' },
      { category: "women's clothing" },
      { category: "women's clothing" },
      { category: 'dogs' },
      { category: 'animals' },
    ];

    const { result } = setup(undefined, fakeData);

    await act(async () => vi.runAllTimers());

    expect(result.current.products).toEqual(fakeProductsData);
  });

  test('Should throw an exception for unsupported category', () => {
    vi.spyOn(console, 'error').mockImplementationOnce(() => {});
    fetch.mockResolvedValue(createFetchResponse([]));

    expect(() => {
      renderHook(() => useStore('cats'));
    }).toThrow(new Error('Not found'));
  });
});
