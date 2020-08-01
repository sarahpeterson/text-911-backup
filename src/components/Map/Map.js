import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl, { GeolocateControl } from 'mapbox-gl';
import Filter from '../Filter/Filter';
import './Map.css';

const TOKEN = 'pk.eyJ1IjoiZ2FiYnlnYWJieSIsImEiOiJjazZsYzgwaDEwMmFhM2hwaG1nMWZvcnpzIn0.Fw8Z5U4PoaEIQACGzQ2mYA';

class Map extends Component {
  constructor(props) {
    super(props);
    const { long, lat, address } = this.props;
    this.state = {
      long,
      lat,
      address
    };
  }

  dragend(long, lat) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${TOKEN}`)
      .then(response => response.json())
      .then(response => {
        const address = response.features[0].place_name;
        console.log(address)
        this.props.setCoords(this.state.long, this.state.lat, address);
        var coordinates = document.getElementById('coordinates')
        coordinates.innerHTML = address;
      });
  }

  componentDidMount() {
    const coords = [this.state.long, this.state.lat];
    var coordinates = document.getElementById('coordinates')
    coordinates.innerHTML = this.state.address;
    mapboxgl.accessToken = TOKEN;
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [this.state.long, this.state.lat], // starting position
      zoom: 19 // starting zoom
    });

    // map.resize();
    var marker = new mapboxgl.Marker({
      draggable: true,
    }).setLngLat(coords).addTo(map);

    // marker.setLngLat(coords).addTo(map);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.long},${this.state.lat}.json?access_token=${TOKEN}`)
      .then(response => response.json())
      .then(response => {
        const address = response.features[0].place_name;
        coords.innerHTML = address;
      });

    marker.on('dragend', () => {
      // this.setState({
      //   long: marker.getLngLat().lng,
      //   lat: marker.getLngLat().lat,
      // });
      // this.props.setCoords(marker.getLngLat().lng, marker.getLngLat().lat, '');
      console.log(marker.getLngLat().lng, marker.getLngLat().lat)
      this.dragend(marker.getLngLat().lng, marker.getLngLat().lat);
    });
  }
  render() {
    return (
      <div style={{
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        <div
          ref={(el) => this.mapContainer = el}
          id="map"
          style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 380 }}
        />
        <p id="coordinates" className="coordinates"></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { ui } = state;
  const { long, lat, address } = ui;
  return {
    long,
    lat,
    address
  }
}

export default connect(mapStateToProps, {
})(Map);
