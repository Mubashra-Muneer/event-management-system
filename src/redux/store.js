import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import eventsReducer from "./eventsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
});

export default store;