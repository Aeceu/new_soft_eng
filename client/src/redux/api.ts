import axios from "axios";

const baseURL = "https://pwd-kainakap-server.vercel.app/api/v1";
// const localURL = "http://localhost:4200/api/v1";

export default axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
