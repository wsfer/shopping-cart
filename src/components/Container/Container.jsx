import styles from './Container.module.scss';

// Limits content width and centralize it
function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
