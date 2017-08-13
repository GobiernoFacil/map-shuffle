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
    	data : null,
    	filters : [],
    	config : null,
    	canvas : null,
    	graph : null,
    	graphA : null,
    	render : function(){
    		this.data = parent.currentMap.data;
    		this.updateGraphA = this.updateGraphA.bind(this);
    		container.innerHTML = TEMPLATE;
    		currentMap          = parent.currentMap;
        config              = currentMap.config;

        if(!config.graphs){
        	container.innerHTML = "";
        	return;
        }

        this.config = config.graphs;

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

    		this.canvas = graph;

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
    		//console.log(this, _data, filters, pagination);
    		this.data    = _data;
    		this.filters = filters;
    	},

    	renderGraphA : function(){
    		//console.log(this.data, this.filters, this.config);
    		var _config = this.config.graph1,
    		    _xAxis   = _config.xAxis,
    		    _yAxis   = _config.yAxis,
    		    _zAxis   = _config.zAxis,
    		    maxLocs = _config.maxLocations,
    		    locations = this.getLocations(this.filters),
    		    yAxis     = this.getYaxis(this.filters, _yAxis),
    		    zAxis     = this.getZaxis(this.filters, _zAxis),
    		    datasetA = null;




    		var datasetA = {
    			label : "todos los ramos",
    			backgroundColor : "red",
    			stack: 'Stack 0',
    			data : yAxis.map(function(item){
    				var search = {};
    				search[_yAxis.field] = item;
    				return d3.sum(this.data.filter(function(el){return el.ciclo == item}), function(d){return d.ciclo})
    			}, this)
    		};

    		var chartData = {
    			labels   : yAxis,
    			datasets : [datasetA]
    		};

    		console.log(chartData);

    		if(this.graphA){

    			this.graphA.destroy();

    			var ctx = this.canvas.getContext("2d");

    			this.graphA = new Chart(ctx, {
    			type : "bar",
    			data : chartData,
    			options : {
    				title : {
    					display : true, 
    					text : "some chet"
    				},
    				tooltips : {
    					mode : "index",
    					intersect : false
    				},
    				responsive : true,
    				scales : {
    					xAxes : [{stacked : true}],
    					yAxes : [{stacked : true}]
    				}
    			}
    		});
    		}
    		else{
    		  var ctx = this.canvas.getContext("2d");

    		  this.graphA = new Chart(ctx, {
    			type : "bar",
    			data : chartData,
    			options : {
    				title : {
    					display : true, 
    					text : "some chet"
    				},
    				tooltips : {
    					mode : "index",
    					intersect : false
    				},
    				responsive : true,
    				scales : {
    					xAxes : [{stacked : true}],
    					yAxes : [{stacked : true}]
    				}
    			}
    		  });
    	  }

    	},

    	getLocations : function(filters){
    		var locs = filters.filter(function(filter){
    			return filter.type == "state" || filter.type == "city";
    		});

    		return locs;
    	},

    	getYaxis : function(filters, yAxis){
    		
    		var items = filters.filter(function(filter){
    			    return filter.field == yAxis.field;
    		    }, this),
    		    all   = _.pluck(this.data, yAxis.field),
    		    response = _.compact(_.uniq(items.length ? _.pluck(items, "value") : all));

    		return response.sort(); 
    		//return 12;


    	},

    	getZaxis : function(filters, zAxis){
    		
    		var items = filters.filter(function(filter){
    			    return filter.field == zAxis.field;
    		    }, this);


    		return items.length ? _.compact(_.uniq(_.pluck(items, "value"))) : null;
    		

    	}
    };

    return controller;
  };

  return GraphsControllerConstructor;
});