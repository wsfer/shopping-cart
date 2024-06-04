import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import styles from './Categories.module.scss';

// Display styled links to product categories
function Categories() {
  return (
    <section className={styles.categories}>
      <Container>
        <h2 className={styles.title}>Categories</h2>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link
                className={`${styles.link} ${styles.linkOne}`}
                to="/products/women-clothing"
              >
                Women's clothing
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                className={`${styles.link} ${styles.linkTwo}`}
                to="/products/men-clothing"
              >
                Men's clothing
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                className={`${styles.link} ${styles.linkThree}`}
                to="/products/jewelery"
              >
                Jewelery
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
}

export default Categories;
