import styles from './CardList.module.scss';

// A list that uses responsive grid to display cards
function CardList({ children, size }) {
  const gridLayout = `repeat(auto-fill, minmax(${size}, 1fr)`;

  return (
    <ul className={styles.list} style={{ gridTemplateColumns: gridLayout }}>
      {children.map((card, index) => (
        <li key={index}>{card}</li>
      ))}
    </ul>
  );
}

export default CardList;
