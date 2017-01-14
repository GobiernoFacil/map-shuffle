
/*
 * [ V A R   D E F I N I T I O N ]
 * --------------------------------------------------------------------------------
 *
 *
 */

//
// [ define las variables para genera el mapa ]
//
//
var MAP = {
  div     : "map",
  lat     : 22.442167,
  lng     : -100.110350,
  zoom    : 5,
  token   : "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw",
  maxZoom : 18,
  id      : 'mapbox.light',
  baseURL : 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=',
  attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
};

//
// [ define las variables los letreros de info ]
//
//
Selector =[
  { key : "mango_sup_sembrada", name : "Superficie sembrada (Ha)",text : "<%= municipio %>, <%= estado %></b><br><br><%= value %> hectáreas"},
  { key : "mango_sup_cosechada", name : "Superficie cosechada (Ha)",text : "<%= municipio %>, <%= estado %></b><br><br><%= value %> hectáreas"},
  { key : "mango_prod_ton", name : "Producción (Ton)",text : "<%= municipio %>, <%= estado %></b><br><br><%= value %>  toneladas"},
  { key : "mango_rend_ton_ha", name : "Rendimiento (Ton/Ha)",text : "<%= municipio %>, <%= estado %></b><br><br><%= value %> toneladas por hectárea"},
  {key  : "mango_pmr", name : "Precio medio rural ($/Ton)", text : "<%= municipio %>, <%= estado %></b><br><br>$<%= value %> por tonelada"},
  { key : "mango_valor_prod", name : "Valor de producción (Miles $)",text : "<%= municipio %>, <%= estado %></b><br><br>$<%= value %>"}
],

//
// [ define los colores disponibles del brewer ]
//
//
BREW_COLORS = ["OrRd", "PuBu", "BuPu", "Oranges", 
"BuGn", "YlOrBr", "YlGn", "Reds", 
"RdPu", "Greens", "YlGnBu", "Purples", 
"GnBu", "Greys", "YlOrRd", "PuRd", "Blues", 
"PuBuGn", "Spectral", "RdYlGn", "RdBu", 
"PiYG", "PRGn", "RdYlBu", "BrBG", 
"RdGy", "PuOr", "Set2", "Accent", 
"Set1", "Set3", "Dark2", "Paired", 
"Pastel2", "Pastel1"],

//
// [ define distintos CSS para las figuras ]
//
//
STYLE = {
  // la geometría para el municipio
  city : {
    weight      : .4,
    opacity     : .6,
    color       : 'black',
    dashArray   : '',
    fillOpacity : 0.7,
    fillColor   : "#fff"
  },

  // la geometría para el municipio en el mouseover
  cityHover : {
    weight      : 3,
    color       : '#666',
    dashArray   : '',
    fillOpacity : 0.7
  },

  // la geometría para los estados
  state : {
    weight      : 1,
    opacity     : 0.6,
    fillOpacity : 0,         
    color       : 'black',
  },

  // el estilo para los exportadores
  points : {
    radius      : 2,
    fillColor   : "red",
    color       : "#000",
    weight      : 1,
    opacity     : 0,
    fillOpacity : 0.7
  },

  // el estilo para las comercializadoras
  points2 : {
    radius      : 2,
    fillColor   : "blue",
    color       : "#000",
    weight      : 1,
    opacity     : 0,
    fillOpacity : 0.7
  },

  // las opciones para las bandas de color. El número del BREW_COLORS es la opción de color
  brew : {
    colorNum : 5,
    colorKey : BREW_COLORS[9],
    classify : "jenks"
  },

  // la posición del panel de las bandas de color
  colorPanel : {
    position : 'bottomright'
  },

  // la posición del panel de opciones
  selectorPanel : {
    position : 'topright'
  }
},

//
// [ el texto de default cuando no hay nada seleccionado ]
//
//
default_label = "Elige un municipio",

//
//[ la maroma que aparece al pasar el mouse sobre un punto]
//
//
point_popup = _.template("Nombre: <%=nombre%><br> Estado: <%=estado%><br> Municipio: <%=municipio%><br> Destino: <%=destino%>"),

//
//[ la maroma que aparece al pasar el mouse sobre un OTRO punto]
//
//
point_popup2 = _.template("Estado: <%=estado%><br> Municipio: <%=municipio%>"),

//
// [ las bandas de color ]
//
//
color_band = _.template('<i style="background: <%= color %>"></i><span class="range-num"><%= from %></span>&ndash; <%= to %>');





/*
 * [ D A T A   P A N E L S   C O N S T R U C T O R S ]
 * --------------------------------------------------------------------------------
 *
 *
 */

//
// [ define el constructor para las etiquetas de color ]
//
//
var ColorPanel = L.Control.extend({

    initialize: function (brew, app, options){
      this.brew = brew;
      this.app  = app;
      L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      grades  = this.brew.getBreaks(),
      colors  = this.brew.getColors(),
      labels  = [],
      from, to, data;
      for(var i = 0; i < colors.length; i++) {
        from = this.app.formatNum(grades[i]);
        to   = this.app.formatNum(grades[i + 1]);
        data = {
          from  : from,
          to    : to, 
          color : colors[i]
        };
        labels.push(color_band(data));
      }

      div.innerHTML = labels.join('<br>');
      return div;
    }
});

//
// [ define el constructor para el diplay de los datos por municipio ]
//
//
var InfoPanel = L.Control.extend({

  initialize : function(app, options){
    var div = L.DomUtil.create('div', 'info'),
        h3  = document.createElement("h3"),
        p   = document.createElement("p");
    div.appendChild(h3);
    div.appendChild(p);

    this.app = app;
    this._div = div;
  },

  onAdd : function(map){
    this.update();
    return this._div;
  },

  update : function(props){
    var selected = this.app.selected,
        p        = this._div.querySelector("p"),
        h3       = this._div.querySelector("h3"),
        label    = this.app.labels.findWhere({key : selected}),
        template = _.template(label.get('text')),
        data     = props ? {
          municipio : props.mango_mpo,
          estado    : props.mango_Estado,
          value     : this.app.formatNum(props[selected])
        } : null,
        html     = data ? template(data) : default_label;
    h3.innerHTML = label.get("name");
    p.innerHTML  = html;
  }
});

//
// [ define el constructor para el select y el checkbox, que aunque feítos, funcionan :D ]
//
//
var SelectorPanel = L.Control.extend({

  initialize : function(app, selector, options){
    this.app = app;
    this.selector = selector;
    L.Util.setOptions(this, options);
  },

  onAdd : function (map) {
    var div       = L.DomUtil.create('div', 'info'),
        select    = document.createElement("select"),
        checkbox  = document.createElement("input"),
        p         = document.createElement("p"),
        text      = document.createTextNode("Exportadores"),
        checkbox2 = document.createElement("input"),
        p2        = document.createElement("p"),
        text2     = document.createTextNode("Comercializadoras"),
        that      = this;

    // 
    // deinfine el <select>
    //
    this.selector.forEach(function(opt){
      var option       = document.createElement("option");
      option.value     = opt.key;
      option.innerHTML = opt.name;
      select.appendChild(option);
    }, this);

    div.appendChild(select);
    this.app.setCurrent(this.selector[0].key);
    select.addEventListener("change", function(e){
      that.app.setCurrent(this.value);
    });

    //
    // define el primer checkbox (exportadores)
    //
    checkbox.type    = "checkbox";
    checkbox.checked = true;
    p.appendChild(checkbox);
    p.appendChild(text);
    div.appendChild(p);
    checkbox.addEventListener("change", function(e){
      if(e.currentTarget.checked){
        app.drawPoints();
      }
      else{
        app.points.clearLayers();
      }
    });

    //
    // define el segundo checkbox (comercializadoras )
    //
    checkbox2.type    = "checkbox";
    checkbox2.checked = true;
    p2.appendChild(checkbox2);
    p2.appendChild(text2);
    div.appendChild(p2);
    checkbox2.addEventListener("change", function(e){
      if(e.currentTarget.checked){
        app.drawPoints2();
      }
      else{
        app.points2.clearLayers();
      }
    });
    return div;
  }
});




/*
 * [ T H E   A P P ]
 * --------------------------------------------------------------------------------
 *
 *
 */
app = {
  //
  // [ comentar otro día n_____n ]
  //
  //
  initialize : function(data, map, style, states){
    this.brew         = null;
    this.selected     = null;
    this.current      = null;
    this.legend       = null;
    this.base_map     = null;
    this.map          = null;
    this.states       = null;
    this.points       = null;
    this.CSS          = style;

    this.collection   = new Backbone.Collection(data);
    this.labels       = new Backbone.Collection(Selector);
    this.cities_layer = this.make_geojson(this.collection.toArray());
    
    this.drawMap(map);
    this.drawCities(this.map, this.cities_layer, style.city);
    this.drawStates(states, style.state);

    this.selector = new SelectorPanel(this, Selector, STYLE.selectorPanel);
    this.selector.addTo(this.map);

    this.data_display = new InfoPanel(this, {});
    this.data_display.addTo(this.map);

    this.drawPoints();
    this.drawPoints2();

  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  drawMap : function(settings){
    this.map = L.map(settings.div).setView([settings.lat, settings.lng], settings.zoom);

    L.tileLayer(settings.baseURL + settings.token, {
      id : settings.id,
      maxZoom : settings.maxZoom,
      attribution : settings.attribution,
    }).addTo(this.map);

    this.map.attributionControl.addAttribution('SAGARPA');

    return this.map;
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  drawCities : function(map, cities, style){
    this.base_map = L.geoJson(cities, {
      style : style,
    }).addTo(map);
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  drawStates : function(data, style){
    this.states = L.geoJson(data, {
      style: style
    }).addTo(this.map);
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  drawPoints : function(){
    var that = this;
    this.points = L.geoJson(exportadores, {
      pointToLayer : function(feature, latlng){
        var p = L.circleMarker(latlng, STYLE.points),
            content = {
              nombre : feature.properties["Nombre"],
              estado : feature.properties["Estado"],
              municipio : feature.properties["Municipio"],
              destino : feature.properties["Destino 1"]
            };

            p.on("mouseover", function(e){

              L.popup()
                .setLatLng(latlng)
                .setContent(point_popup(content))
                .openOn(that.map);
            });
        return p;
      }
    }).addTo(this.map);
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  drawPoints2 : function(){
    var that = this;
    this.points2 = L.geoJson(comercializadoras, {
      pointToLayer : function(feature, latlng){
        var p = L.circleMarker(latlng, STYLE.points2),
            content = {
              //nombre : feature.properties["Nombre"],
              estado : feature.properties["Estado"],
              municipio : feature.properties["Municipio"],
              //destino : feature.properties["Destino 1"]
              /*
              "properties": { "Municipio": "Aguascalientes", "Estado": "Aguascalientes", "Long": -102.323825, "Lat": 21.781004 }
              */
            };

            p.on("mouseover", function(e){

              L.popup()
                .setLatLng(latlng)
                .setContent(point_popup2(content))
                .openOn(that.map);
            });
        return p;
      }
    }).addTo(this.map);
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  make_geojson : function(data){
    return{
      "type":"FeatureCollection",
      "crs":{
        "type":"name",
        "properties":{
          "name":"urn:ogc:def:crs:EPSG::4019"
        }
      },
      "features" : data.map(function(city){
        return city.attributes;
      })
    }
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  style : function(style, brew, selected){
    var st = _.clone(style);
    return function(data){
      st.fillColor = brew.getColorInRange(data.properties[selected]);
      return st;
    };
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  formatNum : function(num) {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-";
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  setCurrent : function(key){
    this.selected = key;
    if(this.data_display) this.data_display.update();

    var coll = this.collection.filter(function(city){
          return city.get('properties')[key];
        }),
        json = this.make_geojson(coll),
        data = coll.map(function(city){
          return city.get('properties')[key];
        });

    this.brew = new classyBrew();
    this.brew.setSeries(data);
    this.brew.setNumClasses(STYLE.brew.colorNum);
    this.brew.setColorCode(STYLE.brew.colorKey);
    this.brew.classify(STYLE.brew.classify);

    if(this.current) this.current.clearLayers();

    this.current = L.geoJson(json, {
      style : this.style(STYLE.city, this.brew, key),
      onEachFeature : this.onEachFeature.bind(this)
    }).addTo(this.map); 

    if(this.legend) this.legend.removeFrom(this.map);
    this.legend = new ColorPanel(this.brew, this, STYLE.colorPanel);
    this.legend.addTo(this.map);

    if(app.points) app.points.bringToFront();
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  onEachFeature : function(feature, layer) {
    layer.on({
      mouseover : this.highlightFeature.bind(this),
      mouseout  : this.resetHighlight.bind(this),
      click     : this.zoomToFeature.bind(this)
    });
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  highlightFeature : function(e) {
    var layer = e.target;

    layer.setStyle(this.CSS.cityHover);

    if(!L.Browser.ie && !L.Browser.opera) {
      // layer.bringToFront();
    }

    this.data_display.update(layer.feature.properties);
    
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  resetHighlight : function(e) {
    this.current.resetStyle(e.target);
    this.data_display.update();
  },

  //
  // [ comentar otro día n_____n ]
  //
  //
  zoomToFeature : function(e) {
    this.map.fitBounds(e.target.getBounds());
  }
};




/*
 * [ I N I T I A L I Z E   T H E    A P P ! ! ! ! ]
 * --------------------------------------------------------------------------------
 *
 *
 */
app.initialize(mango.features, MAP, STYLE, edos);




