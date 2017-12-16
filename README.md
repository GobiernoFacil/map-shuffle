# Configuración del mapa general

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
* __mapGeometry.defaultLevels__: el número de bandas de color que representarán los valores en los mapas de área
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

-----------------------------------

# Configuración del mapa particular
# datos básicos

* __name__: el nombre que tendrá el mapa
```
"name"  : "Obra Pública Abierta"
```
* __type__: el tipo de mapa. Puede ser "point" o "area"
```
"type"  : "area"
```
* __multiple__: dato _boolean_. para el tipo de "point", significa que revisa si  distintos puntos comparten una misma latitud y longitud. Se recomienda que este tipo de casos, el total de la base de datos no supere los 4000 registros. 
```
"multiple"  : "false"
```
* __disable__: dato _array_. Es un array que sirve para identificar, en los mapas de tipo punto, si el registro debe desplegarse o no. Por ejemplo, para [0,1], significa que cualquier registro con latitud igual a cero, y longitud igual a uno, no se desplegará en el mapa.
```
"disable" : [0,0]
```
* __level__: dato _array_. Para mapas de área, describe el menú de selección de nivel. Puede ser "state" para estado y "city" para municipio
```
"level" : ["state", "city"]
```
* __src__: la ruta absoluta del archivo json de la base de datos del mapa
```
"src" : "/js/maps/opa.json"
```
* __file__: el tipo de archivo que contiene la base de datos del mapa. Esta puede ser: json, csv, tsv.
```
"file" : "csv"
```
* __link__: dato _objeto_. Si el mapa tiene una ficha, aquí se describe la ruta absoluta del template y la variable después del hash. Por ejemplo: gobiernofacil.com/template.html#123345435
```
"link"  : {
    "url"    : "/opa.html",
    "column" : "key"
  },
```
* __link.url__: la ruta absoluta del template de una ficha
```
"url"    : "/opa.html"
```
* __link.column__: el nombre de la columna que debe enviarse al template
```
"column" : "key"
```
* __style__: dato _objeto_. Colección de reglas CSS que modifica el diseño por default de puntos y áreas.
```
"style" : {
    "fillColor" : "#f49d51",
    "color"     : "#ea750f"
}
```
* __location__: dato _objeto_. Se definen las columnas que contienen la información de la latitud (lat); la longitud (lng); el estado (state); y el municipio (city).
```
"location" : {
    "lat" : "latitud",
    "lng" : "lng",
    "state" : "estado",
    "city" : "municipio"
  },
```
* __location.lat__: la columna de la latitud para mapas de puntos
```
"lat" : "latitud"
```
* __location.lng__: la columna de longitud para mapas de puntos
```
"lng" : "columna_de_longitud"
```
* __location.state__: la columna de estado para mapas de área y filtros.
```
"state" : "estado"
```
* __location.city__: la columna de ciudad para mapas de área y filtros. Internamente, se genera una nueva columna con el agregado de estado y municipio; este valor es el que se envía en las consultas por api; el nombre de esta variable se define en config.map.json, en la propiedad _constants.cityId_.
```
"city" : "municipio"
```
* __values__: dato _array_. Aquí se definen los valores que son numéricos en la base de datos; todos estos se intentarán convertir a _number_, y estarán disponibles para las distintas funciones de agregación en el _template_. Los valores son los nombres tal y como son en la columna del CSV/TSV o propiedad en el archivo JSON
```
"values" : ["monto_total_inversion", "ejercido"]
```
* __data__: dato _array_. Aquí se definen los valores que estarán disponibles en el proyecto para templates/buscador avanzado. Todos estos serán considerados como string. Se recomienda incluir aquí también los valores del _array_ __values__, pues esto no interfiere con su uso numérico.
```
"data" : ["monto_total_inversion", "ejercido", "key", "name"]
```
* __dataSearch__: dato _array_. Por default, el buscador avanzado despliega todas las columnas del _array_ __data__. Si se quiere modificar esta lista para el buscador, hay que definir los valores a desplegar aquí.
```
"dataSearch" : ["ejercido", "key","name","ramo"]
```
* __current__: dato _objeto_. Para mapas de área, aquí se define el estado inicial de la visualización.
_level_ define si es a nivel estado o municipio la visualización; sus posibles valores son "state" y "city"; para que estas opciones sean válidas, "state" y "city" deben estar definidos en la propiedad __location__.
_value_ define la columna que se usa para calcular el rango de color; esta columna debe estar definida en el arreglo __values__.
_method_ define el método con el que se agregarán los valores. La opciones disponibles son: sum, min, max, mean, median, deviation. La función de cada opción puede consultarse [aquí](https://github.com/d3/d3/blob/master/API.md#arrays-d3-array); hay una última opción para _method_, que es length: esta suma el número de proyectos por ubicación; es decir, si es a nivel estado el mapa, suma el número de registros que tienen la misma clave de estado.
_unit_ define el tipo de unidad que describe el valor numérico.
```
"current" : {
    "level"  : "state",
    "value"  : "MONTO_APROBADO",
    "method" : "length",
    "unit"   : "proyectos"
  }
```
* __current.level__: el nivel de la gráfica de área: estado (state) o municipio (city)
```
"level"  : "state"
```
* __current.value__: la columna que se usará para calcular la banda de color. esta columna debe estar definida en el arreglo __values__.
```
"value"  : "MONTO_APROBADO"
```
* __current.method__: define el método con el que se agregarán los valores. La opciones disponibles son: sum, min, max, mean, median, deviation. La función de cada opción puede consultarse [aquí](https://github.com/d3/d3/blob/master/API.md#arrays-d3-array); hay una última opción para _method_, que es length: esta suma el número de proyectos por ubicación; es decir, si es a nivel estado el mapa, suma el número de registros que tienen la misma clave de estado.
```
"method" : "sum"
```
* __current.unit__: define el tipo de unidad que describe el valor numérico.
```
"unit"   : "pesos mexicanos"
```
* __columns__: dato _objeto_. En la tabla del buscador avanzado, los nombres de las columnas son los nombres de las variables; si se quieren reemplazar por otro texto más específico, se deben definir aquí (nombre_de_la_variable : nuevo_nombre).
```
 "columns" : {
    "NOMBRE_PROYECTO" : "Nombre de proyecto",
    "NUMERO_PROYECTO" : "Número de proyecto"
  },
```
* __filters__: dato _array_. Este array define los filtros disponibles en los diferentes módulos del proyecto. Cada filtro corresponde a una columna de la base de datos, por ejemplo, para filtrar por año, hay que especificar la columna que contiene esa información. La estructura de cada objeto de filtro es la siguiente:
_type_ es el tipo de filtro. Hay 6 tipos de filtros: search, state, city, branch, unit, otros.
 El filtro de _search_ genera un campo de búsqueda para la columna seleccionada. 
 El filtro de _state_ genera un filtro de estado, definiendo la columna que corresponde a este dato.
 El filtro de _city_ genera un filtro de municipio, definiendo la columna que corresponde a este dato.
 El filtro de _branch_ genera un filtro de ramo, definiendo la columna que corresponde a este dato.
 El filtro de _unit_ genera un filtro de unidad ejecutora, definiendo la columna que corresponde a este dato.
 El filtro de _otros_ genera un filtro para cualquier columna, definiendo la columna que corresponde a este dato. Este es un nombre genérico, y puede llamarse de cualquier modo, siempre y cuando respete las reglas del lenguaje Javascript. Se recomienda ocuparse en campos que tienen valores repetidos, como por ejemplo, categorías o años.
 
 _field_ es el nombre de la columna en la base de datos que se va a filtrar.
 
 _title_ es el nombre que acompaña al filtro al desplegarse en el proyecto.
```
"filters" : [
    {"type" : "search", "field" : "name", "title" : "Proyecto"},
    {"type" : "search", "field" : "key", "title" : "Clave"},
    {"type" : "state", "field" : "state"},
    {"type" : "branch", "field" : "ramo"},
    {"type" : "unit", "field" : "id_unidad"},
    {"type" : "year", "field" : "ciclo", "title" : "Ciclo"}
  ],
```
* __defaultFilters__: dato _array_. Los filtros de default son los filtros que estarán activos al iniciar cada mapa. Cada filtro está definido por un objeto. La estructura de cada objeto de filtro es la siguiente:
_type_ es el tipo de filtro. Hay 5 tipos de filtros: state, city, branch, unit, otros.
 El filtro de _state_ genera un filtro de estado.
 El filtro de _city_ genera un filtro de municipio. Para este tipo, se debe proveer la clave inegi del municipio, es decir, el agregado de la clave de estado y municipio.
 El filtro de _branch_ genera un filtro de ramo.
 El filtro de _unit_ genera un filtro de unidad ejecutora. En este caso, el _value_ para esta opción debe ser un agregado compuesto por la clavel del ramo, más un guión, más la clave de la unidad ejecutora. Por ejemplo "11-114". 
 El filtro de _otros_ genera un filtro para cualquier columna, definiendo la columna que corresponde a este dato. __Este tipo es distinto a los otros cuatro__ pues el valor para este campo debe ser el nombre de la columna del csv, es decir, si el campo se llama anio_de_inicio, ese debe ser el valor para el campo _Type_. Se recomienda ocuparse en campos que tienen valores repetidos, como por ejemplo, categorías o años.
 
 _value_ es el valor seleccionado por default (como la clave del estado, por ejemplo).
 
 _parentFilter_ sirve para null (nada).
```
"defaultFilters" : [{"type" : "year", "value" : 2017, "parentFilter" : null},
    {"type" : "anio", "value" : 2017, "parentFilter" : null},
    {"type" : "state", "value" : 21, "parentFilter" : null},
    {"type" : "branch", "value" : 11, "parentFilter" : null},
    {"type" : "unit", "value" : "11-114", "parentFilter" : null}
  ]
```
* __template__: El uso del sistema de templates usa _underscore_, está definido en la siguiente dirección: [underscorejs.org/#template](http://underscorejs.org/#template)
Los valores que se pasan al templates son los que están definidos en el _array_ "data" de la configuración.
```
<%=name%> <div class='amount_label'><div class='row'><div class='col-sm-6'><h5>Monto total de inversión</h5>  $<%=monto_total_inversion%><h5>Monto ejercido</h5> $<%=ejercido%></div><div class='col-sm-6'><h5>Avance Físico</h5> <%=advance%>% <div class='bar'><span class='bar inside total' style='width:<%=advance%>%'></span><h5>Año</h5> <%=ciclo%></div></div></div> <br><a href='/opa.html#<%=key%>'  class='btn more info'>Más información</a></div>
```

# configuración de las gráficas

## gráfica 1
* __graphs.graph1.title__: El nombre del eje equis
* __graphs.graph1.maxLocations__: sin uso
* __graphs.graph1.colors__: dato _array_. Los colores para las barras, y su orden de aparición.
```
"colors" : ["#bcce00", "#ee7336", "#25ae85", "#5aa099"]
```
* __graphs.graph1.yAxis__: La definición del eje _Y_, el que contiene la información a sumar.
```
"yAxis" : {
  "field" : "monto_total_inversion",
  "title" : "monto total invertido"
}
```
* __graphs.graph1.yAxis.field__: La columna para el eje _Y_. Esta columna debe ser de tipo numérica, es decir, debe pertenecer al array _values_. Su Propiedad será agregada según los filtros seleccionados.
```
"field" : "monto_total_inversion"
```
* __graphs.graph1.yAxis.title__: El nombre de la columna que será sumada.
```
"title" : "monto total invertido"
```
* __graphs.graph1.xAxis__: El eje _X_ de la gráfica. Este debe ser una columna que pertenezca a una categoría, o a un valor que tenga múltiples repeticiones a través de la base de datos, es decir, que sea el mismo valor en distintos renglones, como el año.
```
"xAxis" : {
  "field" : "ciclo",
  "title" : "año",
  "type"  : null
},
```
* __graphs.graph1.xAxis.type__: sin uso
* __graphs.graph1.xAxis.field__: La columna para el eje _X_ de la gráfica. Este debe ser una columna que pertenezca a una categoría, o a un valor que tenga múltiples repeticiones a través de la base de datos, es decir, que sea el mismo valor en distintos renglones, como el año.
```
"field" : "ciclo"]
```
* __graphs.graph1.xAxis.title__: el nombre de la columna para el eje _X_.
```
"title" : "año"
```
* __graphs.graph1.zAxis__: El eje _Z_, es decir, el que mostrará la distribución del eje _Y_ (stacks). Este eje acepta el mismo tipo de dato que el eje _X_, además de ser el recomendado para  exponer el campo de ramo, en caso de que exista. Para cuando es ramo, hay que especificarlo en la propiedad _type_ como "branch".
```
"zAxis" : {
  "field" : "ramo",
  "title" : "ramo",
  "type"  : "branch"
}
```
* __graphs.graph1.zAxis.field__: El campo del eje _Z_, el que mostrará la distribución del eje _Y_ (stacks). Este eje acepta el mismo tipo de dato que el eje _X_, además de ser el recomendado para  exponer el campo de ramo, en caso de que exista. Para cuando es ramo, hay que especificarlo en la propiedad _type_ como "branch"
```
"field" : "ramo"
```
* __graphs.graph1.zAxis.title__: el título de la columna del eje _Z_.
```
"title" : "Ramo"
```
* __graphs.graph1.zAxis.type__: la bandera (_flag_) que indica si el eje pertenece al ramo o no. El valor para indicar que pertenece al ramo es "branch". Cualquier otro valor será falso. 
```
"type"  : "branch"
```

## gráfica 2
* __graphs.graph2.title__: El título de la gráfica
```
"title" : "Monto total por ramo"
```
* __graphs.graph2.value__: el nombre de la columna por agregar en la gráfica. Esta columna debe ser numérica y debe pertenecer al array _data_.
```
"value" : "monto_total_inversion"
```
* __graphs.graph2.maxLocations__: sin uso
```
"maxLocations" : 5
```
* __graphs.graph2.colors__: los colores para usar en la gráfica y el orden en el que aparecen
```
"colors" : ["#bcce00", "#ee7336", "#25ae85"]
```
* __graphs.graph2.area__: el objeto que determina cómo se generan las áreas de la gráfica.
```
"area" : {
  "field" : "ramo",
  "title" : "el ramo de la maroma esta",
  "type"  : "branch"
},
```
* __graphs.graph2.area.field__: el nombre de la columna que determina cómo se agregan las cantidades de _value_. Se recomienda usar la clave del ramo, pero es posible usar otros campos como el año o alguna categoría.
```
"field" : "ramo"
```
* __graphs.graph2.area.title__: el nombre de la columna que determina cómo se agregan las cantidades. Aquí es cómo lo leerá el usuario.
```
"title" : "ramo"
```
* __graphs.graph2.area.type__: sin uso.

## gráfica 3
* __graphs.graph3.title__: El nombre de la gráfica
```
"title" : "Monto total invertido por año"
```
* __graphs.graph3.maxLocations__: sin uso
* __graphs.graph3.colors__: los colores para usar en la gráfica y el orden en el que aparecen
```
"colors" : ["#bcce00", "#ee7336", "#25ae85"]
```

* __graphs.graph3.xAxis.field__: la columna que ocupará el eje X. Este debe ser una columna que pertenezca a una categoría, o a un valor que tenga múltiples repeticiones a través de la base de datos, es decir, que sea el mismo valor en distintos renglones, como el año.
```
"field" : "ciclo",
```
* __graphs.graph3.xAxis.title__: el nombre de la columna que define el eje X.
```
"title" : "año"
```
* __graphs.graph3.xAxis.type__: sin uso
* __graphs.graph3.yAxis.field__: el nombre de la columna por agregar en la gráfica. Esta columna debe ser numérica y debe pertenecer al array _data_.
```
"field" : "monto_total_inversion",
```
* __graphs.graph3.yAxis.title__: el nombre para lectura del campo que define el valor que se agrega.
```
"title" : "monto total invertido"
```
* __graphs.graph3.zAxis.field__: el nombre de la columna que determina el eje Z de la gráfica (cada barra que contiene el eje X). Se recomienda usar la clave del ramo, pero es posible usar otros campos como el año o alguna categoría.
```
"field" : "ramo"
```
* __graphs.graph3.zAxis.title__: el nombre para lectura del campo que define el eje Z de la gráfica.

```
"title" : "ramo"
```
* __graphs.graph3.zAxis.type__: no tiene uso


## gráfica 4
* __graphs.graph4.title__: El nombre de la gráfica
```
"title" : "Monto total invertido por año"
```
* __graphs.graph4.value__: el nombre de la columna por agregar en la gráfica. Esta columna debe ser numérica y debe pertenecer al array _data_.
```
"value" : "monto_total_inversion"
```
* __graphs.graph4.area__: el objeto que determina cómo se generan las áreas de la gráfica.
```
"area" : {
  "field" : "ramo",
  "title" : "el ramo de la maroma esta",
  "type"  : "branch"
},
```
* __graphs.graph4.area.field__: el nombre de la columna que determina cómo se agregan las cantidades de _value_. Se recomienda usar la clave del ramo, pero es posible usar otros campos como el año o alguna categoría.
```
"field" : "ramo"
```
* __graphs.graph4.area.title__: el nombre de la columna que determina cómo se agregan las cantidades. Aquí es cómo lo leerá el usuario.
```
"title" : "ramo"
```
* __graphs.graph4.area.type__: sin uso.
* __graphs.graph4.points.field__: el campo de la base de datos que definirá las aristas de la gráfica. 
```
"field" : "ciclo"
```
* __graphs.graph4.points.title__: el nombre del campo que define las aristas
```
"title" : "año"
```
* __graphs.graph4.points.type__: sin uso
* __graphs.graph4.maxLocations__: sin us0
* __graphs.graph4.colors__: los colores para usar en la gráfica y el orden en el que aparecen.
```
"colors" : ["#bcce00", "#ee7336", "#25ae85"]
```



