import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import InboxData from "./InboxData";
import { fetchInbox } from "../../reducer/inboxReducer";

export default function Inbox() {
  const inboxmail = useSelector((data) => data.mail.inbox);
  const email = useSelector((data) => data.authentication.email);
  const dispatch = useDispatch();

  console.log(useSelector((data) => data.mail.unreadCount));

  console.log(email);
  useEffect(() => {
    dispatch(fetchInbox(email));
  }, [email]);

  return (
    <div class="card" style={{ backgroundColor: "#FFE1E1", padding: "5px" }}>
      <div class="card-body">
        {inboxmail.length > 0 && (
          <table
            class="table table-striped table-hover"
            style={{ cursor: "pointer" }}
          >
            <tbody>
              {inboxmail.map((data) => {
                if (data.isReceived) {
                  return (
                    <InboxData
                      subject={data.subject}
                      message={data.message}
                      receivedOn={data.receivedOn}
                      receivedAt={data.receivedAt}
                      readSatus={data.readStatus}
                      key={data.fireBaseId}
                      mailId={data.fireBaseId}
                      from={data.from}
                      userEmail={email}
                      fromName={data.fromName}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
