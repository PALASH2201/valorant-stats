import styles from "./home.module.css";
import board from "../../assets/Leaderboard.png";
import stats from "../../assets/Stats ss.png";

const LeaderboardSection = () => {
  return (
    <div style={{ display: "flex" }} className={styles.sectionOuterContainer}>
      <div
        style={{ backgroundColor: "#FF4656", width: "50%"}}
        className={styles.leaderboardHalf}
      >
        <h1
          style={{
            marginTop: "20px",
            fontFamily: "Tungsten",
            fontSize: "80px",
            textAlign: "center",
          }}
        >
          Find your place on leaderboard
        </h1>
        <div className={styles.leaderboardImageContainer}>
          <img
            src={board}
            className={styles.leaderboardImage}
            alt="leaderboard"
          />
        </div>
        <button className={styles.viewLeaderboardBtn}>View Leaderboard</button>
      </div>
      <div
        style={{ backgroundColor: "#152033", width: "50%" }}
        className={styles.statsHalf}
      >
        <h1
          style={{
            marginTop: "20px",
            position: "relative",
            fontFamily: "Tungsten",
            fontSize: "80px",
            color: "#FF4656",
            zIndex: 3,
            textAlign: "center",
          }}
        >
          Lookup your personal statistics
        </h1>
        <div className={styles.statsImageContainer}>
          <img
            src={stats}
            className={styles.statsImage}
            alt="stats"
          />
        </div>
        <button className={styles.viewStatsBtn}>View Stats</button>
      </div>
    </div>
  );
};

export default LeaderboardSection;
