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
        _slBtnID    = parent.settings.ui.barsTool.singleLocationBtn,
        _mlBtnID    = parent.settings.ui.barsTool.multipleLocationBtn,
        _container  = document.getElementById(_id),
        _sContainer = null, 
        _mContainer = null,
        _values     = null,
        _data       = null,
        _states     = parent.lists.estadosName.states,
        _cities     = parent.lists.municipiosName.cities,
        _branches   = parent.lists.ramosName.branches,
        _units      = parent.lists.unidadesName.units,

        _SLStateInputID      = parent.settings.ui.barsTool.singleLocationUI.state,
        _SLCityInputID       = parent.settings.ui.barsTool.singleLocationUI.city,
        _SLLocationBtnID     = parent.settings.ui.barsTool.singleLocationUI.addLocation,
        _SLSelectedFiltersID = parent.settings.ui.barsTool.singleLocationUI.selectedFilters,
        _SLFilterListID      = parent.settings.ui.barsTool.singleLocationUI.filterList,
        _SLFilterPrefix      = parent.settings.ui.barsTool.singleLocationUI.filterPrefix,
        _SLAddGraphBtn       = parent.settings.ui.barsTool.singleLocationUI.addGraph,
        _filterDivClass      = parent.settings.ui.barsTool.filterDivClass,

        _MLFilterPrefix      = "patos",
        _MLSelectedFiltersID = "patos",

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
        SELECTALLYEARSSTRING       = "Todos los años",
        SELECTALLOTHERSSTRING      = "Todos",

        SingleFilters       = null,
        MultipleFilters     = null,
        singleBars          = null,
        multipleBars        = null,
        singleVarSelector   = null,
        multipleVarSelector = null;


  // [3] define el objeto del comparador
  // ----------------------------------------------------------------------
  //
    var controller = {

  // [3.1] define las funciones de render
  // ----------------------------------------------------------------------
  //
      render : function(){
        _values = parent.currentMap.config.values;
        _data   = parent.currentMap.data; 

        SingleFilters   = [];
        MultipleFilters = [];

        if(_values.length){
          this.show();
          this.renderSingleLocation();
          this.renderMultipleLocation();
          this.enableTabs();
          return;
        }
        else{
          this.hide();
        }
      },

      enableTabs : function(){
        var singleBtn   = document.getElementById(_slBtnID),
            multipleBtn = document.getElementById(_mlBtnID),
            singleDiv   = document.getElementById(_slID),
            multipleDiv = document.getElementById(_mlID);


        // console.log(singleBtn, multipleBtn, singleDiv, multipleDiv);
        multipleDiv.style.display = "none";

        singleBtn.addEventListener("click", function(e){
          e.preventDefault();
          if(this.classList.contains("current")){
            return;
          }
          else{
            this.classList.add("current");
            multipleBtn.classList.remove("current");
            multipleDiv.style.display = "none";
            singleDiv.style.display   = "block";
          }
        });

        multipleBtn.addEventListener("click", function(e){
          e.preventDefault();
          if(this.classList.contains("current")){
            return;
          }
          else{
            this.classList.add("current");
            singleBtn.classList.remove("current");
            multipleDiv.style.display = "block";
            singleDiv.style.display   = "none";
          }
        });
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
            filters   = document.getElementById(_SLFilterListID),
            addBar    = document.getElementById(_SLAddGraphBtn);

        this.renderStateList(city, state);
        this.renderCityList(city, state);
        this.renderOptions(filters);

        container.addEventListener("submit", function(e){e.preventDefault()});
        addBar.addEventListener("click", this.renderSingleBar);
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

        singleVarSelector = select;
      },

      renderStateList : function(city, state, isMultiple){
        var optAll   = document.createElement("option"),
            stateCol = parent.currentMap.config.location.state;
            //change   = null;

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

        if(isMultiple){

        }
        else{
          //change = this.changeSingleState.bind(this, city); 
          state.addEventListener("change", this.changeSingleState);
        }
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
        var optAll   = document.createElement("option"),
            yearCol  = filter.field,
            _year    = document.createElement("div"),
            year     = null,
            template = _.template(FILTER),
            obj      = {
                         id        : (type ? _MLFilterPrefix : _SLFilterPrefix ) + yearCol,
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

        year.addEventListener("change", this.changeSingleYear);
      },

      renderBranchList : function(filter, container, isMultiple){
        var optAll   = document.createElement("option"),
            branchCol = filter.field,
            _branch   = document.createElement("div"),
            branch    = null,
            template  = _.template(FILTER),
            obj       = {
                          id        : (isMultiple ? _MLFilterPrefix : _SLFilterPrefix ) + branchCol,
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

        if(isMultiple){

        }
        else{
          branch.addEventListener("change", this.changeSingleBranch);
        }
      },

      renderUnitList : function(branch, filter, container, type){
        var optAll   = document.createElement("option"),
            unitCol  = filter.field,
            _unit    = document.createElement("div"),
            unit     = null,
            template = _.template(FILTER),
            obj      = {
                         id        : (type ? _MLFilterPrefix : _SLFilterPrefix ) + unitCol,
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

        unit.addEventListener("change", this.changeSingleUnit);
      },

      renderOtherFilter : function(filter, container, type){
        var optAll   = document.createElement("option"),
            otherCol = filter.field,
            _other   = document.createElement("div"),
            other    = null,
            template = _.template(FILTER),
            label    = parent.settings.ui.barsTool.filterLabels[otherCol] || otherCol,
            obj      = {
                         id        : (type ? _MLFilterPrefix : _SLFilterPrefix ) + otherCol,
                         label     : label,
                         dataField : otherCol
                       },
            others   = _.uniq(_data.map(function(d){
                         return d[otherCol];
                       })).filter(function(oth){ return oth}).sort();


        optAll.value     = SELECTALL;
        optAll.innerHTML = SELECTALLOTHERSSTRING;
        _other.innerHTML  = template(obj);
        other  = _other.querySelector("select");

        other.setAttribute("data-field", otherCol);

        other.appendChild(optAll);

        others.forEach(function(oth){
          var opt = document.createElement("option");

          opt.value     = oth;
          opt.innerHTML = oth;

          other.appendChild(opt);
        });

        container.appendChild(_other);

        other.addEventListener("change", this.changeSingleFilter);
      },

      renderSingleBar : function(e){
        e.preventDefault();

        var data     = _data.slice(),
            select   = singleVarSelector,
            state    = document.getElementById(_SLStateInputID).value,
            city     = document.getElementById(_SLCityInputID).value,
            stateCol = parent.currentMap.config.location.state,
            cityCol  = parent.currentMap.config.location.city,
            filters  = SingleFilters,
            filterCols = null;


        // filter by state || city
        if(city  && city != SELECTALL ){
          //console.log("filtrar por ciudad");
          data = data.filter(function(d){
            return +state == +d[stateCol] && +city == +d[cityCol];
          });
        }
        else if(state != SELECTALL){
          //console.log("filtra por estado");
          data = data.filter(function(d){
            return +state == +d[stateCol];
          });
        }
        else{
          //console.log("no filtres por ubicación");
        }

        // make filter groups
        filterCols = _.uniq(_.pluck(filters, "column"));

        // pass every category of filters
        filterCols.forEach(function(column){
          controller._filterData(data, column, filters);
        });

        // calculate value

        // render bar
      },

      renderCart : function(filter){
        var container  = document.getElementById(filter.isMultiple ? _MLSelectedFiltersID : _SLSelectedFiltersID),
            li         = document.createElement("li"),
            html       = "";

        if(filter.type == "branch"){
          html = _branches.filter(function(br){ 
            return  +br.id == +filter.value
          })[0].name;
        }
        else if(filter.type == "unit"){
          html = _units.filter(function(un){
            var id  = +un.id || un.id;

            return id == filter.value && +un.branch == filter.extra;
          })[0].name;
        }

        else if(filter.type == "year"){
          html = filter.value;
        }

        else{
          html = filter.value;
        }

        li.innerHTML = html;

        container.appendChild(li);

        li.addEventListener("click", function(e){
          this.parentNode.removeChild(this);
          SingleFilters.splice(SingleFilters.indexOf(filter), 1);
          console.log(SingleFilters);
        });
      },

  // [3.2] define las funciones de eventos
  // ----------------------------------------------------------------------
  //
      changeSingleState : function(e){
        var cityCol = parent.currentMap.config.location.city,
            state   = e.currentTarget.value,
            optAll  = document.createElement("option"),
            city    = document.getElementById(_SLCityInputID),
            cities  = _cities.filter(function(ct){
                        return +state == +ct.state; 
                      });

        if(!cityCol) return;

        optAll.innerHTML = state == SELECTALL ? SELECTALLCITIESFIRSTSTRING : SELECTALLCITIESSTRING;
        optAll.value     = SELECTALL;

        city.innerHTML   = "";
        city.appendChild(optAll);

        cities.forEach(function(ct){
          var opt = document.createElement("option");

          opt.value = ct.city;
          opt.innerHTML = ct.name;

          city.appendChild(opt);
        });
      },

      changeSingleBranch : function(e){
        var unitCol = null,
            branch  = e.currentTarget.value,
            optAll  = document.createElement("option"),
            unitID  = null,
            unit    = null,
            units   = _units.filter(function(un){
                        return +branch == +un.branch; 
                      }),
            unitObj = parent.currentMap.config.filters.filter(function(fil){
                        return fil.type == "unit";
                      })[0],
            filterObj = {
              id     : _.uniqueId(),
              type   : "branch",
              value  : +branch,
              column : e.currentTarget.getAttribute("data-field"),
              isMultiple : false   
            };

        
        controller._addFilter(filterObj, SingleFilters);

        if(!unitObj) return;

        unitCol = unitObj.field;
        unitID  = _SLFilterPrefix + unitCol;
        unit    = document.getElementById(unitID);

        unit.setAttribute("data-branch", branch);
        unit.setAttribute("data-branch-column", e.currentTarget.getAttribute("data-field"));


        
        optAll.innerHTML = SELECTALLUNITSSTRING;
        optAll.value     = SELECTALL;

        unit.innerHTML   = "";
        unit.appendChild(optAll);

        units.forEach(function(un){
          var opt = document.createElement("option");

          opt.value = un.id;
          opt.innerHTML = un.name;

          unit.appendChild(opt);
        });
      },

      changeSingleUnit : function(e){
        var unit = e.currentTarget.value,
            branch = e.currentTarget.getAttribute("data-branch"),
            filterObj = {
              id         : _.uniqueId(),
              type       : "unit",
              value      : +unit || unit,
              extra      : +branch,
              extraCol   : e.currentTarget.getAttribute("data-branch-column"),
              column     : e.currentTarget.getAttribute("data-field"),
              isMultiple : false   
            };

        controller._addFilter(filterObj, SingleFilters);
      },

      changeSingleYear : function(e){
        var year      = e.currentTarget.value, 
            filterObj = {
              id     : _.uniqueId(),
              type   : "year",
              value  : +year,
              column : e.currentTarget.getAttribute("data-field"),
              isMultiple : false   
            };

        controller._addFilter(filterObj, SingleFilters);
      },

      changeSingleFilter : function(e){
        var other     = e.currentTarget.value, 
            filterObj = {
              id     : _.uniqueId(),
              type   : "other",
              value  : other,
              column : e.currentTarget.getAttribute("data-field"),
              isMultiple : false   
            };

        controller._addFilter(filterObj, SingleFilters);
      },

  // [3.3] define las funciones de soporte
  // ----------------------------------------------------------------------
  //
      _findFilter : function(name, list){
        return list.filter(function(filter){
          return filter.type == name;
        })[0];
      },

      _addFilter : function(filter, list, isMultiple){
        var duplicated = null;

        // search duplicate
        duplicated = list.filter(function(fil){
          return fil.type == filter.type && fil.value == filter.value && fil.extra == filter.extra;
        }, this)[0];

        if(duplicated) return;

        list.push(filter);

        this.renderCart(filter);
      },

      _removeFilter : function(e){

      },

      _filterData : function(data, column, _filters){
        //console.log(data, column, _filters);

        var filters = _filters.filter(function(fil){
                        return fil.column == column;
                      }),
            isString = _.isString(data[0][column]),
            type     = filters[0].type,
            compArray = _.pluck(filters, "value"),
            extraIsString;

        if(isString){
          compArray = compArray.map(function(comp){
            return String(comp);
          });
        }

        if(type != "unit"){
          data = data.filter(function(d){
            //console.log(compArray.indexOf(data[column]), data[column], column);
            return compArray.indexOf(d[column]) != -1;
          });
        }
        else{
          //console.log("nope, is unit");
        }

        console.log(data, column, _filters);

        //console.log(filters, isString, type, compArray, data);
      },

      
    };

    return controller;
  }

  return GraphsControllerConstructor;
});