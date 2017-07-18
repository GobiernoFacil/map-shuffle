// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : controller.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  var d3       = require("d3"),
      TEMPLATE = require("text!templates/advanced-search.html"),
      CONFIG   = require("json!config/config.map.json");

  var SearchControllerConstructor = function(parent){

    var UI         = CONFIG.ui.searchTable,
        container  = document.getElementById(UI.container),
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
        page       = 0;

    var controller = {
      render : function(){
        currentMap = parent.currentMap;
        config     = currentMap.config;
        numValues  = config.values || [];
        headers    = numValues.concat(config.data || []);
        data       = currentMap.data.slice();
        DATA       = currentMap.data.slice();
        container.innerHTML = TEMPLATE;
        table = container.querySelector("table");
        thead = table.querySelector("thead");
        tbody = table.querySelector("tbody");

        this.renderHeaders();
        this.renderItems(page);
        this.renderPagination(page);
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

      renderItems : function(page){
        var from = page * pageSize,
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
      },

      renderPagination : function(page){
        var pages       = Math.ceil(data.length/pageSize),
            currentPage = document.getElementById(UI.pageInput),
            totalPages  = document.getElementById(UI.pageNum);

        console.log(pages, currentPage, totalPages);

        currentPage.value = page + 1;
        totalPages.innerHTML = pages;
      }

      
    };

    return controller;
  };

  return SearchControllerConstructor;
});