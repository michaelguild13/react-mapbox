// Node Modules
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
// Json Data
import PEOPLE from '../../seeds/people.json';
// Components
import { Person } from './person'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this._addHexColor(),
      map: null
    }
  }

  componentDidMount() {
    // Track Map State
    this.state.map = L.mapbox.map('map', 'mapbox.streets').setView([38.9071923, -77.03687070000001], 16)
    // Force a ReRender once
    this.forceUpdate()
  }

  /**
   * Mutate data to include random hex color
   */
  _addHexColor() {
    return _.map(PEOPLE, (i) => {
      i.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      return i
    })
  }

  _getPeople(){
    return _.map(this.state.data, (i) => {
      return (
        <Person
          key={i.id}
          name={i.name}
          color={i.color}
          data={i.events}
          map={this.state.map}
        />)
    })
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Filters</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
          <span className="mdl-layout-title">People</span>
          <nav className="mdl-navigation">
            {this._getPeople()}
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div id="map"></div>
        </main>
      </div>
    )
  }
}
