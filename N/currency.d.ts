/// <reference path="../typings/tsd.d.ts" />

interface ExchangeRateOptions {
    date?: number|string;
    source: number|string;
    target: number|string;
}

interface CurrencyModule {
    exchangeRate: (options: ExchangeRateOptions) => number;
}

declare module N {
    var currency: CurrencyModule;
}

declare module 'N/currency' {
    export = N.currency;
}
