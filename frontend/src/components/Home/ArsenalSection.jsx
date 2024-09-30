import styles from "./home.module.css";
import Bulldog from "../../assets/Bulldog.png";
import Guardian from "../../assets/Guardian.png";
import Judge from "../../assets/Judge.png";
import { useNavigate } from "react-router-dom";

const ArsenalSection = () => {
  const  navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/arsenal");
  }
  return (
    <div className={styles.outerContainer}>
      <div style={{ color: "#000000" }} className={styles.textContainer}>
        <h2 style={{ textTransform: "uppercase" }}>Arsenal</h2>
        <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Fight around the world
        </p>
        <p style={{ marginTop: "40px" }}>
          Each map is a playground to showcase your creative thinking.
          Purpose-built for team strategies, spectacular plays, and clutch
          moments. Make the play others will imitate for years to come..
        </p>
        <button className={styles.viewWeaponsBtn} onClick={handleOnClick}>View All Arsenal</button>
      </div>
      <div className={styles.weaponsContainer}>
        <div className={styles.imageContainer}>
          <img
            src={Judge}
            style={{ marginLeft: "300px", height: "25vh" }}
            alt="weapon 1"
          />
          <img
            src={Guardian}
            style={{ marginLeft: "30px", height: "25vh" }}
            alt="weapon 2"
          />
          <img
            src={Bulldog}
            style={{ marginLeft: "300px", height: "25vh" }}
            alt="weapon 3"
          />
        </div>
      </div>
    </div>
  );
};

export default ArsenalSection;
