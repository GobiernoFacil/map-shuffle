# map-shuffle

## Descripción
Este proyecto contiene la primera versión del mapa de transparencia presupuestaria; los datos que despliega corresponden a la DB de OPA (obra pública abierta).

La información que despliega en el mapa, está contenida en la carpeta CSV.

## Configuración
EL mapa principal (mapa.html) contiene un solo punto de control, que define el url del sitio que debe abrir al seleccionar un punto en el mismo.

Este punto de control se encuentra al final del documento mapa.html: es una variable: 

```javascript
<script>
    var GFSHCPbasePath = "/ficha.html";
</script>
```

El documento ficha.html contiene cuatro variables de control:
* GFLinksBaseURL: contiene el url de la ficha del proyecto,
* GFAPIBaseURL: el endpoint de datos.gob para obtener la ficha completa del proyecto
* GFNotesFile: el documento que contiene las notas de los proyectos
* GFLinksFile: la relación entre links y proyectos de opa

```javascript
<script>
  var Format         = d3.format(","),
      GFLinksBaseURL = "http://nptp.hacienda.gob.mx/programas/jsp/programas/fichaPrograma.jsp?id=",
      GFAPIBaseURL   = "http://api.datos.gob.mx/v1/proyectos-opa",
      GFNotesFile    = "csv/notas.csv",
      GFLinksFile    = "csv/ppi-links.csv";
</script>
```

## Denuncias de la ASF
La funcionalidad de denuncias está desactivada (no apunta a ningún lado); una vez que esté en la versión de producción el sistema de la ASF, se actualizará este módulo.
