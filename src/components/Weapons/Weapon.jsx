import { useEffect, useState } from "react";
import axios from "axios";
import styles from './weapons.module.css'
import Slider from "react-infinite-logo-slider"

const Weapon = () => {
    const [weapon, setWeapon] = useState(null);
    const [skins, setSkins] = useState([]);

    const axiosInstance = axios.create({
        baseURL: "https://valorant-api.com/v1/weapons",
        headers: {
            "Content-Type": "application/json"
        }
    });

    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                const response = await axiosInstance.get("/55d8a0f4-4274-ca67-fe2c-06ab45efdf58");
                console.log(response.data.data);
                setWeapon(response.data.data);
                setSkins(response.data.data.skins);
            } catch (error) {
                console.error("Error fetching weapon data:", error);
            }
        };

        fetchWeapon();
    }, []);


    return (
        <>
            <h1 style={{ fontFamily: 'Tungsten', fontSize: '90px' , marginLeft:'50px'}}>{weapon?.displayName}</h1>
            <div className="mainWeaponImage">
                <img
                    src={weapon?.displayIcon}
                    alt={weapon?.displayName}
                    className={styles.weaponImage}
                />
            </div>
            <Slider 
                width="450px"
                duration={100}
                pauseOnHover={true}
                blurBorders={false}
                blurBorderColor={'#fff'}
            >
                {skins.flat().map((skin) => {
                    return skin.displayIcon !== null && skin.displayName !== "Random Favorite Skin" && skin.displayName !== `Standard ${weapon.displayName}` ? (
                        <Slider.Slide key={skin.displayName} className={styles.slider}>
                            <div className={styles.agentCard}>
                                <img
                                    src={skin.displayIcon}
                                    alt={skin.displayName}
                                    className={styles.agentImage}
                                />
                                <p>{skin.displayName}</p>
                            </div>
                        </Slider.Slide>
                    ) : <></>
                }
                )}
            </Slider>
        </>
    );
};

export default Weapon;