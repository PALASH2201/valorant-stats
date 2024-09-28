import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Weapon from "./Weapon";
import styles from './weaponcarousel.module.css';

const WeaponCarousel = () => {
    const [weapon, setWeapon] = useState([]);
    const navigate = useNavigate();
    const axiosInstance = axios.create({
        baseURL: "https://valorant-api.com/v1/weapons",
        headers: {
            "Content-Type": "application/json",
        },
    });

    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                const response = await axiosInstance.get();
                //console.log(response.data.data);
                const weaponData = response.data.data;
                const weapon = weaponData.map(item => ({
                    uuid: item.uuid,
                    displayIcon: item.displayIcon,
                    displayName: item.displayName
                }));
                setWeapon(weapon);
            } catch (error) {
                console.error("Error fetching weapon data:", error);
            }
        };

        fetchWeapon();
    }, [])

    const handleAgentClick = (uuid) => {
        navigate(`/weapon/${uuid}`);
      };

    const chunkWeapons = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const weaponChunks = chunkWeapons(weapon, 2);
    return (
        <div className={styles.weaponListContainer}>
            <p style={{ fontFamily: 'Tungsten', fontSize: '100px', color: 'white', marginBottom: '0px', marginLeft: '30px' }}>ARSENAL</p>
            <Carousel fade style={{ margin: "0px 0px" }} indicators={true} interval={null}>
                {weaponChunks.map((chunk, index) => (
                    <Carousel.Item key={index} >
                        <div className={styles.scrollContainer}>
                            {chunk.map((weapon) => (
                                <div
                                    key={weapon.displayName}
                                    className={styles.weaponCard}
                                    onClick={() => handleAgentClick(weapon.uuid)}
                                >
                                    <img
                                        src={weapon.displayIcon}
                                        alt={weapon.displayName}
                                        className={styles.weaponImage}
                                    />
                                    <p>{weapon.displayName}</p>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};


export default WeaponCarousel;