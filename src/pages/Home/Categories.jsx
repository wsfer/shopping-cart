import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import styles from './Categories.module.scss';

function Categories() {
  return (
    <section className={styles.categories}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>Categories</h2>
          <nav>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link
                  className={`${styles.link} ${styles.linkOne}`}
                  to="/products/women-clothes"
                >
                  Women's clothes
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link
                  className={`${styles.link} ${styles.linkTwo}`}
                  to="/products/men-clothes"
                >
                  Men's clothes
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link
                  className={`${styles.link} ${styles.linkThree}`}
                  to="/products/jewelry"
                >
                  Jewelry
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}

export default Categories;
