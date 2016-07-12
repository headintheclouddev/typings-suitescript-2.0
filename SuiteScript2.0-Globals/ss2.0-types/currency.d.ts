interface ExchangeRateOptions {
    /**
     * The point in time to evaluate currency.
     */
    date?: number | string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting from.
     */
    source: number | string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting to.
     */
    target: number | string;
}
