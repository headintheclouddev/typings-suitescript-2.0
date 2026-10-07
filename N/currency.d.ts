/**
 * Use the N/currency module to work with exchange rates within your NetSuite account.
 * To use multiple currencies, the Multiple Currencies feature must be enabled.
 * Currency formatting is handled by the N/format module.
 *
 * Supported script types: Client and server scripts.
 */

interface ExchangeRateOptions {
    /**
     * -optional- The point in time to evaluate currency. Defaults to today (the current date).
     * The date determines the exchange rate in effect. If there are multiple rates, it is the latest entry on that date.
     */
    date?: Date;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting from. For example, 1 or 'USD'.
     */
    source: number | string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting to.
     * The target must be a base currency in your NetSuite account; otherwise, inaccurate values are returned.
     */
    target: number | string;
}

/**
 * Method used to return the exchange rate between two currencies based on a certain date.
 * The source currency is looked up relative to the target currency on the effective date.
 * The exchange rate values are sourced from the Currency Exchange Rate record (which is not itself scriptable).
 *
 * Supported script types: Client and server scripts.
 * @returns The exchange rate as a decimal number.
 * @governance 10 units
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if the source or target argument is missing.
 * @throws {SuiteScriptError} SSS_INVALID_CURRENCY_ID if the source or target argument is invalid.
 * @since 2015.2
 */
export declare function exchangeRate(options: ExchangeRateOptions): number;
