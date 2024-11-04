import React from "react";
import { Routes, Route, Navigate } from "react-router";
import cookie from "cookie";
import Home from "./components/Home";
import Login from "./components/Login";
import Session from "./components/Session";
import History from "./components/History";
import Menu from "./components/Menu";
import Navigation from "./components/Navigation";
import Schedule from "./components/Schedule";

const checkAuth = () => true;

// const ProtectedRoute = (props) => {
//   return checkAuth() === true ? <p>You're logged in</p> : <p>not logged in</p>
// }

const ProtectedRoute = ({ component: Component }) => {
  return checkAuth() ? <Component /> : <Navigate to="/login" />;
};



// all the routes should be protected except to the login.

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={Home}/>} />
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;