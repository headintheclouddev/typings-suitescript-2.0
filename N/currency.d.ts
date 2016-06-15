/// <reference path="../typings/index.d.ts" />

interface ExchangeRateOptions {
    /**
     * The point in time to evaluate currency.
     */
    date?: number|string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting from.
     */
    source: number|string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting to.
     */
    target: number|string;
}

interface CurrencyModule {
    /**
     * Method used to return the exchange rate between two currencies based on a certain date.
     * The exchange rate values are sourced from the Currency Exchange Rate record.
     */
    exchangeRate (options: ExchangeRateOptions): number;
}

declare module N {
    var currency: CurrencyModule;
}

declare module 'N/currency' {
    export = N.currency;
}
