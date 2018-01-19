# card.helpers.v2.js

## dependencias
* d3
* leaflet

## métodos
* void initialize(config, map): hace la llamada al api de datos para obtener la información de la ficha.

* void render(data, container, template): utiliza el template para desplegar cada item de la respuesta.

* void hideEmptyValues(container): oculta los elementos de HTML que no contienen información en la ficha.

* void makeMap(container, d): genera un mapa con leaflet utilizando los datos del template.

* void renderCircle(el, data, className): genera una gráfica de pie.