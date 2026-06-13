import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"https://real-time-chat-app-d9ie.onrender.com/api",
    withCredentials:true,
});