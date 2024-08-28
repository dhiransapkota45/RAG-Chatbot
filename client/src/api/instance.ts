import axios from "axios";
import { config } from "../config/config";
export const instance = axios.create({
  baseURL: config.BACKENDURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}` ?? "",
  },
});
