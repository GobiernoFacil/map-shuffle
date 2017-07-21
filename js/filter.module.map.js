// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  underscore           = require("underscore"),
  FILTER               = require("text!templates/filter-item.html"),
  FILTERV2             = require("text!templates/filter-item-v2.html"),
  FILTERCONTAINER      = "div",
  FILTERCONTAINERCLASS = "col-sm-4",
  PREFIX               = "GF-SHCP-FILTER-",
  SELECTALL            = "tooooooooodo",
  SELECTALLSTATES      = "Todo México",
  SELECTSTATELABEL     = "estado",
  SELECTEMPTYCITY      = "",
  SELECTALLCITIES      = "selecciona un municipio",
  SELECTCITYLABEL      = "municipio",
  SELECTALLBRANCHES    = "Todos los ramos",
  SELECTBRANCHLABEL    = "ramo",
  SELECTEMPTYUNIT      = "",
  SELECTALLUNITS       = "selecciona una unidad ejecutora",
  SELECTUNITLABEL      = "unidad ejecutora",
  SELECTALLTEXT        = "selecciona un filtro";

  var filterDataConstructor = function(parent){

    var filterModule  = {
      filter : function(data, filters){

      },

      renderStateSelector : function(filter, container){
        var optAll    = document.createElement("option"),
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
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
      },

      renderCitySelector : function(filter, container){
        var optAll   = document.createElement("option"),
            col      = filter.field,
            item     = document.createElement(FILTERCONTAINER),
            template = _.template(FILTER),
            //cities   = parent.lists.municipiosName.cities,
            html, obj, select;

        obj = {
          id        : PREFIX + _.uniq(),
          label     : SELECTCITYLABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select         = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTEMPTYCITY;

        select.appendChild(optAll);

        /*
        cities.forEach(function(st){
          var opt = document.createElement("option");

          opt.value     = st.inegi;
          opt.innerHTML = st.name;

          select.appendChild(opt);
        });
        */

        container.appendChild(item);

        return item;
      },

      renderBranchSelector : function(filter, container){
        var optAll    = document.createElement("option"),
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
            template  = _.template(FILTER),
            branches  = parent.lists.ramosName.branches,
            html, obj, select;

        obj = {
          id        : PREFIX + _.uniq(),
          label     : SELECTBRANCHLABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLBRANCHES;

        select.appendChild(optAll);
        
        branches.forEach(function(st){
          var opt = document.createElement("option");

          opt.value     = st.id;
          opt.innerHTML = st.name;

          select.appendChild(opt);
        });

        container.appendChild(item);

        return item;
      },

      renderBranchSelectorV2 : function(filter, container){
        var optAll    = document.createElement("li"),
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
            template  = _.template(FILTERV2),
            branches  = parent.lists.ramosName.branches,
            html, obj, select;

        obj = {
          id        : PREFIX + _.uniq(),
          label     : SELECTBRANCHLABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select = item.querySelector("ul");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLBRANCHES;

        select.appendChild(optAll);
        
        branches.forEach(function(st){
          var opt = document.createElement("li");

          //opt.value     = st.id;
          opt.setAttribute("data-value", st.id);
          opt.innerHTML = st.name;

          select.appendChild(opt);
        });

        container.appendChild(item);

        // enableFilteringV2 : function(ul, field, value){

        this.enableFilteringV2(container, col, "data-value");
        return item;
      },

      renderUnitSelector : function(filter, container){
        var optAll   = document.createElement("option"),
            col      = filter.field,
            item     = document.createElement(FILTERCONTAINER),
            template = _.template(FILTER),
            //units   = parent.lists.unidadesName.units,
            html, obj, select;

        obj = {
          id        : PREFIX + _.uniq(),
          label     : SELECTUNITLABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select         = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTEMPTYUNIT;

        select.appendChild(optAll);

        /*
        cities.forEach(function(st){
          var opt = document.createElement("option");

          opt.value     = st.inegi;
          opt.innerHTML = st.name;

          select.appendChild(opt);
        });
        */

        container.appendChild(item);

        return item;
      },

      renderOtherSelector : function(filter, container){
        var optAll    = document.createElement("option"),
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
            template  = _.template(FILTER),
            list, html, obj, select;

        obj = {
          id        : PREFIX + _.uniq(),
          label     : filter.title || col,
          dataField : col
        };

        item.innerHTML = template(obj);
        select = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLTEXT;

        select.appendChild(optAll);


        list = this._makeList(parent.currentMap.data, filter);
        
        list.forEach(function(st){
          var opt = document.createElement("option");

          opt.value     = st;
          opt.innerHTML = st;

          select.appendChild(opt);
        });
        

        container.appendChild(item);

        return item;
      },

      updateCitySelector : function(state, city){
        
      },

      updateUnitSelector : function(branch, unit){

      },

      enableFilteringV2 : function(ul, field, value){
        var _items = ul.querySelectorAll("li"),
            items  = Array.prototype.slice.apply(_items);

        console.log(items, ul, field, value);
      },

      _makeList : function(data, filter){
        return _.compact(_.uniq(_.pluck(data, filter.field))).sort();
      },
    };

    return filterModule;
  }

  return filterDataConstructor;
});