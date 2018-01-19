# barsv2.maps.js

## dependencias
* chart
* d3
* underscore
* js/filter.module.map
* js/config/config.map.json

## métodos
* void render() 

* void _enableToggleButtons(config)

* object _setupGraph(graphId, updateFunction, container)

* void _renderGraphFilters(filters, filterModule, filterMenu)

* void updateGraphA(_data, filters, pagination)

* void updateGraphB(_data, filters, pagination)

* void updateGraphC(_data, filters, pagination, latestFilter)

* void updateGraphD(_data, filters, pagination, latestFilter)

* void renderGraphA()

* void renderGraphB()

* void renderGraphC()

* void renderGraphD()

* array getLocations(filters)

* array getXaxis(filters, xAxis, data)

* array getZaxis(filters, zAxis)

* string findLabel(value, conf)