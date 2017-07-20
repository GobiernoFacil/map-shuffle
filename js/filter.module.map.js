// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  FILTER               = require("text!templates/filter-item.html"),
  FILTERCONTAINER      = "div",
  FILTERCONTAINERCLASS = "col-sm-4",
  underscore           = require("underscore"),
  PREFIX               = "GF-SHCP-FILTER-",
  SELECTALL            = "tooooooooodo",
  SELECTALLSTATES      = "Todo México",
  SELECTSTATELABEL     = "estado";

  var filterDataConstructor = function(parent){

    var filterModule  = {
      filter : function(data, filters){

      },

      renderStateSelector : function(filter, container){
        var optAll    = document.createElement("option"),
            col       = filter.field,
            item = document.createElement(FILTERCONTAINER),
            template  = _.template(FILTER),
            states    = parent.lists.estadosName.states,
            html, obj, select;

        obj = {
          id        : PREFIX + _.uniq(),
          label     : SELECTSTATELABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLSTATES;

        select.appendChild(optAll);
        
        states.forEach(function(st){
          var opt = document.createElement("option");

          opt.value     = st.id;
          opt.innerHTML = st.name;

          select.appendChild(opt);
        });

        container.appendChild(item);

        return item;
      }
    };

    return filterModule;
  }

  return filterDataConstructor;
});