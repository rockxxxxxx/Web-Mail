import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { getCurrentDate } from "../../utils/getDate";
import getTime from "../../utils/getTime";
import Toaster from "../toasts/Toaster";
import useFormValidation from "../../hook/useFormValidation";

const emailValidator = (value) => value.includes("@");
const subjectValidator = (value) => value.trim().length > 0;
const messageValidator = (value) => value.trim().length > 0;

export default function Compose() {
  //Declaring state variable
  const [isFormSumbitted, setIsFormSubmitted] = useState(false);
  //Email hook
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    onBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useFormValidation(emailValidator);

  //subject hook
  const {
    value: enteredSubject,
    isValid: subjectIsValid,
    onBlurHandler: subjectBlurHandler,
    hasError: subjectHasError,
    inputChangeHandler: subjectChangeHandler,
    reset: subjectReset,
  } = useFormValidation(subjectValidator);

  //message hook
  const {
    value: enteredMessage,
    isValid: messageIsValid,
    onBlurHandler: messageBlurHandler,
    hasError: messageHasError,
    inputChangeHandler: messageChangeHandler,
    reset: messageReset,
  } = useFormValidation(messageValidator);

  //Calling Toaster
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

  const userEmail = useSelector((state) => state.authentication.email);
  let formIsValid = false;
  if (emailIsValid && subjectIsValid && messageIsValid) {
    formIsValid = true;
  }

  //handling onSubmit
  const composeMailSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setIsFormSubmitted(true);
      axios
        .all([
          axios.post(
            `https://web-mail-7f9cf-default-rtdb.firebaseio.com/${enteredEmail
              .split(".")
              .join("")}.json`,
            {
              from: userEmail,
              subject: enteredSubject,
              message: enteredMessage,
              isReceived: true,
              readStatus: false,
              receivedOn: getCurrentDate(),
              receivedAt: getTime(),
            }
          ),
          axios.post(
            `https://web-mail-7f9cf-default-rtdb.firebaseio.com/${userEmail
              .split(".")
              .join("")}.json`,
            {
              to: enteredEmail,
              subject: enteredSubject,
              message: enteredMessage,
              isReceived: false,
              sentOn: getCurrentDate(),
              sentAt: getTime(),
            }
          ),
        ])
        .then((response) => {
          emailReset();
          messageReset();
          subjectReset();
          setIsFormSubmitted(false);
          setIsToaster({
            isVisible: true,
            message: "You mail has been successfully sent",
            type: "success",
          });
        })
        .catch((error) => {
          setIsFormSubmitted(false);
          setIsToaster({
            isVisible: true,
            message: "Something went wrong! Please try again later",
            type: "danger",
          });
        });
    } else {
      emailBlurHandler();
      messageBlurHandler();
      subjectBlurHandler();
    }
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
      <div className="card" style={{ width: "70%", margin: "auto" }}>
        <div className="card-body">
          <h5 className="card-title signup" style={{ textAlign: "center" }}>
            Compose Mail
          </h5>
          <hr style={{ border: "1px solid black" }} />
          <form autoComplete="new-password" onSubmit={composeMailSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="to"
                aria-describedby="emailHelp"
                placeholder="To"
                value={enteredEmail}
                onChange={(event) => emailChangeHandler(event.target.value)}
                onBlur={emailBlurHandler}
              />
              <div id="emailHelp" className="form-text">
                {emailHasError ? (
                  <p style={{ color: "red" }}>
                    Please enter a valid email address
                  </p>
                ) : (
                  `Enter the email of person whom you want to send the mail.`
                )}
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Subject"
                value={enteredSubject}
                onChange={(event) => subjectChangeHandler(event.target.value)}
                onBlur={subjectBlurHandler}
              />
              <div id="subjectHelp" className="form-text">
                {subjectHasError ? (
                  <p style={{ color: "red" }}>Please enter a valid subject</p>
                ) : (
                  `Create a subject for your mail.`
                )}
              </div>
            </div>

            <ReactQuill
              theme="snow"
              style={{ color: "black" }}
              value={enteredMessage}
              onChange={(event) => messageChangeHandler(event)}
              onBlur={messageBlurHandler}
            />
            <div id="messageHelp" className="form-text">
              {messageHasError ? (
                <p style={{ color: "red" }}>
                  Please enter a valid message body
                </p>
              ) : (
                `Enter the message you want to send.`
              )}
            </div>
            <hr />

            <button
              className="btn btn-primary"
              type="submit"
              style={{ pddingTop: "5px" }}
              disabled={isFormSumbitted ? true : false}
            >
              {isFormSumbitted && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {isFormSumbitted ? "  Sending..." : "  Send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
