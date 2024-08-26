import React from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import styles from "./App.module.css";
import { Outlet , useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const showContent = location.pathname === "/";
  return (
    <div className={styles.app}>
      {showContent && <Header />}
      {showContent && <MainContent />}
      <Outlet/>
    </div>
  );
};

export default App;
