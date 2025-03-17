import { NavLink } from "react-router";

const loginData = {
    header: "Login",
    main: "Already have an account?",
    content: "Login into your account to see the important tasks you have too dod",
    button: "Login",
    link: "/auth/login"
}

const registerData = {
    header: "Register",
    main: "Don't have an account yet?",
    content: "Register now to start managing your tasks with TooDoo, and don't miss any important tasks",
    button: "Register",
    link: "/auth/register"
};

export default function AuthAccountRedirect({isLogin}) {
    return (
        <div className="account-wrapper">
            <div className="account-content">
                <div className="account-content-header">
                    <h2>{isLogin ? registerData.header : loginData.header}</h2>
                    <p>{isLogin ? registerData.main : loginData.header}</p>
                </div>
                <div className="main-content">
                    <p>{isLogin ? registerData.content : loginData.content}</p>
                </div>
                <div className="account-button">
                    <NavLink to={isLogin ? registerData.link : loginData.link}>{isLogin ? registerData.button : loginData.button}</NavLink>
                </div>
            </div>
        </div>
    )
}