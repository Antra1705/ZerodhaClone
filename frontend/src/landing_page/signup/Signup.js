import React, { useState } from "react";
import api from "../../api";
import "./SignUp.css";

const SignUp = () => {
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
            await api.post("/api/auth/signup", formData);
            window.location.href = "http://localhost:3001";
        } catch (err) {
            setError(err.response?.data?.msg || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-card" onSubmit={handleSubmit}>
                <h2>Create your account</h2>
                <p className="subtitle">Start investing with confidence</p>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
