import { HOST } from "../utils/constants.js";
import { default as axios } from "axios";

export const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
    }
})