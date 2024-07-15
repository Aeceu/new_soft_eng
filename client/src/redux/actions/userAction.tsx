/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api";
import {
  StepFive,
  StepFour,
  StepOne,
  StepSix,
  StepThree,
  StepTwo,
  UserSignIn,
} from "../types/user";
import { HandleApiError } from "../../utils/handleAPIError";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    newUser:
      | (StepOne &
          StepTwo &
          StepFour &
          StepFive &
          StepSix & {
            emergencyPerson: StepThree;
          })
      | null,
    { rejectWithValue }
  ) => {
    if (!newUser) return;
    try {
      const { repassword, ...data } = newUser;
      const res = await axios.post("/user/signup", { newUser: data });
      toast.success("User created successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to create user!");
      const handledError = HandleApiError(error);

      return rejectWithValue(handledError);
    }
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data: UserSignIn) => {
  try {
    const res = await axios.post("/user/login", { email: data.email, password: data.password });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error("Failed to login user!");
    const handledError = HandleApiError(error);
    console.log(handledError);
  }
});

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async ({ otp, userId }: { userId: string; otp: string }) => {
    try {
      const res = await axios.post(
        "/user/verify",
        { otp, userId },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error("Failed to login user!");
      const handledError = HandleApiError(error);
      console.log(handledError);
    }
  }
);

export const loginViaQR = createAsyncThunk("user/loginViaQR", async (userId: string) => {
  try {
    const res = await axios.get(`/user/qr/${userId}`, {
      withCredentials: true,
    });
    toast.success(res.data.message);
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error("Failed to login user!");
    const handledError = HandleApiError(error);
    console.log(handledError);
  }
});
