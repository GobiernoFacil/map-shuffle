(function(){

  var index = 0;

  var GFSHCPHelpers = {
    initialize : function(config, map){
      var hash      = window.location.hash.replace("#", ""),
          endpoint  = config.endpoint + "/" + hash,
          template  = document.querySelector(config.template).innerHTML,
          container = document.querySelector(config.container),
          error     = document.querySelector(config.error),
          that      = this;
      
      this.map  = map;


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
        data.forEach(function(d){
          var div = document.createElement("div"),
              vue;

          div.innerHTML = template;
          container.appendChild(div);

          this.map(d);
          
          this.renderCircle(div, d, this.config.circleClass);

          this.makeMap(div, d);

          console.log(d);

          vue = new Vue({
            el      : div,
            data    : d
          });
        }, this);
    },

    makeMap : function(container, d){

      var maps  = container.querySelectorAll(this.config.mapClass);

      maps = Array.prototype.slice.apply(maps);

      maps.forEach(function(map){
        var _lat  = map.getAttribute("data-lat"),
            _lng  = map.getAttribute("data-lng"),
            lat   = +d[_lat] ? d[_lat] : this.config.defaultLat,
            lng   = +d[_lng] ? d[_lng] : this.config.defaultLng,
            mymap,//mymap = L.map(map).setView([lat, lng], 7),
            marker,
            id    = "mapa-" + index;

        index++;

        map.id = id;

        mymap = L.map(id).setView([lat, lng], 7);


        console.log(_lat, d[_lat], _lng, d[_lng]);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(mymap);
    // agrega un marcador al mapa
    marker = L.marker([lat, lng]).addTo(mymap);
      }, this);
    },

    renderCircle : function(el, data, className){
      var divs = el.querySelectorAll(className),
          num  = divs.length;

      if(!num){
        return;
      }

      divs = Array.prototype.slice.apply(divs);

      divs.forEach(function(div){
        var width  = div.getAttribute("data-width"),
            height = div.getAttribute("data-height"),
            colorA = div.getAttribute("data-color-a"),
            colorB = div.getAttribute("data-color-b"),
            column = div.getAttribute("data-column"),
            radius = Math.min(width, height) / 2,
            value  = +data[column],
            color, arc, pie, svg, g, _data;


        color = d3.scale.ordinal()
                  .range([colorA, colorB]);

        arc = d3.svg.arc()
                    .outerRadius(function(d,i) {
                      return i ? radius - 20 : radius - 10;
                    })
                    .innerRadius(function(d,i) {
                      return i ? radius - 15 : radius - 25;
                    });

        pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { 
                  return d.amount; 
                });

        svg = d3.select(div).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        _data = [ {"amount": value }, {"amount": 100 - value} ];

        console.log(data, column, data[column], _data);
        g = svg.selectAll(".arc")
          .data(pie(_data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { 
            return color(d.data.amount); });

      g.append("text")
          .attr("transform",  "translate(-25)")
          .attr("dy", ".35em")
          .text(function(d, i) {
            if(i==0) {
             return d.data.amount + "%";
            }
          })
        .attr("class", "text_arc");

      }, this);
    }
  }

  window.GFSHCPHelpers = GFSHCPHelpers;
})();