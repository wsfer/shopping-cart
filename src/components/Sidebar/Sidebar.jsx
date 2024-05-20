import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

function Sidebar() {
  return (
    <nav className={styles.sidebar} aria-labelledby="categories">
      <h2 className={styles.title} id="categories">
        Categories
      </h2>
      <ul className={styles.list}>
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
  );
}

export default Sidebar;
