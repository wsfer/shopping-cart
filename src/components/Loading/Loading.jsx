import styles from './Loading.module.scss';

function Loading({ loading, message, children }) {
  return (
    <div className={styles.content} aria-busy={loading} aria-live="polite">
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} aria-label="Loading">
            <div className={`${styles.ball} ${styles.ballOne}`}></div>
            <div className={`${styles.ball} ${styles.ballTwo}`}></div>
            <div className={`${styles.ball} ${styles.ballThree}`}></div>
          </div>
          <p className={styles.paragraph} aria-live="assertive">
            {message}
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default Loading;
