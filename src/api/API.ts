import axios, { AxiosRequestConfig } from "axios";
import { CONFIG } from "src/constants/config";

const apiConfig = {
  BASE_URL: CONFIG.BASE_URL,
  TIMEOUT: 15000,
};

const axiosConfig: AxiosRequestConfig = {
  baseURL: apiConfig.BASE_URL,
  timeout: apiConfig.TIMEOUT,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

axios.defaults.withCredentials = true;

export const API = axios.create(axiosConfig);
