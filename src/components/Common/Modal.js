import React from 'react';
import './Modal.css';

const Modal = (props) => (
  <div className="container">
    <div className="centered">
      <h3 className="center-text">
        {props.header}
      </h3>
      <p className="center-text">
        {props.para}
      </p>
      <button onClick={() => props.btnClick()} className="button">
        <p className="center-text blue-btn">
          {props.btnTxt}
        </p>
      </button>
    </div>
  </div>
);

export default Modal;
