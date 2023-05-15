import axios from "axios";
import { API_ROUTE } from "../config";

const apiClient = axios.create({
    baseURL: `${API_ROUTE}/api`,
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;