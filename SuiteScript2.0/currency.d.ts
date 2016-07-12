/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface CurrencyModule {
    /**
     * Method used to return the exchange rate between two currencies based on a certain date.
     * The exchange rate values are sourced from the Currency Exchange Rate record.
     */
    exchangeRate(options: ExchangeRateOptions): number;
}

declare var _: CurrencyModule;
export = _;
