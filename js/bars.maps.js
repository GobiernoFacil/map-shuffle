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
        _values    = parent.currentMap.config.values,
        _states    = parent.list.estadosName,
        _cities    = parent.list.municipiosName,
        _branches  = parent.list.ramosName,
        _units     = parent.list.unidadesName;

  // [3] define el objeto del comparador
  // ----------------------------------------------------------------------
  //
    var controller = {

      render : function(){
        var values = parent.currentMap.config.values;

        if(values.length){
          this.show();
          return;
        }
        else{
          this.hide();
        }

        console.log(values);


      },

      show : function(){

        _container.style.display = "block";
        _container.innerHTML = TEMPLATE;
      },

      hide : function(){
        _container.innerHTML = "";
        _container.style.display = "none";
      },

      renderSingleLocation : function(){

      },

      renderMultipleLocation : function(){

      },

      renderStateList : function(){

      },

      renderCityList : function(){

      },

      renderBranchList : function(){

      },

      renderUnitList : function(){
        
      }
      
    };

    return controller;
  }

  return GraphsControllerConstructor;
});