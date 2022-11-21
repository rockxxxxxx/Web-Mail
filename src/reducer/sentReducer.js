import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sentbox: [],
};

export const fetchSentbox = createAsyncThunk("mail/fetchSentbox", (email) => {
  return axios
    .get(
      `https://web-mail-7f9cf-default-rtdb.firebaseio.com/${email
        .split(".")
        .join("")}.json`
    )
    .then((response) => response.data);
});

const sentboxSlice = createSlice({
  name: "mail",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSentbox.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchSentbox.fulfilled, (state, action) => {
      state.sentbox = [];
      if (action.payload !== null) {
        for (let [key, data] of Object.entries(action.payload)) {
          state.sentbox = [
            ...state.sentbox,
            {
              fireBaseId: key,
              from: data.from ? data.from : "",
              to: data.to ? data.to : "",
              sentOn: data.sentOn ? data.sentOn : "",
              sentAt: data.sentAt ? data.sentAt : "",
              subject: data.subject ? data.subject : "",
              message: data.message ? data.message : "",
              isReceived: !data.isReceived ? data.isReceived : "",
            },
          ];
        }
      }
    });
    builder.addCase(fetchSentbox.rejected, () => {
      console.log("rejected");
    });
  },
});

export default sentboxSlice.reducer;
