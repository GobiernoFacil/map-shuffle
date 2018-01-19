# barsv2.maps.js

## dependencias
* chart
* d3
* underscore
* js/filter.module.map
* js/config/config.map.json

## métodos
* void render(): asigna valores iniciales, corrige el scope de las funciones de update, y despliega el estado inicial del módulo de gráficas. 

* void _enableToggleButtons(config): habilita los botones de selección de gráfica.

* object _setupGraph(graphId, updateFunction, container): habilita un gráfica, asignando los elementos de HTMl que la controlan y sus filtros.

* void _renderGraphFilters(filters, filterModule, filterMenu): despliega el menú de filtros de cada gráfica.

* void updateGraphA(_data, filters, pagination): actualiza la primera gráfica.

* void updateGraphB(_data, filters, pagination): actualiza la segunda gráfica.

* void updateGraphC(_data, filters, pagination, latestFilter): actualiza la tercera gráfica.

* void updateGraphD(_data, filters, pagination, latestFilter): actualiza la cuarta gráfica.

* void renderGraphA(): configura el plugin _chart_ para la primera gráfica.

* void renderGraphB(): configura el plugin _chart_ para la segunda gráfica.

* void renderGraphC(): configura el plugin _chart_ para la tercera gráfica.

* void renderGraphD(): configura el plugin _chart_ para la cuarta gráfica.

* array getLocations(filters): selecciona los filtros de ubicación de la lista de filtros.

* array getXaxis(filters, xAxis, data): determina la lista de valores para el eje X.

* array getZaxis(filters, zAxis): determina la lista de valores para el eje Z.

* string findLabel(value, conf): busca el nombre del elemento seleccionado.