import { createSlice } from "@reduxjs/toolkit";

function loadFromStorage(key, defaultValue) {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  return JSON.parse(savedValue);
}

const initialState = {
  users: loadFromStorage("users", []),
  currentUser: loadFromStorage("currentUser", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    registerUser(state, action) {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    logoutUser(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;