import React, { useState } from "react";
import { getCurrentDate } from "../../utils/getDate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./sentbox.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentbox } from "../../reducer/sentReducer";
import Toaster from "../toasts/Toaster";

export default function SentData({
  mailId,
  subject,
  message,
  sentOn,
  sentAt,
  userEmail,
  fromName,
  to,
}) {
  //Modal state
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const displayName = useSelector((data) => data.authentication.displayName);

  //updating message status and opening modal
  const messageView = (id) => {
    setModalShow(true);
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
        dispatch(fetchSentbox(userEmail));
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
                  <div id="name">{`${to.substring(0, 1).toUpperCase()}`}</div>
                </div>
              </div>
              <div class="col">
                <span>To: {`<${to}>`}</span>
                <br />
                From:&nbsp;{displayName}
                {`<${userEmail}>`}
              </div>
            </div>
          </div>

          <br />
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <tr onDoubleClick={() => messageView(mailId)}>
        <td>{to}</td>
        <td>
          {<span>{subject}</span>}-
          {message.length > 50 ? message.substring(0, 50) : message}
        </td>
        <td>{sentOn === getCurrentDate() ? sentAt : sentOn}</td>
        <td>
          <button onClick={() => deleteMail(mailId)}>❌</button>
        </td>
      </tr>
    </>
  );
}
