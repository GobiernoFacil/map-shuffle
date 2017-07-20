// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  var d3           = require("d3"),
      underscore   = require("underscore"),
      TEMPLATE     = require("text!templates/advanced-search.html"),
      CONFIG       = require("json!config/config.map.json"),
      FIlterModule = require("filter.module.map");

  var SearchControllerConstructor = function(parent){

    var UI         = CONFIG.ui.searchTable,
        container  = document.getElementById(UI.container),
        filterMenu = null,
        filterCart = null,
        pageSize   = CONFIG.ux.searchPageSize,
        format     = d3.format(","),
        currentMap = null,
        config     = null,
        numValues  = null,
        headers    = null,
        data       = null,
        DATA       = null,
        table      = null,
        tbody      = null,
        thead      = null,
        download   = null,
        nextBtn    = null,
        prevBtn    = null,
        pageForm   = null,
        pageInput  = null,
        page       = 0,
        pages      = 0,
        filterModule = new FIlterModule(parent);

    var controller = {
      render : function(){
        currentMap = parent.currentMap;
        config     = currentMap.config;
        numValues  = config.values || [];
        headers    = numValues.concat(config.data || []);
        data       = currentMap.data.slice();
        DATA       = currentMap.data.slice();
        container.innerHTML = TEMPLATE;
        table      = container.querySelector("table");
        thead      = table.querySelector("thead");
        tbody      = table.querySelector("tbody");
        download   = document.getElementById(UI.downloadBtn);
        pages      = Math.ceil(data.length/pageSize);
        nextBtn    = document.getElementById(UI.nextPage);
        prevBtn    = document.getElementById(UI.prevPage);
        pageForm   = document.getElementById(UI.paginationForm);
        pageInput  = document.getElementById(UI.pageInput);
        filterMenu = document.getElementById(UI.filterContainer);
        filterCart = document.getElementById(UI.cart);
        
        this.filters = [];
        this.renderHeaders();
        this.renderItems(page);
        this.renderPagination(page);
        this.enableDowload();

        nextBtn.addEventListener("click", this.nextPage);
        prevBtn.addEventListener("click", this.prevPage);
        pageForm.addEventListener("submit", this.selectPage);

        this.renderFilters();
      },

      renderHeaders : function(){
        var tr = document.createElement("tr");

        headers.forEach(function(header){
          var th = document.createElement("th");

          th.innerHTML = header;
          tr.appendChild(th);
        });

        thead.appendChild(tr);
      },

      renderItems : function(newPage){
        newPage = Math.ceil(newPage);

        if(newPage < 0 || newPage >= pages) return;


        tbody.innerHTML = "";

        var from = newPage * pageSize,
            to   = from + pageSize;
            list = data.slice(from, to);

        list.forEach(function(item){
          var tr = document.createElement("tr");
          headers.forEach(function(key){
            var td = document.createElement("td"),
                val = numValues.indexOf(key) != -1 ? format(item[key]) : item[key];

            td.innerHTML = val;
            tr.appendChild(td);
          });

          tbody.appendChild(tr);
        });

        pageInput.value = newPage + 1;
        page = newPage;
      },

      renderPagination : function(page){
        var currentPage = document.getElementById(UI.pageInput),
            totalPages  = document.getElementById(UI.pageNum);


        totalPages.innerHTML = pages;
      },

      renderFilters : function(){
        var filters = parent.currentMap.config.filters,
            stateFilter,
            cityFilter,
            branchFilter,
            unitFilter;

        filters.forEach(function(filter){
          var select;
          if(filter.type == "state"){
            stateFilter = filterModule.renderStateSelector(filter, filterMenu);
            this.filters.push(stateFilter);
          }
        }, this);

      },

      nextPage : function(e){
        e.preventDefault();

        var nextPage = page+1;
        controller.renderItems(nextPage);
      },

      prevPage : function(e){
        e.preventDefault();

        var prevPage = page-1;
        controller.renderItems(prevPage);
      },

      selectPage : function(e){
        e.preventDefault();
        var newPage = Number(pageInput.value) - 1;
        controller.renderItems(newPage);
      },

      enableDowload : function(){
        // implementado de:
        // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side/24922761#24922761
        download.addEventListener("click", function(e){
          e.preventDefault();

          var firstItem  = data[0],
              keys       = data[0] ? _.keys(data[0]) : null,
              _data      = [],
              csvContent = "data:text/csv;charset=utf-8,",
              response,
              encodedUri;

          if(!keys) return;

          data.forEach(function(d){
            var arr = [];
            keys.forEach(function(key){
              arr.push(d[key]);
            });

            _data.push(arr);
          });

          _data.unshift(keys);

          _data.forEach(function(infoArray, index){
            infoArray = infoArray.map(function(str){
              return "\"" + _.escape(str) + "\"";
            });
            dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString+ "\n" : dataString;
          });

          encodedUri = encodeURI(csvContent);
          window.open(encodedUri);

        });
      }

      
    };

    return controller;
  };

  return SearchControllerConstructor;
});