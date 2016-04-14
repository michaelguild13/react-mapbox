// Required
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// Components
//import { MapBox } from './mapbox'
import PEOPLE from '../../seeds/people.json';

L.mapbox.accessToken = 'pk.eyJ1IjoibWljaGFlbGd1aWxkMTMiLCJhIjoiNWEwMzYxNTE2YzdhN2JkYmFiODU1Zjc3ZTVkZDlmZDgifQ.gPM-n6Mqyi98PsB3iFNKfg'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      data: PEOPLE
    }
  }

  componentDidMount() {
    this.state.map = L.mapbox.map('map', 'mapbox.streets')
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div id="map"></div>
        </main>
      </div>
    )
  }
}

// Scss entry point
require('../scss/base.scss');
// App entry point
ReactDOM.render( <App/> , document.getElementById( 'app' ) )
