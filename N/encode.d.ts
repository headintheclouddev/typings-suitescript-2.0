/**
 * Use the N/encode module to convert a string to another type of encoding.
 * Supported script types: Server scripts.
 */

interface ConvertOptions {
    /** The string to encode. */
    string: string;
    /** The encoding used for the input string. Use encode.Encoding to set the value. */
    inputEncoding: Encoding;
    /**
     * The encoding to apply to the output string. Use encode.Encoding to set the value.
     * If set to UTF_8 and the input does not contain a valid UTF-8 encoded string, the result will contain the replacement character U+FFFD.
     */
    outputEncoding: Encoding;
}

/**
 * Holds the string values for the supported character set encoding.
 * Use this enum to set the inputEncoding and outputEncoding parameter values in the N/crypto and N/encode modules.
 * Note: BASE_64_URL_SAFE replaces + with - and / with _, but padding (=) is still present.
 * @since 2015.1
 */
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
