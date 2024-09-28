import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"
import SignUp from './components/Sign Up/SignUp.jsx';
import SignIn from './components/Sign in/SignIn.jsx';
import Home from './components/Home/Home.jsx';
import Weapon from './components/Weapons/Weapon.jsx'
import WeaponCarousel from './components/Weapons/WeaponCarousel.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/home", element: <Home /> },
      { path: "/arsenal" , element: <WeaponCarousel/>},
      { path: "/weapon/:uuid" , element: <Weapon/>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
