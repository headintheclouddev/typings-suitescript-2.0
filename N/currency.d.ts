interface ExchangeRateOptions {
    /**
     * The point in time to evaluate currency.
     */
    date?: Date;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting from.
     */
    source: number | string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting to.
     */
    target: number | string;
}

/**
 * Method used to return the exchange rate between two currencies based on a certain date.
 * The exchange rate values are sourced from the Currency Exchange Rate record.
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if the source or target argument is missing.
 * @throws {SuiteScriptError} SSS_INVALID_CURRENCY_ID if the source or target argument is invalid.
 * @governance 10 units
 * @since 2015.2
 */
export declare function exchangeRate(options: ExchangeRateOptions): number;
