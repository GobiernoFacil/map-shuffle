(function(win){
  /*
  d3.json("js/states.json", function(e,d){
    console.log(d);
  });
  */

  /*
  d3.json("js/cities_min.json", function(e,d){
    d3.json("js/gas_data.json", function(e, dd){
      console.log(dd[6]);
      console.log(d.features[3].properties);
      d.features.forEach(function(feature){
        //feature.properties
        let r = _.find(dd, {city_id : feature.properties.city, state_id : feature.properties.state});
        if(r){
          feature.properties.magna   = r.magna;
          feature.properties.diesel  = r.diesel;
          feature.properties.premium = r.premium;

          feature.properties.state = r.state;
          feature.properties.city  = r.city;
        }
        else{
          feature.properties.magna    = null;
          feature.properties.diesel  = null;
          feature.properties.premium = null;

          feature.properties.state = null;
          feature.properties.city  = null;
        }
      });

      full = d;
      console.log(":D");
    });
  });
  */


  

  // DEfine the function constructor
  var BREW_COLORS = ["OrRd", "PuBu", "BuPu", "Oranges", 
"BuGn", "YlOrBr", "YlGn", "Reds", 
"RdPu", "Greens", "YlGnBu", "Purples", 
"GnBu", "Greys", "YlOrRd", "PuRd", "Blues", 
"PuBuGn", "Spectral", "RdYlGn", "RdBu", 
"PiYG", "PRGn", "RdYlBu", "BrBG", 
"RdGy", "PuOr", "Set2", "Accent", 
"Set1", "Set3", "Dark2", "Paired", 
"Pastel2", "Pastel1"],

  GFSHCPMap =  function(){
    // the string format for the money
    var Format = d3.format(",");
    
    // the map settings
    var MAP = {
      div         : "GF-SHCP-map",
      lat         : 22.442167,
      lng         : -100.110350,
      zoom        : 5,
      maxZoom     : 18,
      baseURL     : 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', //'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', //'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      data        : "api/data"
    },

    // the map style
    STYLE = {
      // the points
      points : {
        radius      : 2,
        radius2     : 5,
        fillColor   : "rgb(244, 157, 81)", //#334D5C", //1cb68d
        color       : "rgb(214, 103, 6)",
        weight      : 1,
        opacity     : 0.3,
        fillOpacity : 0.9
      },

      // the info panel position
      selectorPanel : {
        position : 'topright'
      }
    },

    //
    // the info panel template
    //
    //

    point_popup = _.template("<%=name%>" +
    	"<div class='amount_label'>"+
    	"<div class='row'>" + 
    	"<div class='col-sm-6'><h5>Monto total de inversión</h5>  $<%=monto_total%>"+
    	"<h5>Monto ejercido</h5> $<%=ejercido%></div>"+
    	"<div class='col-sm-6'>"+
    	"<h5>Avance Físico</h5> <%=avance%>% <div class='bar'><span class='bar inside total' style='width:<%=avance%>%'></span>"+
    	"<h5>Año</h5> <%=ciclo%></div>"+
    	"</div></div> <a href='/ficha#<%=cveppi%>' target='_blank' class='btn more info'>Más información</a>");

    /*
     * [ D A T A   P A N E L S   C O N S T R U C T O R S ]
     * --------------------------------------------------------------------------------
     *
     *
     */

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

      this.app  = app;
      this._div = div;
    },

    onAdd : function(map){
      this.update();
      return this._div;
    },

    update : function(props){
    /*
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
    */
    }
  });

  /*
   * [ T H E   A P P ]
   * --------------------------------------------------------------------------------
   *
   *
   */
  var app = {
    //
    // [ comentar otro día n_____n ]
    //
    //
    initialize : function(data, map, style, states){
      var that = this;

      this.settings = Object.create(MAP);
      this.brew     = null;
      this.selected = null;
      this.data     = null;
      this.current  = {};
      this.legend   = null;
      this.base_map = null;
      this.map      = null;
      this.states   = null;
      this._points  = null;
      this.points   = null;
      this.style    = Object.create(STYLE);
      this.updateMap       = this.updateMap.bind(this);
      this.callGeocoder    = this.callGeocoder.bind(this);
      this.geocodingSucces = this.geocodingSucces.bind(this);
      this.geocoder        = new google.maps.Geocoder();

      //this.brew = new classyBrew();

      // SET THE UI FILTERS
      /*
      this.yearSelector = document.getElementById("GF-SHCP-year-selector");
      this.yearSelector.addEventListener("change", this.updateMap);
      */

      this.stateSelector = document.getElementById("GF-SHCP-state-selector");
      this.stateSelector.addEventListener("change", this.updateMap);

      /*
      this.classSelector = document.getElementById("GF-SHCP-class-selector");
      this.classSelector.addEventListener("change", this.updateMap);
      */

      this.branchSelector = document.getElementById("GF-SHCP-branch-selector");
      this.branchSelector.addEventListener("change", this.updateMap);

      this.branchSelector = document.getElementById("GF-SHCP-exec-selector");
      this.branchSelector.addEventListener("change", this.updateMap);

      this.branchSelector = document.getElementById("GF-SHCP-advance-selector");
      this.branchSelector.addEventListener("change", this.updateMap);

      this.geocoderForm  = document.querySelector("#GF-SHCP-geocoder"),
      this.geocoderInput = document.querySelector("#GF-SHCP-geocoder-input"),
      this.geocoderForm.addEventListener("submit", this.callGeocoder);

      this.drawMap();
      this.getData();

      //this.drawCities();
    },

    updateMap : function(e){
      this.redrawPoints( this.filterData() );
    },

    getData : function(){
      var that = this;

      d3.csv("csv/opa.csv", function(error, d){
      //d3.json(this.settings.data, function(error, d){
        that.data    = d.slice(0);
        that.data.forEach(function(r){
          r.key = r.key.replace("'", "");
        });
        that._mapAdvance();
        that._points = that.makeGeojson(d);
        that.drawPoints(that._points);
      });
    },

    filterData : function(){
      var that    = this,
          data    = this.data.slice(0),
          //year    = document.getElementById("GF-SHCP-year-selector").value,
          branch  = document.getElementById("GF-SHCP-branch-selector").value,
          state   = document.getElementById("GF-SHCP-state-selector").value,
          unit    = document.getElementById("GF-SHCP-exec-selector").value,
          advance = document.getElementById("GF-SHCP-advance-selector").value,
          //classification = document.getElementById("GF-SHCP-class-selector").value,
          filter  = {};

      //if(year !== "all") filter.ciclo = year;
      if(branch !== "all") filter.ramo = branch;
      if(state !== "all") filter.state = state;
      //if(classification !== "all") filter.classification = classification;
      if(unit !== "all") filter.unidad = unit;
      if(advance !== "all") filter.avance = advance;


      data = _.where(data, filter);
      return data;
    },

    //
    // [ comentar otro día n_____n ]
    //
    //
    drawMap : function(){
      var that = this;
      this.map = L.map(this.settings.div).setView([this.settings.lat, this.settings.lng], this.settings.zoom);

      L.tileLayer(this.settings.baseURL, {
        id : "main-map",//this.settings.id,
        maxZoom : this.settings.maxZoom,
        attribution : this.settings.attribution,
      }).addTo(this.map);

      this.map.attributionControl.addAttribution('SHCP');

      this.map.on("zoomend", function(e){
        var currentZoom = that.map.getZoom();

        if(currentZoom >= 9){
          that.points.setStyle(function(d){return {radius : STYLE.points.radius2}});
        }
        else{
          that.points.setStyle(function(d){return {radius : STYLE.points.radius}});
        }
      });

      return this.map;
    },

    //
    //
    //
    drawCities : function(){
      var that = this;
      d3.json("js/gas.json", function(e, d){

        console.log(d.features);

        var _data = d.features.map(
          function(_d){
          return _d.properties.premium ? +_d.properties.premium : null;
          }
        );

        console.log(_data);
        
        that.brew.setSeries(_data);
        that.brew.setNumClasses(5);
        that.brew.setColorCode("BuGn");
        that.brew.classify('jenks');
        
// getColorInRange
        that.base_map = L.geoJson(d, {
          style : function(d){
            return {
            weight      : .4,
            opacity     : .6,
            color       : 'black',
            dashArray   : '',
            fillOpacity : 0.7,
            fillColor   : that.brew.getColorInRange(+d.properties.premium)//"#fff"
          }
          },
        }).addTo(that.map);
      });
      /*
      this.base_map = L.geoJson(cities, {
        style : style,
      }).addTo(map);
      */
    },

    //
    // [ comentar otro día n_____n ]
    //
    //
    drawPoints : function(d){
      var that = this;
      this.points = L.geoJson(d, {
        pointToLayer : function(feature, latlng){
          //console.log(feature.properties.monto_total);
          if(latlng.lat && latlng.lng){

          var p = L.circleMarker(latlng, that.style.points),
              content = {
                //nombre : feature.properties["Nombre"],
                name : feature.properties.name,//"Hola",//feature.properties["Estado"],
                //municipio : feature.properties["Municipio"],
                //destino : feature.properties["Destino 1"]
                cveppi : feature.properties.cvePPI,
                ejercido : Format(feature.properties.ejercido),
                monto_total : Format(feature.properties.monto_total),
                avance : feature.properties.avance,
                ciclo : feature.properties.ciclo
              };

              p.on("click", function(e){
                //alert(feature.properties.cvePPI);
                window.open('/ficha#' + feature.properties.cvePPI, '_blank');
                // window.location.href = "";
              });

              
              p.on("mouseover", function(e){

                L.popup()
                  .setLatLng(latlng)
                  .setContent(point_popup(content))
                  .openOn(that.map);
              });
              
          return p;
          }
        }
      }).addTo(this.map);
    },

    redrawPoints : function(d){
      var that = this;
      this.map.removeLayer(this.points);
      this.drawPoints(this.makeGeojson(d));
    },

    //
    // [ comentar otro día n_____n ]
    //
    //
    makeGeojson : function(data){
      return{
        "type":"FeatureCollection",
        "crs":{
          "type":"name",
          "properties":{
            "name":"urn:ogc:def:crs:EPSG::4019"
          }
        },
        "features" : data.map(function(d){
          return {
            type : "Feature",
            properties : {
              //"Municipio" : "Aguascalientes", 
              //"Estado"    : "Aguascalientes", 
              "Long"        : d.lng, 
              "Lat"         : d.lat,
              "cvePPI"    : d.key,
              "name"      : d.name,
              "avance"    : d.advance,
              "ejercido"  : d.ejercido,
              "monto_total" : d.monto_total_inversion,
              "ciclo" : d.ciclo
            },
            geometry : {
              "type": "Point", 
              "coordinates": [ d.lng, d.lat ]
            }
          }
        })
      }
    },

    _mapAdvance : function(){
      this.data.forEach(function(d){
        if(+d.advance < 1){
          d.avance = "1";
        }
        else if(+d.advance <= 20){
          d.avance = "2";
        }

        else if(+d.advance <= 40){
          d.avance = "3";
        }

        else if(+d.advance <= 60){
          d.avance = "4";
        }

        else if(+d.advance <= 80){
          d.avance = "5";
        }

        else{
          d.avance = "6";
        }
      });
    },

    callGeocoder : function(e){
      e.preventDefault();

      var location = this.geocoderInput.value;
      this.geocoder.geocode({address : location}, this.geocodingSucces);
    },

    geocodingSucces : function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        var lat = results[0].geometry.location.lat(),
            lng = results[0].geometry.location.lng();
        this.map.setView(L.latLng(lat, lng), 14);
      }
      else{
      }
    }
  }

  return app;
};

win.GFSHCPMap = new GFSHCPMap();

win.onload = function(e){
  win.GFSHCPMap.initialize();
};

})(window);


