import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className={styles.sidebar}>
      <nav
        className={isOpen ? styles.nav : `${styles.nav} ${styles.navHidden}`}
        aria-labelledby="categories"
      >
        <h2 className={styles.title} id="categories">
          Categories
        </h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="/products" end>
              General
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="/products/women-clothing">
              Women's clothing
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="/products/men-clothing">
              Men's clothing
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="/products/jewelery">
              Jewelery
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className={styles.sidebarToggler} onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Sidebar</title>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;
