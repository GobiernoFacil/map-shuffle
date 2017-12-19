# Guía de instalación

## Configuración HTML
1. hay que descargar del siguiente repositorio los archivos del proyecto:
```
https://github.com/GobiernoFacil/map-shuffle
```

2. Dentro de los documentos del repositorio, hay un archivo de prueba llamado index.html; en este se puede ver que se requieren cuatro hojas de estilo: la de leaflet, la de bootstrap, la de un plugin para dropdowns (selectize) y la del diseño actual.
```
<link rel="stylesheet" type="text/css" href="js/libs/leaflet.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/selectize.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">
```

En cuanto al JS, hay dos archivos que permiten ejecutar la aplicación. Para el modo de desarrollo requiere el archivo "require.js", en el que también es necesario especificar la propiedad _data-main_, que es donde está la configuración de require.js. La propiedad _data-main_ debe incluir el nombre del archivo de configuración sin la extensión "js".
```
<script data-main="js/main.map" src="js/libs/require.js"></script>
```

Para el caso de producción, el archivo necesario es main-built.js, que se genera mediante node. Al final de esta guía viene el proceso para generar este archivo.
```
<script src="/js/main-built.js"></script>
```

Una vez que los archivos están en el servidor, solo es neceario configurar dos rutas:
* En config.map.json la propiedad maps.basePath, donde se especifica la ruta absuluta para los archivos de configuración de los mapas
```
"maps" : {
    "basePath"  : "/js/config",
    "maps"      : ["ramo23.map.json", "opa.map.json", "entidades.map.json"],
    "extras"    : ["areas_afectadas_desastre.json"],
    "current"   : 0,
    "embedPath" : "http://localhost:8000/mapa.html" 
}
```
* En cada archivo de configuración de mapa es necesario poner la ruta absuluta donde ese encuentra la DB con la información a desplegar
```
"src"   : "/js/maps/opa.json"
```

Para más información, hay que consultar la guía de configuración del mapa general y particular.


## Configuración general del mapa
### descripción
dentro de la carpeta "js", existe un archivo json llamado: config.map.json; este archivo de configuración sirve para definir:
* el aspecto inicial del plugin de leaflet,
* la fuente de datos geográficos, 
* el diseño para las geometrías (estados, municipios),
* el diseño para los puntos (cuando se muestre elementos con latitud y longitud)
* los mapas que se ocuparan, mediante una lista de archivos de configuración,
* el mapa que se desplegará primero

Un detalle con respecto a la lista de archivos de configuración, es que se espera que todos compartan directorio, y de preferencia, que todos estén en el mismo dominio que el sistema.

### variables
El archivo json de configuración contiene cuatro elementos:
map, mapPoint, mapGeometry y maps.

##### map
las propiedades de map definirán el objeto de inicio para Leaflet. Para conocer más a fondo las propiedades de Leaflet, se puede consultar la documentación: 
```
http://leafletjs.com/reference-1.0.3.html
```

Las propiedades mínimas requeridas son las siguientes:
* div: el nombre del id único en el HTML para desplegar el mapa
* lat: la latitud inicial del mapa
* lng: la longitud inicial del mapa
* zoom : el zoom inicial del mapa
* tileServer: el url del servidor de imágenes geográficas
* tileServerConfig: esta propiedad tiene a su vez dos propiedades, "maxZoom", que es el zoom máximo que desplegará el mapa; y "attribution", que es el crédito que se le da al proveedor de imágenes geográficas.
* attributions: es un array de otros créditos, para mencionar las fuentes de los datos, como por ejemplo SHCP, SAGARPA, IMCO, etc.

Aquí un ejemplo de map:
```
"map" : {
    "div"         : "GF-SHCP-map",
    "lat"         : 22.442167,
    "lng"         : -100.110350,
    "zoom"        : 5,
    "tileServer"  : "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "tileServerConfig" : {
      "maxZoom"     : 18,
      "attribution" : "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    },
    "attributions" : ["SHCP"]
  }
```

##### mapPoint
el elemento mapPoint es una colección de propiedades CSS para un punto SVG. Cualquier propiedad puede ser definida aquí, y se aplicarán todas las que sean válidas. Si no son definidas correctamente las propiedades CSS, los puntos no se desplegarán.

Las propiedades mínimas requeridas son las siguientes:
radius: el radio del punto cuando son visibles varios estados en el mapa; es un entero (px)
radius2: el radio del punto cuando se distinguen elementos de transito; es un entero (px), y se recomienda que sea mayor a radius.

Aquí un ejemplo de mapPoint:
```
"mapPoint" : {
    "radius"      : 2,
    "radius2"     : 5,
    "fillColor"   : "rgb(244, 157, 81)",
    "color"       : "rgb(214, 103, 6)",
    "weight"      : 1,
    "opacity"     : 0.3,
    "fillOpacity" : 0.9
  },
```

##### mapGeometry
el elemento mapGeometry es una colección de propiedades CSS para una geometría SVG. Cualquier propiedad puede ser definida aquí, y se aplicarán todas las que sean válidas. Si no son definidas correctamente las propiedades CSS, las geometrías no se desplegarán.

No hay propiedades obligatorias, aunque sin una definición válida de CSS, no se desplegarán los estados/municipios

Aquí un ejemplo de mapGeometry:
```
"mapGeometry" : {
    "weight"      : 0.4,
    "opacity"     : 0.1,
    "color"       : "black",
    "dashArray"   : "",
    "fillOpacity" : 1
  },
```

##### extraMapGeometry
al igual que mapGeometry, define el diseño por default para los mapas superpuestos, y funciona de la misma manera.

##### maps
En el objeto maps, se definen los archivos de configuración de cada mapa (csv, json, tsv) que formará parte de la aplicación.

Las propiedades son las siguientes:
basePath : la ruta donde están guardados todos los archivos de configuración. Esta ruta se recomienda que esté dentro del mismo dominio que la aplicación.
maps : es un array con la lista de archivos de configuración
extras : al igual que maps, es una lista de archivos de configuración, pero de mapas que serán de soporte, y no principales
current : el mapa que desplegará al iniciar la aplicación. El valor debe ser un entero, y debe ser la posición del archivo de configuración en el array "maps". El conteo inicia en cero; es decir, si se quiere que se despliegue el segundo mapa al inicio, el valor debe ser "1".
embedPath: Aquí se define el url completo de donde cargarán los mapas en otros sitios, implementados mediante un iframe. Aquí se recomienda tener una segundo dirección, sin diseño, que permita al mapa acoplarse mejor a otro proyecto.

Aquí un ejemplo de maps:
```
"maps" : {
    "basePath" : "/js",
    "maps"     : ["ramo23.map.json", "opa.map.json", "tomas.map.json", "gasolina.map.json"],
    "extras"   : ["poblacion.map.json"],
    "current"  : 3,
    "embedPath": "https://gobiernofacil.com/mapa2.html" 
  }
```

El archivo de configuración completo debería ser de la siguiente manera:
```
{
  "map" : {
    "div"         : "GF-SHCP-map",
    "lat"         : 22.442167,
    "lng"         : -100.110350,
    "zoom"        : 5,
    "tileServer"  : "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "tileServerConfig" : {
      "maxZoom"     : 18,
      "attribution" : "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    },
    "attributions" : ["SHCP"]
  },
  "mapPoint" : {
    "radius"      : 2,
    "radius2"     : 5,
    "fillColor"   : "rgb(244, 157, 81)",
    "color"       : "rgb(214, 103, 6)",
    "weight"      : 1,
    "opacity"     : 0.3,
    "fillOpacity" : 0.9
  },
  "mapGeometry" : {
    "weight"      : 0.4,
    "opacity"     : 0.1,
    "color"       : "black",
    "dashArray"   : "",
    "fillOpacity" : 1
  },
  "maps" : {
    "basePath" : "/js",
    "maps"     : ["ramo23.map.json", "opa.map.json", "tomas.map.json", "gasolina.map.json"],
    "extras"   : ["poblacion.map.json"],
    "current"  : 3
  }
}
```

##### ui
Dentro del objeto UI, se definen una serie de clases e identificadores únicos para los elementos de interfaz, para que el sistema pueda reconocerlos (Y no estén definidos dentro del código!); se recomienda no alterar estos identificadores y clases, a menos que alguno colapse con alguna definición del sistema (que se repita un id, o que una clase se utilice para otra cosa en la misma página).

Los identificadores son los siguientes:
topToolsDiv: el contenedor principal de herramientas.
bottomToolsDiv: el contenedor secundario de herramientas. 
mapSelector: el selector de mapas.
extraMapSelector: el selector de mapas secundario.
pageSelector: la herramienta de paginación para el mapa 
filterSelector: el selector de filtros del mapa
barsTool: la herramienta de comparación
geolocationBtn: el botón de geolocalización del usuario
geolocationForm: el formulario de geolocalización
geolocationField: el input de la búsqueda de geolocalización
searchTable: la tabla de búsqueda avanzada
projectCounter: el contador de proyectos
colorGuide: la guía de color
embedForm:el input con la información de "embebido"
downloadDataBtn: el botón para descargar los datos
  
##### ux  
En este objeto se define la configuración de los elementos de interacción. Las propiedades usadas son las siguientes:

findMeZoom: el zoom que debe tener el mapa al geolocalizar al usuario.
geocoding: el endpoint del api de geolocalización  

## Configuración particular de un mapa con datos
Dentro del archivo de config.map.json, se definen distintos archivos json de configuración para cada mapa particular (OPA, Ramo23, etc.); cada uno de estos archivos configura la carga de datos y su método de despliegue.

El archivo de configuración de un mapa particular, tiene las siguientes propiedades:

name : el nombre que aparece en el selector de mapas 

type : puede ser "area" o "point". En el caso de "area", se espera que el archivo con los datos, contenga la clave de estado y, de manera opcional, la clave de municipio del INEGI. en el caso de "point", se espera que tenga la variable de latitud y de longitud (por separado). En la opción de "area", se dibujarán geometrías que delimiten los estados o municipios, agregando la variable numérica seleccionada; para "point", se representará un punto para cada entrada de la lista de datos. Una macbook con un procesador pequeño, puede manejar 15k puntos sin problema, pero más de estos puede alentar la navegación del mapa.

multiple: Propiedad de las gráficas de puntos, que si tiene un valor verdadero, verifica punto por punto si hay otros puntos que desplieguen en el mismo lugar, para agregarlos en un solo template. Es recomendable no hacer esto para colecciones mayores a 5000 elementos, pues puede tardar para hacer todas las revisiones.

level : Este es un array con los niveles posibles de despliegue de la información. Si es "area" el type, este array puede contener "state", para la agregación por estado, y "city", para la agregación por municipio. En el caso de "point", el array estará vacío.

src : Aquí se define la ruta absoluta del archivo con los datos, por ejemplo:
```
"/js/maps/ramo23-2017.csv"
```

file : el tipo de archivo. Puede ser csv, tsv o json. En el caso de json, toda la información debe estar en el primer nivel, es decir, ninguna propiedad del objeto puede ser a su vez otro objeto, por ejemplo, esto es correcto:
```
{"nombre" : "arturo c.", "edad" : 35}
```
pero esto no:
```
{"persona" : {"nombre" : "arturo c.", "edad" : 35}}
```

link : aquí se definen dos propiedades, el url donde se despliega la ficha del elemento, y cuál es la propiedad que debe enviarse después del hash (para que se genere algo como htttps://gobiernofacil.com/laficha.html#fd345632

aquí un ejemplo
```
"link"  : {
    "url"    : "/escuelas.html",
    "column" : "CLAVECENTROTRABAJO"
  }
```

style: este es un objeto con propiedades CSS que modifican la configuración inicial de diseño para el mapa que se está configurando.

location : Este es un objeto con dos propiedades que definen el nombre del id de estado y el id de municipio para cuando se trata de "area", o es un objeto vacío cuando se trata de "point". Para definir la variable con el id de estado, se le asigna a "state", y para la variable de municipio, se le asigna a "city". En el caso de "point", las variables por definir son "lat" para la latitud, y "lng" para la longitud.

Aquí un ejemplo para "area":
```
"location" : {
    "state" : "id_entidad",
    "city"  : "id_municipio"
  },
```

y uno para "point":
```
"location" : {
    "lat" : "latitud",
    "lng" : "longitud"
  },
```

values : este es una array con todos los valores numéricos que pueden ser agregados o comparados dentro del archivo de datos. Pueden ser por ejemplo, número de elementos, o montos de dinero. Aunque la variable de año es numérica, no se recomienda agregarla a esta lista (para eso habrá también filtro por año)
```
"values"  : ["monto", "pagado"]
```

data : Aquí va un array de variables que deberían estar disponible para el sistema, que vienen en el archivo de datos. Por ejemplo, si se trata de un csv con 15 columnas, pero solo se utilizarán 5, aquí se deciden qué columnas deben ser. Esto para hacer eficiente el sistema
```
"data"    : ["clave_de_programa", "fondo", "entidad", "municipio", "proyecto"]
```

current : Este es un objeto que define cuál será el nivel de área que hay que desplegar al iniciar el mapa, y cuál es la variable que se debe agregar. Para "point", este será un objeto vacío. Por ejemplo, para agregar la información a nivel estado, y usando una variable llamada "monto", debería quedar el objeto current de la siguiente manera:
```
"current" : {
    "level" : "state",
    "value" : "monto"
  }
```

template : Esta es una variable que define el template que para el popup que tiene cada elemento (punto o grometría). acepta cualquier etiqueta de HTML y para insertar variables del csv|json, hay que agregarlas dentro de la siguiente estructura: "<%=variable%>". De este modo, supongamos que el csv incluye los campos de nombre de proyecto(pr_nom) y costo del mismo (pr_cos),  un template podría ser de esta manera:
```
"template" : "<p>proyecto:<%=pr_nom%>, costo:<%=pr_cos%> </p>"
```

Un objeto de configuración completo para "area", tendría esta estructura:
```
{
  "type"  : "area",
  "level" : ["state", "city"],
  "src"   : "/js/maps/ramo23-2017.csv",
  "file"  : "csv",
  "location" : {
    "state" : "id_entidad",
    "city"  : "id_municipio"
  },
  "values"  : ["monto", "pagado"],
  "data"    : ["clave_de_programa", "fondo", "entidad", "municipio", "proyecto"],
  "current" : {
    "level" : "state",
    "value" : "monto"
  }
}
```

y para "point":
```
{
  "type"  : "point",
  "level" : [],
  "src"   : "/js/maps/gasolina_puntos.csv",
  "file"  : "csv",
  "location" : {
    "lat" : "lat",
    "lng" : "lng"
  },
  "values"  : [],
  "data"    : ["id","place_id","name","brand","category","address"],
  "current" : {},
  "template" : "<p><%=name%>:<%=osm_state%></p>"
}
```

filters: aquí se puede definir una lista de filtros disponibles para el mapa. Los filtros son los siguientes: year, state, city, branch, unit.

cada uno se define de la misma manera. Primero se define el tipo, que puede ser cualquiera de los cinco antes mencionados. Después el nombre de la columna donde está definido; por ejemplo, para "year", la columna podría ser: ANIO_EJECUCION. Por último, se define si este filtro estará seleccionado en algún valor por default. 

Esta es la estructura básica:

```
"filters" : [
    {"type" : "state", "field" : "CLAVE_ENTIDAD", "default":21},
    {"type" : "year", "field" : "ANIO_EJECUCION"},
    {"type" : "branch", "field" : "ramo"},
    {"type" : "unit", "field" : "id_unidad"},
    {"type" : "city", "field" : "id_ciudad"}
  ],
```

extraFilters : al igual que la lista de filtros, se define una segunda lista de elementos disponibles para filtrar en el mapa, pero seleccionado solamente la columna que se debe filtrar (y agregar en valores únicos). La diferencia, es que hay que especificar el nombre del campo y al tipo de filtro, se le debe poner "extra". Aquí un ejemplo:

```
"extraFilters" : [
    {"type" : "extra", "field" : "classification", "title" : "clasificación ciudadana"}
  ],
```

# Optimización del código
Para generar el build que agrupa todas las librerías necesarias y el archivo de coonfiguración principal, es necesaria la herramienta de requirejs (r.js) y Node. La guía de instalación/descarga de la herramienta require se encuentra [aquí](http://requirejs.org/docs/optimization.html)

Ya con la herramienta disponible, es necesario ejecutar mediante node la aplicación de require(r.js), con el flag -o y la ruta del archivo que contiene la configuración del build. Este archivo se encuentra dentro de la carpeta JS y se llama _build.js_.

Aquí un ejemplo:
```
 node /usr/local/bin/r.js -o build.js
```

# Configuración de los templates
Dentro de la configuración de cada mapa, es posible definir un objeto llamado _link_. En este se definen dos propiedades, _url_ y _column_. 
```
"link"  : {
    "url"    : "/opa.html",
    "column" : "key"
  },
```

La primera define el url absoluto que despliega el template de la base de datos actual. La segunda define la columna que se utiliza para buscar el identificador del registro que se quiere desplegar. con estas dos, se genera un url que consta del template más el signo _#_ y el valor de la columna seleccionada; algo similar a esto:
```
/opa.html#133891A0004
```

A estos links se puede acceder mediante los puntos de un mapa o los registros de la búsqueda avanzada. 

## Creación de un archivo de template.
Un archivo de template es un html que contiene ciertas librerías de JS y CSS para funcionar de manera correcta. 

Para crear un template lo primero que se necesita es incluir al inicio los siguientes archivos css:
* css/styles.css
* css/leaflet.css

Al final del HTML es necesario incluir las siguientes librerías de JS:
* js/libs/d3.v3.min.js
* js/libs/jquery-3.1.1.min.js
* js/libs/underscore-min.js
* js/libs/leaflet.js
* js/card.helpers.v2.js

Una vez que se tienen estas librerías, es posible construir el template.

Los diversos elementos que componen el template son los siguientes:

## Endpoint
Todo template depende de un api que se define dentro del template, y un valor que recibe de la aplicación de mapas (la propiedad _column_ del objeto _link_). Con esto se forma una petición __GET__ que une el endpoint con el valor recibido. Aquí un ejemplo para un valor "133891A0004":
```
https://mapas.gobiernofacil.com/api/consulta/opa/133891A0004
```

El desarrollo del api para cada template sale del scope del proyecto, pero el mismo espera recibir un objeto con dos propiedades: total y resultados. El primero es el número de registros que responden al identificador enviado, y el segundo un array con los registros (cada registro un objeto json). 
```
{total: 15, resultados : [...]}
```

El endpoint se define dentro de una variable llamada _GFSHCPConfig_, en la propiedad _endpoint_. Más adelante se detalla cada elemento de esta variable de configuración.

## mensaje de error
Un elemento de bloque que informe que no es posible desplegar la información seleccionada. Este debe tener un id único y su propiedad de _display_ igual a _none_.
```
<!-- MENSAJE DE ERROR -->
  <div id="GF-error-message" style="display: none">
    La información no está disponible
  </div>
```

## el template
El template principal está diseñado para soportar múltiples registros; este elemento de template es una etiqueta de bloque que define qué datos se despliegan, y su método de despliegue: gráficas, mapas, html. Esta etiqueta debe tener un identificador único y su propiedad de _display_ igual a _none_. Para desplegar  cada dato, se utiliza _underscore_. Para una guía de cómo utilizar esta librería, hay que revisar [este link](http://underscorejs.org/#template).

Aquí un ejemplo de un template sin diseño y con elemento de contenido

```
<div id="GF-entidades-template" style="display: none;">
  <section>
    <h2>Template básico de entidades federativas</h2>

    <div class="GF-SHCP-map" 
         data-lat="LATITUD"
         data-lng="LONGITUD"
         style="width:400px; height:350px; frameborder:0; scrolling:no;"></div>
         
    <p><%=FOLIO%></p>
    <p><%=NOMBRE_PROYECTO%></p>
    <p><%=NUMERO_PROYECTO%></p>
    <p><%=ID_ENTIDAD_FEDERATIVA%></p>
    <p><%=ENTIDAD%></p>
    <p><%=ID_MUNICIPIO%></p>
    <p><%=MUNICIPIO%></p>
    <p><%=ID_LOCALIDAD%></p>
    <p><%=LOCALIDAD%></p>
    <p><%=LATITUD%></p>
    <p><%=LONGITUD%></p>
    <p><%=AMBITO%></p>
    <p><%=ID_RECURSO%></p>

    <div class="GF-SHCP-circle"
         data-width="160"
         data-height="130"
         data-color-a="rgb(190,205,81)"
         data-color-b="rgb(210,210,210)"
         data-column="AVANCE_FISICO"></div>

  </section>
  </div>
```