import React from "react";
import MainContent from "./components/LandingPage/LandingPage";
import styles from "./App.module.css";
import { Outlet , useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const App = () => {
  const location = useLocation();
  const showLandingPage = location.pathname === "/";
  const showHeader = location.pathname !== "/" && location.pathname !== "/signin" && location.pathname !== "/signup";
  return (
    <div className={styles.app}>
      {showLandingPage && <MainContent />}
      {showHeader && <Header />}
      <GoogleOAuthProvider clientId="664359618308-c4ne7t8db9vecfu317rmjd4fb0rkkj15.apps.googleusercontent.com">
      <Outlet/>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
