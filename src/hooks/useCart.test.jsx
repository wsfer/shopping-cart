import { renderHook, act } from '@testing-library/react';
import useCart from './useCart';
import { test, vi } from 'vitest';

const fakeCart = [
  { id: 3, quantity: 1 },
  { id: 78, quantity: 3 },
  { id: 8, quantity: 20 },
];

const setup = (cartItems) => {
  if (cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  const { result } = renderHook(useCart);

  return {
    result,
    getStoredCart: () => JSON.parse(localStorage.getItem('cart')),
  };
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(vi.fn());
  localStorage.removeItem('cart');
});

describe('On initialization', () => {
  describe('when cart is not created on localStorage', () => {
    test('cart should be created as an empty array', () => {
      const { result, getStoredCart } = setup();
      expect(result.current.cart).toEqual([]);
      expect(getStoredCart()).toEqual([]);
    });
  });

  describe('when cart is empty on localStorage', () => {
    test('cart should be an empty array', () => {
      const { result, getStoredCart } = setup([]);
      expect(result.current.cart).toEqual([]);
      expect(getStoredCart()).toEqual([]);
    });
  });

  describe('when stored cart is not an array', () => {
    describe('but a string', () => {
      test('cart should be an empty array', () => {
        const { result, getStoredCart } = setup('lorem ipsum dolor');
        expect(result.current.cart).toEqual([]);
        expect(getStoredCart()).toEqual([]);
      });
    });

    describe('but an object', () => {
      test('cart should be an empty array', () => {
        const { result, getStoredCart } = setup({ cats: 'meow' });
        expect(result.current.cart).toEqual([]);
        expect(getStoredCart()).toEqual([]);
      });
    });
  });

  describe('when stored cart is not empty', () => {
    describe('and all items have id and quantity', () => {
      test('cart should be the stored cart', () => {
        const { result, getStoredCart } = setup(fakeCart);
        expect(result.current.cart).toEqual(fakeCart);
        expect(getStoredCart()).toEqual(fakeCart);
      });
    });

    describe('and has invalid items', () => {
      const invalidCart = [
        { quantity: 5 },
        ...fakeCart,
        { cats: 'meow' },
        { id: 777, quantity: 5.67 },
      ];

      test('cart and stored cart should only have the valid items', () => {
        const { result, getStoredCart } = setup(invalidCart);
        expect(result.current.cart).toEqual(fakeCart);
        expect(getStoredCart()).toEqual(fakeCart);
      });
    });
  });
});

describe('On addProduct method', () => {
  describe('when product has valid id and quantity', () => {
    test('should update cart and stored cart', () => {
      const { result, getStoredCart } = setup(fakeCart);
      const expectedCart = [...fakeCart, { id: 777, quantity: 7 }];

      act(() => {
        result.current.addProduct({ id: 777, quantity: 7 });
      });

      expect(result.current.cart).toEqual(expectedCart);
      expect(getStoredCart()).toEqual(expectedCart);
    });
  });

  describe('when product is invalid', () => {
    test('should throw an error', () => {
      const { result, getStoredCart } = setup(fakeCart);

      expect(() => {
        result.current.addProduct({});
      }).toThrow(new Error('Invalid product'));

      expect(() => {
        result.current.addProduct({ cats: 'meow' });
      }).toThrow(new Error('Invalid product'));

      expect(() => {
        result.current.addProduct({ id: 5 });
      }).toThrow(new Error('Invalid product'));

      expect(() => {
        result.current.addProduct({ quantity: 7 });
      }).toThrow(new Error('Invalid product'));

      expect(getStoredCart()).toEqual(fakeCart);
    });
  });

  describe('when product alteady exists in the cart', () => {
    test('should update product quantity', () => {
      const { result, getStoredCart } = setup(fakeCart);
      const expectedCart = [
        { id: 78, quantity: 3 },
        { id: 8, quantity: 20 },
        { id: 3, quantity: 5 },
      ];

      act(() => {
        result.current.addProduct({ id: 3, quantity: 5 });
      });

      expect(getStoredCart()).toEqual(expectedCart);
      expect(result.current.cart).toEqual(expectedCart);
    });
  });
});

describe('On updateQuantity method', () => {
  describe('when product to update is found', () => {
    describe('and quantity is valid', () => {
      test('should update cart', () => {
        const { result, getStoredCart } = setup(fakeCart);
        const expectedCart = [
          { id: 3, quantity: 1 },
          { id: 78, quantity: 3 },
          { id: 8, quantity: 10 },
        ];

        act(() => {
          result.current.updateQuantity(8, 10);
        });

        expect(result.current.cart).toEqual(expectedCart);
        expect(getStoredCart()).toEqual(expectedCart);
      });
    });

    describe('and quantity is invalid', () => {
      test('should throw an error', () => {
        const { result, getStoredCart } = setup(fakeCart);

        expect(() => {
          result.current.updateQuantity(3, 0);
        }).toThrow(new Error('Invalid quantity'));

        expect(() => {
          result.current.updateQuantity(8, 78.6);
        }).toThrow(new Error('Invalid quantity'));

        expect(() => {
          result.current.updateQuantity(78, -6875);
        }).toThrow(new Error('Invalid quantity'));

        expect(() => {
          result.current.updateQuantity(78, 'cats');
        }).toThrow(new Error('Invalid quantity'));

        expect(() => {
          result.current.updateQuantity(8, { hello: 'world' });
        }).toThrow(new Error('Invalid quantity'));

        expect(() => {
          result.current.updateQuantity(3, [1, 2, 3]);
        }).toThrow(new Error('Invalid quantity'));

        expect(getStoredCart()).toEqual(fakeCart);
      });
    });
  });

  describe("when product to update isn't found", () => {
    test('should throw an error', () => {
      const { result, getStoredCart } = setup(fakeCart);

      expect(() => {
        result.current.updateQuantity(1, 2);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.updateQuantity(null, 2);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.updateQuantity({ dogs: 'woff' }, 3);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.updateQuantity(['a', 78], 4);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.updateQuantity(675689, 5);
      }).toThrow(new Error('Product not found'));

      expect(getStoredCart()).toEqual(fakeCart);
    });
  });
});

describe('On removeProduct method', () => {
  describe('when product to remove is found', () => {
    test('should update cart', () => {
      const { result, getStoredCart } = setup(fakeCart);
      const expectedCart = [
        { id: 3, quantity: 1 },
        { id: 8, quantity: 20 },
      ];

      act(() => {
        result.current.removeProduct(78);
      });

      expect(result.current.cart).toEqual(expectedCart);
      expect(getStoredCart()).toEqual(expectedCart);
    });
  });

  describe("when product to update isn't found", () => {
    test('should throw an error', () => {
      const { result, getStoredCart } = setup(fakeCart);

      expect(() => {
        result.current.removeProduct(1);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.removeProduct(null);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.removeProduct({ black: 'cat' });
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.removeProduct(['ba', 'na', 'na']);
      }).toThrow(new Error('Product not found'));

      expect(() => {
        result.current.removeProduct(675689);
      }).toThrow(new Error('Product not found'));

      expect(getStoredCart()).toEqual(fakeCart);
    });
  });
});

describe('Should mirror the actions from another similar hook', () => {
  test('When a new product is added', () => {
    const { result, getStoredCart } = setup(fakeCart);
    const anotherHook = renderHook(useCart);
    const expectedCart = [...fakeCart, { id: 56, quantity: 3 }];

    act(() => {
      anotherHook.result.current.addProduct({ id: 56, quantity: 3 });
    });

    expect(result.current.cart).toEqual(expectedCart);
    expect(getStoredCart()).toEqual(expectedCart);
  });

  test('When a product is updated', () => {
    const { result, getStoredCart } = setup(fakeCart);
    const anotherHook = renderHook(useCart);
    const expectedCart = [
      { id: 3, quantity: 1 },
      { id: 78, quantity: 3 },
      { id: 8, quantity: 777 },
    ];

    act(() => {
      anotherHook.result.current.updateQuantity(8, 777);
    });

    expect(result.current.cart).toEqual(expectedCart);
    expect(getStoredCart()).toEqual(expectedCart);
  });

  test('When a product is removed', () => {
    const { result, getStoredCart } = setup(fakeCart);
    const anotherHook = renderHook(useCart);
    const expectedCart = [
      { id: 3, quantity: 1 },
      { id: 8, quantity: 20 },
    ];

    act(() => {
      anotherHook.result.current.removeProduct(78);
    });

    expect(result.current.cart).toEqual(expectedCart);
    expect(getStoredCart()).toEqual(expectedCart);
  });
});
