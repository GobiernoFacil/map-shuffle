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
    	dataA   : null,
    	dataB   : null,
    	dataC   : null,
    	dataD   : null,

    	config : null,

    	filtersA : [],
    	filtersB : [],
    	filtersC : [],
    	filtersD : [],

    	canvasA : null,
    	canvasB : null,
    	canvasC : null,
    	canvasD : null,

    	graph  : null,
    	graphA : null,
    	graphB : null,
    	graphC : null,
    	graphD : null,

    	render : function(){
    		this.dataA = parent.currentMap.data;
    		this.dataB = parent.currentMap.data;
    		this.dataC = parent.currentMap.data;
    		this.dataD = parent.currentMap.data;

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

    		this.canvasA = graph;

    		section.style.display = "block";

    		
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
    		this.dataA    = _data;
    		this.filtersA = filters;
    	},

    	renderGraphA : function(){
    		var _config = this.config.graph1,
    		    _xAxis   = _config.xAxis,
    		    _yAxis   = _config.yAxis,
    		    _zAxis   = _config.zAxis,
    		    maxLocs = _config.maxLocations,
    		    locations = this.getLocations(this.filtersA),
    		    yAxis     = this.getYaxis(this.filtersA, _yAxis, this.dataA),
    		    zAxis     = this.getZaxis(this.filtersA, _zAxis),
    		    datasetA = null,
    		    defaultLabelA = "todos los ramos";




    		console.log(locations, yAxis, zAxis);

            if(zAxis){
              var dataSets = [];
              zAxis.forEach(function(zx, i){
                dataSets.push({
                  label : _zAxis.type == "branch" ? _.where(parent.lists.ramosName.branches, {id : String(zx)})[0].name : zx,
                  backgroundColor : _config.colors[i],
                  stack: 'Stack 0',
                  data : yAxis.map(function(item){
                    var search = {};
                    search[_yAxis.field] = item;
                    search[_zAxis.field] = zx;

                    console.log(search);
                    return d3.sum(this.dataA.filter(function(el){
                        return el[_yAxis.field] == item &&el[_zAxis.field] == zx;
                    }), function(d){
                        return +d[_config.xAxis.field]
                    });
                  }, this)
                });
              }, this); 

              var chartData = {
                labels   : yAxis,
                datasets : dataSets
              };
            }

            else{
              var datasetA = {
                label : defaultLabelA,
                backgroundColor : "red",
                stack: 'Stack 0',
                data : yAxis.map(function(item){
                    var search = {};


                    search[_yAxis.field] = item;
                    return d3.sum(this.dataA.filter(function(el){
                        return el[_yAxis.field] == item
                    }), function(d){
                        return +d[_config.xAxis.field]
                    })
                }, this)
              };

              var chartData = {
                labels   : yAxis,
                datasets : [datasetA]
              };
            }


    		if(this.graphA){

    			this.graphA.destroy();

    			var ctx = this.canvasA.getContext("2d");

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
    		  var ctx = this.canvasA.getContext("2d");

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

    	getYaxis : function(filters, yAxis, data){
    		
    		var items = filters.filter(function(filter){
    			    return filter.field == yAxis.field;
    		    }, this),
    		    all   = _.pluck(data, yAxis.field),
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