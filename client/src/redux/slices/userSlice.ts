import { createSlice } from "@reduxjs/toolkit";
import { StepFive, StepFour, StepOne, StepSix, StepThree, StepTwo, TUser } from "../types/user";
import { loginUser, loginViaQR, registerUser, verifyOTP } from "../actions/userAction";

type initialStateType = {
  user: TUser | null;
  token: string | null;
  loading: boolean;
  error: boolean;
  newUser:
    | (StepOne &
        StepTwo &
        StepFour &
        StepFive &
        StepSix & {
          emergencyPerson: StepThree;
        })
    | null;
  registrationStatus: "idle" | "pending" | "completed";
  loginStatus: "logging" | "verify" | "completed";
  userId: string | null;
};

const initialState: initialStateType = {
  loading: false,
  user: null,
  token: null,
  newUser: null,
  userId: null,
  error: false,
  loginStatus: "logging",
  registrationStatus: "idle", // 'idle' | 'pending' | 'completed'
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNewUser: (state, action) => {
      state.newUser = { ...state.newUser, ...action.payload };
      state.registrationStatus = "pending"; // set to 'pending' when new user data is set
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    resetNewUser: (state) => {
      state.newUser = null;
      state.loading = false;
      state.error = false;
      state.registrationStatus = "idle"; // reset to 'idle'
    },
    handleLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registrationStatus = "pending";
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationStatus = "completed"; // set to 'completed' on success
        state.newUser = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.registrationStatus = "idle"; // reset to 'idle' on failure
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = "verify";
        state.userId = action.payload.id;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.loginStatus = "logging";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loginStatus = "completed";
      })
      .addCase(loginViaQR.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginViaQR.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loginStatus = "completed";
      });
  },
});

export const { setUser, setNewUser, resetNewUser, handleLogout, setToken, setUserId } =
  userSlice.actions;
export default userSlice.reducer;
