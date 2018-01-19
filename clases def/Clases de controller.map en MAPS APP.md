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
* void initialize(settings): asigna los valores de default, define shortcuts para elementos de UI, arregla el scope de funciones que se llaman fuera del nivel del objeto, llama a las funciones que despliegan el estado inicial del mapa.

* void enableReverseGeocofing(): habilita el campo de geocoding utilizando el api de google maps.

* void enableUserLocation(): habilita el uso de HTML5 para geolocalizar al usuario.

* void goToUserLocation(position): mueve el centro del mapa a la ubicación del usuario si aceptó ser ubicado.

* array parseHashBangArgs(aURL): Convierte la información después del hash en el url a un array. El código fue tomado de [aquí](https://gist.github.com/miohtama/1570295)

* void drawMap(): inicia el mapa de leaflet.

* void updateData(data, filters, pagination): actualiza el mapa con nuevos datos después de filtrar la información.

* void renderLayer(item, keepFilters): despliega el mapa seleccionado.

* array groupPoints(): genera un arreglo con los puntos que comparten una misma ubicación, definida por latitud y longitud.

* void updateUIOptions(item): actualiza el menú de opciones del mapa dependiendo del tipo de información que se despliega.

* void renderExtraLayer(item): despliega el mapa extra.

* void sortLayers(): organiza el mapa principal y el mapa extra para que no pierdan su posición original.

* void renderStateLayer(item, container, geojson, style): despliega un mapa de área con información estatal.

* void renderCityLayer(item, container, geojson, style): despliega un mapa de área con información municipal.

* void renderPointsLayer(item): despliega un mapa de puntos.

* void cleanLayers(): elimina todas las capas de información de leaflet (los mapas).

* void cleanExtraLayer(softReset): elimina el mapa (layer) extra de leaflet.

* void loadMapsConfig(): carga el archivo de configuración.

* void loadExtraMapsConfig(): carga la configuración del mapa extra.

* void getLayer(item): obtiene la información del mapa seleccionado, limpia la interfaz de mapas, y llama la función de despliegue de mapa cuando la información está disponible.

* string makeAPIURL(item, page): genera el url de la llamada al api, agregando los valores para filtrar.

* void getExtraLayer(item): obtiene la información del mapa extra.

* void _addUrlToItems(data, conf): genera el url a la ficha para cada elemento desplegado en el mapa (aplica para mapas de puntos).

* void _addKeyToUnits(data, conf, unit): genera un id único para cada unidad ejecutora.

* void _addKeyToCities(data, conf, city): genera un id único para cada municipio (su clave INEGI)

* array _agregateDataByState(item, currentData): agrega la información en un array por estado.

* array _agregateDataByCity(item, currentData): agrega la información en un array por municipio.

* JSON _mapStateGeojson(data): convierte un array de datos de estado en un objeto geoJSON válido.

* JSON _mapCityGeojson(data): convierte un array de datos de municipio en un objeto geoJSON válido.

* JSON _makeGeojson(item): genera un objeto de geoJSON.

* updateEmbed: genera el url para el iframe (compartir el mapa)

* renderColorGuide: genera la escala de color para el mapa principal.

* renderColorGuideX: genera la escala de color para el mapa para comparar.

* renderMapSelector: genera el UI para el selector de mapas.

* renderExtraMapSelector: genera el UI para el selector de mapas extra.

* addMapToMapSelector: agrega una opción al selector de mapas principal.

* addExtraMapToExtraMapSelector: agrega una opción al selector de mapas extra.

* updateUILevelSelector: configura el menú de nivel para mapas de área (estado o municipio).

* renderProjectCounter: despliega el número de proyectos seleccionados.

* enableFilters: activa el UI para los filtros del mapa principal.

* updatePagination: activa el UI para la paginación de resultados cuando se trata de un API la fuente de datos.

* renderMapSelectorChange: la función que se activa al cambiar de mapa en el selector de mapas. Llama a las funciones que despliega el nuevo mapa.

* renderExtraMapSelectorChange: la función que se activa al cambiar de mapa en el selector de mapas extra. Llama a las funciones de despliegue de mapas extra.

* updateUILevelSelectorChange: la función que llama el selector de nivel. Hace el cambio entre el agregado de estado y municipio.

* _stateStyle: la función de estilo para el agregado de estados. Regresa un objeto con propiedades CSS.

* _stateExtraStyle: la función de estilo para el agregado de estados en mapas extra. Regresa un objeto con propiedades CSS.

* _citytyle: la función de estilo para el agregado de municipios. Regresa un objeto con propiedades CSS.

* _stateExtraStyle: la función de estilo para el agregado de municipios en mapas extra. Regresa un objeto con propiedades CSS.

* _colorMixer: regresa una función que asigna el color para las geometrías o puntos, utilizando _classyBrew_.