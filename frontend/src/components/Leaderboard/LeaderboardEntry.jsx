import React from "react";
import styles from "./leaderboard.module.css";

const LeaderboardEntry = ({ rank, playerName, tag, rating, tier, wins }) => {
  const map ={
    27:"Radiant",
    26:"Immortal 3",
    25:"Immortal 2",
    24:"Immortal 1"
  }
  return (
    <div className={styles.leaderboardEntry}>
      <div className="rank" style={{fontWeight: "bold"}}>{rank}</div>
      <div className="player-name">
        <span style={{ fontWeight: "bold" }}>{playerName}</span>{" "}
        <span style={{ fontSize:"0.9rem",backgroundColor: "#ffffff10",padding:'2px'}}>#{tag}</span>
      </div>
      <div className="rating"style={{fontWeight: "bold" , textAlign:"center"}}>{rating}</div>
      <div className="tier" style={{fontWeight: "bold", textAlign:"center"}}>{map[tier].toUpperCase()}</div>
      <div className="wins" style={{fontWeight: "bold", textAlign:"center"}}>{wins}</div>
    </div>
  );
};

export default LeaderboardEntry;
