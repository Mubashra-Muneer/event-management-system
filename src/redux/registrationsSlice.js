import { createSlice } from "@reduxjs/toolkit";

function loadFromStorage(key, defaultValue) {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  return JSON.parse(savedValue);
}

const initialState = {
  items: loadFromStorage("registrations", []),
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: initialState,
  reducers: {
    registerForEvent(state, action) {
      const newRegistration = action.payload;

      const alreadyRegistered = state.items.some(
        (item) =>
          item.userEmail === newRegistration.userEmail &&
          item.eventId === newRegistration.eventId
      );

      if (alreadyRegistered) {
        return;
      }

      state.items.push(newRegistration);
      localStorage.setItem("registrations", JSON.stringify(state.items));
    },
    cancelRegistration(state, action) {
      const userEmail = action.payload.userEmail;
      const eventId = action.payload.eventId;

      state.items = state.items.filter(
        (item) => !(item.userEmail === userEmail && item.eventId === eventId)
      );
      localStorage.setItem("registrations", JSON.stringify(state.items));
    },
  },
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;

export default registrationsSlice.reducer;
