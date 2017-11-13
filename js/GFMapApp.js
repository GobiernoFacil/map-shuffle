(function(){
  /* 
   * Dependency validation
   * ----------------------------------------------------------------
   */
  var d3RequiredMessage      = "d3 is a hard dependency; please include it :D",
      leafletRequiredMessage = "Leaflet is a hard dependency; please include it :D";
  
  if(typeof(d3) != "object"){
    console.log(d3RequiredMessage); 
    return;
  }

  if(typeof(L) != "object"){
    console.log(leafletRequiredMessage); 
    return;
  }


  /*
   * The default config object
   * ----------------------------------------------------------------
   */

   var DefaultConfg = {};


  /*
   * The constructor
   * ----------------------------------------------------------------
   */
  var GFMapAppConstructor = function(settings){


    var GFMapApp = {
      
      //
      // the initialize method, must be invoqued after the instance creation
      //
      initialize : function(){
        if(typeof(settings) == "string"){

        }
        else if(typeof(settings) == "object"){
          GFMapApp.settings = _deepExtend(DefaultConfg, settings);
          GFMapApp.renderMap();
        }
        else{
          return;
        }

        console.log(GFMapApp.settings);

        //GFMapApp.renderMap();

      },

      // 
      // the map drawing method
      //
      renderMap : function(){
        GFMapApp.map = L.map(GFMapApp.settings.mapId);
      }
    };


  /*
   * The helper functions
   * ----------------------------------------------------------------
   */

    //
    // the deepExtend helper from:
    // http://youmightnotneedjquery.com/
    //
    var _deepExtend = function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
          var obj = arguments[i];
          if (!obj) continue;
            

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] === 'object')
                out[key] = deepExtend(out[key], obj[key]);
              else
                out[key] = obj[key];
            }
          }
        }
        return out;
    }

// var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    return GFMapApp;
  };

  window.GFMapApp = GFMapAppConstructor;
}());