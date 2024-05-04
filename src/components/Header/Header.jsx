import { Link, NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Link className={styles.logo} to="/">
            <span className={styles.orange}>Fashion</span>
            <span className={styles.white}>Store</span>
          </Link>
          <nav>
            <ul className={styles.list}>
              <li>
                <NavLink className={styles.link} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.link} to="/products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.link} to="/cart">
                  Cart
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
