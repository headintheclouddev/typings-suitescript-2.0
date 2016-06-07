/// <reference path="../typings/tsd.d.ts" />

interface FormatOptions {
    /**
     * The input data to format.
     */
    value: Date | string | number;
    /**
     * The field type (for example, DATE, CURRENCY, INTEGER). Set using the format.Type enum.
     */
    type: string;
}

interface FormatDateTimeOptions {
    /**
     * The Date Object being converted into a string.
     * If parsing a string to a timezone, the string must include seconds.
     */
    value: Date | string;
    /**
     * The field type (either DATETIME or DATETIMETX). Set using the format.Type enum.
     */
    type: string;
    /**
     * -optional- The time zone specified for the returned string. Set using the format.Timezone enum or key.
     * If a time zone is not specified, the time zone is set based on user preference.
     * If the time zone is invalid, the time zone is set to GMT.
     */
    timezone?: number;
}

interface FormatType {
    CCEXPDATE: string;
    CCNUMBER: string;
    CCVALIDFROM: string;
    CHECKBOX: string;
    COLOR: string;
    CURRENCY: string;
    CURRENCY2: string;
    DATE: string;
    DATETIME: string;
    DATETIMETZ: string;
    FLOAT: string;
    FULLPHONE: string;
    FUNCTION: string;
    IDENTIFIER: string;
    INTEGER: string;
    MMYYDATE: string;
    NONNEGCURRENCY: string;
    NONNEGFLOAT: string;
    PERCENT: string;
    PHONE: string;
    POSCURRENCY: string;
    POSFLOAT: string;
    POSINTEGER: string;
    RATE: string;
    RATEHIGHPRECISION: string;
    TIME: string;
    TIMEOFDAY: string;
    TIMETRACK: string;
    URL: string;
}

interface Timezone {
    ETC_GMT_PLUS_12: number;
    PACIFIC_SAMOA: number;
    PACIFIC_HONOLULU: number;
    AMERICA_ANCHORAGE: number;
    AMERICA_LOS_ANGELES: number;
    AMERICA_TIJUANA: number;
    AMERICA_DENVER: number;
    AMERICA_PHOENIX: number;
    AMERICA_CHIHUAHUA: number;
    AMERICA_CHICAGO: number;
    AMERICA_REGINA: number;
    AMERICA_GUATEMALA: number;
    AMERICA_MEXICO_CITY: number;
    AMERICA_NEW_YORK: number;
    US_EAST_INDIANA: number;
    AMERICA_BOGOTA: number;
    AMERICA_CARACAS: number;
    AMERICA_HALIFAX: number;
    AMERICA_LA_PAZ: number;
    AMERICA_MANAUS: number;
    AMERICA_SANTIAGO: number;
    AMERICA_ST_JOHNS: number;
    AMERICA_SAO_PAULO: number;
    AMERICA_BUENOS_AIRES: number;
    ETC_GMT_PLUS_3: number;
    AMERICA_GODTHAB: number;
    AMERICA_MONTEVIDEO: number;
    AMERICA_NORONHA: number;
    ETC_GMT_PLUS_1: number;
    ATLANTIC_AZORES: number;
    EUROPE_LONDON: number;
    GMT: number;
    ATLANTIC_REYKJAVIK: number;
    EUROPE_WARSAW: number;
    EUROPE_PARIS: number;
    ETC_GMT_MINUS_1: number;
    EUROPE_AMSTERDAM: number;
    EUROPE_BUDAPEST: number;
    AFRICA_CAIRO: number;
    EUROPE_ISTANBUL: number;
    ASIA_JERUSALEM: number;
    ASIA_AMMAN: number;
    ASIA_BEIRUT: number;
    AFRICA_JOHANNESBURG: number;
    EUROPE_KIEV: number;
    EUROPE_MINSK: number;
    AFRICA_WINDHOEK: number;
    ASIA_RIYADH: number;
    EUROPE_MOSCOW: number;
    ASIA_BAGHDAD: number;
    AFRICA_NAIROBI: number;
    ASIA_TEHRAN: number;
    ASIA_MUSCAT: number;
    ASIA_BAKU: number;
    ASIA_YEREVAN: number;
    ETC_GMT_MINUS_3: number;
    ASIA_KABUL: number;
    ASIA_KARACHI: number;
    ASIA_YEKATERINBURG: number;
    ASIA_TASHKENT: number;
    ASIA_CALCUTTA: number;
    ASIA_KATMANDU: number;
    ASIA_ALMATY: number;
    ASIA_DHAKA: number;
    ASIA_RANGOON: number;
    ASIA_BANGKOK: number;
    ASIA_KRASNOYARSK: number;
    ASIA_HONG_KONG: number;
    ASIA_KUALA_LUMPUR: number;
    ASIA_TAIPEI: number;
    AUSTRALIA_PERTH: number;
    ASIA_IRKUTSK: number;
    ASIA_MANILA: number;
    ASIA_SEOUL: number;
    ASIA_TOKYO: number;
    ASIA_YAKUTSK: number;
    AUSTRALIA_DARWIN: number;
    AUSTRALIA_ADELAIDE: number;
    AUSTRALIA_SYDNEY: number;
    AUSTRALIA_BRISBANE: number;
    AUSTRALIA_HOBART: number;
    PACIFIC_GUAM: number;
    ASIA_VLADIVOSTOK: number;
    ASIA_MAGADAN: number;
    PACIFIC_KWAJALEIN: number;
    PACIFIC_AUCKLAND: number;
    PACIFIC_TONGATAPU: number;
}

interface FormatModule {
    /**
     * Use format to convert an Object (like a Date) into a specific NS string format. 
     * Options: value (Date|string|number), type (format.FormatType).
     */
    format (options: FormatOptions): string|Object;
    /**
     * Use format to convert an Object (like a Date) into a specific NS string format. 
     * Options: value (Date|string), type (format.FormatType), timezone (enum).
     */
    format (options: FormatDateTimeOptions): string|Object;
    /**
     * Use parse to convert a string into an object, like a Date.
     * Options: value (Date|string|number), type (format.FormatType).
     */
    parse (options: FormatOptions): Date|string|number;
    /**
     * Use parse to convert a string into an object, like a Date.
     * Options: value (Date|string), type (format.FormatType), timezone (enum).
     */
    parse (options: FormatDateTimeOptions): Date|string|number;
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

declare module N {
    var format: FormatModule;
}

declare module 'N/format' {
    export = N.format;
}
