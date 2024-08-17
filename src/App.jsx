import React from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
