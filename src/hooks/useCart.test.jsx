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
    getCart: () => JSON.parse(localStorage.getItem('cart')),
  };
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(vi.fn());
  localStorage.removeItem('cart');
});

describe('On initialization', () => {
  describe('when cart is not created on localStorage', () => {
    test('cart should be an empty array', () => {
      const { result } = setup();
      expect(result.current.cart).toEqual([]);
    });

    test('stored cart should be updated as empty array', () => {
      const { getCart } = setup();
      expect(getCart()).toEqual([]);
    });
  });

  describe('when cart is empty on localStorage', () => {
    test('cart should be an empty array', () => {
      const { result } = setup([]);
      expect(result.current.cart).toEqual([]);
    });

    test('stored cart should still be an empty array', () => {
      const { getCart } = setup();
      expect(getCart()).toEqual([]);
    });
  });

  describe('when stored cart is not an array', () => {
    describe('but a string', () => {
      test('cart should be an empty array', () => {
        const { result } = setup('lorem ipsum dolor');
        expect(result.current.cart).toEqual([]);
      });

      test('stored cart should be updated to an empty array', () => {
        const { getCart } = setup('sit amet');
        expect(getCart()).toEqual([]);
      });
    });

    describe('but an object', () => {
      test('cart should be an empty array', () => {
        const { result } = setup({ cats: 'meow' });
        expect(result.current.cart).toEqual([]);
      });

      test('stored cart should be updated to an empty array', () => {
        const { getCart } = setup({ bana: 'na' });
        expect(getCart()).toEqual([]);
      });
    });
  });

  describe('when stored cart is not empty', () => {
    describe('and all items have id and quantity', () => {
      test('cart should be the stored cart', () => {
        const { result } = setup(fakeCart);
        expect(result.current.cart).toEqual(fakeCart);
      });

      test('stored cart should not be changed', () => {
        const { getCart } = setup(fakeCart);
        expect(getCart()).toEqual(fakeCart);
      });
    });

    describe('and has invalid items', () => {
      const invalidCart = [
        { quantity: 5 },
        ...fakeCart,
        { cats: 'meow' },
        { id: 777, quantity: 5.67 },
      ];

      test('cart should have the valid items', () => {
        const { result } = setup(invalidCart);
        expect(result.current.cart).toEqual(fakeCart);
      });

      test('stored cart should be updated to remove invalid items', () => {
        const { getCart } = setup(invalidCart);
        expect(getCart()).toEqual(fakeCart);
      });
    });
  });
});

describe('On addProduct method', () => {
  describe('when product has valid id and quantity', () => {
    test('should update cart', () => {
      const { result } = setup(fakeCart);

      act(() => {
        result.current.addProduct({ id: 777, quantity: 7 });
      });

      expect(result.current.cart).toEqual([
        ...fakeCart,
        { id: 777, quantity: 7 },
      ]);
    });

    test('should update stored cart', () => {
      const { result, getCart } = setup(fakeCart);

      act(() => {
        result.current.addProduct({ id: 777, quantity: 7 });
      });

      expect(getCart()).toEqual([...fakeCart, { id: 777, quantity: 7 }]);
    });
  });

  describe('when product is invalid', () => {
    test('should throw an error', () => {
      const { result } = setup(fakeCart);

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
    });
  });
});

describe('On updateQuantity method', () => {
  describe('when product to update is found', () => {
    describe('and quantity is valid', () => {
      test('should update cart', () => {
        const { result } = setup(fakeCart);

        act(() => {
          result.current.updateQuantity(8, 10);
        });

        expect(result.current.cart).toEqual([
          { id: 3, quantity: 1 },
          { id: 78, quantity: 3 },
          { id: 8, quantity: 10 },
        ]);
      });

      test('should update stored cart', () => {
        const { result, getCart } = setup(fakeCart);

        act(() => {
          result.current.updateQuantity(78, 5);
        });

        expect(getCart()).toEqual([
          { id: 3, quantity: 1 },
          { id: 78, quantity: 5 },
          { id: 8, quantity: 20 },
        ]);
      });
    });

    describe('and quantity is invalid', () => {
      test('should throw an error', () => {
        const { result } = setup(fakeCart);

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
      });
    });
  });

  describe("when product to update isn't found", () => {
    test('should throw an error', () => {
      const { result } = setup(fakeCart);

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
    });
  });
});

describe('On removeProduct method', () => {
  describe('when product to remove is found', () => {
    test('should update cart', () => {
      const { result } = setup(fakeCart);

      act(() => {
        result.current.removeProduct(78);
      });

      expect(result.current.cart).toEqual([
        { id: 3, quantity: 1 },
        { id: 8, quantity: 20 },
      ]);
    });

    test('should update stored cart', () => {
      const { result, getCart } = setup(fakeCart);

      act(() => {
        result.current.removeProduct(78);
      });

      expect(getCart()).toEqual([
        { id: 3, quantity: 1 },
        { id: 8, quantity: 20 },
      ]);
    });
  });

  describe("when product to update isn't found", () => {
    test('should throw an error', () => {
      const { result } = setup(fakeCart);

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
    });
  });
});
