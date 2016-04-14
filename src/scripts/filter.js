import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class Filter extends Component {

  _onChange(){
    let v = findDOMNode(this).MaterialTextfield.input_.value
    this.props.onChange(v, this.props.name)
  }

  render() {
    return (
      <fieldset className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <label className="mdl-textfield__label">
          {this.props.label}
        </label>
        <input
          className="mdl-textfield__input"
          type={this.props.type}
          name={this.props.name}
          onChange={this._onChange.bind(this)}
        />
        <span className="mdl-textfield__error">{this.props.error}</span>
      </fieldset>
    )
  }
}
