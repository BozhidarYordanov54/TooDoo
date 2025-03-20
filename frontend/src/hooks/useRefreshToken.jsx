import axios, { axiosPrivate } from "../api/axios";

const useRefreshToken = () => {
    const { token } = useAuth();

    const refresh = async () => {
        const response = await axiosPrivate.post("/api/auth/refreshToken");

        
    }
}