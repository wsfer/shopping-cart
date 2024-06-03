import { Link } from 'react-router-dom';
import styles from './CartSummary.module.scss';

function CartSummary({ products, finishOrder }) {
  const subtotal = products
    .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
    .toFixed(2);

  if (products.length > 0) {
    return (
      <section className={styles.summary}>
        <h2 className={styles.title}>Summary</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Subtotal: <span className={styles.accent}>${subtotal}</span>
          </li>
          <li className={styles.listItem}>
            Fee: <span className={styles.accent}>$0.00</span>
          </li>
        </ul>
        <button className={styles.button} onClick={finishOrder}>
          Finish order
        </button>
      </section>
    );
  } else {
    return (
      <section className={styles.summary}>
        <p className={styles.paragraph}>Your cart is empty</p>
        <Link
          to="/products"
          className={`${styles.button} ${styles.linkButton}`}
        >
          Go to store
        </Link>
      </section>
    );
  }
}

export default CartSummary;
