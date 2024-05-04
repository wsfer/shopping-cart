import styles from './Logo.module.scss';

function Logo() {
  return (
    <span className={styles.logo}>
      <span className={styles.orangeText}>Fashion</span>
      <span className={styles.whiteText}>Store</span>
    </span>
  );
}

export default Logo;
