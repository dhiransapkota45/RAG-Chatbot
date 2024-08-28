import { AxiosResponse } from "axios";
import { instance } from "./instance";
import { config } from "../config/config";
import { TConversationPayload } from "../types/types";

export const query: <T>(url: string) => Promise<AxiosResponse<T>> = async (
  url
) => {
  try {
    const data = await instance.get(`${config.BACKENDURL}/${url}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const mutate: <T>(
  url: string,
  method: "post" | "put" | "patch" | "delete",
  body?: any,
  headers?: any
) => Promise<AxiosResponse<T>> = async (
  url,
  method,
  body = undefined,
  headers = undefined
) => {
  try {
    const response = await instance[method](
      `${config.BACKENDURL}/${url}`,
      body,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const promptLlm = async (
  payload: TConversationPayload,
  setAssistantResponse: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };
    sessionStorage.getItem("access_token") &&
      (headers["Authorization"] = `Bearer ${sessionStorage.getItem(
        "access_token"
      )}`);
    const response = await fetch(`${config.BACKENDURL}/api/prompt`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      if (!reader) return null;
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      setAssistantResponse((prev: string) => prev + chunk);
    }
  } catch (error) {
    return null;
  }
};
