import { useState, useEffect } from 'react';

const updateStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  const event = new CustomEvent('storage', { detail: { key: 'cart' } });
  window.dispatchEvent(event);
};

function useCart() {
  const [cart, setCart] = useState([]);

  const addProduct = (product) => {
    const { id, quantity } = product;
    const newCart = cart.slice();

    if (id && Number.isInteger(quantity) && quantity > 0) {
      newCart.push(product);
    } else {
      throw new Error('Invalid product');
    }

    setCart(newCart);
    updateStorage(newCart);
  };

  const updateQuantity = (id, quantity) => {
    let isFound = false;
    const newCart = cart.slice();

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Invalid quantity');
    }

    for (const product of newCart) {
      if (product.id === id) {
        product.quantity = quantity;
        isFound = true;
      }
    }

    if (isFound) {
      setCart(newCart);
      updateStorage(newCart);
    } else {
      throw new Error('Product not found');
    }
  };

  const removeProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);

    if (newCart.length === cart.length) {
      throw new Error('Product not found');
    }

    setCart(newCart);
    updateStorage(newCart);
  };

  // Handle changes from localStorage caused by another useCart hook
  const handleStorageChanges = (event) => {
    const key = event.detail?.key ?? event.key;

    if (key === 'cart') {
      const newCart = JSON.parse(localStorage.getItem('cart'));
      setCart(newCart);
    }
  };

  // Get saved cart from local storage
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart'));

      if (Array.isArray(cart)) {
        const validProducts = cart.filter(
          ({ id, quantity }) => id && Number.isInteger(quantity)
        );

        setCart(validProducts);
        updateStorage(validProducts);
      } else {
        updateStorage([]);
      }
    } catch (error) {
      console.error(error);
      updateStorage([]);
    }
  }, []);

  //
  useEffect(() => {
    window.addEventListener('storage', handleStorageChanges);

    return () => {
      window.removeEventListener('storage', handleStorageChanges);
    };
  }, []);

  return { cart, addProduct, updateQuantity, removeProduct };
}

export default useCart;
