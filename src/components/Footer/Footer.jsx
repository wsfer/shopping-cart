import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.contentItem}>
            <div className={styles.topRow}>
              <span className={styles.boldText}>© Lorem Ipsum Inc.</span>
              <a href="#" className={styles.linkBold}>
                Privacy Policy
              </a>
              <a href="#" className={styles.linkBold}>
                Terms of Use
              </a>
            </div>
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sit
              vel beatae pariatur earum cum! Accusantium aliquid repudiandae,
              vero voluptate magni inventore quisquam cum ullam doloribus earum
              dolorem rem! Similique?
            </p>
          </div>
          <div className={`${styles.contentItem} ${styles.navRow}`}>
            <nav className={styles.firstNav} aria-labelledby="categories">
              <h3
                id="categories"
                className={`${styles.title} ${styles.boldText}`}
              >
                Categories
              </h3>
              <ul className={styles.list}>
                <li>
                  <Link
                    className={styles.linkLight}
                    to="/products/women-clothing"
                  >
                    Women's clothing
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.linkLight}
                    to="/products/men-clothing"
                  >
                    Men's clothing
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkLight} to="/products/jewelery">
                    Jewelery
                  </Link>
                </li>
              </ul>
            </nav>
            <nav aria-labelledby="pages">
              <h3 id="pages" className={`${styles.title} ${styles.boldText}`}>
                Pages
              </h3>
              <ul className={styles.list}>
                <li>
                  <Link className={styles.linkLight} to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkLight} to="/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className={styles.linkLight} to="/cart">
                    Cart
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
