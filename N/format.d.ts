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

import type {FieldValue} from './record';

interface FormatDateTimeOptions {
    /**
     * The Date Object being converted into a string.
     * If parsing a string to a timezone, the string must include seconds.
     */
    value: FieldValue | Date | string;
    /**
     * The field type (DATE or DATETIME or DATETIMETZ). Set using the format.Type enum.
     */
    type: Type.DATE | Type.DATETIME | Type.DATETIMETZ | Type.MMYYDATE;
    /**
     * -optional- The time zone specified for the returned string. Set using the format.Timezone enum or key.
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
 * Use format to convert an Object (like a Date) into a specific NS string format. 
 * Options: value (Date|string|number), type (format.FormatType).
 * @governance none
 * @since 2015.2
 */
export function format(options: FormatOptions): string | any;

/**
 * Use format to convert an Object (like a Date) into a specific NS string format. 
 * Options: value (Date|string), type (format.FormatType), timezone (enum).
 * @governance none
 * @since 2015.2
 */
export function format(options: FormatDateTimeOptions): string | any;

/**
 * Use parse to convert a string into an object, like a Date.
 * Options: value (Date|string), type (format.FormatType), timezone (enum).
 * @governance none
 * @since 2015.2
 */
export function parse(options: FormatDateTimeOptions): Date;

/**
 * Use parse to convert a string into a number.
 * Options: value (number|string), type (format.FormatType).
 * @governance none
 * @since 2015.2
 */
export function parse(options: FormatNumberOptions): number;

/**
 * Use parse to convert a string into an object, like a Date.
 * Options: value (Date|string|number), type (format.FormatType).
 * @governance none
 * @since 2015.2
 */
export function parse(options: FormatOptions): Date | string | number;

/**
 * -enum- Holds the string values for the supported field types. 
 * Used to set the value of the options.type parameter.
 */
export enum Type {
    ADDRESS = "address",
    CCEXPDATE = "ccexpdate",
    CCNUMBER = "ccnumber",
    CCVALIDFROM = "ccvalidfrom",
    CHECKBOX = "checkbox",
    CLOBTEXT = "clobtext",
    COLOR = "color",
    CURRENCY = "currency",
    CURRENCY2 = "currency2",
    DATE = "date",
    DATETIME = "datetime",
    DATETIMETZ = "datetimetz",
    DOCUMENT = "document",
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
    SUBRECORD_FIELD_TYPE = "summary",
    TEXT = "text",
    TEXTAREA = "textarea",
    TIME = "time",
    TIMEOFDAY = "timeofday",
    TIMETRACK = "timetrack",
    URL = "url",
}

/**
 * -enum- Holds the string values for supported time zone formats. 
 * Used to set the value of the options.timezone parameter.
 */
export enum Timezone {
    ETC_GMT_PLUS_12 = "Etc/GMT+12",
    PACIFIC_SAMOA = "Pacific/Samoa",
    PACIFIC_HONOLULU = "Pacific/Honolulu",
    AMERICA_ANCHORAGE = "America/Anchorage",
    AMERICA_LOS_ANGELES = "America/Los_Angeles",
    AMERICA_TIJUANA = "America/Tijuana",
    AMERICA_DENVER = "America/Denver",
    AMERICA_PHOENIX = "America/Phoenix",
    AMERICA_CHIHUAHUA = "America/Chihuahua",
    AMERICA_CHICAGO = "America/Chicago",
    AMERICA_REGINA = "America/Regina",
    AMERICA_GUATEMALA = "America/Guatemala",
    AMERICA_MEXICO_CITY = "America/Mexico_City",
    AMERICA_NEW_YORK = "America/New_York",
    US_EAST_INDIANA = "US/East-Indiana",
    AMERICA_BOGOTA = "America/Bogota",
    AMERICA_CARACAS = "America/Caracas",
    AMERICA_HALIFAX = "America/Halifax",
    AMERICA_LA_PAZ = "America/La_Paz",
    AMERICA_MANAUS = "America/Manaus",
    AMERICA_SANTIAGO = "America/Santiago",
    AMERICA_ST_JOHNS = "America/St_Johns",
    AMERICA_SAO_PAULO = "America/Sao_Paulo",
    AMERICA_BUENOS_AIRES = "America/Buenos_Aires",
    ETC_GMT_PLUS_3 = "Etc/GMT+3",
    AMERICA_GODTHAB = "America/Godthab",
    AMERICA_MONTEVIDEO = "America/Montevideo",
    AMERICA_NORONHA = "America/Noronha",
    ETC_GMT_PLUS_1 = "Etc/GMT+1",
    ATLANTIC_AZORES = "Atlantic/Azores",
    EUROPE_LONDON = "Europe/London",
    GMT = "GMT",
    ATLANTIC_REYKJAVIK = "Atlantic/Reykjavik",
    EUROPE_WARSAW = "Europe/Warsaw",
    EUROPE_PARIS = "Europe/Paris",
    ETC_GMT_MINUS_1 = "Etc/GMT-1",
    EUROPE_AMSTERDAM = "Europe/Amsterdam",
    EUROPE_BUDAPEST = "Europe/Budapest",
    AFRICA_CAIRO = "Africa/Cairo",
    EUROPE_ISTANBUL = "Europe/Istanbul",
    ASIA_JERUSALEM = "Asia/Jerusalem",
    ASIA_AMMAN = "Asia/Amman",
    ASIA_BEIRUT = "Asia/Beirut",
    AFRICA_JOHANNESBURG = "Africa/Johannesburg",
    EUROPE_KIEV = "Europe/Kiev",
    EUROPE_MINSK = "Europe/Minsk",
    AFRICA_WINDHOEK = "Africa/Windhoek",
    ASIA_RIYADH = "Asia/Riyadh",
    EUROPE_MOSCOW = "Europe/Moscow",
    ASIA_BAGHDAD = "Asia/Baghdad",
    AFRICA_NAIROBI = "Africa/Nairobi",
    ASIA_TEHRAN = "Asia/Tehran",
    ASIA_MUSCAT = "Asia/Muscat",
    ASIA_BAKU = "Asia/Baku",
    ASIA_YEREVAN = "Asia/Yerevan",
    ETC_GMT_MINUS_3 = "Etc/GMT-3",
    ASIA_KABUL = "Asia/Kabul",
    ASIA_KARACHI = "Asia/Karachi",
    ASIA_YEKATERINBURG = "Asia/Yekaterinburg",
    ASIA_TASHKENT = "Asia/Tashkent",
    ASIA_CALCUTTA = "Asia/Calcutta",
    ASIA_KATMANDU = "Asia/Katmandu",
    ASIA_ALMATY = "Asia/Almaty",
    ASIA_DHAKA = "Asia/Dhaka",
    ASIA_RANGOON = "Asia/Rangoon",
    ASIA_BANGKOK = "Asia/Bangkok",
    ASIA_KRASNOYARSK = "Asia/Krasnoyarsk",
    ASIA_HONG_KONG = "Asia/Hong_Kong",
    ASIA_KUALA_LUMPUR = "Asia/Kuala_Lumpur",
    ASIA_TAIPEI = "Asia/Taipei",
    AUSTRALIA_PERTH = "Australia/Perth",
    ASIA_IRKUTSK = "Asia/Irkutsk",
    ASIA_MANILA = "Asia/Manila",
    ASIA_SEOUL = "Asia/Seoul",
    ASIA_TOKYO = "Asia/Tokyo",
    ASIA_YAKUTSK = "Asia/Yakutsk",
    AUSTRALIA_DARWIN = "Australia/Darwin",
    AUSTRALIA_ADELAIDE = "Australia/Adelaide",
    AUSTRALIA_SYDNEY = "Australia/Sydney",
    AUSTRALIA_BRISBANE = "Australia/Brisbane",
    AUSTRALIA_HOBART = "Australia/Hobart",
    PACIFIC_GUAM = "Pacific/Guam",
    ASIA_VLADIVOSTOK = "Asia/Vladivostok",
    PACIFIC_KWAJALEIN = "Pacific/Kwajalein",
    PACIFIC_AUCKLAND = "Pacific/Auckland",
    PACIFIC_TONGATAPU = "Pacific/Tongatapu",
}
