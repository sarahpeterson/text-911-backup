import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { MAP_API_KEY } from '../../utils/apiKeys';
import { getAll } from '../../utils/FoursquareAPI';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Modal from '../Common/Modal';
import Pin from '../../assets/imgs/pin_def.svg';
import RedCross from '../../assets/imgs/pin_def.svg';
import Police from '../../assets/imgs/police-car.png';
import Top from '../Top/Top';
import DetailModal from '../Details/DetailModal';
import '../Details/Details.css';
import { agreeToTerms, setInitialCoords } from '../../actions';
import './App.css';

const TOKEN = 'pk.eyJ1IjoiZ2FiYnlnYWJieSIsImEiOiJjazZsYzgwaDEwMmFhM2hwaG1nMWZvcnpzIn0.Fw8Z5U4PoaEIQACGzQ2mYA';

class App extends Component {
  constructor(props) {
    super(props);
    const { terms } = this.props;

    this.state = {
      modal: true,
      map: true,
      filter: false,
      success: false,
      medical: false,
      police: false,
      fire: false,
      complete: false,
      body: '',
      long: 0,
      lat: 0,
      address: '',
      error: '',
      emergency: false,
      location: false,
      icon: '',
      emergencyDetail: '',
      locationDetail: '',
      more: '',
      status: '',
      modal: false,
      terms,
      specific: false,
      btn: ''
    };
  }

  componentDidMount() {
      // Permission API is implemented
    navigator.permissions.query({
      name: 'geolocation'
    }).then((permission) => {
      if (permission.state === 'denied') {
        this.setState({ emergency: true })
      } if (permission.state === 'granted') {
        this.setState({ emergency: false })
      }
    }).catch((error) => {
      console.log(error)
    })

    console.log('mount')
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({ long: position.coords.longitude, lat: position.coords.latitude });
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${TOKEN}`)
        .then(response => response.json())
        .then(response => {
          const address = response.features[0].place_name;
          var coordinates = document.getElementById('coordinates')
          coordinates.innerHTML = address;
          this.props.setInitialCoords(position.coords.longitude, position.coords.latitude, address);
          console.log(address)
          this.setState({ address });

      });
    }, (error) => { });
  }

  type(medical, police, fire) {
    console.log(medical, police, fire)
    if (medical && police && fire) return 'Medical, police and fire';
    if (police && fire && !medical) return 'Police and fire';
    if (medical && fire && !police) return 'Medical and fire';
    if (medical && police && !fire) return 'Medical and police';
    if (fire && !medical && !police) return 'Fire';
    if (medical && !police && !fire) return 'Medical';
    if (police && !fire && !medical) return 'Police';
  }

  onSuccess() {
    const { medical, police, fire, long, lat, address, emergencyDetail, locationDetail, more } = this.state;
    const newEmergency = emergencyDetail !== '' ? `, ${emergencyDetail} ` : ' ';
    const newLocation = locationDetail !== '' ? `, ${locationDetail}: ${more} ` : ' ';
    const body = `${this.type(medical, police, fire)}${newEmergency}emergency, located at ${long}, ${lat} or ${address}${newLocation}. Person may be deaf or unable to speak out loud.`;
    console.log(body)
    this.setState({ success: true });
      return fetch('/.netlify/functions/text-created', {
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
        console.log(response)
        if (response.status === 200) {
          console.log('success');
          this.setState({ modal: true, status: 'success' });
        } else {
          console.log('else')
          this.setState({ modal: true, status: 'error' });
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  maybeModal() {
    const { emergency, modal, status, terms } = this.state;
    console.log(emergency, modal, status, terms)
    if (!terms) {
      return (
        <Modal
          header="BETA VERSION, IN EMERGENCY CALL 911"
          para="You agree to our terms of use and allow us to access your location."
          btnTxt="Agree"
          btnClick={() => {
            this.setState({ terms: false });
            this.props.agreeToTerms()
          }}
        />
      );
    } if (emergency) {
      return (
        <Modal
          header="ENABLE LOCATION PERMISSION"
          para="For this app to work, we need your location, please enable GPS."
          btnTxt="Agree"
          btnClick={() => this.setState({ emergency: false })}
        />
      );
    } if (modal && status === 'success') {
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
          btnClick={() => this.setState({ modal: false })}
        />
      )
    }
  }

  maybeMap() {
    const { map } = this.state;
    if (map) return <Map />;
    return null;
  }

  render() {
    const {
      modal,
      filter,
      success,
      emergencyDetail,
      locationDetail,
      more,
      icon,
      location,
      emergency,
      long,
      lat,
      address,
      medical,
      police,
      fire,
      detail,
      specific
      // modal
    } = this.state;
    const { terms } = this.props;
    // if (success) return <Redirect push to="/details" />;
    return (
      <div className="app">
        {
          !terms || emergency || modal ?
          <div className="modal-container" /> :
          null
        }
        <div>
          <Map
            long={long}
            lat={lat}
            address={address}
            setCoords={(long, lat, address) => {
              console.log('coords', long, lat, address)
              this.setState({ long, lat, address });
            }}
          />
          <Filter
            data={this.state}
            onToggleOpen={this.onToggleOpen}
            filterPlaces={this.filterPlaces}
            medical={medical}
            fire={fire}
            police={police}
            setMedical={() => this.setState({ medical: !medical })}
            setPolice={() => this.setState({ police: !police })}
            setFire={() => this.setState({ fire: !fire })}
          />
          <div className="more-info-container">
            <div className="more-info-wrapper">
              <h3 className="more-info-text">
                Send More Information (Optional)
              </h3>
            </div>
            {this.maybeModal()}
            <button
              onClick={() => this.setState({ specific: true })}
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
          <DetailModal
            show={specific}
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
            dismiss={() => this.setState({ specific: false })}
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
          <div className="send-btn-container">
            <button
              onClick={() => this.onSuccess(medical, police, fire)}
              tabIndex="1"
              className="result-item"
              style={{
                backgroundColor: 'red',
                width: 300,
                borderRadius: 25/2,
                marginTop: 10
              }}
            >
              <p className="btn-container">
                Send Message
              </p>
            </button>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { ui } = state;
  const { terms } = ui;
  return {
    terms
  };
};

export default connect(mapStateToProps, {
  agreeToTerms,
  setInitialCoords
})(App);
