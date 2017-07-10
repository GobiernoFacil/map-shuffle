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
          this.renderUnitList(unit, container, type);
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
            //optAll   = document.createElement("option"),
            select   = null,
            template = _.template(FILTER),
            firstVal = _values[0],
            //items    = _values.map(function(val){ return {id : val, name : val} }),
            obj      = {
              id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + firstVal,
              label     : _valueLabel,
              dataField : firstVal,
              //options   : items,
              //all       : SELECTALL,
              //allText   : SELECTALLSTATESSTRING
            },
            html     = template(obj);

        div.setAttribute("class", _filterDivClass);
        div.innerHTML = html;
        select = div.querySelector("select");
        //optAll.value = SELECTALL;
        //optAll.innerHTML = 

        _values.forEach(function(val){

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
        // SELECTALLCITIESFIRSTSTRING
      },

      renderYearList : function(container, type){

      },

      renderBranchList : function(filter, container, type){
        console.log(filter);

        var branchCol = filter.field,
            _branch   = document.createElement("div"),
            branch    = null,
            template  = _.template(FILTER),
            obj       = {
                          id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + branchCol,
                          label     : "yoooma",//_branchLabel,
                          dataField : branchCol,
                          options   : _branches,
                          all       : SELECTALL,
                          allText   : SELECTALLBRANCHESSTRING
                        };

        _branch.innerHTML = template(obj);
        branch  = _branch.querySelector("select");

        branch.setAttribute("data-field", branchCol);
        //optAll.value     = SELECTALL;
        //optAll.innerHTML = SELECTALLBRANCHESSTRING;
        //branch.appendChild(optAll);

        /*
        _branches.forEach(function(br){
          var opt = document.createElement("option");

          opt.value     = br.id;
          opt.innerHTML = br.name;

          branch.appendChild(opt);
        });
        */

        container.appendChild(_branch);
      },
      /*
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
      */

      renderUnitList : function(container, type){
        
      },

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