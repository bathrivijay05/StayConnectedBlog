import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

function Login() {
  const [inputs, changeInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login, currentUser } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleChange = (e) => {
    changeInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      // console.log(err);
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
        <h1>Login</h1>
        <input
          required
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {error && <p className="error-text">{error}</p>}
        <p>
          Don't have any account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
