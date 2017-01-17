var DatosGobMxURL = "http://localhost:8000/api/test";
//"http://api.datos.gob.mx/v1/proyectos-opa?" + encodeURIComponent("cve-ppi") + "='08096480005";


console.log(window.location.hash);


d3.json(DatosGobMxURL)
  .get(function(e, d){
    var GFapp = new Vue({
      el   : '#GF-card',
      data : d
    })
  });
    

