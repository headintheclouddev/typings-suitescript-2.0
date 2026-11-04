interface ConvertOptions {
    string: string;
    inputEncoding: Encoding;
    outputEncoding: Encoding;
}

/** @since 2015.1 */
export declare enum Encoding {
    UTF_8,
    BASE_16,
    BASE_32,
    BASE_64,
    BASE_64_URL_SAFE,
    HEX,
}

/**
 * Converts a string to another type of encoding and returns the re-encoded string.
 * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if options.string is not data encoded using options.inputEncoding.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.string, options.inputEncoding, or options.outputEncoding is not provided.
 * @governance none
 * @since 2015.1
 */
export declare function convert(options: ConvertOptions): string;
