import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // Store token securely
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Also set a standard document cookie for cross-domain/app usage
        document.cookie = `token=${res.data.token}; path=/; max-age=86400; SameSite=Lax`;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.msg || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-visual-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="brand-logo">
            <span className="logo-text">TradeDash</span>
            <span className="terminal-badge">TERMINAL</span>
          </div>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your premium US equity trading account</p>
        </div>

        {error && (
          <div className="error-alert">
            <i className="fa fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group-custom">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <i className="fa fa-envelope input-icon"></i>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-signin" disabled={loading}>
            {loading ? (
              <span className="spinner-loader">
                <i className="fa fa-circle-o-notch fa-spin"></i> Authenticating...
              </span>
            ) : (
              <span>Access Terminal <i className="fa fa-arrow-right"></i></span>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="/signup" className="signup-link">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
