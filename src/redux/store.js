import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import eventsReducer from "./eventsSlice.js";
import registrationsReducer from "./registrationsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

export default store;