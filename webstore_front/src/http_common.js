import axios from "axios";
import APP_ENV from "./env";

const http = axios.create({
    baseURL: APP_ENV.REMOTE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("urt");
                const accessToken = localStorage.getItem("auth");
                const model = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };

                const response = await axios.post("account/refresh", model);
                const tokens = response.data.payload;
                localStorage.setItem("auth", tokens.accessToken);
                localStorage.setItem("urt", tokens.refreshToken);

                originalRequest.headers["Authorization"] =
                    "Bearer " + tokens.accessToken;
                return http(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token error", refreshError);
                return refreshError;
            }
        }
        return error;
    }
);

export default http;
