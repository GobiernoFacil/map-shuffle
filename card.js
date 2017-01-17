var DatosGobMxURL = "http://api.datos.gob.mx/v1/proyectos-opa?" + encodeURIComponent("cve-ppi") + "='08096480005";


console.log(window.location.hash);
d3.json(DatosGobMxURL)
    //.mimeType("text/csv")
    .get({"cve-ppi" : "'08096480005"}, function(e, d){
      console.log(e, d);
    });