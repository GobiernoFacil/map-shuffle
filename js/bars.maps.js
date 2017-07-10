// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  
  // [1] obtiene los templates de UI
  // ----------------------------------------------------------------------
  // 
  var TEMPLATE = require("text!templates/bars-app.html"),
      FILTER   = require("text!templates/filter-item.html");

  // [2] define el constructor
  // ----------------------------------------------------------------------
  //
  var GraphsControllerConstructor = function(parent){

    var _id         = parent.settings.ui.barsTool.container,
        _slID       = parent.settings.ui.barsTool.singleLocation,
        _mlID       = parent.settings.ui.barsTool.multipleLocations,
        _container  = document.getElementById(_id),
        _sContainer = null, 
        _mContainer = null,
        _values     = null,
        _data       = null,
        _states     = parent.lists.estadosName.states,
        _cities     = parent.lists.municipiosName,
        _branches   = parent.lists.ramosName.branches,
        _units      = parent.lists.unidadesName,

        _SLStateInputID      = parent.settings.ui.barsTool.singleLocationUI.state,
        _SLCityInputID       = parent.settings.ui.barsTool.singleLocationUI.city,
        _SLLocationBtnID     = parent.settings.ui.barsTool.singleLocationUI.addLocation,
        _SLSelectedFiltersID = parent.settings.ui.barsTool.singleLocationUI.selectedFilters,
        _SLFilterListID      = parent.settings.ui.barsTool.singleLocationUI.filterList,
        _SLFilterPrefix      = parent.settings.ui.barsTool.singleLocationUI.filterPrefix,
        _SLAddGraphBtn       = parent.settings.ui.barsTool.singleLocationUI.addGraph,
        _filterDivClass      = parent.settings.ui.barsTool.filterDivClass,

        _MLFilterPrefix      = "patos",

        _valueLabel  = parent.settings.ui.barsTool.filterLabels.value,
        _yearLabel   = parent.settings.ui.barsTool.filterLabels.year,
        _stateLabel  = parent.settings.ui.barsTool.filterLabels.state,
        _cityLabel   = parent.settings.ui.barsTool.filterLabels.city,
        _branchLabel = parent.settings.ui.barsTool.filterLabels.branch,
        _unitLabel   = parent.settings.ui.barsTool.filterLabels.unit,


        SELECTALL                  = "ALL",
        SELECTALLSTATESSTRING      = "Todo México",
        SELECTALLCITIESFIRSTSTRING = "",
        SELECTALLCITIESSTRING      = "Todo el estado",
        SELECTALLBRANCHESSTRING    = "Todos los ramos",
        SELECTALLUNITSSTRING       = "Todos los ejecutores",
        SELECTALLYEARSSTRING       = "Todos los años";


  // [3] define el objeto del comparador
  // ----------------------------------------------------------------------
  //
    var controller = {

      render : function(){
        _values = parent.currentMap.config.values;
        _data   = parent.currentMap.data; 

        if(_values.length){
          this.show();
          this.renderSingleLocation();
          this.renderMultipleLocation();
          return;
        }
        else{
          this.hide();
        }
      },

      show : function(){
        _container.style.display = "block";
        _container.innerHTML = TEMPLATE;
      },

      hide : function(){
        _container.innerHTML = "";
        _container.style.display = "none";
      },

      renderSingleLocation : function(){
        var container = document.getElementById(_slID),
            state     = document.getElementById(_SLStateInputID),
            city      = document.getElementById(_SLCityInputID),
            filters   = document.getElementById(_SLFilterListID);

        this.renderStateList(state);
        this.renderCityList(city, state);
        this.renderOptions(filters);

        container.addEventListener("submit", function(e){e.preventDefault()});
      },

      renderMultipleLocation : function(){

      },

      renderOptions : function(container, type){
        var filtersA = parent.currentMap.config.filters,
            filtersB = parent.currentMap.config.extraFilters,
            branch   = this._findFilter("branch", filtersA),
            unit     = this._findFilter("unit", filtersA),
            year     = this._findFilter("year", filtersA);

        this.renderValueList(container, type);

        if(branch){
          this.renderBranchList(branch, container, type);
        }

        if(unit){
          this.renderUnitList(branch, unit, container, type);
        }

        if(year){
          this.renderYearList(year, container, type);
        }

        if(filtersB.length){
          filtersB.forEach(function(fil){
            this.renderOtherFilter(fil, container, type);
          }, this);
        }
      },

      renderValueList : function(container, type){
        var div      = document.createElement("div"),
            select   = null,
            template = _.template(FILTER),
            firstVal = _values[0],
            obj      = {
              id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + firstVal,
              label     : _valueLabel,
              dataField : firstVal
            },
            html     = template(obj);

        div.setAttribute("class", _filterDivClass);
        div.innerHTML = html;
        select = div.querySelector("select");

        _values.forEach(function(val){
          var opt = document.createElement("option");

          opt.innerHTML = val;
          select.appendChild(opt);
        });


        container.appendChild(div);
      },

      renderStateList : function(state){
        var optAll   = document.createElement("option"),
            stateCol = parent.currentMap.config.location.state;

        if(!stateCol) return;


        state.innerHTML = "";
        state.setAttribute("data-field", stateCol);

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLSTATESSTRING;
        state.appendChild(optAll);

        _states.forEach(function(st){
          var opt = document.createElement("option");

          opt.value     = st.id;
          opt.innerHTML = st.name;

          state.appendChild(opt);
        });
      },

      renderCityList : function(city, state){
        var stateVal = state.value,
            optAll   = document.createElement("option"),
            stateCol = parent.currentMap.config.location.state,
            cityCol  = parent.currentMap.config.location.city;


        if(!stateCol || !cityCol) return;

        city.innerHTML = "";
        city.setAttribute("data-field", cityCol);

        optAll.value     = SELECTALL;
        optAll.innerHTML = +stateVal ? SELECTALLSTRING : SELECTALLCITIESFIRSTSTRING;
        city.appendChild(optAll);
      },

      renderYearList : function(filter, container, type){
        console.log("!!!!!!!!");
        var optAll   = document.createElement("option"),
            yearCol  = filter.field,
            _year    = document.createElement("div"),
            year     = null,
            template = _.template(FILTER),
            obj      = {
                         id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + yearCol,
                         label     : _yearLabel,
                         dataField : yearCol
                       },
            years    = _.uniq(_data.map(function(d){
                         return d[yearCol];
                       })).filter(function(yr){ return +yr}).sort();

        optAll.value      = SELECTALL;
        optAll.innerHTML  = SELECTALLYEARSSTRING;
        _year.innerHTML = template(obj);
        year  = _year.querySelector("select");

        year.setAttribute("data-field", yearCol);

        year.appendChild(optAll);

        years.forEach(function(yr){
          var opt = document.createElement("option");

          opt.value     = yr;
          opt.innerHTML = yr;

          year.appendChild(opt);
        });

        container.appendChild(_year);
      },

      renderBranchList : function(filter, container, type){
        var optAll   = document.createElement("option"),
            branchCol = filter.field,
            _branch   = document.createElement("div"),
            branch    = null,
            template  = _.template(FILTER),
            obj       = {
                          id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + branchCol,
                          label     : _branchLabel,
                          dataField : branchCol
                        };

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLBRANCHESSTRING;
        _branch.innerHTML = template(obj);
        branch  = _branch.querySelector("select");

        branch.setAttribute("data-field", branchCol);

        branch.appendChild(optAll);

        
        _branches.forEach(function(br){
          var opt = document.createElement("option");

          opt.value     = br.id;
          opt.innerHTML = br.name;

          branch.appendChild(opt);
        });
        

        container.appendChild(_branch);
      },

      renderUnitList : function(branch, filter, container, type){
        var optAll   = document.createElement("option"),
            unitCol  = filter.field,
            _unit    = document.createElement("div"),
            unit     = null,
            template = _.template(FILTER),
            obj      = {
                         id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + unitCol,
                         label     : _unitLabel,
                         dataField : unitCol
                       };

        if(!branch) return;

        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLUNITSSTRING;
        _unit.innerHTML = template(obj);
        unit  = _unit.querySelector("select");

        unit.setAttribute("data-field", unitCol);

        unit.appendChild(optAll);

        container.appendChild(_unit);
      },

      /*
      var stateVal = state.value,
            optAll   = document.createElement("option"),
            stateCol = parent.currentMap.config.location.state,
            cityCol  = parent.currentMap.config.location.city;


        if(!stateCol || !cityCol) return;

        city.innerHTML = "";
        city.setAttribute("data-field", cityCol);

        optAll.value     = SELECTALL;
        optAll.innerHTML = +stateVal ? SELECTALLSTRING : SELECTALLCITIESFIRSTSTRING;
        city.appendChild(optAll);
      */

      renderOtherFilter : function(container, type){

      },

      _findFilter : function(name, list){
        return list.filter(function(filter){
          return filter.type == name;
        })[0];
      }
      
    };

    return controller;
  }

  return GraphsControllerConstructor;
});