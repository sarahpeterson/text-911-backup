import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import './Filter.css';
import RedCross from '../../assets/imgs/red-cross-2.png';
import PoliceCar from '../../assets/imgs/police-car.png';
import Fire from '../../assets/imgs/fire.png';
import SwipeableButton from '../Common/SwipeableButton';

const Filter = (props) => {
  const [medical, setMedical] = useState(false);
  const [police, setPolice] = useState(false);
  const [fire, setFire] = useState(false);
  return (
    <div className="filter">
      <h2 className="filter-title" tabIndex="0">
        Emergency Help Needed?
      </h2>
      <div className="results">
        <ul className="results-list" tabIndex="0">
          <button
            onClick={() => {
              setMedical(true);
              // setPolice(false);
              // setFire(false);
            }}
            tabIndex="0"
            className="result-item"
            // style={{ backgroundColor: medical === true ? 'red': '#cfd8dc' }}
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
            />
          </button>
          <button
            onClick={() => {
              // setMedical(false);
              setPolice(true);
              // setFire(false);
            }}
            tabIndex="1"
            className="result-item"
            // style={{ backgroundColor: police === true ? 'red': '#cfd8dc' }}
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
              />
          </button>
          <button
            onClick={() => {
              // setMedical(false);
              // setPolice(false);
              setFire(true);
            }}
            tabIndex="2"
            className="result-item"
            // style={{ backgroundColor: fire === true ? 'red': '#cfd8dc' }}
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
            />
          </button>
        </ul>
      </div>
      <SwipeableButton onSuccess={() => props.onSuccess(medical, police, fire)} color='red' text='Slide to Contact 911' />
    </div>
  );
};

export default Filter;
