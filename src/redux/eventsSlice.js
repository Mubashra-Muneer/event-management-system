import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents, getEventById } from "../api/ticketmaster.js";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (filters) => {
    const events = await getEvents(filters);
    return events;
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (eventId) => {
    const event = await getEventById(eventId);
    return event;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: "",
  selectedEvent: null,
  detailsStatus: "idle",
  detailsError: "",
};

const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    clearSelectedEvent(state) {
      state.selectedEvent = null;
      state.detailsStatus = "idle";
      state.detailsError = "";
    },
  },
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
      })
      .addCase(fetchEventById.pending, (state) => {
        state.detailsStatus = "loading";
        state.detailsError = "";
        state.selectedEvent = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError = action.error.message;
      });
  },
});

export const { clearSelectedEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
