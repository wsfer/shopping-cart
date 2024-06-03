import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.paragraph}>Are you lost?</p>
      <Link to="/" className={styles.button}>
        Start again
      </Link>
    </main>
  );
}

export default ErrorPage;
