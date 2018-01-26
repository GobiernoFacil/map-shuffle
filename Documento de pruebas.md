# Documento de pruebas

1.1 despliegue del mapa sin bases de datos

1.2 despliegue de un mapa de área

1.3 cambio de estado de un mapa de área

1.4 despliegue de un mapa de puntos

1.5 despliegue de un mapa extra

1.6 despliegue de gráfica 1

1.7 despliegue de gráfica 2

1.8 despliegue de gráfica 3

1.9 despliegue de gráfica 4

1.10 despliegue de buscador avanzado

1.11 descarga de datos en CSV

1.12 despliegue de filtros de estado

1.13 despliegue de filtros de ramo

1.14 despliegue de filtros personalizados

1.15 despliegue de filtros iniciales

1.16 carga de información vía api en el mapa

1.17 carga de información vía api en el buscador avanzado

1.18 activación de ficha en el mapa

1.19 despliegue de columnas en la ficha

1.20 despliegue de mapa en la ficha


## 1.1 despliegue del mapa sin bases de datos
código: MMDDAV2-CP-001
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa opere correctamente al copiar los archivos en el servidor web sin necesidad de tener ninguna base de datos.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"maps" : {
    "basePath"  : "/js/config",
    "maps"      : [],
    "extras"    : [],
    "current"   : 0,
    "embedPath" : "http://localhost:8000/mapa.html" 
  },
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. la propiedad "maps" del archivo config.map.json tiene un array vacío en "maps" y en "extras".
### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).



## 1.2 despliegue de un mapa de área
código: MMDDAV2-CP-002
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente un mapa de área. El mapa para ocupar será el de ramo 23.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"maps" : {
    "basePath"  : "/js/config",
    "maps"      : ["ramo23.map.json"],
    "extras"    : [],
    "current"   : 0,
    "embedPath" : "http://localhost:8000/mapa.html" 
  },
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. la configuración de la db ramo23.map.json está disponible en la carpeta definida en "basePath".
4. la db de ramo23 debe estar disponible en donden indica la propiedad "src" en el archivo ramo23.map.json

### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega un mapa de área a nivel estatal con la información del ramo 23.



## 1.3 cambio de estado de un mapa de área
código: MMDDAV2-CP-003
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente un mapa de área, y que permita cambiar el nivel de agregación a municipio. El mapa para ocupar será el de ramo 23.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"maps" : {
    "basePath"  : "/js/config",
    "maps"      : ["ramo23.map.json"],
    "extras"    : [],
    "current"   : 0,
    "embedPath" : "http://localhost:8000/mapa.html" 
  },
```
* en ramo23.map.json
```
"level" : ["state", "city"],
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. la configuración de la db ramo23.map.json está disponible en la carpeta definida en "basePath".
4. la db de ramo23 debe estar disponible en donden indica la propiedad "src" en el archivo ramo23.map.json

### flujo básico
1. se carga el url de la aplicación
2. en el selector de vistas, se selecciona la opción "municipio"
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega un mapa de área a nivel municipal con la información del ramo 23.



## 1.4 despliegue de un mapa de puntos
código: MMDDAV2-CP-004
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente un mapa de puntos. El mapa para ocupar será el de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"maps" : {
    "basePath"  : "/js/config",
    "maps"      : ["opa.map.json"],
    "extras"    : [],
    "current"   : 0,
    "embedPath" : "http://localhost:8000/mapa.html" 
  },
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. la configuración de la db opa.map.json está disponible en la carpeta definida en "basePath".
4. la db de obra pública abierta debe estar disponible en donde indica la propiedad "src" en el archivo opa.map.json

### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega un mapa de puntos con la información del Obra pública abierta.



## 1.5 despliegue de un mapa extra
código: MMDDAV2-CP-005
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente un mapa extra de área. El mapa para ocupar será el de declaratoria de desastre.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"maps" : {
    "basePath"  : "/js/config",
    "maps"      : ["opa.map.json"],
    "extras"    : ["areas_afectadas_desastre.json"],
    "current"   : 0,
    "embedPath" : "http://localhost:8000/mapa.html" 
  },
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. la configuración de la db areas_afectadas_desastre.json está disponible en la carpeta definida en "basePath".
4. la db de "Declaratoria de desastre" debe estar disponible en donde indica la propiedad "src" en el archivo areas_afectadas_desastre.json

### flujo básico
1. se carga el url de la aplicación
2. en el menú de "cargar capa para comparar", se selecciona la opción de "Declaratoria de desastre".
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega un mapa de área bajo el mapa principal, con la información de "Declaratoria de desastre" a nivel municipal.



## 1.6 despliegue de gráfica 1
código: MMDDAV2-CP-006
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente la primera gráfica, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"ux" : {
  ...
  "enableBarsTool" : 1,
  ...
  },
```
* en el archivo de opa.map.json
```
"graphs" : {
    "graph1" : {
      "title" : "Monto total invertido por año",
      "xAxis" : {
        "field" : "ciclo",
        "title" : "año",
        "type"  : null
      },
      "yAxis" : {
        "field" : "monto_total_inversion",
        "title" : "monto total invertido"
      },
      "zAxis" : {
        "field" : "ramo",
        "title" : "ramo",
        "type"  : "branch"
      },
      "maxLocations" : 5,
      "colors" : ["#bcce00", "#ee7336", "#25ae85", "#5aa099", "#462b5f", "#f49d51", "#008789", "#b3a493", "#1c9059", "#dc1918", "#b8c9d2","#75bf8d"]
    }
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar activada la opción de gráficas en el archivo de configuración
5. debe estar configurada la gráfica uno en el archivo de opa.map.json

### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega la sección de gráficas y es posible modificar la primera gráfica.



## 1.7 despliegue de gráfica 2
código: MMDDAV2-CP-007
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente la segunda gráfica, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"ux" : {
  ...
  "enableBarsTool" : 1,
  ...
  },
```
* en el archivo de opa.map.json
```
"graphs" : {
    "graph2" : {
      "title" : "Monto total por ramo",
      "value" : "monto_total_inversion",
      "area" : {
        "field" : "ramo",
        "title" : "ramo",
        "type"  : "branch"
      },
      "maxLocations" : 5,
      "colors" : ["#bcce00", "#ee7336", "#25ae85", "#5aa099", "#462b5f", "#f49d51", "#008789", "#b3a493", "#1c9059", "#dc1918", "#b8c9d2","#75bf8d"]
    },
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar activada la opción de gráficas en el archivo de configuración
5. debe estar configurada la gráfica dos en el archivo de opa.map.json

### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega la sección de gráficas y es posible modificar la segunda gráfica.



## 1.8 despliegue de gráfica 3
código: MMDDAV2-CP-008
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente la tercera gráfica, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"ux" : {
  ...
  "enableBarsTool" : 1,
  ...
  },
```
* en el archivo de opa.map.json
```
"graphs" : {
    "graph3" : {
      "title" : "Monto total invertido por año",
      "xAxis" : {
        "field" : "ciclo",
        "title" : "año",
        "type"  : null
      },
      "yAxis" : {
        "field" : "monto_total_inversion",
        "title" : "monto total invertido"
      },
      "zAxis" : {
        "field" : "ramo",
        "title" : "ramo",
        "type"  : "branch"
      },
      "maxLocations" : 5,
      "colors" : ["#bcce00", "#ee7336", "#25ae85", "#5aa099", "#462b5f", "#f49d51", "#008789", "#b3a493", "#1c9059", "#dc1918", "#b8c9d2","#75bf8d"]
    },
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar activada la opción de gráficas en el archivo de configuración
5. debe estar configurada la gráfica tres en el archivo de opa.map.json

### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega la sección de gráficas y es posible modificar la tercera gráfica.



## 1.9 despliegue de gráfica 4
código: MMDDAV2-CP-009
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente la tercera gráfica, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"ux" : {
  ...
  "enableBarsTool" : 1,
  ...
  },
```
* en el archivo de opa.map.json
```
"graphs" : {
    "graph4" : {
      "title" : "Monto total por año",
      "value" : "monto_total_inversion",
      "area" : {
        "field" : "ramo",
        "title" : "ramo",
        "type"  : "branch"
      },
      "points" : {
        "field" : "ciclo",
        "title" : "año",
        "type"  : null
      },
      "maxLocations" : 5,
      "colors" : ["#bcce00", "#ee7336", "#25ae85", "#5aa099", "#462b5f", "#f49d51", "#008789", "#b3a493", "#1c9059", "#dc1918", "#b8c9d2","#75bf8d"]
    }
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar activada la opción de gráficas en el archivo de configuración
5. debe estar configurada la gráfica cuatro en el archivo de opa.map.json

### flujo básico
1. se carga el url de la aplicación
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega la sección de gráficas y es posible modificar la cuarta gráfica.



## 1.10 despliegue de buscador avanzado
código: MMDDAV2-CP-010
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el mapa despliegue correctamente el buscador avanzado, que permita paginar, y que sus filtros funcionen, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"ux" : {
  ...
  "enableSearchTool" : 1,
  ...
  },
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar activada la opción "enableSearchTool" en el archivo de configuración

### flujo básico
1. se carga el url de la aplicación
2. se utilizan los botones de "anterior" y "siguiente" para moverse en la información
3. se selecciona un estado de la lista de filtros
### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se despliega la sección de buscador avanzado
3. al presionar lo botones de "anterior" y "siguiente" la tabla de resultados se actualiza, así como el indicador de la página actual
4. al seleccionar un estado, se despliegan en la lista solo los elementos que coinciden con ese estado.



## 1.11 descarga de datos en CSV
código: MMDDAV2-CP-011
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el buscador avanzado descargue un CSV con los datos seleccionados, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de config.map.json
```
"ux" : {
  ...
  "enableSearchTool" : 1,
  ...
  },
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar activada la opción "enableSearchTool" en el archivo de configuración

### flujo básico
1. se carga el url de la aplicación
2. se utiliza el botón "descargar" para obtener la información en CSV.

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en un browser moderno, se descarga el archivo CSV con nombre data.csv



## 1.12 despliegue de filtros de estado
código: MMDDAV2-CP-012
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el panel de filtros sirva para seleccionar información de tres estados, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.map.json
```
"filters" : [
    ...
    {"type" : "state", "field" : "state"},
    ...
  ],
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar definido el filtro de estado en opa.map.json

### flujo básico
1. se carga el url de la aplicación
2. se seleccionan tres estados del filtro de estado

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en el mapa se despliegan los puntos que coincidan con esos tres estados seleccionados.



## 1.13 despliegue de filtros de ramo
código: MMDDAV2-CP-013
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el panel de filtros sirva para seleccionar información de tres ramos, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.map.json
```
"filters" : [
    ...
    {"type" : "branch", "field" : "ramo"},
    ...
  ],
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar definido el filtro de ramo en opa.map.json

### flujo básico
1. se carga el url de la aplicación
2. se seleccionan tres ramos del filtro de ramos

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en el mapa se despliegan los puntos que coincidan con esos tres ramos seleccionados.



## 1.14 despliegue de filtros personalizados
código: MMDDAV2-CP-014
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: que el panel de filtros sirva para seleccionar información de una columna que no es parte de las columnas estándar (estado, municipio, ramo, unidad ejecutora), utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.map.json
```
"filters" : [
    ...
    {"type" : "year", "field" : "ciclo", "title" : "Ciclo"},
    ...
  ],
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. debe estar definido el filtro en opa.map.json

### flujo básico
1. se carga el url de la aplicación
2. se seleccionan opciones del filtro de configurado

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en el mapa se despliegan los puntos que coincidan con las opciones del filtro seleccionadas.



## 1.15 despliegue de filtros iniciales
código: MMDDAV2-CP-015
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: Que al iniciar el mapa, aparezcan activos algunos filtros de las columnas estándar, utilizando la información de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.map.json
```
"defaultFilters" : [
    {"type" : "year", "value" : 2017},
    {"type" : "branch", "value" : 11},
    {"type" : "unit", "value" : "11-114"}
  ],
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. deben estar definidos los filtros iniciales en opa.map.json

### flujo básico
1. se carga el url de la aplicación

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en el mapa se despliegan los puntos que coincidan con las opciones de los filtros iniciales seleccionados.



## 1.16 carga de información vía api en el mapa
código: MMDDAV2-CP-016
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: Que un mapa de puntos obtenga información a través de un api en lugar de una db local, utilizando la información de Entidades federativas.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de entidades.map.json
```
{
 ...
  "type"  : "point",
  "src"   : "http://localhost:8000/api/entidadesv2",
  "file"  : "json",
  "api"   : true,
  ...
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Entidades federativas.
4. Se cuenta con un servidor de datos con la información de entidades federativas, configurado para regresar la información en el formato necesario (ver documentación del código)

### flujo básico
1. se carga el url de la aplicación
2. se navega en el api con el menú de paginación que aparece

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en el mapa se despliegan los puntos que coinciden con la página y filtros seleccionados, y el api regresa la información correcta.



## 1.17 carga de información vía api en el buscador avanzado
código: MMDDAV2-CP-017
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: Que el buscador avanzado de un mapa de puntos obtenga información a través de un api en lugar de una db local, utilizando la información de Entidades federativas.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de entidades.map.json
```
{
 ...
  "type"  : "point",
  "src"   : "http://localhost:8000/api/entidadesv2",
  "file"  : "json",
  "api"   : true,
  ...
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Entidades federativas.
4. que el buscador avanzado esté activo.
5. Se cuenta con un servidor de datos con la información de entidades federativas, configurado para regresar la información en el formato necesario (ver documentación del código)

### flujo básico
1. se carga el url de la aplicación
2. se navega en el api con el menú de paginación que aparece en el buscador avanzado

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. en el buscador se despliegan los puntos que coinciden con la página y filtros seleccionados, y el api regresa la información correcta.



## 1.18 activación de ficha en el mapa
código: MMDDAV2-CP-018
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: Que un mapa de área o un registro en el buscador avanzado, permita abrir una ficha de descripción de proyecto. Para el ejemplo se usará la base de datos de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.map.json
```
{
 ...
  "link"  : {
    "url"    : "/opa.html",
    "column" : "key"
  },
  ...
}
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. que exista la página a la que dirige el link (opcional)

### flujo básico
1. se carga el url de la aplicación
2. se da clic en un punto del mapa o en un registro del buscador avanzado

### postcondiciones 
1. la aplicación carga sin problema y no hay mensajes de error en la consola; es posible que no carguen los tipos del sitio, pues estos no se distribuyen en el repositorio (Soberana Sans).
2. se abre una página con el url definido, seguido por un hash (#) y el valor de la columna establecida
3. si existe la página, se despliega la información solicitada


## 1.19 despliegue de columnas en la ficha
código: MMDDAV2-CP-019
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: Que una ficha despliegue la información requerida. Para el ejemplo se utilizará un registro de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.html
```
...
<div id="GF-opa-template" style="display: none">
  <h3 class="right">Clave de Cartera: 
    <span id="cveReport"><%=cve_ppi%></span>
  </h3>
</div>
...
<script>

  ...

  GFAPIBaseURL = "https://mapas.gobiernofacil.com/api/consulta/opa",
  GFTemplateBlockID = "GF-opa-template",
   ...
</script>
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. está disponible el endpoint de la ficha para opa

### flujo básico
1. se carga el url de la ficha

### postcondiciones 
1. se abre una página con el url definido, seguido por un hash (#) y el valor de la columna establecida
3. se despliega la información de la clave de cartera en donde la describe el template(cve_ppi)



## 1.20 despliegue de mapa en la ficha
código: MMDDAV2-CP-020
Autor: Gobierno fácil
fecha de creación: 23/ENE/2018
Actualizado por: Gobierno fácil
fecha de modificación: 23/ENE/2018
Objetivo: Que una ficha despliegue un mapa. Para el ejemplo se utilizará un registro de Obra pública abierta.
Actores: Administrador SHCP
Datos de entrada:
* en el archivo de opa.html
```
...
<div id="GF-opa-template" style="display: none">
  <div class="GF-SHCP-map" 
             data-lat="latitud_inicial"
             data-lng="longitud_inicial"
             style="width:100%; height:350px; frameborder:0; scrolling:no;"></div>
</div>
...
<script>

  ...
   GFMapClass = "GF-SHCP-map"
   ...
</script>
```

### precondiciones
1. se han copiado los archivos del repositorio en el servidor web
2. el servidor web está activo
3. Está disponible el mapa de Obra pública abierta.
4. está disponible el endpoint de la ficha para opa

### flujo básico
1. se carga el url de la ficha

### postcondiciones 
1. se abre una página con el url definido, seguido por un hash (#) y el valor de la columna establecida
3. se despliega un mapa que reemplaza al div con los metadatos de las columnas y la clase definida al iniciar el template.


