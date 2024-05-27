import { useState } from 'react';
import Rating from '../Rating/Rating';
import Quantity from '../Quantity/Quantity';
import styles from './Card.module.scss';

function Card({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const { title, price, description, image } = product;
  const rate = product.rating.rate;

  const addProductToCart = () => addToCart({ ...product, quantity });

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <Rating rate={rate} />
        <div className={styles.bottomContent}>
          <p className={styles.description}>{description}</p>
          <p className={styles.price}>$ {price.toFixed(2)}</p>
          <div className={styles.controls}>
            <button className={styles.button} onClick={addProductToCart}>
              Add
            </button>
            <Quantity quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
