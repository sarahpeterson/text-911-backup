import React, { Component } from 'react';
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

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergency: false,
      location: false,
      icon: '',
      emergencyDetail: '',
      locationDetail: '',
      more: '',
      status: '',
      modal: false
    };
  }

  onSuccess(emergency, location, detail) {
    const { long, lat, address } = this.props;
    const body = `${emergency}, ${location}: ${detail} at ${long}, ${lat}, ${address}`;
    console.log(body)
    return fetch('/.netlify/functions/text-created',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          body: body
        },
      ),
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({ modal: true, status: 'success' });
      } else {
        this.setState({ modal: true, status: 'error' });
      }
    }).catch((error) => {
      console.log(error);
      this.setState({ modal: true, status: 'error' });
    })
  }

  maybeModal() {
    const { modal, status } = this.state;
    console.log(modal, status)
    if (modal && status === 'success') {
      return (
        <Modal
          header="Your message was sent"
          para=""
          btnTxt="Ok"
          btnClick={() => {
            this.setState({ modal: false, status: '' });
          }}
        />
      )
    } if (modal && status === 'error') {
      return (
        <Modal
          header="There was an error sending your message"
          para=""
          btnTxt="Ok"
          btnClick={() => {
            this.setState({ modal: false, status: '' });
          }}
        />
      )
    }
  }

  render() {
    const {
      emergencyDetail,
      locationDetail,
      more,
      icon,
      location,
      emergency,
      // modal
    } = this.state;
    const { modal, status } = this.state;
    console.log(modal && status !== '')
    return (
      <div>
        {
          modal && status !== '' ?
          <div className="modal-container" /> :
          <div />
        }
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
          {this.maybeModal()}
          <button
            onClick={() => this.setState({ emergency: true })}
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
            onClick={() => this.setState({ location: true })}
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
            onClick={() => this.onSuccess(emergencyDetail, locationDetail, more)}
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
            'Domestic Violence',
            'Crisis Intervention',
            'Bleeding',
            'Car Accident',
            'Home Invasion/Theft',
            'Shooting',
            'Trouble Breathing'
          ]}
          title="Specific Emergency?"
          setIcon={(b) => {
            this.setState({ icon: icon === b ? '' : b });
            this.setState({ emergencyDetail: b });
            console.log('BBBB', b)
          }}
          iconChecked={icon}
          dismiss={() => this.setState({ emergency: false })}
        />
        <DetailModal
          show={location}
          setIcon={(b) => {
            this.setState({ icon: icon === b ? '' : b });
            this.setState({ locationDetail: b });
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
          setDetail={(d) => this.setState({ more: d })}
          dismiss={() => this.setState({ location: false })}
        />
      </div>
    );
  }
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
