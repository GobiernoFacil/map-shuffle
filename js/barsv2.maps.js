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
        graphCFilters = 1,
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
        this.updateGraphC = this.updateGraphC.bind(this);
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
        	//this.setupGraphA();
          graphAFilters = this._setupGraph(UI.graph1, this.updateGraphA, "canvasA");

        }

        if(config.graphs.graph2){
        	//this.setupGraphB();
          graphBFilters = this._setupGraph(UI.graph2, this.updateGraphB, "canvasB");
        }

        if(config.graphs.graph3){
        	//this.setupGraphC();
          graphCFilters = this._setupGraph(UI.graph3, this.updateGraphC, "canvasC");
        }

        if(config.graphs.graph4){
        	//this.setupGraphD();
          graphDFilters = this._setupGraph(UI.graph4, this.updateGraphD, "canvasD");
        }
    	},

      _setupGraph : function(graphId, updateFunction, container){
        var section       = document.getElementById(graphId),
            filterCart    = section.querySelector("ul"),
            filterMenu    = section.querySelector("form"),
            graph         = section.querySelector("canvas"),
            filters       = currentMap.config.filters.concat(currentMap.config.extraFilters || []),
            filterModule  = new FIlterModule(parent, filterCart, updateFunction, null, null, true);
        
        this[container]       = graph;
        section.style.display = "block";
        this._renderGraphFilters(filters, filterModule, filterMenu);

        return filterModule;
      },

      _renderGraphFilters : function(filters, filterModule, filterMenu){
        filters.forEach(function(filter){
          if(filter.type == "search"){
            return;
          }
          else if(filter.type == "state"){
            filterModule.renderStateSelector(filter, filterMenu);
          }
          else if(filter.type == "city"){
            filterModule.renderCitySelector(filter, filterMenu);
          }
          else if(filter.type == "branch"){
            filterModule.renderBranchSelector(filter, filterMenu);
          }
          else if(filter.type == "unit"){
            filterModule.renderUnitSelector(filter, filterMenu);
          }
          else{
            filterModule.renderOtherSelector(filter, filterMenu);
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

      updateGraphC : function(_data, filters, pagination, latestFilter){
        this.dataC    = _data;
        this.filtersC = filters;

        if(latestFilter && (latestFilter.type == "state" || latestFilter.type == "city") ){
          graphCFilters._setUniq(["state", "city"], latestFilter);
        }

        this.renderGraphC();
      },


      updateGraphD : function(_data, filters, pagination, latestFilter){
        this.dataD    = _data;
        this.filtersD = filters;
  
        if(latestFilter && (latestFilter.type == "state" || latestFilter.type == "city") ){
          graphDFilters._setUniq(["state", "city"], latestFilter);
        }
        this.renderGraphD();
      },

      renderGraphA : function(){
        var that          = this,
            _config       = this.config.graph1,
            _xAxis        = _config.xAxis,
            _yAxis        = _config.yAxis,
            _zAxis        = _config.zAxis,
            maxLocs       = _config.maxLocations,
            locations     = this.getLocations(this.filtersA),
            xAxis         = this.getXaxis(this.filtersA, _xAxis, this.dataA),
            zAxis         = this.getZaxis(this.filtersA, _zAxis),
            datasetA      = null,
            defaultLabelA = "todos los ramos";

        if(zAxis && locations){
          var dataSets = [];
          locations.forEach(function(loc, i){
            var stack = 'Stack ' + i;
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

      renderGraphC : function(){
        var that          = this,
            _config       = this.config.graph3,
            _xAxis        = _config.xAxis,
            _yAxis        = _config.yAxis,
            _zAxis        = _config.zAxis,
            maxLocs       = _config.maxLocations,
            location      = this.currentLocationC,
            xAxis         = this.getXaxis(this.filtersC, _xAxis, this.dataC),
            zAxis         = this.getZaxis(this.filtersC, _zAxis),
            datasetC      = null,
            defaultLabelC = "todos los ramos",
            dataSets      = [];


        zAxis.forEach(function(zx, i){
            dataSets.push({
              label : this.findLabel(zx, _zAxis),//zx,
              backgroundColor : _config.colors[i],
              stack : 'Stack ' + i,
              data : xAxis.map(function(item){
                return d3.sum(this.dataA.filter(function(el){
                        return el[_xAxis.field] == item && el[_zAxis.field] == zx;
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



        if(this.graphC){

          this.graphC.destroy();

          var ctx = this.canvasC.getContext("2d");

          this.graphC = new Chart(ctx, {
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
          var ctx = this.canvasC.getContext("2d");
          this.graphC = new Chart(ctx, {
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

      //
      // DIBUJA LA CUARTA GRÁFICA (radar una ubicación)
      //
      //
      renderGraphD : function(){
        // [1] obtiene algunas referencias
        //
        var that       = this,
            // la configuración de la gráfica
            _config    = this.config.graph4,
            // el campo que define el área
            _area      = _config.area,
            // el campo que define los puntos
            _points    = _config.points,
            //maxLocs    = _config.maxLocations,
            // la ubicación a desplegar
            location  = this.currentLocationD,
            // el array con los valores de las áreas
            areas      = this.getXaxis(this.filtersD, _area, this.dataD),
            // el array con los valores de los puntos
            points     = this.getXaxis(this.filtersD, _points, this.dataD),
            // los datos para graficar
            datasetD   = null,
            // el título de la gráfica
            defaultLabelD = "todos los ramos",
            // las etiquetas para las aristas (points)
            labels     = points.map(function(val){
              return this.findLabel(val, _points);
            }, this),
            // los datos para cada geometría en el radar
            dataSets   = [],
            // la columna de estado
            stateField = parent.currentMap.config.location.state,
            // la columna de municipio
            cityField  = parent.settings.constants.cityId,
            // las opciones de la gráfica
            options    = { };

        // [2] se mapean los datos para graficar
        //
        areas.forEach(function(area, index){
          // [2.1] se inicia el array de los valores numéricos
          //       para cada área
          var values = [];

          // [2.2] cada punto define un valor del área
          points.forEach(function(point){
            // [2.2.1] cada valor resulta de sumar los valores que 
            //         tienen la misma clave de área y la misma clave del punto.
            //         el valor que suman es el que corresponde al valor definido
            //         en la configuración de la gráfica (value)
            values.push(d3.sum( this.dataD.filter(function(d){
                  return d[_area.field] == area && d[_points.field] == point;
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

        // [3] si la gráfica existe, la resetea
        //
        if(this.graphD){
          this.graphD.destroy();
        }

        // [4] dibuja la gráfica
        //
        this.graphD = new Chart(this.canvasD, {
            type: 'radar',
            data: {labels : labels, datasets : dataSets},
            options: options
        });
      },

      //
      //
    	

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