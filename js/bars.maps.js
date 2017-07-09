// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  
  // [1] obtiene los templates de UI
  // ----------------------------------------------------------------------
  // 
  var TEMPLATE = require("text!templates/bars-app.html"),
      FILTER   = require("text!templates/filter-item.html");

  // [2] define el constructor
  // ----------------------------------------------------------------------
  //
  var GraphsControllerConstructor = function(parent){

/*
      "barsTool" : {
      "container"         : "GF-SHCP-bars-tool",
      "singleLocation"    : "GF-SHCP-bars-app-single-location",
      "multipleLocations" : "GF-SHCP-bars-app-multiple-locations",
      "singleLocationUI" : {
        "state"           : "GF-SHCP-bars-app-single-location-state",
        "city"            : "GF-SHCP-bars-app-single-location-city",
        "addLocation"     : "GF-SHCP-bars-app-single-location-select-btn",
        "selectedFilters" : "GF-SHCP-bars-app-single-location-selected-filters",
        "filterList"      : "GF-SHCP-bars-app-single-location-filter-list",
        "filterPrefix"    : "GF-SHCP-bars-app-single-location-filter-prefix-",
        "addGraph"        : "GF-SHCP-bars-app-single-location-add-bar-btn"   
      }
    },
      */

    var _id         = parent.settings.ui.barsTool.container,
        _slID       = parent.settings.ui.barsTool.singleLocation,
        _mlID       = parent.settings.ui.barsTool.multipleLocations,
        _container  = document.getElementById(_id),
        _sContainer = null, 
        _mContainer = null,
        _values     = null,
        _data       = null,
        _states     = parent.lists.estadosName.states,
        _cities     = parent.lists.municipiosName,
        _branches   = parent.lists.ramosName,
        _units      = parent.lists.unidadesName,

        _SLStateInputID      = parent.settings.ui.barsTool.singleLocationUI.state,
        _SLCityInputID       = parent.settings.ui.barsTool.singleLocationUI.city,
        _SLLocationBtnID     = parent.settings.ui.barsTool.singleLocationUI.addLocation,
        _SLSelectedFiltersID = parent.settings.ui.barsTool.singleLocationUI.selectedFilters,
        _SLFilterListID      = parent.settings.ui.barsTool.singleLocationUI.filterList,
        _SLFilterPrefix      = parent.settings.ui.barsTool.singleLocationUI.filterPrefix,
        _SLAddGraphBtn       = parent.settings.ui.barsTool.singleLocationUI.addGraph,


        SELECTALL = "ALL";


  // [3] define el objeto del comparador
  // ----------------------------------------------------------------------
  //
    var controller = {

      render : function(){
        _values = parent.currentMap.config.values;
        _data   = parent.currentMap.data; 

        if(_values.length){
          this.show();
          this.renderSingleLocation();
          this.renderMultipleLocation();
          return;
        }
        else{
          this.hide();
        }
      },

      show : function(){
        _container.style.display = "block";
        _container.innerHTML = TEMPLATE;
      },

      hide : function(){
        _container.innerHTML = "";
        _container.style.display = "none";
      },

      /*
      _SLStateInputID      = parent.settings.ui.barsTool.singleLocationUI.state,
        _SLCityInputID       = parent.settings.ui.barsTool.singleLocationUI.city,
        _SLLocationBtnID     = parent.settings.ui.barsTool.singleLocationUI.addLocation,
        _SLSelectedFiltersID = parent.settings.ui.barsTool.singleLocationUI.selectedFilters,
        _SLFilterListID      = parent.settings.ui.barsTool.singleLocationUI.filterList,
        _SLFilterPrefix      = parent.settings.ui.barsTool.singleLocationUI.filterPrefix,
        _SLAddGraphBtn       = parent.settings.ui.barsTool.singleLocationUI.addGraph;
      */

      renderSingleLocation : function(){
        var container = document.getElementById(_slID),
            state     = document.getElementById(_SLStateInputID),
            city      = document.getElementById(_SLCityInputID),
            filters   = document.getElementById(_SLFilterListID);

        this.renderStateList(state);
        this.renderCityList(city);
        this.renderOptions(filters);

        //console.log(container);

        container.addEventListener("submit", function(e){e.preventDefault()});
      },

      renderMultipleLocation : function(){

      },

      renderOptions : function(container){
        var filtersA = parent.currentMap.config.filters,
            filtersB = parent.currentMap.config.extraFilters;

        this.renderValueList(container);
      },

      renderValueList : function(){

      },

      renderStateList : function(state){
        console.log(_data);
        console.log(state);
        console.log(_states);

        /*
        32
name
:
"Zacatecas"
url
:
"zacatecas"
        */
      },

      renderCityList : function(city){

      },

      renderBranchList : function(){

      },

      renderUnitList : function(){
        
      },

      _findFilter : function(name, list){
        return list.filter(function(filter){
          filter.type == name;
        }).length;
      }
      
    };

    return controller;
  }

  return GraphsControllerConstructor;
});