import axios from "axios";
import React, { useEffect } from "react";
import { getCurrentDate } from "../../utils/getDate";
import "./inbox.css";

export default function InboxData({
  subject,
  message,
  receivedOn,
  receivedAt,
  readSatus,
}) {
  return (
    <>
      <tr className={readSatus === true ? "" : "unread"}>
        <td>{subject}</td>
        <td>{message.length > 50 ? message.substring(0, 100) : message}</td>
        <td>{receivedOn === getCurrentDate() ? receivedAt : receivedOn}</td>
      </tr>
    </>
  );
}
