import { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardEntry from "./LeaderboardEntry";
import styles from "./leaderboard.module.css";
import { Dropdown } from "react-bootstrap";
import GroupedSelect from "./Groupselect";
import Loading from "../LoadingSpinner/Loading";

const Leaderboard = () => {
  const [region, setRegion] = useState("ap");
  const [episode, setEpisode] = useState("e9a2");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leaders, setLeaders] = useState([]);
  const [cardImages ,setCardImages] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const entriesPerPage = 100;

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };
  const handleEpisodeChange = (newEpisode) => {
    console.log(newEpisode);
    setEpisode(newEpisode);
  };
  const axiosInstance = axios.create({
    baseURL: `https://api.henrikdev.xyz/valorant/v3/leaderboard/${region}/pc?season_short=${episode}`,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      api_key: process.env.REACT_APP_LEADERBOARD_API_KEY,
    },
  });
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get();
        const players = [];
        for (let i = 0; i < 3; i++) {
          players.push(response.data.data.players[i]);
        }
        setLeaders(players);
        setLeaderboardData(response.data.data.players);
        return players;
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally{
        setIsLoading(false);
      }
    };

    const fetchCards = async (players) => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");
        const response = await axios.post(
          "http://127.0.0.1:5000/leaderboard",
          { players: players },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCardImages(response.data);
      } catch (error) {
        console.error("Error fetching card images:", error);
      } finally{
        setIsLoading(false);
      }
    };

    const loadData = async () => {
      const players = await fetchLeaderboardData();
      if (players) {
        await fetchCards(players);
      }
    };
    loadData(); 

  }, [region, episode]);


  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaderboardData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(leaderboardData.length / entriesPerPage); // Calculate total pages

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.leaderboard}>
      {isLoading ? <Loading/> : <></>}
      <div className={styles.leaderboardHeader}>
        <h2
          style={{
            fontSize: "5em",
            fontFamily: "Tungsten",
            color: "#ff4656e1",
          }}
        >
          View Leaderboard
        </h2>
      </div>
        {isLoading ? <></>: (
          <div className={styles.leaderboardContainer}>
          <div className={styles.tableContainer}>
          <div className={styles.filterButtons}>
            <div className={styles.regionSelector}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className={styles.region}
                >
                  {region.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ backgroundColor: "#222f45" }}>
                  <Dropdown.Item
                    onClick={() => handleRegionChange("eu")}
                    style={{ color: "white", backgroundColor: "#222f45" }}
                  >
                    Europe
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRegionChange("latam")}
                    style={{ color: "white", backgroundColor: "#222f45" }}
                  >
                    Latin America
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRegionChange("br")}
                    style={{ color: "white", backgroundColor: "#222f45" }}
                  >
                    Brazil
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRegionChange("na")}
                    style={{ color: "white", backgroundColor: "#222f45" }}
                  >
                    North America
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRegionChange("ap")}
                    style={{ color: "white", backgroundColor: "#222f45" }}
                  >
                    Asia-Pacific
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className={styles.episodeSelector}>
              <GroupedSelect option={handleEpisodeChange} />
            </div>
          </div>
          <div className={styles.leaderboardTable}>
            <div className={styles.tableHeader}>
              <div className="header-rank">Rank</div>
              <div className="header-name">Player Name</div>
              <div className="header-rating" style={{ textAlign: "center" }}>
                Ranked Rating
              </div>
              <div className="header-tier" style={{ textAlign: "center" }}>
                Tier
              </div>
              <div className="header-wins" style={{ textAlign: "center" }}>
                Wins
              </div>
            </div>
            {currentEntries.map((entry) =>
              entry.name != "" ? (
                <LeaderboardEntry
                  className={styles.leaderboardEntry}
                  key={entry.leaderboard_rank}
                  rank={entry.leaderboard_rank}
                  playerName={entry.name}
                  tag={entry.tag}
                  rating={entry.rr}
                  tier={entry.tier}
                  wins={entry.wins}
                />
              ) : null
            )}
          </div>
          <div className={styles.pagination}>
            <button
              className={`${styles.pageButton} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`${styles.pageButton} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className={styles.podiumOuterContainer}>
          <div className={styles.podiumContainer}>
            <div className={styles.secondContainer}>
              <img src={cardImages[1]} alt="2nd Place" />
              <p style={{ marginBottom: "100px" }}>2ND</p>
            </div>
            <div className={styles.firstContainer}>
              <img src={cardImages[0]} alt="1st Place" />
              <p style={{ marginBottom: "150px" }}>1ST</p>
            </div>
            <div className={styles.thirdContainer}>
              <img src={cardImages[2]} alt="3rd Place" />
              <p style={{ marginBottom: "50px" }}>3RD</p>
            </div>
          </div>
        </div>
      </div>
       )}
    </div>
  );
};

export default Leaderboard;
