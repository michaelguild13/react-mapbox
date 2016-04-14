import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'underscore'

export class Person extends Component {

  _onClick(){
    let map = this.props.map,
        layer = this.state
    // if this person is already added
    if ( this.state ) {
      this._removePolyLines( this.state, this.props.map)
    } else {
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
    // Set Polyline Options
    let polyline_options = {
          color: color
        }
    // Create Polyline for each Day
    _.each(data, (i) => {
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
    })
  }

  _removePolyLines( data, map){
    _.each(data, (i, k) => {
      if ( map.hasLayer( i ) ) {
        map.removeLayer( i )
        delete this.state[k]
      }
    })

  }

  render() {
    return (
      <a className="mdl-navigation__link" onClick={this._onClick.bind(this)}>
        <i className="material-icons" style={{'color': this.props.color }}>
          account_box
        </i>
        {this.props.name}
      </a>
    )
  }
}
