// Header.js
import React from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Valorant Logo.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src={Logo}
        alt="Valorant Logo"
        className={styles.logo}
      />
      <nav className={styles.navLinks}>
        <a href="#home" className={styles.navLink}>HOME</a>
        <a href="#esports" className={styles.navLink}>ESPORTS</a>
      </nav>
    </header>
  );
};

export default Header;
