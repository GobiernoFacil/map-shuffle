[
  {
    "_id": "58006323ddfcdd3fc616d45b",
    "nombre": "prog-avance-de-indicadores",
    "variables": [
      {
        "descripcion": "Determina el ciclo presupuestario de referencia.",
        "variable": "ciclo",
        "type" : "integer",
        "db" : "year"
      },
      {
        "descripcion": "Clave del Ramo de acuerdo con la estructura programática del Presupuesto de Egresos de la Federación vigente para cada ciclo (consulta los ramos en http://www.transparenciapresupuestaria.gob.mx/work/models/PTP/DatosAbiertos/Metadatos/Catalogos_Presupuestarios_2016.xlsx).",
        "variable": "id-ramo",
        "type" : "integer",
        "db" : "branch_id"
      },
      {
        "descripcion": "Descripción del Ramo de acuerdo con la estructura programática del Presupuesto de Egresos de la Federación vigente para cada ciclo (consulta los ramos en http://www.transparenciapresupuestaria.gob.mx/work/models/PTP/DatosAbiertos/Metadatos/Catalogos_Presupuestarios_2016.xlsx).",
        "variable": "desc-ramo",
        "type" : "string",
        "db" : "branch_name"
      },
      {
        "descripcion": "Clave de la Unidad Responsable adscrita al Ramo que coordina el registro de la información del desempeño del programa presupuestario.",
        "variable": "id-ur",
        "type" : "integer",
        "db" : "unit_id"
      },
      {
        "descripcion": "Descripción de la Unidad Responsable adscrita al Ramo que coordina el registro de la información del desempeño del programa presupuestario.",
        "variable": "desc-ur",
        "type" : "string",
        "db" : "unit_name"
      },
      {
        "descripcion": "Clave de la Entidad Federativa, de acuerdo con el “Catálogo de entidades federativas, municipios y localidades” que elabora el Instituto Nacional de Estadística y Geografía (INEGI).",
        "variable": "id-entidad-federativa",
        "type" : "integer",
        "db" : "state_id"
      },
      {
        "descripcion": "Nombre de la Entidad Federativa, de acuerdo con el “Catálogo de entidades federativas, municipios y localidades” que elabora el Instituto Nacional de Estadística y Geografía (INEGI).",
        "variable": "entidad-federativa",
        "type" : "string",
        "db" : "state_name"
      },
      {
        "descripcion" : "Clave del Municipio o Demarcación Territorial de la Ciudad de México, de acuerdo con el “Catálogo de entidades federativas, municipios y localidades” que elabora el Instituto Nacional de Estadística y Geografía (INEGI).",
        "variable" : "id-municipio",
        "type" : "integer",
        "db" : "city_id"
      },
      {
        "descripcion": "Nombre del Municipio o Demarcación Territorial de la Ciudad de México, de acuerdo con el “Catálogo de entidades federativas, municipios y localidades” que elabora el Instituto Nacional de Estadística y Geografía (INEGI).",
        "variable": "municipio",
        "type" : "string",
        "db" : "city_name"
      },
      {
        "descripcion": "Clave que corresponde al primer nivel (o dígito) de la Clasificación Funcional del Gasto (forma de presentación del presupuesto que agrupa los gastos según los propósitos u objetivos socioeconómicos que persiguen los diferentes entes públicos) que permite identificar las actividades que realiza el Estado para cumplir con sus fines de: Desarrollo Social, Desarrollo Económico y Gobierno.",
        "variable": "gpo-funcional"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “GPO_FUNCIONAL”, que se refiere al primer nivel (o dígito) de la Clasificación Funcional del Gasto (forma de presentación del presupuesto que agrupa los gastos según los propósitos u objetivos socioeconómicos que persiguen los diferentes entes públicos) que permite identificar las actividades que realiza el Estado para cumplir con sus fines de: Desarrollo Social, Desarrollo Económico y Gobierno.",
        "variable": "desc-gpo-funcional"
      },
      {
        "descripcion": "Clave que corresponde al segundo nivel (o dígito) de la Clasificación Funcional del Gasto que permite identificar las acciones que realizan las Unidades Responsables para cumplir con los ordenamientos legales, de acuerdo con cada uno de los Grupos Funcionales.",
        "variable": "id-funcion"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “ID_FUNCION”, que se refiere al segundo nivel (o dígito) de la Clasificación Funcional del Gasto que permite identificar las acciones que realizan las Unidades Responsables para cumplir con los ordenamientos legales, de acuerdo con cada uno de los Grupos Funcionales.",
        "variable": "desc-funcion"
      },
      {
        "descripcion": "Clave que corresponde al tercer nivel (o dígito) de la clasificación funcional del gasto que identifica en forma más precisa las actividades que realizan las dependencias y entidades al interior de una función.",
        "variable": "id-subfuncion"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “ID_SUBFUNCION”, que se refiere al tercer nivel (o dígito) de la clasificación funcional del gasto que identifica en forma más precisa las actividades que realizan las dependencias y entidades al interior de una función.",
        "variable": "desc-subfuncion"
      },
      {
        "descripcion": "Clave con la que se identifica la Actividad Institucional, entendida como las acciones sustantivas o de apoyo que realizan los ejecutores de gasto con el fin de dar cumplimiento a los objetivos y metas contenidos en los programas presupuestarios, de conformidad con las atribuciones que les señala su respectiva ley orgánica o el ordenamiento jurídico que les es aplicable (3 dígitos).",
        "variable": "id-ai"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “ID_AI”, que se refiere a las acciones sustantivas o de apoyo que realizan los ejecutores de gasto con el fin de dar cumplimiento a los objetivos y metas contenidos en los programas presupuestarios, de conformidad con las atribuciones que les señala su respectiva ley orgánica o el ordenamiento jurídico que les es aplicable (3 dígitos).",
        "variable": "desc-ai"
      },
      {
        "descripcion": "Clave con la que se identifican a los programas presupuestarios según el tipo de servicios/productos que otorgan o su naturaleza específica: (consulta las modalidades en http://www.transparenciapresupuestaria.gob.mx/work/models/PTP/DatosAbiertos/Metadatos/Catalogos_Presupuestarios_2016.xlsx).",
        "variable": "id-modalidad"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “ID_MODALIDAD”, que permite identificar a los programas según el tipo de servicios/productos que otorgan o su naturaleza específica: (consulta las modalidades en http://www.transparenciapresupuestaria.gob.mx/work/models/PTP/DatosAbiertos/Metadatos/Catalogos_Presupuestarios_2016.xlsx)",
        "variable": "desc-modalidad"
      },
      {
        "descripcion": "Clave asignada a cada programa presupuestario. Por programa presupuestario se entiende a la categoría que permite organizar, en forma representativa y homogénea, las asignaciones de recursos de los programas federales y del gasto federalizado a cargo de los ejecutores del mismo, para el cumplimiento de sus objetivos y metas.",
        "variable": "id-pp"
      },
      {
        "descripcion": "Nombre del programa presupuestario federal de acuerdo con la estructura programática vigente para cada ciclo. Por programa presupuestario se entiende a la categoría que permite organizar, en forma representativa y homogénea, las asignaciones de recursos de los programas federales y del gasto federalizado a cargo de los ejecutores del mismo, para el cumplimiento de sus objetivos y metas.",
        "variable": "desc-pp"
      },
      {
        "descripcion": "Clave con la cual se identifica a los programas presupuestarios federales. Está compuesta por cuatro dígitos, el primero señala la modalidad (consulta las modalidades en http://www.transparenciapresupuestaria.gob.mx/work/models/PTP/DatosAbiertos/Metadatos/Catalogos_Presupuestarios_2016.xlsx) y los tres dígitos restantes es la clave asignada al programa presupuestario se asignan de manera consecutiva al interior de la modalidad de que se trate. (consulta las modalidades en http://www.transparenciapresupuestaria.gob.mx/work/models/PTP/DatosAbiertos/Metadatos/Catalogos_Presupuestarios_2016.xlsx)",
        "variable": "modalidad-pp"
      },
      {
        "descripcion": "Clave con la cual se identifican las diferentes Metas Nacionales establecidas en el Plan Nacional de Desarrollo (PND) 2013-2018: un México en Paz, un México Incluyente, un México con Educación de Calidad, un México Próspero y un México con Responsabilidad Global. Asimismo, se incluyen las claves de las Metas Transversales del PND 2013-2018. Para el año de 2012 y anteriores se refiere a la clave de los ejes de política del Plan Nacional de Desarrollo 2006 - 2012.",
        "variable": "id-pnd"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “ID_PND”, que se refiere a las diferentes Metas Nacionales establecidas en el Plan Nacional de Desarrollo 2013-2018: un México en Paz, un México Incluyente, un México con Educación de Calidad, un México Próspero y un México con Responsabilidad Global. Asimismo, se incluyen las descripciones de las Metas Transversales del PND 2013-2018. Para el año de 2012 y anteriores se refiere a la descripción de los ejes de política del PND 2006 - 2012.",
        "variable": "desc-pnd"
      },
      {
        "descripcion": "Clave y descripción del objetivo que busca alcanzarse a través de las Metas Nacionales. El número que precede a la descripción corresponde a la enumeración de los objetivos dentro de cada meta.",
        "variable": "objetivo-pnd"
      },
      {
        "descripcion": "Clave con la que se identifica el programa derivado del Plan Nancional de Desarrollo 2013-2018, el cual especifica los objetivos, prioridades y políticas que regirán el desempeño del sector administrativo que se trate (un dígito).",
        "variable": "programa-pnd"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “PROGRAMA_PND”, QUEque refiere al programa derivado del PND 2013-2018, el cual especifica los objetivos, prioridades y políticas que regirán el desempeño del sector administrativo de que se trate (un dígito).",
        "variable": "desc-programa-pnd"
      },
      {
        "descripcion": "Clave con la que se identifica el objetivo que busca alcanzarse a través de los diferentes programas sectoriales (un dígito).",
        "variable": "objetivo-progama-pnd"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “OBJETIVO_PROGRAMA_PND”, que se refiere al objetivo que busca alcanzarse a través de los diferentes programas sectoriales.",
        "variable": "desc-objetivo-programa-pnd"
      },
      {
        "descripcion": "Descripción de los objetivos, de la dependencia o entidad, que pretenden alcanzarse.",
        "variable": "objetivo-estrategico"
      },
      {
        "descripcion": "Clave con la que se identifica a la herramienta de planeación estratégica conocida como Matriz de Indicadores para Resultados (MIR), la cual, en forma resumida, sencilla y armónica, establece con claridad los objetivos del programa presupuestario y su alineación con aquellos de la planeación nacional y sectorial; incorpora los indicadores que miden los objetivos y resultados esperados; identifica los medios para obtener y verificar la información de los indicadores; describe los bienes y servicios que se entregan a la sociedad, así como las actividades e insumos para producirlos, e incluye supuestos sobre los riesgos y contingencias que pueden afectar el desempeño del programa presupuestario.",
        "variable": "id-matriz"
      },
      {
        "descripcion": "Descripción de la clave contenida en la columna “ID_MATRIZ”.",
        "variable": "desc-matriz"
      },
      {
        "descripcion": "Clave con la que se identifican los objetivos de laMatriz de Indicadores para Resultados (a nivel Fin, Propósito, Componente o Actividad) que pretende alcanzar el programa presupuestario.",
        "variable": "id-objetivo"
      },
      {
        "descripcion": "Clave con la se identifica el objetivo inmediato superior del que se desprenden el nivel de Propósito, Componente o Actividad del programa presupuestario, bajo la siguiente lógica:",
        "variable": "id-objetivo-padre"
      }
    ],
    "date_insert": "2016-10-14T04:46:27.690Z"
  },
  {
    "_id": "58006407ddfcdd3fc616d45c",
    "nombre": "proyectos-opa",
    "variables": [
      {
        "descripcion": "Clave que asigna la Secretaría de Hacienda a un programa o proyecto de inversión una vez que obtiene su registro en la cartera de programas y proyectos de inversión, de conformidad con lo establecido en los artículos 34, fracción III, de la Ley Federal de Presupuesto y Responsabilidad Hacendaria, y 46 del Reglamento de la Ley Federal de Presupuesto y Responsabilidad Hacendaria",
        "variable": "cve-ppi"
      },
      {
        "descripcion": "El nombre del programa o proyecto de inversión establecido por cada unidad responsable, que lo identifica claramente",
        "variable": "nombre"
      },
      {
        "descripcion": "Clave del Ramo, de acuerdo con la estructura programática del Presupuesto de Egresos de la Federación (PEF) vigente",
        "variable": "id-ramo"
      },
      {
        "descripcion": "Categoría administrativa a la que pertenece el programa presupuestario, de acuerdo con la estructura programática del PEF vigente",
        "variable": "desc-ramo"
      },
      {
        "descripcion": "Clave de la unidad responsable adscrita al ramo administrativo que ejecuta o coordina el programa o proyecto de inversión",
        "variable": "id-ur"
      },
      {
        "descripcion": "Descripción de la unidad responsable adscrita al ramo administrativo que ejecuta o coornida el programa o proyecto de inversión",
        "variable": "desc-ur"
      },
      {
        "descripcion": "Clave del tipo de programa o proyecto de inversión a ejecutar, de acuerdo con su finalidad y función",
        "variable": "tipo-ppi"
      },
      {
        "descripcion": "Descripción del tipo de programa o proyecto de inversión a ejecutar, de acuerdo con su finalidad y función",
        "variable": "desc-ppi"
      },
      {
        "descripcion": "Dirección registrada por las unidades responsables de los programas o proyectos de inversión en la que se ubicarán los activos derivados del programa o proyecto de inversión",
        "variable": "localizacion"
      },
      {
        "descripcion": "Clave de la  entidad federativa donde se ubicarán los activos derivados del programa o proyecto de inversión",
        "variable": "id-entidad-federativa"
      },
      {
        "descripcion": "Nombre de la  entidad federativa donde se ubicarán los activos derivados del programa o proyecto de inversión",
        "variable": "entidad-federativa"
      },
      {
        "descripcion": "Coordenada georreferenciada del punto inical donde se encuentra la obra",
        "variable": "latitud-inicial"
      },
      {
        "descripcion": "Coordenada georreferenciada del punto inical donde se encuentra la obra",
        "variable": "longitud-inicial"
      },
      {
        "descripcion": "Fecha en que inicia la ejecución de los recursos fiscales del programa o proyecto de inversión, de acuerdo con su unidad responsable",
        "variable": "fecha-ini-cal-fiscal"
      },
      {
        "descripcion": "Fecha en que termina la ejecución del programa o proyecto de inversión con recursos fiscales, de acuerdo con su unidad responsable",
        "variable": "fecha-fin-cal-fiscal"
      },
      {
        "descripcion": "Fecha en que inicia la ejecución del programa o proyecto de inversión con recursos de otras fuentes de financiamiento, de acuerdo con su unidad responsable",
        "variable": "fecha-ini-ff"
      },
      {
        "descripcion": "Fecha en que termina la ejecución del programa o proyecto de inversión con recursos de otras fuentes de financiamiento, de acuerdo con su unidad responsable",
        "variable": "fecha-fin-ff"
      },
      {
        "descripcion": "Período que comprende tanto la etapa de ejecución como de operación de un programa o proyecto de inversión",
        "variable": "anios-he"
      },
      {
        "descripcion": "Nombre del funcionario público responsable del programa o proyecto de inversión en la unidad responsable",
        "variable": "nombre-admin"
      },
      {
        "descripcion": "Apellido materno del funcionario público responsable del programa o proyecto de inversión en la unidad responsable",
        "variable": "ap-materno-admin"
      },
      {
        "descripcion": "Apellido paterno del funcionario público responsable del programa o proyecto de inversión en la unidad responsable",
        "variable": "ap-paterno-admin"
      },
      {
        "descripcion": "Cargo del funcionario público responsable del programa o proyecto de inversión en la unidad responsable",
        "variable": "cargo-admin"
      },
      {
        "descripcion": "Correo electrónico del funcionario público responsable del programa o proyecto de inversión en la unidad responsable",
        "variable": "mail-admin"
      },
      {
        "descripcion": "Teléfono del funcionario público responsable del programa o proyecto de inversión en la unidad responsable",
        "variable": "telefono-admin"
      },
      {
        "descripcion": "La producción de bienes y servicios que se pretenden alcanzar con el programa o proyecto de inversión",
        "variable": "meta-fisica"
      },
      {
        "descripcion": "Efectos favorables que se generarían sobre la población o para el país como resultado del programa o proyecto de inversión",
        "variable": "meta-beneficios"
      },
      {
        "descripcion": "Número de solicitud que se genera una vez que el programa o proyecto de invesión se captura en la cartera de programas y proyectos de inversión",
        "variable": "id-ppi"
      },
      {
        "descripcion": "Parte de la clasificación funcional que permite identificar las actividades que realiza el Estado para cumplir con sus fines de: Desarrollo Social, Desarrollo Económico y Gobierno",
        "variable": "finalidad"
      },
      {
        "descripcion": "Parte de la clasificación funcional del gasto que permite identificar las acciones que realizan las unidades responsables para cumplir con los ordenamientos legales. Por ejemplo:\nSeguridad Nacional, Combustibles y Energía, Educación, Salud, etc.",
        "variable": "funcion"
      },
      {
        "descripcion": "La suma de la totalidad de recursos destinados a la ejecución de un programa o proyecto de inversión, incluyendo los recursos fiscales y los recursos que se obtienen de otras fuentes de financiamiento",
        "variable": "monto-total-inversion"
      },
      {
        "descripcion": "Monto estimado global de recursos que se requerirán para el funcionamiento adecuado de los activos derivados de un programa o proyecto de inversión",
        "variable": "total-gasto-operacion-he"
      },
      {
        "descripcion": "Monto estimado de recursos asociados a la ejecución del programa o proyecto de inversión distintos a los gastos de inversión, operación y mantenimiento",
        "variable": "total-gasto-no-consid"
      },
      {
        "descripcion": "La suma del monto total de inversión, los gastos estimados de operación y mantenimiento, y los otros costos y gastos asociados",
        "variable": "costo-total-ppi"
      },
      {
        "descripcion": "Año base en el cual se expresan los montos monetarios del programa o proyecto de inversión",
        "variable": "fecha"
      },
      {
        "descripcion": "Monto máximo de recursos programados por la dependencia para ejercer durante el año. Se diferencia del aprobado porque no depende de sus capacidades de pago sino de estimaciones propias de la dependencia.",
        "variable": "calendario-fiscal-del-ciclo"
      },
      {
        "descripcion": "Monto aprobado en el Presupuesto de Egresos de la Federación 2016",
        "variable": "aprobado"
      },
      {
        "descripcion": "Recursos de otras fuentes de financiamiento con participación estatal",
        "variable": "recursos-estatales"
      },
      {
        "descripcion": "Recursos de otras fuentes de financiamiento con participación municipal",
        "variable": "recursos-municipales"
      },
      {
        "descripcion": "Recursos de otras fuentes de financiamiento con participación del sector privado",
        "variable": "privados"
      },
      {
        "descripcion": "Recursos de otras fuentes de financiamiento con participación de los fideicomisos",
        "variable": "fideicomiso"
      },
      {
        "descripcion": "Año en el que se asignó el recurso fiscal más reciente",
        "variable": "ciclo"
      },
      {
        "variable": "algunos-proyectos-no-cuentan-con-asginacion-aprobada-y-o-modificada-sin-embargo-son-susceptibles-de-recibir-recursos-en-el-ano-mediante-modificaciones-al-presupuesto"
      },
      {
        "descripcion": "Identificador alfanúmerico que asigna la Secretaría de Hacienda y Crédito Público a un Programa o Proyecto de Inversión una vez que obtiene su registro en la Cartera de Programas y Proyectos de inversión, de conformidad con lo establecido en los artículos 34, fracción III, de la Ley Federal de Presupuesto y Responsabilidad Hacendaria, y 46 de su Reglamento.",
        "variable": "clave-de-cartera"
      },
      {
        "descripcion": "Identificador alfanúmerico de la categoría o ramo administrativo a la cual está asignado el Programa o Proyecto de Inversión, de acuerdo con la estructura programática del Presupuesto de Egresos de la Federación (PEF) vigente.",
        "variable": "clave-del-ramo"
      },
      {
        "descripcion": "Categoría o ramo administrativa a la que pertenece el Programa o Poyecto de Inversión, de acuerdo con la estructura programática del PEF vigente.",
        "variable": "nombre-del-ramo"
      },
      {
        "descripcion": "Identificador alfanúmerico de la unidad responsable adscrita al ramo administrativo que ejecuta o coordina el Programa o Proyecto de Inversión.",
        "variable": "clave-de-la-unidad-responsable"
      },
      {
        "descripcion": "Unidad responsable adscrita al ramo administrativo que ejecuta o coornida el programa o proyecto de inversión.",
        "variable": "nombre-de-la-unidad-responsable"
      },
      {
        "descripcion": "Nombre que identifica al Programa o Proyecto de inversión por parte de las Dependencias y Entidades de la Administración Pública Federal.",
        "variable": "nombre-del-proyecto"
      },
      {
        "descripcion": "Número que se genera para identificar el concurso de licitación del Programa o Proyecto de Inversión en el sistema Compranet.",
        "variable": "numero-de-licitacion-y-o-registro-del-sistema-electronico-de-informacion-publica-gubernamental-compranet"
      },
      {
        "descripcion": "Nombre de la Dependencia o Entidad de la Administración Pública Federal promotora del proyecto bajo el esquema de Asociación Público Privado (APP).",
        "variable": "nombre-del-convocante"
      },
      {
        "descripcion": "Nombre de la(s) empresa(s), Sociedad de Propósito Específico  o del Consorcio ganador de la licitación y encargado de desarrollar el proyecto bajo el esquema de APP.",
        "variable": "nombre-del-desarrollador"
      },
      {
        "descripcion": "Número de años de vigencia del contrato de Asociación Público-Privada.",
        "variable": "plazo-del-contrato-de-asociacion-publico-privada"
      },
      {
        "descripcion": "La suma del total de recursos destinados a la ejecución de las obras y equipamientos del Programa o Proyecto de Inversión bajo el esquema de APP, incluyendo los recursos públicos federales y los provenientes de otras fuentes de financiamiento, incluyendo el sector privado.",
        "variable": "monto-de-inversion-total-del-proyecto"
      },
      {
        "descripcion": "Pagos realizados por las Dependencias o Entidades de la Administración Pública Federal por la contraprestación de los bienes y servicios provistos al Desarrollador a partir de la entrada en operación del proyecto de APP y hasta la fecha de culminación del Contrato.",
        "variable": "monto-de-los-pagos-programados-y-ejecutados-durante-el-ciclo-de-vida-del-proyecto"
      },
      {
        "descripcion": "Indicadores determinados por la Secretaría de Hacienda y Crédito Público para medir la rentabilidad social, financiera y económica de un proyecto bajo el esquema de APP.",
        "variable": "indicadores-asociados-a-la-rentabilidad-social-financiera-y-economica-del-proyecto-en-los-terminos-que-determine-el-reglamento"
      },
      {
        "descripcion": "Comparación de los costos totales, n Valor Presente Neto,  de realizar un Programa o Proyecto de Inversión bajo el esquema de APP versus la alternativa de hacerlo en la modalidad de Obra Pública Tradicional u alguna otra.",
        "variable": "resultado-de-la-evaluacion-de-la-conveniencia-financiera-a-que-se-refiere-el-articulo-14-fraccion-ix"
      }
    ],
    "date_insert": "2016-10-14T04:50:15.409Z"
  }
]