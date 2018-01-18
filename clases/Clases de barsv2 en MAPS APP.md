# barsv2.maps.js

## dependencias
* chart
* d3
* underscore
* js/filter.module.map
* js/config/config.map.json

## funciones (clases)
* render: asigna valores iniciales, corrige el scope de las funciones de update, y despliega el estado inicial del módulo de gráficas. 
* _enableToggleButtons: habilita los botones de selección de gráfica.
* _setupGraph: habilita un gráfica, asignando los elementos de HTMl que la controlan y sus filtros.
* _renderGraphFilters: despliega el menú de filtros de cada gráfica.
* updateGraphA: actualiza la primera gráfica.
* updateGraphB: actualiza la segunda gráfica.
* updateGraphC: actualiza la tercera gráfica.
* updateGraphD: actualiza la cuarta gráfica.
* renderGraphA: configura el plugin _chart_ para la primera gráfica.
* renderGraphB: configura el plugin _chart_ para la segunda gráfica.
* renderGraphC: configura el plugin _chart_ para la tercera gráfica.
* renderGraphD: configura el plugin _chart_ para la cuarta gráfica.
* getLocations: selecciona los filtros de ubicación de la lista de filtros.
* getXaxis: determina la lista de valores para el eje X.
* getZaxis: determina la lista de valores para el eje Z.
* findLabel: busca el nombre del elemento seleccionado.