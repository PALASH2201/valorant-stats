import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import MainContent from "./MainContent";
import AgentsSection from "./AgentsSection";
import ArsenalSection from "./ArsenalSection";
import LeaderboardSection from "./LeaderboardSection";

const Home = () => {
  return (
    <>
      <MainContent/>
      <AgentsSection/>
      <ArsenalSection/>
      {/* <LeaderboardSection/> */}
    </>
  );
};

export default Home;
