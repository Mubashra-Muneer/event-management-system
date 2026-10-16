import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents } from "../api/ticketmaster.js";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (filters) => {
    const events = await getEvents(filters);
    return events;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: "",
};

const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;