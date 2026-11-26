import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://order-billing-system.onrender.com";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/users/login`,
                { username, password }
            );

            localStorage.setItem("token", response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Check your username, password, and backend deployment.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Order Billing System</h1>
                <p className="login-subtitle">
                    Inventory &amp; Billing Dashboard
                </p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button className="login-btn" onClick={login}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Login;