import { forwardRef } from 'react';
import styles from './Popup.module.scss';

const Popup = forwardRef(function Popup({ children }, ref) {
  return (
    <dialog ref={ref} className={styles.dialog}>
      {children}
      <form method="dialog" className={styles.form}>
        <button className={styles.button}>Close</button>
      </form>
    </dialog>
  );
});

export default Popup;
