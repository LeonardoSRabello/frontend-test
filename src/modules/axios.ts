import axios, { AxiosInstance } from "axios";

export const getApiClient = (contentType: string): AxiosInstance => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": contentType,
    },
  });
};
