import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRecipe.css";

const AddRecipe = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/build" } });
    }
  }, [isLoggedIn, navigate]);
};

export default AddRecipe;
