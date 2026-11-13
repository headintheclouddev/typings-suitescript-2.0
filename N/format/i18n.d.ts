/** The N/format/i18n module has methods that allows for formatting of strings in international context and for formatting of numbers to currency or number strings. */

/**
 * The object that formats the number to currency string
 * @since 2019.2
 */
interface CurrencyFormatter {
  /**
   * Describes the currency code.
   * @since 2019.2
   */
  readonly currency: string;
  /**
   * Describes the symbol of the currency code.
   * @since 2019.2
   */
  readonly symbol: string;
  /**
   * Contains the format.NumberFormatter object derived from format.CurrencyFormatter with the same number formatting parameters without currency symbol.
   * @since 2019.2
   */
  readonly numberFormatter: string;
  /**
   * Formats the number to the currency string. Costs 10 governance units.
   * @governance 10 units
   * @since 2019.2
   */
  format(options: { number: number }): string;
}

/**
 * Object that formats number to string.
 * @since 2019.2
 */
interface NumberFormatter {
  /**
   * Indicates the group separator.
   * @since 2019.2
   */
  readonly groupSeparator: string;
  /**
   * Indicates the decimal separator.
   * @since 2019.2
   */
  readonly decimalSeparator: string;
  /**
   * Indicates the precision.
   * @since 2019.2
   */
  readonly precision: number;
  /** Indicates the negative number format. */
  negativeNumberFormat: NegativeNumberFormat;
  /**
   * Formats number to the number string. Costs 10 governance units.
   * @governance 10 units
   * @since 2019.2
   */
  format(options: { number: number }): string;
}

/**
 * The object that formats the phone number to string.
 * @since 2020.2
 */
interface PhoneNumberFormatter {
  /**
   * @governance none
   * @since 2020.2
   */
  format(options: { number: string }): string;
}

/**
 * The object that parses the string with the phone number to an object.
 * @since 2020.2
 */
interface PhoneNumberParser {
  /**
   * @governance none
   * @since 2020.2
   */
  parse(options: { number: string }): { countryCode: string, extension: string, nationalNumber: string, numberOfLeadingZeroes: number, carrierCode: string, rawInput: string };
}

/**
 * Spells out positive and negative number as a string in a specific language. For more information, see Codes for the Representation of Names of Languages.
 * @governance none
 * @since 2019.1
 */
export function spellOut(options: SpellOutOptions): string;

/**
 * Create format.CurrencyFormatter object to format numbers into currency strings. Costs 10 governance units.
 * @governance 10 units
 * @since 2019.2
 */
export function getCurrencyFormatter(options: GetCurrencyFormatterOptions): CurrencyFormatter;

/**
 * Create format.NumberFormatter object to format numbers into strings. Costs 10 governance units.
 * @governance 10 units
 * @since 2019.2
 */
export function getNumberFormatter(options?: GetNumberFormatterOptions): NumberFormatter;

/**
 * @throws {SuiteScriptError} SSS_INVALID_FORMAT_TYPE if an invalid value is specified for the formatType option.
 * @governance 10 units
 * @since 2019.2
 */
export function getPhoneNumberFormatter(options: { formatType: PhoneNumberFormatType }): PhoneNumberFormatter;

/**
 * @throws {SuiteScriptError} SSS_INVALID_COUNTRY_ID if an invalid value is specified for the defaultCountry parameter.
 * @governance 10 units
 * @since 2019.2
 */
export function getPhoneNumberParser(options: { defaultCountry: Country }): PhoneNumberParser;

interface GetCurrencyFormatterOptions {
  /** Code of the currency that is used by formatter. */
  currency: string;
}

interface GetNumberFormatterOptions {
  groupSeparator?:       string;
  decimalSeparator?:     string;
  precision?:            number;
  negativeNumberFormat?: NegativeNumberFormat;
}

interface SpellOutOptions {
  /** The number to be spelled out in a string. */
  number: number;
  /**
   * The language code that specifies the string’s language. ISO 639–1 alpha-2 language codes are supported.
   *
   * The language specified in this parameter is not related to the language specified for a NetSuite account.
   * You can specify any language for this parameter; you do not have to specify a NetSuite supported language.
   *
   * For more information, see Codes for the Representation of Names of Languages.
   */
  locale: string;
}

/** @since 2019.1 */
export enum Currency { // Note The currency values depend on the company. Examples of currency value include:
  USD,
  CAD,
  EUR,
  GBP,
  JPY
}

/** @since 2019.2 */
export enum NegativeNumberFormat {
  BRACKETS = "BRACKETS",
  MINUS = "MINUS"
}

/** @since 2020.2 */
export enum PhoneNumberFormatType {
  E164 = "E164",
  INTERNATIONAL = "INTERNATIONAL",
  NATIONAL = "NATIONAL",
  RFC3966 = "RFC3966"
}

/** @since 2020.2 */
export enum Country { // As of 17 August 2020
  AFGHANISTAN = "AFGHANISTAN",
  ALAND_ISLANDS = "ALAND_ISLANDS",
  ALBANIA = "ALBANIA",
  ALGERIA = "ALGERIA",
  AMERICAN_SAMOA = "AMERICAN_SAMOA",
  ANDORRA = "ANDORRA",
  ANGOLA = "ANGOLA",
  ANGUILLA = "ANGUILLA",
  ANTARCTICA = "ANTARCTICA",
  ANTIGUA_AND_BARBUDA = "ANTIGUA_AND_BARBUDA",
  ARGENTINA = "ARGENTINA",
  ARMENIA = "ARMENIA",
  ARUBA = "ARUBA",
  AUSTRALIA = "AUSTRALIA",
  AUSTRIA = "AUSTRIA",
  AZERBAIJAN = "AZERBAIJAN",
  BAHAMAS = "BAHAMAS",
  BAHRAIN = "BAHRAIN",
  BANGLADESH = "BANGLADESH",
  BARBADOS = "BARBADOS",
  BELARUS = "BELARUS",
  BELGIUM = "BELGIUM",
  BELIZE = "BELIZE",
  BENIN = "BENIN",
  BERMUDA = "BERMUDA",
  BHUTAN = "BHUTAN",
  BOLIVIA = "BOLIVIA",
  BONAIRE = "BONAIRE",
  BOSNIA_AND_HERZEGOVINA = "BOSNIA_AND_HERZEGOVINA",
  BOTSWANA = "BOTSWANA",
  BOUVET_ISLAND = "BOUVET_ISLAND",
  BRAZIL = "BRAZIL",
  BRITISH_INDIAN_OCEAN_TERRITORY = "BRITISH_INDIAN_OCEAN_TERRITORY",
  BRUNEI_DARUSSALAM = "BRUNEI_DARUSSALAM",
  BULGARIA = "BULGARIA",
  BURKINAFASO = "BURKINAFASO",
  BURUNDI = "BURUNDI",
  CAMBODIA = "CAMBODIA",
  CAMEROON = "CAMEROON",
  CANADA = "CANADA",
  CANARY_ISLANDS = "CANARY_ISLANDS",
  CAPEVERDE = "CAPEVERDE",
  CAYMAN_ISLANDS = "CAYMAN_ISLANDS",
  CENTRAL_AFRICAN_REPUBLIC = "CENTRAL_AFRICAN_REPUBLIC",
  CEUTA_AND_MELILLA = "CEUTA_AND_MELILLA",
  CHAD = "CHAD",
  CHILE = "CHILE",
  CHINA = "CHINA",
  CHRISTMAS_ISLAND = "CHRISTMAS_ISLAND",
  COCOS_ISLANDS = "COCOS_ISLANDS",
  COLOMBIA = "COLOMBIA",
  COMOROS = "COMOROS",
  COOK_ISLANDS = "COOK_ISLANDS",
  COSTARICA = "COSTARICA",
  CROATIA = "CROATIA",
  CUBA = "CUBA",
  CURACAO = "CURACAO",
  CYPRUS = "CYPRUS",
  CZECH_REPUBLIC = "CZECH_REPUBLIC",
  DENMARK = "DENMARK",
  DJIBOUTI = "DJIBOUTI",
  DOMINICA = "DOMINICA",
  DOMINICAN_REPUBLIC = "DOMINICAN_REPUBLIC",
  EASTTIMOR = "EASTTIMOR",
  ECUADOR = "ECUADOR",
  EGYPT = "EGYPT",
  ELSALVADOR = "ELSALVADOR",
  EQUATORIAL_GUINEA = "EQUATORIAL_GUINEA",
  ERITREA = "ERITREA",
  ESTONIA = "ESTONIA",
  ETHIOPIA = "ETHIOPIA",
  FALKLAND_ISLANDS = "FALKLAND_ISLANDS",
  FAROE_ISLANDS = "FAROE_ISLANDS",
  FIJI = "FIJI",
  FINLAND = "FINLAND",
  FRANCE = "FRANCE",
  FRENCHGUIANA = "FRENCHGUIANA",
  FRENCH_POLYNESIA = "FRENCH_POLYNESIA",
  FRENCH_SOUTHERN_TERRITORIES = "FRENCH_SOUTHERN_TERRITORIES",
  GABON = "GABON",
  GAMBIA = "GAMBIA",
  GEORGIA = "GEORGIA",
  GERMANY = "GERMANY",
  GHANA = "GHANA",
  GIBRALTAR = "GIBRALTAR",
  GREECE = "GREECE",
  GREENLAND = "GREENLAND",
  GRENADA = "GRENADA",
  GUADELOUPE = "GUADELOUPE",
  GUAM = "GUAM",
  GUATEMALA = "GUATEMALA",
  GUERNSEY = "GUERNSEY",
  GUINEA = "GUINEA",
  GUINEA_BISSAU = "GUINEA_BISSAU",
  GUYANA = "GUYANA",
  HAITI = "HAITI",
  HEARD_AND_MCDONALD_ISLANDS = "HEARD_AND_MCDONALD_ISLANDS",
  HONDURAS = "HONDURAS",
  HONGKONG = "HONGKONG",
  HUNGARY = "HUNGARY",
  ICELAND = "ICELAND",
  INDIA = "INDIA",
  INDONESIA = "INDONESIA",
  IRAN = "IRAN",
  IRAQ = "IRAQ",
  IRELAND = "IRELAND",
  ISLEOFMAN = "ISLEOFMAN",
  ISRAEL = "ISRAEL",
  ITALY = "ITALY",
  JAMAICA = "JAMAICA",
  JAPAN = "JAPAN",
  JERSEY = "JERSEY",
  JORDAN = "JORDAN",
  KAZAKHSTAN = "KAZAKHSTAN",
  KENYA = "KENYA",
  KIRIBATI = "KIRIBATI",
  KOREA_NORTH = "KOREA_NORTH",
  KOREA_SOUTH = "KOREA_SOUTH",
  KOSOVO = "KOSOVO",
  KUWAIT = "KUWAIT",
  KYRGYZSTAN = "KYRGYZSTAN",
  LAOS = "LAOS",
  LATVIA = "LATVIA",
  LEBANON = "LEBANON",
  LESOTHO = "LESOTHO",
  LIBERIA = "LIBERIA",
  LIBYA = "LIBYA",
  LIECHTENSTEIN = "LIECHTENSTEIN",
  LITHUANIA = "LITHUANIA",
  LUXEMBOURG = "LUXEMBOURG",
  MACAU = "MACAU",
  MACEDONIA = "MACEDONIA",
  MADAGASCAR = "MADAGASCAR",
  MALAWI = "MALAWI",
  MALAYSIA = "MALAYSIA",
  MALDIVES = "MALDIVES",
  MALI = "MALI",
  MALTA = "MALTA",
  MARSHALL_ISLANDS = "MARSHALL_ISLANDS",
  MARTINIQUE = "MARTINIQUE",
  MAURITANIA = "MAURITANIA",
  MAURITIUS = "MAURITIUS",
  MAYOTTE = "MAYOTTE",
  MEXICO = "MEXICO",
  MICRONESIA = "MICRONESIA",
  MOLDOVA = "MOLDOVA",
  MONACO = "MONACO",
  MONGOLIA = "MONGOLIA",
  MONTENEGRO = "MONTENEGRO",
  MONTSERRAT = "MONTSERRAT",
  MOROCCO = "MOROCCO",
  MOZAMBIQUE = "MOZAMBIQUE",
  MYANMAR = "MYANMAR",
  NAMIBIA = "NAMIBIA",
  NAURU = "NAURU",
  NEPAL = "NEPAL",
  NETHERLANDS = "NETHERLANDS",
  NEWCALEDONIA = "NEWCALEDONIA",
  NEWZEALAND = "NEWZEALAND",
  NICARAGUA = "NICARAGUA",
  NIGER = "NIGER",
  NIGERIA = "NIGERIA",
  NIUE = "NIUE",
  NORFOLKISLAND = "NORFOLKISLAND",
  NORTHERN_MARIANA_ISLANDS = "NORTHERN_MARIANA_ISLANDS",
  NORWAY = "NORWAY",
  OMAN = "OMAN",
  PAKISTAN = "PAKISTAN",
  PALAU = "PALAU",
  PANAMA = "PANAMA",
  PAPUA_NEW_GUINEA = "PAPUA_NEW_GUINEA",
  PARAGUAY = "PARAGUAY",
  PERU = "PERU",
  PHILIPPINES = "PHILIPPINES",
  PITCAIRN_ISLAND = "PITCAIRN_ISLAND",
  POLAND = "POLAND",
  PORTUGAL = "PORTUGAL",
  PUERTORICO = "PUERTORICO",
  QATAR = "QATAR",
  REPUBLIC_OF_CONGO = "REPUBLIC_OF_CONGO",
  REUNION_ISLAND = "REUNION_ISLAND",
  ROMANIA = "ROMANIA",
  RUSSIAN_FEDERATION = "RUSSIAN_FEDERATION",
  RWANDA = "RWANDA",
  SAINTLUCIA = "SAINTLUCIA",
  SAINTMARTIN = "SAINTMARTIN",
  SAINT_BARTHELEMY = "SAINT_BARTHELEMY",
  SAINT_HELENA = "SAINT_HELENA",
  SAINT_KITTS_AND_NEVIS = "SAINT_KITTS_AND_NEVIS",
  SAINT_VINCENT_AND_THE_GRENADINES = "SAINT_VINCENT_AND_THE_GRENADINES",
  SAMOA = "SAMOA",
  SANMARINO = "SANMARINO",
  SAOTOME_AND_PRINCIPE = "SAOTOME_AND_PRINCIPE",
  SAUDI_ARABIA = "SAUDI_ARABIA",
  SENEGAL = "SENEGAL",
  SERBIA = "SERBIA",
  SEYCHELLES = "SEYCHELLES",
  SIERRALEONE = "SIERRALEONE",
  SINGAPORE = "SINGAPORE",
  SINT_MAARTEN = "SINT_MAARTEN",
  SLOVAK_REPUBLIC = "SLOVAK_REPUBLIC",
  SLOVENIA = "SLOVENIA",
  SOLOMON_ISLANDS = "SOLOMON_ISLANDS",
  SOMALIA = "SOMALIA",
  SOUTHAFRICA = "SOUTHAFRICA",
  SOUTHSUDAN = "SOUTHSUDAN",
  SOUTH_GEORGIA = "SOUTH_GEORGIA",
  SPAIN = "SPAIN",
  SRILANKA = "SRILANKA",
  STATE_OF_PALESTINE = "STATE_OF_PALESTINE",
  ST_PIERREANDMIQUELON = "ST_PIERREANDMIQUELON",
  SUDAN = "SUDAN",
  SURINAME = "SURINAME",
  SVALBARD_AND_JANMAYEN_ISLANDS = "SVALBARD_AND_JANMAYEN_ISLANDS",
  SWAZILAND = "SWAZILAND",
  SWEDEN = "SWEDEN",
  SWITZERLAND = "SWITZERLAND",
  SYRIAN_ARAB_REPUBLIC = "SYRIAN_ARAB_REPUBLIC",
  TAIWAN = "TAIWAN",
  TAJIKISTAN = "TAJIKISTAN",
  TANZANIA = "TANZANIA",
  THAILAND = "THAILAND",
  TOGO = "TOGO",
  TOKELAU = "TOKELAU",
  TONGA = "TONGA",
  TRINIDADANDTOBAGO = "TRINIDADANDTOBAGO",
  TUNISIA = "TUNISIA",
  TURKEY = "TURKEY",
  TURKMENISTAN = "TURKMENISTAN",
  TURKSAND_CAICOS_ISLANDS = "TURKSAND_CAICOS_ISLANDS",
  TUVALU = "TUVALU",
  UGANDA = "UGANDA",
  UKRAINE = "UKRAINE",
  UNITEDSTATES = "UNITEDSTATES",
  UNITED_ARAB_EMIRATES = "UNITED_ARAB_EMIRATES",
  UNITED_KINGDOM = "UNITED_KINGDOM",
  URUGUAY = "URUGUAY",
  US_MINOR_OUTLYING_ISLANDS = "US_MINOR_OUTLYING_ISLANDS",
  UZBEKISTAN = "UZBEKISTAN",
  VANUATU = "VANUATU",
  VATICAN = "VATICAN",
  VENEZUELA = "VENEZUELA",
  VIETNAM = "VIETNAM",
  VIRGINISLANDS_UK = "VIRGINISLANDS_UK",
  VIRGINISLANDS_USA = "VIRGINISLANDS_USA",
  WALLIS_AND_FUTUNA = "WALLIS_AND_FUTUNA",
  WESTERN_SAHARA = "WESTERN_SAHARA",
  YEMEN = "YEMEN",
  ZAMBIA = "ZAMBIA",
  ZIMBABWE = "ZIMBABWE"
}
