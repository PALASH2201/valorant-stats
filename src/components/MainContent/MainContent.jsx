// MainContent.js
import React from "react";
import styles from "./MainContent.module.css";
import jettArtwork from "../../assets/Jett_artwork.png";
import harborArtwork from "../../assets/Harbor_artwork.png";
import valoEdit from "../../assets/Valo Edit.mp4";
import trapezium from "../../assets/Blue Trapezium.png";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/signin');
  }
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
            <video autoPlay loop muted playsInline className={styles.video}>
              <source src={valoEdit} type="video/mp4" />
            </video>
          </div>
          <div className={styles.textContent}>
            <h2>STATS • INFO • INSIGHTS</h2>
          </div>
          <button className={styles.exploreButton} onClick={handleClick}>EXPLORE NOW</button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
