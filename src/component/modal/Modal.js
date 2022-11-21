import React from "react";
import "./modal.css";

export default function Modal({ onClose }) {
  return (
    <div id="myModal" class="mymodal">
      <div class="my-modal-content">
        <span class="close" onClick={() => onClose()}>
          &times;
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
}
