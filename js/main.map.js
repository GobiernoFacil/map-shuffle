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
    d3         : "bower_components/d3/d3.min",
    leaflet    : "bower_components/leaflet/dist/leaflet",
    underscore : "bower_components/underscore/underscore-min",
    text       : 'bower_components/requirejs-plugins/lib/text',
    json       : 'bower_components/requirejs-plugins/src/json',
    classyBrew : "classybrew/build/classybrew.min"
  }
});

var GFSHCPMapApp;

require(['controller.map'], function(map){ 
  GFSHCPMapApp = map;
  GFSHCPMapApp.initialize();
});