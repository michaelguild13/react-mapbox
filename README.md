###Description
This is a react & mapbox example for filtering people on their daily location path. This demo is meant to show how to filter data based on date, time, and location. To filter on date or time, use the respective inputs. Filter based on circle marker is a feature in progress.

### Tech Stack
node.js + webpack + babel + react + mapbox + Material Design Lite

###Installation
`npm install`

###Start Dev Server
`npm start`

###Minify and Production
`webpack --config webpack-production.config.js -p --bail`
Files will be produced to `static/public/build`

### Notes
Seed data is between dates of 4/11 - 4/15. Color filters are auto generated on page reload. The time filter is still glitchy. There is no filter based on drawing a circle to get markers as of yet.

###Seed Locations & Resources
http://www.gps-coordinates.net/
http://opendata.arcgis.com/
https://www.movebank.org/
https://www.mockaroo.com/
