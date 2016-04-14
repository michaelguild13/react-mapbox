import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class MapBox extends Component {

  componentDidMount() {
    let node = findDOMNode(this)
  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className={className}>
        bla
      </div>
    )
  }
}
