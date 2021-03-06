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
    async      : 'libs/async',
    classyBrew : "libs/classybrew.min",
    jquery     : "libs/jquery-3.1.1.min",
    selectize  : "libs/selectize.min",
    Chart      : "libs/chart.min"
  },
  shim : {
    selectize : ["jquery"]
  }
});

var GFSHCPMapApp;

window.GFSHCPMapApp = GFSHCPMapApp;

require(['controller.map'], function(map){ 
  GFSHCPMapApp = map;
  GFSHCPMapApp.initialize({
    loaderStart : GFSHCPLoaderStart,
    loaderStop  : GFSHCPLoaderStop,
    callbacks   : GFSHCPcallbacks
  });
});