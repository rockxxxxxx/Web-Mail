import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inbox: [],
  unreadCount: 0,
};

export const fetchInbox = createAsyncThunk("mail/fetchInbox", (email) => {
  return axios
    .get(
      `https://web-mail-7f9cf-default-rtdb.firebaseio.com/${email
        .split(".")
        .join("")}.json`
    )
    .then((response) => response.data);
});

const inboxSlice = createSlice({
  name: "mail",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInbox.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchInbox.fulfilled, (state, action) => {
      state.inbox = [];
      state.unreadCount = 0;
      state.userExpense = [];
      if (action.payload !== null) {
        for (let [key, data] of Object.entries(action.payload)) {
          state.inbox = [
            ...state.inbox,
            {
              fireBaseId: key,
              from: data.from ? data.from : "",
              to: data.to ? data.to : "",
              sentOn: data.sentOn ? data.sentOn : "",
              receivedOn: data.receivedOn ? data.receivedOn : "",
              sentAt: data.sentAt ? data.sentAt : "",
              receivedAt: data.receivedAt ? data.receivedAt : "",
              subject: data.subject ? data.subject : "",
              message: data.message ? data.message : "",
              isReceived: data.isReceived ? data.isReceived : "",
              readStatus: data.readStatus ? data.readStatus : "",
              fromName: data.fromName ? data.fromName : "",
            },
            (state.unreadCount =
              data.isReceived && data.readStatus === false
                ? state.unreadCount + 1
                : state.unreadCount + 0),
          ];
        }
      }
    });
    builder.addCase(fetchInbox.rejected, () => {
      console.log("rejected");
    });
  },
});

export default inboxSlice.reducer;
