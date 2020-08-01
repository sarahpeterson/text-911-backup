import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import Pin from '../../assets/imgs/pin_def.svg';
import RedCross from '../../assets/imgs/pin_def.svg';
import Police from '../../assets/imgs/police-car.png';
import Top from '../Top/Top';
import DetailModal from './DetailModal';
import './Details.css';
import Modal from '../Common/Modal';

const onSuccess = (emergency, location, detail, props) => {
  const { long, lat, address } = props;
  const body = `${emergency}, ${location}: ${detail} at ${long}, ${lat}, ${address}`;
  console.log(body)
  return fetch('/api/messages/',
  {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        to: +4156345171,
        body: body
      },
    ),
  })
  .then((response) => {
    console.log(response)
    if (response.status === 200) {
      console.log('success');
      return (
        <Modal
          header="Message Sent!"
          para=""
          btnTxt="Done"
          btnClick={() => console.log('ok')}
        />
      )
    } else {
      console.log('else')
    }
  })
}

const Details = (props) => {
  const [emergency, setEmergency] = useState(false);
  const [location, setLocation] = useState(false);
  const [icon, setIcon] = useState('');
  const [emergencyDetail, setEDetail] = useState('');
  const [locationDetail, setLDetail] = useState('');
  const [more, moreInfo] = useState('');
  return (
    <div>
      <Top />
      <div className="detail-container">
        <h3 className="detail-message">
          Message Recieved
        </h3>
        <p className="detail-text">
          Please check your text messages for a response from your nearest 911 center. Turn your phone on silent mode.
        </p>
        <p className="detail-text-bold">
          If you do not receive a response, please call 911.
        </p>
      </div>
      <div className="more-info-container">
        <div className="more-info-wrapper">
          <h2 className="more-info-text">
            Send More Information
          </h2>
        </div>
        <div className="optional-container">
          <p className="optional-text">
            Optional
          </p>
        </div>
        <button
          onClick={() => setEmergency(true)}
          className="emergency-container"
        >
          <img
            src={Police}
            alt="police car"
            className="icon"
            title="Police Car Icon"
          />
          <p className="emergency-text">
            Specific Emergency?
          </p>
        </button>
        <button
          onClick={() => setLocation(true)}
          className="location-container"
        >
          <img
            src={RedCross}
            alt="red cross"
            className="icon"
            title="Red Cross Icon"
          />
          <p className="emergency-text">
            Specific Location?
          </p>
        </button>
      </div>
      <div className="send-btn-container">
        <button
          onClick={() => onSuccess(emergencyDetail, locationDetail, more, props)}
          tabIndex="1"
          className="result-item"
          style={{
            backgroundColor: 'blue',
            width: 300,
            borderRadius: 25/2,
            marginTop: 40
          }}
        >
          <p className="btn-container">
            Send Message
          </p>
        </button>
      </div>
      <DetailModal
        show={emergency}
        buttons={[
          'Unconscious',
          'Crime',
          'Harassment',
          'Accident',
          'Shooting',
          'Robbery'
        ]}
        title="Specific Emergency?"
        setIcon={(b) => {
          setIcon(b);
          setEDetail(b);
          console.log('BBBB', b)
        }}
        iconChecked={icon}
        dismiss={() => setEmergency(false)}
      />
      <DetailModal
        show={location}
        setIcon={(b) => {
          setIcon(b);
          setLDetail(b);
          console.log('BBBB', b)
        }}
        iconChecked={icon}
        location
        buttons={[
          'Room Number',
          'Floor',
          'Bus/Train',
          'Highway'
        ]}
        title="Specific Location?"
        setDetail={(d) => moreInfo(d)}
        dismiss={() => setLocation(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { ui } = state;
  const { long, lat, address } = ui;
  return {
    long,
    lat,
    address
  };
};

export default connect(mapStateToProps, { })(Details);
