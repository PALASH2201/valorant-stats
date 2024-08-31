import styles from "./home.module.css";
import reynaArtwork from "../../assets/Reyna_artwork.png";
import viperArtwork from "../../assets/Viper_artwork.png";
const AgentsSection = () => {
  return (
    <section className={styles.agentsSection}>
      <div className={styles.agentImageContainer}>
        <img
          src={viperArtwork}
          alt="Character 1"
          className={styles.character1}
        />
        <img
          src={reynaArtwork}
          alt="Character 2"
          className={styles.character2}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 style={{marginTop:'80px'}}>AGENTS</h2>
        <p style={{marginTop:'50px'}}>CREATIVITY IS YOUR GREATEST WEAPON.</p>
        <p style={{marginTop:'50px'}}> More than guns and bullets, you’ll choose an Agent armed with adaptive, swift, and lethal abilities that create opportunities to let your gunplay shine. No two Agents play alike, just as no two highlight reels will look the same.</p>
        <button className={styles.viewAgentsBtn}>View All Agents</button>
      </div>
    </section>
  );
};

export default AgentsSection;
