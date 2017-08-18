({
  baseUrl : '.',
  paths : {
    requireLib : 'libs/require',
    d3         : "libs/d3.min",
    leaflet    : "libs/leaflet",
    underscore : "libs/underscore-min",
    text       : 'libs/text',
    json       : 'libs/json',
    async      : 'libs/async',
    classyBrew : "libs/classybrew.min",
    jquery     : "libs/jquery-3.1.1.min",
    selectize  : "libs/selectize.min",
    Chart      : "libs/chart.min"
  },
  include : ['requireLib'],
  name : "main.map",
  out : "main-built.js"
})