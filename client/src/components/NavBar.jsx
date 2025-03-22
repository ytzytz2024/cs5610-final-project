import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    // Clear any authentication tokens
    localStorage.removeItem("token");
    // Update auth state
    setIsLoggedIn(false);
  };

  return <div>NavBar</div>;
}
