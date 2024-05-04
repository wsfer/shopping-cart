import { Link, NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Link className={styles.logo} to="/">
            <Logo />
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
