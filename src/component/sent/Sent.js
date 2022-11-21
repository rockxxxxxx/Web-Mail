import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SentData from "./SentData";
import { fetchSentbox } from "../../reducer/sentReducer";

export default function Sent() {
  const inboxmail = useSelector((data) => data.mailSent.sentbox);
  const email = useSelector((data) => data.authentication.email);
  const dispatch = useDispatch();

  console.log(inboxmail);

  console.log(useSelector((data) => data.mail.unreadCount));

  console.log(email);
  useEffect(() => {
    dispatch(fetchSentbox(email));
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
                if (data.isReceived === false) {
                  return (
                    <SentData
                      subject={data.subject}
                      message={data.message}
                      sentOn={data.sentOn}
                      sentAt={data.sentAt}
                      key={data.fireBaseId}
                      mailId={data.fireBaseId}
                      to={data.to}
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
