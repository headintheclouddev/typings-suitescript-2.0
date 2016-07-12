/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface FormatModule {
    /**
     * Use format to convert an Object (like a Date) into a specific NS string format. 
     * Options: value (Date|string|number), type (format.FormatType).
     */
    format(options: FormatOptions): string | Object;
    /**
     * Use format to convert an Object (like a Date) into a specific NS string format. 
     * Options: value (Date|string), type (format.FormatType), timezone (enum).
     */
    format(options: FormatDateTimeOptions): string | Object;
    /**
     * Use parse to convert a string into an object, like a Date.
     * Options: value (Date|string|number), type (format.FormatType).
     */
    parse(options: FormatOptions): Date | string | number;
    /**
     * Use parse to convert a string into an object, like a Date.
     * Options: value (Date|string), type (format.FormatType), timezone (enum).
     */
    parse(options: FormatDateTimeOptions): Date | string | number;
    /**
     * -enum- Holds the string values for the supported field types. 
     * Used to set the value of the options.type parameter.
     */
    Type: FormatType;
    /**
     * -enum- Holds the string values for supported time zone formats. 
     * Used to set the value of the options.timezone parameter.
     */
    Timezone: Timezone;
}

declare var _: FormatModule;
export = _;
