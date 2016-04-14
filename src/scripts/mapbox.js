import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class MapBox extends Component {

  componentDidMount() {
    let node = findDOMNode(this)
    map = L.mapbox.map('map', 'mapbox.streets')
  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div id="map"></div>
    )
  }
}
