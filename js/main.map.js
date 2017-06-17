// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// date     : 08/03/2017
// @package : GFSHCP
// @file    : main.map.js
// @version : 2.0.0
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

require.config({
  baseUrl : '/js',
  paths : {
    d3         : "libs/d3.min",
    leaflet    : "libs/leaflet",
    underscore : "libs/underscore-min",
    text       : 'libs/text',
    json       : 'libs/json',
    classyBrew : "libs/classybrew.min",
    jquery     : "libs/jquery-3.1.1.min",
    bootstrap  : "libs/bootstrap.min",
    btable     : "libs/bootstrap-table.min"
  },
  shim : {
    "bootstrap" : { "deps" :['jquery'] },
    "btable" : {"deps" : ['bootstrap']}
  },
});

var GFSHCPMapApp;

window.GFSHCPMapApp = GFSHCPMapApp;

require(['controller.map'], function(map){ 
  GFSHCPMapApp = map;
  GFSHCPMapApp.initialize();
});