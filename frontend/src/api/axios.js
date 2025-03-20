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