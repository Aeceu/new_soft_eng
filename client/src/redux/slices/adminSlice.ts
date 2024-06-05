import { createSlice } from "@reduxjs/toolkit";
import { TAdmin } from "../types/user";

type initialStateType = {
  admin: TAdmin | null;
  token: string | null;
  loading: boolean;
};

const initialState: initialStateType = {
  loading: false,
  admin: null,
  token: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    handleLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const { setAdmin, handleLogout, setToken } = adminSlice.actions;
export default adminSlice.reducer;
