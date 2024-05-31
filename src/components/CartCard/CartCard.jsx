import { useState, useEffect } from 'react';
import Quantity from '../Quantity/Quantity';
import styles from './CartCard.module.scss';

function CartCard({ product, updateQuantity, removeProduct }) {
  const { id, title, price, image } = product;
  const [quantity, setQuantity] = useState(product.quantity);

  const handleDelete = () => removeProduct(id);

  useEffect(() => {
    if (quantity !== product.quantity) {
      updateQuantity(id, quantity);
    }
  }, [quantity]);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>$ {price.toFixed(2)}</p>
        <div className={styles.controls}>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            aria-label="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartCard;
