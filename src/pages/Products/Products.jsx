import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import useCart from '../../hooks/useCart';
import Loading from '../../components/Loading/Loading';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import CardList from '../../components/CardList/CardList';
import Sidebar from '../../components/Sidebar/Sidebar';
import Popup from '../../components/Popup/Popup';
import styles from './Products.module.scss';

import generalImage from '../../assets/images/assorted-shirts.jpg';
import jeweleryImage from '../../assets/images/silver-rings.jpg';
import menClothesImage from '../../assets/images/shirt-and-leather-shoes.jpg';
import womenClothesImage from '../../assets/images/bag-and-red-shoes.jpg';

const bannerProps = new Map([
  [undefined, { title: 'General', image: generalImage }],
  ['jewelery', { title: 'Jewelery', image: jeweleryImage }],
  ['men-clothing', { title: "Men's clothing", image: menClothesImage }],
  ['women-clothing', { title: "Women's clothing", image: womenClothesImage }],
]);

function Products() {
  const popupRef = useRef(null);
  const [lastCartItem, setLastCartItem] = useState({});
  const { category } = useParams();
  const { title, image } = bannerProps.get(category) ?? {};

  const { products, loading, error } = useStore(category);
  const { addProduct } = useCart();

  const handleAddToCart = (product, quantity) => {
    const newCartItem = { ...product, quantity };
    addProduct(newCartItem);
    setLastCartItem(newCartItem);
    popupRef.current.showModal();
  };

  return (
    <main className={styles.main}>
      <Loading loading={loading} message={error}>
        <Banner title={title} image={image} />
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.productsWrapper}>
            <CardList size="clamp(300px, 20vw, 600px)">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  addToCart={handleAddToCart}
                />
              ))}
            </CardList>
          </div>
          <Popup ref={popupRef}>
            <p className={styles.popupText}>
              Product{' '}
              <span className={styles.accent}>{lastCartItem.title}</span> x{' '}
              <span className={styles.accent}>{lastCartItem.quantity}</span> was
              added to cart
            </p>
          </Popup>
        </div>
      </Loading>
    </main>
  );
}

export default Products;
