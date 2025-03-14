import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const url = "http://localhost:5058/api/authentication/login";

export default function Login( {onLogin} ) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

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

    return (
        <>
            <form className="form login" onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={setUsernameHandler}
                        value={username}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={setPasswordHandler}
                        value={password}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={pending}>
                        Login
                    </button>
                </div>
            </form>
            <p className="error">{error}</p>
        </>
    );
}
