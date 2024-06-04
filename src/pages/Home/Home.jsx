import Hero from './Hero';
import About from './About';
import Categories from './Categories';
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
