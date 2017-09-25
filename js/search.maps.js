// MAPA MÚLTIPLE - TRANSPARENCIA PRESUPUESTARIA
// @package : GFSHCP
// @location : /js
// @file     : search.map.js
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

define(function(require){

  var d3           = require("d3"),
      underscore   = require("underscore"),
      TEMPLATE     = require("text!templates/advanced-search.html"),
      CONFIG       = require("json!config/config.map.json"),
      SEARCH       = "GF-SHCP-search-app-query",
      FIlterModule = require("filter.module.map"),
      LINKText     = "ver";

  var SearchControllerConstructor = function(parent){

    var UI         = CONFIG.ui.searchTable,
        container  = document.getElementById(UI.container),
        filterMenu = null,
        filterCart = null,
        projectNum = null,
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
        isAPI      = null,
        apiRes     = null,
        colNames   = null,
        URLColName = parent.itemUrl,
        totalItems = 0;

    var controller = {
      render : function(){
        currentMap = parent.currentMap;
        config     = currentMap.config;
        colNames   = config.columns;
        numValues  = config.values || [];
        headers    = config.dataSearch || config.data || [];
        isAPI      = config.api;
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
        projectNum = document.getElementById(UI.totalItems);

        
        this.filters       = [];
        this._filters      = [];
        this.searchFilters = [];

        if(config.link && headers.indexOf(URLColName) == -1){
          headers.unshift(URLColName);
        }

        this.renderHeaders();

        if(isAPI){
          var url  = this.makeAPIURL(parent.currentMap, page),
              that = this;
          d3.json(url, function(error, d){
            data  = d.results;
            pages = d.pages;
            apiRes = d;
            controller.renderItems(page);
            controller.renderPagination(page);
            that.enableDowload();
          });
        }
        else{
          this.renderItems(page);
          this.renderPagination(page);
          this.enableDowload();
        }

        this.updateData = this.updateData.bind(this);
        this.nextPage   = this.nextPage.bind(this);
        this.prevPage   = this.prevPage.bind(this);
        this.selectPage = this.selectPage.bind(this);


        nextBtn.addEventListener("click", this.nextPage);
        prevBtn.addEventListener("click", this.prevPage);
        pageForm.addEventListener("submit", this.selectPage);

        this.filterModule = new FIlterModule(parent, filterCart, this.updateData, null, pageSize);

        this.renderFilters();
      },

      renderHeaders : function(){
        var tr = document.createElement("tr");

        headers.forEach(function(header){
          var th = document.createElement("th"),
              nm = colNames ? (colNames[header] || header) : header;
              
          th.innerHTML = nm;
          tr.appendChild(th);
        });

        thead.appendChild(tr);
      },

      updateData : function(_data, filters, pagination){
        this._filters = filters;
        if(isAPI){
          var url = this.makeAPIURL(parent.currentMap, page);
          d3.json(url, function(error, d){
            data  = d.results;
            pages = d.pages;
            page  = 0;
            apiRes = d;
            controller.renderItems(0);
            controller.renderPagination();
          });
        }
        else{
          data = _data;
          pages = pagination.pages;

          controller.renderItems(0);
          controller.renderPagination();
        }
      },

      renderItems : function(newPage){

        this.renderItemsNum();

        newPage = Math.ceil(newPage);

        tbody.innerHTML = "";
        
        if(newPage < 0 || newPage >= pages) return;

        var from = newPage * pageSize,
            to   = from + pageSize;
            list = data.slice(from, to),
            collection = isAPI ? data : list;

        collection.forEach(function(item){
          var tr = document.createElement("tr");
          headers.forEach(function(key){
            var td  = document.createElement("td"),
                val = numValues.indexOf(key) != -1 ? format(item[key]) : item[key];

            if(key == URLColName){
              val = "<a target='_blank' href='" + item[URLColName] + "'>" + LINKText +"</a>";
            }
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

      renderItemsNum : function(){
        var itemsNum;
        if(isAPI){
          itemsNum = apiRes.total;
        }
        else{
          itemsNum = data.length;
        }

        projectNum.innerHTML = format(itemsNum);
        //console.log(projectNum, data, itemsNum);
      },

      renderFilters : function(){
        var filters = parent.currentMap.config.filters.concat(parent.currentMap.config.extraFilters || []),
            stateFilter,
            cityFilter,
            branchFilter,
            unitFilter,
            searchFilter;

        filters.forEach(function(filter){
          var select;
          
          if(filter.type == "search"){
            this.searchFilters.push( this.filterModule.renderSearchInput(filter, document.getElementById(SEARCH)) );
            //this.filters.push(stateFilter);
          }

          else if(filter.type == "state"){
            stateFilter = this.filterModule.renderStateSelector(filter, filterMenu);
            this.filters.push(stateFilter);
          }

          else if(filter.type == "city"){
            console.log(filter);
            cityFilter = this.filterModule.renderCitySelector(filter, filterMenu);
            this.filters.push(cityFilter);
          }

          else if(filter.type == "branch"){
            cityFilter = this.filterModule.renderBranchSelector(filter, filterMenu);
            this.filters.push(branchFilter);
          }

          else if(filter.type == "unit"){
            unitFilter = this.filterModule.renderUnitSelector(filter, filterMenu);
            this.filters.push(unitFilter);
          }
          else{
            this.filters.push( this.filterModule.renderOtherSelector(filter, filterMenu) );
          }


        }, this);

      },

      nextPage : function(e){
        e.preventDefault();

        if(isAPI){
          var nextPage = page+1,
              url = this.makeAPIURL(parent.currentMap, nextPage);

          d3.json(url, function(error, d){
            data  = d.results;
            pages = d.pages;
            controller.renderItems(nextPage);
            //controller.renderPagination();
          });
        }
        else{
          var nextPage = page+1;
          controller.renderItems(nextPage);
        }
      },

      prevPage : function(e){
        e.preventDefault();

        if(isAPI){
          var prevPage = page-1,
              url = this.makeAPIURL(parent.currentMap, prevPage);

          d3.json(url, function(error, d){
            data  = d.results;
            pages = d.pages;
            controller.renderItems(prevPage);
            //controller.renderPagination();
          });
        }
        else{
          var prevPage = page-1;
          controller.renderItems(prevPage);
        }
      },

      selectPage : function(e){
        e.preventDefault();


        if(isAPI){
          var newPage = Number(pageInput.value) - 1,
              url = this.makeAPIURL(parent.currentMap, newPage);


          d3.json(url, function(error, d){
            data  = d.results;
            pages = d.pages;
            controller.renderItems(newPage);
            //controller.renderPagination();
          });
        }
        else{
          var newPage = Number(pageInput.value) - 1;
          controller.renderItems(newPage);
        }
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
      },

      makeAPIURL : function(item, page){
 
      var that    = this, 
          conf    = item.config,
          src     = conf.src,
          filters = this._filters,
          url,
          fields,
          _page;

      url = src + "?";

      if(filters.length){
        fields = _.uniq(_.pluck(filters, "field"));

        fields.forEach(function(field){
          var fa     = filters.filter(function(fil){
                       return fil.field == field;
                     }),
              values = _.pluck(fa, "value");

          url = url + field + "=" + values.join("|") + "&";
        });

      }

      if(this.searchFilters.length){
        this.searchFilters.forEach(function(sf){
          if(sf.value){
            url = url + sf.getAttribute("data-field") + "=" + sf.value + "&";
          }
        });
      }
      _page = ( (page == 0 || page ? String(page) : null ) || this.currentPage);

      url = url + "page=" + _page +"&";
      url = url + "pageSize=" + pageSize;

      return encodeURI(url);
    },

      
    };

    return controller;
  };

  return SearchControllerConstructor;
});