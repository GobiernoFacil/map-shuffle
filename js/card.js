(function(win){

//var DatosGobMxURL = "http://localhost:8000/api/test";
var hash          = window.location.hash.replace("#", "");
var DatosGobMxURL = GFAPIBaseURL + "?" + encodeURIComponent("cve-ppi") + "='" + hash;


function printLinks(errors, links){
  var id  = window.location.hash.replace("#", ""),
      ref = links.filter(function(fill){
        return fill.ID_PPI.replace("'", "") == id;
      });

  if(ref.length){
    ref.forEach(function(ref){
      document.querySelector("#GF-SHCP-links").innerHTML = "<li><a href='" + GFLinksBaseURL + ref.ID_PP + "'>" + "<strong>" + ref.ID_PP + "</strong> - " +ref.DESC_PP+ "</a></li>";
    });
  }

}

function printComments(errors, comments){
  var id  = window.location.hash.replace("#", ""),
      ref = comments.filter(function(comment){
        return comment.CVE_PPI.replace("'", "") == id;
      });

  if(ref.length){
    ref.forEach(function(ref){
      document.querySelector("#GF-SHCP-comments").innerHTML = "<li>" + ref.Nota + "</li>";
    });
  }

  else{
    document.querySelector("#gf-commentarios").style.display = "none";
  }

}

d3.json(DatosGobMxURL)
  .get(function(e, d){

    // die if must to
    if(e || !d.results.length){
      document.querySelector("#chupar-faros").style.display = "block";
      [].slice.call(document.querySelectorAll(".GF-card")).forEach(function(g){
        g.style.display = "none";
      });
      return;
    }


    d3.csv(GFNotesFile, printComments);
    d3.csv(GFLinksFile, printLinks);

    var res  = d.results[0],
        data = {


          _id              : res["_id"],
          anios_he         : res["anios-he"],
          ap_materno_admin : res["ap-materno-admin"],
          ap_paterno_admin : res["ap-paterno-admin"],
          aprobado         : res["aprobado"],
          aprobado2017	   : res["aprobado-pef-2017"],
          avance_fisico : res["avance-fisico"],
          calendario_fiscal_del_ciclo : res["calendario-fiscal-del-ciclo"],
          cargo_admin : res["cargo-admin"],
          ciclo : res["ciclo"],
          costo_total_ppi : res["costo-total-ppi"],
          cve_ppi : res["cve-ppi"],
          date_insert : res["date_insert"],
          desc_ppi : res["descripcion"],
          desc_ramo : res["desc-ramo"],
          desc_ur : res["desc-unidad"],
          ejercido : res["ejercido"],
          entidad_federativa : res["ent-fed"],
          fecha : res["fecha"],
          fecha_fin_cal_fiscal : res["fecha-fin-cal-fiscal"],
          fecha_fin_ff : res["fecha-fin-ff"],
          fecha_ini_cal_fiscal : res["fecha-ini-cal-fiscal"],
          fecha_ini_ff : res["fecha-ini-ff"],
          id_entidad_federativa : res["id-entidad-federativa"],
          id_ppi : res["id-ppi"],
          id_ramo : res["ramo"],
          id_ur : res["unidad"],
          latitud_inicial : res["latitud-inicial"],
          localizacion : res["localizacion"],
          longitud_inicial : res["longitud-inicial"],
          mail_admin : res["mail-admin"],
          mail_to_admin : "mailto:"+res["mail-admin"],
          meta_beneficios : res["meta-beneficios"],
          meta_fisica : res["meta-fisica"],
          modificado : res["modificado"],
          monto_total_inversion : res["monto-total-inversion"],
          nombre : res["nombre"],
          nombre_admin : res["nombre-admin"],
          telefono_admin : res["telefono-admin"],
          tipo_ppi : res["tipo-ppi"],
          total_gasto_no_consid : res["total-gasto-no-consid"],
          total_gasto_operacion_he : res["total-gasto-operacion-he"],
          ////otras fuentes de financiamiento
          recursos_estatales : res["recursos-estatales"],
          recursos_municipales : res["recursos-municipales"],
          privados	: res["privados"],
          fideicomiso : res["fideicomiso"],

          // valores extra
          presupuesto_style 	: "width:" + ((res["aprobado"] * 100) / res["costo-total-ppi"]) + "%",
          presupuesto2017_style : "width:" + ((res["aprobado-pef-2017"] * 100) / res["costo-total-ppi"]) + "%",
          total_ejercido_style  : "width:" + ((res["ejercido"] * 100) / res["costo-total-ppi"]) + "%",
          modificado_style : "width:" + ((res["modificado"] * 100) / res["costo-total-ppi"]) + "%",
          map_src		  : "http://www.openstreetmap.org/export/embed.html?bbox="+ res["longitud-inicial"]+"%2C"+res["latitud-inicial"]+"%2C"+res["longitud-inicial"]+"%2C"+res["latitud-inicial"]+"&amp;layer=mapnik",
          /// modal
          showModal: false,


        };

		// register modal component
		Vue.component('modal', {
		  template: '#modal-template'
		})

		avance_GF_donitas(data.avance_fisico);

        var fun = [],
            els = document.querySelectorAll(".GF-card");

    var head = new Vue({
              el  : "head",
              data : data,
            });

		for(let i = 0; i < els.length; i++){
          fun.push(new Vue({
          		el  : els[i],
          		data : data,
          		// define methods under the `methods` object
		  		methods: {
    	  		  // lista de faqs en modal
		  		  listfaqs : function(e) {
			  		e.currentTarget.classList.toggle("active");
    	  		  },
    	  		  // modal formulario paso 1
    	  		  step1	: function(e) {
	    	  		  var divstep0 = document.getElementById("reporte_step0");
	    	  		  var divstep1 = document.getElementById("reporte_step1");

			  		  divstep0.classList.toggle("hide");
			  		  divstep1.classList.toggle("hide");
    	  		  },
    	  		  // modal formulario paso 2
    	  		  step2	: function(e) {
	    	  		  var divstep1 = document.getElementById("reporte_step1");
	    	  	  	  var divstep2 = document.getElementById("reporte_step2");

			  		  divstep2.classList.toggle("hide");
			  		  divstep1.classList.toggle("hide");
    	  		  }
    			}
            })
          );
        }


    // GF-SHCP-map
    var mymap = L.map('GF-SHCP-map').setView([data.latitud_inicial, data.longitud_inicial], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(mymap);

    var marker = L.marker([data.latitud_inicial, data.longitud_inicial]).addTo(mymap);
  });


/*
 *
 * HUGO CODE -- otimizar después
 *
 */

// la dona del avance
function avance_GF_donitas(elvalor){
  var width = 160,
      height = 130,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["rgb(190,205,81)","rgb(210,210,210)"]);

    var arc = d3.svg.arc()
        //.outerRadius(radius - 10)
        .outerRadius(function(d,i) {
          if(i==0) {
            return radius - 10;
          }
          else {
           return radius - 20;
          }
       })
      //.innerRadius(radius - 25);
        .innerRadius(function(d,i) {
          if(i==0) {
            return radius - 25;
          }
          else {
           return radius - 15;
          }
       });

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.amount; });

    var svg = d3.select("#arc_side").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var data = [
        {"amount": elvalor },
        {"amount": 100-elvalor}
      ];

    var g = svg.selectAll(".arc")
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


    function type(d) {
      d.amount = +d.amount;
      return d;
    }
}


// la gráfica de líneas
var margin = {top: 20, right: 20, bottom: 30, left: 120},
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.year); })

    .y(function(d) { return y(d.amount); });


var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = [

  {
    "year": 2017,
    "amount": 109814311
  },
  {
    "year": 2016,
    "amount": 101313120
  },
  {
    "year": 2015,
    "amount": 208539823
  },
  {
    "year": 2014,
    "amount": 54564412
  },
  {
    "year": 2013,
    "amount": 300157683
  },
  {
    "year": 2012,
    "amount": 215044846
  },
  {
    "year": 2011,
    "amount": 25873394
  },
  {
    "year": 2010,
    "amount": 25741318
  },
  {
    "year": 2009,
    "amount": 12287059
  },
  {
    "year": 2008,
    "amount": 4337408
  },
  {
    "year": 2007,
    "amount": 0
  },
  {
    "year": 2006,
    "amount": 2385
  }

  ];



  x.domain(d3.extent(data, function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);



  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

       svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);



/*
 * LO DE CARLOS
 *
 *
 */

 /****** API **********/
  var appKey  = '5825343BB68F29D2A881B2E8D205B98846C95558';

  var estadosList = get_stateList();
  $(document).ready(function(){
    $('#reportForm').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Motivo reporte
    $(document).on("click",".btn_type", function(){
       $("#asuntoReporte").text($(this).find(".btn-content").text()+".");
    });
    //Reporte anononimo
    $(document).on("change","#anonymous", function(){
      if($("#anonymous").val() == 1){
        $("#noAnonymous").hide();
      }else{
        $("#noAnonymous").show();
      }

    });
   //Reporte general
   $(document).on("click", ".rpt-advance", function () {
     event.preventDefault();
     anonimo  = $("#anonymous").val();
     estados = estadosList.responseJSON.estado;


     //informacion de proyecto
     var carteraId = $("#cveReport").text(),
         dependencia  = $("#ejecutorReport").text(),
         programa  = $("#programaReport").text(),
         entidad   = $("#entidadReport").text(),
         nombre    = $("#nameReport").text(),
         motivo    = $("#motivoReporte").val(),
         asunto    = $("#asuntoReporte").val(),
         estadoId = "",
         paisId="2";
         testado = RemoveAccents(entidad.toLowerCase());
         for (var i = 0; i < estados.length; i++) {
           estado = RemoveAccents(estados[i].nombre.toLowerCase());
          if(estado == testado.replace(/\s/g,'')){
             estadoID = estados[i].estadoId;
             break;
           }else{
             estadoID = false;
           }
         }
    motivo = "El proyecto "+ nombre+", perteneciente al programa "+ programa +", con clave " + carteraId+", ejecutado por " + dependencia+", presenta irregularidades en su proceso.\n " + asunto + "\n"+ motivo;
    //informacion de ciudadano
    var name    = $("#name").val(),
        paterno = $("#surname").val(),
        materno = $("#lastname").val(),
        email   = $("#email").val(),
        pass    = $("#password").val(),
        genero  = $("#gender").val();


    if(anonimo == 0){
      var ciudadanoAPI = {"anonimo":false,"genero":genero,"nombre":name,"paterno":paterno,"materno":materno,"email":email,"contrasenia":pass};
    }else{
      var ciudadanoAPI = {"anonimo":true};
    }


    var dataAPI = {"ciudadano":ciudadanoAPI,"dependencia":dependencia,"estado":estadoID,"motivoPeticion":motivo,"otroPais":null,"pais":paisId,"motivoId":7,"queSolicitaron":null,"solictaronDinero":false};
    
    //console.log(estadoID, estado, estados);

    if(!estadoID) estadoID = 40;
    
    if(estadoID){
      //Request API
    /*   $.ajax({
         beforeSend: function(xhrObj){
                   xhrObj.setRequestHeader("app-key",appKey);
           },
         type: "POST",
         url: "http://devretociudadano.funcionpublica.gob.mx/SidecWS/resources/quejadenuncia/registrarPeticion",
         contentType: 'application/json; charset=utf-8',
         dataType:"json",
         processData: false,
         headers:{"app-key":appKey},
         data: JSON.stringify(dataAPI),
         success: function(dataRe){
             console.log(dataRe);
             if(dataRe.resultado == 'REGISTRO_PETICION_EXITOSO'){
              $("#respuesta_reporte").toggleClass("hide");
              $("#reporte_step2").toggleClass("hide");
                $("#folio").text(dataRe.folio);
                $("#passfolio").text(dataRe.passFolio);
                $("#successReport").show();
                $("#errorReport").hide();
             }else{
               $("#respuesta_reporte").toggleClass("hide");
              $("#reporte_step2").toggleClass("hide");
               $("#successReport").hide();
               $("#errorReport").show();
             }
           }
       });*/
    //Salvar en db
    $.ajaxSetup({headers:{'X-CSRF-Token': $('input[name="_token"]').val()}});
    $.ajax({
          type: "POST",
          url: '../denuncia/guardar',
          data: {"anonimo":anonimo,"genero":genero,"nombre":name,"paterno":paterno,"materno":materno,"email":email,"contrasenia":pass,"dependencia":dependencia,"estado":estadoID,"motivoPeticion":motivo,motivoId:"7"},
          dataType: 'json',
          success: function(dataRe){
            console.log(dataRe);
            if(dataRe){
              $("#respuesta_reporte").toggleClass("hide");
              $("#reporte_step2").toggleClass("hide");
              $("#folio").text(dataRe.folio);
              $("#passfolio").text(dataRe.passFolio);
              $("#successReport").show();
              $("#errorReport").hide();
            }else{
              $("#respuesta_reporte").toggleClass("hide");
              $("#reporte_step2").toggleClass("hide");
              $("#successReport").hide();
              $("#errorReport").show();
            }
          }
          });

   }else{
     $("#respuesta_reporte").toggleClass("hide");
     $("#reporte_step2").toggleClass("hide");
     //error
     $("#successReport").hide();
     $("#errorReport").show();
   }
   });

   function RemoveAccents(str) {
      var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
      var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
      str = str.split('');
      var strLen = str.length;
      var i, x;
      for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
          str[i] = accentsOut[x];
        }
      }
      return str.join('');
    }
  });

     function get_stateList(){
      return $.ajax({
         beforeSend: function(xhrObj){
                   xhrObj.setRequestHeader("app-key",appKey);
           },
         type: "GET",
         url: "http://devretociudadano.funcionpublica.gob.mx/SidecWS/resources/quejadenuncia/obtenerEstados/2",
         contentType: 'application/json; charset=utf-8',
         dataType:"json",
         processData: false,
         headers:{"app-key":appKey},
         success: function(dataSt){
           }
       });

    }
})(window)
