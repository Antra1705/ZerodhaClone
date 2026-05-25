import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/signup", formData);

      // Store token securely on successful signup
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Set standard cookie for cross-domain/app usage
        document.cookie = `token=${res.data.token}; path=/; max-age=86400; SameSite=Lax`;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-visual-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
      </div>

      <div className="signup-card">
        <div className="signup-header">
          <div className="brand-logo">
            <span className="logo-text">TradeDash</span>
            <span className="terminal-badge">JOIN</span>
          </div>
          <h2>Create Account</h2>
          <p className="subtitle">Start trading premium US equities in real-time</p>
        </div>

        {error && (
          <div className="error-alert">
            <i className="fa fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group-custom">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <i className="fa fa-user input-icon"></i>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <i className="fa fa-envelope input-icon"></i>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="password">Security Password</label>
            <div className="input-wrapper">
              <i className="fa fa-lock input-icon"></i>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-signup" disabled={loading}>
            {loading ? (
              <span className="spinner-loader">
                <i className="fa fa-circle-o-notch fa-spin"></i> Creating Account...
              </span>
            ) : (
              <span>Launch Account <i className="fa fa-arrow-right"></i></span>
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <a href="/login" className="login-link">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
