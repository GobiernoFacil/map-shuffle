# Guía de instalación

## Configuración HTML
1. hay que descargar del siguiente repositorio los archivos del proyecto:
```
https://github.com/GobiernoFacil/map-shuffle
```

2. Dentro de los documentos del repositorio, hay un archivo de prueba llamado mapa.html; en este se puede ver que se requieren dos archivos para que el sistema funcione:
* el css de Leaflet, que se encuentra por default en: /js/libs/leaflet.css (aunque puede moverse a cualquier directorio, siempre y cuando este se especifique al cargar el archivo)
* el plugin requirejs, que debe incluir la liga al archivo de configuración de la aplicación, de la siguiente manera:
```
<script data-main="js/main.map" src="js/libs/require.js"></script>
```

donde la propiedad "data-main" debe incluir el nombre del archivo de configuración sin la extensión "js".

3. Por último, es necesario agregar un div con un id único; este servirá para cargar el mapa. El CSS para este mapa no influye en el funcionamiento del mismo, aunque sí puede afectar la usabilidad (en caso de ser muy pequeño, por ejemplo).


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

##### maps
En el objeto maps, se definen los archivos de configuración de cada mapa (csv, json, tsv) que formará parte de la aplicación.

Las propiedades son las siguientes:
basePath : la ruta donde están guardados todos los archivos de configuración. Esta ruta se recomienda que esté dentro del mismo dominio que la aplicación.
maps : es un array con la lista de archivos de configuración
extras : al igual que maps, es una lista de archivos de configuración, pero de mapas que serán de soporte, y no principales
current : el mapa que desplegará al iniciar la aplicación. El valor debe ser un entero, y debe ser la posición del archivo de configuración en el array "maps". El conteo inicia en cero; es decir, si se quiere que se despliegue el segundo mapa al inicio, el valor debe ser "1".

Aquí un ejemplo de maps:
```
"maps" : {
    "basePath" : "/js",
    "maps"     : ["ramo23.map.json", "opa.map.json", "tomas.map.json", "gasolina.map.json"],
    "extras"   : ["poblacion.map.json"],
    "current"  : 3
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

## Configuración particular de un mapa con datos
Dentro del archivo de config.map.json, se definen distintos archivos json de configuración para cada mapa particular (OPA, Ramo23, etc.); cada uno de estos archivos configura la carga de datos y su método de despliegue.

El archivo de configuración de un mapa particular, tiene las siguientes propiedades:

type : puede ser "area" o "point". En el caso de "area", se espera que el archivo con los datos, contenga la clave de estado y, de manera opcional, la clave de municipio del INEGI. en el caso de "point", se espera que tenga la variable de latitud y de longitud (por separado). En la opción de "area", se dibujarán geometrías que delimiten los estados o municipios, agregando la variable numérica seleccionada; para "point", se representará un punto para cada entrada de la lista de datos. Una macbook con un procesador pequeño, puede manejar 15k puntos sin problema, pero más de estos puede alentar la navegación del mapa.

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
