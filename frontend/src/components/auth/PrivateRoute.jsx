import axios from "axios";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ onInvalidToken, children }) {
    const token = localStorage.getItem("token");

    if (token === null) {
        return <Navigate to="/auth/login" />;
    }

    const decodedToken = jwtDecode(token);

    const isTokenValid = decodedToken.exp * 1000 > new Date().getTime();

    if (!isTokenValid) {
        const refreshURL = "http://localhost:5058/api/authentication/refreshToken";
        const refreshTokenHandler = async () => {
            try {
                const response = await axios.post(refreshURL, {
                    refreshToken: localStorage.getItem("refreshToken"),
                    token: token,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    const data = await response.data;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("refreshToken", data.refreshToken);
                }

            } catch (error) {
                console.log(error);
                onInvalidToken();
            }

        };

        refreshTokenHandler();
    }

    //* If user is not logged in, redirect to login page
    //* Otherwise, render the children element that is set
    return isTokenValid ? children : <Navigate to="/auth/login" />;

}
