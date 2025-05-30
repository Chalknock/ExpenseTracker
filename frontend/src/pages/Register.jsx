// src/pages/Register.jsx
import React, { useState } from "react";
import api from "../Api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("auth/users/", form);
      alert("Registration successful. You can now log in.");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      />
      <input
        name="re_password"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
