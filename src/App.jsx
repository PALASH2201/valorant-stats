import React from "react";
import MainContent from "./components/MainContent/MainContent";
import styles from "./App.module.css";
import { Outlet , useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  const location = useLocation();
  const showLandingPage = location.pathname === "/";
  const showHeader = location.pathname !== "/";
  return (
    <div className={styles.app}>
      {showLandingPage && <MainContent />}
      {showHeader && <Header />}
      <Outlet/>
    </div>
  );
};

export default App;
