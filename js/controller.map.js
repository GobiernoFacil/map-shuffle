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

      // [4] obtiene los templates de UI
      // ----------------------------------------------------------------------
      // [*] el selector de mapa
      MAPSELECTOR    = require("text!templates/map-selector-panel.html"),
      // [*] las barras de comparación
      PAGESELECTOR   = require("text!templates/page-selector-panel.html"),  
      // [*] la guía de color
      COLORGUIDE     = require("text!templates/color-band.html"), 

      // [5] carga los componentes de filtros y búsqueda
      // ----------------------------------------------------------------------
      BARSTOOL      = require("barsv2.maps"), 

      // [6] carga los componentes de filtros y búsqueda
      // ----------------------------------------------------------------------
      SEARCHTOOL     = require("search.maps"), 

      // [7] carga el componente de filtrado
      // ----------------------------------------------------------------------
      FILTERMODULE   = require("filter.module.map");

      // [8] define las constantes internas del sistema 
      // ----------------------------------------------------------------------
      SELECTALL      = "ಠ_ಠ",//"_____",
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
      //
      //
      // * referencia al archivo de configuración inicial
      this.settings = Object.create(CONFIG);
      // * la columna para el id interno de los municipios
      this.cityID   = this.settings.constants.cityId;
      // * la columna para el id interno de las unidades ejecutoras
      this.unitID   = this.settings.constants.unitId;
      // * la columna para el url de cada item
      this.itemUrl  = this.settings.constants.itemUrl;
      // * la referencia a classyBrew
      this.brew           = null;
      // * los datos filtrados
      this.filteredData   = null;
      // * en el caso de info por api, la página actual
      this.currentPage    = 0;
      // * en el caso de info por api, el total de páginas
      this.totalPages     = null;
      // * la referencia a los datos agregados por municipio o estado
      this.currentData    = null;
      // * la referencia a los puntos agrupados x ubicación
      this._currentPoints = null;
      // * la referencia al mapa de configuración seleccionado
      this.currentMap     = null;
      // * la lista de filtros para los datos
      this.filters        = [];
      // * la lista de buscadores... porque por alguna razón, 
      //   en lugar de uno, hay que tener varios...
      this.searchFilters  = [];
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
      //
      //
      // * El selector de mapas
      this.UImapSelector          = null;
      // * El selector del nivel del mapa (estado, municipio)
      this.UIlevelSelector        = null;
      // * los <select> de los filtros extra
      this.UIextraFiltersSelector = null;
      //
      this.UIMapCartFilter        = document.getElementById(this.settings.ui.mapCart);

      // [2] ARRREGLA EL SCOPE DE ALGUNAS FUNCIONES
      // ----------------------------------------------------------------------
      //
      //
      this._stateStyle                  = this._stateStyle.bind(this);
      this._stateExtraStyle             = this._stateExtraStyle.bind(this);
      this._cityStyle                   = this._cityStyle.bind(this);
      this._cityExtraStyle              = this._cityStyle.bind(this);
      this.renderMapSelectorChange      = this.renderMapSelectorChange.bind(this);
      this.renderExtraMapSelectorChange = this.renderExtraMapSelectorChange.bind(this);
      this.updateUILevelSelectorChange  = this.updateUILevelSelectorChange.bind(this);
      this.goToUserLocation             = this.goToUserLocation.bind(this);
      this.updateData                   = this.updateData.bind(this);
      
      // [3] INICIA EL MAPA DE LEAFLET
      // ----------------------------------------------------------------------
      //
      //
      this.drawMap();

      // [4] INICIA LOS ELEMENTOS DE UI
      // ----------------------------------------------------------------------
      //
      //
      // * el selector de mapa
      this.renderMapSelector();

      // * el selector de mapas extra
      this.renderExtraMapSelector();

      /*!!!!!!
      !! 
      !! esta función debe de revisarse de manera distinta, en lugar de buscar
      !! un elemento html, en la configuración debería tener una entrada 
      !!
      !!!!!!*/
      if(this.UIMapCartFilter){
        // * inicia el engine de filtrado
        this.filterModule = new FILTERMODULE(this, this.UIMapCartFilter, this.updateData, " ");
      }
      

      // [5] CARGA LOS ARCHIVOS DE CONFIGURACIÓN Y DESPLIEGA EL MAPA SELECCIONADO
      // ----------------------------------------------------------------------
      // * la configuración de los mapas principales
      this.loadMapsConfig();
      // * la configuración de los mapas extra (para comparar)
      this.loadExtraMapsConfig();

      // [6] LA GEOLOCALIZACIÓN
      // ----------------------------------------------------------------------
      // [6.1] HABILITA EL GEOLOCALIZADOR Y LA OBTENCIÓN DE LAS COORDENADAS DEL USUARIO
      this.enableUserLocation();

      // [6.2] HABILITA EL REVERSE GEOCODING
      this.enableReverseGeocofing();

      // [7] LOADER 
      this.loaderStop();

      // [8] HABILITA EL CALLBACK DE INICIO
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

    /*
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

      this.firstTime = false;

      return true;
    },
    */





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
    // ACTUALIZA EL MAPA CON NUEVOS DATOS DESPUÉS FILTRAR
    //
    //
    updateData : function(data, filters, pagination){
      var that = this;

      if(this.currentMap.config.api){
        var page    = 0,
            src2    = that.makeAPIURL(that.currentMap, page),
            item    = this.currentMap,
            pageEl  = document.getElementById(this.settings.ui.pageSelector.controls.pageSelect);
            totalEl = document.getElementById(this.settings.ui.pageSelector.controls.pageDisplay);
        
        this.filters = filters;

        d3[item.config.file](src2, function(error, data){
          item.data        = data.results;
          item.response    = data;
          that.totalPages  = data.pages;
          that.currentPage = data.page;

          that.cleanLayers();
          that.filteredData = item.data.slice();
          that.renderLayer(item);

          that.currentPage = data.page;

          pageEl.value      = page + 1;
          totalEl.innerHTML = that.totalPages;
        });
      }
      else{
        this.filteredData = data;
        this.filters = filters;
        this.renderLayer(this.currentMap);
      }
    },

    //
    // RENDEREA EL MAPA SELECCIONADO (item)
    //
    //
    renderLayer : function(item, keepFilters){
      var geojson;
      // [1] elimina el layer anterior, ya sea puntos, área o mapa extra
      //
      this.cleanLayers();

      // [3] despliega el mapa según el tipo
      //
      // A) Es un mapa de área por estado
      if(item.config.current.level == "state"){
        this.currentData = this._agregateDataByState(item, this.filteredData);
        geojson = this._mapStateGeojson(this.currentData);
        this.brew = this._colorMixer(item, this.currentData);
        this.renderStateLayer(item, "states", geojson, this._stateStyle);
      }
      // B) Es un mapa de área por municipio
      else if(item.config.current.level == "city"){
        this.currentData = this._agregateDataByCity(item, this.filteredData);
        geojson = this._mapCityGeojson(this.currentData);
        this.brew        = this._colorMixer(item, this.currentData);
        this.renderCityLayer(item, "cities", geojson, this._cityStyle);
      }
      // C) Es un mapa de puntos definidos por latitud y longitud
      else{
        this.currentData = null;
        // filtra los puntos que no tienen localización
        this.filteredData = ! this.currentMap.config.disable ? this.filteredData : this.filteredData.filter(function(d){
          return d[this.currentMap.config.location.lat] != this.currentMap.config.disable[0] && d[this.currentMap.config.location.lng] != this.currentMap.config.disable[1];
        }, this);

        // agrupa
        if(this.currentMap.config.multiple){
          this._currentPoints = this.groupPoints();
        }

        this.renderPointsLayer(item);
        
        /*
        if(item.config.api){
          this.updatePagination();
        }
        */
      }

      // [5] Actualiza las opciones de UI
      //
      this.updateUIOptions(item);


      // [8] Actualiza el contador de proyectos
      //
      this.renderProjectCounter(this.filteredData);

      // [9] Actualiza la guía de color
      //
      this.renderColorGuide();

      // [10] Actualiza el texto para el embed
      this.updateEmbed();

      // [11] Activa el callback de cambio
      if(this.callbacks && this.callbacks.filterChange){
        // filters, data, currentData
        this.callbacks.filterChange(this.filters, this.currentMap, this.filteredData);
      }

      // [12] Actualiza el app de comparación
      /*
      if(this.barsTool){
        this.barsTool.render();
      }
      else{
        
      }

      if(this.searchTool){
        this.searchTool.render();
      }
      else{
        
      }
      */
    },

    groupPoints : function(){
      var finalData = [],
          colector  = [],
          lat = this.currentMap.config.location.lat,
          lng = this.currentMap.config.location.lng,
          initialData = this.filteredData.slice(0);

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
        });
      }, this);
    },

    //
    // OBTIENE LA INFORMACIÓN DEL MAPA SELECCIONADO
    //
    //
    getLayer : function(item){
      
      if(item.data){
        // * elimina todos los layers del mapa
        this.cleanLayers();
        // * asigna a currentMap la configuración del mapa seleccionado
        this.currentMap   = item;
        // * asigna a currentMapId el id interno del mapa desplegado
        //   (pero creo que ni se ocupa :P)
        this.currentMapId = item.idex;
        // * asigna a filteredData una copia de todos los datos
        this.filteredData = item.data.slice();
        // * habilita los filtros del mapa que tiene la configuración
        this.enableFilters();
        // * renderea el mapa
        //this.renderLayer(item);
        this.filterModule._enableDefaultFilters();
        this.filterModule.filter();
        
        if(this.barsTool) this.barsTool.render();
        if(this.searchTool) this.searchTool.render();

        return;
      }

      this.loaderStart();
      
      var that    = this, 
          conf    = item.config,
          src     = conf.src,
          hasCity = conf.location.city,
          hasUnit = null,
          hasUrl  = conf.link,
          filters = conf.filters,
          src2    = this.makeAPIURL(item);

      // revisa si el mapa tiene unidades ejecutoras, para generar un id único 
      // para cada una
      hasUnit = ! filters ? false : filters.filter(function(fil){
                    return fil.type == "unit";
                  })[0];
      // revisa si el mapa tiene municipios, para generar un id único 
      // para cada uno
      hasCity = hasCity || filters.filter(function(fil){
                    return fil.type == "city";
                })[0];

      // [1] Si es un api la fuente, actualiza el url
      //
      
      if(conf.api && conf.type == "area"){
        src = src + "/" + conf.current.level + "/" + conf.current.value
      }

      else if(conf.api && conf.type == "point"){
        src = src + "/" + "1";
      }

      //this.makeAPIURL(item);
      


      // [2] carga el archivo con los datos para graficar
      //
      d3[conf.file](src2, function(error, data){
        if(conf.api && conf.type == "point"){
          item.data       = data.results;
          item.response   = data;
          that.totalPages = data.pages;
        }
        else{
          item.data     = data;
          item.response = null;
        }

        if(hasCity){
          that._addKeyToCities(item.data, conf, hasCity);
        }

        if(hasUnit){
          that._addKeyToUnits(item.data, conf, hasUnit);
        }

        if(hasUrl){
          that._addUrlToItems(item.data, conf);
        }

        //that.mixInitialFilters(item);
        that.cleanLayers();
        // * el mapa desplegado
        that.currentMap   = item;
        // * el id interno del mapa desplegado
        that.currentMapId = item.idex;
        that.filteredData = item.data.slice();
        that.enableFilters();
        //that.renderLayer(item);
        that.filterModule._enableDefaultFilters();
        that.filterModule.filter();
        if(item.config.api) that.updatePagination();
        if(that.barsTool) that.barsTool.render();
        if(that.searchTool) that.searchTool.render();

        that.loaderStop();
      });
    },

    makeAPIURL : function(item, page){
      var that    = this, 
          conf    = item.config,
          src     = conf.src,
          filters = this.filters,
          url,
          fields;

      url = src + "?";

      if(filters.length){
        fields = _.uniq(_.pluck(filters, "field"));

        fields.forEach(function(field){
          var fa     = filters.filter(function(fil){
                       return fil.field == field;
                     }),
              values = _.pluck(fa, "value");

          url = url + field + "=" + values.join("|") + "&";
        });

      }

      if(this.searchFilters.length){
        this.searchFilters.forEach(function(sf){
          if(sf.value){
            url = url + sf.getAttribute("data-field") + "=" + sf.value + "&";
          }
        });
      }

      url = url + "page=" + ( (page == 0 || page ? String(page) : null ) || this.currentPage);

      return encodeURI(url);
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

    _addUrlToItems : function(data, conf){
      data.forEach(function(d){
        d[this.itemUrl] = conf.link.url + "#" + d[conf.link.column];
      }, this);
    },

    _addKeyToUnits : function(data, conf, unit){
      var branch = conf.filters.filter(function(fil){
                     return fil.type == "branch";
                   })[0];

      if(!branch) return;

      data.forEach(function(d){
        d[this.unitID] = String(d[branch.field]) + "-" + String(d[unit.field]);
      }, this);

      unit.field = this.unitID;
    },

    _addKeyToCities : function(data, conf, city){
      var state = city.length ? conf.location.state : conf.filters.filter(function(fil){
                    return fil.type == "state";
                  })[0],
          stateCol, cityCol;

      if(!state) return;

      stateCol = state.length ? state : state.field;
      cityCol  = city.length ? city : city.field;

      data.forEach(function(d){
        var cityLength = String(d[cityCol]).length,
            cityString;

        if(cityLength == 1){
          cityString = "00" + String(d[cityCol]);
        }
        else if(cityLength == 2){
          cityString = "0" + String(d[cityCol]);
        }
        else{
          cityString = String(d[cityCol]);
        }
        d[this.cityID] = Number(String(d[stateCol]) + cityString);
      }, this);

      if(city.length){
        conf.location.city = this.cityID;
        conf.filters.forEach(function(fil){
          if(fil.type == "city"){
            fil.field = this.cityID;
          }
        });
      }
      else{
        city.field = this.cityID;
      }
    },

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

      _data = this.lists.municipiosName.cities.map(function(ct){
        var search = {},
            data   = null,
            value  = null;
        
        search[this.cityID] = +ct.clave_inegi;

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
    },

    _mapCityGeojson : function(data){
      var copy = Object.create(this.lists.municipios.municipios);
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
        features = this.filteredData.map(function(d){
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
          total;

      if(this.currentMap.config.api){
        total = this.numberFormat(this.currentMap.response.total);
      }
      else{
        total = this.numberFormat(data.length);
      }

      el.innerHTML = total ? total : 0;
    },

    enableFilters : function(){
      this.searchFilters = [];
      var filters = this.currentMap.config.filters.concat(this.currentMap.config.extraFilters || []),
          container = document.getElementById(this.settings.ui.filterSelector),
          stateFilter,
          cityFilter,
          branchFilter,
          unitFilter,
          searchFilter;

      container.innerHTML = "";

      this.filterModule.renderClearFilterBtn2(container);
      
      filters.forEach(function(filter){
        var select;

        if(filter.type == "search"){
          // searchFilter = this.filterModule.renderSearchInput(filter, container);
          this.searchFilters.push(this.filterModule.renderSearchInput(filter, container));
        }

        else if(filter.type == "state"){
          stateFilter = this.filterModule.renderStateSelector(filter, container);
          //this.filters.push(stateFilter);
        }
        
        else if(filter.type == "city"){
            // renderCitySelector : function(filter, container)
          cityFilter = this.filterModule.renderCitySelector(filter, container);
            //this.filters.push(cityFilter);
        }
        

        else if(filter.type == "branch"){
          // renderCitySelector : function(filter, container)
          cityFilter = this.filterModule.renderBranchSelector(filter, container);
          //this.filters.push(branchFilter);
        }

        

        else if(filter.type == "unit"){
          // renderCitySelector : function(filter, container)
          unitFilter = this.filterModule.renderUnitSelector(filter, container);
          //this.filters.push(unitFilter);
        }
        
        else{
          this.filterModule.renderOtherSelector(filter, container);
        }
        
      }, this);

      this.filterModule.renderClearFilterBtn2(container);

    },



    updatePagination : function(){
      var that    = this,
          map     = this.currentMap,
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

      pageEl.value = page + 1;
      totalEl.innerHTML = total;

      next.addEventListener("click", function(e){
        e.preventDefault();

        var page    = Number(that.currentPage) + 1,
            src2    = that.makeAPIURL(that.currentMap, page),
            item    = that.currentMap;
            
        d3[item.config.file](src2, function(error, data){
          item.data        = data.results;
          item.response    = data;
          that.totalPages  = data.pages;
          that.currentPage = data.page;

          that.cleanLayers();
          that.filteredData = item.data.slice();
          that.renderLayer(item);

          that.currentPage = data.page;

          pageEl.value      = page + 1;
          totalEl.innerHTML = that.totalPages;
        });
      });

      prev.addEventListener("click", function(e){
        e.preventDefault();

        var page    = Number(that.currentPage) - 1,
            src2    = that.makeAPIURL(that.currentMap, page),
            item    = that.currentMap;
        
        if(page < 0) return;

        d3[item.config.file](src2, function(error, data){
          item.data        = data.results;
          item.response    = data;
          that.totalPages  = data.pages;
          that.currentPage = data.page;

          that.cleanLayers();
          that.filteredData = item.data.slice();
          that.renderLayer(item);

          that.currentPage = data.page;

          pageEl.value      = page + 1;
          totalEl.innerHTML = that.totalPages;
        });
      });
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


      this.getLayer(item);


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
    }

  };

  return GFSHCPMap;
});