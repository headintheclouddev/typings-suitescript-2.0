/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface EncodeModule {
    /**
     * Converts a string to another type of encoding and returns the re-encoded string.
     */
    convert(options: ConvertOptions): string;
    /**
     * Holds the string values for supported encoding specifications.
     */
    Encoding: Encoding;
}

declare var _: EncodeModule;
export = _;
