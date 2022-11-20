import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./inbox.css";
import InboxData from "./InboxData";
import { fetchInbox } from "../../reducer/inboxReducer";

export default function Inbox() {
  const inboxmail = useSelector((data) => data.mail.inbox);
  const email = useSelector((data) => data.authentication.email);
  const dispatch = useDispatch();
  console.log(email);
  useEffect(() => {
    dispatch(fetchInbox(email));
  }, [email]);

  return (
    <div class="card">
      <div class="card-body">
        <table class="table">
          <tbody>
            {inboxmail.map((data) => {
              if (data.isReceived) {
                return (
                  <InboxData
                    subject={data.subject}
                    message={data.message}
                    receivedOn={data.receivedOn}
                    receivedAt={data.receivedAt}
                    readSatus={data.readSatus}
                    key={data.fireBaseId}
                  />
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
