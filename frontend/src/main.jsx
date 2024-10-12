import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"
import SignUp from './components/Sign Up/SignUp.jsx';
import SignIn from './components/Sign in/SignIn.jsx';
import Home from './components/Home/Home.jsx';
import AgentsList from './components/AgentsList/AgentsList.jsx'
import AgentPage from './components/AgentPage/AgentPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Weapon from './components/Weapon/Weapon.jsx';
import WeaponCarousel from './components/ArsenalList/WeaponsCarousel.jsx';
import Leaderboard from './components/Leaderboard/Leaderboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute>},
      {path: "/agents", element: <ProtectedRoute><AgentsList /></ProtectedRoute> },
      {path: "/agents/:name", element: <ProtectedRoute><AgentPage /></ProtectedRoute> },
      { path: "/arsenal" , element: <ProtectedRoute><WeaponCarousel/></ProtectedRoute>},
      { path: "/weapon/:uuid" , element: <ProtectedRoute><Weapon/></ProtectedRoute>},
      { path: "/leaderboard" , element: <ProtectedRoute><Leaderboard/></ProtectedRoute>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
