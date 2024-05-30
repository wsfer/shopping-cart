import { Link, NavLink } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

function Header() {
  const { cart } = useCart();

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
              <li className={styles.cartLinkWrapper}>
                <NavLink className={styles.link} to="/cart">
                  Cart
                  <span className={styles.srCartQuantity}>
                    ({cart?.length} products)
                  </span>
                </NavLink>
                {cart?.length > 0 && (
                  <span className={styles.cartQuantity} aria-hidden="true">
                    {cart?.length}
                  </span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
