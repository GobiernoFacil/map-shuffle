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
        _branches   = parent.lists.ramosName,
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
        SELECTALLCITIESSTRING      = "Todo el estado";


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
            filtersB = parent.currentMap.config.extraFilters;

        this.renderValueList(container, type);

        if(this._findFilter("branch", filtersA)){
          this.renderBranchList(container, type);
        }

        if(this._findFilter("unit", filtersA)){
          this.renderUnitList(container, type);
        }

        if(this._findFilter("year", filtersA)){
          this.renderYearList(container, type);
        }

        if(filtersB.length){
          this.renderOtherFilters(container, type);
        }
      },

      renderValueList : function(container, type){
        var div      = document.createElement("div"),
            template = _.template(FILTER),
            firstVal = _values[0],
            obj      = {
              id        : (type ? _SLFilterPrefix : _MLFilterPrefix) + firstVal,
              label     : _valueLabel,
              dataField : firstVal,
              options   : _values,
            },
            html     = template(obj);
        div.setAttribute("class", _filterDivClass);
        div.innerHTML = html;

        container.appendChild(div);
      },

      renderStateList : function(state){
        var optAll   = document.createElement("option"),
            stateCol = parent.currentMap.config.location.state;

        console.log(stateCol);
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

      renderBranchList : function(container, type){

      },

      renderUnitList : function(container, type){
        
      },

      renderOtherFilters : function(container, type){

      }

      _findFilter : function(name, list){
        return list.filter(function(filter){
          filter.type == name;
        }).length;
      }
      
    };

    return controller;
  }

  return GraphsControllerConstructor;
});