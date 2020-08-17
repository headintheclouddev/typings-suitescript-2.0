/** The N/format/i18n module has methods that allows for formatting of strings in international context and for formatting of numbers to currency or number strings. */

/** The object that formats the number to currency string */
interface CurrencyFormatter {
  /** Describes the currency code. */
  readonly currency: string;
  /** Describes the symbol of the currency code. */
  readonly symbol: string;
  /** Contains the format.NumberFormatter object derived from format.CurrencyFormatter with the same number formatting parameters without currency symbol. */
  readonly numberFormatter: string;
  /** Formats the number to the currency string. Costs 10 governance units. */
  format(options: { number: number }): string;
}

/** Object that formats number to string. */
interface NumberFormatter {
  /** Indicates the group separator. */
  readonly groupSeparator: string;
  /** Indicates the decimal separator. */
  readonly decimalSeparator: string;
  /** Indicates the precision. */
  readonly precision: number;
  /** Indicates the negative number format. */
  negativeNumberFormat: NegativeNumberFormat;
  /** Formats number to the number string. Costs 10 governance units. */
  format(options: { number: number }): string;
}

/** The object that formats the phone number to string. */
interface PhoneNumberFormatter {
  format(options: { number: string }): string;
}

/** The object that parses the string with the phone number to an object. */
interface PhoneNumberParser {
  parse(options: { number: string }): { countryCode: string, extension: string, nationalNumber: string, numberOfLeadingZeroes: number, carrierCode: string, rawInput: string };
}

/** Spells out positive and negative number as a string in a specific language. For more information, see Codes for the Representation of Names of Languages. */
export function spellOut(options: SpellOutOptions): string;

/** Create format.CurrencyFormatter object to format numbers into currency strings. Costs 10 governance units. */
export function getCurrencyFormatter(options: GetCurrencyFormatterOptions): CurrencyFormatter;

/** Create format.NumberFormatter object to format numbers into strings. Costs 10 governance units. */
export function getNumberFormatter(options?: GetNumberFormatterOptions): NumberFormatter;

export function getPhoneNumberFormatter(options: { defaultCountry: Country }): PhoneNumberFormatter; // TODO: This isn't documented, but shows up in release preview

export function getPhoneNumberParser(options: { defaultCountry: Country }): PhoneNumberParser; // TODO: Test this; it's not documented but shows up in the example

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

export enum Currency { // Note The currency values depend on the company. Examples of currency value include:
  USD,
  CAD,
  EUR,
  GBP,
  JPY
}

export enum NegativeNumberFormat {
  BRACKETS,
  MINUS
}

export enum PhoneNumberFormatType {
  E164,
  INTERNATIONAL,
  NATIONAL,
  RFC3966
}

export enum Country { // As of 17 August 2020
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
  ZIMBABWE
}
