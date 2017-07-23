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

  var filterDataConstructor = function(parent, cart, callback){

    var filterModule  = {
      filters      : [],
      cart         : cart,
      stateSelect  : null,
      citySelect   : null,
      branchSelect : null,
      unitSelect   : null,
      data         : null,
      filteredData : null,
      
      filter : function(){
        var filterCols = _.uniq(_.pluck(this.filters, "field")),
            _data      = parent.currentMap.data.slice();


        filterCols.forEach(function(field){
          _data = this._filterData(_data, field, this.filters);
        }, this);

        console.log(_data);
      },

      _filterData : function(_data, field, _filters){
        var filters = _filters.filter(function(fil){
                        return fil.field == field;
                      }),
            isString  = _.isString(_data[0][field]),
            type      = filters[0].type,
            compArray = _.pluck(filters, "value"),
            extraIsString;


        if(isString){
          compArray = compArray.map(function(comp){
            return String(comp);
          });
        }
        else{
          compArray = compArray.map(function(comp){
            return Number(comp);
          });
        }

        if(type != "unit" && type != "city"){
          _data = _data.filter(function(d){
            return compArray.indexOf(d[field]) != -1;
          });
        }
        else if(type == "unit"){
          console.log("nope, is unit ");
        }

        else if(type == "city"){
          console.log("nope, is city");
        }
        else{

        }

        return _data;
      },

      renderStateSelector : function(filter, container){
        var optAll    = document.createElement("option"),
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
            template  = _.template(FILTER),
            states    = parent.lists.estadosName.states,
            html, obj, select;

        obj = {
          id        : PREFIX + _.uniqueId(),
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

        this.enableFiltering(filter, select);
        this.stateSelect = select;
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
          id        : PREFIX + _.uniqueId(),
          label     : SELECTCITYLABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select         = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTEMPTYCITY;

        select.appendChild(optAll);

        container.appendChild(item);

        this.citySelect = select;
        this.enableFiltering(filter, select);

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
          id        : PREFIX + _.uniqueId(),
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

        this.enableFiltering(filter, select);

        this.branchSelect = select;
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
          id        : PREFIX + _.uniqueId(),
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
          id        : PREFIX + _.uniqueId(),
          label     : SELECTUNITLABEL,
          dataField : col
        };

        item.innerHTML = template(obj);
        select         = item.querySelector("select");

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTEMPTYUNIT;

        select.appendChild(optAll);
        container.appendChild(item);

        this.unitSelect = select;

        this.enableFiltering(filter, select);
        return item;
      },

      renderOtherSelector : function(filter, container){
        var optAll    = document.createElement("option"),
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
            template  = _.template(FILTER),
            list, html, obj, select;

        obj = {
          id        : PREFIX + _.uniqueId(),
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

        this.enableFiltering(filter, select);

        return item;
      },

      renderCartItem : function(filter){
         var container = this.cart,
            li         = document.createElement("li"),
            html       = "",
            that       = this;

        if(filter.type == "branch"){
          html = parent.lists.ramosName.branches.filter(function(br){ 
            return  +br.id == +filter.value
          })[0].name;
        }
        else if(filter.type == "unit"){
          html = parent.lists.unidadesName.units.filter(function(un){
            return un.key == filter.value;
          })[0].name;
        }

        else if(filter.type == "state"){
          html = parent.lists.estadosName.states.filter(function(br){ 
            return  +br.id == +filter.value;
          })[0].name;
        }
        else if(filter.type == "city"){
          html = parent.lists.municipiosName.cities.filter(function(ct){
            return ct.inegi == +filter.value;
          })[0].name;
        }
        else{
          html = filter.value;
        }

        li.innerHTML = html;

        container.appendChild(li);

        li.addEventListener("click", function(e){
          this.parentNode.removeChild(this);
          that.filters.splice(that.filters.indexOf(filter), 1);
          that.filter();
        });
      },

      updateCitySelector : function(state, city){
        var _cities = parent.lists.municipiosName.cities,
            state   = state.value,
            optAll  = document.createElement("option"),
            //cities   = parent.lists.unidadesName.cities,
            html ,cities;

        if(state == SELECTALL){
          city.innerHTML   = "";
          optAll.value     = SELECTALL;
          optAll.innerHTML = SELECTEMPTYcitie;
          city.appendChild(optAll);
        }
        else{
          city.innerHTML   = "";
          optAll.value     = SELECTALL;
          optAll.innerHTML = SELECTALLCITIES;
          city.appendChild(optAll);

          cities = _cities.filter(function(ct){
            return ct.state == state;
          });

          cities.forEach(function(ct){
            var opt = document.createElement("option");

            opt.value     = ct.inegi;
            opt.innerHTML = ct.name;

            city.appendChild(opt);
          });
        }
      },

      updateUnitSelector : function(branch, unit){
        var _units   = parent.lists.unidadesName.units,
            branch   = branch.value,
            optAll   = document.createElement("option"),
            //units   = parent.lists.unidadesName.units,
            html ,units;

        if(branch == SELECTALL){
          unit.innerHTML   = "";
          optAll.value     = SELECTALL;
          optAll.innerHTML = SELECTEMPTYUNIT;
          unit.appendChild(optAll);
        }
        else{
          unit.innerHTML   = "";
          optAll.value     = SELECTALL;
          optAll.innerHTML = SELECTALLUNITS;
          unit.appendChild(optAll);

          units = _units.filter(function(unit){
            return unit.branch == branch;
          });

          units.forEach(function(un){
            var opt = document.createElement("option");

            opt.value     = un.key;
            opt.innerHTML = un.name;

            unit.appendChild(opt);
          });
        }
      },

      enableFiltering : function(filter, select){
        var that = this,
            newFilter,
            parentFilter;
        select.addEventListener("change", function(e){

          var value = select.value,
              exist = that.filters.filter(function(fil){
                return fil.type == filter.type && fil.value == select.value;
              })[0];

          if(value == SELECTALL || exist){
            return;
          }
          else{
            if(filter.type == "city"){
              if(String(value).length == 5){
                parentFilter = value.slice(0,2);
              }
              else{
                parentFilter = value.slice(0,1);
              }
            }
            else if(filter.type == "unit"){
              parentFilter = value.split("-")[0];
            }
            else{
              parentFilter = null;
            }

            newFilter = {
              id           :  _.uniqueId(),
              value        : value,
              type         : filter.type,
              field        : filter.field,
              parentFilter : parentFilter
            };

            that.filters.push(newFilter);
          }

          that.renderCartItem(newFilter);

          if(filter.type == "state" && that.citySelect){
            that.updateCitySelector(select, that.citySelect);
          }

          if(filter.type == "branch" && that.unitSelect){
            that.updateUnitSelector(select, that.unitSelect);
          }

          that.filter();
        });
      },

      enableFilteringV2 : function(ul, field, value){
        var _items = ul.querySelectorAll("li"),
            items  = Array.prototype.slice.apply(_items);
      },

      _makeList : function(data, filter){
        return _.compact(_.uniq(_.pluck(data, filter.field))).sort();
      },
    };

    return filterModule;
  }

  return filterDataConstructor;
});