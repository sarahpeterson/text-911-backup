import React from 'react';
import './Location.css';

const LocationModal = (props) => {
  if (props.show) {
    return (
      <div className="location-modal-container">
        <div className="location-centered">
          <h3 className="location-center-text">
            {props.header}
          </h3>
          <p className="location-center-text">
            {props.para}
          </p>
          <input
            type="text"
            onChange={(e) => props.specificDetail(e.target.value)}
            className="location-input"
          />
          <div className="location-btn-wrapper">
            <button
              onClick={() => props.btnOneClick()}
              className="location-button-left"
            >
              <p className="location-center-text blue-btn">
                {props.btnOneTxt}
              </p>
            </button>
            <button
              onClick={() => props.btnTwoClick()}
              className="location-button-right"
            >
              <p className="location-center-text blue-btn">
                {props.btnTwoTxt}
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  } return null;
}

export default LocationModal;
