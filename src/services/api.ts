import axios, { AxiosInstance } from "axios";

export const useCastApi = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.REACT_APP_CAST_API,
  });
};
