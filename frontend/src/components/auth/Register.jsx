import AuthAccountRedirect from "../common/AuthAccountRedirect";
import '../../css/forms.css';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRegister } from "../../api/authApi";
export default function Register() {
    const { handleRegister } = useAuth();
    const { register } = useRegister();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const[pending, setIsPending] = useState(false);
    const[error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsPending(true);

        if(password !== confirmPassword){
            setError('Passwords do not match');
            setIsPending(false);
            return;
        }

        const data = await register(username, password, confirmPassword);
        handleRegister(data);
    }

    const setUsernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const setConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
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
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={setConfirmPasswordHandler}
                                value={confirmPassword}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
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
                    </div>
                </div>
                <AuthAccountRedirect isLogin={false} />
            </div>
        </>
    )
}