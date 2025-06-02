import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { accessToken, login } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate("/overview", { replace: true });
    }
  }, [accessToken, navigate]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/token/", form); // JWT endpoint
      const { access, refresh } = res.data;

      login(access, refresh); // Save both tokens
      alert("Login Successful");
      navigate("/overview", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.detail || "Login failed.";
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Login
        </button>
      </form>

      <button
        onClick={() => navigate("/register")}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        type="button"
      >
        Register
      </button>
    </div>
  );
};

export default Login;
