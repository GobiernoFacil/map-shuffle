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
  var TEMPLATE = require("text!templates/bars-app.html");

  // [2] define el constructor
  // ----------------------------------------------------------------------
  //
  var GraphsControllerConstructor = function(parent){

    var _id        = parent.settings.ui.barsTool.container,
        _container = document.getElementById(_id),
        _values    = null,
        _states    = parent.lists.estadosName,
        _cities    = parent.lists.municipiosName,
        _branches  = parent.lists.ramosName,
        _units     = parent.lists.unidadesName;

  // [3] define el objeto del comparador
  // ----------------------------------------------------------------------
  //
    var controller = {

      render : function(){
        _values = parent.currentMap.config.values;

        if(_values.length){
          this.show();
          this.renderSingleLocation();
          this.renderMultipleLocation();
          //this.renderOptions();
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

      renderOptions : function(){
        var filtersA = parent.currentMap.config.filters,
            filtersB = parent.currentMap.config.extraFilters;

        renderValueList();

        if(this._findFilter("state", filtersA)){

        }
      },

      

      renderSingleLocation : function(){

      },

      renderMultipleLocation : function(){

      },

      renderValueList : function(){

      },

      renderStateList : function(){

      },

      renderCityList : function(){

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