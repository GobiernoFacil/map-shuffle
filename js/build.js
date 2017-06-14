({
  baseUrl : '.',
  paths : {
    requireLib : 'libs/require',
    d3         : "libs/d3.min",
    leaflet    : "libs/leaflet",
    underscore : "libs/underscore-min",
    text       : 'libs/text',
    json       : 'libs/json',
    classyBrew : "libs/classybrew.min"
  },
  include : ['requireLib'],
  name : "main.map",
  out : "main-built.js"
})