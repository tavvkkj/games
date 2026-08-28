var LANGUAGE_GERMAN = 0;
var LANGUAGE_ENGLISH = 1;
var LANGUAGE_SPANISH = 2;
var LANGUAGE_FRENCH = 3;
var LANGUAGE_ITALIAN = 4;


var g_language = LANGUAGE_ENGLISH;
g_language = LANGUAGE_GERMAN;

var LANG_QUICK_RACE = 0;
var LANG_CHALLENGE = 1;
var LANG_OPTIONS = 2;
var LANG_HELP = 3;
var LANG_ABOUT = 4;
var LANG_SELECT = 5;

var LANG_PRESS_ANY_KEY = 6;

var LANG_LENGTH = 7;
var LANG_LANE = 8;
var LANG_TRAFFIC = 9;
var LANG_HEAVY = 10;
var LANG_LIGHT = 11;
var LANG_AVERAGE = 12;

var LANG_TOKYO_JAPAN = 13;
var LANG_NEWYORK_USA = 14;
var LANG_PARIS_FRANCE = 15;
var LANG_LONDON_UK = 16;
var LANG_SICILY_ITALY = 17;
var LANG_LUXOR_EGYPT = 18;
var LANG_VLAD_RUSSIA = 19;
var LANG_CADESERT_USA = 20;

var LANG_TOKYO = 21;
var LANG_NEWYORK = 22;
var LANG_PARIS = 23;
var LANG_LONDON = 24;
var LANG_SIRACUSA = 25;
var LANG_LUXOR = 26;
var LANG_VLAD = 27;
var LANG_ROUTE = 28;

var LANG_RACE_SELECTION = 29;
var LANG_CAR_SELECTION = 30;

var LANG_WEIGHT = 31;
var LANG_ENGINE = 32;
var LANG_MAX_SPEED = 33;
var LANG_ACCEL = 34;

var LANG_BACK = 35;
var LANG_ACCEPT = 36;

var LANG_BUSTED = 37;
var LANG_2_LAPS = 38;
var LANG_FINAL_LAP = 39;
var LANG_FINISH = 40;

var LANG_LOADING = 41;
var LANG_SELECT_LANGUAGE = 42;
var LANG_LAP = 43;
var LANG_POS_1 = 44;
var LANG_POS_2 = 45;
var LANG_POS_3 = 46;
var LANG_POS_4 = 47;

var LANG_SOUND = 48;
var LANG_OFF = 49;
var LANG_QUIET = 50;
var LANG_MEDIUM = 51;
var LANG_LOUD = 52;
var LANG_SPEEDOMETER = 53;
var LANG_KPH = 54;
var LANG_MPH = 55;
var LANG_LANGUAGE = 56;
var LANG_CURRENT_LANGUAGE = 57;
var LANG_LEGAL_NOTICE = 58;
var LANG_NEXT = 59;

var LANG_LEGAL_NAME_1 = 60;
var LANG_LEGAL_CONTENT_1 = 61;
var LANG_LEGAL_NAME_2 = 62;
var LANG_LEGAL_CONTENT_2 = 63;
var LANG_LEGAL_NAME_3 = 64;
var LANG_LEGAL_CONTENT_3 = 65;

var LANG_RESUME = 66;
var LANG_RESTART = 67;
var LANG_EXIT_TO_MENU = 68;

var LANG_CONGRATULATION = 69;
var LANG_GET_AWAY = 70;
var LANG_EXPEDITE = 71;
var LANG_SCRATCH = 72;
var LANG_BUMPING = 73;
var LANG_SPEED_1 = 74;
var LANG_SPEED_2 = 75;
var LANG_URBAN_HAVOC = 76;
var LANG_RACE = 77;
var LANG_TOTAL = 78;

var LANG_TUTORIAL_1 = 79;
var LANG_TUTORIAL_2 = 80;
var LANG_TUTORIAL_3 = 81;
var LANG_TUTORIAL_4 = 82;
var LANG_TUTORIAL_5 = 83;


var LANG_INFO_AND_SUPPORT = 84;
var LANG_PRODUCER = 85;
var LANG_GAME_DESIGNER = 86;
var LANG_GRAPHIC = 87;
var LANG_SOUND_SFX = 88;
var LANG_LEAD_PROGRAMMER = 89;
var LANG_PROGRAMMER = 90;
var LANG_TOOL_PROGRAMMER = 91;
var LANG_QA_MANAGER = 92;
var LANG_QA_LEAD = 93;
var LANG_QA = 94;
var LANG_HTML5 = 95;
var LANG_THANKS = 96;
var LANG_QA_PRJ_MANAGER = 97;
var LANG_QA_TESTER = 98;

var CAR_ROADSTER_ENGINE = 99;
var CAR_ROADSTER_ACCELERATION = 100;
var CAR_EXIGE_ENGINE = 101;
var CAR_EXIGE_ACCELERATION = 102;
var CAR_CORVETTE_ENGINE = 103;
var CAR_CORVETTE_ACCELERATION = 104;
var CAR_SKYLINE_ENGINE = 105;
var CAR_SKYLINE_ACCELERATION = 106;
var CAR_SAGARIS_ENGINE = 107;
var CAR_SAGARIS_ACCELERATION = 108;
var CAR_GALLARDO_ENGINE = 109;
var CAR_GALLARDO_ACCELERATION = 110;
var CAR_FORD_ENGINE = 111;
var CAR_FORD_ACCELERATION = 112;
var CAR_SALEEN_ENGINE = 113;
var CAR_SALEEN_ACCELERATION = 114;

var LANG_SHARE_BUTTON = 120;
var LANG_PROGRAMMER_HTML5 = 121;

var LANG_LEADERBOARD_TITLE = 123;
var LANG_LEADERBOARD_RANK = 124;
var LANG_LEADERBOARD_NAME = 125;
var LANG_LEADERBOARD_SCORE = 126;
var LANG_LEADERBOARD_HIGHSCORE = 127;
var LANG_LEADERBOARD_NAME_INPUT = 128;
var LANG_LEADERBOARD_LOADING = 129;
var LANG_LEADERBOARD_SKIP = 130;
var LANG_LEADERBOARD_SUBMIT = 131;

var LANG_AUDIO_MANAGER = 132;
var LANG_AUDIO_DIRECTOR = 133;
var LANG_SOUNDFX_MUSIC = 134;
var LANG_ADDITIONAL_SOUND_DESIGN = 135;
var LANG_BIZ_TEAM = 136;





var g_locText = [];
g_locText[LANGUAGE_ENGLISH] = [];
g_locText[LANGUAGE_FRENCH] = [];
g_locText[LANGUAGE_SPANISH] = [];
g_locText[LANGUAGE_GERMAN] = [];
g_locText[LANGUAGE_ITALIAN] = [];



g_locText[LANGUAGE_ENGLISH][LANG_QUICK_RACE] 			= "INSTANT PLAY";
g_locText[LANGUAGE_FRENCH][LANG_QUICK_RACE]				= "COURSE RAPIDE";
g_locText[LANGUAGE_SPANISH][LANG_QUICK_RACE] 			= "CARRERA RÁPIDA";
g_locText[LANGUAGE_GERMAN][LANG_QUICK_RACE] 			= "SCHNELLSPIEL";
g_locText[LANGUAGE_ITALIAN][LANG_QUICK_RACE] 			= "CORSA RAPIDA";

g_locText[LANGUAGE_ENGLISH][LANG_CHALLENGE] 			= "ARCADE";
g_locText[LANGUAGE_FRENCH][LANG_CHALLENGE]				= "ARCADE";
g_locText[LANGUAGE_SPANISH][LANG_CHALLENGE] 			= "ARCADE";
g_locText[LANGUAGE_GERMAN][LANG_CHALLENGE] 				= "ARCADE";
g_locText[LANGUAGE_ITALIAN][LANG_CHALLENGE] 			= "ARCADE";

g_locText[LANGUAGE_ENGLISH][LANG_OPTIONS] 				= "Options";
g_locText[LANGUAGE_FRENCH][LANG_OPTIONS]				= "Options";
g_locText[LANGUAGE_SPANISH][LANG_OPTIONS] 				= "Opciones";
g_locText[LANGUAGE_GERMAN][LANG_OPTIONS] 				= "Optionen";
g_locText[LANGUAGE_ITALIAN][LANG_OPTIONS] 				= "Opzioni";

g_locText[LANGUAGE_ENGLISH][LANG_HELP] 					= "HELP";
g_locText[LANGUAGE_FRENCH][LANG_HELP]					= "AIDE";
g_locText[LANGUAGE_SPANISH][LANG_HELP] 					= "AYUDA";
g_locText[LANGUAGE_GERMAN][LANG_HELP] 					= "HILFE";
g_locText[LANGUAGE_ITALIAN][LANG_HELP] 					= "AIUTO";
	
g_locText[LANGUAGE_ENGLISH][LANG_ABOUT] 				= "ABOUT";
g_locText[LANGUAGE_FRENCH][LANG_ABOUT]					= "À PROPOS";
g_locText[LANGUAGE_SPANISH][LANG_ABOUT] 				= "ACERCA DE";
g_locText[LANGUAGE_GERMAN][LANG_ABOUT] 					= "INFO";
g_locText[LANGUAGE_ITALIAN][LANG_ABOUT] 				= "INFO";

g_locText[LANGUAGE_ENGLISH][LANG_SELECT] 				= "SELECT";
g_locText[LANGUAGE_FRENCH][LANG_SELECT]					= "SÉLECT.";
g_locText[LANGUAGE_SPANISH][LANG_SELECT] 				= "SELECCIONAR";
g_locText[LANGUAGE_GERMAN][LANG_SELECT] 				= "WÄHLEN";
g_locText[LANGUAGE_ITALIAN][LANG_SELECT] 				= "SELEZIONA";

g_locText[LANGUAGE_ENGLISH][LANG_BACK] 					= "BACK";
g_locText[LANGUAGE_FRENCH][LANG_BACK]					= "RETOUR";
g_locText[LANGUAGE_SPANISH][LANG_BACK] 					= "ATRÁS";
g_locText[LANGUAGE_GERMAN][LANG_BACK] 					= "ZURÜCK";
g_locText[LANGUAGE_ITALIAN][LANG_BACK] 					= "INDIETRO";

g_locText[LANGUAGE_ENGLISH][LANG_ACCEPT] 				= "ACCEPT";
g_locText[LANGUAGE_FRENCH][LANG_ACCEPT]					= "ACCEPTER";
g_locText[LANGUAGE_SPANISH][LANG_ACCEPT] 				= "ACEPTAR";
g_locText[LANGUAGE_GERMAN][LANG_ACCEPT] 				= "OK";
g_locText[LANGUAGE_ITALIAN][LANG_ACCEPT] 				= "ACCETTA";

g_locText[LANGUAGE_ENGLISH][LANG_PRESS_ANY_KEY] 		= "PRESS ANY KEY";
g_locText[LANGUAGE_FRENCH][LANG_PRESS_ANY_KEY]			= "APPUIER SUR UNE TOUCHE";
g_locText[LANGUAGE_SPANISH][LANG_PRESS_ANY_KEY] 		= "PULSA UNA TECLA";
g_locText[LANGUAGE_GERMAN][LANG_PRESS_ANY_KEY] 			= "BELIEBIGE TASTE DRÜCKEN";
g_locText[LANGUAGE_ITALIAN][LANG_PRESS_ANY_KEY] 		= "PREMI UN TASTO";

g_locText[LANGUAGE_ENGLISH][LANG_LENGTH] 				= "Length:";
g_locText[LANGUAGE_FRENCH][LANG_LENGTH]					= "Longueur:";
g_locText[LANGUAGE_SPANISH][LANG_LENGTH] 				= "Longitud:";
g_locText[LANGUAGE_GERMAN][LANG_LENGTH] 				= "Länge:";
g_locText[LANGUAGE_ITALIAN][LANG_LENGTH] 				= "Lunghezza:";

g_locText[LANGUAGE_ENGLISH][LANG_LANE] 					= "Lanes:";
g_locText[LANGUAGE_FRENCH][LANG_LANE]					= "Voies:";
g_locText[LANGUAGE_SPANISH][LANG_LANE] 					= "Carriles:";
g_locText[LANGUAGE_GERMAN][LANG_LANE] 					= "Fahrbahnen:";
g_locText[LANGUAGE_ITALIAN][LANG_LANE] 					= "Corsie:";

g_locText[LANGUAGE_ENGLISH][LANG_TRAFFIC] 				= "Traffic:";
g_locText[LANGUAGE_FRENCH][LANG_TRAFFIC]				= "Circulation:";
g_locText[LANGUAGE_SPANISH][LANG_TRAFFIC] 				= "Tráfico:";
g_locText[LANGUAGE_GERMAN][LANG_TRAFFIC] 				= "Verkehr:";
g_locText[LANGUAGE_ITALIAN][LANG_TRAFFIC] 				= "Traffico:";

g_locText[LANGUAGE_ENGLISH][LANG_HEAVY] 				= "Heavy";
g_locText[LANGUAGE_FRENCH][LANG_HEAVY]					= "Dense";
g_locText[LANGUAGE_SPANISH][LANG_HEAVY] 				= "Denso";
g_locText[LANGUAGE_GERMAN][LANG_HEAVY] 					= "Stark";
g_locText[LANGUAGE_ITALIAN][LANG_HEAVY] 				= "Pesante";

g_locText[LANGUAGE_ENGLISH][LANG_LIGHT] 				= "Light";
g_locText[LANGUAGE_FRENCH][LANG_LIGHT]					= "Léger";
g_locText[LANGUAGE_SPANISH][LANG_LIGHT] 				= "Ligero";
g_locText[LANGUAGE_GERMAN][LANG_LIGHT] 					= "Leicht";
g_locText[LANGUAGE_ITALIAN][LANG_LIGHT] 				= "Leggero";

g_locText[LANGUAGE_ENGLISH][LANG_AVERAGE] 				= "Average";
g_locText[LANGUAGE_FRENCH][LANG_AVERAGE]				= "Moyen";
g_locText[LANGUAGE_SPANISH][LANG_AVERAGE] 				= "Medio";
g_locText[LANGUAGE_GERMAN][LANG_AVERAGE] 				= "Mittel";
g_locText[LANGUAGE_ITALIAN][LANG_AVERAGE] 				= "Medio";


g_locText[LANGUAGE_ENGLISH][LANG_TOKYO_JAPAN] 			= "Tokyo - Japan";
g_locText[LANGUAGE_FRENCH][LANG_TOKYO_JAPAN]			= "Tokyo -- Japon";
g_locText[LANGUAGE_SPANISH][LANG_TOKYO_JAPAN] 			= "Tokio - Japón";
g_locText[LANGUAGE_GERMAN][LANG_TOKYO_JAPAN] 			= "Tokio - Japan";
g_locText[LANGUAGE_ITALIAN][LANG_TOKYO_JAPAN] 			= "Tokyo - Giappone";

g_locText[LANGUAGE_ENGLISH][LANG_NEWYORK_USA] 			= "New York - U.S.A.";
g_locText[LANGUAGE_FRENCH][LANG_NEWYORK_USA]			= "New York -- É.-U.";
g_locText[LANGUAGE_SPANISH][LANG_NEWYORK_USA] 			= "Nueva York - EEUU";
g_locText[LANGUAGE_GERMAN][LANG_NEWYORK_USA] 			= "New York - USA";
g_locText[LANGUAGE_ITALIAN][LANG_NEWYORK_USA] 			= "New York - USA";

g_locText[LANGUAGE_ENGLISH][LANG_PARIS_FRANCE] 			= "Paris - France";
g_locText[LANGUAGE_FRENCH][LANG_PARIS_FRANCE]			= "Paris -- France";
g_locText[LANGUAGE_SPANISH][LANG_PARIS_FRANCE] 			= "París - Francia";
g_locText[LANGUAGE_GERMAN][LANG_PARIS_FRANCE] 			= "Paris - Frankreich";
g_locText[LANGUAGE_ITALIAN][LANG_PARIS_FRANCE] 			= "Parigi - Francia";

g_locText[LANGUAGE_ENGLISH][LANG_LONDON_UK] 			= "London -- UK";
g_locText[LANGUAGE_FRENCH][LANG_LONDON_UK]				= "Londres -- Royaume-Uni";
g_locText[LANGUAGE_SPANISH][LANG_LONDON_UK] 			= "Londres - Reino Unido";
g_locText[LANGUAGE_GERMAN][LANG_LONDON_UK] 				= "London - England";
g_locText[LANGUAGE_ITALIAN][LANG_LONDON_UK] 			= "Londra - GB";

g_locText[LANGUAGE_ENGLISH][LANG_SICILY_ITALY] 			= "Sicily -- Italy";
g_locText[LANGUAGE_FRENCH][LANG_SICILY_ITALY]			= "Sicile -- Italie";
g_locText[LANGUAGE_SPANISH][LANG_SICILY_ITALY] 			= "Sicilia - Italia";
g_locText[LANGUAGE_GERMAN][LANG_SICILY_ITALY] 			= "Sizilien - Italien";
g_locText[LANGUAGE_ITALIAN][LANG_SICILY_ITALY] 			= "Sicilia - Italia";

g_locText[LANGUAGE_ENGLISH][LANG_LUXOR_EGYPT] 			= "Luxor -- Egypt";
g_locText[LANGUAGE_FRENCH][LANG_LUXOR_EGYPT]			= "Louxor -- Égypte";
g_locText[LANGUAGE_SPANISH][LANG_LUXOR_EGYPT] 			= "Luxor - Egipto";
g_locText[LANGUAGE_GERMAN][LANG_LUXOR_EGYPT] 			= "Luxor - Ägypten";
g_locText[LANGUAGE_ITALIAN][LANG_LUXOR_EGYPT] 			= "Luxor - Egitto";

g_locText[LANGUAGE_ENGLISH][LANG_VLAD_RUSSIA] 			= "Vladivostok -- Russia";
g_locText[LANGUAGE_FRENCH][LANG_VLAD_RUSSIA]			= "Vladivostok -- Russie";
g_locText[LANGUAGE_SPANISH][LANG_VLAD_RUSSIA] 			= "Vladivostok - Rusia";
g_locText[LANGUAGE_GERMAN][LANG_VLAD_RUSSIA] 			= "Wladiwostok - Russl.";
g_locText[LANGUAGE_ITALIAN][LANG_VLAD_RUSSIA] 			= "Vladivostok - Russia";

g_locText[LANGUAGE_ENGLISH][LANG_CADESERT_USA] 			= "CA desert -- USA";
g_locText[LANGUAGE_FRENCH][LANG_CADESERT_USA]			= "Désert Calif. -- USA";
g_locText[LANGUAGE_SPANISH][LANG_CADESERT_USA] 			= "Desierto de California";
g_locText[LANGUAGE_GERMAN][LANG_CADESERT_USA] 			= "Kalifornien - USA";
g_locText[LANGUAGE_ITALIAN][LANG_CADESERT_USA] 			= "Deserto - USA (CA)";

g_locText[LANGUAGE_ENGLISH][LANG_TOKYO] 				= "Tokyo";
g_locText[LANGUAGE_FRENCH][LANG_TOKYO]					= "Tokyo";
g_locText[LANGUAGE_SPANISH][LANG_TOKYO] 				= "Tokio";
g_locText[LANGUAGE_GERMAN][LANG_TOKYO]					= "Tokio";
g_locText[LANGUAGE_ITALIAN][LANG_TOKYO]					= "Tokyo";

g_locText[LANGUAGE_ENGLISH][LANG_NEWYORK] 				= "New York";
g_locText[LANGUAGE_FRENCH][LANG_NEWYORK]				= "New York";
g_locText[LANGUAGE_SPANISH][LANG_NEWYORK] 				= "Nueva York";
g_locText[LANGUAGE_GERMAN][LANG_NEWYORK]				= "New York";
g_locText[LANGUAGE_ITALIAN][LANG_NEWYORK]				= "New York";

g_locText[LANGUAGE_ENGLISH][LANG_PARIS] 				= "Paris";
g_locText[LANGUAGE_FRENCH][LANG_PARIS]					= "Paris";
g_locText[LANGUAGE_SPANISH][LANG_PARIS] 				= "París";
g_locText[LANGUAGE_GERMAN][LANG_PARIS]					= "Paris";
g_locText[LANGUAGE_ITALIAN][LANG_PARIS]					= "Parigi";

g_locText[LANGUAGE_ENGLISH][LANG_LONDON] 				= "London";
g_locText[LANGUAGE_FRENCH][LANG_LONDON]					= "Londres";
g_locText[LANGUAGE_SPANISH][LANG_LONDON] 				= "Londres";
g_locText[LANGUAGE_GERMAN][LANG_LONDON]					= "London";
g_locText[LANGUAGE_ITALIAN][LANG_LONDON]				= "Londra";

g_locText[LANGUAGE_ENGLISH][LANG_SIRACUSA] 				= "Siracusa";
g_locText[LANGUAGE_FRENCH][LANG_SIRACUSA]				= "Syracuse";
g_locText[LANGUAGE_SPANISH][LANG_SIRACUSA] 				= "Siracusa";
g_locText[LANGUAGE_GERMAN][LANG_SIRACUSA]				= "Syrakus";
g_locText[LANGUAGE_ITALIAN][LANG_SIRACUSA]				= "Siracusa";

g_locText[LANGUAGE_ENGLISH][LANG_LUXOR] 				= "Luxor";
g_locText[LANGUAGE_FRENCH][LANG_LUXOR]					= "Louxor";
g_locText[LANGUAGE_SPANISH][LANG_LUXOR] 				= "Luxor";
g_locText[LANGUAGE_GERMAN][LANG_LUXOR]					= "Luxor";
g_locText[LANGUAGE_ITALIAN][LANG_LUXOR]					= "Luxor";

g_locText[LANGUAGE_ENGLISH][LANG_VLAD] 					= "Vladivostok";
g_locText[LANGUAGE_FRENCH][LANG_VLAD]					= "Vladivostok";
g_locText[LANGUAGE_SPANISH][LANG_VLAD] 					= "Vladivostok";
g_locText[LANGUAGE_GERMAN][LANG_VLAD]					= "Wladiwostok";
g_locText[LANGUAGE_ITALIAN][LANG_VLAD]					= "Vladivostok";

g_locText[LANGUAGE_ENGLISH][LANG_ROUTE] 				= "Route 66";
g_locText[LANGUAGE_FRENCH][LANG_ROUTE]					= "Route 66";
g_locText[LANGUAGE_SPANISH][LANG_ROUTE] 				= "Ruta 66";
g_locText[LANGUAGE_GERMAN][LANG_ROUTE]					= "Route 66";
g_locText[LANGUAGE_ITALIAN][LANG_ROUTE]					= "Route 66";

g_locText[LANGUAGE_ENGLISH][LANG_RACE_SELECTION] 		= "Race selection";
g_locText[LANGUAGE_FRENCH][LANG_RACE_SELECTION]			= "Sélection de la course";
g_locText[LANGUAGE_SPANISH][LANG_RACE_SELECTION] 		= "Selección de carrera";
g_locText[LANGUAGE_GERMAN][LANG_RACE_SELECTION] 		= "Streckenwahl";
g_locText[LANGUAGE_ITALIAN][LANG_RACE_SELECTION] 		= "Selezione corsa";

g_locText[LANGUAGE_ENGLISH][LANG_CAR_SELECTION] 		= "Car selection";
g_locText[LANGUAGE_FRENCH][LANG_CAR_SELECTION]			= "Sélection de la voiture";
g_locText[LANGUAGE_SPANISH][LANG_CAR_SELECTION] 		= "Selección del coche";
g_locText[LANGUAGE_GERMAN][LANG_CAR_SELECTION]			= "Fahrzeugwahl";
g_locText[LANGUAGE_ITALIAN][LANG_CAR_SELECTION] 		= "Selezione auto";

g_locText[LANGUAGE_ENGLISH][LANG_WEIGHT] 				= "Weight:";
g_locText[LANGUAGE_FRENCH][LANG_WEIGHT]					= "Poids :";
g_locText[LANGUAGE_SPANISH][LANG_WEIGHT] 				= "Peso:";
g_locText[LANGUAGE_GERMAN][LANG_WEIGHT]					= "Gewicht:";
g_locText[LANGUAGE_ITALIAN][LANG_WEIGHT]				= "Peso:";

g_locText[LANGUAGE_ENGLISH][LANG_ENGINE] 				= "Engine:";
g_locText[LANGUAGE_FRENCH][LANG_ENGINE]					= "Moteur :";
g_locText[LANGUAGE_SPANISH][LANG_ENGINE] 				= "Motor:";
g_locText[LANGUAGE_GERMAN][LANG_ENGINE]					= "Motor:";
g_locText[LANGUAGE_ITALIAN][LANG_ENGINE]				= "Motore:";

g_locText[LANGUAGE_ENGLISH][LANG_MAX_SPEED] 			= "Max speed:";
g_locText[LANGUAGE_FRENCH][LANG_MAX_SPEED]				= "Vit. max :";
g_locText[LANGUAGE_SPANISH][LANG_MAX_SPEED] 			= "Velocidad máx:";
g_locText[LANGUAGE_GERMAN][LANG_MAX_SPEED]				= "Max. Geschw:";
g_locText[LANGUAGE_ITALIAN][LANG_MAX_SPEED]				= "Velocità massima:";

g_locText[LANGUAGE_ENGLISH][LANG_ACCEL] 				= "0 - 100 km/h:";
g_locText[LANGUAGE_FRENCH][LANG_ACCEL]					= "0 - 100 km/h :";
g_locText[LANGUAGE_SPANISH][LANG_ACCEL] 				= "0 - 100 km/h:";
g_locText[LANGUAGE_GERMAN][LANG_ACCEL]					= "0 - 100 km/h:";
g_locText[LANGUAGE_ITALIAN][LANG_ACCEL]					= "0 - 100 km/h:";

g_locText[LANGUAGE_ENGLISH][LANG_BUSTED] 				= "!!! BUSTED !!!";
g_locText[LANGUAGE_FRENCH][LANG_BUSTED]					= "!!! ARRESTATION !!!";
g_locText[LANGUAGE_SPANISH][LANG_BUSTED] 				= "¡TE HAN PILLADO!";
g_locText[LANGUAGE_GERMAN][LANG_BUSTED]					= "!! GESCHNAPPT !!";
g_locText[LANGUAGE_ITALIAN][LANG_BUSTED]				= "PRESO!";

g_locText[LANGUAGE_ENGLISH][LANG_2_LAPS] 				= "2 LAPS TO GO!";
g_locText[LANGUAGE_FRENCH][LANG_2_LAPS]					= "PLUS QUE 2 TOURS !";
g_locText[LANGUAGE_SPANISH][LANG_2_LAPS] 				= "¡QUEDAN 2 VUELTAS!";
g_locText[LANGUAGE_GERMAN][LANG_2_LAPS]					= "NOCH 2 RUNDEN!";
g_locText[LANGUAGE_ITALIAN][LANG_2_LAPS]				= "ANCORA 2 GIRI!";

g_locText[LANGUAGE_ENGLISH][LANG_FINAL_LAP] 			= "FINAL LAP!";
g_locText[LANGUAGE_FRENCH][LANG_FINAL_LAP]				= "DERNIER TOUR !";
g_locText[LANGUAGE_SPANISH][LANG_FINAL_LAP] 			= "¡VUELTA FINAL!";
g_locText[LANGUAGE_GERMAN][LANG_FINAL_LAP]				= "LETZTE RUNDE!";
g_locText[LANGUAGE_ITALIAN][LANG_FINAL_LAP]				= "ULTIMO GIRO!";

g_locText[LANGUAGE_ENGLISH][LANG_FINISH] 				= "FINISH!";
g_locText[LANGUAGE_FRENCH][LANG_FINISH]					= "FIN !";
g_locText[LANGUAGE_SPANISH][LANG_FINISH] 				= "¡HAS TERMINADO!";
g_locText[LANGUAGE_GERMAN][LANG_FINISH]					= "ZIEL!";
g_locText[LANGUAGE_ITALIAN][LANG_FINISH]				= "TRAGUARDO!";

g_locText[LANGUAGE_ENGLISH][LANG_LOADING] 				= "Loading...";
g_locText[LANGUAGE_FRENCH][LANG_LOADING]				= "Chargement...";
g_locText[LANGUAGE_SPANISH][LANG_LOADING] 				= "Cargando...";
g_locText[LANGUAGE_GERMAN][LANG_LOADING]				= "Lädt";
g_locText[LANGUAGE_ITALIAN][LANG_LOADING]				= "Caricamento...";

g_locText[LANGUAGE_ENGLISH][LANG_SELECT_LANGUAGE] 		= "Select your language";
g_locText[LANGUAGE_FRENCH][LANG_SELECT_LANGUAGE]		= "Sélectionnez votre langue";
g_locText[LANGUAGE_SPANISH][LANG_SELECT_LANGUAGE] 		= "Selecciona tu idioma";
g_locText[LANGUAGE_GERMAN][LANG_SELECT_LANGUAGE]		= "Wähle deine Sprache";
g_locText[LANGUAGE_ITALIAN][LANG_SELECT_LANGUAGE]		= "Seleziona la lingua";

g_locText[LANGUAGE_ENGLISH][LANG_LAP] 					= "LAP:";
g_locText[LANGUAGE_FRENCH][LANG_LAP]					= "TOUR :";
g_locText[LANGUAGE_SPANISH][LANG_LAP] 					= "VUELTA:";
g_locText[LANGUAGE_GERMAN][LANG_LAP]					= "RUNDE:";
g_locText[LANGUAGE_ITALIAN][LANG_LAP]					= "GIRO:";

g_locText[LANGUAGE_ENGLISH][LANG_POS_1] 				= "st";
g_locText[LANGUAGE_FRENCH][LANG_POS_1]					= "er";
g_locText[LANGUAGE_SPANISH][LANG_POS_1] 				= ".º";
g_locText[LANGUAGE_GERMAN][LANG_POS_1]					= "";
g_locText[LANGUAGE_ITALIAN][LANG_POS_1]					= "°";

g_locText[LANGUAGE_ENGLISH][LANG_POS_2] 				= "nd";
g_locText[LANGUAGE_FRENCH][LANG_POS_2]					= "e";
g_locText[LANGUAGE_SPANISH][LANG_POS_2] 				= ".º";
g_locText[LANGUAGE_GERMAN][LANG_POS_2]					= "";
g_locText[LANGUAGE_ITALIAN][LANG_POS_2]					= "°";

g_locText[LANGUAGE_ENGLISH][LANG_POS_3] 				= "rd";
g_locText[LANGUAGE_FRENCH][LANG_POS_3]					= "e";
g_locText[LANGUAGE_SPANISH][LANG_POS_3] 				= ".º";
g_locText[LANGUAGE_GERMAN][LANG_POS_3]					= "";
g_locText[LANGUAGE_ITALIAN][LANG_POS_3]					= "°";

g_locText[LANGUAGE_ENGLISH][LANG_POS_4] 				= "th";
g_locText[LANGUAGE_FRENCH][LANG_POS_4]					= "e";
g_locText[LANGUAGE_SPANISH][LANG_POS_4] 				= ".º";
g_locText[LANGUAGE_GERMAN][LANG_POS_4]					= "";
g_locText[LANGUAGE_ITALIAN][LANG_POS_4]					= "°";

g_locText[LANGUAGE_ENGLISH][LANG_SOUND] 				= "Sound:";
g_locText[LANGUAGE_FRENCH][LANG_SOUND]					= "Son :";
g_locText[LANGUAGE_SPANISH][LANG_SOUND] 				= "Sonido:";
g_locText[LANGUAGE_GERMAN][LANG_SOUND]					= "Sound:";
g_locText[LANGUAGE_ITALIAN][LANG_SOUND]					= "Audio:";

g_locText[LANGUAGE_ENGLISH][LANG_OFF] 					= "Off";
g_locText[LANGUAGE_FRENCH][LANG_OFF]					= "Désactivé";
g_locText[LANGUAGE_SPANISH][LANG_OFF] 					= "No";
g_locText[LANGUAGE_GERMAN][LANG_OFF]					= "Aus";
g_locText[LANGUAGE_ITALIAN][LANG_OFF]					= "No";

g_locText[LANGUAGE_ENGLISH][LANG_QUIET] 				= "Quiet";
g_locText[LANGUAGE_FRENCH][LANG_QUIET]					= "Faible";
g_locText[LANGUAGE_SPANISH][LANG_QUIET] 				= "Bajo";
g_locText[LANGUAGE_GERMAN][LANG_QUIET]					= "Leise";
g_locText[LANGUAGE_ITALIAN][LANG_QUIET]					= "Basso";

g_locText[LANGUAGE_ENGLISH][LANG_MEDIUM] 				= "Medium";
g_locText[LANGUAGE_FRENCH][LANG_MEDIUM]					= "Moyen";
g_locText[LANGUAGE_SPANISH][LANG_MEDIUM] 				= "Medio";
g_locText[LANGUAGE_GERMAN][LANG_MEDIUM]					= "Mittel";
g_locText[LANGUAGE_ITALIAN][LANG_MEDIUM]				= "Medio";

g_locText[LANGUAGE_ENGLISH][LANG_LOUD] 					= "Loud";
g_locText[LANGUAGE_FRENCH][LANG_LOUD]					= "Fort";
g_locText[LANGUAGE_SPANISH][LANG_LOUD] 					= "Alto";
g_locText[LANGUAGE_GERMAN][LANG_LOUD]					= "Laut";
g_locText[LANGUAGE_ITALIAN][LANG_LOUD]					= "Alto";

g_locText[LANGUAGE_ENGLISH][LANG_SPEEDOMETER] 			= "Speedometer:";
g_locText[LANGUAGE_FRENCH][LANG_SPEEDOMETER]			= "Vitesse :";
g_locText[LANGUAGE_SPANISH][LANG_SPEEDOMETER] 			= "Velocidad:";
g_locText[LANGUAGE_GERMAN][LANG_SPEEDOMETER]			= "Tachometer:";
g_locText[LANGUAGE_ITALIAN][LANG_SPEEDOMETER]			= "Tachimetro:";

g_locText[LANGUAGE_ENGLISH][LANG_KPH] 					= "km/h";
g_locText[LANGUAGE_FRENCH][LANG_KPH]					= "km/h";
g_locText[LANGUAGE_SPANISH][LANG_KPH] 					= "km/h";
g_locText[LANGUAGE_GERMAN][LANG_KPH]					= "km/h";
g_locText[LANGUAGE_ITALIAN][LANG_KPH]					= "km/h";

g_locText[LANGUAGE_ENGLISH][LANG_MPH] 					= "mph";
g_locText[LANGUAGE_FRENCH][LANG_MPH]					= "mph";
g_locText[LANGUAGE_SPANISH][LANG_MPH] 					= "mph";
g_locText[LANGUAGE_GERMAN][LANG_MPH]					= "mph";
g_locText[LANGUAGE_ITALIAN][LANG_MPH]					= "mph";

g_locText[LANGUAGE_ENGLISH][LANG_LANGUAGE] 				= "Language:";
g_locText[LANGUAGE_FRENCH][LANG_LANGUAGE]				= "Langue :";
g_locText[LANGUAGE_SPANISH][LANG_LANGUAGE] 				= "Idioma:";
g_locText[LANGUAGE_GERMAN][LANG_LANGUAGE]				= "Sprache:";
g_locText[LANGUAGE_ITALIAN][LANG_LANGUAGE]				= "Lingua:";

g_locText[LANGUAGE_ENGLISH][LANG_CURRENT_LANGUAGE]		= "English";
g_locText[LANGUAGE_FRENCH][LANG_CURRENT_LANGUAGE]		= "Français";
g_locText[LANGUAGE_SPANISH][LANG_CURRENT_LANGUAGE]		= "Español";
g_locText[LANGUAGE_GERMAN][LANG_CURRENT_LANGUAGE]		= "Deutsch";
g_locText[LANGUAGE_ITALIAN][LANG_CURRENT_LANGUAGE]		= "Italiano";

g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_NOTICE]			= "Trademark Notice";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_NOTICE]			= "Mentions légales";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_NOTICE]			= "Aviso legal";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_NOTICE]			= "Handelsmarken";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_NOTICE]			= "Nota sui marchi registrati";

g_locText[LANGUAGE_ENGLISH][LANG_NEXT]					= "Next";
g_locText[LANGUAGE_FRENCH][LANG_NEXT]					= "Suivant";
g_locText[LANGUAGE_SPANISH][LANG_NEXT]					= "Siguiente";
g_locText[LANGUAGE_GERMAN][LANG_NEXT]					= "Weiter";
g_locText[LANGUAGE_ITALIAN][LANG_NEXT]					= "Avanti";

g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_NAME_1]			= "Nissan";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_NAME_1]			= "Nissan";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_NAME_1]			= "Nissan";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_NAME_1]			= "Nissan";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_NAME_1]			= "Nissan";

g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_NAME_2]			= "Lamborghini";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_NAME_2]			= "Lamborghini";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_NAME_2]			= "Lamborghini";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_NAME_2]			= "Lamborghini";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_NAME_2]			= "Lamborghini";

g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_NAME_3]			= "Ford Motor";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_NAME_3]			= "Ford Motor";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_NAME_3]			= "Ford Motor";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_NAME_3]			= "Ford Motor";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_NAME_3]			= "Ford Motor";


g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_CONTENT_1]		= "Official Nissan Product. Nissan, Nissan 350Z, Nissan Skyline GT-R and associated symbols, emblems and designs are trademarks of Nissan Motor Co., Ltd. and used under license to Gameloft.";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_CONTENT_1]		= "Official Nissan Product. Nissan, Nissan 350Z, Nissan Skyline GT-R and associated symbols, emblems and designs are trademarks of Nissan Motor Co., Ltd. and used under license to Gameloft.";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_CONTENT_1]		= "Official Nissan Product. Nissan, Nissan 350Z, Nissan Skyline GT-R and associated symbols, emblems and designs are trademarks of Nissan Motor Co., Ltd. and used under license to Gameloft.";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_CONTENT_1]		= "Official Nissan Product. Nissan, Nissan 350Z, Nissan Skyline GT-R and associated symbols, emblems and designs are trademarks of Nissan Motor Co., Ltd. and used under license to Gameloft.";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_CONTENT_1]		= "Official Nissan Product. Nissan, Nissan 350Z, Nissan Skyline GT-R and associated symbols, emblems and designs are trademarks of Nissan Motor Co., Ltd. and used under license to Gameloft.";

g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_CONTENT_2]		= "The trademarks, copyrights and design rights in and associated with Lamborghini and Murciélago, Murciélago R-GT, Gallardo, and Gallardo Police car are used under license from Lamborghini ArtiMarca S.p.A., Italy.";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_CONTENT_2]		= "The trademarks, copyrights and design rights in and associated with Lamborghini and Murciélago, Murciélago R-GT, Gallardo, and Gallardo Police car are used under license from Lamborghini ArtiMarca S.p.A., Italy.";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_CONTENT_2]		= "The trademarks, copyrights and design rights in and associated with Lamborghini and Murciélago, Murciélago R-GT, Gallardo, and Gallardo Police car are used under license from Lamborghini ArtiMarca S.p.A., Italy.";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_CONTENT_2]		= "The trademarks, copyrights and design rights in and associated with Lamborghini and Murciélago, Murciélago R-GT, Gallardo, and Gallardo Police car are used under license from Lamborghini ArtiMarca S.p.A., Italy.";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_CONTENT_2]		= "The trademarks, copyrights and design rights in and associated with Lamborghini and Murciélago, Murciélago R-GT, Gallardo, and Gallardo Police car are used under license from Lamborghini ArtiMarca S.p.A., Italy.";

g_locText[LANGUAGE_ENGLISH][LANG_LEGAL_CONTENT_3]		= "Ford Oval and nameplates are registered trademarks owned and licensed by Ford Motor Company.";
g_locText[LANGUAGE_FRENCH][LANG_LEGAL_CONTENT_3]		= "Ford Oval and nameplates are registered trademarks owned and licensed by Ford Motor Company.";
g_locText[LANGUAGE_SPANISH][LANG_LEGAL_CONTENT_3]		= "Ford Oval and nameplates are registered trademarks owned and licensed by Ford Motor Company.";
g_locText[LANGUAGE_GERMAN][LANG_LEGAL_CONTENT_3]		= "Ford Oval and nameplates are registered trademarks owned and licensed by Ford Motor Company.";
g_locText[LANGUAGE_ITALIAN][LANG_LEGAL_CONTENT_3]		= "Ford Oval and nameplates are registered trademarks owned and licensed by Ford Motor Company.";


g_locText[LANGUAGE_ENGLISH][LANG_RESUME]				= "Resume";
g_locText[LANGUAGE_FRENCH][LANG_RESUME]					= "Reprendre";
g_locText[LANGUAGE_SPANISH][LANG_RESUME]				= "Reanudar";
g_locText[LANGUAGE_GERMAN][LANG_RESUME]					= "Fortfahren";
g_locText[LANGUAGE_ITALIAN][LANG_RESUME]				= "Riprendi";

g_locText[LANGUAGE_ENGLISH][LANG_RESTART]				= "Restart";
g_locText[LANGUAGE_FRENCH][LANG_RESTART]				= "Recommencer";
g_locText[LANGUAGE_SPANISH][LANG_RESTART]				= "Reiniciar";
g_locText[LANGUAGE_GERMAN][LANG_RESTART]				= "Neustart";
g_locText[LANGUAGE_ITALIAN][LANG_RESTART]				= "Riavvia";

g_locText[LANGUAGE_ENGLISH][LANG_EXIT_TO_MENU]			= "Exit to menu";
g_locText[LANGUAGE_FRENCH][LANG_EXIT_TO_MENU]			= "Retourner au menu";
g_locText[LANGUAGE_SPANISH][LANG_EXIT_TO_MENU]			= "Salir al menú";
g_locText[LANGUAGE_GERMAN][LANG_EXIT_TO_MENU]			= "Zurück ins Menü";
g_locText[LANGUAGE_ITALIAN][LANG_EXIT_TO_MENU]			= "Torna al menu";





g_locText[LANGUAGE_ENGLISH][LANG_CONGRATULATION]		= "CONGRATULATIONS";
g_locText[LANGUAGE_FRENCH][LANG_CONGRATULATION]			= "FÉLICITATIONS";
g_locText[LANGUAGE_SPANISH][LANG_CONGRATULATION]		= "ENHORABUENA";
g_locText[LANGUAGE_GERMAN][LANG_CONGRATULATION]			= "GLÜCKWÜNSCHE";
g_locText[LANGUAGE_ITALIAN][LANG_CONGRATULATION]		= "CONGRATULAZIONI";

g_locText[LANGUAGE_ENGLISH][LANG_GET_AWAY]				= "Getaway";
g_locText[LANGUAGE_FRENCH][LANG_GET_AWAY]				= "Fugitif";
g_locText[LANGUAGE_SPANISH][LANG_GET_AWAY]				= "Fugitivo";
g_locText[LANGUAGE_GERMAN][LANG_GET_AWAY]				= "Flucht";
g_locText[LANGUAGE_ITALIAN][LANG_GET_AWAY]				= "Fuga";

g_locText[LANGUAGE_ENGLISH][LANG_EXPEDITE]				= "Expedited";
g_locText[LANGUAGE_FRENCH][LANG_EXPEDITE]				= "Bon débarras";
g_locText[LANGUAGE_SPANISH][LANG_EXPEDITE]				= "Bye bye";
g_locText[LANGUAGE_GERMAN][LANG_EXPEDITE]				= "Bye Bye!";
g_locText[LANGUAGE_ITALIAN][LANG_EXPEDITE]				= "Spedito";

g_locText[LANGUAGE_ENGLISH][LANG_SCRATCH]				= "Scratch";
g_locText[LANGUAGE_FRENCH][LANG_SCRATCH]				= "Rayure";
g_locText[LANGUAGE_SPANISH][LANG_SCRATCH]				= "Arañazo";
g_locText[LANGUAGE_GERMAN][LANG_SCRATCH]				= "Kratzer";
g_locText[LANGUAGE_ITALIAN][LANG_SCRATCH]				= "Graffio";

g_locText[LANGUAGE_ENGLISH][LANG_BUMPING]				= "Bumping";
g_locText[LANGUAGE_FRENCH][LANG_BUMPING]				= "Choc";
g_locText[LANGUAGE_SPANISH][LANG_BUMPING]				= "Choque";
g_locText[LANGUAGE_GERMAN][LANG_BUMPING]				= "Stöße";
g_locText[LANGUAGE_ITALIAN][LANG_BUMPING]				= "Scontro";

g_locText[LANGUAGE_ENGLISH][LANG_SPEED_1]				= "Speed XS";
g_locText[LANGUAGE_FRENCH][LANG_SPEED_1]				= "Vitesse XL";
g_locText[LANGUAGE_SPANISH][LANG_SPEED_1]				= "Turbo";
g_locText[LANGUAGE_GERMAN][LANG_SPEED_1]				= "Hochgeschwindigkeit";
g_locText[LANGUAGE_ITALIAN][LANG_SPEED_1]				= "Ipervelocità";

g_locText[LANGUAGE_ENGLISH][LANG_SPEED_2]				= "Hi Speed XS";
g_locText[LANGUAGE_FRENCH][LANG_SPEED_2]				= "Vitesse XXL";
g_locText[LANGUAGE_SPANISH][LANG_SPEED_2]				= "Superturbo";
g_locText[LANGUAGE_GERMAN][LANG_SPEED_2]				= "Superhochgeschwindigkeit";
g_locText[LANGUAGE_ITALIAN][LANG_SPEED_2]				= "Velocità max";

g_locText[LANGUAGE_ENGLISH][LANG_URBAN_HAVOC]			= "Urban Havoc";
g_locText[LANGUAGE_FRENCH][LANG_URBAN_HAVOC]			= "Chaos urbain";
g_locText[LANGUAGE_SPANISH][LANG_URBAN_HAVOC]			= "Caos urbano";
g_locText[LANGUAGE_GERMAN][LANG_URBAN_HAVOC]			= "Totalschaden";
g_locText[LANGUAGE_ITALIAN][LANG_URBAN_HAVOC]			= "Caos urbano";

g_locText[LANGUAGE_ENGLISH][LANG_RACE]					= "RACE";
g_locText[LANGUAGE_FRENCH][LANG_RACE]					= "COURSE";
g_locText[LANGUAGE_SPANISH][LANG_RACE]					= "CARRERA";
g_locText[LANGUAGE_GERMAN][LANG_RACE]					= "RENNEN";
g_locText[LANGUAGE_ITALIAN][LANG_RACE]					= "CORSA";

g_locText[LANGUAGE_ENGLISH][LANG_TOTAL]					= "TOTAL:";
g_locText[LANGUAGE_FRENCH][LANG_TOTAL]					= "TOTAL : ";
g_locText[LANGUAGE_SPANISH][LANG_TOTAL]					= "TOTAL:";
g_locText[LANGUAGE_GERMAN][LANG_TOTAL]					= "GESAMT:";
g_locText[LANGUAGE_ITALIAN][LANG_TOTAL]					= "TOTALE:";


g_locText[LANGUAGE_ENGLISH][LANG_TUTORIAL_1]			= "Press the Up arrow to activate a boost";
g_locText[LANGUAGE_FRENCH][LANG_TUTORIAL_1]				= "Appuie sur la flèche Haut pour activer un boost.";
g_locText[LANGUAGE_SPANISH][LANG_TUTORIAL_1]			= "Pulsa la flecha Arriba para activar un potenciador";
g_locText[LANGUAGE_GERMAN][LANG_TUTORIAL_1]				= "Drücke den Oben-Pfeil, um einen Boost zu aktivieren.";
g_locText[LANGUAGE_ITALIAN][LANG_TUTORIAL_1]			= "Premi la freccia su per attivare il nitro";

g_locText[LANGUAGE_ENGLISH][LANG_TUTORIAL_2]			= "Press the Left or Right arrow to steer";
g_locText[LANGUAGE_FRENCH][LANG_TUTORIAL_2]				= "Appuie sur la flèche Gauche ou Droite pour tourner.";
g_locText[LANGUAGE_SPANISH][LANG_TUTORIAL_2]			= "Pulsa la flecha Izquierda o Derecha para girar";
g_locText[LANGUAGE_GERMAN][LANG_TUTORIAL_2]				= "Drücke zum Lenken den Links- oder Rechts-Pfeil.";
g_locText[LANGUAGE_ITALIAN][LANG_TUTORIAL_2]			= "Premi le frecce sinistra e destra per sterzare";

g_locText[LANGUAGE_ENGLISH][LANG_TUTORIAL_3]			= "Press the Down arrow to brake";
g_locText[LANGUAGE_FRENCH][LANG_TUTORIAL_3]				= "Appuie sur la flèche Bas pour freiner.";
g_locText[LANGUAGE_SPANISH][LANG_TUTORIAL_3]			= "Pulsa la flecha Abajo para frenar";
g_locText[LANGUAGE_GERMAN][LANG_TUTORIAL_3]				= "Drücke den Unten-Pfeil, um zu bremsen.";
g_locText[LANGUAGE_ITALIAN][LANG_TUTORIAL_3]			= "Premi la freccia giù per frenare";

g_locText[LANGUAGE_ENGLISH][LANG_TUTORIAL_4]			= "Double-press the Left or Right arrow to drift";
g_locText[LANGUAGE_FRENCH][LANG_TUTORIAL_4]				= "Appuie deux fois sur la flèche Gauche ou Droite pour déraper.";
g_locText[LANGUAGE_SPANISH][LANG_TUTORIAL_4]			= "Pulsa dos veces la flecha Izquierda o Derecha para derrapar";
g_locText[LANGUAGE_GERMAN][LANG_TUTORIAL_4]				= "Drücke 2-mal auf den Links- oder Rechts-Pfeil, um zu driften.";
g_locText[LANGUAGE_ITALIAN][LANG_TUTORIAL_4]			= "Premi due volte la freccia sinistra o destra per derapare";

g_locText[LANGUAGE_ENGLISH][LANG_TUTORIAL_5]			= "Press the Right soft key or Esc key to pause";
g_locText[LANGUAGE_FRENCH][LANG_TUTORIAL_5]				= "Appuie sur la touche de sélect. droite ou la touche Échap pour mettre en pause.";
g_locText[LANGUAGE_SPANISH][LANG_TUTORIAL_5]			= "Pulsa la tecla de función Derecha o Esc para pausar el juego";
g_locText[LANGUAGE_GERMAN][LANG_TUTORIAL_5]				= "Drücke den rechten Softkey oder die Escape-Taste, um das Spiel anzuhalten.";
g_locText[LANGUAGE_ITALIAN][LANG_TUTORIAL_5]			= "Premi il tasto funzione destro o Esc per mettere il gioco in pausa";



g_locText[LANGUAGE_ENGLISH][LANG_INFO_AND_SUPPORT]		= "INFO AND SUPPORT";
g_locText[LANGUAGE_FRENCH][LANG_INFO_AND_SUPPORT]		= "INFO ET ASSISTANCE";
g_locText[LANGUAGE_SPANISH][LANG_INFO_AND_SUPPORT]		= "INFO Y AYUDA";
g_locText[LANGUAGE_GERMAN][LANG_INFO_AND_SUPPORT]		= "INFO UND SUPPORT";
g_locText[LANGUAGE_ITALIAN][LANG_INFO_AND_SUPPORT]		= "INFO E ASSISTENZA";

g_locText[LANGUAGE_ENGLISH][LANG_PRODUCER]				= "Producer";
g_locText[LANGUAGE_FRENCH][LANG_PRODUCER]				= "Producteur";
g_locText[LANGUAGE_SPANISH][LANG_PRODUCER]				= "Productor";
g_locText[LANGUAGE_GERMAN][LANG_PRODUCER]				= "Produzent";
g_locText[LANGUAGE_ITALIAN][LANG_PRODUCER]				= "Produttore";

g_locText[LANGUAGE_ENGLISH][LANG_GAME_DESIGNER]			= "Game Design";
g_locText[LANGUAGE_FRENCH][LANG_GAME_DESIGNER]			= "Game design";
g_locText[LANGUAGE_SPANISH][LANG_GAME_DESIGNER]			= "Diseño del juego";
g_locText[LANGUAGE_GERMAN][LANG_GAME_DESIGNER]			= "Spieldesign";
g_locText[LANGUAGE_ITALIAN][LANG_GAME_DESIGNER]			= "Design gioco";

g_locText[LANGUAGE_ENGLISH][LANG_GRAPHIC]				= "Graphics";
g_locText[LANGUAGE_FRENCH][LANG_GRAPHIC]				= "Graphismes";
g_locText[LANGUAGE_SPANISH][LANG_GRAPHIC]				= "Gráficos";
g_locText[LANGUAGE_GERMAN][LANG_GRAPHIC]				= "Grafik";
g_locText[LANGUAGE_ITALIAN][LANG_GRAPHIC]				= "Grafica";

g_locText[LANGUAGE_ENGLISH][LANG_SOUND_SFX]				= "Sound FX & Music";
g_locText[LANGUAGE_FRENCH][LANG_SOUND_SFX]				= "Sons et musique";
g_locText[LANGUAGE_SPANISH][LANG_SOUND_SFX]				= "Efectos de sonido y música";
g_locText[LANGUAGE_GERMAN][LANG_SOUND_SFX]				= "Sounds und Musik";
g_locText[LANGUAGE_ITALIAN][LANG_SOUND_SFX]				= "Audio e musica";

g_locText[LANGUAGE_ENGLISH][LANG_LEAD_PROGRAMMER]		= "Lead Programmer";
g_locText[LANGUAGE_FRENCH][LANG_LEAD_PROGRAMMER]		= "Programmeur principal";
g_locText[LANGUAGE_SPANISH][LANG_LEAD_PROGRAMMER]		= "Jefe de programación";
g_locText[LANGUAGE_GERMAN][LANG_LEAD_PROGRAMMER]		= "Chefprogrammierer";
g_locText[LANGUAGE_ITALIAN][LANG_LEAD_PROGRAMMER]		= "Programmatore capo";

g_locText[LANGUAGE_ENGLISH][LANG_PROGRAMMER]			= "Programmers";
g_locText[LANGUAGE_FRENCH][LANG_PROGRAMMER]				= "Programmeurs";
g_locText[LANGUAGE_SPANISH][LANG_PROGRAMMER]			= "Programación";
g_locText[LANGUAGE_GERMAN][LANG_PROGRAMMER]				= "Programmierer";
g_locText[LANGUAGE_ITALIAN][LANG_PROGRAMMER]			= "Programmatori";

g_locText[LANGUAGE_ENGLISH][LANG_TOOL_PROGRAMMER]		= "Tool Programmer";
g_locText[LANGUAGE_FRENCH][LANG_TOOL_PROGRAMMER]		= "Programmeur outils";
g_locText[LANGUAGE_SPANISH][LANG_TOOL_PROGRAMMER]		= "Programación de herramientas";
g_locText[LANGUAGE_GERMAN][LANG_TOOL_PROGRAMMER]		= "Toolprogrammierung";
g_locText[LANGUAGE_ITALIAN][LANG_TOOL_PROGRAMMER]		= "Pragrammatore strumenti";

g_locText[LANGUAGE_ENGLISH][LANG_QA_MANAGER]			= "QA Manager";
g_locText[LANGUAGE_FRENCH][LANG_QA_MANAGER]				= "Directeur AQ";
g_locText[LANGUAGE_SPANISH][LANG_QA_MANAGER]			= "Dirección de gestión de calidad";
g_locText[LANGUAGE_GERMAN][LANG_QA_MANAGER]				= "Manager Qualitätssicherung";
g_locText[LANGUAGE_ITALIAN][LANG_QA_MANAGER]			= "Responsabile CQ";

g_locText[LANGUAGE_ENGLISH][LANG_QA_LEAD]				= "QA Leads";
g_locText[LANGUAGE_FRENCH][LANG_QA_LEAD]				= "Responsables AQ";
g_locText[LANGUAGE_SPANISH][LANG_QA_LEAD]				= "Jefes de gestión de calidad";
g_locText[LANGUAGE_GERMAN][LANG_QA_LEAD]				= "Verantwortlicher Qualitätssicherung";
g_locText[LANGUAGE_ITALIAN][LANG_QA_LEAD]				= "Capi CQ";

g_locText[LANGUAGE_ENGLISH][LANG_QA]					= "Quality Assurance";
g_locText[LANGUAGE_FRENCH][LANG_QA]						= "Assurance qualité";
g_locText[LANGUAGE_SPANISH][LANG_QA]					= "Gestión de calidad";
g_locText[LANGUAGE_GERMAN][LANG_QA]						= "Qualitätssicherung";
g_locText[LANGUAGE_ITALIAN][LANG_QA]					= "Controllo qualità";

g_locText[LANGUAGE_ENGLISH][LANG_HTML5]					= "HAN HTML5 Port Team";
g_locText[LANGUAGE_FRENCH][LANG_HTML5]					= "Équipe portage HTML5 HAN";
g_locText[LANGUAGE_SPANISH][LANG_HTML5]					= "Equipo de adaptación de HTML5, HAN";
g_locText[LANGUAGE_GERMAN][LANG_HTML5]					= "Team Portierung HAN HTML5";
g_locText[LANGUAGE_ITALIAN][LANG_HTML5]					= "Squadra porting HTML5 HAN";

g_locText[LANGUAGE_ENGLISH][LANG_QA_PRJ_MANAGER]		= "QA Project Manager";
g_locText[LANGUAGE_FRENCH][LANG_QA_PRJ_MANAGER]			= "Manager de projet AQ";
g_locText[LANGUAGE_SPANISH][LANG_QA_PRJ_MANAGER]		= "Mánager de gestión de calidad";
g_locText[LANGUAGE_GERMAN][LANG_QA_PRJ_MANAGER]			= "Projektmanager QS";
g_locText[LANGUAGE_ITALIAN][LANG_QA_PRJ_MANAGER]		= "Responsabile CQ progetto";

g_locText[LANGUAGE_ENGLISH][LANG_QA_TESTER]				= "QA Tester";
g_locText[LANGUAGE_FRENCH][LANG_QA_TESTER]				= "Testeur AQ";
g_locText[LANGUAGE_SPANISH][LANG_QA_TESTER]				= "Test de gestión de calidad";
g_locText[LANGUAGE_GERMAN][LANG_QA_TESTER]				= "Tester QS";
g_locText[LANGUAGE_ITALIAN][LANG_QA_TESTER]				= "Test CQ";


g_locText[LANGUAGE_ENGLISH][LANG_THANKS]				= "Thanks for playing";
g_locText[LANGUAGE_FRENCH][LANG_THANKS]					= "Merci d'avoir joué à";
g_locText[LANGUAGE_SPANISH][LANG_THANKS]				= "Gracias por jugar a";
g_locText[LANGUAGE_GERMAN][LANG_THANKS]					= "Danke fürs Spielen von";
g_locText[LANGUAGE_ITALIAN][LANG_THANKS]				= "Grazie per aver giocato ad";



// ====================================================================================
// ====================================================================================
g_locText[LANGUAGE_ENGLISH][CAR_ROADSTER_ENGINE]		= "V6, 250 hp";
g_locText[LANGUAGE_FRENCH][CAR_ROADSTER_ENGINE]			= "V6, 250 ch";
g_locText[LANGUAGE_SPANISH][CAR_ROADSTER_ENGINE]		= "V6, 250 CV";
g_locText[LANGUAGE_GERMAN][CAR_ROADSTER_ENGINE]			= "V6, 250 PS";
g_locText[LANGUAGE_ITALIAN][CAR_ROADSTER_ENGINE]		= "V6, 250 hp";

g_locText[LANGUAGE_ENGLISH][CAR_EXIGE_ENGINE]			= "V4, 192 hp";
g_locText[LANGUAGE_FRENCH][CAR_EXIGE_ENGINE]			= "V4, 192 ch";
g_locText[LANGUAGE_SPANISH][CAR_EXIGE_ENGINE]			= "V4, 192 CV";
g_locText[LANGUAGE_GERMAN][CAR_EXIGE_ENGINE]			= "V4, 192 PS";
g_locText[LANGUAGE_ITALIAN][CAR_EXIGE_ENGINE]			= "V4, 192 hp";

g_locText[LANGUAGE_ENGLISH][CAR_CORVETTE_ENGINE]		= "V8, 340 hp";
g_locText[LANGUAGE_FRENCH][CAR_CORVETTE_ENGINE]			= "V8, 340 ch";
g_locText[LANGUAGE_SPANISH][CAR_CORVETTE_ENGINE]		= "V8, 340 CV";
g_locText[LANGUAGE_GERMAN][CAR_CORVETTE_ENGINE]			= "V8, 340 PS";
g_locText[LANGUAGE_ITALIAN][CAR_CORVETTE_ENGINE]		= "V8, 340 hp";

g_locText[LANGUAGE_ENGLISH][CAR_SKYLINE_ENGINE]			= "V6, 280 hp";
g_locText[LANGUAGE_FRENCH][CAR_SKYLINE_ENGINE]			= "V6, 280 ch";
g_locText[LANGUAGE_SPANISH][CAR_SKYLINE_ENGINE]			= "V6, 280 CV";
g_locText[LANGUAGE_GERMAN][CAR_SKYLINE_ENGINE]			= "V6, 280 PS";
g_locText[LANGUAGE_ITALIAN][CAR_SKYLINE_ENGINE]			= "V6, 280 hp";

g_locText[LANGUAGE_ENGLISH][CAR_SAGARIS_ENGINE]			= "V6, 400 hp";
g_locText[LANGUAGE_FRENCH][CAR_SAGARIS_ENGINE]			= "V6, 400 ch";
g_locText[LANGUAGE_SPANISH][CAR_SAGARIS_ENGINE]			= "V6, 400 CV";
g_locText[LANGUAGE_GERMAN][CAR_SAGARIS_ENGINE]			= "V6, 400 PS";
g_locText[LANGUAGE_ITALIAN][CAR_SAGARIS_ENGINE]			= "V6, 400 hp";

g_locText[LANGUAGE_ENGLISH][CAR_GALLARDO_ENGINE]		= "V10, 500 hp";
g_locText[LANGUAGE_FRENCH][CAR_GALLARDO_ENGINE]			= "V10, 500 ch";
g_locText[LANGUAGE_SPANISH][CAR_GALLARDO_ENGINE]		= "V10, 500 CV";
g_locText[LANGUAGE_GERMAN][CAR_GALLARDO_ENGINE]			= "V10, 500 PS";
g_locText[LANGUAGE_ITALIAN][CAR_GALLARDO_ENGINE]		= "V10, 500 hp";

g_locText[LANGUAGE_ENGLISH][CAR_FORD_ENGINE]			= "V8, 500 hp";
g_locText[LANGUAGE_FRENCH][CAR_FORD_ENGINE]				= "V8, 500 ch";
g_locText[LANGUAGE_SPANISH][CAR_FORD_ENGINE]			= "V8, 500 CV";
g_locText[LANGUAGE_GERMAN][CAR_FORD_ENGINE]				= "V8, 500 PS";
g_locText[LANGUAGE_ITALIAN][CAR_FORD_ENGINE]			= "V8, 500 hp";

g_locText[LANGUAGE_ENGLISH][CAR_SALEEN_ENGINE]			= "V8, 558 hp";
g_locText[LANGUAGE_FRENCH][CAR_SALEEN_ENGINE]			= "V8, 558 ch";
g_locText[LANGUAGE_SPANISH][CAR_SALEEN_ENGINE]			= "V8, 558 CV";
g_locText[LANGUAGE_GERMAN][CAR_SALEEN_ENGINE]			= "V8, 558 PS";
g_locText[LANGUAGE_ITALIAN][CAR_SALEEN_ENGINE]			= "V8, 558 hp";

g_locText[LANGUAGE_ENGLISH][CAR_ROADSTER_ACCELERATION]	= "6\"50";
g_locText[LANGUAGE_FRENCH][CAR_ROADSTER_ACCELERATION]	= "6\"50";
g_locText[LANGUAGE_SPANISH][CAR_ROADSTER_ACCELERATION]	= "6,50 s";
g_locText[LANGUAGE_GERMAN][CAR_ROADSTER_ACCELERATION]	= "6,5 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_ROADSTER_ACCELERATION]	= "6,50s";

g_locText[LANGUAGE_ENGLISH][CAR_EXIGE_ACCELERATION]		= "5\"20";
g_locText[LANGUAGE_FRENCH][CAR_EXIGE_ACCELERATION]		= "5\"20";
g_locText[LANGUAGE_SPANISH][CAR_EXIGE_ACCELERATION]		= "5,20 s";
g_locText[LANGUAGE_GERMAN][CAR_EXIGE_ACCELERATION]		= "5,2 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_EXIGE_ACCELERATION]		= "5,20s";

g_locText[LANGUAGE_ENGLISH][CAR_CORVETTE_ACCELERATION]	= "5\"00";
g_locText[LANGUAGE_FRENCH][CAR_CORVETTE_ACCELERATION]	= "5\"00";
g_locText[LANGUAGE_SPANISH][CAR_CORVETTE_ACCELERATION]	= "5,00 s";
g_locText[LANGUAGE_GERMAN][CAR_CORVETTE_ACCELERATION]	= "5,0 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_CORVETTE_ACCELERATION]	= "5,00s";

g_locText[LANGUAGE_ENGLISH][CAR_SKYLINE_ACCELERATION]	= "5\"40";
g_locText[LANGUAGE_FRENCH][CAR_SKYLINE_ACCELERATION]	= "5\"40";
g_locText[LANGUAGE_SPANISH][CAR_SKYLINE_ACCELERATION]	= "5,40 s";
g_locText[LANGUAGE_GERMAN][CAR_SKYLINE_ACCELERATION]	= "5,4 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_SKYLINE_ACCELERATION]	= "5,40s";

g_locText[LANGUAGE_ENGLISH][CAR_SAGARIS_ACCELERATION]	= "3\"90";
g_locText[LANGUAGE_FRENCH][CAR_SAGARIS_ACCELERATION]	= "3\"90";
g_locText[LANGUAGE_SPANISH][CAR_SAGARIS_ACCELERATION]	= "3,90 s";
g_locText[LANGUAGE_GERMAN][CAR_SAGARIS_ACCELERATION]	= "3,9 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_SAGARIS_ACCELERATION]	= "3,90s";

g_locText[LANGUAGE_ENGLISH][CAR_GALLARDO_ACCELERATION]	= "4\"20";
g_locText[LANGUAGE_FRENCH][CAR_GALLARDO_ACCELERATION]	= "4\"20";
g_locText[LANGUAGE_SPANISH][CAR_GALLARDO_ACCELERATION]	= "4,20 s";
g_locText[LANGUAGE_GERMAN][CAR_GALLARDO_ACCELERATION]	= "4,2 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_GALLARDO_ACCELERATION]	= "4,20s";

g_locText[LANGUAGE_ENGLISH][CAR_FORD_ACCELERATION]		= "3\"90";
g_locText[LANGUAGE_FRENCH][CAR_FORD_ACCELERATION]		= "3\"90";
g_locText[LANGUAGE_SPANISH][CAR_FORD_ACCELERATION]		= "3,90 s";
g_locText[LANGUAGE_GERMAN][CAR_FORD_ACCELERATION]		= "3,9 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_FORD_ACCELERATION]		= "3,90s";

g_locText[LANGUAGE_ENGLISH][CAR_SALEEN_ACCELERATION]	= "3\"90";
g_locText[LANGUAGE_FRENCH][CAR_SALEEN_ACCELERATION]		= "3\"90";
g_locText[LANGUAGE_SPANISH][CAR_SALEEN_ACCELERATION]	= "3,90 s";
g_locText[LANGUAGE_GERMAN][CAR_SALEEN_ACCELERATION]		= "3,9 Sek.";
g_locText[LANGUAGE_ITALIAN][CAR_SALEEN_ACCELERATION]	= "3,90s";
// ====================================================================================
// ====================================================================================


g_locText[LANGUAGE_ENGLISH][LANG_SHARE_BUTTON]	= "SHARE";
g_locText[LANGUAGE_FRENCH][LANG_SHARE_BUTTON]	= "PARTAGER";
g_locText[LANGUAGE_SPANISH][LANG_SHARE_BUTTON]	= "COMPARTIR";
g_locText[LANGUAGE_GERMAN][LANG_SHARE_BUTTON]	= "TEILEN";
g_locText[LANGUAGE_ITALIAN][LANG_SHARE_BUTTON]	= "CONDIVIDI";

g_locText[LANGUAGE_ENGLISH][LANG_PROGRAMMER_HTML5]	= "Programmer";
g_locText[LANGUAGE_FRENCH][LANG_PROGRAMMER_HTML5]	= "Programmeur";
g_locText[LANGUAGE_SPANISH][LANG_PROGRAMMER_HTML5]	= "Programación";
g_locText[LANGUAGE_GERMAN][LANG_PROGRAMMER_HTML5]	= "Programmierer";
g_locText[LANGUAGE_ITALIAN][LANG_PROGRAMMER_HTML5]	= "Programmatore";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_TITLE]	= "LEADERBOARD";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_TITLE]	= "CLASSEMENT";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_TITLE]	= "CLASIFICACIÓN";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_TITLE]	= "BESTENLISTE";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_TITLE]	= "CLASSIFICA";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_RANK]	= "Rank";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_RANK]	= "Rang";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_RANK]	= "Rango";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_RANK]	= "Rang";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_RANK]	= "Posizione";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_NAME]	= "Name";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_NAME]	= "Nom";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_NAME]	= "Nombre";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_NAME]	= "Name";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_NAME]	= "Nome";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_SCORE]	= "Score";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_SCORE]	= "Score";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_SCORE]	= "Puntos";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_SCORE]	= "Punkte";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_SCORE]	= "Punteggio";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_HIGHSCORE]	= "NEW HIGH SCORE!";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_HIGHSCORE]	= "NOUVEAU RECORD !!";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_HIGHSCORE]	= "¡NUEVO RÉCORD!";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_HIGHSCORE]	= "NEUER REKORD!";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_HIGHSCORE]	= "NUOVO RECORD!";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_NAME_INPUT]	= "INPUT YOUR NAME...";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_NAME_INPUT]		= "SAISIS TON NOM...";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_NAME_INPUT]	= "INTRODUCE TU NOMBRE...";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_NAME_INPUT]		= "GIB DEINEN NAMEN EIN…";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_NAME_INPUT]	= "INSERISCI IL TUO NOME";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_LOADING]	= "Loading...";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_LOADING]	= "Chargement...";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_LOADING]	= "Cargando...";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_LOADING]	= "Lädt…";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_LOADING]	= "Caricamento...";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_SKIP]	= "SKIP";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_SKIP]	= "PASSER";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_SKIP]	= "OMITIR";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_SKIP]	= "ÜBERSPRINGEN";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_SKIP]	= "SALTA";

g_locText[LANGUAGE_ENGLISH][LANG_LEADERBOARD_SUBMIT]	= "SUBMIT";
g_locText[LANGUAGE_FRENCH][LANG_LEADERBOARD_SUBMIT]		= "ENVOYER";
g_locText[LANGUAGE_SPANISH][LANG_LEADERBOARD_SUBMIT]	= "ENVIAR";
g_locText[LANGUAGE_GERMAN][LANG_LEADERBOARD_SUBMIT]		= "ABSENDEN";
g_locText[LANGUAGE_ITALIAN][LANG_LEADERBOARD_SUBMIT]	= "INVIA";

g_locText[LANGUAGE_ENGLISH][LANG_AUDIO_MANAGER]		= "Audio Manager";
g_locText[LANGUAGE_FRENCH][LANG_AUDIO_MANAGER]		= "Manager audio";
g_locText[LANGUAGE_SPANISH][LANG_AUDIO_MANAGER]		= "Mánager de sonido";
g_locText[LANGUAGE_GERMAN][LANG_AUDIO_MANAGER]		= "Manager Sound";
g_locText[LANGUAGE_ITALIAN][LANG_AUDIO_MANAGER]		= "Responsabile audio";

g_locText[LANGUAGE_ENGLISH][LANG_AUDIO_DIRECTOR]	= "Audio Director";
g_locText[LANGUAGE_FRENCH][LANG_AUDIO_DIRECTOR]		= "Directeur audio";
g_locText[LANGUAGE_SPANISH][LANG_AUDIO_DIRECTOR]	= "Dirección de sonido";
g_locText[LANGUAGE_GERMAN][LANG_AUDIO_DIRECTOR]		= "Direktor Sound";
g_locText[LANGUAGE_ITALIAN][LANG_AUDIO_DIRECTOR]	= "Direttore audio";

g_locText[LANGUAGE_ENGLISH][LANG_SOUNDFX_MUSIC]		= "Sound FX & Music";
g_locText[LANGUAGE_FRENCH][LANG_SOUNDFX_MUSIC]		= "SFX & Musique";
g_locText[LANGUAGE_SPANISH][LANG_SOUNDFX_MUSIC]		= "Música y efectos";
g_locText[LANGUAGE_GERMAN][LANG_SOUNDFX_MUSIC]		= "Soundeffekte und Musik";
g_locText[LANGUAGE_ITALIAN][LANG_SOUNDFX_MUSIC]		= "Effetti sonori e musiche";

g_locText[LANGUAGE_ENGLISH][LANG_ADDITIONAL_SOUND_DESIGN]		= "Additional Sound Design";
g_locText[LANGUAGE_FRENCH][LANG_ADDITIONAL_SOUND_DESIGN]		= "Sound design additionnel";
g_locText[LANGUAGE_SPANISH][LANG_ADDITIONAL_SOUND_DESIGN]		= "Diseño de sonido adicional";
g_locText[LANGUAGE_GERMAN][LANG_ADDITIONAL_SOUND_DESIGN]		= "Zusätzliches Sounddesign";
g_locText[LANGUAGE_ITALIAN][LANG_ADDITIONAL_SOUND_DESIGN]		= "Design audio aggiuntivo";

g_locText[LANGUAGE_ENGLISH][LANG_BIZ_TEAM]		= "Business Team";
g_locText[LANGUAGE_FRENCH][LANG_BIZ_TEAM]		= "Équipe commerciale";
g_locText[LANGUAGE_SPANISH][LANG_BIZ_TEAM]		= "Equipo de negocio";
g_locText[LANGUAGE_GERMAN][LANG_BIZ_TEAM]		= "Team Business";
g_locText[LANGUAGE_ITALIAN][LANG_BIZ_TEAM]		= "Squadra business";