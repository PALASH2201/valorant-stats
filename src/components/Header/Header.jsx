import styles from "./Header.module.css";
import Logo from "../../assets/Valorant Logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Valorant Logo" className={styles.logo} />
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
        <a href="#" className={styles.navLink}>
          LEADERBOARD
        </a>
      </nav>
    </header>
  );
};

export default Header;
