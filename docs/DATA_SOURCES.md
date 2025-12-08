# Fuentes de Datos Oficiales / Official Data Sources

Este documento lista las fuentes oficiales de datos utilizadas en GobData CL.
Todos los indicadores provienen de instituciones gubernamentales o internacionales reconocidas.

---

## Instituciones Chilenas

### 1. Banco Central de Chile
- **Sitio web:** https://www.bcentral.cl
- **API REST:** https://si3.bcentral.cl/sieterestws/SieteRestWS.ashx
- **Datos disponibles:**
  - Producto Interno Bruto (PIB)
  - Inflacion (IPC)
  - Tipo de cambio
  - Tasa de Politica Monetaria (TPM)
  - Cuentas nacionales
- **Documentacion API:** https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/index.htm
- **Licencia:** Datos publicos, requiere registro para API

### 2. Instituto Nacional de Estadisticas (INE)
- **Sitio web:** https://www.ine.cl
- **Portal de datos:** https://www.ine.cl/estadisticas/
- **Datos disponibles:**
  - Tasa de desempleo (Encuesta Nacional de Empleo)
  - Indice de Precios al Consumidor (IPC)
  - Demografía y censos
  - Estadísticas vitales
- **Licencia:** Datos publicos

### 3. Ministerio de Desarrollo Social y Familia (MIDESO)
- **Sitio web:** https://www.desarrollosocialyfamilia.gob.cl
- **Observatorio Social:** https://observatorio.ministeriodesarrollosocial.gob.cl
- **Datos disponibles:**
  - Encuesta CASEN (cada 2 anios)
  - Tasa de pobreza por ingresos
  - Tasa de pobreza multidimensional
  - Coeficiente de Gini
  - Indicadores de bienestar social
- **Licencia:** Datos publicos

### 4. Direccion de Presupuestos (DIPRES)
- **Sitio web:** https://www.dipres.gob.cl
- **Estadisticas fiscales:** https://www.dipres.gob.cl/598/w3-propertyvalue-15494.html
- **Datos disponibles:**
  - Deuda publica bruta
  - Balance fiscal
  - Gasto publico
  - Ejecucion presupuestaria
- **Licencia:** Datos publicos

### 5. Servicio Electoral de Chile (SERVEL)
- **Sitio web:** https://www.servel.cl
- **Datos disponibles:**
  - Resultados electorales
  - Participacion electoral
  - Padron electoral
- **Licencia:** Datos publicos

### 6. Biblioteca del Congreso Nacional (BCN)
- **Sitio web:** https://www.bcn.cl
- **Historia Politica:** https://www.bcn.cl/historiapolitica
- **Ley Chile:** https://www.bcn.cl/leychile
- **Datos disponibles:**
  - Biografias de presidentes
  - Historia legislativa
  - Reformas constitucionales
- **Licencia:** Datos publicos

### 7. Ministerio de Salud (MINSAL)
- **Sitio web:** https://www.minsal.cl
- **Estadisticas:** https://www.minsal.cl/estadisticas-de-salud/
- **Datos disponibles:**
  - Mortalidad infantil
  - Esperanza de vida
  - Indicadores epidemiologicos
- **Licencia:** Datos publicos

### 8. Ministerio de Educacion (MINEDUC)
- **Sitio web:** https://www.mineduc.cl
- **Centro de Estudios:** https://centroestudios.mineduc.cl/
- **Datos disponibles:**
  - Gasto en educacion
  - Matricula escolar
  - Resultados SIMCE
- **Licencia:** Datos publicos

### 9. Subsecretaria de Prevencion del Delito
- **Sitio web:** https://www.spd.gov.cl
- **Estadisticas:** https://cead.spd.gov.cl/estadisticas-delictuales/
- **Datos disponibles:**
  - Tasa de homicidios
  - Denuncias por tipo de delito
  - Tasa de victimizacion (ENUSC)
- **Licencia:** Datos publicos

---

## Instituciones Internacionales

### 10. Banco Mundial (World Bank)
- **Sitio web:** https://www.worldbank.org
- **API:** https://api.worldbank.org/v2/
- **Portal de datos:** https://data.worldbank.org
- **Datos disponibles:**
  - Indicadores de desarrollo
  - Comparativos internacionales
  - Series historicas
- **Documentacion API:** https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information
- **Licencia:** CC BY 4.0

### 11. OCDE (OECD)
- **Sitio web:** https://www.oecd.org
- **Portal de datos:** https://data.oecd.org
- **Datos disponibles:**
  - Indicadores economicos comparativos
  - PISA (educacion)
  - Estadisticas de salud
  - Indicadores de bienestar
- **Licencia:** Uso libre con atribucion

### 12. CEPAL
- **Sitio web:** https://www.cepal.org
- **CEPALSTAT:** https://statistics.cepal.org/portal/cepalstat/
- **Datos disponibles:**
  - Estadisticas economicas regionales
  - Indicadores sociales de America Latina
- **Licencia:** Uso libre con atribucion

### 13. Fondo Monetario Internacional (FMI)
- **Sitio web:** https://www.imf.org
- **Data:** https://www.imf.org/en/Data
- **Datos disponibles:**
  - Estadisticas fiscales
  - Balanza de pagos
  - Proyecciones economicas
- **Licencia:** Uso libre con atribucion

---

## Notas sobre Uso de Datos

1. **Verificacion:** Todos los datos deben ser verificables en las fuentes oficiales listadas.

2. **Actualizacion:** Los datos se actualizan segun la frecuencia de publicacion de cada fuente.

3. **Atribucion:** Al usar datos de fuentes internacionales, se debe incluir atribucion.

4. **Limitaciones:** 
   - Algunas series historicas pueden tener cambios metodologicos
   - La CASEN se realiza cada 2-3 anios, no anualmente
   - Datos de 2024-2025 pueden ser preliminares o estimados

5. **APIs Disponibles:**
   - Banco Central: API REST (requiere registro)
   - Banco Mundial: API REST (libre)
   - OECD: API REST (libre)

---

## Estructura de Citas

Al mostrar datos en la aplicacion, se debe indicar:

```
Fuente: [Nombre institucion]
URL: [Link directo a los datos]
Fecha de consulta: [Fecha]
Estado: [oficial/estimado/preliminar]
```

---

Ultima actualizacion de este documento: Diciembre 2024
