import React from 'react';
import styles from '../styles/Home.module.css';
import LandingPage from '../components/_NoAuth/Home';

const Home = () => {
  return (
    <div className={styles.container}>
      <LandingPage />
    </div>
  );
};
export default Home;
