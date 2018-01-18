# filter.module.map.js

## dependencias
* underscore
* selectize

## funciones (clases)
* reduceFilters: genera una lista inicial de filtros seleccionados, basándose en el archivo de configuración.
* filter: filtra la información en base a los filtros seleccionados, y hace la llamada a la función de render correspondiente (puede ser llamada desde el mapa, desde las gráficas o desde el buscador avanzado).
* _filterData: filtra la información dependiendo su tipo (string, number, state, city, branch, unit).
* renderSearchInput: despliega un input de texto para búsqueda por palabra.
* enableSearch: habilita la función de filtrado en el formulario   seleccionado.
* renderStateSelector: despliega una lista de estados.
* resetDependentSelector: elimina las opciones de los select de ciudad y unidad ejecutora cuando cambia su elemento de control (estado o ramo).
* renderCitySelector: despliega el select de municipios.
* renderBranchSelector: despliega una lista de ramos.
* renderBranchSelectorV2: despliega una lista de ramos utilizando el plugin de _selectize_. En la versión actual no se utiliza.
* renderUnitSelector: despliega el select de unidades ejecutoras.
* renderOtherSelector: despliega un select con las opciones para una columna de información que no corresponde a las predeterminadas (state, city, branch o unit).
* renderCartItem: agrega un elemento al carro de compras (para reflejar la selección de un nuevo filtro).
* renderClearFilterBtn: agrega un botón para eliminar filtros en el carro de compras.
* renderClearFilterBtn2: agrega un botón para eliminar filtros en el menú de filtros del mapa.
* updateCitySelector: actualiza la lista de municipios en el select en base al estado actual.
* updateUnitSelector: actualiza la lista de unidades ejecutoras en el select en base al ramo actual.
* enableFiltering: activa la callbacks para el cambio en los dropdowns.
* enableFilteringV2: activa la callbacks para el cambio en los dropdowns que utilizan _selectize_.
* findLabel: busca el nombre del elemento seleccionado con base en su id para elementos predefinidos: state, city, branch, unit.
* _makeList: dada una lista de datos, elimina los valores falsos, y aplica la función _sort_.
* _setUniq: actualiza un filtro único. El la versión actual no se utiliza, pues ya no hay filtros únicos, es posible seleccionar múltiples opciones de un solo filtro.
* _removeFilters: elimina los filtros de un tipo seleccionado. En la versión actual no se utiliza.
* _enableDefaultFilters: activa los filtros iniciales especificados en el archivo de config.
* _clearFilters: elimina todos los filtros seleccionados. En la versión actual no se utiliza.