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
  var CONFIG      = require("json!config/config.map.json"),

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
      MUNICIPIOSNAME = require("assets/municipios-nombres"),

      // [4] obtiene los templates de UI
      MAPSELECTOR    = require("text!templates/map-selector-panel.html");


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
      // * la referencia a los datos agregados por municipio o estado
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
      // referencia a las colecciones de ubicaciones
      this.lists = {
                     estados        : Object.create(ESTADOS),
                     estadosName    : Object.create(ESTADOSNAME),
                     municipios     : Object.create(MUNICIPIOS),
                     municipiosName : Object.create(MUNICIPIOSNAME)
                   };

      // [1.1] DEFINE SHORTCUTS PARA LOS ELEMENTOS DE UI
      //
      // * El selector de mapas
      this.UImapSelector = null;
      // * El selector del nivel del mapa (estado, municipio)
      this.UIlevelSelector    = null;

      // [2] ARRREGLA EL SCOPE DE ALGUNAS FUNCIONES
      //
      this._stateStyle             = this._stateStyle.bind(this);
      this._cityStyle              = this._cityStyle.bind(this);
      this.renderMapSelectorChange = this.renderMapSelectorChange.bind(this);

      // [3] ARREGLA EL GEOJSON DE ESTADOS (esto debe desaparecer)
      //
      this._setStatesGeometry();
      
      // [4] INICIA EL MAPA DE LEAFLET
      //
      this.drawMap();

      // [5]] INICIA LOS ELEMENTOS DE UI
      // 
      // * el selector de mapa
      this.renderMapSelector();

      // [6] CARGA LOS ARCHIVOS DE CONFIGURACIÓN Y DESPLIEGA EL MAPA SELECCIONADO
      //
      this.loadMapsConfig();
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

          // agrega el mapa al selector de mapas
          that.addMapToMapSelector(item);

          // si es el seleccionado, lo ejectura
          if(+index === +active){
            that.getLayer(item);
            that.updateUILevelSelector(item);
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
        that.renderLayer(item);
      });
    },

    renderLayer : function(item){
      this.cleanLayers();

      this.currentMap   = item;
      this.currentMapId = item.idex;

      if(item.config.current.level == "state"){
          this.currentData = this._agregateDataByState(item);
          this._mapStateGeojson(this.currentData);
          this.brew = this._colorMixer(item);
          this.renderStateLayer(item);
        }
        // * renderea un mapa a nivel municipal (area)
        else if(item.config.current.level == "city"){
          this.currentData = this._agregateDataByCity(item);
          this.brew        = this._colorMixer(item);
          this.renderCityLayer(item);
        }
        // * renderea un mapa a nivel latitud y longitud (point)
        else{
          this.currentData = null;
          this.renderPointsLayer(item);
        }
    },

    cleanLayers : function(){
      if(this.points){
        this.map.removeLayer(this.points)
      }

      if(this.states){
        this.map.removeLayer(this.states)
      }

      if(this.cities){
        this.map.removeLayer(this.cities)
      }
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA ESTADOS
    //
    //
    renderStateLayer : function(item){
      var that = this,
          t    = _.template(item.config.template);
      // [1] genera el layer de geojson estatal
      this.states = L.geoJson(ESTADOS.edos, {
                    // * asigna el estilo. Internamente, genera la función de color,
                    //   lo demás viene del archivo de configuración principal
                      style : this._stateStyle,
                    // * agrega el popup a cada estado
                      onEachFeature : function(feature, layer){
                        layer.bindPopup(t(feature.properties.data));
                        /*
                        layer.on("mouseover", function(e){
                          //console.log(feature, layer, item);
                          layer.bindPopup("hola");
                          // t(feature.properties.data)
                          //L.tooltip(layer);
                            //.setLatLng(latlng)
                            //.setContent(t(feature.properties.data))
                            //.openOn(that.map);
                        });
                        */
                      }
                    // * agrega el layer de estados al mapa
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
          points = this._makeGeojson(item),
          t      = _.template(item.config.template);

      this.points = L.geoJson(points, {
        pointToLayer : function(feature, latlng){
          var p = L.circleMarker(latlng, that.settings.mapPoint);

          p.on("mouseover", function(e){
            L.popup()
                .setLatLng(latlng)
                .setContent(t(feature.properties))
                .openOn(that.map);
          });
          return p;
        }
      }).addTo(this.map);
    },





    /*
     * F U N C I O N E S   D E   M A P E O   D E    D A T O S
     * ------------------------------------------------------------
     */
     _agregateDataByState : function(item){

      var state  = item.config.location.state,
          _data  = null,
          method = item.config.current.method || "sum";

      this._strToNumber(item.data, state);

      _data = this.lists.estadosName.states.map(function(st){
        var search = {},
            data   = null;
        
        search[state] = st.id;
        data          = _.where(item.data, search);
        
        return {
          id    : st.id,
          name  : st.name,
          url   : st.url,
          data  : data,
          value : d3[method](data, function(a){
                    return +a[item.config.current.value]
                  })
        }

      });

      return _data;
    },

    _mapStateGeojson : function(data){
      this.lists.estados.edos.features.forEach(function(state){
        var id = state.properties.CVE_ENT,
            d  = _.find(data, {id : id});

        state.properties.data = d;
      });
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
      var css       = Object.create(this.settings.mapGeometry);
      css.fillColor = this.brew.getColorInRange(feature.properties.data.value);

      return css;
    },

    _cityStyle : function(feature){
      var city    = this.currentData.filter(function(d){
                      return feature.properties.state == d.state && feature.properties.city == d.city;
                    })[0];
      var data    = city.data, 
          current = this.currentMap.config.current.value,
          value   = ! city.data.length ? 0 : _.pluck(data, current).reduce(function(a, b){
                      return Number(a) + Number(b);
                    }, 0),
          css     = Object.create(this.settings.mapGeometry);

      css.fillColor = this.brew.getColorInRange(value);
      return css;
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
        _data = _.pluck(data, "value");
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




    /*
     * F U N C I O N E S   D E   U I   ( P Á N E L E S ) 
     * ------------------------------------------------------------
     */

    //
    // EL PANEL DE SELECTOR DE MAPA
    // ---------------------------------------------
    // genera el HTML y el panel dentro de leaflet para el 
    // selector de mapa
    //
    renderMapSelector : function(){
      var that = this,
          conf = this.settings.ui.mapSelector;

      this.mapSelector = new L.Control({position : conf.position});
      this.mapSelector.onAdd = function(map){
        var html       = document.createElement(conf.container);
        
        html.innerHTML = MAPSELECTOR;
        html.id        = conf.id;
        html.setAttribute("class", conf.class);

        that.UImapSelector   = html.querySelector("select");
        that.UIlevelSelector = html.querySelector("ul");

        that.UImapSelector.addEventListener("change", that.renderMapSelectorChange);

        return html;
      };
      this.mapSelector.addTo(this.map);
    },

    renderMapSelectorChange : function(e){
      //console.log(e.currentTarget.value);
      var value = +e.currentTarget.value,
          item  = this.layersConfig.filter(function(l){
                    return +l.index == value;
                  })[0];

      if(item.data){
        this.renderLayer(item);
      }
      else{
        this.getLayer(item);
      }

      this.updateUILevelSelector(item);
    },

    //
    // EL MENÚ DEL SELECTOR DE MAPAS
    // ---------------------------------------------
    // agrega un mapa al selector de mapas con el siguiente formato:
    // <option value="index">name</option>
    //
    addMapToMapSelector : function(item){
      /*
       var item = {
            src    : path,  // la ruta del archivo
            config : data,  // el contenido del json
            index  : index, // su posición (id)
            data   : null   // aquí se guardarán los datos cargados
          };
      */
      var container = document.getElementById(this.settings.ui.mapSelector.id),
          select    = container.querySelector("select"),
          option    = document.createElement("option");

      option.innerHTML = item.config.name;
      option.value     = item.index;
      select.appendChild(option);
    },

    updateUILevelSelector : function(item){
      var that     = this,
          display  = item.config.type == "area" && item.config.level.length > 1,
          _current = item.config.current.level,
          current  = _current ? this.UIlevelSelector.querySelector("a[data-value='" + _current +"']") : null,
          options  = _current ? Array.prototype.slice.call(this.UIlevelSelector.querySelectorAll("a")) : null;
      
      if(display){
        this.UIlevelSelector.style.display = "block";
        options.forEach(function(opt){opt.classList.remove("selected");});
        current.classList.add("selected");
      }
      else{
        this.UIlevelSelector.style.display = "none";
      }
    },





    // XXXXX ESTO DEBE BORRARSE E INTEGRAR EL GEOJSON FINAL XXXXX
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