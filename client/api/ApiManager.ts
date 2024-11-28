import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const ApiManager = axios.create({
    baseURL: `${apiUrl}/api`,
    withCredentials: true,
})

export default ApiManager;