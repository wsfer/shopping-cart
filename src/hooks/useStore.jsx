import { useState, useEffect } from 'react';

const supportedCategories = ["men's clothing", 'jewelery', "women's clothing"];

const categoryFilters = new Map([
  [undefined, ({ category }) => supportedCategories.includes(category)],
  ['jewelery', ({ category }) => category === 'jewelery'],
  ['men-clothing', ({ category }) => category === "men's clothing"],
  ['women-clothing', ({ category }) => category === "women's clothing"],
]);

function useStore(category) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryFilter = categoryFilters.get(category) ?? (() => false);
  const products = data.filter(categoryFilter);

  // Check for valid category
  useEffect(() => {
    const haveFilter = categoryFilters.get(category);

    if (!haveFilter) {
      throw new Error('Not found');
    }
  }, [category]);

  // Fetch data
  useEffect(() => {
    const abortController = new AbortController();

    fetch('https://fakestoreapi.com/products', {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError('Failed to get products');
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return { products, loading, error };
}

export default useStore;
