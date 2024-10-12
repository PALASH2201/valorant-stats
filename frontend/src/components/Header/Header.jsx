import styles from "./Header.module.css";
import Logo from "../../assets/Valorant Logo.png";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub.username);  // Set username from the decoded token
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUsername(null); // Clear username on logout
    navigate('/signin');
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Valorant Logo" className={styles.logo} />
      <p className={styles.login_username}>Logged in as {username}</p>
      <nav className={styles.navLinks}>
        <a href="/home" className={styles.navLink}>
          HOME
        </a>
        <a href="/agents" className={styles.navLink}>
          AGENTS
        </a>
        <a href="#" className={styles.navLink}>
          STATS
        </a>
        <a href="#" className={styles.navLink}>
          INFO
        </a>
        <a href="/leaderboard" className={styles.navLink}>
          LEADERBOARD
        </a>
        <a className={styles.navLink} onClick={handleLogout}>LOGOUT</a>
      </nav>
    </header>
  );
};

export default Header;
