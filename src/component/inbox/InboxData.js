import React, { useState } from "react";
import { getCurrentDate } from "../../utils/getDate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./inbox.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../../reducer/inboxReducer";
import Toaster from "../toasts/Toaster";

export default function InboxData({
  mailId,
  subject,
  message,
  receivedOn,
  receivedAt,
  readSatus,
  from,
  userEmail,
  fromName,
}) {
  //Modal state
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const fname = fromName.split(" ");

  const displayName = useSelector((data) => data.authentication.displayName);

  //updating message status and opening modal
  const messageView = (id) => {
    setModalShow(true);
    axios
      .patch(
        `https://web-mail-7f9cf-default-rtdb.firebaseio.com/${userEmail
          .split(".")
          .join("")}/${mailId}.json`,
        {
          readStatus: true,
        }
      )
      .then((response) => {
        dispatch(fetchInbox(userEmail));
      });
  };

  //Deleting the mail
  const deleteMail = (id) => {
    axios
      .delete(
        `https://web-mail-7f9cf-default-rtdb.firebaseio.com/${userEmail
          .split(".")
          .join("")}/${id}.json`
      )
      .then(() => {
        setIsToaster({
          isVisible: true,
          message: "Your mail has been successfully deleted",
          type: "success",
        });
        dispatch(fetchInbox(userEmail));
      })
      .catch(() => {
        setIsToaster({
          isVisible: true,
          message: "Something went wrong! Please try again later",
          type: "danger",
        });
      });
  };

  //Toaster
  const [isToaster, setIsToaster] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  //Toaster Close
  const onToasterclose = () => {
    setIsToaster({
      isVisible: false,
      message: "",
      type: "",
    });
  };

  return (
    <>
      {isToaster.isVisible && (
        <Toaster
          type={isToaster.type}
          message={isToaster.message}
          onClose={onToasterclose}
        />
      )}
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ color: "black" }}
      >
        <Modal.Header closeButton onClick={() => setModalShow(false)}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontSize: "20px" }}
          >
            {subject}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div class="row">
              <div class="col-1">
                <div id="container1">
                  <div id="name">{`${fname[0].charAt(0).toUpperCase()}${fname[
                    fname.length - 1
                  ]
                    .charAt(0)
                    .toUpperCase()}`}</div>
                </div>
              </div>
              <div class="col">
                <span style={{ fontWeight: "bold", display: "inline-block" }}>
                  {fromName}
                </span>
                {`<${from}>`}
                <br />
                To:&nbsp;{displayName}
                {`<${userEmail}>`}
              </div>
            </div>
          </div>

          <br />
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <tr onDoubleClick={() => messageView(mailId)}>
        <td className={readSatus === true ? "" : "unread"}>
          {readSatus === true ? "" : "🏀"}&nbsp;&nbsp;&nbsp;
          {fromName}
        </td>
        <td>
          <span className={readSatus === true ? "" : "unread"}>
            {subject}--
          </span>

          <span
            style={{ display: "inline-block" }}
            dangerouslySetInnerHTML={{
              __html: message.length > 50 ? message.substring(0, 50) : message,
            }}
          />
        </td>
        <td>{receivedOn === getCurrentDate() ? receivedAt : receivedOn}</td>
        <td>
          <button onClick={() => deleteMail(mailId)}>❌</button>
        </td>
      </tr>
    </>
  );
}
