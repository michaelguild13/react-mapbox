// Node Modules
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// Components
import { App } from './app'
// TODO: put this in a config file
L.mapbox.accessToken = 'pk.eyJ1IjoibWljaGFlbGd1aWxkMTMiLCJhIjoiNWEwMzYxNTE2YzdhN2JkYmFiODU1Zjc3ZTVkZDlmZDgifQ.gPM-n6Mqyi98PsB3iFNKfg'
// Scss entry point
require('../scss/base.scss');
// App entry point
ReactDOM.render( <App /> , document.getElementById( 'app' ) )
