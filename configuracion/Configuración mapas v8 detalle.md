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

* __dataSearch__ : Este es un array donde se definen las columnas que se desplegarán en la búsqueda avanzada. Por ejemplo:

```
  "dataSearch" : ["monto_total_inversion", "ejercido", "key","name","ramo","unidad","state","advance","ciclo","classification"]
```

* __columns__: Este es un array que sirve para reemplazar los nombre de cada columna de la db por otro nombre más comprensible, por ejemplo, cambiar "ESTADOS_NOMBRE" por "estado". Esta sustitución se hará en los nombres de las columnas del buscador avanzado. Aquí un ejemplo:

```
 "columns" : {
    "GFSHCPurl" : "ficha",
    "monto_total_inversion" : "monto total"
  },
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
* __graphs.graph2.value__: el nombre de la columna por agregar en la gráfica. Esta columna debe ser numérica y debe pertenecer al array data.
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
* __graphs.graph2.area.field__: el nombre de la columna que determina cómo se agregan las cantidades de value. Se recomienda usar la clave del ramo, pero es posible usar otros campos como el año o alguna categoría.
```
"field" : "ramo"
```
graphs.graph2.area.title: el nombre de la columna que determina cómo se agregan las cantidades. Aquí es cómo lo leerá el usuario.
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
graphs.graph3.colors: los colores para usar en la gráfica y el orden en el que aparecen
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
* __graphs.graph3.yAxis.field__: el nombre de la columna por agregar en la gráfica. Esta columna debe ser numérica y debe pertenecer al array data.
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
* __graphs.graph4.value__: el nombre de la columna por agregar en la gráfica. Esta columna debe ser numérica y debe pertenecer al array data.
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
* __graphs.graph4.area.field__: el nombre de la columna que determina cómo se agregan las cantidades de value. Se recomienda usar la clave del ramo, pero es posible usar otros campos como el año o alguna categoría.
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


