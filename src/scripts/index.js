// Required
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// Components
//import { MapBox } from './mapbox'

L.mapbox.accessToken = 'pk.eyJ1IjoibWljaGFlbGd1aWxkMTMiLCJhIjoiNWEwMzYxNTE2YzdhN2JkYmFiODU1Zjc3ZTVkZDlmZDgifQ.gPM-n6Mqyi98PsB3iFNKfg'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null
    }
  }

  componentDidMount() {
    this.state.map = L.mapbox.map('map', 'mapbox.streets')
  }

  render() {
    return (
      <div>
        <div id="map"></div>
      </div>
    )
  }
}

// Scss entry point
require('../scss/base.scss');
// App entry point
ReactDOM.render( <App/> , document.getElementById( 'app' ) )
