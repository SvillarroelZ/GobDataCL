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
        "description": "Valor total de bienes y servicios producidos en el pais en un periodo determinado, a precios corrientes.",
        "unit": "Millones USD",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "anual",
        "category": "economia",
    },
    {
        "code": "PIB_CRECIMIENTO",
        "name": "Crecimiento del PIB",
        "description": "Variacion porcentual anual del Producto Interno Bruto real.",
        "unit": "Porcentaje",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "anual",
        "category": "economia",
    },
    {
        "code": "PIB_PER_CAPITA",
        "name": "PIB per capita",
        "description": "Producto Interno Bruto dividido por la poblacion total del pais.",
        "unit": "USD",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "anual",
        "category": "economia",
    },
    {
        "code": "INFLACION_ANUAL",
        "name": "Inflacion anual",
        "description": "Variacion porcentual del Indice de Precios al Consumidor (IPC) en 12 meses.",
        "unit": "Porcentaje",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/economia/indices-de-precio-e-inflacion/indice-de-precios-al-consumidor",
        "frequency": "mensual",
        "category": "economia",
    },
    {
        "code": "TIPO_CAMBIO",
        "name": "Tipo de cambio dolar observado",
        "description": "Valor promedio anual del dolar estadounidense en pesos chilenos.",
        "unit": "CLP/USD",
        "source_name": "Banco Central de Chile",
        "source_url": "https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx",
        "frequency": "diario",
        "category": "economia",
    },
    {
        "code": "TPM",
        "name": "Tasa de Politica Monetaria",
        "description": "Tasa de interes de referencia fijada por el Banco Central de Chile.",
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
        "description": "Porcentaje de la fuerza laboral que se encuentra sin empleo y busca trabajo activamente.",
        "unit": "Porcentaje",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/sociales/mercado-laboral/ocupacion-y-desocupacion",
        "frequency": "trimestral",
        "category": "empleo",
    },
    {
        "code": "EMPLEO_INFORMAL",
        "name": "Tasa de empleo informal",
        "description": "Porcentaje de trabajadores en empleos informales respecto al total de ocupados.",
        "unit": "Porcentaje",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/sociales/mercado-laboral",
        "frequency": "trimestral",
        "category": "empleo",
    },
    {
        "code": "SALARIO_MINIMO",
        "name": "Salario minimo mensual",
        "description": "Ingreso minimo mensual legal para trabajadores dependientes.",
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
        "description": "Porcentaje de la poblacion que vive bajo la linea de pobreza por ingresos.",
        "unit": "Porcentaje",
        "source_name": "Ministerio de Desarrollo Social (CASEN)",
        "source_url": "https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen",
        "frequency": "bianual",
        "category": "social",
    },
    {
        "code": "POBREZA_MULTIDIMENSIONAL",
        "name": "Tasa de pobreza multidimensional",
        "description": "Porcentaje de la poblacion en situacion de pobreza multidimensional (educacion, salud, trabajo, vivienda, redes).",
        "unit": "Porcentaje",
        "source_name": "Ministerio de Desarrollo Social (CASEN)",
        "source_url": "https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen",
        "frequency": "bianual",
        "category": "social",
    },
    {
        "code": "GINI",
        "name": "Coeficiente de Gini",
        "description": "Medida de desigualdad de ingresos. 0 = perfecta igualdad, 1 = maxima desigualdad.",
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
        "description": "Deuda total del gobierno central como porcentaje del Producto Interno Bruto.",
        "unit": "Porcentaje PIB",
        "source_name": "Direccion de Presupuestos (DIPRES)",
        "source_url": "https://www.dipres.gob.cl/598/w3-propertyvalue-15494.html",
        "frequency": "anual",
        "category": "fiscal",
    },
    {
        "code": "BALANCE_FISCAL",
        "name": "Balance fiscal efectivo",
        "description": "Diferencia entre ingresos y gastos del gobierno central como porcentaje del PIB.",
        "unit": "Porcentaje PIB",
        "source_name": "Direccion de Presupuestos (DIPRES)",
        "source_url": "https://www.dipres.gob.cl/598/w3-propertyvalue-15494.html",
        "frequency": "anual",
        "category": "fiscal",
    },
    {
        "code": "GASTO_PUBLICO_PIB",
        "name": "Gasto publico como porcentaje del PIB",
        "description": "Gasto total del gobierno central como porcentaje del Producto Interno Bruto.",
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
        "description": "Numero promedio de anos que se espera viva un recien nacido.",
        "unit": "Anos",
        "source_name": "Instituto Nacional de Estadisticas",
        "source_url": "https://www.ine.cl/estadisticas/sociales/demografia-y-vitales",
        "frequency": "anual",
        "category": "salud",
    },
    {
        "code": "MORTALIDAD_INFANTIL",
        "name": "Tasa de mortalidad infantil",
        "description": "Numero de defunciones de menores de un ano por cada 1.000 nacidos vivos.",
        "unit": "Por 1.000 nacidos vivos",
        "source_name": "Ministerio de Salud",
        "source_url": "https://www.minsal.cl/estadisticas-de-salud/",
        "frequency": "anual",
        "category": "salud",
    },
    {
        "code": "GASTO_SALUD_PIB",
        "name": "Gasto en salud como porcentaje del PIB",
        "description": "Gasto total en salud (publico y privado) como porcentaje del PIB.",
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
        "description": "Gasto total en educacion (publico y privado) como porcentaje del PIB.",
        "unit": "Porcentaje PIB",
        "source_name": "Ministerio de Educacion",
        "source_url": "https://centroestudios.mineduc.cl/",
        "frequency": "anual",
        "category": "educacion",
    },
    {
        "code": "PISA_LECTURA",
        "name": "Puntaje PISA Lectura",
        "description": "Puntaje promedio de estudiantes chilenos en prueba PISA de lectura.",
        "unit": "Puntos",
        "source_name": "OECD PISA",
        "source_url": "https://www.oecd.org/pisa/",
        "frequency": "trianual",
        "category": "educacion",
    },
    {
        "code": "PISA_MATEMATICAS",
        "name": "Puntaje PISA Matematicas",
        "description": "Puntaje promedio de estudiantes chilenos en prueba PISA de matematicas.",
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
        "description": "Numero de homicidios por cada 100.000 habitantes.",
        "unit": "Por 100.000 habitantes",
        "source_name": "Subsecretaria de Prevencion del Delito",
        "source_url": "https://cead.spd.gov.cl/estadisticas-delictuales/",
        "frequency": "anual",
        "category": "seguridad",
    },
    {
        "code": "VICTIMIZACION",
        "name": "Tasa de victimizacion",
        "description": "Porcentaje de hogares que declaran haber sido victimas de algun delito en los ultimos 12 meses.",
        "unit": "Porcentaje",
        "source_name": "Encuesta Nacional Urbana de Seguridad Ciudadana (ENUSC)",
        "source_url": "https://www.ine.cl/estadisticas/sociales/seguridad-publica-y-justicia",
        "frequency": "anual",
        "category": "seguridad",
    },
]
