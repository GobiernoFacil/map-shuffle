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
  CONFIG       = require("json!config/config.map.json"),
  defaultLabelA = "todos los ramos, todo México";

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

        this._enableToggleButtons(config);


    	},

      _enableToggleButtons : function(config){
        var _btn1 = parent.settings.ui.barsTool.graph1Btn,
            _btn2 = parent.settings.ui.barsTool.graph2Btn,
            _btn3 = parent.settings.ui.barsTool.graph3Btn,
            _btn4 = parent.settings.ui.barsTool.graph4Btn,
            btn1  = document.getElementById(_btn1),
            btn2  = document.getElementById(_btn2),
            btn3  = document.getElementById(_btn3),
            btn4  = document.getElementById(_btn4),
            graph1 = document.getElementById(UI.graph1),
            graph2 = document.getElementById(UI.graph2),
            graph3 = document.getElementById(UI.graph3),
            graph4 = document.getElementById(UI.graph4);

        if(config.graphs.graph1){
          if(graph2) graph2.style.display = "none";
          if(graph3) graph3.style.display = "none";
          if(graph4) graph4.style.display = "none";
          btn1.classList.add("current");
        }
        else if(config.graphs.graph2){
          if(graph3) graph3.style.display = "none";
          if(graph4) graph4.style.display = "none";
          btn2.classList.add("current");
        }
        else if(config.graphs.graph3){
          if(graph4) graph4.style.display = "none";
          btn3.classList.add("current");
        }

        if(btn1 && graph1){
          btn1.querySelector("a").innerHTML = config.graphs.graph1.title || "gráfica sin título";
          btn1.addEventListener("click", function(e){
            e.preventDefault();
            graph1.style.display = "block";
            if(! btn1.classList.contains("current") ) btn1.classList.add("current");
            if(graph2){
              graph2.style.display = "none";
              if(btn2.classList.contains("current") ) btn2.classList.remove("current");
            }
            if(graph3){
              graph3.style.display = "none";
              if(btn3.classList.contains("current") ) btn3.classList.remove("current");
            }
            if(graph4){
              graph4.style.display = "none";
              if(btn4.classList.contains("current") ) btn4.classList.remove("current");
            }
          });
        }

        if(btn2 && graph2){
          btn2.querySelector("a").innerHTML = config.graphs.graph2.title || "gráfica sin título";
          btn2.addEventListener("click", function(e){
            e.preventDefault();
            graph2.style.display = "block";
            if(! btn2.classList.contains("current") ) btn2.classList.add("current");
            if(graph1){
              graph1.style.display = "none";
              if(btn1.classList.contains("current") ) btn1.classList.remove("current");
            }
            if(graph3){
              graph3.style.display = "none";
              if(btn3.classList.contains("current") ) btn3.classList.remove("current");
            }
            if(graph4){
              graph4.style.display = "none";
              if(btn4.classList.contains("current") ) btn4.classList.remove("current");
            }
          });
        }

        if(btn3 && graph3){
          btn3.querySelector("a").innerHTML = config.graphs.graph3.title || "gráfica sin título";
          btn3.addEventListener("click", function(e){
            e.preventDefault();
            graph3.style.display = "block";
            if(! btn3.classList.contains("current") ) btn3.classList.add("current");
            if(graph2){
              graph2.style.display = "none";
              if(btn2.classList.contains("current") ) btn2.classList.remove("current");
            }
            if(graph1){
              graph1.style.display = "none";
              if(btn1.classList.contains("current") ) btn1.classList.remove("current");
            }
            if(graph4){
              graph4.style.display = "none";
              if(btn4.classList.contains("current") ) btn4.classList.remove("current");
            }
          });
        }

        if(btn4 && graph4){
          btn4.querySelector("a").innerHTML = config.graphs.graph4.title || "gráfica sin título";
          btn4.addEventListener("click", function(e){
            e.preventDefault();
            graph4.style.display = "block";
            if(! btn4.classList.contains("current") ) btn4.classList.add("current");
            if(graph2){
              graph2.style.display = "none";
              if(btn2.classList.contains("current") ) btn2.classList.remove("current");
            }
            if(graph3){
              graph3.style.display = "none";
              if(btn3.classList.contains("current") ) btn3.classList.remove("current");
            }
            if(graph1){
              graph1.style.display = "none";
              if(btn1.classList.contains("current") ) btn1.classList.remove("current");
            }
          });
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
            counter,
            dataSets = [],
            chartData;

        if(zAxis && locations){
          counter = 0;
          locations.forEach(function(loc, i){
            var stack = 'Stack ' + i;
            zAxis.forEach(function(zx, j){
                dataSets.push({
                  label :  (loc.label + " : ") + (_zAxis.type == "branch" ? _.where(parent.lists.ramosName.branches, {id : String(zx)})[0].name : zx),
                  backgroundColor : _config.colors[counter],
                  stack: stack,
                  data : xAxis.map(function(item){
                    return d3.sum(that.dataA.filter(function(el){
                        return el[_xAxis.field] == item && el[_zAxis.field] == zx && el[loc.field] == loc.value;
                    }), function(d){
                        return +d[_config.yAxis.field]
                    });
                  }, this)
                });
              counter++;
            }, this); 

          });

          chartData = {
            labels   : xAxis,
            datasets : dataSets
          };

        }
        else if(locations){
          locations.forEach(function(loc, i){
            dataSets.push({
              label : loc.label,
              backgroundColor : _config.colors[i],
              stack : 'Stack ' + i,
              data : xAxis.map(function(item){
                return d3.sum(this.dataA.filter(function(el){
                        return el[_xAxis.field] == item &&el[loc.field] == loc.value;
                    }), function(d){
                        return +d[_config.yAxis.field];
                    });
              }, this)
            });
          }, this);

          chartData = {
            labels   : xAxis,
            datasets : dataSets
          };
        }

        else if(zAxis){
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

          chartData = {
            labels   : xAxis,
            datasets : dataSets
          };
        }

        else{
              var datasetA = {
                label : defaultLabelA,
                backgroundColor : _config.colors[0],
                stack: 'Stack 0',
                data : xAxis.map(function(item){
                    var search = {};


                    search[_xAxis.field] = item;

                    return d3.sum(this.dataA.filter(function(el){
                        return el[_xAxis.field] == item
                    }), function(d){
                        return +d[_config.yAxis.field]
                    })
                }, this)
              };

          chartData = {
            labels   : xAxis,
            datasets : [datasetA]
          };
        }


        if(this.graphA){ this.graphA.destroy(); }

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


        console.log(_zAxis, zAxis);

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
          console.log("somethign wrong");

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
            options    = { 
              scale : {
                ticks: {
                // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                  }
                }
              }
            };



        if(labels.length < 3){
          //console.log("labels < 3");
          if(this.graphB) this.graphB.destroy();
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
            options    = { 
              scale : {
                ticks: {
                // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                  }
                }
              }
            };

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

    		return items.length ? _.compact(_.uniq(_.pluck(items, "value"))) : [];
    		

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