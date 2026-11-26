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

        const data = response.data;
        let token;

        if (typeof data === "string") {
            token = data.trim();

            // Handle a response that is a JSON-encoded string.
            try {
                const parsed = JSON.parse(token);
                if (typeof parsed === "string") {
                    token = parsed;
                } else if (parsed && typeof parsed === "object") {
                    token =
                        parsed.token ??
                        parsed.accessToken ??
                        parsed.jwt;
                }
            } catch {
                // The response was plain text, so keep it as-is.
            }
        } else if (data && typeof data === "object") {
            token =
                data.token ??
                data.accessToken ??
                data.jwt ??
                data.data?.token;
        }

        if (typeof token !== "string" || !token.trim()) {
            console.error("Unexpected login response format");
            alert("Login succeeded, but the server did not return a readable token.");
            return;
        }

        localStorage.setItem("token", token.trim());
        navigate("/dashboard");
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Check your username and password.");
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