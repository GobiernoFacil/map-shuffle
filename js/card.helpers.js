(function(){

  var index = 0;

  var GFSHCPHelpers = {
    initialize : function(config){
      var hash      = window.location.hash.replace("#", ""),
          endpoint  = config.endpoint + "/" + hash,
          template  = document.querySelector(config.template).innerHTML,
          container = document.querySelector(config.container),
          error     = document.querySelector(config.error),
          that      = this;

      this.vueTemplates = [];

      //this.render = this.render.bind(this);

      d3.json(endpoint)
        .get(function(e, data){
          if(e){
            container.style.display = "none";
            error.style.display     = "block";
          }

          that.render(data[config.dataContainer], container, template);
        });
      },

      render : function(data, container, template){
        data.forEach(function(d){
          var div = document.createElement("div"),
              vue;

          div.innerHTML = template;
          container.appendChild(div);

          vue = new Vue({
            el   : div,
            data : d
          });

          //console.log(this, this.vueTemplates);

          //this.vueTemplates.push(vue);

        });
      },

      /*
      data.forEach(function(d){
        var div = document.createElement("div");

        div.innerHTML = template;
        container.appendChild(div);
      });
      */


      /*
      var hash     = window.location.hash.replace("#", ""),
      endpoint = GFAPIBaseURL + "/" + hash,
      contentElement, mymap, lat, lng, marker;


// llama al api para obtener la información
d3.json(endpoint)
  .get(function(e, d){
    // Si falla la conexión / no encuentra el id, muestra el
    // Letrero de error
    if(e){
      document.getElementById(GFErrorBlockID).style.display = "block";
      document.getElementById(GFContentBlockID).style.display = "none";
      return;
    }

    // ejecuta el template con vuejs
    contentElement = new Vue({
      el   : "#" + GFContentBlockID,
      data : d
    });

    // dibuja un mapa
    GFAddMap(d);

    // dibuja el porcentaje del proyecto
    GFMakeCircle({
      width  : 160,
      height : 130,
      colorA : "rgb(190,205,81)",
      colorB : "rgb(210,210,210)",
      selector : "#arc_side",
      value : "AVANCE_FINANCIERO",
      item  : d
    });

    // obtiene la lista de estados
    GFgetStateList();
    // habilita los reportes
    GFenableReports();
      */
    makeMap : function(container, selector, d){
      var lat   = d[GFLatColumn] ? d[GFLatColumn] : GFDefaultLat,
          lng   = d[GFLngColumn] ? d[GFLngColumn] : GFDefaultLng,
          el    = container.querySelector(selector),
          mymap = L.map(el).setView([lat, lng], 13),
          marker;
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(mymap);
    // agrega un marcador al mapa
    marker = L.marker([lat, lng]).addTo(mymap);
    }
  }

  window.GFSHCPHelpers = GFSHCPHelpers;
})();