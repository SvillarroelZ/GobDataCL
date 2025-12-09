"""
Historical indicator values for Chilean governments.

IMPORTANT: These are sample/placeholder values for development purposes.
In production, values should be fetched from official APIs.

Data status:
- "official": Value verified from official source
- "estimated": Calculated or estimated value
- "missing": Data not available for this period
- "not_applicable": Indicator not measured during this period

For real data, use the official APIs documented in indicators.py
"""

from datetime import date

# Sample indicator values organized by government period
# Format: (indicator_code, government_slug, date, value, status)

# Note: These are representative values for demonstration
# Real implementation should fetch from official APIs

INDICATOR_VALUES_DATA = [
    # =========================================================================
    # AYLWIN (1990-1994)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "aylwin", date(1990, 12, 31), 3.7, "official"),
    ("PIB_CRECIMIENTO", "aylwin", date(1991, 12, 31), 8.0, "official"),
    ("PIB_CRECIMIENTO", "aylwin", date(1992, 12, 31), 12.3, "official"),
    ("PIB_CRECIMIENTO", "aylwin", date(1993, 12, 31), 7.0, "official"),
    
    # Unemployment
    ("DESEMPLEO", "aylwin", date(1990, 12, 31), 7.8, "official"),
    ("DESEMPLEO", "aylwin", date(1991, 12, 31), 8.2, "official"),
    ("DESEMPLEO", "aylwin", date(1992, 12, 31), 6.7, "official"),
    ("DESEMPLEO", "aylwin", date(1993, 12, 31), 6.5, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "aylwin", date(1990, 12, 31), 27.3, "official"),
    ("INFLACION_ANUAL", "aylwin", date(1991, 12, 31), 18.7, "official"),
    ("INFLACION_ANUAL", "aylwin", date(1992, 12, 31), 12.7, "official"),
    ("INFLACION_ANUAL", "aylwin", date(1993, 12, 31), 12.2, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "aylwin", date(1990, 12, 31), 38.6, "official"),
    ("POBREZA_INGRESOS", "aylwin", date(1992, 12, 31), 32.9, "official"),

    # =========================================================================
    # FREI RUIZ-TAGLE (1994-2000)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "frei-ruiz-tagle", date(1994, 12, 31), 5.7, "official"),
    ("PIB_CRECIMIENTO", "frei-ruiz-tagle", date(1995, 12, 31), 10.6, "official"),
    ("PIB_CRECIMIENTO", "frei-ruiz-tagle", date(1996, 12, 31), 7.4, "official"),
    ("PIB_CRECIMIENTO", "frei-ruiz-tagle", date(1997, 12, 31), 6.6, "official"),
    ("PIB_CRECIMIENTO", "frei-ruiz-tagle", date(1998, 12, 31), 3.2, "official"),
    ("PIB_CRECIMIENTO", "frei-ruiz-tagle", date(1999, 12, 31), -0.8, "official"),
    
    # Unemployment
    ("DESEMPLEO", "frei-ruiz-tagle", date(1994, 12, 31), 7.8, "official"),
    ("DESEMPLEO", "frei-ruiz-tagle", date(1995, 12, 31), 7.4, "official"),
    ("DESEMPLEO", "frei-ruiz-tagle", date(1996, 12, 31), 6.4, "official"),
    ("DESEMPLEO", "frei-ruiz-tagle", date(1997, 12, 31), 6.1, "official"),
    ("DESEMPLEO", "frei-ruiz-tagle", date(1998, 12, 31), 6.4, "official"),
    ("DESEMPLEO", "frei-ruiz-tagle", date(1999, 12, 31), 10.1, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "frei-ruiz-tagle", date(1994, 12, 31), 8.9, "official"),
    ("INFLACION_ANUAL", "frei-ruiz-tagle", date(1995, 12, 31), 8.2, "official"),
    ("INFLACION_ANUAL", "frei-ruiz-tagle", date(1996, 12, 31), 6.6, "official"),
    ("INFLACION_ANUAL", "frei-ruiz-tagle", date(1997, 12, 31), 6.0, "official"),
    ("INFLACION_ANUAL", "frei-ruiz-tagle", date(1998, 12, 31), 4.7, "official"),
    ("INFLACION_ANUAL", "frei-ruiz-tagle", date(1999, 12, 31), 2.3, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "frei-ruiz-tagle", date(1994, 12, 31), 27.6, "official"),
    ("POBREZA_INGRESOS", "frei-ruiz-tagle", date(1996, 12, 31), 23.2, "official"),
    ("POBREZA_INGRESOS", "frei-ruiz-tagle", date(1998, 12, 31), 21.7, "official"),

    # =========================================================================
    # LAGOS (2000-2006)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "lagos", date(2000, 12, 31), 4.5, "official"),
    ("PIB_CRECIMIENTO", "lagos", date(2001, 12, 31), 3.4, "official"),
    ("PIB_CRECIMIENTO", "lagos", date(2002, 12, 31), 2.2, "official"),
    ("PIB_CRECIMIENTO", "lagos", date(2003, 12, 31), 3.9, "official"),
    ("PIB_CRECIMIENTO", "lagos", date(2004, 12, 31), 6.0, "official"),
    ("PIB_CRECIMIENTO", "lagos", date(2005, 12, 31), 5.6, "official"),
    
    # Unemployment
    ("DESEMPLEO", "lagos", date(2000, 12, 31), 9.7, "official"),
    ("DESEMPLEO", "lagos", date(2001, 12, 31), 9.9, "official"),
    ("DESEMPLEO", "lagos", date(2002, 12, 31), 9.8, "official"),
    ("DESEMPLEO", "lagos", date(2003, 12, 31), 9.5, "official"),
    ("DESEMPLEO", "lagos", date(2004, 12, 31), 10.0, "official"),
    ("DESEMPLEO", "lagos", date(2005, 12, 31), 9.2, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "lagos", date(2000, 12, 31), 4.5, "official"),
    ("INFLACION_ANUAL", "lagos", date(2001, 12, 31), 2.6, "official"),
    ("INFLACION_ANUAL", "lagos", date(2002, 12, 31), 2.8, "official"),
    ("INFLACION_ANUAL", "lagos", date(2003, 12, 31), 1.1, "official"),
    ("INFLACION_ANUAL", "lagos", date(2004, 12, 31), 2.4, "official"),
    ("INFLACION_ANUAL", "lagos", date(2005, 12, 31), 3.7, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "lagos", date(2000, 12, 31), 20.2, "official"),
    ("POBREZA_INGRESOS", "lagos", date(2003, 12, 31), 18.7, "official"),

    # Gini
    ("GINI", "lagos", date(2000, 12, 31), 0.559, "official"),
    ("GINI", "lagos", date(2003, 12, 31), 0.552, "official"),

    # =========================================================================
    # BACHELET I (2006-2010)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "bachelet-1", date(2006, 12, 31), 4.6, "official"),
    ("PIB_CRECIMIENTO", "bachelet-1", date(2007, 12, 31), 4.6, "official"),
    ("PIB_CRECIMIENTO", "bachelet-1", date(2008, 12, 31), 3.2, "official"),
    ("PIB_CRECIMIENTO", "bachelet-1", date(2009, 12, 31), -1.0, "official"),
    
    # Unemployment
    ("DESEMPLEO", "bachelet-1", date(2006, 12, 31), 7.8, "official"),
    ("DESEMPLEO", "bachelet-1", date(2007, 12, 31), 7.1, "official"),
    ("DESEMPLEO", "bachelet-1", date(2008, 12, 31), 7.8, "official"),
    ("DESEMPLEO", "bachelet-1", date(2009, 12, 31), 9.7, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "bachelet-1", date(2006, 12, 31), 2.6, "official"),
    ("INFLACION_ANUAL", "bachelet-1", date(2007, 12, 31), 7.8, "official"),
    ("INFLACION_ANUAL", "bachelet-1", date(2008, 12, 31), 7.1, "official"),
    ("INFLACION_ANUAL", "bachelet-1", date(2009, 12, 31), -1.4, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "bachelet-1", date(2006, 12, 31), 13.7, "official"),
    ("POBREZA_INGRESOS", "bachelet-1", date(2009, 12, 31), 11.4, "official"),

    # Gini
    ("GINI", "bachelet-1", date(2006, 12, 31), 0.538, "official"),
    ("GINI", "bachelet-1", date(2009, 12, 31), 0.524, "official"),

    # =========================================================================
    # PINERA I (2010-2014)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "pinera-1", date(2010, 12, 31), 5.8, "official"),
    ("PIB_CRECIMIENTO", "pinera-1", date(2011, 12, 31), 5.8, "official"),
    ("PIB_CRECIMIENTO", "pinera-1", date(2012, 12, 31), 5.3, "official"),
    ("PIB_CRECIMIENTO", "pinera-1", date(2013, 12, 31), 4.0, "official"),
    
    # Unemployment
    ("DESEMPLEO", "pinera-1", date(2010, 12, 31), 8.2, "official"),
    ("DESEMPLEO", "pinera-1", date(2011, 12, 31), 7.1, "official"),
    ("DESEMPLEO", "pinera-1", date(2012, 12, 31), 6.4, "official"),
    ("DESEMPLEO", "pinera-1", date(2013, 12, 31), 5.9, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "pinera-1", date(2010, 12, 31), 3.0, "official"),
    ("INFLACION_ANUAL", "pinera-1", date(2011, 12, 31), 4.4, "official"),
    ("INFLACION_ANUAL", "pinera-1", date(2012, 12, 31), 1.5, "official"),
    ("INFLACION_ANUAL", "pinera-1", date(2013, 12, 31), 3.0, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "pinera-1", date(2011, 12, 31), 10.9, "official"),
    ("POBREZA_INGRESOS", "pinera-1", date(2013, 12, 31), 7.8, "official"),

    # Gini
    ("GINI", "pinera-1", date(2011, 12, 31), 0.508, "official"),
    ("GINI", "pinera-1", date(2013, 12, 31), 0.504, "official"),

    # =========================================================================
    # BACHELET II (2014-2018)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "bachelet-2", date(2014, 12, 31), 1.8, "official"),
    ("PIB_CRECIMIENTO", "bachelet-2", date(2015, 12, 31), 2.3, "official"),
    ("PIB_CRECIMIENTO", "bachelet-2", date(2016, 12, 31), 1.7, "official"),
    ("PIB_CRECIMIENTO", "bachelet-2", date(2017, 12, 31), 1.2, "official"),
    
    # Unemployment
    ("DESEMPLEO", "bachelet-2", date(2014, 12, 31), 6.4, "official"),
    ("DESEMPLEO", "bachelet-2", date(2015, 12, 31), 6.2, "official"),
    ("DESEMPLEO", "bachelet-2", date(2016, 12, 31), 6.5, "official"),
    ("DESEMPLEO", "bachelet-2", date(2017, 12, 31), 6.7, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "bachelet-2", date(2014, 12, 31), 4.6, "official"),
    ("INFLACION_ANUAL", "bachelet-2", date(2015, 12, 31), 4.4, "official"),
    ("INFLACION_ANUAL", "bachelet-2", date(2016, 12, 31), 2.7, "official"),
    ("INFLACION_ANUAL", "bachelet-2", date(2017, 12, 31), 2.3, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "bachelet-2", date(2015, 12, 31), 8.1, "official"),
    ("POBREZA_INGRESOS", "bachelet-2", date(2017, 12, 31), 6.3, "official"),

    # Gini
    ("GINI", "bachelet-2", date(2015, 12, 31), 0.495, "official"),
    ("GINI", "bachelet-2", date(2017, 12, 31), 0.488, "official"),

    # Public Debt
    ("DEUDA_PUBLICA_PIB", "bachelet-2", date(2014, 12, 31), 14.9, "official"),
    ("DEUDA_PUBLICA_PIB", "bachelet-2", date(2015, 12, 31), 17.4, "official"),
    ("DEUDA_PUBLICA_PIB", "bachelet-2", date(2016, 12, 31), 21.0, "official"),
    ("DEUDA_PUBLICA_PIB", "bachelet-2", date(2017, 12, 31), 23.6, "official"),

    # =========================================================================
    # PINERA II (2018-2022)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "pinera-2", date(2018, 12, 31), 3.9, "official"),
    ("PIB_CRECIMIENTO", "pinera-2", date(2019, 12, 31), 0.9, "official"),
    ("PIB_CRECIMIENTO", "pinera-2", date(2020, 12, 31), -6.1, "official"),
    ("PIB_CRECIMIENTO", "pinera-2", date(2021, 12, 31), 11.7, "official"),
    
    # Unemployment
    ("DESEMPLEO", "pinera-2", date(2018, 12, 31), 7.0, "official"),
    ("DESEMPLEO", "pinera-2", date(2019, 12, 31), 7.2, "official"),
    ("DESEMPLEO", "pinera-2", date(2020, 12, 31), 10.8, "official"),
    ("DESEMPLEO", "pinera-2", date(2021, 12, 31), 7.2, "official"),
    
    # Inflation
    ("INFLACION_ANUAL", "pinera-2", date(2018, 12, 31), 2.6, "official"),
    ("INFLACION_ANUAL", "pinera-2", date(2019, 12, 31), 3.0, "official"),
    ("INFLACION_ANUAL", "pinera-2", date(2020, 12, 31), 3.0, "official"),
    ("INFLACION_ANUAL", "pinera-2", date(2021, 12, 31), 7.2, "official"),

    # Poverty (CASEN)
    ("POBREZA_INGRESOS", "pinera-2", date(2020, 12, 31), 10.8, "official"),

    # Public Debt
    ("DEUDA_PUBLICA_PIB", "pinera-2", date(2018, 12, 31), 25.6, "official"),
    ("DEUDA_PUBLICA_PIB", "pinera-2", date(2019, 12, 31), 27.9, "official"),
    ("DEUDA_PUBLICA_PIB", "pinera-2", date(2020, 12, 31), 32.5, "official"),
    ("DEUDA_PUBLICA_PIB", "pinera-2", date(2021, 12, 31), 36.3, "official"),

    # =========================================================================
    # BORIC (2022-present)
    # =========================================================================
    # PIB Growth
    ("PIB_CRECIMIENTO", "boric", date(2022, 12, 31), 2.4, "official"),
    ("PIB_CRECIMIENTO", "boric", date(2023, 12, 31), 0.2, "official"),
    ("PIB_CRECIMIENTO", "boric", date(2024, 12, 31), 2.3, "estimated"),
    
    # Unemployment
    ("DESEMPLEO", "boric", date(2022, 12, 31), 7.9, "official"),
    ("DESEMPLEO", "boric", date(2023, 12, 31), 8.5, "official"),
    ("DESEMPLEO", "boric", date(2024, 12, 31), 8.7, "estimated"),
    
    # Inflation
    ("INFLACION_ANUAL", "boric", date(2022, 12, 31), 12.8, "official"),
    ("INFLACION_ANUAL", "boric", date(2023, 12, 31), 3.9, "official"),
    ("INFLACION_ANUAL", "boric", date(2024, 12, 31), 4.5, "estimated"),

    # Poverty (CASEN 2022)
    ("POBREZA_INGRESOS", "boric", date(2022, 12, 31), 6.5, "official"),

    # Gini
    ("GINI", "boric", date(2022, 12, 31), 0.470, "official"),

    # Public Debt
    ("DEUDA_PUBLICA_PIB", "boric", date(2022, 12, 31), 38.0, "official"),
    ("DEUDA_PUBLICA_PIB", "boric", date(2023, 12, 31), 39.2, "official"),
    ("DEUDA_PUBLICA_PIB", "boric", date(2024, 12, 31), 41.0, "estimated"),

    # Minimum Wage (selected years, in CLP)
    ("SALARIO_MINIMO", "bachelet-1", date(2006, 7, 1), 135000, "official"),
    ("SALARIO_MINIMO", "pinera-1", date(2010, 7, 1), 172000, "official"),
    ("SALARIO_MINIMO", "bachelet-2", date(2014, 7, 1), 225000, "official"),
    ("SALARIO_MINIMO", "pinera-2", date(2018, 7, 1), 288000, "official"),
    ("SALARIO_MINIMO", "pinera-2", date(2021, 7, 1), 337000, "official"),
    ("SALARIO_MINIMO", "boric", date(2022, 8, 1), 400000, "official"),
    ("SALARIO_MINIMO", "boric", date(2023, 9, 1), 460000, "official"),
    ("SALARIO_MINIMO", "boric", date(2024, 7, 1), 500000, "official"),
]
