import axios from "axios";
import config from "../main/appConfig";

export const fetchApi = axios.create({
  baseURL: config.BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});
