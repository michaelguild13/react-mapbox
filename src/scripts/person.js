import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class Person extends Component {

  _onClick(){
    let polyline_options = {
          color: this.props.color
        },
        line_points = this._getLinePoints()

    L.polyline( line_points, polyline_options ).addTo(this.props.map);
  }

  _getLinePoints(){
    return [
      [38.893596444352134, -77.0381498336792],
      [38.89337933372204, -77.03792452812195],
      [38.89316222242831, -77.03761339187622],
      [38.893028615148424, -77.03731298446655],
      [38.892920059048464, -77.03691601753235],
      [38.892903358095296, -77.03637957572937],
      [38.89301191422077, -77.03592896461487],
      [38.89316222242831, -77.03549981117249],
      [38.89340438498248, -77.03514575958252],
      [38.893596444352134, -77.0349633693695]
    ]
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
