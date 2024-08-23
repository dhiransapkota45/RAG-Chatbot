import { AxiosResponse } from "axios";
import { instance } from "./instance";
import { config } from "../config/config";

export const get: <T>(url: string) => Promise<AxiosResponse<T>> = async (
  url
) => {
  try {
    console.log();
    const data = await instance.get(`${config.BACKENDURL}/${url}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const post: <T>(url: string, body: any) => Promise<T> = async (
  url,
  body
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
