/// <reference path="../typings/tsd.d.ts" />

interface ConvertOptions {
    string: string;
    inputEncoding: Encoding;
    outputEncoding: Encoding;
}

interface Encoding {
    UTF_8: string;
    BASE_16: string;
    BASE_32: string;
    BASE_64: string;
    BASE_64_URL_SAFE: string;
    HEX: string;
}

interface EncodeModule {
    convert: (options: ConvertOptions) => string;
    Encoding: Encoding;
}

declare module N {
    var encode: EncodeModule;
}

declare module 'N/encode' {
    export = N.encode;
}
