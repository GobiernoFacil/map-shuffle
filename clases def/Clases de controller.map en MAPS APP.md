# controller.map.js

## dependencias
* d3
* leaflet
* underscore
* classyBrew
* https://maps.googleapis.com/maps/api/js
* js/config/config.map.json
* js/assets/brewer-color-list
* js/assets/estados-area
* js/assets/estados-nombres
* js/assets/municipios
* js/assets/municipios-nombres
* js/assets/ramos-nombres
* js/assets/unidades-nombres
* js/barsv2.maps
* js/search.maps
* js/filter.module.map

## funciones (clases)
* void initialize(settings)

* void enableReverseGeocofing()

* void enableUserLocation()

* void goToUserLocation(position)

* array parseHashBangArgs(aURL)

* void drawMap()

* void updateData(data, filters, pagination)

* void renderLayer(item, keepFilters)

* array groupPoints()

* void updateUIOptions(item)

* void renderExtraLayer(item)

* void sortLayers()

* void renderStateLayer(item, container, geojson, style)

* void renderCityLayer(item, container, geojson, style)

* void renderPointsLayer(item)

* void cleanLayers()

* void cleanExtraLayer(softReset)

* void loadMapsConfig()

* void loadExtraMapsConfig()

* void getLayer(item)

* string makeAPIURL(item, page)

* void getExtraLayer(item)

* void _addUrlToItems(data, conf)

* void _addKeyToUnits(data, conf, unit)

* void _addKeyToCities(data, conf, city)

* array _agregateDataByState(item, currentData)

* array _agregateDataByCity(item, currentData)

* JSON _mapStateGeojson(data)

* JSON _mapCityGeojson(data)

* JSON _makeGeojson(item)

* void updateEmbed()

* void renderColorGuide()

* void renderColorGuideX(clear)

* void renderMapSelector()

* void renderExtraMapSelector()

* void addMapToMapSelector(item, active)

* void addExtraMapToExtraMapSelector(item)

* void updateUILevelSelector(item)

* void renderProjectCounter(data)

* void enableFilters()

* void updatePagination()

* void renderMapSelectorChange(e)

* void renderExtraMapSelectorChange(e)

* void updateUILevelSelectorChange(e)

* Object _stateStyle(feature)

* Object _stateExtraStyle(feature)

* Object _citytyle(feature)

* Object _stateExtraStyle(feature)

* Object _colorMixer(item, theData)