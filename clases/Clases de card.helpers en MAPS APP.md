# card.helpers.v2.js

## dependencias
* d3
* leaflet

## funciones (clases)
* initialize: hace la llamada al api de datos para obtener la información de la ficha.
* render: utiliza el template para desplegar cada item de la respuesta.
* hideEmptyValues: oculta los elementos de HTML que no contienen información en la ficha.
* makeMap: genera un mapa con leaflet utilizando los datos del template.
* renderCircle: genera una gráfica de pie.