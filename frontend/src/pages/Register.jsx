import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import api from "../Api";

const Register = () => {
  const navigate = useNavigate(); // ✅ Init navigate

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
    if (generalError) setGeneralError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    try {
      await api.post("auth/users/", form);
      alert("Registration successful. You can now log in.");
      navigate("/login", { replace: true }); // ✅ Redirect after success
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;

        if (data.non_field_errors) {
          setGeneralError(data.non_field_errors.join(" "));
        }

        const fieldErrors = { ...data };
        delete fieldErrors.non_field_errors;
        setErrors(fieldErrors);
      } else {
        setGeneralError("Registration failed.");
      }
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.25rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.5rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  };

  const errorTextStyle = {
    color: "red",
    fontSize: "0.875rem",
    marginBottom: "0.75rem",
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Register</h2>

      {generalError && <div style={errorTextStyle}>{generalError}</div>}

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
        style={inputStyle}
        value={form.username}
      />
      {errors.username &&
        errors.username.map((msg, idx) => (
          <div key={idx} style={errorTextStyle}>
            {msg}
          </div>
        ))}

      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
        style={inputStyle}
        value={form.email}
      />
      {errors.email &&
        errors.email.map((msg, idx) => (
          <div key={idx} style={errorTextStyle}>
            {msg}
          </div>
        ))}

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
        style={inputStyle}
        value={form.password}
      />
      {errors.password &&
        errors.password.map((msg, idx) => (
          <div key={idx} style={errorTextStyle}>
            {msg}
          </div>
        ))}

      <input
        name="re_password"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
        required
        style={inputStyle}
        value={form.re_password}
      />
      {errors.re_password &&
        errors.re_password.map((msg, idx) => (
          <div key={idx} style={errorTextStyle}>
            {msg}
          </div>
        ))}

      <button type="submit" style={buttonStyle}>
        Register
      </button>
    </form>
  );
};

export default Register;
