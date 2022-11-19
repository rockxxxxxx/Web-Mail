import React from "react";

export default function Toaster({ type, message, onClose }) {
  return (
    <div
      className={`toast show align-items-center text-white bg-${type} border-0 position-absolute top-0 start-50 translate-middle-x`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </div>
    </div>
  );
}
