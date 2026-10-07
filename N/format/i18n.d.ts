/**
 * The N/format/i18n module has methods that allows for formatting of strings in international context and for formatting of numbers to currency or number strings.
 *
 * Supported script types: Client and server scripts.
 */

/**
 * The object that formats the number to currency string. Use format.getCurrencyFormatter(options) to create this object.
 * @since 2019.2
 */
interface CurrencyFormatter {
  /**
   * Describes the currency code.
   * @since 2019.2
   */
  readonly currency: string;
  /**
   * The locale of the currency formatter.
   * @since 2021.1
   */
  readonly locale: string;
  /**
   * Describes the symbol of the currency code.
   * @since 2019.2
   */
  readonly symbol: string;
  /**
   * Contains the format.NumberFormatter object derived from format.CurrencyFormatter with the same number formatting parameters without currency symbol.
   * Note: Oracle's property page lists the type as string, but its description says it is a format.NumberFormatter object.
   * @since 2019.2
   */
  readonly numberFormatter: NumberFormatter;
  /**
   * Formats the number to the currency string.
   * @returns The formatted currency string.
   * @governance 10 units
   * @since 2019.2
   */
  format(options: FormatNumberOptions): string;
}

/**
 * The object that formats number to string. Use format.getNumberFormatter(options) to create this object.
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
   * The locale of the number formatter.
   * @since 2021.1
   */
  readonly locale: string;
  /**
   * Indicates the precision.
   * @since 2019.2
   */
  readonly precision: number;
  /**
   * Indicates the negative number format.
   * Note: Not listed in Oracle's NumberFormatter members; mirrors the format.getNumberFormatter(options) parameter.
   */
  readonly negativeNumberFormat: NegativeNumberFormat;
  /**
   * Formats number to the number string.
   * @returns The formatted number string.
   * @governance 10 units
   * @since 2019.2
   */
  format(options: FormatNumberOptions): string;
}

interface FormatNumberOptions {
  /** The number to be formatted. */
  number: number;
}

/** A phone number object, as returned by PhoneNumberParser.parse(options). */
interface PhoneNumber {
  /** The country calling code, for example '1' or '420'. */
  countryCode: string;
  /** The phone number extension. */
  extension: string;
  /** The national (significant) number. */
  nationalNumber: string;
  /** The number of leading zeros. */
  numberOfLeadingZeros: number;
  /**
   * @deprecated Misspelled; not documented by Oracle. Use numberOfLeadingZeros.
   */
  numberOfLeadingZeroes?: number;
  /** The carrier code. */
  carrierCode: string;
  /** The raw input string that was parsed. */
  rawInput: string;
}

/**
 * The object that formats the phone number to string. Use format.getPhoneNumberFormatter(options) to create this object.
 * @since 2020.2
 */
interface PhoneNumberFormatter {
  /**
   * Formats phone number object to string.
   * @returns The formatted phone number.
   * @governance none
   * @since 2020.2
   */
  format(options: {
    /** The phone number to be formatted, as returned by PhoneNumberParser.parse(options). */
    number: PhoneNumber;
  }): string;
}

/**
 * The object that parses the string with the phone number to an object. Use format.getPhoneNumberParser(options) to create this object.
 * @since 2020.2
 */
interface PhoneNumberParser {
  /**
   * Parses the string containing the phone number and returns the phone number object.
   * If the input string does not contain the country code, the defaultCountry given to format.getPhoneNumberParser(options) is used.
   * @returns The phone number object.
   * @governance none
   * @since 2020.2
   */
  parse(options: {
    /** The string to be parsed. */
    number: string;
  }): PhoneNumber;
}

/**
 * Spells out positive and negative number as a string in a specific language. For more information, see Codes for the Representation of Names of Languages.
 * @returns The number spelled out as a string.
 * @governance none
 * @since 2019.1
 */
export function spellOut(options: SpellOutOptions): string;

/**
 * Creates a format.CurrencyFormatter object to format numbers into currency strings.
 * options.currency and options.locale are mutually exclusive; specify only one of them.
 * @returns The currency formatter.
 * @governance 10 units
 * @since 2019.2
 */
export function getCurrencyFormatter(options: GetCurrencyFormatterOptions): CurrencyFormatter;

/**
 * Creates a format.NumberFormatter object to format numbers into strings.
 * If no options are given, the default number formatter object is returned.
 * @returns The number formatter.
 * @governance 10 units
 * @since 2019.2
 */
export function getNumberFormatter(options?: GetNumberFormatterOptions): NumberFormatter;

/**
 * Creates a format.PhoneNumberFormatter object to format phone numbers to strings.
 * If no format type is given, the default formatter is returned (international format, for example '+420 602 547 854 ext. 154').
 * Note: Oracle's parameter table marks options.formatType as required, but Oracle's own samples call
 * getPhoneNumberFormatter() and getPhoneNumberFormatter({}), so options and formatType are typed as optional.
 * Note: Oracle's Since row says 2019.2; the formatType parameter is listed as 2020.2.
 * @returns The phone number formatter.
 * @throws {SuiteScriptError} SSS_INVALID_FORMAT_TYPE if an invalid value is specified for the formatType option.
 * @governance 10 units
 * @since 2019.2
 */
export function getPhoneNumberFormatter(options?: {
  /** Phone number format type. Use the format.PhoneNumberFormatType enum to set this value. */
  formatType?: PhoneNumberFormatType;
}): PhoneNumberFormatter;

/**
 * Creates a format.PhoneNumberParser object to parse phone numbers from strings.
 * Note: Oracle's Since row says 2019.2; the defaultCountry parameter is listed as 2020.2.
 * @returns The phone number parser.
 * @throws {SuiteScriptError} SSS_INVALID_COUNTRY_ID if an invalid value is specified for the defaultCountry parameter.
 * @governance 10 units
 * @since 2019.2
 */
export function getPhoneNumberParser(options: {
  /**
   * Parser point of reference. Specify this value if the phone number is not in international format.
   * If a value is not specified, the company country is used.
   */
  defaultCountry?: Country;
}): PhoneNumberParser;

/** options.currency and options.locale are mutually exclusive; specify exactly one of them. */
type GetCurrencyFormatterOptions = {
  /** Code of the currency that is used by formatter. Use the format.Currency enum to set this value. */
  currency: Currency | string;
  locale?: never;
} | {
  /**
   * Code of the locale that is used by formatter, for example 'en_US'.
   * @since 2021.1
   */
  locale: string;
  currency?: never;
};

interface GetNumberFormatterOptions {
  /** Indicates the group separator. */
  groupSeparator?: string;
  /** Indicates the decimal separator. */
  decimalSeparator?: string;
  /** Indicates the precision. */
  precision?: number;
  /** Indicates the negative number format. */
  negativeNumberFormat?: NegativeNumberFormat;
  /**
   * Indicates the locale from which default settings are determined.
   * The other format.getNumberFormatter(options) parameters can override this parameter.
   * @since 2021.1
   */
  locale?: string;
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

/**
 * Holds the values for the currency code. Used to set the value of the options.currency parameter of format.getCurrencyFormatter(options).
 * Note: Currency values depend on the company.
 * @since 2019.1
 */
export enum Currency {
  USD,
  CAD,
  EUR,
  GBP,
  JPY,
  AED,
  CZK,
  EEK,
  IDR,
  INR,
  UYU
}

/**
 * Holds the values for the negative number format. Used to set the options.negativeNumberFormat parameter of format.getNumberFormatter(options).
 * @since 2019.2
 */
export enum NegativeNumberFormat {
  BRACKETS,
  MINUS
}

/**
 * Holds the values for the phone number format type. Used to set the options.formatType parameter of format.getPhoneNumberFormatter(options).
 * @since 2020.2
 */
export enum PhoneNumberFormatType {
  E164,
  INTERNATIONAL,
  NATIONAL,
  RFC3966
}

/**
 * Holds the values for the countries. Used to set the options.defaultCountry parameter of format.getPhoneNumberParser(options).
 * Note: Oracle's values table spells several keys differently (AMERICAN_SOMOA, BOSIA_AND_HERZEGOVINA, GIBRALTER, NORFOLKISAND,
 * SAINT_VICENT_AND_THE_GRENADINES, SENGAL). Which spelling exists at runtime cannot be verified from the docs, so only the
 * correctly spelled keys are declared.
 * @since 2020.2
 */
export enum Country {
  AFGHANISTAN,
  ALAND_ISLANDS,
  ALBANIA,
  ALGERIA,
  AMERICAN_SAMOA,
  ANDORRA,
  ANGOLA,
  ANGUILLA,
  ANTARCTICA,
  ANTIGUA_AND_BARBUDA,
  ARGENTINA,
  ARMENIA,
  ARUBA,
  AUSTRALIA,
  AUSTRIA,
  AZERBAIJAN,
  BAHAMAS,
  BAHRAIN,
  BANGLADESH,
  BARBADOS,
  BELARUS,
  BELGIUM,
  BELIZE,
  BENIN,
  BERMUDA,
  BHUTAN,
  BOLIVIA,
  BONAIRE,
  BOSNIA_AND_HERZEGOVINA,
  BOTSWANA,
  BOUVET_ISLAND,
  BRAZIL,
  BRITISH_INDIAN_OCEAN_TERRITORY,
  BRUNEI_DARUSSALAM,
  BULGARIA,
  BURKINAFASO,
  BURUNDI,
  CAMBODIA,
  CAMEROON,
  CANADA,
  CANARY_ISLANDS,
  CAPEVERDE,
  CAYMAN_ISLANDS,
  CENTRAL_AFRICAN_REPUBLIC,
  CEUTA_AND_MELILLA,
  CHAD,
  CHILE,
  CHINA,
  CHRISTMAS_ISLAND,
  COCOS_ISLANDS,
  COLOMBIA,
  COMOROS,
  COOK_ISLANDS,
  COSTARICA,
  CROATIA,
  CUBA,
  CURACAO,
  CYPRUS,
  CZECH_REPUBLIC,
  DENMARK,
  /** Listed in Oracle's format.Country values table. */
  DEMOCRATIC_REPUBLIC_OF_CONGO,
  DJIBOUTI,
  DOMINICA,
  DOMINICAN_REPUBLIC,
  EASTTIMOR,
  ECUADOR,
  EGYPT,
  ELSALVADOR,
  EQUATORIAL_GUINEA,
  ERITREA,
  ESTONIA,
  ETHIOPIA,
  FALKLAND_ISLANDS,
  FAROE_ISLANDS,
  FIJI,
  FINLAND,
  FRANCE,
  FRENCHGUIANA,
  FRENCH_POLYNESIA,
  FRENCH_SOUTHERN_TERRITORIES,
  GABON,
  GAMBIA,
  GEORGIA,
  GERMANY,
  GHANA,
  GIBRALTAR,
  GREECE,
  GREENLAND,
  GRENADA,
  GUADELOUPE,
  GUAM,
  GUATEMALA,
  GUERNSEY,
  GUINEA,
  GUINEA_BISSAU,
  GUYANA,
  HAITI,
  HEARD_AND_MCDONALD_ISLANDS,
  HONDURAS,
  HONGKONG,
  HUNGARY,
  ICELAND,
  INDIA,
  INDONESIA,
  IRAN,
  IRAQ,
  IRELAND,
  ISLEOFMAN,
  ISRAEL,
  ITALY,
  JAMAICA,
  JAPAN,
  JERSEY,
  JORDAN,
  KAZAKHSTAN,
  KENYA,
  KIRIBATI,
  KOREA_NORTH,
  KOREA_SOUTH,
  KOSOVO,
  KUWAIT,
  KYRGYZSTAN,
  LAOS,
  LATVIA,
  LEBANON,
  LESOTHO,
  LIBERIA,
  LIBYA,
  LIECHTENSTEIN,
  LITHUANIA,
  LUXEMBOURG,
  MACAU,
  MACEDONIA,
  MADAGASCAR,
  MALAWI,
  MALAYSIA,
  MALDIVES,
  MALI,
  MALTA,
  MARSHALL_ISLANDS,
  MARTINIQUE,
  MAURITANIA,
  MAURITIUS,
  MAYOTTE,
  MEXICO,
  MICRONESIA,
  MOLDOVA,
  MONACO,
  MONGOLIA,
  MONTENEGRO,
  MONTSERRAT,
  MOROCCO,
  MOZAMBIQUE,
  MYANMAR,
  NAMIBIA,
  NAURU,
  NEPAL,
  NETHERLANDS,
  /** Listed in Oracle's format.Country values table. */
  NETHERLANDS_ANTILLES,
  NEWCALEDONIA,
  NEWZEALAND,
  NICARAGUA,
  NIGER,
  NIGERIA,
  NIUE,
  NORFOLKISLAND,
  NORTHERN_MARIANA_ISLANDS,
  NORWAY,
  OMAN,
  PAKISTAN,
  PALAU,
  PANAMA,
  PAPUA_NEW_GUINEA,
  PARAGUAY,
  PERU,
  PHILIPPINES,
  PITCAIRN_ISLAND,
  POLAND,
  PORTUGAL,
  PUERTORICO,
  QATAR,
  REPUBLIC_OF_CONGO,
  REUNION_ISLAND,
  ROMANIA,
  RUSSIAN_FEDERATION,
  RWANDA,
  SAINTLUCIA,
  SAINTMARTIN,
  SAINT_BARTHELEMY,
  SAINT_HELENA,
  SAINT_KITTS_AND_NEVIS,
  SAINT_VINCENT_AND_THE_GRENADINES,
  SAMOA,
  SANMARINO,
  SAOTOME_AND_PRINCIPE,
  SAUDI_ARABIA,
  SENEGAL,
  SERBIA,
  SEYCHELLES,
  SIERRALEONE,
  SINGAPORE,
  SINT_MAARTEN,
  SLOVAK_REPUBLIC,
  SLOVENIA,
  SOLOMON_ISLANDS,
  SOMALIA,
  SOUTHAFRICA,
  SOUTHSUDAN,
  SOUTH_GEORGIA,
  SPAIN,
  SRILANKA,
  STATE_OF_PALESTINE,
  ST_PIERREANDMIQUELON,
  SUDAN,
  SURINAME,
  SVALBARD_AND_JANMAYEN_ISLANDS,
  SWAZILAND,
  SWEDEN,
  SWITZERLAND,
  SYRIAN_ARAB_REPUBLIC,
  TAIWAN,
  TAJIKISTAN,
  TANZANIA,
  THAILAND,
  TOGO,
  TOKELAU,
  TONGA,
  TRINIDADANDTOBAGO,
  TUNISIA,
  TURKEY,
  TURKMENISTAN,
  TURKSAND_CAICOS_ISLANDS,
  TUVALU,
  UGANDA,
  UKRAINE,
  UNITEDSTATES,
  UNITED_ARAB_EMIRATES,
  UNITED_KINGDOM,
  URUGUAY,
  US_MINOR_OUTLYING_ISLANDS,
  UZBEKISTAN,
  VANUATU,
  VATICAN,
  VENEZUELA,
  VIETNAM,
  VIRGINISLANDS_UK,
  VIRGINISLANDS_USA,
  WALLIS_AND_FUTUNA,
  WESTERN_SAHARA,
  YEMEN,
  ZAMBIA,
  ZIMBABWE,
  COTE_DIVOIRE,
  SERBIA_AND_MONTENEGRO
}
