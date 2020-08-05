import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { MAP_API_KEY } from '../../utils/apiKeys';
import { getAll } from '../../utils/FoursquareAPI';
import Top from '../Top/Top';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Modal from '../Common/Modal';
import { agreeToTerms, setInitialCoords } from '../../actions';
import './App.css';

const TOKEN = 'pk.eyJ1IjoiZ2FiYnlnYWJieSIsImEiOiJjazZsYzgwaDEwMmFhM2hwaG1nMWZvcnpzIn0.Fw8Z5U4PoaEIQACGzQ2mYA';

class App extends Component {
  constructor(props) {
    super(props);
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
      address: ''
    };
  }

  componentDidMount() {
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
    if (medical && police && fire) return 'Medical, police and fire';
    if (police && fire && !medical) return 'Police and fire';
    if (medical && fire && !police) return 'Medical and fire';
    if (medical && police && !fire) return 'Medical and police';
    if (fire && !medical && !police) return 'Fire';
    if (medical && !police && !fire) return 'Medical';
    if (police && !fire && !medical) return 'Police';
  }

  onSuccess(medical, police, fire) {
    const { long, lat, address } = this.state;
    this.setState({body: `${this.type(medical, police, fire)} emergency at ${long}, ${lat} or ${address}. Person may be deaf or unable to speak out loud.` })
    console.log(this.state.body)
      return fetch('/.netlify/functions/text-created',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            to: +4156345171,
            body: this.state.body
          },
        ),
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log('success');
          this.setState({ success: true });
        } else {
          console.log('else')
        }
      }).catch((error) => {
        console.log(error)
      })
  }

//   function createTodo(data) {
//   return fetch('/.netlify/functions/todos-create', {
//     body: JSON.stringify(data),
//     method: 'POST'
//   }).then(response => {
//     return response.json()
//   })
// }
//
// // Todo data
// const myTodo = {
//   title: 'My todo title',
//   completed: false,
// }
//
// // create it!
// createTodo(myTodo).then((response) => {
//   console.log('API response', response)
//   // set app state
// }).catch((error) => {
//   console.log('API error', error)
// })

  maybeModal() {
    const { emergency } = this.state;
    const { terms } = this.props;
    if (!terms) {
      return (
        <Modal
          header="BETA VERSION, IN EMERGENCY CALL 911"
          para="You agree to our terms of use and allow us to access your location."
          btnTxt="Agree"
          btnClick={() => {
            this.setState({ modal: false });
            this.props.agreeToTerms()
          }}
        />
      );
    } if (emergency) {
      return (
        <Modal
          header="WHERE'S YOUR EMERGENCY?"
          para="For this app to work, we need your location, please enable GPS."
          btnTxt="Agree"
          btnClick={() => this.setState({ emergency: false })}
        />
      );
    }
  }

  maybeMap() {
    const { map } = this.state;
    if (map) return <Map />;
    return null;
  }

  maybeFilter() {
    return (
      <div>
        <Map
          setCoords={(long, lat, address) => {
            console.log('coords', long, lat, address)
            this.setState({ long, lat, address });
          }}
        />
        <Filter
          data={this.state}
          onToggleOpen={this.onToggleOpen}
          filterPlaces={this.filterPlaces}
          onSuccess={(medical, police, fire) => {
            console.log(medical, police, fire)
            this.onSuccess(medical, police, fire);
          }}
        />

      </div>
    );
  }

  render() {
    const { modal, emergency, filter, success } = this.state;
    const { terms } = this.props;
    if (success) return <Redirect push to="/details" />;
    return (
      <div className="app">
        {
          !terms || emergency ?
          <div className="modalContainer" /> :
          null
        }
        <div className="content">
          {this.maybeModal()}
        </div>
        {this.maybeFilter()}
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
