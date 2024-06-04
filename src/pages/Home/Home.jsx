import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Categories from '../../components/Categories/Categories';
import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <About />
      <Categories />
    </div>
  );
}

export default Home;
