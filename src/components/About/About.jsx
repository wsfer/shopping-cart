import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import blackCoatMan from '../../assets/images/man-in-black-coat.jpg';
import styles from './About.module.scss';

function About() {
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.content}>
          <div className={styles.callToAction}>
            <h2 className={styles.title}>About us</h2>
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              at repellat illo quibusdam quisquam, doloremque assumenda beatae
              provident.
            </p>
            <Link className={styles.button} to="/products">
              Explore Products
            </Link>
          </div>
          <img
            className={styles.image}
            src={blackCoatMan}
            alt="Man wearing black hat and black coat"
          />
        </div>
      </Container>
    </section>
  );
}

export default About;
