// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  /*
   * C A R G A   L O S   A R C H I V O S   D E   I N I C I O
   * ------------------------------------------------------------
   */

      // obtiene el archivo de configuración
  var CONFIG      = require("json!config.map.json"),
      // obtiene las librerías necesarias
      d3          = require("d3"),
      leaflet     = require("leaflet"),
      underscore  = require("underscore"),
      classybrew  = require("classyBrew"),
      // obtiene los conjuntos de datos
      COLORS      = require("assets/brewer-color-list"),
      ESTADOS     = require("assets/estados-area"),
      ESTADOSNAME = require("assets/estados-nombres");





  /*
   * E L   S I N G L E T O N   D E L   M A P A (main obj)
   * ------------------------------------------------------------
   */
  var GFSHCPMap = {

    //
    // FUNCIÓN DE INICIO
    // ------------------------------
    // cuando el objeto se carga mediante require, es la primera 
    // función que se ejecuta
    //
    initialize : function(){
      // inicia las propiedades a usar
      this.map          = null;
      this.layersConfig = [];
      this.settings     = Object.create(CONFIG);
      this.brew         = null;
      this.currentData  = null;
      this.currentMap   = null;

      this.states = null;
      this.cities = null;
      this.points = null;


      // arregla el scope de algunas funciones
      this._stateStyle = this._stateStyle.bind(this);

      // arregla algunos datos del geojson
      this._setStatesGeometry();
      
      // inicia el mapa de leaflet
      this.drawMap();

      // carga los json de configuración decada mapa
      this.loadMapsConfig();
    },

    //
    // DIBUJA EL MAPA PRINCIPAL
    //
    //
    drawMap : function(){
      // inicia el mapa de leaflet con los settings de config.map.json
      this.map = L.map(this.settings.map.div)
                  .setView([this.settings.map.lat, this.settings.map.lng], this.settings.map.zoom);

      // agrega el layer de tiles
      L.tileLayer(this.settings.map.tileServer, this.settings.map.tileServerConfig).addTo(this.map);

      // agrega los demas créditos
      if(this.settings.map.attributions.length){
        this.settings.map.attributions.forEach(function(attr){
          this.map.attributionControl.addAttribution(attr);
        }, this);
      }
    },

    //
    // CARGA LA CONFIGUACIÓN DE LOS MAPAS EXTERNOS
    //
    //
    loadMapsConfig : function(){
      var that = this;

      // carga el json de cada mapa, y si es el mapa seleccionado, 
      // genera unlayer con la información
      this.settings.maps.maps.forEach(function(url, index){
        
        var path   = this.settings.maps.basePath + "/" + url,
            active = this.settings.maps.current; 

        d3.json(path, function(error, data){
          var item = {
            src    : path, 
            config : data,
            index  : index,
            data   : null
          };

          that.layersConfig.push(item);

          if(+index === +active){
            that.getLayer(item);
          }
        });
      }, this);
    },

    //
    // OBTIENE LA INFORMACIÓN DEL LAYER SELECCIONADO
    //
    //
    getLayer : function(item){
      var that = this, 
          conf = item.config;

      // carga el archivo con los datos para graficar
      d3[conf.file](conf.src, function(error, data){
        item.data = data;
        that.currentMap = item;

        // renderea un mapa a nivel estatal
        if(item.config.current.level == "state"){
          that.currentData = that._agregateDataByState(item);
          that.brew = that._colorMixer(item);
          that.renderStateLayer(item);
        }

        // renderea un mapa a nivel municipal
        else if(item.config.current.level == "city"){
          that.currentData = that._agregateDataByCity(item);
          that.brew = that._colorMixer(item);
          that.renderCityLayer(item);
        }

        // renderea un mapa a nivel latitud y longitud
        else{
          that.currentData = null;
          that.renderPointsLayer(item);
        }

        
      });
    },

    //
    // DIBUJA EL LAYER SELECCIONADO
    //
    //
    renderStateLayer : function(item){
      this.states = L.geoJson(ESTADOS.edos, {
                      style : this._stateStyle,
                    }).addTo(this.map);
    },

    renderPointsLayer : function(item){
      console.log(item);
      var that   = this,
          points = this._makeGeojson(item);

      // return;


      this.points = L.geoJson(points, {
        pointToLayer : function(feature, latlng){
          var p = L.circleMarker(latlng, that.settings.mapPoint);
          return p;
        }
      }).addTo(this.map);
    },





    /*
     * F U N C I O N E S   D E   S O P O R T E 
     * ------------------------------------------------------------
     */

    //
    // ESTILO PARA LAS GEOMETRÍAS DE ESTADO
    // ---------------------------------------------
    // regresa una función que asigna el estilo para 
    // las geometrías de estado
    //
    _stateStyle : function(feature){
      // type, geometry, properties
      // brew.getColorInRange(7.5);
      var state   = this.currentData.filter(function(d){
                      return feature.properties.CVE_ENT == d.id
                    })[0],
          data    = state.data,
          current = this.currentMap.config.current.value,
          value   = ! state.data.length ? 0 : _.pluck(data, current).reduce(function(a, b){
                      return Number(a) + Number(b);
                    }, 0);

      return {
        weight      : .4,
        opacity     : 0.1,
        color       : 'black',
        dashArray   : '',
        fillOpacity : 1,
        fillColor   : this.brew.getColorInRange(value) // "#f2f2f2"
      }
    },

    //
    // GEOMETRY/POINT COLOR FUNCTION
    // ---------------------------------------------
    // regresa una función que asigna el color para 
    // las geometrías o puntos
    //
    _colorMixer : function(item){
      var value = item.config.current.value,
          level = item.config.current.level,
          data  = null,
          _data = null,
          brew  = null;

      if(level == "state"){
        data  = this.currentData;
        _data = data.map(function(d){
                  if(d.data.length){
                    return _.pluck(d.data, value).reduce(function(a, b){
                      return Number(a) + Number(b);
                    }, 0);
                  }
                  else{
                    return 0;
                  }
                });
      }
      else if(level == "city"){
      }

      else{

      }
      
      brew = new classyBrew();
      brew.setSeries(_data);
      brew.setNumClasses(7);
      brew.setColorCode("BuGn");
      brew.classify('jenks');

      return brew;
    },

    _agregateDataByState : function(item){

      var state  = item.config.location.state,
          _data  = null;

      this._strToNumber(item.data, state);

      _data = ESTADOSNAME.states.map(function(st){
        var search    = {};
        search[state] = st.id;
        
        return {
          id   : st.id,
          name : st.name,
          url  : st.url,
          data : _.where(item.data, search)
        }

      });

      return _data;
    },

    _strToNumber : function(data, field){
      data.forEach(function(el){
        el[field] = +el[field];
      });
    },

    //
    // TOMA UN ARRAY DE PUNTOS Y LO CONVIERTE A GEOJSON
    // -------------------------------------------------------
    //
    _makeGeojson : function(item){
      console.log(item);

      var geojson = {
                      "features" : null,
                      "type" : "FeatureCollection",
                      "crs"  : {
                                 "type"       : "name",
                                 "properties" : { "name" : "urn:ogc:def:crs:EPSG::4019" }
                                }
                    },
          properties = item.config.data,
          lat        = item.config.location.lat,
          lng        = item.config.location.lng,
          features = item.data.map(function(d){
                       var p = {};
                       properties.forEach(function(property){
                        p[property] = d[property];
                       });

                       return {
                        type : "Feature",
                        properties : p,
                        geometry : {
                          "type": "Point", 
                          "coordinates": [ +d[lng], +d[lat] ]
                        }
                       }
                     });

      geojson.features = features;
      return geojson;
    },

    //
    // ARREGLA EL GEOJSON DE ESTADOS
    // ---------------------------------------------
    // elimina caracteres raros y nombre nuevo en el geojson de estados
    //
    _setStatesGeometry : function(){
      ESTADOS.edos.features.forEach(function(estado){
        estado.properties.CVE_ENT = +estado.properties.CVE_ENT;

        if(estado.properties.CVE_ENT == 31){
          estado.properties.NOM_ENT = "Yucatán";
        }
        if(estado.properties.CVE_ENT == 24){
          estado.properties.NOM_ENT = "San Luis Potosí";
        }
        if(estado.properties.CVE_ENT == 22){
          estado.properties.NOM_ENT = "Querétaro";
        }
        if(estado.properties.CVE_ENT == 19){
          estado.properties.NOM_ENT = "Nuevo León";
        }
        if(estado.properties.CVE_ENT == 16){
          estado.properties.NOM_ENT = "Michoacán";
        }
        if(estado.properties.CVE_ENT == 15){
          estado.properties.NOM_ENT = "México";
        }
        if(estado.properties.CVE_ENT == 9){
          estado.properties.NOM_ENT = "Ciudad de México";
        }
      });

      this.statesGeojson = ESTADOS;
    },



  };

  return GFSHCPMap;
});