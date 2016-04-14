// Node Modules
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore'
// Json Data
import PEOPLE from '../../seeds/people.json';
// Components
import { Person } from './person'
import { Filter } from './filter'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this._addHexColor(),
      map: null,
      filters: null
    }
  }

  componentDidMount() {
    // Track Map State
    this.state.map = MAP = L.mapbox.map('map', 'mapbox.streets').setView([38.9071923, -77.03687070000001], 16)
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

  /**
   * Get List of People
   */
  _getPeople(){
    return _.map(this.state.data, (i) => {
      return (
        <Person
          key={i.id}
          name={i.name}
          color={i.color}
          data={i.events}
          filters={this.state.filters}
          map={this.state.map}
        />)
    })
  }

  _onChange (v, name) {
    this.setState({
      filter: {
        name: v
      }
    })
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Filters</span>
          <nav className="mdl-navigation">
            <Filter
              label="Start Date"
              type="date"
              name="startDate"
              error="Enter a Valid Date"
              onChange={this._onChange.bind(this)}
              />
            <Filter
              label="End Date"
              type="date"
              name="endDate"
              error="Enter a Valid Date"
              onChange={this._onChange.bind(this)}
              />
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
