import axios from "axios";

const baseURL = "https://localhost:5058";

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true
});

axiosPrivate.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh token (replace with your API call)
                await axios.post(`${baseURL}/api/auth/refreshToken`, {}, { withCredentials: true });

                const newResponse = await axiosPrivate(originalRequest);
                return newResponse;
            } catch (err) {
                console.error("Refresh token request failed", err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
