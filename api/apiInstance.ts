import axios from "axios";

import { BASE_URL } from "../constants";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "timeout": 1000
    }
});

export default instance;