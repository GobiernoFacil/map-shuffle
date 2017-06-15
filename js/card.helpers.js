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
      this.config = config;

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
        console.log(this);
        data.forEach(function(d){
          var div = document.createElement("div"),
              vue;

          div.innerHTML = template;
          container.appendChild(div);

          vue = new Vue({
            el   : div,
            data : d
          });

          this.renderCircle(div, d, this.config.circleClass);
          // function(el, data, className){



          //console.log(this, this.vueTemplates);

          //this.vueTemplates.push(vue);

        }, this);
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
    },

    renderCircle : function(el, data, className){
      //var radius = Math.min(settings.width, settings.height) / 2,
      var divs = el.querySelectorAll(className),
          num  = divs.length;
          //value = +this.settings.item[this.settings.value],
          //color, arc, pie, svg, data, g;

      if(!num){
        return;
      }

      divs = Array.prototype.slice.apply(divs);
      //console.log(divs);
    }
    /*
    GFMakeCircle(settings){
  var radius = Math.min(settings.width, settings.height) / 2,
      value = +settings.item[settings.value],
      color, arc, pie, svg, data, g;

  color = d3.scale.ordinal()
        .range([settings.colorA, settings.colorB]);

  arc = d3.svg.arc()
        .outerRadius(function(d,i) {
          return i ? radius - 20 : radius - 10;
       })
        .innerRadius(function(d,i) {
          return i ? radius - 15 : radius - 25;
       });

  pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.amount; });

  svg = d3.select(settings.selector).append("svg")
        .attr("width", settings.width)
        .attr("height", settings.height)
      .append("g")
        .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")");

  data = [
        {"amount": value },
        {"amount": 100 - value}
      ];

  g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.amount); });

      g.append("text")
          .attr("transform",  "translate(-25)")
          .attr("dy", ".35em")
          .text(function(d, i) {
            if(i==0) {
             return d.data.amount + "%";
            }
          })
        .attr("class", "text_arc");
}
    */
  }

  window.GFSHCPHelpers = GFSHCPHelpers;
})();