import React, { useState } from 'react';
import LocationModal from './LocationModal';
import './Details.css';

const buttons = (props, modal, setModal) => {
  return props.buttons.map((b) => {
    if (b.endsWith('?')) {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/${b}.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            `${b}?`
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Crisis Intervention') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/police-car.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Crisis Intervention
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Unconscious') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/Unconscious.png`) }
          />
          <p className="emergency-btn-text">
            Unconscious
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Bus/Train') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/Bus.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Bus/Train?
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Domestic Violence') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/Harassment.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Domestic Violence
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Bleeding') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/first-aid-kit.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Bleeding
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Car Accident') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/Accident.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Car Accident
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Home Invasion/Theft') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/Robbery.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Home Invasion/Theft
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Shooting') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <img
            src={ require(`../../assets/imgs/Shooting.png`) }
            className="icon"
          />
          <p className="emergency-btn-text">
            Shooting
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } if (b === 'Trouble Breathing') {
      return (
        <button
          onClick={() => {
            props.setIcon(b);
            setModal(b);
          }}
          className="emergency-btn"
        >
          <p className="emergency-btn-text">
            Trouble Breathing
          </p>
          <input
            checked={props.iconChecked === b}
            type="checkbox"
            className="checkbox"
          />
        </button>
      );
    } return (
      <button
        onClick={() => {
          props.setIcon(b);
          setModal(b);
        }}
        className="emergency-btn"
      >
        <img
          src={ require(`../../assets/imgs/${b}.png`) }
          className="icon"
        />
        <p className="emergency-btn-text">
          {b}
        </p>
        <input
          checked={props.iconChecked === b}
          type="checkbox"
          className="checkbox"
        />
      </button>
    );
  })
}

const DetailModal = (props) => {
  const [modal, setModal] = useState('');
  const [specific, setDetail] = useState('');
  if (props.show) {
    return (
      <div>
      <LocationModal
        show={modal !== '' && props.location}
        header={`${modal}?`}
        para="(apt 4b, class 300a)"
        btnOneTxt="Cancel"
        btnTwoTxt="OK"
        btnOneClick={() => setModal('')}
        btnTwoClick={() => setModal('')}
        specificDetail={(value) => props.setDetail(value)}
      />
      {
        modal !== '' && props.location ? <div className="location-blur" /> : null
      }
      <div className="detail-modal-container">
        <div className="modal-wrapper">
          <div className="modal-btn-container">
            <div className="modal-btn-text-container">
              <p className="modal-btn-text">
                {props.title}
              </p>
            </div>

            {buttons(props, modal, setModal)}
            <button
              onClick={() => props.dismiss()}
              className="blue emergency-btn"
            >
              <p className="emergency-btn-text">
                Cancel
              </p>
            </button>
          </div>
          <div className="next-btn-container">
            <button
              onClick={() => props.dismiss()}
              className="next-btn-wrapper"
            >
              <p className="next-btn">
                Next
              </p>
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  } return null;
};

export default DetailModal;
