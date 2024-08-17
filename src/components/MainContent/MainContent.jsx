// MainContent.js
import React from "react";
import styles from "./MainContent.module.css";
import jettArtwork from "../../assets/Jett_artwork.png";
import harborArtwork from "../../assets/Harbor_artwork.png";
import videoPlaceholder from "../../assets/image 354.png";
import trapezium from "../../assets/Blue Trapezium.png";

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <img src={trapezium} alt="Gameplay" className={styles.trapezium} />
      <div className={styles.homeContainer}>
        <div className={styles.backgroundCharacters}>
          <img
            src={jettArtwork}
            alt="Character 1"
            className={styles.character1}
          />
          <img
            src={harborArtwork}
            alt="Character 2"
            className={styles.character2}
          />
        </div>
        <div className={styles.overlayContent}>
          <div className={styles.videoContainer}>
          <img
            src={videoPlaceholder}
            alt="Character 2"
            className={styles.character2}
          />
          </div>
          <div className={styles.textContent}>
            <h2>STATS • INFO • INSIGHTS</h2>
          </div>
          <button className={styles.exploreButton}>EXPLORE NOW</button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
