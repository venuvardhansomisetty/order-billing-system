import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

     const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/users/login`,
  { username, password }
);
      

      localStorage.setItem(
        "token",
        response.data
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

    }
  };

 return (

  <div className="login-container">

    <div className="login-card">

      <h1>
        Order Billing System
      </h1>

      <p className="login-subtitle">

        Inventory & Billing Dashboard

      </p>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) =>
          setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)}
      />

      <button
        className="login-btn"
        onClick={login}
      >

        Sign In

      </button>

    </div>

  </div>

);
}

export default Login;
