# mapa general

* __map.div__: el id del _div_ donde se desplegará el mapa. El mapa usa leaflet.
```
"div" : "GF-SHCP-map"
```
* __map.lat__: la latitud inicial del mapa (el centro del mapa)
```
"lat" : 22.442167
```
* __map.lng__: la longitud inicial del mapa (el centro del mapa)
```
"lng" : -100.110350
```
* __map.zoom__: el zoom inicial del mapa. Este valor es un entero. Para mayor información de los rangos, ver la [documentación de leaflet](http://leafletjs.com/examples/zoom-levels)
```
"zoom" : 6
```
* __map.tileServer__: el servidor de recuadros geográficos. El default es Open Street Map, pero es posible utilizar otros. Aquí [algunos ejemplos](http://leaflet-extras.github.io/leaflet-providers/preview/) de posibles servidores
```
"tileServer" : "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'"
``` 
* __map.tileServerConfig.maxZoom__: En algunos servidores de recuadros geográficos, limita el zoom máximo del mapa
```
"maxZoom" : 18
```
* __map.tileServerConfig.attribution__: los créditos del proveedor de recuadros geográficos.
```
"attribution" : "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
```
* __map.attributions__: La lista de fuentes de donde proviene la información. Acepta HTML, y se despliega después de los créditos del proveedor de recuadros geográficos
```
"attributions" : ["SHCP"]
```

# mapa de puntos

* __mapPoint__: dato _objeto_. Estilo CSS de de default para desplegar los puntos en el mapa de puntos.
```
"mapPoint" : {
    "radius"      : 6,
    "fillColor"   : "rgb(244, 157, 81)",
    "color"       : "rgb(214, 103, 6)",
    "weight"      : 1,
    "opacity"     : 0.3,
    "fillOpacity" : 0.9
  }
```
* __mapPoint.radius__: el radio en pixeles de cada punto en el mapa de puntos. 
```
"radius" : 6
```
* __mapPoint.radius2__: sin uso
* __mapPoint.fillColor__: el color de cada punto
```
"fillColor" : "#f40000"
```


# mapa de áreas

* __mapGeometry__: El estilo CSS que define las características de default de los mapas de área. Esta definición contiene dos propiedades que no son estándar: _defaultColor_ define la clave de color para utilizar y _defaultLevels_ define el número de bandas de color que se usarán al agregar datos.
```
"mapGeometry" : {
    "weight"       : 0.4,
    "opacity"      : 0.8,
    "color"        : "red",
    "dashArray"    : "",
    "fillOpacity"  : 1,
    "defaultColor" : 12,
    "defaultLevels": 7 
  }
```
* __mapGeometry.defaultColor__: la clave de la gama de color a usar en las bandas de rango. del _0_ al _34_.
El valor esperado es numérico, pero las claves que se seleccionan son las siguientes: "OrRd", "PuBu", "BuPu", "Oranges", 
"BuGn", "YlOrBr", "YlGn", "Reds", 
"RdPu", "Greens", "YlGnBu", "Purples", 
"GnBu", "Greys", "YlOrRd", "PuRd", "Blues", 
"PuBuGn", "Spectral", "RdYlGn", "RdBu", 
"PiYG", "PRGn", "RdYlBu", "BrBG", 
"RdGy", "PuOr", "Set2", "Accent", 
"Set1", "Set3", "Dark2", "Paired", 
"Pastel2", "Pastel1".
```
"defaultColor" : 12
```
* __mapGeometry.defaultLevels__: el número de bandas de color que representarán los valores en los mapas de área. Es posible utilizar del dos al nueve.
```
"defaultLevels": 7 
```

# mapa de áreas extra

* __extraMapGeometry__: El estilo CSS que define las características de default de los mapas de área. Esta definición contiene dos propiedades que no son estándar: _defaultColor_ define la clave de color para utilizar y _defaultLevels_ define el número de bandas de color que se usarán al agregar datos.
```
"extraMapGeometry" : {
    "weight"       : 0.4,
    "opacity"      : 0.8,
    "color"        : "red",
    "dashArray"    : "",
    "fillOpacity"  : 1,
    "defaultColor" : 5 
  }
```
* __extraMapGeometry.defaultColor__: la clave de la gama de color a usar en las bandas de rango. del _0_ al _34_.
El valor esperado es numérico, pero las claves que se seleccionan son las siguientes: "OrRd", "PuBu", "BuPu", "Oranges", 
"BuGn", "YlOrBr", "YlGn", "Reds", 
"RdPu", "Greens", "YlGnBu", "Purples", 
"GnBu", "Greys", "YlOrRd", "PuRd", "Blues", 
"PuBuGn", "Spectral", "RdYlGn", "RdBu", 
"PiYG", "PRGn", "RdYlBu", "BrBG", 
"RdGy", "PuOr", "Set2", "Accent", 
"Set1", "Set3", "Dark2", "Paired", 
"Pastel2", "Pastel1".
```
"defaultColor" : 12
```
* __extraMapGeometry.defaultLevels__: el número de bandas de color que representarán los valores en los mapas de área
```
"defaultLevels": 7 
```

# mapas disponibles

* __maps.basePath__: La ruta absoluta donde se encuentran los archivos de configuración de cada mapa
```
"basePath"  : "/js/config"
```
* __maps.maps__: dato _array_. El nombre de cada archivo de configuración que estará disponible para consultar
```
"maps" : ["bansefi2.map.json", "escuelas100.map.json", "ramo23.map.json", "opa.map.json", "entidades.map.json"]
```
* __maps.extras__: dato _array_. 
```
"extras" : ["poblacion.map.json", "areas_afectadas_desastre.json"]
```
* __maps.current__: el índice del mapa que se quiere desplegar primero. La lista de este índice es la de _maps.maps_; el índice es en base cero, es decir, si son cinco elementos y se quiere desplegar el último, debe ponerse un _4_.
```
"current"   : 3
```
* __maps.embedPath__: la ruta absoluta donde está el mapa que se desplegará en los iframes.
```
"embedPath" : "http://localhost:8000/mapa.html"
```

# variables de UX
* __ux.findMeZoom__: El zoom que se aplica al utilizar el botón de geolocalización del usuario.
```
"findMeZoom" : 14
```
* __ux.changeStateZoom__: Sin uso. Se utilizaba para ajustar el zoom cuando era posible seleccionar un solo estado.
* __ux.geocoding__: El endpoint del api de geolocalización. Solo acepta google maps.
```
"geocoding"  : "https://maps.googleapis.com/maps/api/geocode/json"
```
* __ux.enableBarsTool__: dato _boolean_. Valor verdadero o falso para desplegar las gráficas. Un valor falso las desactiva (null, 0, false); un valor verdadero las despliega.
```
"enableBarsTool" : 1
```
* __ux.enableSearchTool__:dato _boolean_. Valor verdadero o falso para desplegar el buscador avanzado. Un valor falso lo desactiva (null, 0, false); un valor verdadero lo despliega.
```
"enableSearchTool" : 0
```
* __ux.pointNavigationTemplate__: El template en HTML de la paginación para los puntos que comparten la misma latitud y longitud. Los identificadores para cada elemento de este template se definen de la siguiente manera:
  * anterior: __ux.pointNavigationPrevId__
  * siguiente: __ux.pointNavigationNextId__
  * punto actual: __ux.pointNavigationCurrentId__
  * total de puntos: __ux.pointNavigationTotalId__
```
"pointNavigationTemplate" : "<a class=\"GF-SHCP-point-prev-btn\" href=\"#\">anterior</a> <span class=\"GF-SHCP-point-current\"></span>/<span class=\"GF-SHCP-point-total\"></span><a class=\"GF-SHCP-point-next-btn\" href=\"#\">siguiente</a></p>"
```
* __ux.pointNavigationPrevId__: el _id_ del botón para regresar en la lista de puntos que comparten latitud y longitud.
```
"pointNavigationPrevId" : "GF-SHCP-point-prev-btn"
```
* __ux.pointNavigationNextId__: el _id_ del botón para avanzar en la lista de puntos que comparten latitud y longitud.
```
"pointNavigationNextId" : "GF-SHCP-point-next-btn"
```
* __ux.pointNavigationCurrentId__: el _id_ del texto para indicar el punto desplegado en la lista de puntos que comparten latitud y longitud.
```
"pointNavigationCurrentId" : "GF-SHCP-point-current"
```
* __ux.pointNavigationTotalId__: el _id_ del total de elementos en la lista de puntos que comparten latitud y longitud.
```
"pointNavigationTotalId" : "GF-SHCP-point-total"
```
* __ux.searchPageSize__: El número de elementos desplegados por página en el buscador avanzado.
```
"searchPageSize" : 10
```
* __ux.searchInputClass__: Sin uso. Se optó por usar un template externo para definir los inputs de búsqueda.

# nombres de constantes
* __constants.cityId__: El identificador interno para el agregado de ciudad. Se genera la clave INEGI del municipio. Su estructura es el id del estado y el id del municipio por ejemplo, 21001 para Acajete (Puebla es 21 y Acajete 001). Este campo es el que se envía a la petición del datos en el caso de llamar a un api.
```
"cityId"  : "GFSHCPCityId"
```
* __constants.unitId__: El identificador interno para el agregado de unidad ejecutora. Su estructura es el id del ramo, guión y el id de la unidad ejecutora (idRamo-idUnidad). Este campo es el que se envía a la petición del datos en el caso de llamar a un api.
```
"unitId"  : "GFSHCPUnitId"
```
* __constants.itemUrl__: El identificador interno para generar el url de la ficha de cada registro en la DB. Esto solo aplica cuando en el archivo de configuración del mapa existe la definición del elemento _link_.
```
"itemUrl" : "GFSHCPurl"
```

# indentificadores de UI

* __ui.topToolsDiv__: El identificador del div que contiene las herramientas de búsqueda (sin los filtros)
```
"topToolsDiv"    : "GF-SHCP-top-tools"
```
* __ui.bottomToolsDiv__: sin uso.
* __ui.filterSelector__: El identificador del div que contiene los filtros del mapa principal
```
"filterSelector" : "GF-SHCP-filter-selector"
```
* __ui.mapCart__: El identificador del _ul_ que contiene los filtros seleccionados (carro de compras) del mapa principal
```
"mapCart" : "GF-SHCP-cart-list"
```
* __ui.extraMapSelector__: El identificador del selector de mapas extras (comparativas)
```
"extraMapSelector" : "GF-SHCP-extra-map-list"
```
* __ui.geolocationBtn__: El id del botón que sirve para geolocalizar al usuario.
```
"geolocationBtn"   : "GF-SHCP-geolocate-user"
```
* __ui.geolocationForm__: El id del formulario que contiene las herramientas de geolocalización
```
"geolocationForm"  : "GF-SHCP-geolocation-form"
```
* __ui.geolocationField__: El id del input que captura la dirección para geocodificar.
```
"geolocationField" : "GF-SHCP-geolocation-input"
```
* __ui.projectCounter__: El id de la etiqueta que despliega el número de proyectos en el mapa principal
```
"projectCounter"   : "GF-SHCP-project-counter"
```
* __ui.colorGuide__: El identificador del elemento que contiene los rangos de color de los mapas de área
```
"colorGuide"       : "GF-SHCP-color-guide"
```
* __ui.colorGuideX__: El identificador del elemento que contiene los rangos de color de los mapas de área para comparativos
```
"colorGuideX"       : "GF-SHCP-color-guide-x"
```
* __ui.embedForm__: El identificador del formulario que contiene la herramienta para integrar en un iframe
```
"embedForm"        : "GF-SHCP-embed-form"
```
* __ui.downloadDataBtn__: sin uso
* __ui.mapSelector.container__: sin uso
* __ui.mapSelector.class__: sin uso
* __ui.mapSelector.id__: El identificador del div que contiene las herramientas de filtrado (sin los filtros personalizados)
```
"id" : "GF-SHCP-map-selector"
```
* __ui.mapSelector.position__: sin uso
* __ui.mapSelector.levelId__: El id del div que contiene la herramienta de selector de nivel (estado o municipio) en los mapas de área
```
"levelId"   : "GF-SHCP-view-selector-section"
```
* __ui.mapSelector.geolocationId__: El identificador del elemento que contiene las herramientas de geolocalización para  los mapas de puntos
```
"geolocationId" : "GF-SHCP-view-geolocation-section"
```

* __ui.pageSelector.container__: sin uso
* __ui.pageSelector.class__: sin uso
* __ui.pageSelector.id__: El identificador del contenedor de la herramienta de paginación para el mapa principal
```
"id"        : "GF-SHCP-page-selector"
```
* __ui.pageSelector.position__: sin uso
* __ui.pageSelector.controls.pageSelect__: el identificador del input que contiene la página actual del mapa principal
```
"pageSelect" : "GF-SHCP-CONTROL-PAGE"
```
* __ui.pageSelector.controls.pageDisplay__: el identificador del tag que contiene el total de páginas del mapa principal
```
"pageDisplay" : "GF-SHCP-LABEL-PAGE-TOTAL"
```
* __ui.pageSelector.controls.nextPageBtn__: el identificador del botón para avanzar en la paginación del mapa principal
```
"nextPageBtn" : "GF-SHCP-CONTROL-NEXT"
```
* __ui.pageSelector.controls.prevPageBtn__: el identificador del botón para regresar en la paginación del mapa principal
```
"prevPageBtn" : "GF-SHCP-CONTROL-PREV"
```

* __ui.barsTool.container__: El identificador del contenedor de las comparativas
```
"container" : "GF-SHCP-bars-tool"
```
* __ui.barsTool.graph1__: El identificador del contenedor de la primera gráfica
```
"graph1" : "GF-SHCP-GRAPHS-A"
```
* __ui.barsTool.graph2__: El identificador del contenedor de la segunda gráfica
```
"graph2" : "GF-SHCP-GRAPHS-B"
```
* __ui.barsTool.graph3__: El identificador del contenedor de la tercera gráfica
```
"graph3" : "GF-SHCP-GRAPHS-C"
```
* __ui.barsTool.graph4__: El identificador del contenedor de la cuarta gráfica
```
"graph4" : "GF-SHCP-GRAPHS-D"
```
* __ui.barsTool.graph1Btn__: El identificador de la pestaña que despliega la primera gráfica
```
"graph1Btn" : "GF-SHCP-GRAPHS-A-btn"
```
* __ui.barsTool.graph2Btn__: El identificador de la pestaña que despliega la segunda gráfica
```
"graph2Btn" : "GF-SHCP-GRAPHS-B-btn"
```
* __ui.barsTool.graph3Btn__: El identificador de la pestaña que despliega la tercera gráfica
```
"graph3Btn" : "GF-SHCP-GRAPHS-C-btn",
```
* __ui.barsTool.graph4Btn__: El identificador de la pestaña que despliega la cuarta gráfica
```
"graph4Btn" : "GF-SHCP-GRAPHS-D-btn"
```
* __ui.barsTool.singleLocation__: sin uso
* __ui.barsTool.multipleLocations__: sin uso
* __ui.barsTool.singleLocationBtn__: sin uso
* __ui.barsTool.multipleLocationBtn__: sin uso
* __ui.barsTool.filterDivClass__: sin uso
* __ui.barsTool.singleLocationUI.state__: sin uso
* __ui.barsTool.singleLocationUI.city__: sin uso
* __ui.barsTool.singleLocationUI.addLocation__: sin uso
* __ui.barsTool.singleLocationUI.selectedFilters__: sin uso
* __ui.barsTool.singleLocationUI.filterList__: sin uso
* __ui.barsTool.singleLocationUI.filterPrefix__: sin uso
* __ui.barsTool.singleLocationUI.addGraph__: sin uso

* __ui.barsTool.filterLabels.value__: sin uso
* __ui.barsTool.filterLabels.year__: sin uso
* __ui.barsTool.filterLabels.state__: sin uso
* __ui.barsTool.filterLabels.city__: sin uso
* __ui.barsTool.filterLabels.branch__: sin uso
* __ui.barsTool.filterLabels.unit__: sin uso

* __ui.searchTable.container__: El identificador del contenedor del buscador avanzado
```
"container"       : "GF-SHCP-table-tool"
```
* __ui.searchTable.searchInput__: El identificador del contenedor de los filtros de palabra clave en el buscador avanzado
```
"searchInput"     : "GF-SHCP-search-app-query"
```
* __ui.searchTable.filterContainer__: El identificador del contenedor de los filtros personalizados en la búsqueda avanzada
```
"filterContainer" : "GF-SHCP-search-app-filter-list"
```
* __ui.searchTable.cart__: El identificador del contenedor de los filtros seleccionados (carro de compras) de la búsqueda avanzada
```
"cart" : "GF-SHCP-search-app-filters"
```
* __ui.searchTable.pageInput__: El identificador del input que contiene la página actual del buscador avanzado
```
"pageInput"       : "GF-SHCP-SEARCH-CONTROL-PAGE"
```
* __ui.searchTable.pageNum__: el identificador del tag que despliega el total de páginas en el buscador
```
"pageNum"         : "GF-SHCP-SEARCH-LABEL-PAGE-TOTAL"
```
* __ui.searchTable.prevPage__: el identificador del botón para retroceder en la paginación del buscador avanzado
```
"prevPage"        : "GF-SHCP-SEARCH-CONTROL-PREV"
```
* __ui.searchTable.nextPage__: el identificador del botón para avanzar en la paginación del buscador avanzado
```
"nextPage"        : "GF-SHCP-SEARCH-CONTROL-NEXT"
```
* __ui.searchTable.toolsForm__: El identificador del contenedor de herramientas de filtrado para el buscador avanzado
```
"toolsForm"       : "GF-SHCP-search-tools-form"
```
* __ui.searchTable.paginationForm__: El identificador del contenedor de herramientas de paginación para el buscador avanzado
```
"paginationForm"  : "GF-SHCP-search-pagination-form"
```
* __ui.searchTable.downloadBtn__: El identificador del botón de descarga en el buscador avanzado
```
"downloadBtn"     : "GF-SHCP-search-app-download"
```
* __ui.searchTable.totalItems__: El identificador del elemento que despliega el total de proyectos disponibles en el buscador avanzado
```
"totalItems"      : "GF-SHCP-search-app-total-items"
```

