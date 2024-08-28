import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import MainContent from "./MainContent";
import AgentsSection from "./AgentsSection";

const Home = () => {
  return (
    <>
      <MainContent/>
      <AgentsSection/>
    </>
  );
};

export default Home;
