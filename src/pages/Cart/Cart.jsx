import { useState, useRef } from 'react';
import useCart from '../../hooks/useCart';
import Container from '../../components/Container/Container';
import CardList from '../../components/CardList/CardList';
import CartCard from '../../components/CartCard/CartCard';
import CartSummary from '../../components/CartSummary/CartSummary';
import Popup from '../../components/Popup/Popup';
import styles from './Cart.module.scss';

function Cart() {
  const confirmDeletionPopup = useRef(null);
  const afterDeletionPopup = useRef(null);
  const finishOrderPopup = useRef(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const { cart, updateQuantity, removeProduct } = useCart();

  const handleStartDeletion = (id) => {
    const product = cart.find((product) => product.id === id);
    setProductToDelete(product);
    confirmDeletionPopup.current.showModal();
  };

  const handleConfirmDeletion = () => {
    if (productToDelete) {
      removeProduct(productToDelete.id);
      afterDeletionPopup.current.showModal();
    }
  };

  const handleRefuseDeletion = () => {
    setProductToDelete(null);
  };

  const handleFinishDeletion = () => {
    setProductToDelete(null);
  };

  const handleFinishOrder = () => {
    finishOrderPopup.current.showModal();
  };

  return (
    <main className={styles.main}>
      <Container>
        <h1>Your cart</h1>
        <div className={styles.pageContent}>
          <div className={styles.summaryWrapper}>
            <CartSummary products={cart} finishOrder={handleFinishOrder} />
          </div>
          {cart.length > 0 && (
            <div className={styles.cartWrapper}>
              <CardList size="clamp(300px, 20vw, 600px)">
                {cart.map((product) => (
                  <CartCard
                    key={product.id}
                    product={product}
                    updateQuantity={updateQuantity}
                    removeProduct={handleStartDeletion}
                  />
                ))}
              </CardList>
            </div>
          )}
        </div>
        <Popup
          ref={confirmDeletionPopup}
          onAccept={handleConfirmDeletion}
          onRefuse={handleRefuseDeletion}
          onClose={handleRefuseDeletion}
        >
          <p className={styles.popupText}>
            Remove product{' '}
            <span className={styles.accent}>{productToDelete?.title}</span> from
            your cart?
          </p>
        </Popup>
        <Popup ref={afterDeletionPopup} onClose={handleFinishDeletion}>
          <p className={styles.popupText}>
            Product{' '}
            <span className={styles.accent}>{productToDelete?.title}</span> was
            removed from your cart
          </p>
        </Popup>
        <Popup ref={finishOrderPopup}>
          <p className={styles.popupText}>
            Error finishing your order. Our{' '}
            <span className={styles.accent}>cat</span> 🐈 broke the{' '}
            <span className={styles.accent}>payment system</span>. Try again
            tomorrow.
          </p>
        </Popup>
      </Container>
    </main>
  );
}

export default Cart;
