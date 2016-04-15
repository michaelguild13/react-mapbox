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
      map: {},
      filters: {}
    }
  }

  componentDidMount() {
    // Track Map State
    this.state.map = L.mapbox.map('map', 'mapbox.streets').setView([38.89370499941828,  -77.0364761352539], 16)
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
          map={this.state.map}
          filters={this.state.filters}
        />)
    }.bind(this))
  }

  /**
   * Set Filters
   * @param  {String} value
   * @param  {String} Filter Name
   */
  _onChange (v, name) {
    this.state.filters[name] = v
    this.setState({filters: this.state.filters })
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
