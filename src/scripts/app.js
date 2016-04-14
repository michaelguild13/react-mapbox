// Node Modules
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
// Json Data
import PEOPLE from '../../seeds/people.json';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: PEOPLE,
      map: null
    }
  }

  componentDidMount() {
    this.state.map = L.mapbox.map('map', 'mapbox.streets').setView([38.9071923, -77.03687070000001], 16)
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
