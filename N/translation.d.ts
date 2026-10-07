/**
 * Use the N/translation module to interact with NetSuite Translation Collections programmatically.
 * The module provides read-only access; create or modify Translation Collections in the NetSuite UI.
 *
 * Supported script types: Client and server scripts.
 *
 * @module N/translation
 * @since 2019.1
 */

/**
 * Holds the string values for supported locales for Translation Collections.
 * Includes the special values CURRENT (the current user's locale) and COMPANY_DEFAULT (the company's default locale).
 * Typically, only some of these locales are enabled for a company.
 * @enum {string}
 * @since 2019.1
 */
export enum Locale {
    COMPANY_DEFAULT = "en_US",
    CURRENT = "en_US",
    af_ZA = "af_ZA",
    ar = "ar",
    bg_BG = "bg_BG",
    bn_BD = "bn_BD",
    bs_BA = "bs_BA",
    cs_CZ = "cs_CZ",
    da_DK = "da_DK",
    de_DE = "de_DE",
    el_GR = "el_GR",
    en = "en",
    en_AU = "en_AU",
    en_CA = "en_CA",
    en_GB = "en_GB",
    en_US = "en_US",
    es_AR = "es_AR",
    es_ES = "es_ES",
    et_EE = "et_EE",
    fa_IR = "fa_IR",
    fi_FI = "fi_FI",
    fr_CA = "fr_CA",
    fr_FR = "fr_FR",
    gu_IN = "gu_IN",
    he_IL = "he_IL",
    hi_IN = "hi_IN",
    hr_HR = "hr_HR",
    hu_HU = "hu_HU",
    hy_AM = "hy_AM",
    id_ID = "id_ID",
    is_IS = "is_IS",
    it_IT = "it_IT",
    ja_JP = "ja_JP",
    kn_IN = "kn_IN",
    ko_KR = "ko_KR",
    lb_LU = "lb_LU",
    lt_LT = "lt_LT",
    lv_LV = "lv_LV",
    mr_IN = "mr_IN",
    ms_MY = "ms_MY",
    nl_NL = "nl_NL",
    no_NO = "no_NO",
    pa_IN = "pa_IN",
    pl_PL = "pl_PL",
    pt_BR = "pt_BR",
    pt_PT = "pt_PT",
    ro_RO = "ro_RO",
    ru_RU = "ru_RU",
    sh_RS = "sh_RS",
    sk_SK = "sk_SK",
    sl_SI = "sl_SI",
    sq_AL = "sq_AL",
    sr_RS = "sr_RS",
    sv_SE = "sv_SE",
    ta_IN = "ta_IN",
    te_IN = "te_IN",
    th_TH = "th_TH",
    tl_PH = "tl_PH",
    tr_TR = "tr_TR",
    uk_UA = "uk_UA",
    vi_VN = "vi_VN",
    zh_CN = "zh_CN",
    zh_TW = "zh_TW",
}

/**
 * Represents a translator function that returns translated strings.
 * Placeholders in parametrized translation strings use braces and a number starting from 1 (for example, 'Hello, {1}!'),
 * and are replaced by the values in options.params.
 *
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the function parameters were not passed as an array.
 * @since 2019.1
 */
export type Translator = (options?: {params: string[]}) => string;

/**
 * Creates a translator function for a key in the specified Translation Collection and locale.
 *
 * @param {string} options.collection - the script ID of the collection the key is in
 * @param {string} options.key - a valid key from the collection
 * @param {Locale} [options.locale] - a valid locale from the Locale enum; the current session locale is used if not specified
 *
 * @returns {Translator} - returns a translator function
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if collection or key is missing
 * @throws {SuiteScriptError} INVALID_TRANSLATION_KEY if key is of an invalid format
 * @throws {SuiteScriptError} INVALID_TRANSLATION_COLLECTION if collection is of an invalid format
 * @throws {SuiteScriptError} INVALID_LOCALE if locale is of an invalid format
 * @throws {SuiteScriptError} TRANSLATION_KEY_NOT_FOUND if translation key was not found
 *
 * @governance 1 unit
 * @since 2019.1
 */
export function get(
    options: {
        collection: string,
        key: string,
        locale?: Locale,
    },
): Translator;

/** A Translation Collection to load using translation.load(options). */
export type Collection = {
    /** An alias to identify the collection. Used later in the script to refer to the loaded collection. */
    alias: string,
    /** The script ID of the collection to load. */
    collection: string,
    /** A list of translation keys from the collection to load. You cannot load all of the terms in a collection at one time. */
    keys: string[],
};

/**
 * Creates a translation.Handle object with translations for the specified Translation Collections and locales.
 * If no locale is specified, the session locale (Locale.CURRENT) is used as the handle's locale.
 * If locales are specified, the first locale in the array is used as the handle's locale.
 *
 * @param {Collection[]} options.collections - a list of objects defining the collections to be loaded
 * @param {string} options.collections.alias - an alias used later in the script to refer to the collection to be loaded
 * @param {string} options.collections.collection - the script ID of the collection to be loaded
 * @param {string[]} options.collections.keys - a list of translation keys from the collection to be loaded
 * @param {Locale[]} [options.locales] - a list of valid locales
 *
 * @returns {Handle} - returns a translation.Handle
 *
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if collections, collections.keys or locales are not of Array type
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a collection or key parameter is missing
 * @throws {SuiteScriptError} INVALID_TRANSLATION_KEY if a key has an invalid format
 * @throws {SuiteScriptError} INVALID_TRANSLATION_COLLECTION if a collection has an invalid format
 * @throws {SuiteScriptError} INVALID_ALIAS if an alias has an invalid format
 * @throws {SuiteScriptError} INVALID_LOCALE if a locale is of an invalid format
 *
 * @governance 10 units
 * @since 2019.1
 */
export function load(
    options: {
        collections: Collection[],
        locales?: Locale[],
    },
): Handle

/**
 * Creates a translation.Handle object in the specified locale from an existing translation.Handle object.
 * The locale must first be loaded using the locales parameter of translation.load(options).
 *
 * @param {Handle} options.handle - a translation.Handle object
 * @param {Locale} options.locale - a valid locale supported by the handle
 *
 * @returns {Handle} - returns a translation.Handle in the specified locale
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if handle or locale is missing
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if handle is not a translation.Handle object
 * @throws {SuiteScriptError} INVALID_LOCALE if an unknown or unsupported locale is used in the scope of the handle
 * @throws {SuiteScriptError} TRANSLATION_HANDLE_IS_IN_AN_ILLEGAL_STATE if the handle passed is in an illegal state
 *
 * @governance none
 * @since 2019.1
 */
export function selectLocale(
    options: {
        handle: Handle,
        locale: Locale,
    }
): Handle;

/**
 * Encapsulates a Translation Collection for a locale.
 * translation.Handle has a hierarchical structure: each of its nodes is either another Handle or a translator function.
 * Note: Oracle documents the nodes (collection aliases and keys) as dynamic members. They are not declared here, because an index signature
 * would conflict with toJSON(). Access them with a cast, for example `(handle as any).myAlias.MY_KEY()`.
 * @since 2019.1
 */
export interface Handle {

    /**
     * JSON.stringify() implementation.
     */
    toJSON(): {
        type: string,
        allRawTranslations: Record<string, unknown>,
        allTranslations: Record<string, unknown>,
        locales: Locale[],
        recentLocale: Locale
    };

    /**
     * Returns the object type name (translation.Handle)
     */
    toString(): string;
}
