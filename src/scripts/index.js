// Required
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// Components
import { MapBox } from './mapbox'
// Pages

export class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

// Scss entry point
require('../scss/base.scss');
// App entry point
ReactDOM.render( <App/> , document.getElementById( 'app' ) )
