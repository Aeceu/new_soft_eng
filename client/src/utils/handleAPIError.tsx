import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const HandleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const axiosErr = error as AxiosError;
    if (typeof axiosErr.response?.data === "string") {
      toast.error(axiosErr.response?.data);
      return axiosErr.response?.data;
    }
    return { message: "Unexpected Error!", user: null };
  }
  return { message: "Unexpected Error!", user: null };
};

export const HandleApiSuccess = (error: unknown) => {
  if (error instanceof AxiosError) {
    const axiosErr = error as AxiosError;
    if (typeof axiosErr.response?.data === "string") {
      return axiosErr.response?.data;
    }
  }
};
