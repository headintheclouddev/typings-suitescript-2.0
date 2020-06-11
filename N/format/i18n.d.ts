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

/** Spells out positive and negative number as a string in a specific language. For more information, see Codes for the Representation of Names of Languages. */
export function spellOut(options: SpellOutOptions): string;

/** Create format.CurrencyFormatter object to format numbers into currency strings. Costs 10 governance units. */
export function getCurrencyFormatter(options: GetCurrencyFormatterOptions): CurrencyFormatter;

/** Create format.NumberFormatter object to format numbers into strings. Costs 10 governance units. */
export function getNumberFormatter(options?: GetNumberFormatterOptions): NumberFormatter;

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
