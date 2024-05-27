import styles from './Quantity.module.scss';

function Quantity({ quantity, setQuantity }) {
  const onIncrease = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
    }
  };

  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onChange = (event) => {
    const newValue = Number(event.currentTarget.value);

    if (Number.isInteger(newValue) && newValue > 0 && newValue < 1000) {
      setQuantity(newValue);
    }
  };

  return (
    <div className={styles.quantity}>
      <button
        className={styles.button}
        aria-label="Decrease"
        onClick={onDecrease}
        disabled={quantity === 1}
      >
        -
      </button>
      <label>
        <span className={styles.labelText}>Quantity</span>
        <input
          className={styles.input}
          value={quantity}
          onChange={onChange}
          type="number"
          name="quantity"
          min="1"
          max="999"
        />
      </label>
      <button
        className={styles.button}
        aria-label="Increase"
        onClick={onIncrease}
        disabled={quantity >= 999}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
