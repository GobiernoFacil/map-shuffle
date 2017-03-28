# map-shuffle

## Descripción
Este proyecto contiene la primera versión del mapa de transparencia presupuestaria; los datos que despliega corresponden a la DB de OPA (obra pública abierta).

La información que despliega en el mapa, está contenida en la carpeta CSV.

## Configuración
EL mapa principal (mapa.html) contiene un solo punto de control, que define el url del sitio que debe abrir al seleccionar un punto en el mismo.

Este punto de control se encuentra al final del documento mapa.html: es una variable: 

<script>
    var GFSHCPbasePath = "/ficha.html";
</script>


