import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function Signup() {
  const [inputs, changeInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    changeInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/signup`,
        inputs
      );
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h1>Signup</h1>
        <input
          required
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Signup</button>
        {error && <p className="error-text">{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
