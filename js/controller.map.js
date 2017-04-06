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

      // [1] obtiene el archivo de configuración
  var CONFIG      = require("json!config.map.json"),

      // [2] obtiene las librerías necesarias
      d3          = require("d3"),
      leaflet     = require("leaflet"),
      underscore  = require("underscore"),
      classybrew  = require("classyBrew"),

      // [3] obtiene los conjuntos de datos
      // [*] las posibles combinaciones de color de classyBrew
      COLORS         = require("assets/brewer-color-list"),
      // [*] el archivo de geojson de los estados
      ESTADOS        = require("assets/estados-area"),
      // [*] el nombre y clave de cada estado
      ESTADOSNAME    = require("assets/estados-nombres"),
      // [*] el geojson de los municipios
      MUNICIPIOS     = require("assets/municipios"),
      // [*] el nombre y clave de cada municipio
      MUNICIPIOSNAME = require("assets/municipios-nombres");


  /*
   * E L   S I N G L E T O N   D E L   M A P A (main obj)
   * ------------------------------------------------------------
   * Este singleton será la aplicación principal, y se manda a llamar desde
   * /js/main.map.js (en la versión de desarrollo, el objeto se llama GFSHCPMapApp),
   * y se puede acceder desde la consola.
   */
  var GFSHCPMap = {

    //
    // FUNCIÓN DE INICIO
    // ------------------------------
    // cuando el objeto se carga mediante require, es la primera 
    // función que se ejecuta
    //
    initialize : function(){
      // [1] INICIA LAS PROPIEDADES DEL APP 
      //
      // * la referencia a classyBrew
      this.brew         = null;
      // * la referencia al layer de leaflet de ciudades
      this.cities       = null;
      // * la referencia al archivo de configuración principal después de cargar la info
      this.currentData  = null;
      // * la referencia al mapa de configuración seleccionado
      this.currentMap   = null;
      // * la lista de mapas disponibles (archivos de configuración)
      this.layersConfig = [];
      // * el mapa de leaflet
      this.map          = null;
      // * la referencia al layer de leaflet de puntos
      this.points       = null;
      // la referencia al layer de leaflet de estados
      this.states       = null;
      // referencia al archivo de configuración inicial
      this.settings     = Object.create(CONFIG);
      


      // [2] ARRREGLA EL SCOPE DE ALGUNAS FUNCIONES
      //
      this._stateStyle = this._stateStyle.bind(this);
      this._cityStyle  = this._cityStyle.bind(this);

      // [3] ARREGLA EL GEOJSON DE ESTADOS (esto debe desaparecer)
      //
      this._setStatesGeometry();
      
      // [4] INICIA EL MAPA DE LEAFLET
      //
      this.drawMap();

      // [5] CARGA LOS ARCHIVOS DE CONFIGURACIÓN Y DESPLIEGA EL MAPA SELECCIONADO
      //
      this.loadMapsConfig();



      XXXXX = GFCityList.map(function(m){
        return {
          "city": +m.clave,
    "state": +m.state,
    "inegi": Number(m.state.concat(m.clave)),
    "name": m.name
        }
      });

    },

    //
    // DIBUJA EL MAPA PRINCIPAL
    //
    //
    drawMap : function(){
      // [1] inicia el mapa de leaflet con los settings de config.map.json
      //
      this.map = L.map(this.settings.map.div)
                  .setView([this.settings.map.lat, this.settings.map.lng], this.settings.map.zoom);

      // [2] agrega el layer de tiles
      //
      L.tileLayer(this.settings.map.tileServer, this.settings.map.tileServerConfig).addTo(this.map);

      // [3] agrega los demas créditos
      //
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
        
        // crea una referencia para la ruta del archivo de configuración,
        // y del mapa que debe desplegarse al inicio
        var path   = this.settings.maps.basePath + "/" + url,
            active = this.settings.maps.current; 

        // carga el json de configuración
        d3.json(path, function(error, data){
          // genera el elemento que representará al mapa en la app
          var item = {
            src    : path,  // la ruta del archivo
            config : data,  // el contenido del json
            index  : index, // su posición (id)
            data   : null   // aquí se guardarán los datos cargados
          };

          // guarda el mapa en el array de mapas
          that.layersConfig.push(item);

          // si es el seleccionado, lo ejectura
          if(+index === +active){
            that.getLayer(item);
          }
        });
      }, this);
    },

    //
    // OBTIENE LA INFORMACIÓN DEL LAYER SELECCIONADO Y LO DESPLIEGA
    //
    //
    getLayer : function(item){
      var that = this, 
          conf = item.config;

      // [1] carga el archivo con los datos para graficar
      //
      d3[conf.file](conf.src, function(error, data){
        item.data = data;
        that.currentMap = item;
        
        // [2] Dependiendo el tipo de mapa, selecciona el método para desplegar la info
        // 
        // * renderea un mapa a nivel estatal (area)
        if(item.config.current.level == "state"){
          that.currentData = that._agregateDataByState(item);
          that.brew = that._colorMixer(item);
          that.renderStateLayer(item);
        }
        // * renderea un mapa a nivel municipal (area)
        else if(item.config.current.level == "city"){
          that.currentData = that._agregateDataByCity(item);
          that.brew        = that._colorMixer(item);
          that.renderCityLayer(item);
        }
        // * renderea un mapa a nivel latitud y longitud (point)
        else{
          that.currentData = null;
          that.renderPointsLayer(item);
        }

        
      });
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA ESTADOS
    //
    //
    renderStateLayer : function(item){
      this.states = L.geoJson(ESTADOS.edos, {
                      style : this._stateStyle,
                    }).addTo(this.map);
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA CIUDADES
    //
    //
    renderCityLayer : function(item){
      this.cities = L.geoJson(MUNICIPIOS.municipios, {
                      style : this._cityStyle,
                    }).addTo(this.map);
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA PUNTOS
    //
    //
    renderPointsLayer : function(item){
      var that   = this,
          points = this._makeGeojson(item);

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

    _cityStyle : function(feature){
      var city    = this.currentData.filter(function(d){
                      return feature.properties.state == d.state && feature.properties.city == d.city;
                    })[0];
      var data    = city.data, 
          current = this.currentMap.config.current.value,
          value   = ! city.data.length ? 0 : _.pluck(data, current).reduce(function(a, b){
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

      if(level == "state" || level == "city"){
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

    _agregateDataByCity : function(item){
      var state = item.config.location.state,
          city  = item.config.location.city,
          _data = null;

      this._strToNumber(item.data, state);
      this._strToNumber(item.data, city);

      _data = MUNICIPIOSNAME.cities.map(function(ct){
        var search = {};
        
        search[state] = ct.state;
        search[city]  = ct.city;

        return {
          id    : ct.inegi,
          state : ct.state,
          city  : ct.city,
          name  : ct.name,
          //url  : ct.url,
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