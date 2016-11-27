var GF_app = {
  
  // routes
  endpoints : {
    avances     : "http://api.datos.gob.mx/v1/prog-avance-de-indicadores",
    diccionario : "http://api.datos.gob.mx/v1/diccionario",
    opa         : "http://api.datos.gob.mx/v1/proyectos-opa"
  },

  // data
  definitions : null,

  initialize : function(){
    this.get_definitions();
  },

  get_opa : function(setup){
    var that    = this, 
        request = new XMLHttpRequest(),
        url     = !setup ? this.endpoints.opa : this.endpoints.opa + "?" + this._toUrl(setup);


    request.open('GET', url, true);
    request.onload = function(){
      if (this.status >= 200 && this.status < 400){
        var resp = JSON.parse(this.response);
        console.log(resp);
      } 
      else{
      }
    };

    request.onerror = function(){

    };

    request.send();
  },

  get_definitions : function(){
    var that    = this,
        request = new XMLHttpRequest(),
        url     = this.endpoints.diccionario;
    
    request.open('GET', url, true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400){
        // Success!
        var resp = JSON.parse(this.response);
        that.definitions = resp.results;
      } 
      else{
        that.definitions = [];
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function(){
      // There was a connection error of some sort
    };
    request.send();
  },

  _toUrl : function(obj){
    return Object.keys(obj).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join('&');
  }
};

GF_app.initialize();