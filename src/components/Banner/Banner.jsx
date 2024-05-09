import styles from './Banner.module.scss';

const opaqueBg = 'linear-gradient(var(--opaque-dark), var(--opaque-dark))';

function Banner({ title, image }) {
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `${opaqueBg}, url(${image})` }}
    >
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

export default Banner;
