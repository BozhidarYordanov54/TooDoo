import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../../css/forms.css"

const url = "http://localhost:5058/api/authentication/login";

export default function Login({ onLogin }) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    document.title += " | Login";

    const submitHandler = async (e) => {
        e.preventDefault();
        setPending(true);
        try {
            const response = await axios.post(
                url,
                { username, password, },
                { headers: { "Content-Type": "application/json", }, }
            );

            if (response.status === 200) {
                const data = await response.data;
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("token", data.token);
                onLogin();
                navigate("/");
            } else {
                setError(response.data.message);
                // Handle login failure (e.g., show an error message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPending(false);
        }
    };

    const setUsernameHandler = (e) => {
        setUsername(e.target.value);
    };

    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const rememberMeHandler = (e) => {
        setRememberMe(e.target.checked);
    }

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-form-wrapper">
                    <form className="form login" onSubmit={submitHandler}>
                        <h2>Login</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={setUsernameHandler}
                                value={username}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={setPasswordHandler}
                                value={password}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-group remember-me">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                onChange={rememberMeHandler}
                                checked={rememberMe}
                            />
                            <label htmlFor="rememberMe" className="check-box">Remember me?</label>
                        </div>
                        <div className="form-group">
                            <button className="submit" type="submit" disabled={pending}>
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="error">{error}</p>

                    <div className="redirect-auth">
                        <p>Don't have an account?</p>
                        <a href="/auth/register">Register now</a>
                    </div>
                </div>
                <div className="register-wrapper">
                    <div className="register-content">
                        <div className="register-content-header">
                            <h2>Register</h2>
                            <p>Don't have an account yet?</p>
                        </div>
                        <div className="main-content">
                            <p>Register now to start managing your tasks with TooDoo, and don't miss any important tasks</p>
                        </div>
                        <div className="register-button">
                            <a href="/auth/register">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
