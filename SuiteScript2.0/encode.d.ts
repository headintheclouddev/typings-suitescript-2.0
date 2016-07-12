/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface EncodeModule {
    /**
     * Converts a string to another type of encoding and returns the re-encoded string.
     */
    convert(options: ConvertOptions): string;
    /**
     * Holds the string values for supported encoding specifications.
     */
    Encoding: Encoding;
}

export default EncodeModule;