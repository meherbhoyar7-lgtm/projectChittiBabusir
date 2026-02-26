import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validate = () => {
    if (!form.name.trim()) return "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setVerificationSent(true);

    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
          avatar: preview,
        })
      );

      localStorage.setItem("isAuthenticated", "true");

      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="auth-wrapper">
      <motion.div
        className="auth-card glass"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Create Account</h2>
        <p className="subtitle">Start your analytics journey</p>

        {verificationSent ? (
          <p className="verify-msg">
            📧 Verification email sent... Redirecting
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="avatar-upload">
              <label htmlFor="avatar">
                {preview ? (
                  <img src={preview} alt="avatar" />
                ) : (
                  "Upload Avatar"
                )}
              </label>

              <input
                type="file"
                id="avatar"
                hidden
                accept="image/*"
                onChange={handleAvatar}
              />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            {error && <p className="error-text">{error}</p>}

            <button className="primary-btn">Register</button>
          </form>
        )}

        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;