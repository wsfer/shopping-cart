import { useState, useEffect } from 'react';

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
    localStorage.setItem('cart', JSON.stringify(newCart));
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
      localStorage.setItem('cart', JSON.stringify(newCart));
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
    localStorage.setItem('cart', JSON.stringify(newCart));
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
        localStorage.setItem('cart', JSON.stringify(validProducts));
      } else {
        localStorage.setItem('cart', '[]');
      }
    } catch (error) {
      console.error(error);
      localStorage.setItem('cart', '[]');
    }
  }, []);

  return { cart, addProduct, updateQuantity, removeProduct };
}

export default useCart;
