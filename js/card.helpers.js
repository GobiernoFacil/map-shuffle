(function(){

  var index = 0;

  var GFSHCPHelpers = {
    initialize : function(){
      
    },
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