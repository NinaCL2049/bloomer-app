import React from "react";
import { Routes, Route, Navigate } from "react-router";
// import parse from "cookie";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Session from "./components/Session";
// import { BasicLineChart, ColorToggleButton } from "./components/History";
import Menu from "./components/Menu";
import About from "./components/About";
import History from "./components/History";
import { MyTimer, DiscreteSlider } from "./components/Session";
// import Navigation from "./components/Navigation";
// import Schedule from "./components/Schedule";

const checkAuth = () => true;

// const ProtectedRoute = (props) => {
//   return checkAuth() === true ? <p>This is the placeholder checkauth is true text in router.js.</p> : <p>placeholder checkauth is false text in router.js.</p>
// }

const ProtectedRoute = ({ component: Component }) => {
  return checkAuth() ? <Component /> : <Navigate to="/login" />;
};

// const checkAuth = () => {
//   const cookies = cookie.parse(document.cookie);
//   return cookies["loggedIn"] ? true : false;
// };

// all the routes should be protected except to the login.

const SessionWrapper = () => {
  return (
    <>
      <MyTimer />
      <DiscreteSlider />
    </>
  );
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<ProtectedRoute component={Signup} />} />
      <Route
        path="/session"
        element={<ProtectedRoute component={SessionWrapper} />}
      />
      <Route path="/history" element={<ProtectedRoute component={History} />} />
      <Route path="/about" element={<ProtectedRoute component={About} />} />
      <Route path="/menu" element={<ProtectedRoute component={Menu} />} />
    </Routes>
  );
};

export default Router;
