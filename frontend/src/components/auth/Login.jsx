import { useEffect, useState } from "react";
import { useLogin } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import "../../css/forms.css"

import AuthAccountRedirect from "../common/AuthAccountRedirect";

const title = "TooDoo | Login";

export default function Login() {
    const { handleLogin } = useAuth();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [pending, setPending] = useState(false);

    const { login } = useLogin();

    useEffect( () => {
        document.title = title;
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setPending(true);

        try{
            const response = await login(username, password);
            handleLogin(response.data);
        } catch (error) {
            setError(error.response?.data?.message || error.message || "An unexpected error occurred.");
        } finally {
            setPending(false);
        }
    };

    const setUsernameHandler = (e) => {
        if(e.target.value.length > 0){
            e.target.classList.add("filled");
        }

        setUsername(e.target.value);
    };

    const setPasswordHandler = (e) => {
        if(e.target.value.length > 0){
            e.target.classList.add("filled");
        }
        
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
                            <button className="submit" type="submit" disabled={pending}>Login</button>
                        </div>
                    </form>
                    <p className="error">{error}</p>

                    <div className="redirect-auth">
                        <p>Don't have an account?</p>
                    </div>
                </div>
                <AuthAccountRedirect isLogin={true} />
            </div>
        </>
    );
}
