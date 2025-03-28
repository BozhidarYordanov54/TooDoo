import AuthAccountRedirect from "../common/AuthAccountRedirect";
import '../../css/forms.css';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRegister } from "../../api/authApi";
export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const { handleRegister } = useAuth();
    const { register } = useRegister();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setIsPending(false);
                return;
            }

            const data = await register(username, firstName, lastName, email, password, confirmPassword);
            handleRegister(data);

        } finally {
            setIsPending(false);
        }
    }

    const setEmailHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setEmail(e.target.value);
    }

    const setUsernameHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setUsername(e.target.value);
    }

    const setFirstNameHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setFirstName(e.target.value);
    };

    const setLastNameHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setLastName(e.target.value);
    }

    const setPasswordHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setPassword(e.target.value);
    }

    const setConfirmPasswordHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setConfirmPassword(e.target.value);
    }

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-form-wrapper">
                    <form className="form login" onSubmit={submitHandler}>
                        <h2>Register</h2>
                        <div className="multiple-input-wrapper">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    onChange={setFirstNameHandler}
                                    value={firstName}
                                />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    onChange={setLastNameHandler}
                                    value={lastName}
                                />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="multiple-input-wrapper">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={setEmailHandler}
                                    value={email}
                                />
                                <label htmlFor="username">Email</label>
                            </div>
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
                                Register
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