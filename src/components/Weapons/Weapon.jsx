import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./weapons.module.css";
import Slider from "react-infinite-logo-slider";
import WeaponModel from "./Weaponmodel";

const Weapon = () => {
  const [weapon, setWeapon] = useState(null);
  const [skins, setSkins] = useState([]);
  const [stats, setStats] = useState([]);

  const axiosInstance = axios.create({
    baseURL: "https://valorant-api.com/v1/weapons",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const response = await axiosInstance.get(
          "/55d8a0f4-4274-ca67-fe2c-06ab45efdf58"
        );
        console.log(response.data.data);
        setWeapon(response.data.data);
        setSkins(response.data.data.skins);
        setStats(response.data.data.weaponStats);
      } catch (error) {
        console.error("Error fetching weapon data:", error);
      }
    };

    fetchWeapon();
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(255, 70, 85)" }}>
      <h1
        style={{ fontFamily: "Tungsten", fontSize: "90px", marginLeft: "50px" }}
      >
        {weapon?.displayName}
      </h1>
      <div className={styles.textImageContainer}>
        <div className={styles.textContainer}>
          <p className={styles.fireRate}>Fire Rate: <span>{stats?.fireRate}</span></p>
          <p className={styles.magazineSize}>
            Magazine Size: <span>{stats?.magazineSize}</span>
          </p>
          <p className={styles.reloadTime}>
            Reload Time: <span>{stats?.reloadTimeSeconds}s</span>
          </p>
        </div>
        <div className={styles.mainWeaponImageContainer}>
          <WeaponModel/>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <Slider
          width="450px"
          duration={100}
          pauseOnHover={true}
          blurBorders={false}
        >
          {skins.flat().map((skin) => {
            return skin.displayIcon !== null &&
              skin.displayName !== "Random Favorite Skin" &&
              skin.displayName !== `Standard ${weapon.displayName}` ? (
              <Slider.Slide key={skin.displayName}>
                <div className={styles.skinCard}>
                  <img
                    src={skin.displayIcon}
                    alt={skin.displayName}
                    className={styles.skinImage}
                  />
                  <p>{skin.displayName}</p>
                </div>
              </Slider.Slide>
            ) : (
              <></>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Weapon;
