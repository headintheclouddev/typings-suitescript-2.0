/// <reference path="../typings/tsd.d.ts" />

interface ConvertOptions {
    string: string;
    inputEncoding: string;
    outputEncoding: string;
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
    /**
     * Converts a string to another type of encoding and returns the re-encoded string.
     */
    convert (options: ConvertOptions): string;
    /**
     * Holds the string values for supported encoding specifications.
     */
    Encoding: Encoding;
}

declare module N {
    var encode: EncodeModule;
}

declare module 'N/encode' {
    export = N.encode;
}
