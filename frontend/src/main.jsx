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
import AgentsList from './components/AgentsArsenalList/AgentsList.jsx'
import AgentPage from './components/AgentPage/AgentPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
