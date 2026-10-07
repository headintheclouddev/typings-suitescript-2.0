/**
 * Use the N/format module to parse formatted data into strings and to convert strings into a specified format.
 * The module formats data according to the personal preferences set on the Set Preferences page (Home > Set Preferences).
 * Currency formatting for international contexts is handled by the N/format/i18n module.
 *
 * Supported script types: Client and server scripts.
 */

import type {FieldValue} from './record';

interface FormatOptions {
    /**
     * The input data to format.
     */
    value: Date | string | number;
    /**
     * The field type (for example, DATE, CURRENCY, INTEGER). Set using the format.Type enum.
     */
    type: Type;
}

interface FormatDateTimeOptions {
    /**
     * The Date Object being converted into a string (format), or the string that contains the date and time
     * information in the specified time zone (parse).
     * If parsing a string to a timezone, the string must include seconds.
     */
    value: FieldValue | Date | string;
    /**
     * The field type (DATE or DATETIME or DATETIMETZ). Set using the format.Type enum.
     */
    type: Type.DATE | Type.DATETIME | Type.DATETIMETZ | Type.MMYYDATE;
    /**
     * -optional- The time zone specified for the returned string (format), or the time zone represented by the
     * options.value string (parse). Set using the format.Timezone enum or its numeric key.
     * If a time zone is not specified, the time zone is set based on user preference.
     * If the time zone is invalid, the time zone is set to GMT.
     */
    timezone?: Timezone;
}

interface FormatNumberOptions {
    /**
     * The input data to format.
     */
    value: FieldValue | string | number;
    /**
     * The field type (for example, DATE, CURRENCY, INTEGER). Set using the format.Type enum.
     */
    type: Type.CURRENCY | Type.CURRENCY2 | Type.FLOAT | Type.INTEGER | Type.NONNEGCURRENCY | Type.NONNEGFLOAT
    | Type.PERCENT | Type.POSCURRENCY | Type.POSFLOAT | Type.POSINTEGER | Type.RATE | Type.RATEHIGHPRECISION;
}

/**
 * Formats a value from the raw value to its appropriate preference format.
 * If an invalid value is given, the original value passed to options.value is returned.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function format(options: FormatOptions): string;

/**
 * Formats a Date object into a date/datetime string. This overload applies to datetime and datetimetz values.
 * The string is returned in the user's local app time zone unless options.timezone is specified.
 * For client scripts, the string returned is based on the user's system time. For server scripts, the string
 * returned is based on the current time in the Pacific Time Zone. Daylight Savings Time does apply.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function format(options: FormatDateTimeOptions): string;

/**
 * Parses a date or datetime string from the user's preference format (or the specified time zone) into a Date object.
 * If the value given is not valid or parsable, the original value passed to options.value is returned.
 * Note: Oracle documents that an invalid or unparsable value returns the original options.value unchanged. The return
 * type is intentionally not widened to include string (that would break most callers); validate the result
 * (for example, `instanceof Date` or `isNaN`) if the input may be invalid.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function parse(options: FormatDateTimeOptions): Date;

/**
 * Parses a numeric string from the user's preference format into a number.
 * If the value given is not valid or parsable, the original value passed to options.value is returned.
 * Note: Oracle documents that an invalid or unparsable value returns the original options.value unchanged. The return
 * type is intentionally not widened to include string (that would break most callers); validate the result
 * (for example, `instanceof Date` or `isNaN`) if the input may be invalid.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function parse(options: FormatNumberOptions): number;

/**
 * Parses a value from the appropriate preference format to its raw value.
 * If the value given is not valid or parsable, the original value passed to options.value is returned.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.2
 */
export function parse(options: FormatOptions): Date | string | number;

/**
 * -enum- Holds the string values for the supported field types.
 * Used to set the value of the options.type parameter when calling format.format(options) or format.parse(options). * @since 2015.2
 */
export enum Type {
    ADDRESS = "address",
    CCEXPDATE = "ccexpdate",
    CCNUMBER = "ccnumber",
    CCVALIDFROM = "ccvalidfrom",
    CHECKBOX = "checkbox",
    CLOBTEXT = "clobtext",
    COLOR = "color",
    /** Rounds the number based on the user's currency precision setting; limited to hundredths (2 decimals). */
    CURRENCY = "currency",
    /** Formats using the record's currency precision. */
    CURRENCY2 = "currency2",
    DATE = "date",
    DATETIME = "datetime",
    DATETIMETZ = "datetimetz",
    DOCUMENT = "document",
    /** Precision is controlled by NetSuite and can differ from field to field. */
    DYNAMICPRECISION = "dynamicprecision",
    EMAIL = "email",
    EMAILS = "emails",
    FLOAT = "float",
    FULLPHONE = "fullphone",
    FUNCTION = "function",
    FURIGANA = "furigana",
    IDENTIFIER = "identifier",
    IDENTIFIERANYCASE = "identifieranycase",
    INTEGER = "integer",
    MMYYDATE = "mmyydate",
    MULTISELECT = "multiselect",
    NONNEGCURRENCY = "nonnegcurrency",
    /** Requires a value greater than or equal to 0. */
    NONNEGFLOAT = "nonnegfloat",
    PACKAGE = "package",
    PERCENT = "percent",
    PHONE = "phone",
    POSCURRENCY = "poscurrency",
    POSFLOAT = "posfloat",
    POSINTEGER = "posinteger",
    QUOTEDFUNCTION = "'function'",
    RADIO = "radio",
    RATE = "rate",
    RATEHIGHPRECISION = "ratehighprecision",
    SELECT = "select",
    /** Not listed in Oracle's format.Type documentation; kept for backward compatibility. */
    SUBRECORD_FIELD_TYPE = "summary",
    TEXT = "text",
    TEXTAREA = "textarea",
    TIME = "time",
    TIMEOFDAY = "timeofday",
    TIMETRACK = "timetrack",
    URL = "url",
}

/**
 * -enum- Holds the string values for supported time zone formats (Olson/IANA values, for example 'America/Los_Angeles').
 * Used to set the value of the options.timezone parameter when calling format.format(options) or format.parse(options).
 * If necessary, the numeric key can be used in place of an Olson Value string. * @since 2015.2
 */
export enum Timezone {
    ETC_GMT_PLUS_12,
    PACIFIC_SAMOA,
    PACIFIC_HONOLULU,
    AMERICA_ANCHORAGE,
    AMERICA_LOS_ANGELES,
    AMERICA_TIJUANA,
    AMERICA_DENVER,
    AMERICA_PHOENIX,
    /** Oracle: Don't use this. Choose AMERICA_GUATEMALA ((GMT-06:00) Central America, Chihuahua) or AMERICA_HERMOSILLO ((GMT-07:00) La Paz, Hermosillo). */
    AMERICA_CHIHUAHUA,
    AMERICA_CHICAGO,
    AMERICA_REGINA,
    AMERICA_GUATEMALA,
    AMERICA_MEXICO_CITY,
    AMERICA_NEW_YORK,
    US_EAST_INDIANA,
    AMERICA_BOGOTA,
    AMERICA_CARACAS,
    AMERICA_HALIFAX,
    AMERICA_LA_PAZ,
    AMERICA_MANAUS,
    AMERICA_SANTIAGO,
    AMERICA_ST_JOHNS,
    AMERICA_SAO_PAULO,
    AMERICA_BUENOS_AIRES,
    ETC_GMT_PLUS_3,
    AMERICA_GODTHAB,
    AMERICA_MONTEVIDEO,
    AMERICA_NORONHA,
    ETC_GMT_PLUS_1,
    ATLANTIC_AZORES,
    EUROPE_LONDON,
    GMT,
    ATLANTIC_REYKJAVIK,
    EUROPE_WARSAW,
    EUROPE_PARIS,
    ETC_GMT_MINUS_1,
    EUROPE_AMSTERDAM,
    EUROPE_BUDAPEST,
    AFRICA_CAIRO,
    EUROPE_ISTANBUL,
    ASIA_JERUSALEM,
    ASIA_AMMAN,
    ASIA_BEIRUT,
    AFRICA_JOHANNESBURG,
    EUROPE_KIEV,
    EUROPE_MINSK,
    AFRICA_WINDHOEK,
    ASIA_RIYADH,
    EUROPE_MOSCOW,
    ASIA_BAGHDAD,
    AFRICA_NAIROBI,
    ASIA_TEHRAN,
    ASIA_MUSCAT,
    ASIA_BAKU,
    ASIA_YEREVAN,
    ETC_GMT_MINUS_3,
    ASIA_KABUL,
    ASIA_KARACHI,
    ASIA_YEKATERINBURG,
    ASIA_TASHKENT,
    ASIA_CALCUTTA,
    ASIA_KATMANDU,
    ASIA_ALMATY,
    ASIA_DHAKA,
    ASIA_RANGOON,
    ASIA_BANGKOK,
    ASIA_KRASNOYARSK,
    ASIA_HONG_KONG,
    ASIA_KUALA_LUMPUR,
    ASIA_TAIPEI,
    AUSTRALIA_PERTH,
    ASIA_IRKUTSK,
    ASIA_MANILA,
    ASIA_SEOUL,
    ASIA_TOKYO,
    ASIA_YAKUTSK,
    AUSTRALIA_DARWIN,
    AUSTRALIA_ADELAIDE,
    AUSTRALIA_SYDNEY,
    AUSTRALIA_BRISBANE,
    AUSTRALIA_HOBART,
    PACIFIC_GUAM,
    ASIA_VLADIVOSTOK,
    /** Not listed in Oracle's current format.Timezone documentation; kept for backward compatibility. */
    ASIA_MAGADAN,
    PACIFIC_KWAJALEIN,
    PACIFIC_AUCKLAND,
    PACIFIC_TONGATAPU,
    /** (GMT-07:00) La Paz, Hermosillo ('America/Hermosillo') */
    AMERICA_HERMOSILLO,
    /** (GMT+11:00) Guadalcanal ('Pacific/Guadalcanal'). Oracle spells the key PACIFIC_GUADALCANA (no trailing L). */
    PACIFIC_GUADALCANA,
}
