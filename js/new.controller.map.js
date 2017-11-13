// MAPA MÚLTIPLE NUEVA VERSIÓN - GOBIERNO FÁCIL
// @package : GFMULTIMAP
// @location : /js
// @file     : new.controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){
    // [1] obtiene el archivo de configuración
  var //// CONFIG      = require("json!config/config.map.json"),
      // ----------------------------------------------------------------------

      // [2] obtiene las librerías necesarias
      // ----------------------------------------------------------------------
      d3          = require("d3"),
      leaflet     = require("leaflet"),
      underscore  = require("underscore"),
      classybrew  = require("classyBrew"),
      //// APIKEY      = "AIzaSyDZXX_dqYAZ9oLxA28sN5ztg3qNBArk80I",
      //// gMaps       = require("async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDZXX_dqYAZ9oLxA28sN5ztg3qNBArk80I");

      // [3] obtiene los conjuntos de datos
      // ----------------------------------------------------------------------
      // [*] las posibles combinaciones de color de classyBrew
      COLORS         = require("assets/brewer-color-list"),
      // [*] el archivo de geojson de los estados
      //// ESTADOS        = require("assets/estados-area"),
      // [*] el nombre y clave de cada estado
      //// ESTADOSNAME    = require("assets/estados-nombres"),
      // [*] el geojson de los municipios
      ////MUNICIPIOS     = require("assets/municipios"),
      // [*] el nombre y clave de cada municipio
      ////MUNICIPIOSNAME = require("assets/municipios-nombres"),
      // [*] el nombre y clave de cada ramo
      ////RAMOSNAME      = require("assets/ramos-nombres"),
      // [*] el nombre,ramo y clave de cada unidad ejecutora
      //// UNIDADESNAME   = require("assets/unidades-nombres"),

      // [4] obtiene los templates de UI
      // ----------------------------------------------------------------------
      // [*] el selector de mapa
      // MAPSELECTOR    = require("text!templates/map-selector-panel.html"),
      // [*] las barras de comparación
      //PAGESELECTOR   = require("text!templates/page-selector-panel.html"),  
      // [*] la guía de color
      //COLORGUIDE     = require("text!templates/color-band.html"), 

      // [5] carga los componentes de filtros y búsqueda
      // ----------------------------------------------------------------------
      //BARSTOOL      = require("barsv2.maps"), 

      // [6] carga los componentes de filtros y búsqueda
      // ----------------------------------------------------------------------
      //SEARCHTOOL     = require("search.maps"), 

      // [7] carga el componente de filtrado
      // ----------------------------------------------------------------------
      //FILTERMODULE   = require("filter.module.map");

      // [8] define las constantes internas del sistema 
      // ----------------------------------------------------------------------
      SELECTALL      = "ಠ_ಠ",
      CITYID         = "GFSHCPCityId",
      UNITID         = "GFSHCPUnitId";

      var GFMultiMap = {
        initialize : function(settings){
          GFMultiMap.firstTime = true;
          GFMultiMap.settings = null;

          d3.
        }
      };

      return GFMultiMap;
});