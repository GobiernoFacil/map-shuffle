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
        this.updateGraphB = this.updateGraphB.bind(this);
        this.updateGraphD = this.updateGraphD.bind(this);
    		
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
    		    graphAFilters = new FIlterModule(parent, filterCart, this.updateGraphA, null, null, true),
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
        var section       = document.getElementById(UI.graph2),
            filterCart    = section.querySelector("ul"),
            filterMenu    = section.querySelector("form"),
            graph         = section.querySelector("canvas"),
            graphBFilters = new FIlterModule(parent, filterCart, this.updateGraphB, null, null, true),
            filters       = currentMap.config.filters.concat(currentMap.config.extraFilters || []);

        this.canvasB = graph;

        section.style.display = "block";

        
        filters.forEach(function(filter){
          //var select;
          
          if(filter.type == "search"){
            //this.searchFilters.push( graphAFilters.renderSearchInput(filter, document.getElementById(SEARCH)) );
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "state"){
            graphBFilters.renderStateSelector(filter, filterMenu);
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "city"){
            // renderCitySelector : function(filter, container)
            graphBFilters.renderCitySelector(filter, filterMenu);
            //this.filters.push(cityFilter);
          }

          else if(filter.type == "branch"){
            // renderCitySelector : function(filter, container)
            graphBFilters.renderBranchSelector(filter, filterMenu);
            //this.filters.push(branchFilter);
          }

          else if(filter.type == "unit"){
            // renderCitySelector : function(filter, container)
            graphBFilters.renderUnitSelector(filter, filterMenu);
            //this.filters.push(unitFilter);
          }
          else{
            graphBFilters.renderOtherSelector(filter, filterMenu)
            //this.filters.push( graphAFilters.renderOtherSelector(filter, filterMenu) );
          }


        }, this);
    	},
    	setupGraphC : function(){

    	},

    	setupGraphD : function(){
        var section       = document.getElementById(UI.graph4),
            filterCart    = section.querySelector("ul"),
            filterMenu    = section.querySelector("form"),
            graph         = section.querySelector("canvas"),
            graphDFilters = new FIlterModule(parent, filterCart, this.updateGraphD, null, null, true),
            filters       = currentMap.config.filters.concat(currentMap.config.extraFilters || []);

        this.canvasD = graph;

        section.style.display = "block";

        
        filters.forEach(function(filter){
          //var select;
          
          if(filter.type == "search"){
            //this.searchFilters.push( graphAFilters.renderSearchInput(filter, document.getElementById(SEARCH)) );
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "state"){
            graphDFilters.renderStateSelector(filter, filterMenu);
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "city"){
            // renderCitySelector : function(filter, container)
            graphDFilters.renderCitySelector(filter, filterMenu);
            //this.filters.push(cityFilter);
          }

          else if(filter.type == "branch"){
            // renderCitySelector : function(filter, container)
            graphDFilters.renderBranchSelector(filter, filterMenu);
            //this.filters.push(branchFilter);
          }

          else if(filter.type == "unit"){
            // renderCitySelector : function(filter, container)
            graphDFilters.renderUnitSelector(filter, filterMenu);
            //this.filters.push(unitFilter);
          }
          else{
            graphDFilters.renderOtherSelector(filter, filterMenu)
            //this.filters.push( graphAFilters.renderOtherSelector(filter, filterMenu) );
          }


        }, this);
    	},

    	updateGraphA : function(_data, filters, pagination){
    		this.dataA    = _data;
    		this.filtersA = filters;

        this.renderGraphA();
    	},

      updateGraphB : function(_data, filters, pagination){
        this.dataB    = _data;
        this.filtersB = filters;

        this.renderGraphB();
      },

      updateGraphD : function(_data, filters, pagination, latestFilter){
        this.dataD    = _data;
        this.filtersD = filters;
        //this.locatioD = 

        console.log(_data, filters, pagination, latestFilter);
        this.renderGraphD();
      },

      renderGraphB : function(){

        var that       = this,
            _config    = this.config.graph2,
            _area      = _config.area,

            maxLocs    = _config.maxLocations,
            locations  = this.getLocations(this.filtersB),
            areas      = this.getXaxis(this.filtersB, _area, this.dataB),
            datasetB   = null,
            defaultLabelB = "todos los ramos",
            labels     = _.pluck(locations, "label"),
            dataSets   = [],
            stateField = parent.currentMap.config.location.state,
            cityField  = parent.settings.constants.cityId,
            options    = { };



        if(labels.length < 3){
          return;
        }
        else{
          areas.forEach(function(area, index){
            var values = [];

            locations.forEach(function(loc){
              var fld = loc.type == "state" ? stateField : cityField;

              
              values.push(d3.sum( this.dataB.filter(function(d){
                  return d[_area.field] == area && d[fld] == loc.value;
                }), function(d){
                return d[_config.value];
              }));

            }, this);

            dataSets.push({
              backgroundColor : Chart.helpers.color(_config.colors[index]).alpha(0.5).rgbString(),
              borderColor : _config.colors[index],
              data :values,
              label : this.findLabel(area, _area)
            });
          }, this);

          if(this.graphB){
            this.graphB.destroy();
          }

          this.graphB = new Chart(this.canvasB, {
            type: 'radar',
            data: {labels : labels, datasets : dataSets},
            options: options
          });
        }
      },

      renderGraphD : function(){

        var that       = this,
            _config    = this.config.graph4,
            _area      = _config.area,
            _points    = _config.points,

            //maxLocs    = _config.maxLocations,
            location  = this.currentLocationD,



            areas      = this.getXaxis(this.filtersD, _area, this.dataD),
            points     = this.getXaxis(this.filtersD, _points, this.dataD),




            datasetD   = null,
            defaultLabelD = "todos los ramos",
            labels     = points.map(function(val){
              return this.findLabel(val, _points);
            }, this),
            dataSets   = [],
            stateField = parent.currentMap.config.location.state,
            cityField  = parent.settings.constants.cityId,
            options    = { };

        /*
        if(labels.length < 3){
          return;
        }
        else{
          areas.forEach(function(area, index){
            var values = [];

            locations.forEach(function(loc){
              var fld = loc.type == "state" ? stateField : cityField;

              
              values.push(d3.sum( this.dataB.filter(function(d){
                  return d[_area.field] == area && d[fld] == loc.value;
                }), function(d){
                return d[_config.value];
              }));

            }, this);

            dataSets.push({
              backgroundColor : Chart.helpers.color(_config.colors[index]).alpha(0.5).rgbString(),
              borderColor : _config.colors[index],
              data :values,
              label : this.findLabel(area, _area)
            });
          }, this);

          if(this.graphB){
            this.graphB.destroy();
          }

          this.graphB = new Chart(this.canvasB, {
            type: 'radar',
            data: {labels : labels, datasets : dataSets},
            options: options
          });
        }
        */
      },

    	renderGraphA : function(){
    		var that = this,
            _config = this.config.graph1,
    		    _xAxis   = _config.xAxis,
    		    _yAxis   = _config.yAxis,
    		    _zAxis   = _config.zAxis,
    		    maxLocs = _config.maxLocations,
    		    locations = this.getLocations(this.filtersA),
    		    xAxis     = this.getXaxis(this.filtersA, _xAxis, this.dataA),
    		    zAxis     = this.getZaxis(this.filtersA, _zAxis),
    		    datasetA = null,
    		    defaultLabelA = "todos los ramos";

        if(zAxis && locations){
          var dataSets = [];
          locations.forEach(function(loc, i){
            var stack = 'Stack ' + i;

            /*


            */
            zAxis.forEach(function(zx, j){
                dataSets.push({
                  label : _zAxis.type == "branch" ? _.where(parent.lists.ramosName.branches, {id : String(zx)})[0].name : zx,
                  backgroundColor : _config.colors[i],
                  stack: stack,
                  data : xAxis.map(function(item){
                    return d3.sum(that.dataA.filter(function(el){
                        return el[_xAxis.field] == item && el[_zAxis.field] == zx && el[loc.field] == loc.value;
                    }), function(d){
                        return +d[_config.yAxis.field]
                    });
                  }, this)
                });
            }, this); 
            /*


            */
          });

          var chartData = {
                labels   : xAxis,
                datasets : dataSets
              };
        }
        else if(locations){
          var dataSets = [];
          locations.forEach(function(loc, i){
            dataSets.push({
              label : loc.label,
              backgroundColor : _config.colors[i],
              stack : 'Stack ' + i,
              data : xAxis.map(function(item){
                return d3.sum(this.dataA.filter(function(el){
                        return el[_xAxis.field] == item &&el[loc.field] == loc.value;
                    }), function(d){
                        return +d[_config.yAxis.field]
                    });
              }, this)
            });
          }, this);

          var chartData = {
                labels   : xAxis,
                datasets : dataSets
              };
        }

        else if(zAxis){
              var dataSets = [];


              zAxis.forEach(function(zx, i){
                dataSets.push({
                  label : _zAxis.type == "branch" ? _.where(parent.lists.ramosName.branches, {id : String(zx)})[0].name : zx,
                  backgroundColor : _config.colors[i],
                  stack: 'Stack 0',
                  data : xAxis.map(function(item){
                    return d3.sum(this.dataA.filter(function(el){
                        return el[_xAxis.field] == item &&el[_zAxis.field] == zx;
                    }), function(d){
                        return +d[_config.yAxis.field]
                    });
                  }, this)
                });
              }, this); 

              var chartData = {
                labels   : xAxis,
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
                        return +d[_config.yAxis.field]
                    })
                }, this)
              };

              var chartData = {
                labels   : xAxis,
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
    					text : parent.currentMap.config.name
    				},
    				tooltips : {
    					mode : "index",
    					intersect : false
    				},
    				responsive : true,
    				scales : {
    					xAxes : [{stacked : true}],
    					yAxes : [{
                stacked : true,
                ticks: {
                // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                  }
                }
              }]
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
    					text : parent.currentMap.config.name
    				},
    				tooltips : {
    					mode : "index",
    					intersect : false
    				},
    				responsive : true,
    				scales : {
    					xAxes : [{
                stacked : true
              }],
    					yAxes : [{
                stacked : true,
                ticks: {
                // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                  }
                }
              }]
    				}
    			}
    		  });
    	  }

    	},

    	getLocations : function(filters){
    		var locs = filters.filter(function(filter){
    			return filter.type == "state" || filter.type == "city";
    		});

    		return locs.length ? locs : null;
    	},

    	getXaxis : function(filters, xAxis, data){
    		
    		var items = filters.filter(function(filter){
    			    return filter.field == xAxis.field;
    		    }, this),
    		    all   = _.pluck(data, xAxis.field),
    		    response = _.compact(_.uniq(items.length ? _.pluck(items, "value") : all));

    		return response.sort();
    	},

    	getZaxis : function(filters, zAxis){
    		
            if(!zAxis) return null;

    		var items = filters.filter(function(filter){
    			    return filter.field == zAxis.field;
    		    }, this);


    		return items.length ? _.compact(_.uniq(_.pluck(items, "value"))) : null;
    		

    	},

      findLabel : function(value, conf){

        if(conf.type == "branch"){
          return parent.lists.ramosName.branches.filter(function(el){ return el.id == value})[0].name;
        }
        else{
          return value;
        }
      }
    };

    return controller;
  };

  return GraphsControllerConstructor;
});