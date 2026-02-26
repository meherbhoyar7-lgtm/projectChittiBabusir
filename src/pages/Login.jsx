import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    setError("");

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: formData.username,
      })
    );

    localStorage.setItem("isAuthenticated", "true");

    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="glass auth-card">
        <h2>Login</h2>
        <p className="subtitle">Access your dashboard</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="error-text">{error}</p>}

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p className="switch-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;