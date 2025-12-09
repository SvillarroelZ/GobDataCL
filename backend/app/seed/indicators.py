"""
Seed data for economic and social indicators.

All indicators are sourced from official Chilean and international institutions.
Each indicator includes its official source URL for verification.

Official Data Sources:
----------------------

1. Banco Central de Chile (bcentral.cl)
   - PIB (GDP)
   - Inflacion (IPC)
   - Tipo de cambio
   - Tasa de politica monetaria
   API: https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx

2. Instituto Nacional de Estadisticas - INE (ine.cl)
   - Tasa de desempleo
   - Indice de precios al consumidor
   - Censo poblacional
   API: https://www.ine.cl/estadisticas/

3. Ministerio de Desarrollo Social - MIDESO (desarrollosocialyfamilia.gob.cl)
   - Tasa de pobreza (Encuesta CASEN)
   - Indice de Gini
   - Pobreza multidimensional

4. Direccion de Presupuestos - DIPRES (dipres.gob.cl)
   - Gasto publico
   - Deuda publica
   - Balance fiscal

5. Banco Mundial (worldbank.org)
   - Indicadores comparativos internacionales
   API: https://api.worldbank.org/v2/

6. CEPAL (cepal.org)
   - Estadisticas economicas regionales
   - CEPALSTAT

7. OECD (oecd.org)
   - Indicadores comparativos OCDE
   API: https://data.oecd.org/
"""

# Indicator categories for organizing the data
INDICATOR_CATEGORIES = [
    "economia",
    "empleo",
    "social",
    "fiscal",
    "salud",
    "educacion",
    "seguridad",
]

# Indicators with official sources
INDICATORS_DATA = [
    # ECONOMIA
    {
        "code": "PIB_TOTAL",
        "name": "Producto Interno Bruto",
        "description": "El PIB representa el valor monetario total de todos los bienes y servicios finales producidos dentro del territorio nacional durante un año. Es el indicador mas utilizado para medir el tamaño y la salud de una economia. Un PIB creciente generalmente indica expansion economica, mientras que un PIB decreciente puede señalar recesion. Se expresa en dolares estadounidenses para facilitar comparaciones internacionales.",
        "unit": "Millones USD",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "anual",
        "category": "economia",
    },
    {
        "code": "PIB_CRECIMIENTO",
        "name": "Crecimiento del PIB",
        "description": "Mide el cambio porcentual del PIB real (ajustado por inflacion) respecto al año anterior. Un crecimiento positivo indica que la economia esta produciendo mas bienes y servicios. Chile ha tenido historicamente tasas de crecimiento entre 2% y 6% en periodos normales, aunque crisis economicas o pandemias pueden generar contracciones significativas. Es un indicador clave para evaluar el desempeño economico de cada gobierno.",
        "unit": "Porcentaje",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "anual",
        "category": "economia",
    },
    {
        "code": "PIB_PER_CAPITA",
        "name": "PIB per capita",
        "description": "Resulta de dividir el PIB total por la poblacion del pais, representando el ingreso promedio por habitante. Es una medida aproximada del nivel de vida y desarrollo economico. Chile tiene uno de los PIB per capita mas altos de America Latina. Sin embargo, este indicador no refleja la distribucion del ingreso, por lo que debe analizarse junto con medidas de desigualdad como el coeficiente de Gini.",
        "unit": "USD",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "anual",
        "category": "economia",
    },
    {
        "code": "INFLACION_ANUAL",
        "name": "Inflacion anual",
        "description": "Mide el aumento generalizado y sostenido de los precios de bienes y servicios en la economia durante 12 meses. Se calcula mediante el Indice de Precios al Consumidor (IPC), que rastrea el costo de una canasta de productos representativa. El Banco Central de Chile tiene como meta mantener la inflacion en torno al 3% anual. Una inflacion alta erosiona el poder adquisitivo de los salarios y afecta especialmente a los hogares de menores ingresos.",
        "unit": "Porcentaje",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/economia/indices-de-precio-e-inflacion/indice-de-precios-al-consumidor",
        "frequency": "mensual",
        "category": "economia",
    },
    {
        "code": "TIPO_CAMBIO",
        "name": "Tipo de cambio dolar observado",
        "description": "Valor promedio anual del dolar estadounidense en pesos chilenos, determinado por la oferta y demanda en el mercado cambiario. Un dolar alto encarece las importaciones (combustibles, tecnologia, insumos) pero beneficia a los exportadores. Chile tiene tipo de cambio flotante desde 1999, lo que significa que el Banco Central no fija su valor pero puede intervenir en situaciones excepcionales para evitar volatilidad extrema.",
        "unit": "CLP/USD",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "diario",
        "category": "economia",
    },
    {
        "code": "TPM",
        "name": "Tasa de Politica Monetaria",
        "description": "Tasa de interes de referencia fijada por el Banco Central de Chile en sus reuniones mensuales. Es la principal herramienta para controlar la inflacion: cuando sube, encarece el credito y reduce el consumo; cuando baja, estimula la economia. Afecta directamente las tasas de creditos hipotecarios, de consumo y comerciales. El Consejo del Banco Central la ajusta segun las condiciones economicas y las expectativas de inflacion.",
        "unit": "Porcentaje",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "mensual",
        "category": "economia",
    },

    # EMPLEO
    {
        "code": "DESEMPLEO",
        "name": "Tasa de desempleo",
        "description": "Porcentaje de personas mayores de 15 años que no tienen trabajo pero lo buscan activamente, respecto al total de la fuerza laboral. Es uno de los indicadores mas importantes del bienestar social. No incluye a quienes han dejado de buscar empleo (desalentados) ni a los subempleados. En Chile, tasas bajo 7% se consideran cercanas al pleno empleo, mientras que sobre 10% indican problemas serios en el mercado laboral.",
        "unit": "Porcentaje",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/sociales/mercado-laboral/ocupacion-y-desocupacion",
        "frequency": "trimestral",
        "category": "empleo",
    },
    {
        "code": "EMPLEO_INFORMAL",
        "name": "Tasa de empleo informal",
        "description": "Porcentaje de trabajadores en empleos sin contrato formal, sin cotizaciones previsionales o en empresas no registradas. El empleo informal implica desproteccion social: sin acceso a salud, pensiones ni seguro de cesantia. Afecta desproporcionadamente a mujeres, jovenes y trabajadores de menor educacion. Una alta informalidad reduce la recaudacion fiscal y la sostenibilidad del sistema de pensiones.",
        "unit": "Porcentaje",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/sociales/mercado-laboral",
        "frequency": "trimestral",
        "category": "empleo",
    },
    {
        "code": "SALARIO_MINIMO",
        "name": "Salario minimo mensual",
        "description": "Ingreso minimo mensual legal que un empleador debe pagar a un trabajador dependiente por jornada completa. Se reajusta periodicamente por ley, generalmente cada año. Es un piso salarial que afecta a cerca de 800.000 trabajadores directamente y sirve de referencia para otros salarios. Su nivel es objeto de debate entre quienes buscan mejorar condiciones de vida y quienes temen efectos en el empleo formal.",
        "unit": "CLP",
        "source_name": "Direccion del Trabajo",
        "source_url": "https://www.dt.gob.cl/legislacion/1624/w3-propertyvalue-145790.html",
        "frequency": "anual",
        "category": "empleo",
    },

    # SOCIAL
    {
        "code": "POBREZA_INGRESOS",
        "name": "Tasa de pobreza por ingresos",
        "description": "Porcentaje de la poblacion cuyos ingresos estan bajo la linea de pobreza, calculada segun el costo de una canasta basica de alimentos y necesidades. Se mide cada dos años mediante la Encuesta CASEN, la principal herramienta para diagnosticar la realidad social de Chile. La pobreza extrema considera solo el costo de alimentacion. Chile redujo drasticamente la pobreza desde los años 90, pero persisten bolsones de vulnerabilidad.",
        "unit": "Porcentaje",
        "source_name": "Ministerio de Desarrollo Social (CASEN)",
        "source_url": "https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen",
        "frequency": "bianual",
        "category": "social",
    },
    {
        "code": "POBREZA_MULTIDIMENSIONAL",
        "name": "Tasa de pobreza multidimensional",
        "description": "Mide carencias en cinco dimensiones mas alla del ingreso: educacion, salud, trabajo y seguridad social, vivienda y entorno, y redes y cohesion social. Un hogar es multidimensionalmente pobre si tiene carencias en al menos 22.5% de los indicadores ponderados. Esta medicion reconoce que la pobreza no es solo falta de dinero, sino tambien acceso limitado a servicios, oportunidades y redes de apoyo.",
        "unit": "Porcentaje",
        "source_name": "Ministerio de Desarrollo Social (CASEN)",
        "source_url": "https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen",
        "frequency": "bianual",
        "category": "social",
    },
    {
        "code": "GINI",
        "name": "Coeficiente de Gini",
        "description": "Indice que mide la desigualdad en la distribucion del ingreso. Varia entre 0 (perfecta igualdad, todos ganan lo mismo) y 1 (maxima desigualdad, una persona concentra todo el ingreso). Chile historicamente ha tenido uno de los Gini mas altos de la OCDE, reflejando alta concentracion de riqueza. Una reduccion del Gini indica que la brecha entre ricos y pobres se esta cerrando, aunque el cambio suele ser lento.",
        "unit": "Indice (0-1)",
        "source_name": "Ministerio de Desarrollo Social (CASEN)",
        "source_url": "https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen",
        "frequency": "bianual",
        "category": "social",
    },

    # FISCAL
    {
        "code": "DEUDA_PUBLICA_PIB",
        "name": "Deuda publica bruta como porcentaje del PIB",
        "description": "Mide el endeudamiento total del gobierno central respecto al tamaño de la economia. Una deuda moderada (bajo 30-40% del PIB) se considera manejable; sobre 60% puede generar preocupacion sobre sostenibilidad fiscal. Chile mantuvo deuda muy baja por decadas gracias al ahorro del cobre, pero ha aumentado desde 2014. La capacidad de pago depende del crecimiento economico, tasas de interes y balance fiscal.",
        "unit": "Porcentaje PIB",
        "source_name": "Direccion de Presupuestos (DIPRES)",
        "source_url": "https://www.dipres.gob.cl/598/w3-propertyvalue-15494.html",
        "frequency": "anual",
        "category": "fiscal",
    },
    {
        "code": "BALANCE_FISCAL",
        "name": "Balance fiscal efectivo",
        "description": "Diferencia entre los ingresos y gastos del gobierno central como porcentaje del PIB. Un balance positivo (superavit) significa que el Estado recauda mas de lo que gasta; uno negativo (deficit) indica que gasta mas de lo que recauda, financiandose con deuda. Chile implementa una regla de balance estructural que permite deficits en años malos compensados con superavits en años buenos, especialmente ligado al precio del cobre.",
        "unit": "Porcentaje PIB",
        "source_name": "Direccion de Presupuestos (DIPRES)",
        "source_url": "https://www.dipres.gob.cl/598/w3-propertyvalue-15494.html",
        "frequency": "anual",
        "category": "fiscal",
    },
    {
        "code": "GASTO_PUBLICO_PIB",
        "name": "Gasto publico como porcentaje del PIB",
        "description": "Representa todos los desembolsos del gobierno central en bienes, servicios, transferencias, inversiones y pago de intereses. Incluye gastos en salud, educacion, defensa, pensiones y programas sociales. Un gasto publico eficiente puede mejorar servicios y reducir desigualdades, pero un gasto excesivo sin respaldo puede generar deficit y deuda. Chile tiene gasto publico relativamente bajo comparado con paises OCDE.",
        "unit": "Porcentaje PIB",
        "source_name": "Direccion de Presupuestos (DIPRES)",
        "source_url": "https://www.dipres.gob.cl/598/w3-propertyvalue-15494.html",
        "frequency": "anual",
        "category": "fiscal",
    },

    # SALUD
    {
        "code": "ESPERANZA_VIDA",
        "name": "Esperanza de vida al nacer",
        "description": "Numero promedio de años que se espera viva un recien nacido si las condiciones de mortalidad actuales se mantienen. Chile tiene una de las esperanzas de vida mas altas de America Latina (cerca de 80 años), comparable a paises desarrollados. Refleja mejoras en nutricion, saneamiento, acceso a salud y condiciones de vida. Las mujeres viven en promedio 5-6 años mas que los hombres.",
        "unit": "Anos",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/sociales/demografia-y-vitales",
        "frequency": "anual",
        "category": "salud",
    },
    {
        "code": "MORTALIDAD_INFANTIL",
        "name": "Tasa de mortalidad infantil",
        "description": "Numero de niños que mueren antes de cumplir un año por cada 1.000 nacidos vivos. Es uno de los indicadores mas sensibles del desarrollo de un pais, reflejando condiciones de salud materna, acceso a atencion medica, nutricion y saneamiento. Chile redujo dramaticamente esta tasa desde los años 60 (de 120 a menos de 7 por 1.000), siendo hoy comparable a paises desarrollados.",
        "unit": "Por 1.000 nacidos vivos",
        "source_name": "Ministerio de Salud",
        "source_url": "https://www.minsal.cl/estadisticas-de-salud/",
        "frequency": "anual",
        "category": "salud",
    },
    {
        "code": "GASTO_SALUD_PIB",
        "name": "Gasto en salud como porcentaje del PIB",
        "description": "Suma del gasto publico (FONASA, hospitales publicos) y privado (Isapres, clinicas, gasto de bolsillo) en salud. Chile gasta alrededor del 9% del PIB en salud, pero con alta segmentacion: las Isapres atienden al 15% de la poblacion con mayores recursos, mientras FONASA cubre al resto. El gasto de bolsillo sigue siendo alto, especialmente en medicamentos y atenciones no cubiertas.",
        "unit": "Porcentaje PIB",
        "source_name": "OECD Health Statistics",
        "source_url": "https://www.oecd.org/health/health-data.htm",
        "frequency": "anual",
        "category": "salud",
    },

    # EDUCACION
    {
        "code": "GASTO_EDUCACION_PIB",
        "name": "Gasto en educacion como porcentaje del PIB",
        "description": "Inversion total en educacion incluyendo gasto publico (subvenciones, universidades estatales) y privado (colegios particulares, aranceles universitarios). Chile gasta cerca del 6% del PIB en educacion, pero con alta participacion privada. Las reformas educacionales han buscado aumentar el gasto publico y reducir la segregacion, aunque persisten brechas de calidad entre establecimientos.",
        "unit": "Porcentaje PIB",
        "source_name": "Ministerio de Educacion",
        "source_url": "https://centroestudios.mineduc.cl/",
        "frequency": "anual",
        "category": "educacion",
    },
    {
        "code": "PISA_LECTURA",
        "name": "Puntaje PISA Lectura",
        "description": "Evaluacion internacional estandarizada de la OCDE que mide competencias de comprension lectora en estudiantes de 15 años. El promedio OCDE es 500 puntos. Chile lidera en America Latina pero esta bajo el promedio OCDE. Los resultados muestran alta correlacion con nivel socioeconomico, evidenciando desigualdades en el sistema educativo. Se aplica cada 3 años en mas de 80 paises.",
        "unit": "Puntos",
        "source_name": "OECD PISA",
        "source_url": "https://www.oecd.org/pisa/",
        "frequency": "trianual",
        "category": "educacion",
    },
    {
        "code": "PISA_MATEMATICAS",
        "name": "Puntaje PISA Matematicas",
        "description": "Evaluacion internacional de competencias matematicas en estudiantes de 15 años. Mide capacidad de formular, emplear e interpretar matematicas en diversos contextos. Chile ha mostrado mejoras modestas pero consistentes desde 2000. Las brechas de genero son significativas: los hombres obtienen mejores puntajes en matematicas, mientras las mujeres destacan en lectura.",
        "unit": "Puntos",
        "source_name": "OECD PISA",
        "source_url": "https://www.oecd.org/pisa/",
        "frequency": "trianual",
        "category": "educacion",
    },

    # SEGURIDAD
    {
        "code": "HOMICIDIOS",
        "name": "Tasa de homicidios",
        "description": "Numero de muertes intencionales causadas por otra persona por cada 100.000 habitantes. Chile historicamente ha tenido tasas bajas para la region (3-5 por 100.000), muy por debajo del promedio latinoamericano (20+). Sin embargo, ha mostrado aumentos en años recientes. Es el indicador mas duro de violencia, aunque no captura otros delitos que afectan la percepcion de seguridad.",
        "unit": "Por 100.000 habitantes",
        "source_name": "Subsecretaria de Prevencion del Delito",
        "source_url": "https://cead.spd.gov.cl/estadisticas-delictuales/",
        "frequency": "anual",
        "category": "seguridad",
    },
    {
        "code": "VICTIMIZACION",
        "name": "Tasa de victimizacion",
        "description": "Porcentaje de hogares donde al menos un miembro declara haber sido victima de robo, hurto, lesiones u otro delito en los ultimos 12 meses. Se mide mediante encuestas (ENUSC) que capturan delitos no denunciados. Chile tiene alta victimizacion (cerca del 25%) pero baja denuncia (solo 40% de victimas denuncia), generando una alta 'cifra negra' de delitos no registrados oficialmente.",
        "unit": "Porcentaje",
        "source_name": "Encuesta Nacional Urbana de Seguridad Ciudadana (ENUSC)",
        "source_url": "https://www.ine.cl/estadisticas/sociales/seguridad-publica-y-justicia",
        "frequency": "anual",
        "category": "seguridad",
    },
]
