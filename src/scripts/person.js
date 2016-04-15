import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore'

export class Person extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
      map: this.props.map,
      color: this.props.color,
      active: false,
      filters: this.props.filters
    }
  }

  _onClick(){
    let map = this.props.map,
        layer = this.state
    // if this person is already added
    if ( this.state.active ) {
      this.setState({ active: false })
      this._removePolyLines( this.state, this.props.map)
    } else {
      this.setState({ active: true })
      this._createPolyLines( this.props.color, this.props.data, this.props.map)
    }
  }

  /**
   * Creates Polylines
   * @param  {String} color of line
   * @param  {Array} Lat & Long Data
   * @param  {object} MapBox Map
   */
  _createPolyLines( color, data , map){
    // TODO: Filter Data

    // Create Polyline for each Day
    _.each(data, (i, k) => {
      // Set Polyline Options
      let polyline_options = { color: color }
      // sort data by time
      let sort = _.sortBy(i.data, function(i) { return i.time })
      // set data to array
      let line_points = _.map(sort, (i) => {
        return [ i.lat, i.long ]
      })
      // Set polylines as state
      this.setState({
        [i.event] : L.polyline( line_points, polyline_options ).addTo(map)
      })
    }.bind(this))
  }

  /**
   * Removes Polylines
   * @param  {Array}  Layers
   * @param  {Object} MapBox
   */
  _removePolyLines( data, map, filters){

    this._filterData(data, filters)

    _.each(data, (i, k) => {
      if ( map.hasLayer( i ) ) {
        map.removeLayer( i )
        delete this.state[k]
      }
    })

  }

  _filterData(data, filters){
    // Filter Data with Filters
    return _.map(data, (i) => {

      let date = i.event.replace(/-/g,''),
          startDate = this.state.filters.startDate ? this.state.filters.startDate.replace(/-/g,'') : '',
          endDate = this.state.filters.endDate ? this.state.filters.endDate.replace(/-/g,'') : ''
      debugger
      // filter dates
      if ( startDate ) {
        if ( date < startDate ) { return }
      }
      if ( endDate ) {
        if ( date > endDate ) { return }
      }
      // return data if it passes all filters
      return i
    }.bind(this))
  }

  render() {

    this._filterData(this.state.data, this.state.filters)

    let active = this.state.active ? this.props.color : '',
        style = { 'backgroundColor': active }

    return (
      <a className="mdl-navigation__link" onClick={this._onClick.bind(this)} style={style}>
        <i className="material-icons" style={{'color': this.props.color }}>
          account_box
        </i>
        {this.props.name}
      </a>
    )
  }
}
