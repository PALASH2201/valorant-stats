import styles from "./home.module.css";
import valoEdit from "../../assets/Valo Edit.mp4";
const MainContent = () => {
  return (
    <section className={styles.mainContent}>
      <div className={styles.textContentContainer}>
        <div className={styles.textContent}>
          <h1 className={styles.appTag}>
            We Are <br />
            Valorant Hub
          </h1>
          <span style={{ fontFamily: "Tungsten", fontSize: "30px" }}>
            Defy the limits
          </span>
          <p
            style={{
              marginTop: "10px",
              fontFamily: "Montesserat",
              fontSize: "1.8rem",
            }}
          >
            Blend your style and experience on a global, competitive stage. You
            have 13 rounds to attack and defend your side using sharp gunplay
            and tactical abilities. And, with one life per-round, you'll need to
            think faster than your opponent if you want to survive.
          </p>
        </div>
      </div>
      <div className={styles.videoContentContainer}>
        <div className={styles.videoContent}>
          <video autoPlay loop muted playsInline className={styles.video}>
            <source src={valoEdit} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
