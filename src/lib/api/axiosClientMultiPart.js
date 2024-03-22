import axios from "axios";

export const BASE_URL = "https://busdeliveryapi.azurewebsites.net/";

export const axiosClientMultiPart = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosClientMultiPart.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "multipart/form-data";
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const handleApiError = async (error) => {
  try {
    const errorMessage =
      error.response?.data || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};
