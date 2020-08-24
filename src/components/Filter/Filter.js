import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import './Filter.css';
import RedCross from '../../assets/imgs/red-cross-2.png';
import PoliceCar from '../../assets/imgs/police-car.png';
import Fire from '../../assets/imgs/fire.png';
import SwipeableButton from '../Common/SwipeableButton';

const Filter = (props) => {
  return (
    <div className="filter">
      <div className="results">
        <h3 style={{ textAlign: 'center' }}>What kind of emergency?</h3>
        <ul className="results-list" tabIndex="0">
          <button
            onClick={() => props.setMedical()}
            tabIndex="0"
            className="result-item"
          >
            <img
              src={RedCross}
              alt="red cross"
              className="icon"
              title="Red Cross Icon"
            />
            <p>Medical</p>
            <input
              type="checkbox"
              className="form-check-input"
              checked={props.medical}
            />
          </button>
          <button
            onClick={() => props.setPolice()}
            tabIndex="1"
            className="result-item"
          >
            <img
              src={PoliceCar}
              alt="policecar"
              className="icon"
              title="Police Car Icon"
            />
              <p>Police</p>
              <input
                type="checkbox"
                className="form-check-input"
                checked={props.police}
              />
          </button>
          <button
            onClick={() => props.setFire()}
            tabIndex="2"
            className="result-item"
          >
            <img
              src={Fire}
              alt="fire"
              className="icon"
              title="Fire Icon"
            />
            <p>Fire</p>
            <input
              type="checkbox"
              className="form-check-input"
              checked={props.fire}
            />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
