// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clears localStorage and context
    navigate("/login", { replace: true }); // redirect immediately
  }, [logout, navigate]);

  return null; // no UI needed
};

export default Logout;
