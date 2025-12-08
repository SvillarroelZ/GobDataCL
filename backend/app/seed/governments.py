"""
Seed data for Chilean governments (1990-present).

Data sourced from official government records and publicly available information.
All information is factual and verifiable from official sources.

Sources:
- Biblioteca del Congreso Nacional de Chile (bcn.cl)
- Servicio Electoral de Chile (servel.cl)
- Gobierno de Chile (gob.cl)
"""

from datetime import date

# Chilean presidents from return to democracy (1990) to present
# Each entry contains only factual, verifiable information

GOVERNMENTS_DATA = [
    {
        "name": "Patricio Aylwin Azocar",
        "slug": "aylwin",
        "start_date": date(1990, 3, 11),
        "end_date": date(1994, 3, 11),
        "coalition": "Concertacion de Partidos por la Democracia",
        "short_bio": "Primer presidente tras el retorno a la democracia. Abogado y academico, lider de la Democracia Cristiana.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Partido Democrata Cristiano (PDC)",
                "start_year": 1957,
                "end_year": None,
                "role": "Presidente del partido (1973-1976, 1987-1989)"
            }
        ],
        "documented_controversies": [
            {
                "title": "Informe Rettig",
                "date": "1991-03-04",
                "description": "Publicacion del informe de la Comision Nacional de Verdad y Reconciliacion sobre violaciones a los derechos humanos durante la dictadura.",
                "source_url": "https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Patricio_Aylwin_Az%C3%B3car",
                "type": "historical_context"
            }
        ]
    },
    {
        "name": "Eduardo Frei Ruiz-Tagle",
        "slug": "frei-ruiz-tagle",
        "start_date": date(1994, 3, 11),
        "end_date": date(2000, 3, 11),
        "coalition": "Concertacion de Partidos por la Democracia",
        "short_bio": "Ingeniero civil, hijo del expresidente Eduardo Frei Montalva. Impulso la modernizacion del Estado.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Partido Democrata Cristiano (PDC)",
                "start_year": 1958,
                "end_year": None,
                "role": "Presidente del partido (2006-2008)"
            }
        ],
        "documented_controversies": [
            {
                "title": "Detencion de Pinochet en Londres",
                "date": "1998-10-16",
                "description": "Durante su gobierno, Augusto Pinochet fue detenido en Londres por orden del juez Baltasar Garzon.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "historical_context"
            }
        ]
    },
    {
        "name": "Ricardo Lagos Escobar",
        "slug": "lagos",
        "start_date": date(2000, 3, 11),
        "end_date": date(2006, 3, 11),
        "coalition": "Concertacion de Partidos por la Democracia",
        "short_bio": "Abogado y economista. Primer presidente socialista desde Salvador Allende.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Partido Socialista de Chile (PS)",
                "start_year": 1961,
                "end_year": 1971,
                "role": "Militante"
            },
            {
                "party": "Partido Por la Democracia (PPD)",
                "start_year": 1987,
                "end_year": None,
                "role": "Fundador y primer presidente"
            }
        ],
        "documented_controversies": [
            {
                "title": "Caso MOP-Gate",
                "date": "2002",
                "description": "Escandalo de sobresueldos en el Ministerio de Obras Publicas. Investigacion judicial sobre pagos irregulares.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "judicial"
            },
            {
                "title": "Reforma Constitucional 2005",
                "date": "2005-08-26",
                "description": "Firma de reformas constitucionales que eliminaron enclaves autoritarios de la Constitucion de 1980.",
                "source_url": "https://www.bcn.cl/leychile/navegar?idNorma=241331",
                "type": "legislative"
            }
        ]
    },
    {
        "name": "Michelle Bachelet Jeria",
        "slug": "bachelet-1",
        "start_date": date(2006, 3, 11),
        "end_date": date(2010, 3, 11),
        "coalition": "Concertacion de Partidos por la Democracia",
        "short_bio": "Medica cirujana y politica. Primera mujer presidenta de Chile.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Partido Socialista de Chile (PS)",
                "start_year": 1970,
                "end_year": None,
                "role": "Militante, Ministra de Salud (2000-2002), Ministra de Defensa (2002-2004)"
            }
        ],
        "documented_controversies": [
            {
                "title": "Transantiago",
                "date": "2007-02-10",
                "description": "Implementacion del nuevo sistema de transporte publico de Santiago con multiples problemas operacionales.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "policy"
            },
            {
                "title": "Terremoto 27F",
                "date": "2010-02-27",
                "description": "Terremoto 8.8 Richter y tsunami. Gestion de emergencia y reconstruccion en los ultimos dias de gobierno.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "emergency"
            }
        ]
    },
    {
        "name": "Sebastian Pinera Echenique",
        "slug": "pinera-1",
        "start_date": date(2010, 3, 11),
        "end_date": date(2014, 3, 11),
        "coalition": "Coalicion por el Cambio",
        "short_bio": "Empresario, ingeniero comercial y economista. Primer presidente de derecha electo desde 1958.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Renovacion Nacional (RN)",
                "start_year": 1987,
                "end_year": None,
                "role": "Fundador, Presidente del partido (1990-1992)"
            }
        ],
        "documented_controversies": [
            {
                "title": "Rescate mineros Atacama",
                "date": "2010-10-13",
                "description": "Rescate exitoso de 33 mineros atrapados en la mina San Jose tras 69 dias.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "emergency"
            },
            {
                "title": "Movimiento estudiantil 2011",
                "date": "2011",
                "description": "Masivas protestas estudiantiles demandando educacion publica gratuita y de calidad.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "social_movement"
            },
            {
                "title": "Caso Bancard-LAN",
                "date": "2011",
                "description": "Investigacion sobre posible uso de informacion privilegiada en venta de acciones de LAN.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "judicial"
            }
        ]
    },
    {
        "name": "Michelle Bachelet Jeria",
        "slug": "bachelet-2",
        "start_date": date(2014, 3, 11),
        "end_date": date(2018, 3, 11),
        "coalition": "Nueva Mayoria",
        "short_bio": "Segundo periodo presidencial. Impulso reformas estructurales en educacion, tributaria y laboral.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Partido Socialista de Chile (PS)",
                "start_year": 1970,
                "end_year": None,
                "role": "Militante"
            }
        ],
        "documented_controversies": [
            {
                "title": "Caso Caval",
                "date": "2015-02",
                "description": "Investigacion por presunto trafico de influencias relacionado con credito bancario a empresa de nuera del presidente.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "judicial"
            },
            {
                "title": "Reforma Educacional",
                "date": "2016",
                "description": "Implementacion de gratuidad universitaria y fin al lucro en educacion.",
                "source_url": "https://www.bcn.cl/leychile",
                "type": "legislative"
            },
            {
                "title": "Reforma Tributaria",
                "date": "2014-09-29",
                "description": "Ley 20.780 que modifico el sistema tributario chileno.",
                "source_url": "https://www.bcn.cl/leychile/navegar?idNorma=1067194",
                "type": "legislative"
            }
        ]
    },
    {
        "name": "Sebastian Pinera Echenique",
        "slug": "pinera-2",
        "start_date": date(2018, 3, 11),
        "end_date": date(2022, 3, 11),
        "coalition": "Chile Vamos",
        "short_bio": "Segundo periodo presidencial. Enfrento estallido social y pandemia COVID-19.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Renovacion Nacional (RN)",
                "start_year": 1987,
                "end_year": None,
                "role": "Militante"
            }
        ],
        "documented_controversies": [
            {
                "title": "Estallido social 18-O",
                "date": "2019-10-18",
                "description": "Protestas masivas iniciadas por alza en tarifa del metro. Estado de emergencia y acusaciones de violaciones a DDHH.",
                "source_url": "https://www.bcn.cl/historiapolitica",
                "type": "social_movement"
            },
            {
                "title": "Acuerdo por la Paz",
                "date": "2019-11-15",
                "description": "Acuerdo transversal para proceso constituyente y plebiscito.",
                "source_url": "https://www.bcn.cl/leychile",
                "type": "legislative"
            },
            {
                "title": "Pandemia COVID-19",
                "date": "2020-03",
                "description": "Gestion de la pandemia, cuarentenas y plan de vacunacion.",
                "source_url": "https://www.gob.cl/coronavirus",
                "type": "emergency"
            },
            {
                "title": "Pandora Papers",
                "date": "2021-10",
                "description": "Mencion en investigacion periodistica internacional sobre sociedades offshore.",
                "source_url": "https://www.icij.org/investigations/pandora-papers/",
                "type": "judicial"
            }
        ]
    },
    {
        "name": "Gabriel Boric Font",
        "slug": "boric",
        "start_date": date(2022, 3, 11),
        "end_date": date(2026, 3, 11),
        "coalition": "Apruebo Dignidad / Gobierno de Chile",
        "short_bio": "Abogado y exdirigente estudiantil. Presidente mas joven en la historia de Chile.",
        "image_url": None,
        "political_party_history": [
            {
                "party": "Movimiento Autonomista",
                "start_year": 2009,
                "end_year": 2017,
                "role": "Fundador"
            },
            {
                "party": "Convergencia Social (CS)",
                "start_year": 2018,
                "end_year": None,
                "role": "Militante"
            }
        ],
        "documented_controversies": [
            {
                "title": "Plebiscito Constitucional 2022",
                "date": "2022-09-04",
                "description": "Rechazo de propuesta de nueva constitucion con 61.86% de los votos.",
                "source_url": "https://www.servel.cl",
                "type": "plebiscite"
            },
            {
                "title": "Plebiscito Constitucional 2023",
                "date": "2023-12-17",
                "description": "Segundo rechazo de propuesta constitucional con 55.76% de los votos.",
                "source_url": "https://www.servel.cl",
                "type": "plebiscite"
            },
            {
                "title": "Caso Fundaciones",
                "date": "2024",
                "description": "Investigacion sobre uso de fondos publicos en fundaciones vinculadas a partidos politicos.",
                "source_url": "https://www.fiscaliadechile.cl",
                "type": "judicial"
            }
        ]
    },
]
