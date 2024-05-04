import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Logo from '../../components/Logo/Logo';
import earrings from '../../assets/images/earrings.jpg';
import styles from './Hero.module.scss';

function Hero() {
  return (
    <main className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.callToAction}>
            <h1 className={styles.title}>
              <Logo />
            </h1>
            <p className={styles.paragraph}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Distinctio hic a maiores nihil esse omnis accusamus quas ipsa qui
              iste harum voluptate enim sed.
            </p>
            <Link className={styles.button} to="/products">
              Check our products
            </Link>
          </div>
          <img
            className={styles.image}
            src={earrings}
            alt="Gold colored latched back earrings"
          />
        </div>
      </Container>
    </main>
  );
}

export default Hero;
