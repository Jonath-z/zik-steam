import React from 'react';
import styles from '../styles/Home.module.css';
import LandingPage from '../components/_NoAuth/Home';

const Landing = () => {
  return (
    <div className={styles.container}>
      <LandingPage />
    </div>
  );
};
export default Landing;
