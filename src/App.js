import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Main from './Main';
import configureStore from './configureStore';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pAndS: configureStore()
    };
  }

  render() {
    return (
      <Provider store={this.state.pAndS.store}>
        <PersistGate persistor={this.state.pAndS.persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
