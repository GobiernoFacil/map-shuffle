# Search.maps.js

## dependencias
* d3
* underscore
* js/config/config.map.json
* js/filter.module.map

## funciones (métodos)
* render: asigna valores iniciales, obtiene referencias al HTML,  despliega la tabla de búsqueda, crea los listeners (elementos de interacción).
* renderHeaders: despliega los headers de la tabla.
* updateData: actualiza la información de la tabla.
* renderItems: despliega las filas de información de la tabla.
* renderPagination: actualiza la UI de de la paginación.
* renderItemsNum: despliega el número de resultados en base a los filtros.
* renderFilters: despliega el menú de filtros en la interfaz de búsqueda avanzada.
* nextPage: avanza una página.
* prevPage: retrocede una página.
* selectPage: selecciona qué página desplegar.
* enableDowload: permite la descarga en CSV de la información seleccionada. El código fue tomado de [aquí](https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side/24922761#24922761)
* makeAPIURL: genera el url para hacer consultas al API en caso de ser necesario.
