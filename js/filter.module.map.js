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
  SEARCH               = require("text!templates/search-item.html"),

  CLEARFILTERSBTN      = require("text!templates/clear-filter-item.html"),

  selectize            = require("selectize"),
  FILTERCONTAINER      = "div",
  FILTERCONTAINERCLASS = "col-sm-4",
  PREFIX               = "GF-SHCP-FILTER-",
  SELECTALL            = "tooooooooodo",
  SELECTALLSTATES      = "Todo México",
  SELECTSTATELABEL     = "Estado",
  SELECTEMPTYCITY      = "",
  SELECTALLCITIES      = "Selecciona un municipio",
  SELECTCITYLABEL      = "Municipio",
  SELECTALLBRANCHES    = "Todos los ramos",
  SELECTBRANCHLABEL    = "Ramo",
  SELECTEMPTYUNIT      = "",
  SELECTALLUNITS       = "Selecciona una unidad ejecutora",
  SELECTUNITLABEL      = "Unidad ejecutora",
  CLEARCLASS           = "GF-SHCP-clear-filters",
  CLEARTEXT            = "limpiar filtros",
  SELECTALLTEXT        = "Selecciona un filtro";

  var filterDataConstructor = function(parent, cart, callback, className, pageSize, isGraph){

    var filterModule  = {
      filters      : [],
      cart         : cart,
      stateSelect  : null,
      citySelect   : null,
      branchSelect : null,
      unitSelect   : null,
      data         : null,
      filteredData : null,
      searchInput  : null,
      searchInputs : [],
      latestFilter : null,

      filter : function(){

        var filterCols = _.uniq(_.pluck(this.filters, "field")),
            _data      = parent.currentMap.data.slice(),
            isApi      = parent.currentMap.config.api,
            pagination = {},
            searchField,
            value;


        filterCols.forEach(function(field){
          _data = this._filterData(_data, field, this.filters);
        }, this);

        if(this.searchInput && this.searchInput.value){
          searchField = this.searchInput.getAttribute("data-field");
          value = this.searchInput.value.toLowerCase();
          _data = _data.filter(function(d){
            var str = d[searchField].toLowerCase();
            return str.search(value) != -1;
          });
        }

        pagination.pages = Math.ceil( _data.length / (pageSize || 1) );

        callback(_data, this.filters, pagination, this.latestFilter);
      },

      _filterData : function(_data, field, _filters){
        // _data es una copia del set completo de datos del mapa actual
        // field es el campo de la db que se va a filtrar (string), 
        // _filters es la lista de filtros de la instancia de este módulo (this.filters)
        if(!_data.length) return _data;

        // se seleccionan los filtros que coinciden con el campo a filtrar
        var filters = _filters.filter(function(fil){
                        return fil.field == field;
                      }),
        // se revisa qué tipo de dato se va a comparar
            isString  = _.isString(_data[0][field]),
        // se obtiene el tipo de filtro
            type      = filters[0].type,
        // se obtienen todos los valores que pasarán el filtro
            compArray = _.pluck(filters, "value"),
            extraIsString,

            _selectedStates,
            selectedStates,
            _filteredStates,
            filteredStates,
            
            _selectedBranches,
            selectedBranches,
            _filteredBranches,
            filteredBranches;

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
          _selectedBranches = _filters.filter(function(fil){
            return fil.type == "branch";
          });

          selectedBranches  = _.pluck(_selectedBranches, "value"),
          _filteredBranches = _.pluck(filters, "parentFilter"),
          filteredBranches  = _.difference(selectedBranches, _filteredBranches);

          if(_selectedBranches.length && _.isNumber(_data[0][_selectedBranches[0].field]) ){
            filteredBranches = filteredBranches.map(function(br){ return +br;});
          }

          
          _data = _data.filter(function(d){
            if(_selectedBranches.length){
              return compArray.indexOf(d[field]) != -1 || filteredBranches.indexOf(d[_selectedBranches[0].field]) != -1;
            }
            else{
              return compArray.indexOf(d[field]) != -1;
            }
          });
          

        }

        else if(type == "city"){
          _selectedStates = _filters.filter(function(fil){
            return fil.type == "state";
          });

          selectedStates  = _.pluck(_selectedStates, "value"),
          _filteredStates = _.pluck(filters, "parentFilter"),
          filteredStates  = _.difference(selectedStates, _filteredStates);

          if(_selectedStates.length && _.isNumber(_data[0][_selectedStates[0].field]) ){
            filteredStates = filteredStates.map(function(st){ return +st;});
          }

          _data = _data.filter(function(d){
            if(_selectedStates.length){
              return compArray.indexOf(d[field]) != -1 || filteredStates.indexOf(d[_selectedStates[0].field]) != -1;
            }
            else{
              return compArray.indexOf(d[field]) != -1;
            }
          });
        }
        else{

        }

        return _data;
      },

      renderSearchInput : function(filter, container){
        var 
            col       = filter.field,
            item      = document.createElement(FILTERCONTAINER),
            template  = _.template(SEARCH),
            //states    = parent.lists.estadosName.states,
            html, obj, form, input;

        obj = {
          id        : PREFIX + _.uniqueId(),
          label     : filter.title || col,
          dataField : col,
          className : (className || "col-sm-4")
        };

        item.innerHTML = template(obj);
        input = item.querySelector("input");
        form  = item.querySelector("form");

        container.appendChild(item);

        this.searchInput = input;

        this.searchInputs.push(input);

        this.enableSearch(filter, form, input);

        return input;
      },

      enableSearch : function(filter, form, input){
        var that = this;
        form.addEventListener("submit", function(e){
          e.preventDefault();
          that.filter();
        });
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
          dataField : col,
          className : (className || "col-sm-4"),
          tooltip   : "happy"
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

        filter.field = parent.cityID;

        obj = {
          id        : PREFIX + _.uniqueId(),
          label     : SELECTCITYLABEL,
          dataField : col,
          className : (className || "col-sm-4"),
          tooltip   : "happy"
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
          dataField : col,
          className : (className || "col-sm-4"),
          tooltip   : "happy"
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
          dataField : col,
          className : (className || "col-sm-4"),
          tooltip   : "happy"
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

        filter.field = parent.unitID;

        obj = {
          id        : PREFIX + _.uniqueId(),
          label     : SELECTUNITLABEL,
          dataField : col,
          className : (className || "col-sm-4"),
          tooltip   : "happy"
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
            list, html, obj, select, $select;

        obj = {
          id        : PREFIX + _.uniqueId(),
          label     : filter.title || col,
          dataField : col,
          className : (className || "col-sm-4"),
          tooltip   : "happy"
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

        $select = $("#" + obj.id).selectize({items : ["rojo", "negro"]});

        this.enableFilteringV2(filter, $select);

        return item;
      },

      renderCartItem : function(filter){
         var container = this.cart,
            li         = document.createElement("li"),
            html       = "",
            that       = this;
        
        if(!container.querySelector("." + CLEARCLASS)){
          this.renderClearFilterBtn(container);
        }

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

        li.setAttribute("data-type", filter.type);

        container.appendChild(li);

        li.addEventListener("click", function(e){
          this.parentNode.removeChild(this);
          that.filters.splice(that.filters.indexOf(filter), 1);
          that.filter();
        });
      },

      renderClearFilterBtn : function(container){
        var li         = document.createElement("li"),
            html       = "",
            that       = this;

        li.innerHTML = CLEARTEXT;
        li.setAttribute("class", CLEARCLASS);

        container.appendChild(li);

        li.addEventListener("click", function(e){
          that.filters = [];
          that.cart.innerHTML = "";
          that.searchInputs.forEach(function(sr){sr.value = "";});
          that.filter();
        });
      },

      renderClearFilterBtn2 : function(container){
        var div    = document.createElement("div"),
            that   = this,
            anchor;

        div.innerHTML = CLEARFILTERSBTN;
        div.setAttribute("class", CLEARCLASS);
        anchor = div.querySelector("a");
        container.appendChild(div);

        anchor.addEventListener("click", function(e){
          e.preventDefault();
          that.filters = [];
          that.cart.innerHTML = "";
          that.searchInputs.forEach(function(sr){sr.value = "";});
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
                return fil.type == filter.type && fil.value == value;
              })[0];

          if(value == SELECTALL || exist){
            select.value = SELECTALL;
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
              parentFilter : parentFilter,
              label        : value
            };

            that.findLabel(newFilter);
            
            that.filters.push(newFilter);

            that.latestFilter = newFilter;
          }

          that.renderCartItem(newFilter);

          if(filter.type == "state" && that.citySelect){
            that.updateCitySelector(select, that.citySelect);
          }

          if(filter.type == "branch" && that.unitSelect){
            that.updateUnitSelector(select, that.unitSelect);
          }

          that.filter();

          select.value = SELECTALL;
        });
      },

      enableFilteringV2 : function(filter, _select){

        var that   = this,
            select = _select[0].selectize,
            newFilter,
            parentFilter;
        select.on("change", function(e){

          var value = select.items[0],
              exist = that.filters.filter(function(fil){
                return fil.type == filter.type && fil.value == value;
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
              parentFilter : parentFilter,
              label        : value
            };

            that.findLabel(newFilter);

            that.filters.push(newFilter);

            that.latestFilter = newFilter;
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

      findLabel : function(filter){
        if(filter.type == "branch"){
          filter.label = parent.lists.ramosName.branches.filter(function(br){ 
            return  +br.id == +filter.value
          })[0].name;
        }
        else if(filter.type == "unit"){
          filter.label = parent.lists.unidadesName.units.filter(function(un){
            return un.key == filter.value;
          })[0].name;
        }

        else if(filter.type == "state"){
          filter.label = parent.lists.estadosName.states.filter(function(br){ 
            return  +br.id == +filter.value;
          })[0].name;
        }
        else if(filter.type == "city"){
          filter.label = parent.lists.municipiosName.cities.filter(function(ct){
            return ct.inegi == +filter.value;
          })[0].name;
        }
        else{
          filter.label = filter.value;
        }
      },

      _makeList : function(data, filter){
        return _.compact(_.uniq(_.pluck(data, filter.field))).sort();
      },

      _setUniq : function(types, filter){

        this.latestFilter = null;
        this._removeFilters(types);
        this.renderCartItem(filter);
        this.filters.push(filter);
        this.filter();
        //this.filter();

      },

      _removeFilters : function(types){
        
        types.forEach(function(type){
        
          var liItems = this.cart.querySelectorAll("[data-type=" + type +"]");
          for(var i = 0; i < liItems.length; i++){
            liItems[i].parentNode.removeChild(liItems[i]);
          }

          var filters = this.filters.filter(function(fil){
            return fil.type == type;
          }, this);


          this.filters = _.difference(this.filters, filters);

        }, this);
        
      },

      _enableDefaultFilters : function(){
        
        var _defaultFilters = parent.currentMap.config.defaultFilters;

        if(!_defaultFilters) return;

        _defaultFilters.forEach(function(d){
          this.findLabel(d);
          d.id    = _.uniqueId();
          d.value = String(d.value);
          d.field = parent.currentMap.config.filters.filter(function(fi){
            return fi.type == d.type;
          })[0].field || null;

          this.filters.push(d);
          this.renderCartItem(d);
        }, this);


      },
      _clearFilters : function(){
        this.filters = [];
        this.cart.innerHTML = "";
        this.searchInputs.forEach(function(sr){sr.value = "";});
      }
    };

    return filterModule;
  }

  return filterDataConstructor;
});