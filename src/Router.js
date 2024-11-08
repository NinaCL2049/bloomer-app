import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { parse } from 'cookie';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Session from "./components/Session";
import Menu from "./components/Menu";
import About from "./components/About";
import History from "./components/History";
import { MyTimer, DiscreteSlider } from "./components/Session";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = checkAuth();
  console.log('Auth check result:', isAuthenticated);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const checkAuth = () => {
  try {
    const cookies = parse(document.cookie);
    console.log('Current cookies:', cookies);
    return cookies["loggedIn"] === "true";
  } catch (error) {
    console.error('Cookie parsing error:', error);
    return false;
  }
};

const RootRedirect = () => {
  const isAuthenticated = checkAuth();
  console.log('Root redirect auth check:', isAuthenticated);
  return isAuthenticated ? <Navigate to="/menu" /> : <Navigate to="/login" />;
};

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
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Home />} />
      <Route path="/menu" element={<ProtectedRoute component={Menu} />} />
      <Route path="/signup" element={<ProtectedRoute component={Signup} />} />
      <Route
        path="/session"
        element={<ProtectedRoute component={SessionWrapper} />}
      />
      <Route path="/history" element={<ProtectedRoute component={History} />} />
      <Route path="/about" element={<ProtectedRoute component={About} />} />
    </Routes>
  );
};

export default Router;
