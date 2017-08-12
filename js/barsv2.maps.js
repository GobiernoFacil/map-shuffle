// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : barsv2.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){
  Chart        = require("Chart"),
	d3           = require("d3"),
  underscore   = require("underscore"),
  FIlterModule = require("filter.module.map"),
  TEMPLATE     = require("text!templates/bars-app.html"),
  CONFIG       = require("json!config/config.map.json");

  var GraphsControllerConstructor = function(parent){
  	var UI         = CONFIG.ui.barsTool,
        container  = document.getElementById(UI.container),
        currentMap = null,
        config     = null,
        graphAFilters,
        graphBFilters,
        graphCFilters,
        graphDFilters;


    var controller = {
    	render : function(){
    		container.innerHTML = TEMPLATE;
    		currentMap          = parent.currentMap;
        config              = currentMap.config;

        if(!config.graphs){
        	container.innerHTML = "";
        	return;
        }

        if(config.graphs.graph1){
        	this.setupGraphA();
        }

        if(config.graphs.graph2){
        	this.setupGraphB();
        }

        if(config.graphs.graph3){
        	this.setupGraphC();
        }

        if(config.graphs.graph4){
        	this.setupGraphD();
        }
    	},

    	setupGraphA : function(){
    		var section       = document.getElementById(UI.graph1),
    		    filterCart    = section.querySelector("ul"),
    		    filterMenu    = section.querySelector("form"),
    		    graph         = section.querySelector("canvas"),
    		    graphAFilters = new FIlterModule(parent, filterCart, this.updateGraphA),
    		    filters = currentMap.config.filters.concat(currentMap.config.extraFilters || []);

    		section.style.display = "block";
    		//console.log(filterCart, filterMenu, graph);

    		
    		filters.forEach(function(filter){
          //var select;
          
          if(filter.type == "search"){
            //this.searchFilters.push( graphAFilters.renderSearchInput(filter, document.getElementById(SEARCH)) );
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "state"){
            graphAFilters.renderStateSelector(filter, filterMenu);
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "city"){
            // renderCitySelector : function(filter, container)
            graphAFilters.renderCitySelector(filter, filterMenu);
            //this.filters.push(cityFilter);
          }

          else if(filter.type == "branch"){
            // renderCitySelector : function(filter, container)
            graphAFilters.renderBranchSelector(filter, filterMenu);
            //this.filters.push(branchFilter);
          }

          else if(filter.type == "unit"){
            // renderCitySelector : function(filter, container)
            graphAFilters.renderUnitSelector(filter, filterMenu);
            //this.filters.push(unitFilter);
          }
          else{
          	graphAFilters.renderOtherSelector(filter, filterMenu)
            //this.filters.push( graphAFilters.renderOtherSelector(filter, filterMenu) );
          }


        }, this);
        
    	},

    	setupGraphB : function(){

    	},
    	setupGraphC : function(){

    	},

    	setupGraphD : function(){
    		
    	},

    	updateGraphA : function(_data, filters, pagination){

    	},

    	renderGraphA : function(){

    	}
    };

    return controller;
  };

  return GraphsControllerConstructor;
});