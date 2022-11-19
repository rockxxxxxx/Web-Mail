import axios from "axios";
import React, { useState } from "react";
import useFormValidation from "../../hook/useFormValidation";
import Toaster from "../toasts/Toaster";
import "../signup/signup.css";

const emailValidator = (value) => value.includes("@");
const passValidator = (value) => value.trim().length >= 7;

export default function Login() {
  const [isFormSumbitted, setIsFormSubmitted] = useState(false);

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

  //Email hook
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    onBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useFormValidation(emailValidator);

  //Password hook
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useFormValidation(passValidator);

  //checking if form is valid to make the api call
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  //Making the api call
  const signupSubmitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setIsFormSubmitted(true);
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBS5i70rnqRRpbkv5GAEaj8XYiAnHs18UM",
          {
            email: enteredEmail,
            password: enteredPassword,
            heders: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setIsFormSubmitted(false);
          emailReset();
          passwordReset();
          setIsToaster({
            isVisible: true,
            message: "You have been succssfully logged in",
            type: "success",
          });
        })
        .catch((error) => {
          setIsFormSubmitted(false);
          if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
            setIsToaster({
              isVisible: true,
              message: "User with this email doesn't exist",
              type: "danger",
            });
          } else if (error.response.data.error.message === "INVALID_PASSWORD") {
            setIsToaster({
              isVisible: true,
              message: "Paasword is not valid",
              type: "danger",
            });
          } else {
            setIsToaster({
              isVisible: true,
              message: "Something went wrong! Please try again later",
              type: "danger",
            });
          }
        });
    } else {
      emailBlurHandler();
      passwordBlurHandler();
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
            Please login to continue
          </h5>
          <hr style={{ border: "1px solid black" }} />
          <form onSubmit={signupSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label signup">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              <div id="emailHelp" className="form-text">
                {emailHasError ? (
                  <p style={{ color: "red" }}>
                    Please enter a valid email address
                  </p>
                ) : (
                  `We'll never share your email with anyone else.`
                )}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label signup"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              <div id="passHelp" className="form-text">
                {passwordHasError ? (
                  <p style={{ color: "red" }}>Please enter a valid password</p>
                ) : (
                  ` `
                )}
              </div>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isFormSumbitted ? true : false}
            >
              {isFormSumbitted && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {isFormSumbitted ? "  Loggingin..." : "  Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
