import axios, { AxiosRequestConfig } from "axios";
import { CONFIG } from "src/constants/config";

const apiConfig = {
  BASE_URL: CONFIG.BASE_URL,
  TIMEOUT: 15000,
};

const axiosConfig: AxiosRequestConfig = {
  baseURL: apiConfig.BASE_URL,
  timeout: apiConfig.TIMEOUT,
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
};

axios.defaults.withCredentials = false;

export const API = axios.create(axiosConfig);

API.interceptors.request.use((config) => {
  config.headers!!.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;

  return config;
});

API.interceptors.response.use(
  (config) => config,
  async (error) => {
    console.warn(
      `Server responded with: ${error?.code} | data: )}`,
      error?.response?.data
    );

    throw error?.response?.data || error;
  }
);
