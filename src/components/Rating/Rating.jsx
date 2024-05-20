import styles from './Rating.module.scss';

const Star = () => (
  <svg
    aria-hidden="true"
    className={styles.star}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </svg>
);

// Display between 0~5 stars based on rate prop
function Rating({ rate }) {
  const label = `Rating: ${rate}`;
  const maskStyle = { width: `${(rate * 100) / 5}%` };

  return (
    <div className={styles.rating} aria-label={label} title={label}>
      <div className={styles.mask} style={maskStyle}>
        <div className={styles.stars}>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
    </div>
  );
}

export default Rating;
