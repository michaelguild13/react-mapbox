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

  componentDidUpdate() {
    // Only filter when state is active
    this.state.active ? this._filterLayers(this._filterData()) : ''
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
    // Filter Data
    data = this._filterData(data)

    if (data) {
      // Create Polyline for each Day
      _.each(data, (i, k) => {
        this._createPolyLine(color, i.data, i.event, map)
      }.bind(this))
    }
  }

  /**
   * Creates a single polyline
   * @param  {[type]} color [description]
   * @param  {[type]} data  [description]
   * @param  {[type]} event [description]
   * @param  {[type]} map   [description]
   * @return {[type]}       [description]
   */
  _createPolyLine(color, data, event, map) {
    // Set Polyline Options
    let polyline_options = { color: color }
    // sort data by time
    let sort = _.sortBy(data, function(i) { return i.time })
    // set data to array
    let line_points = _.map(sort, (i) => { return [ i.lat, i.long ] })
    // Set polylines as state
    this.setState({
      [event] : L.polyline( line_points, polyline_options ).addTo(map)
    })
  }

  /**
   * Removes Polylines
   * @param  {Array}  Layers
   * @param  {Object} MapBox
   */
  _removePolyLines( data, map, filters){
    _.each(data, (i, k) => {
      if ( map.hasLayer( i ) ) {
        map.removeLayer( i )
        delete this.state[k]
      }
    })
  }

  /**
   * Filters the data based on state filters
   * @param  {Object} State Data
   * @return {Object} All valid Data
   */
  _filterData(){
    let filteredData = []

    // Filter Data with Filters
    _.map( this.props.data, (i) => {
      let newData = [],
          date = i.event.replace(/-/g,''),
          startDate = this.state.filters.startDate ? this.state.filters.startDate.replace(/-/g,'') : '',
          endDate = this.state.filters.endDate ? this.state.filters.endDate.replace(/-/g,'') : ''

      // filter dates
      if ( startDate ) {
        if ( date < startDate ) { return }
      }
      if ( endDate ) {
        if ( date > endDate ) { return }
      }

      _.map(i.data, (i) => {
        let time = i.time ? i.time : '',
            startTime = this.state.filters.startTime ? this.state.filters.startTime.replace(/:/g,'') : '',
            endTime = this.state.filters.endTime ? this.state.filters.endTime.replace(/:/g,'') : ''

        // filter time
        if ( startTime ) {
          if ( time <= startTime ) { return }
        }
        if ( endTime ) {
          if ( time >= endTime ) { return }
        }
        newData.push(i)
      }.bind(this))

      i.data = newData
      filteredData.push(i)

    }.bind(this))

    return filteredData
  }

  /**
   * filters layers ON componentDidUpdate
   * @param  {Object} data
   */
  _filterLayers(data) {
    let filteredDefinition = {}

    // Check if Map has been created yet
    if ( this.props.map.hasLayer ) {

      // Create Definition
      _.each( data , (i, k) => {
        filteredDefinition[i.event] = i
      })

      // Remove layers that aren't in the definition
      _.each( this.state , (i, k) => {
        if ( !filteredDefinition[k] && this.props.map.hasLayer( i )) {
          this.props.map.removeLayer( i )
          delete this.state[k]
        }
      }.bind(this))

      // Rerender layers that are in state but  updated
      _.each( this.state , (i, k) => {
        if ( filteredDefinition[k] && this.props.map.hasLayer( i )) {
          // check length is the same
          if ( filteredDefinition[k].data.length !== this.state[k]._latlngs.length ) {
            // remove
            this.props.map.removeLayer( i )
            delete this.state[k]
            // rerender
            this._createPolyLine(this.props.color, filteredDefinition[k].data, filteredDefinition[k].event, this.props.map)
          }
        }
      }.bind(this))

      // Add layers that aren't in state
      _.each( filteredDefinition , (i, k) => {
        // if not in state create
        if ( !this.state[k] && this.state.active) {
          this._createPolyLine(this.props.color, i.data, i.event, this.props.map)
        }
      }.bind(this))
    }
  }

  render() {

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
