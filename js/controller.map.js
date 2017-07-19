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
      // ----------------------------------------------------------------------

      // [2] obtiene las librerías necesarias
      // ----------------------------------------------------------------------
      d3          = require("d3"),
      leaflet     = require("leaflet"),
      underscore  = require("underscore"),
      classybrew  = require("classyBrew"),
      btable      = require("btable"),
      tableExport = require("tableExport"),
      bootstrapTableExport = require("bootstrapTableExport"),
      APIKEY      = "AIzaSyDZXX_dqYAZ9oLxA28sN5ztg3qNBArk80I",
      gMaps       = require("async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDZXX_dqYAZ9oLxA28sN5ztg3qNBArk80I");

      // [3] obtiene los conjuntos de datos
      // ----------------------------------------------------------------------
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
      // [*] el nombre y clave de cada ramo
      RAMOSNAME      = require("assets/ramos-nombres"),
      // [*] el nombre,ramo y clave de cada unidad ejecutora
      UNIDADESNAME   = require("assets/unidades-nombres"),

      /* COSA PARA BORRAR */
      MEXMIN = require("assets/mexmin"),

      // [4] obtiene los templates de UI
      // ----------------------------------------------------------------------
      // [*] el selector de mapa
      MAPSELECTOR    = require("text!templates/map-selector-panel.html"),
      // [*] el selector de filtros
      FILTERSELECTOR = require("text!templates/filter-selector-panel.html"),
      // [*] el selector de filtros
      PAGESELECTOR   = require("text!templates/page-selector-panel.html"),
      // [*] las barras de comparación
      PAGESELECTOR   = require("text!templates/page-selector-panel.html"),  
      // [*] la guía de color
      COLORGUIDE     = require("text!templates/color-band.html"), 

      // [5] carga los componentes de filtros y búsqueda
      // ----------------------------------------------------------------------
      BARSTOOL      = require("bars.maps"), 

      // [6] carga los componentes de filtros y búsqueda
      // ----------------------------------------------------------------------
      SEARCHTOOL     = require("search.maps"), 

      // [7] define las constantes internas del sistema 
      // ----------------------------------------------------------------------
      SELECTALL      = "_____",
      XFILTERCLASS   = "killMePlease",
      CITYID         = "GFSHCPCityId",
      UNITID         = "GFSHCPUnitId";


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
    initialize : function(settings){
      // [0] REVISA EL URL POR ALGUNA CONFIGURACIÓN
      //
      //
      this.initialFilters = this.parseHashBangArgs();
      this.firstTime      = true;

      // [1] INICIA LAS PROPIEDADES DEL APP 
      // ----------------------------------------------------------------------
      // * la referencia a classyBrew
      this.brew           = null;
      // * la referencia a los datos agregados por municipio o estado
      this.currentData    = null;
      // * la referencia a la información para graficar
      this._currentData   = null;
      // * la referencia a los puntos agrupados x ubicación
      this._currentPoints = null;
      // * la referencia al mapa de configuración seleccionado
      this.currentMap     = null;
      // * la lista de filtros para los datos
      this.filters        = [];
      // * la lista de mapas disponibles (archivos de configuración)
      this.layersConfig   = [];
      // * la lista de mapas extra disponibles (archivos de configuración)
      //   los mapas extra son los que se superponen a los principales
      this.extraLayersConfig = [];
      // * el mapa de leaflet
      this.map          = null;
      // * la referencia al layer de leaflet de puntos
      this.points       = null;
      // * la referencia al layer de leaflet de estados
      this.states       = null;
      // * la referencia al layer de leaflet de ciudades
      this.cities        = null;
      // * la referencia al layer de leaflet extra
      this.extra        = null;
      // * la referencia al geocoder;
      this.geocoder     = null;
      // * los callbacks
      this.callbacks    = settings.callbacks;
      // * referencia al archivo de configuración inicial
      this.settings     = Object.create(CONFIG);
      // * referencia a las colecciones de ubicaciones
      this.lists = {
                     estados        : Object.create(ESTADOS),
                     estadosName    : Object.create(ESTADOSNAME),
                     municipios     : Object.create(MUNICIPIOS),
                     municipiosName : Object.create(MUNICIPIOSNAME),
                     ramosName      : Object.create(RAMOSNAME),
                     unidadesName   : Object.create(UNIDADESNAME)
                   };
      // el formato para números
      this.numberFormat = d3.format(",");

      // la función de loader
      this.loaderStart = settings.loaderStart;
      this.loaderStop  = settings.loaderStop;

      // la app de gráficas
      this.barsTool = this.settings.ux.enableBarsTool ? new BARSTOOL(this) : null;

      // la app de búsqueda
      this.searchTool = this.settings.ux.enableSearchTool ? new SEARCHTOOL(this) : null;

      // [1.1] DEFINE SHORTCUTS PARA LOS ELEMENTOS DE UI
      // ----------------------------------------------------------------------
      // * El selector de mapas
      this.UImapSelector    = null;
      // * El selector del nivel del mapa (estado, municipio)
      this.UIlevelSelector  = null;
      // * El selector de filtros
      this.UIfilterSelector = null;
      // * El selector de año
      this.UIyearSelector = null;
      // * El selector de ramo
      this.UIbranchSelector = null;
      // * El selector de estado
      this.UIstateSelector = null;
      // * El selector de ciudad
      this.UIcitySelector = null;
      // * El selector de ejecutor
      this.UIunitSelector = null;
      // * los <select> de los filtros extra
      this.UIextraFiltersSelector = null;

      // [2] ARRREGLA EL SCOPE DE ALGUNAS FUNCIONES
      // ----------------------------------------------------------------------
      this._stateStyle                  = this._stateStyle.bind(this);
      this._stateExtraStyle             = this._stateExtraStyle.bind(this);
      this._cityStyle                   = this._cityStyle.bind(this);
      this._cityExtraStyle              = this._cityStyle.bind(this);
      this._enableFilterChange          = this._enableFilterChange.bind(this);
      this.renderMapSelectorChange      = this.renderMapSelectorChange.bind(this);
      this.renderExtraMapSelectorChange = this.renderExtraMapSelectorChange.bind(this);
      this.updateUILevelSelectorChange  = this.updateUILevelSelectorChange.bind(this);
      this.goToUserLocation             = this.goToUserLocation.bind(this);
      
      // [4] INICIA EL MAPA DE LEAFLET
      // ----------------------------------------------------------------------
      this.drawMap();

      // [5] INICIA LOS ELEMENTOS DE UI
      // ----------------------------------------------------------------------
      // * la búsqueda avanzada
      //this.renderAdvancedSearch();

      // * el selector de mapa
      this.renderMapSelector();

      // * el selector de mapas extra
      this.renderExtraMapSelector();

      // * el selector de filtros
      this.renderFilterSelector();

      // [6] CARGA LOS ARCHIVOS DE CONFIGURACIÓN Y DESPLIEGA EL MAPA SELECCIONADO
      // ----------------------------------------------------------------------
      // * la configuración de los mapas principales
      this.loadMapsConfig();
      // * la configuración de los mapas extra (para comparar)
      this.loadExtraMapsConfig();

      // [7] LA GEOLOCALIZACIÓN
      // ----------------------------------------------------------------------
      // [7.1] HABILITA EL GEOLOCALIZADOR Y LA OBTENCIÓN DE LAS COORDENADAS DEL USUARIO
      this.enableUserLocation();

      // [7.2] HABILITA EL REVERSE GEOCODING
      this.enableReverseGeocofing();
      // var geocoder = new google.maps.Geocoder;

      // [8] LOADER 
      this.loaderStop("ya cargó lo básico");

      // [9] HABILITA EL CALLBACK DE INICIO
      if(this.callbacks && this.callbacks.filterInitialize){
        this.callbacks.filterInitialize(this);
      }
    },





    /*
     * F U N C I O N E S   S O P O R T E
     * ------------------------------------------------------------
     */

    enableReverseGeocofing : function(){
      var geocoder  = new google.maps.Geocoder,
          input     = document.getElementById(this.settings.ui.geolocationField),
          form      = document.getElementById(this.settings.ui.geolocationForm),
          _template = "?address=<%=address%>&key=<%=apikey%>",
          endpoint  = this.settings.ux.geocoding,
          template  = _.template(endpoint + _template),
          url       = null,
          search    = "",
          that      = this;
          // APIKEY;

      form.addEventListener("submit", function(e){
        e.preventDefault();

        search = input.value;

        if(!search) return;

        url = template({address : search, apikey  : APIKEY});

        d3.json(url, function(error, data){
          if(!error && data.status == "OK"){
            var loc    = data.results[0].geometry.location,
                latlng = [loc.lat, loc.lng];

            that.map.setView(latlng, that.settings.ux.findMeZoom);
          }
        });
        // encodeURI
      });

    },

    enableUserLocation : function(){
      var btn  = document.getElementById(this.settings.ui.geolocationBtn),
          that = this;
      btn.addEventListener("click", function(e){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(that.goToUserLocation);
        }
        else{
          alert("función no disponible");
        }
      });
    },

    goToUserLocation : function(position){
      var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
      this.map.setView(latlng, this.settings.ux.findMeZoom);
    },

    /**
     * [https://gist.github.com/miohtama/1570295]
     * Parse hash bang parameters from a URL as key value object.
     * 
     * For repeated parameters the last parameter is effective.
     * 
     * If = syntax is not used the value is set to null.
     * 
     * #x&y=3 -> { x:null, y:3 }
     *
     * @param aURL URL to parse or null if window.location is used
     * 
     * @return Object of key -> value mappings.
     */
    parseHashBangArgs : function(aURL) {
      aURL = aURL || window.location.href;
      var vars = {};
      var hashes = aURL.slice(aURL.indexOf('#') + 1).split('&');

      for(var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');

        if(hash.length > 1) {
           vars[hash[0]] = hash[1];
        } else {
          vars[hash[0]] = null;
        }      
      }
      return vars;
    },

    mixInitialFilters : function(item){

      if(!this.firstTime) return false;

      var filters  = item.config.filters.concat(item.config.extraFilters || []),
          initial  = this.initialFilters,
          defaults;

      filters.forEach(function(filter){
        if(initial[filter.field]){
          filter.default = +initial[filter.field] || initial[filter.field];
        }
      }, this);


      defaults = filters.filter(function(filter){
        return filter.hasOwnProperty("default");
      });

      this.filters = defaults.map(function(filter){
        return {
          field : filter.field,
          value : filter.default
        }
      });

      /*
      this.initialFilters = this.parseHashBangArgs();
      this.firstTime      = true;
      */

      //console.log(this.initialFilters, this.firstTime, item.config, this.filters);

      this.firstTime = false;

      return true;
    },





    /*
     * F U N C I O N E S   D E   D I B U J O   D E   I T E M S
     * ------------------------------------------------------------
     */

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
    // RENDEREA EL MAPA SELECCIONADO (item)
    //
    //
    renderLayer : function(item, keepFilters){

      // [0] mezcla los filtros iniciales
      var isFirstTime = this.mixInitialFilters(item);

      // [1] elimina el layer anterior
      //
      this.cleanLayers();

      // [2] actualiza las referencia internas
      //
      // * la lista de filtros
      this.filters = keepFilters || isFirstTime ? this.filters : [];
      // * el mapa desplegado
      this.currentMap   = item;
      // * el id interno del mapa desplegado
      this.currentMapId = item.idex;
      // * la colección de datos seleccionados (los datos sin ser covertidos a geojson)
      this._currentData = this._filterData(item);


      // [3] despliega el mapa según el tipo
      //
      // A) Es un mapa de área por estado
      if(item.config.current.level == "state"){
        this.currentData = this._agregateDataByState(item, this._currentData);
        var xxxxx = this._mapStateGeojson(this.currentData);
        this.brew = this._colorMixer(item, this.currentData);
        this.renderStateLayer(item, "states", xxxxx, this._stateStyle);
      }
      // B) Es un mapa de área por municipio
      else if(item.config.current.level == "city"){
        this.currentData = this._agregateDataByCity(item, this._currentData);
        var xxxxx = this._mapCityGeojson(this.currentData);
        this.brew        = this._colorMixer(item, this.currentData);
        this.renderCityLayer(item, "cities", xxxxx, this._cityStyle);
      }
      // C) Es un mapa de puntos definidos por latitud y longitud
      else{
        this.currentData = null;
        // filtra los puntos que no tienen localización
        this._currentData = ! this.currentMap.config.disable ? this._currentData : this._currentData.filter(function(d){
          return d[this.currentMap.config.location.lat] != this.currentMap.config.disable[0] && d[this.currentMap.config.location.lng] != this.currentMap.config.disable[1];
        }, this);

        // agrupa
        if(this.currentMap.config.multiple){
          this._currentPoints = this.groupPoints();
        }


        this.renderPointsLayer(item);
        if(item.config.api){
          this.updatePagination();
        }
      }

      // [4] Actualiza el panel de filtros si es un mapa nuevo
      //
      if(!keepFilters){
        this.enableFilters(item);
      }

      // [5] Actualiza las opciones de UI
      //
      this.updateUIOptions(item);

      // [6] Activa las barras de comparación
      //
      //this.enableBarsTool(item);

      // [7] Activa la tabla de comparación
      //
      /*
      if(!keepFilters){
        this.enableTableTool(item);
      }
      */

      // [8] Actualiza el contador de proyectos
      //
      this.renderProjectCounter(this._currentData);

      // [9] Actualiza la guía de color
      //
      this.renderColorGuide();

      // [10] Actualiza el texto para el embed
      this.updateEmbed();

      // [11] Activa el callback de cambio
      if(this.callbacks && this.callbacks.filterChange){
        // filters, data, currentData
        this.callbacks.filterChange(this.filters, this.currentMap, this._currentData);
      }

      // [12] Actualiza la app de comparación
      if(this.barsTool){
        this.barsTool.render();
      }
      else{
        console.log("no bars tool");
      }

      if(this.searchTool){
        this.searchTool.render();
      }
      else{
        console.log("no search tool");
      }
    },

    groupPoints : function(){
      var finalData = [],
          colector  = [],
          lat = this.currentMap.config.location.lat,
          lng = this.currentMap.config.location.lng,
          initialData = this._currentData.slice(0);

      initialData.forEach(function(d){

        var search      = {},
            result      = null;

        search[lat] = d[lat];
        search[lng] = d[lng];

        if(colector.indexOf(d) != -1) return;

        result = _.where(initialData, search);

        finalData.push(result);

        result.forEach(function(r){
          colector.push(r);
        });
      });

      return finalData;
    },

    updateUIOptions : function(item){
      var type   = item.config.type, 
          _geo   = this.settings.ui.mapSelector.geolocationId,
           geo   = document.getElementById(_geo),
          _level = this.settings.ui.mapSelector.levelId;
           level = document.getElementById(_level);

      // clear filters

      if(type == "point"){
        // hide area level selector
        level.style.display= "none";
        // show geocoding
        geo.style.display= "block";
      }
      else{
        // show area level selector
        level.style.display= "block";
        // hide geocoding
        geo.style.display= "none";
      }
    },

    //
    // RENDEREA EL MAPA EXTRA SELECCIONADO
    //
    //
    renderExtraLayer : function(item){

      /*
       SOLUCIÓN :

       layer.bringToFront
       layer.bringToBack

      */

      
      // [1] elimina el layer anterior
      //
      this.cleanExtraLayer();

      // [2] actualiza las referencia internas
      //
      // * el mapa desplegado
      this.currentExtraMap   = item;
      // * el id interno del mapa desplegado
      this.currentExtraMapId = item.idex;

      // [3] despliega el mapa según el tipo
      //
      // A) Es un mapa de área por estado
      if(item.config.current.level == "state"){
        this.currentExtraData = this._agregateDataByState(item, item.data);
        //this._mapStateGeojson(this.currentExtraData);
        var xxxxx = this._mapStateGeojson(this.currentExtraData);
        this.extraBrew = this._colorMixer(item, this.currentExtraData);
        this.renderStateLayer(item, "extra", xxxxx, this._stateExtraStyle);
      }
      
      // B) Es un mapa de área por municipio
      else if(item.config.current.level == "city"){
        this.currentExtraData = this._agregateDataByCity(item, item.data);
        var xxxxx = this._mapCityGeojson(this.currentExtraData);
        this.extraBrew        = this._colorMixer(item, this.currentExtraData);
        this.renderCityLayer(item, "extra", xxxxx, this._cityExtraStyle);
      }
      /*
      // C) Es un mapa de puntos definidos por latitud y longitud
      else{
        this.currentData = null;
        this.renderPointsLayer(item);
        if(item.config.api){
          this.updatePagination();
        }
      }*/

      this.sortLayers();

    },

    sortLayers : function(){
      var currentLayer = this.points || this.states || this.cities,
          currentMap   = this.currentMap,
          currentType  = currentMap.config.type,
          extraMapType = this.currentExtraMap.config.type;

      if(extraMapType == "area" && currentType == "point"){
        // layer.bringToFront
        currentLayer.bringToFront();
      }
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA ESTADOS
    //
    //
    renderStateLayer : function(item, container, geojson, style){
      // [0] genera un referencia a la app
      var that = this,
      // [1] genera el template del popup
          t    = _.template(item.config.template);
      // [2] genera el layer de geojson estatal
      this[container] = L.geoJson(geojson, {
                    // * asigna el estilo. Internamente, genera la función de color,
                    //   lo demás viene del archivo de configuración principal
                      style : style,
                    // * agrega el popup a cada estado
                      onEachFeature : function(feature, layer){
                        layer.bindPopup(t(feature.properties.data));
                      }
                    // * agrega el layer de estados al mapa
                    }).addTo(this.map);
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA CIUDADES
    //
    //

    /*
    renderStateLayer : function(item, container, geojson, style){
      if(item.config.current.level == "state"){
        this.currentData = this._agregateDataByState(item, this._currentData);
        var xxxxx = this._mapStateGeojson(this.currentData);
        this.brew = this._colorMixer(item, this.currentData);
        this.renderStateLayer(item, "states", xxxxx, this._stateStyle);
      }
    */
    renderCityLayer : function(item, container, geojson, style){
      var that = this,
          t    = _.template(item.config.template);

      this[container] = L.geoJson(geojson/*MUNICIPIOS.municipios*/, {
                      style : style,//this._cityStyle,
                      onEachFeature : function(feature, layer){
                        layer.bindPopup(t(feature.properties.data));
                      }
                    }).addTo(this.map);
    },

    //
    // DIBUJA EL LAYER SELECCIONADO PARA PUNTOS
    //
    //
    renderPointsLayer : function(item){

      var that   = this,
          points = this._makeGeojson(item),
          t         = _.template(item.config.template),
          style     = that.settings.mapPoint,
          _style    = item.config.style,
          link      = item.config.link,
          navt      = this.settings.ux.pointNavigationTemplate,
          prevId    = this.settings.ux.pointNavigationPrevId,
          nextId    = this.settings.ux.pointNavigationNextId,
          currentId = this.settings.ux.pointNavigationCurrentId,
          totalId   = this.settings.ux.pointNavigationTotalId;

      if(_style){
        for(var prop in _style){
          if(_style.hasOwnProperty(prop)){
            style[prop] = _style[prop];
          }
        }
      }

      this.points = L.geoJson(points, {
        pointToLayer : function(feature, latlng){
          var p     = L.circleMarker(latlng, that.settings.mapPoint),
              props = feature.properties;

          //that.currentMap.config.values
          
          for(var key in props){
            if(props.hasOwnProperty(key)){
              props[key] = that.currentMap.config.values.indexOf(key) != -1 ? that.numberFormat(props[key]) : props[key];
            }
          }
          

          p.on("mouseover", function(e){

            var multiple  = that.currentMap.config.multiple,
                pointer   = 0,
                content   = null,
                items     = [],
                div       = document.createElement("div"),
                container = document.createElement("div"),
                p         = document.createElement("p"),
                current   = null,
                total     = null;

            if(multiple){
              content = "";
              feature.properties.points.forEach(function(point){
                //content += t(point);
                items.push(t(point));
              });

              div.innerHTML = items[0];
              container.appendChild(div);

              if(items.length > 1){
                p.innerHTML = navt;
                current = p.querySelector("." + currentId);
                total   = p.querySelector("." + totalId);

                total.innerHTML   = items.length;
                current.innerHTML = 1;
                container.appendChild(p);

                p.querySelector("." + prevId).addEventListener("click", function(e){
                  e.preventDefault();
                  if(pointer){
                    pointer--;
                    div.innerHTML = items[pointer];
                  }
                  else{
                    pointer = items.length - 1;
                    div.innerHTML = items[pointer];
                    
                  }

                  current.innerHTML = pointer + 1;
                });

                p.querySelector("." + nextId).addEventListener("click", function(e){
                  e.preventDefault();
                  if(pointer < items.length - 1){
                    pointer++;
                    div.innerHTML = items[pointer];
                  }
                  else{
                    pointer = 0;
                    div.innerHTML = items[pointer];
                  }

                  current.innerHTML = pointer + 1;
                });
              }

              content = container;
            }
            else{
              content = t(feature.properties);
            }
            
            L.popup()
                .setLatLng(latlng)
                .setContent(content)
                .openOn(that.map);
                
          });

          if(link){
            p.on("click", function(e){
              window.open(link.url + "#" + feature.properties[link.column]);
            });
          }
          return p;
        }
      }).addTo(this.map);
    },

    //
    // ELIMINA LOS LAYERS DEL MAPA
    //
    //
    cleanLayers : function(){
      if(this.points){
        this.map.removeLayer(this.points);
      }

      if(this.states){
        this.map.removeLayer(this.states);
      }

      if(this.cities){
        this.map.removeLayer(this.cities);
      }

      if(this.extra){
        this.cleanExtraLayer();
      }
    },

    //
    // ELIMINA EL LAYER EXTRA DEL MAPA
    //
    //
    cleanExtraLayer : function(){
      if(this.extra){
        this.map.removeLayer(this.extra);
      }
      else{
      }
    },






    /*
     * F U N C I O N E S   D E   C A R G A   D E   D A T O S
     * ------------------------------------------------------------
     */

    //
    // CARGA LA CONFIGUACIÓN DE LOS MAPAS
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
          that.addMapToMapSelector(item, active);

          // si es el seleccionado, lo ejectura
          if(+index === +active){
            that.getLayer(item);
            that.updateUILevelSelector(item);
          }
        });
      }, this);
    },

    //
    // CARGA LA CONFIGUACIÓN DE LOS MAPAS EXTRA
    //
    //
    loadExtraMapsConfig : function(){
      var that = this;

      // carga el json de cada mapa, y si es el mapa seleccionado, 
      // genera unlayer con la información
      this.settings.maps.extras.forEach(function(url, index){
        
        // crea una referencia para la ruta del archivo de configuración,
        // y del mapa que debe desplegarse al inicio
        var path   = this.settings.maps.basePath + "/" + url;

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
          that.extraLayersConfig.push(item);

          // agrega el mapa al selector de mapas
          that.addExtraMapToExtraMapSelector(item);

          // si es el seleccionado, lo ejectura
          /*
          if(+index === +active){
            that.getLayer(item);
            that.updateUILevelSelector(item);
          }
          */
        });
      }, this);
    },

    //
    // OBTIENE LA INFORMACIÓN DEL MAPA SELECCIONADO
    //
    //
    getLayer : function(item){
      
      this.loaderStart("voy a cargar un mapa");
      
      var that    = this, 
          conf    = item.config,
          src     = conf.src,
          hasCity = null,
          hasUnit = null;

      // [1] Si es un api la fuente, actualiza el url
      //
      if(conf.api && conf.type == "area"){
        src = src + "/" + conf.current.level + "/" + conf.current.value
      }

      else if(conf.api && conf.type == "point"){
        src = src + "/" + "1";
      }

      // [2] carga el archivo con los datos para graficar
      //
      d3[conf.file](src, function(error, data){
        if(conf.api && conf.type == "point"){
          item.data     = data.results;
          item.response = data;
        }
        else{
          item.data     = data;
          item.response = null;
        }

        // CITYID
        // UNITID
        console.log(item);

        that.renderLayer(item);

        that.loaderStop("ya cargó el mapa");
      });
    },

    //
    // OBTIENE LA INFORMACIÓN DEL MAPA EXTRA SELECCIONADO
    //
    //
    getExtraLayer : function(item){
      var that = this, 
          conf = item.config,
          src  = conf.src;

      // [1] carga el archivo con los datos para graficar
      //
      d3[conf.file](src, function(error, data){
        item.data     = data;
        item.response = null;
        that.renderExtraLayer(item);
      });
    },

    





    /*
     * F U N C I O N E S   D E   M A P E O   D E    D A T O S
     * ------------------------------------------------------------
     */

    //
    // REGRESA LA INFORMACIÓN AGREGADA POR ESTADO
    //
    //
     _agregateDataByState : function(item, currentData){

      var state  = item.config.location.state,
          _data  = null,
          method = item.config.current.method || "sum";

      this._strToNumber(currentData, state);
      //this._strToNumber(item.data, state);

      _data = this.lists.estadosName.states.map(function(st){
        var search = {},
            data   = null,
            value  = null;
        
        search[state] = st.id;
        data          = _.where(currentData, search);
        
        if(method != "length"){
          value = d3[method](data, function(a){
            return +a[item.config.current.value];
          });
        }
        else{
          value = data.length;
        }

        return {
          id    : st.id,
          name  : st.name,
          url   : st.url,
          data  : data,
          value : value
        }

      }, this);

      return _data;
    },

    //
    // REGRESA LA INFORMACIÓN AGREGADA POR MUNICIPIO
    //
    //
    _agregateDataByCity : function(item, currentData){
      var state  = item.config.location.state,
          city   = item.config.location.city,
          method = item.config.current.method || "sum";
          _data  = null;

      this._strToNumber(currentData, state);
      this._strToNumber(currentData, city);

      _data = MUNICIPIOSNAME.cities.map(function(ct){
        var search = {},
            data   = null,
            value  = null;
        
        search[state] = ct.state;
        search[city]  = ct.city;

        data = _.where(currentData, search);

        if(method != "length"){
          value = d3[method](data, function(a){
                    return +a[item.config.current.value]
                  });
        }
        else{
          value = data.length;
        }

        return {
          id    : ct.inegi,
          state : ct.state,
          city  : ct.city,
          name  : ct.name,
          //url  : ct.url,
          data  : data,
          value : value
        }
      }, this);

      return _data;
    },

    _mapStateGeojson : function(data){

      var geoJSON = Object.create(this.lists.estados.edos);
      
      geoJSON.features.forEach(function(state){
        var id = state.properties.CVE_ENT,
            d  = _.find(data, {id : id});

        state.properties.data = d;
      });

      return geoJSON;
      /*
      this.lists.estados.edos.features.forEach(function(state){
        var id = state.properties.CVE_ENT,
            d  = _.find(data, {id : id});

        state.properties.data = d;
      });
      */
    },

    _mapCityGeojson : function(data){
      var copy = Object.create(this.lists.municipios.municipios);
      //this.lists.municipios.municipios
      copy.features.forEach(function(city){
        var id  = city.properties.city,
            state = city.properties.state,
            d  = _.find(data, {city : id, state : state});

        city.properties.data = d;
      });

      return copy;
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
          properties = _.uniq(item.config.data.concat(item.config.values || [])),
          lat        = item.config.location.lat,
          lng        = item.config.location.lng,
          multiple   = item.config.multiple,
          features   = null;
          

      if(multiple){
        //this._currentPoints
        features = this._currentPoints.map(function(d){
          var p    = {};
          p.points = d;

          return {
            type : "Feature",
            properties : p,
            geometry : {
              "type": "Point", 
              "coordinates": [ +d[0][lng], +d[0][lat] ]
            }
          }
        });
      }
      else{
        features = this._currentData.map(function(d){
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
      }

      geojson.features = features;

      return geojson;
    },

    _filterData : function(item){
      var filter          = {},
          filterContainer = document.getElementById(this.settings.ui.filterSelector.id),
          data            = null;

      if(item.config.api || !this.filters.length){
        data = item.data;
      }

      else{
        this.filters.forEach(function(fil){
          if(fil.value !== SELECTALL){
            filter[fil.field] = fil.value;
          }
        }, this);

        data = _.where(item.data, filter);
      }

      return data;
     },

     _strToNumber : function(data, field){

      data.forEach(function(el){
        el[field] = +el[field];
      });
    }, 





    /*
     * F U N C I O N E S   D E   U I   ( P Á N E L E S ) 
     * ------------------------------------------------------------
     */

    updateEmbed : function(){
      var id      = this.settings.ui.embedForm,
          path    = this.settings.maps.embedPath,
          form    = document.getElementById(id),
          input   = form.querySelector("input"),
          iframe  = document.createElement("iframe"),
          filters = this.filters,
          url; 

      if(filters.length){
        url = filters.map(function(filter){
          return filter.field + "=" + filter.value;
        });

        url = url.join("&");
      }
      else{
        url = "";
      }

      form.addEventListener("submit", function(e){e.preventDefault()});

      iframe.src = path + "#" + url;

      input.value = iframe.outerHTML;
    },


    // LA GUÍA DE COLOR
    //
    //
    //
    renderColorGuide : function(){
      var id   = this.settings.ui.colorGuide,
          type = this.currentMap.config.type,
          el   = document.getElementById(id),
          ul   = document.createElement("ul"),
          li   = _.template(COLORGUIDE),
          grades = this.brew ? this.brew.getBreaks() : null,
          colors = this.brew ? this.brew.getColors() : null;


      if(type != "area"){
        el.innerHTML     = "";
        el.style.display = "none";
        return;
      }

      el.innerHTML     = "";
      el.style.display = "block";

      colors.forEach(function(color, i){
        var from = this.numberFormat(grades[i]),
            to   = this.numberFormat(grades[i+1])
            data = {
              from  : from,
              to    : to,
              color : color
            },
            _li = document.createElement("li");
        
        _li.innerHTML = li(data);

        ul.appendChild(_li);
      }, this);

      el.appendChild(ul);
    },

    //
    // EL PANEL DE SELECTOR DE MAPA
    // ---------------------------------------------
    // genera el HTML y el panel dentro de leaflet para el 
    // selector de mapa
    //
    renderMapSelector : function(){
      var that = this,
          conf = this.settings.ui.mapSelector,
          div  = document.getElementById(this.settings.ui.topToolsDiv),
          html = document.createElement(conf.container);
        
      html.innerHTML = MAPSELECTOR;
      html.id        = conf.id;
      html.setAttribute("class", conf.class);

      this.UImapSelector   = html.querySelector("select");
      this.UIlevelSelector = html.querySelector("ul");

      this.UImapSelector.addEventListener("change", this.renderMapSelectorChange);

      Array.prototype.slice.call(this.UIlevelSelector.querySelectorAll("a")).forEach(function(el){
        el.addEventListener("click", this.updateUILevelSelectorChange);
      }, this);

      div.appendChild(html);
    },

    //
    // EL PANEL DE SELECTOR DE MAPA EXTRA
    // ---------------------------------------------
    // genera la lista de mapas extras para desplegar, y agrega el listener 
    // para cuando cambia el select
    //
    renderExtraMapSelector : function(){
      var div     = document.getElementById(this.settings.ui.extraMapSelector),
          select  = div.querySelector("select"),
          optNone = document.createElement("option");

      optNone.value    = SELECTALL;
      optNone.innerHTML = "ninguno";
      
      select.appendChild(optNone);

      this.UIextraFiltersSelector = select;

      this.UIextraFiltersSelector.addEventListener("change", this.renderExtraMapSelectorChange);
    },

    //
    // EL MENÚ DEL SELECTOR DE MAPAS
    // ---------------------------------------------
    // agrega un mapa al selector de mapas con el siguiente formato:
    // <option value="index">name</option>
    //
    addMapToMapSelector : function(item, active){
      var container = document.getElementById(this.settings.ui.mapSelector.id),
          select    = container.querySelector("select"),
          option    = document.createElement("option");

      option.innerHTML = item.config.name;
      option.value     = item.index;
      if(+item.index === +active){
        option.selected = true;
      }
      select.appendChild(option);
    },

    addExtraMapToExtraMapSelector : function(item){
      var div    = document.getElementById(this.settings.ui.extraMapSelector),
          select = div.querySelector("select"),
          option = document.createElement("option");
      
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

    renderProjectCounter : function(data){
      var id    = this.settings.ui.projectCounter,
          el    = document.getElementById(id),
          total = data.length;

      el.innerHTML = total ? total : 0;
    },

    renderFilterSelector : function(){
      // FILTERSELECTOR
      var that = this,
          conf = this.settings.ui.filterSelector,
          div  = document.getElementById(this.settings.ui.topToolsDiv),
          html = document.createElement(conf.container);

      html.innerHTML = FILTERSELECTOR;
      html.id        = conf.id;
      html.setAttribute("class", conf.class);

      this.UIyearSelector   = html.querySelector("#" + conf.selectors.filtersContainers.yearContainer);
      this.UIstateSelector  = html.querySelector("#" + conf.selectors.filtersContainers.stateContainer);
      this.UIcitySelector   = html.querySelector("#" + conf.selectors.filtersContainers.cityContainer);
      this.UIunitSelector   = html.querySelector("#" + conf.selectors.filtersContainers.unitContainer);
      this.UIbranchSelector = html.querySelector("#" + conf.selectors.filtersContainers.branchContainer);
      this.UIextraFiltersSelector = html.querySelector("#" + conf.selectors.extraFiltersId);

      div.appendChild(html);
    },

    enableFilters : function(item){
      this._disableExtraFilters();

      var that     = this,
          conf     = this.settings.ui.filterSelector,
          _filters = conf.selectors.filtersContainers,
          filters  = item.config.filters,
          xfilters = item.config.extraFilters,
          _state   = filters ? filters.filter(function(filter){return filter.type == "state"})[0] : null,
          _city    = filters ? filters.filter(function(filter){return filter.type == "city"})[0] : null,
          _branch  = filters ? filters.filter(function(filter){return filter.type == "branch"})[0] : null,
          _unit    = filters ? filters.filter(function(filter){return filter.type == "unit"})[0] : null,
          _year    = filters ? filters.filter(function(filter){return filter.type == "year"})[0] :null,
          _extras  = xfilters || [];
      // remove filters 
  
      if(_year){
        this._enableYearFilter(item, _year);
        this.UIyearSelector.style.display = "block";
      }
      else{
        this.UIyearSelector.querySelector("select").removeEventListener("change", this._enableFilterChange);
        this.UIyearSelector.style.display = "none";
      }

      if(_state){
        this._enableStateFilter(item, _state);
        this.UIstateSelector.style.display = "block";
      }
      else{
        this.UIstateSelector.querySelector("select").removeEventListener("change", this._enableFilterChange);
        this.UIstateSelector.style.display = "none";
      }

      // IF CITY
      if(_city && _state){
        this._enableCityFilter(item, _state, _city);
        this.UIcitySelector.style.display = "block";
      }
      else{
        this.UIcitySelector.querySelector("select").removeEventListener("change", this._enableFilterChange);
        this.UIcitySelector.style.display = "none";
      }


      if(_branch){
        this._enableBranchFilter(item, _branch);
        this.UIbranchSelector.style.display = "block";
      }
      else{
        this.UIbranchSelector.querySelector("select").removeEventListener("change", this._enableFilterChange);
        this.UIbranchSelector.style.display = "none";
      }

      // IF UNIT
      if(_unit){
        this._enableUnitFilter(item, _branch, _unit);
        this.UIunitSelector.style.display = "block";
      }
      else{
        this.UIunitSelector.querySelector("select").removeEventListener("change", this._enableFilterChange);
        this.UIunitSelector.style.display = "none";
      }

      if(_extras){
        _extras.forEach(function(fil){
          this._enableExtraFilter(item, fil);
        }, this);
      }
    },

    _disableExtraFilters : function(){
      var extras = document.querySelectorAll("." + XFILTERCLASS);

      Array.prototype.slice.call(extras).forEach(function(el){
        el.parentNode.removeChild(el);
      });
    },

    _enableExtraFilter : function(item, filter){
      var p       = document.createElement("p"),
          label   = document.createElement("label"),
          select  = document.createElement("select"),
          optAll  = document.createElement("option"),
          pid     = XFILTERCLASS  + _.uniqueId("-pid-"),
          options = _.uniq(_.pluck(this._currentData, filter.field));
      
      p.id = pid;
      p.classList.add(XFILTERCLASS);
      label.innerHTML = filter.title;
      optAll.value     = SELECTALL;
      optAll.innerHTML = "todos";

      select.setAttribute("name", XFILTERCLASS + pid + "-name");

      select.appendChild(optAll);
      p.appendChild(label);
      p.appendChild(select);

      options.forEach(function(opt){
        var option = document.createElement("option");
        option.value = opt;
        option.innerHTML = opt;
        select.appendChild(option);
      }, this);

      this.UIextraFiltersSelector.appendChild(p);

      select.setAttribute("data-field", filter.field);
      select.addEventListener("change", this._enableFilterChange);
    },

    _enableYearFilter : function(item, year){
      var _data = item.data,
           data = _.uniq(_.pluck(item.data, year.field))
                   .map(function(y){return +y})
                   .sort(function(a, b){return a - b}),
          selector = this.UIyearSelector.querySelector("select"),
          _default = year.default;

      selector.innerHTML = "";
      selector.setAttribute("data-field", year.field);
      selector.removeEventListener("change", this._enableFilterChange);

      var optAll = document.createElement("option");
      optAll.value     = SELECTALL;
      optAll.innerHTML = "todos";
      selector.appendChild(optAll);

      data.forEach(function(y){
        var opt = document.createElement("option");

        opt.value     = y;
        opt.innerHTML = y;

        if(_default == y){
          opt.selected = true;
        }

        selector.appendChild(opt);
      }, this);

      selector.addEventListener("change", this._enableFilterChange);
    },

    _enableStateFilter : function(item, state){
      var /*_data    = _.uniq(_.pluck(item.data, state.field))
                      .map(function(y){return +y})
                      .sort(function(a, b){return a - b}),*/
          data         = Object.create(ESTADOSNAME),
          selector     = this.UIstateSelector.querySelector("select"),
          citySelector = this.UIcitySelector.querySelector("select"),
          optAll       = null,
          _default     = state.default;

      selector.innerHTML = "";
      selector.setAttribute("data-field", state.field);
      selector.removeEventListener("change", this._enableFilterChange);

      optAll           = document.createElement("option");
      optAll.value     = SELECTALL;
      optAll.innerHTML = "todos";
      selector.appendChild(optAll);

      data.states.forEach(function(y){
        var opt = document.createElement("option");

        opt.value     = y.id;
        opt.innerHTML = y.name;

        if(_default == y.id){
          opt.selected = true;
        }

        selector.appendChild(opt);
      }, this);

      selector.addEventListener("change", this._enableFilterChange);
    },
    // this._enableCityFilter(item, _state, _city);
    _enableCityFilter : function(item, state, city){
      var data = Object.create(MUNICIPIOSNAME),
          selector      = this.UIcitySelector.querySelector("select"),
          stateSelector = this.UIstateSelector.querySelector("select"),
          optAll        = null,
          cities;

      selector.innerHTML = "";
      selector.setAttribute("data-field", city.field);
      selector.removeEventListener("change", this._enableFilterChange);

      optAll           = document.createElement("option");
      optAll.value     = SELECTALL;
      optAll.innerHTML = "todas";
      selector.appendChild(optAll);

      if(stateSelector.value != SELECTALL){
        cities = data.cities.filter(function(city){
          return city.state == +stateSelector.value;
        });

        cities.forEach(function(c){
          var opt = document.createElement("option");

          opt.value     = c.city;
          opt.innerHTML = c.name;

          selector.appendChild(opt);
        }, this);
      }

      selector.addEventListener("change", this._enableFilterChange);
    },

    _enableBranchFilter : function(item, branch){
      var /*_data    = _.uniq(_.pluck(item.data, branch.field))
                      .map(function(y){return +y})
                      .sort(function(a, b){return a - b}),*/
          data     = Object.create(RAMOSNAME),
          selector = this.UIbranchSelector.querySelector("select"),
          optAll   = null,
          _default = branch.default;

      selector.innerHTML = "";
      selector.setAttribute("data-field", branch.field);
      selector.removeEventListener("change", this._enableFilterChange);

      optAll           = document.createElement("option");
      optAll.value     = SELECTALL;
      optAll.innerHTML = "todos";
      selector.appendChild(optAll);

      data.branches.forEach(function(y){
        var opt = document.createElement("option");

        opt.value     = y.id;
        opt.innerHTML = y.name;

        if(_default == y.id){
          opt.selected = true;
        }

        selector.appendChild(opt);
      }, this);

      selector.addEventListener("change", this._enableFilterChange);
    },

    _enableUnitFilter : function(item, branch, unit){
      var data           = Object.create(UNIDADESNAME),
          selector       = this.UIunitSelector.querySelector("select"),
          branchSelector = this.UIbranchSelector.querySelector("select"),
          optAll         = null,
          units;


      selector.innerHTML = "";
      selector.setAttribute("data-field", unit.field);
      selector.removeEventListener("change", this._enableFilterChange);

      optAll           = document.createElement("option");
      optAll.value     = SELECTALL;
      optAll.innerHTML = "todos";
      selector.appendChild(optAll);

      if(branchSelector.value != SELECTALL){
        units = data.units.filter(function(unit){
          return +unit.branch == +branchSelector.value;
        });

        units.forEach(function(c){
          var opt = document.createElement("option");

          opt.value     = c.id;
          opt.innerHTML = c.name;

          selector.appendChild(opt);
        }, this);
      }

      selector.addEventListener("change", this._enableFilterChange);
    },

    _enableFilterChange : function(e){
      var val          = e.currentTarget.value,
          field        = e.currentTarget.getAttribute("data-field"),
          current      = this.filters.filter(function(el){ return el.field == field })[0],
          _current     = this.currentMap.config.filters.filter(function(el){return el.field == field })[0],
          stateFilter  = this.currentMap.config.filters.filter(function(fil){ return fil.type == "state"})[0],
          cityFilter   = this.currentMap.config.filters.filter(function(fil){ return fil.type == "city"})[0],
          branchFilter = this.currentMap.config.filters.filter(function(fil){ return fil.type == "branch"})[0],
          unitFilter   = this.currentMap.config.filters.filter(function(fil){ return fil.type == "unit"})[0],
          currentCity  = null,
          stateZoom    = this.settings.ux.changeStateZoom,
          stateName    = null,
          cityName     = null;


      if(
        (stateFilter && stateFilter.field == field) ||
        (branchFilter && branchFilter.field == field) ||
        (cityFilter && cityFilter.field == field)
      ){
        val = val == SELECTALL ? val : +val;
      }

      if(_current.type == "state" && val != SELECTALL){

        stateName = this.lists.estadosName.states.filter(function(st){
          return +st.id == +val;
        })[0];
        console.log(stateName, val);
        this.map.setView(new L.LatLng(stateName.lat, stateName.lng), stateZoom);
      }

      if(stateFilter && stateFilter.field == field && cityFilter){
        this._enableCityFilter(null, stateFilter, cityFilter);
        currentCity = this.filters.filter(function(el){ return el.field == cityFilter.field })[0];
        this.filters.splice(this.filters.indexOf(currentCity), 1);
      }

      if(branchFilter && branchFilter.field == field && unitFilter){
        this._enableUnitFilter(null, branchFilter, unitFilter);
        currentUnit = this.filters.filter(function(el){ return el.field == unitFilter.field })[0];
        this.filters.splice(this.filters.indexOf(currentUnit), 1);
      }

      if(current){
        this.filters.splice(this.filters.indexOf(current), 1);
      }
      else{

      }

      this.filters.push({
        field : field,
        value : val
      });

      this.renderLayer(this.currentMap, true);
      //this._currentData = this._filterData(this.currentMap);
    },

    updatePagination : function(){
      var map     = this.currentMap,
          res     = map.response,
          conf    = this.settings.ui.pageSelector,
          id      = conf.id,
          _id     = this.settings.ui.topToolsDiv,
          el      = document.getElementById(id),
          panel   = document.getElementById(_id),
          page    = res.page,
          total   = res.pages,
          pageEl  = null,
          totalEl = null,
          next    = null,
          prev    = null;


      if(!el){
        el    = document.createElement(conf.container);
        el.id = id;
        el.innerHTML = PAGESELECTOR;
        panel.appendChild(el);
      }
      else{
        //
      }
 
      pageEl  = document.getElementById(conf.controls.pageSelect);
      totalEl = document.getElementById(conf.controls.pageDisplay);
      next    = document.getElementById(conf.controls.nextPageBtn);
      prev    = document.getElementById(conf.controls.prevPageBtn);

      pageEl.value = page;
      totalEl.innerHTML = total;
    },
    





    /*
     * L I S T E N E R S   ( P Á N E L E S ) 
     * ------------------------------------------------------------
     */

     renderMapSelectorChange : function(e){
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

    renderExtraMapSelectorChange : function(e){

      var value = +e.currentTarget.value,
          item  = this.extraLayersConfig.filter(function(l){
                    return +l.index == value;
                  })[0];

      if(!value && value != 0){
        this.cleanExtraLayer();
        return;
      }

      if(item.data){
        this.renderExtraLayer(item);
      }
      else{
        this.getExtraLayer(item);
      }
    },

    updateUILevelSelectorChange : function(e){
      e.preventDefault();
      
      var item     = e.target,
          selected = item.classList.contains("selected"),
          level    = item.getAttribute("data-value");

      if(selected){
        return;
      }
      else{
        Array.prototype.slice.call(this.UIlevelSelector.querySelectorAll("a")).forEach(function(el){
          el.classList.remove("selected");
        });

        item.classList.add("selected");
        this.currentMap.config.current.level = level;

        this.renderLayer(this.currentMap, true);
      }
    },






    /*
     * F U N C I O N E S   D E   E S T I L O
     * ------------------------------------------------------------
     */

    //
    // ESTILO PARA LAS GEOMETRÍAS DE ESTADO
    // ---------------------------------------------
    // regresa una función que asigna el estilo para 
    // las geometrías de estado
    //
    _stateStyle : function(feature){
      var style     = this.settings.mapGeometry,
          _style    = this.currentMap.config.style,
          css       = null;

      if(_style){
        for(var prop in _style){
          if(_style.hasOwnProperty(prop)){
            style[prop] = _style[prop];
          }
        }  
      }
      css = style;
      css.fillColor = this.brew.getColorInRange(feature.properties.data.value);

      return css;
    },

    //
    // ESTILO PARA LAS GEOMETRÍAS EXTRAS DE ESTADO
    // ---------------------------------------------
    // regresa una función que asigna el estilo para 
    // las geometrías de estado cuando se refiere a los
    // mapas para comparar
    //
    _stateExtraStyle : function(feature){
      var style     = this.settings.extraMapGeometry,
          _style    = this.currentExtraMap.config.style,
          css       = null;
      
      if(_style){
        for(var prop in _style){
          if(_style.hasOwnProperty(prop)){
            style[prop] = _style[prop];
          }
        }  
      }
      css = style;
         
      css.fillColor = this.extraBrew.getColorInRange(feature.properties.data.value);

      return css;
    },

    //
    // ESTILO PARA LAS GEOMETRÍAS DE MUNICIPIO
    // ---------------------------------------------
    // regresa una función que asigna el estilo para 
    // las geometrías de municipio
    //
    _cityStyle : function(feature){
      var style     = this.settings.mapGeometry,
          _style    = this.currentMap.config.style,
          css       = null;

      if(_style){
        for(var prop in _style){
          if(_style.hasOwnProperty(prop)){
            style[prop] = _style[prop];
          }
        }  
      }
      css = style;
      css.fillColor = this.brew.getColorInRange(feature.properties.data.value);

      return css;
    },

    _cityExtraStyle : function(feature){
      var style     = this.settings.extraMapGeometry,
          _style    = this.currentExtraMap.config.style,
          css       = null;
      
      if(_style){
        for(var prop in _style){
          if(_style.hasOwnProperty(prop)){
            style[prop] = _style[prop];
          }
        }  
      }
      css = style;
         
      css.fillColor = this.extraBrew.getColorInRange(feature.properties.data.value);

      return css;
    },

    //
    // GEOMETRY/POINT COLOR FUNCTION
    // ---------------------------------------------
    // regresa una función que asigna el color para 
    // las geometrías o puntos
    //
    _colorMixer : function(item, theData){
      

      var value = item.config.current.value,
          level = item.config.current.level,
          color = item.config.color || this.settings.mapGeometry.defaultColor || 1,
          data  = null,
          _data = null,
          brew  = null;


      if(level == "state" || level == "city"){
        data  = theData;
        _data = _.pluck(data, "value");
      }
      else{
        return null;
      }
      

      brew = new classyBrew();
      brew.setSeries(_data);
      brew.setNumClasses(7);
      brew.setColorCode(brew.getColorCodes()[color]);
      brew.classify('jenks');


      return brew;
    },






    // XXXXX ESTO DEBE BORRARSE E INTEGRAR EL GEOJSON FINAL XXXXX
    //
    // ARREGLA EL GEOJSON DE ESTADOS
    // ---------------------------------------------
    // elimina caracteres raros y nombre nuevo en el geojson de estados
    //
    // v2 : ahora en lugar de completar los datos, puede acortar el número de decimales
    //      por estado
    _setStatesGeometry : function(){
      var optNum = 8;
      ESTADOS.edos.features.forEach(function(estado){

        estado.geometry.coordinates.forEach(function(arr){

          if(arr.length == 1){
            arr[0].forEach(function(point){
              var x, y;

              x = String(point[0]).slice(0, -optNum);
              y = String(point[1]).slice(0, -optNum);

              // console.log(x.length, x, y.length, y);
              point[0] = x.search(".") != -1 ? (+x || point[0]) : point[0];
              point[1] = y.search(".") != -1 ? (+y || point[1]) : point[1];

            }, this);
          }
          else{
            /*
            arr.forEach(function(arr2){
              if(_.isNumber(arr2[0])) return;


              arr2.forEach(function(point){
                var x, y;

                x = String(point[0]).slice(0, -optNum);
                y = String(point[1]).slice(0, -optNum);

                point[0] = +x;
                point[1] = +y;
              }, this);
            }, this);
            */
          }
        }, this);
      });
      

      this.statesGeojson = ESTADOS;
    },



  };

  return GFSHCPMap;
});