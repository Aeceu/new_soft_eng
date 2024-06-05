import axios from "axios";

const baseURL = "https://pwd-kainakap-server.vercel.app/api/v1";

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
});
