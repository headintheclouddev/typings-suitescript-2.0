/**
 * Translation module
 *
 * Please, mind that this feature is still in BETA testing and the API might change.
 *
 * @module N/translation
 * @version 2019.1-beta
 */

/**
 * @enum {string}
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
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE The function parameters were not passed as an array.
 */
export type Translator = (options?: {params: string[]}) => string;

/**
 * Creates a translator function for the chosen key in the desired locale
 *
 * @param {string} options.collection - the scriptid of the collection the key is in
 * @param {string} options.key - a valid key from the collection
 * @param {Locale} [options.locale] - a valid locale from Locale enum or the session locale if not specified
 *
 * @return {function} - returns a translator function
 *
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if collection or key is missing
 * @throws {SuiteScriptError} INVALID_TRANSLATION_KEY if key is of an invalid format
 * @throws {SuiteScriptError} INVALID_TRANSLATION_COLLECTION if collection is of an invalid format
 * @throws {SuiteScriptError} INVALID_LOCALE if locale is of an invalid format
 * @throws {SuiteScriptError} TRANSLATION_KEY_NOT_FOUND if translation key was not found
 *
 * @since 2019.1
 * @version 2019.1-beta
 */
export function get(
    options: {
        collection: string,
        key: string,
        locale?: Locale,
    },
): Translator;

export type Collection = {
    alias: string,
    collection: string,
    keys?: string[],
};

/**
 * Pre-loads a translations.Handle with translations for the specified collections and locales.
 * If no locale was specified the session locale (Locale.CURRENT) will be used as the handler's locale.
 * If locales were specified the first locale in the array will be used as the handler's locale.
 *
 * @param {Collection[]>} options.collections - a list of objects defining the collections to be loaded
 * @param {String} options.collections.alias - an alias used later in the script to refer to the collection to be loaded
 * @param {String} options.collections.collection - the scriptid of the collection to be loaded
 * @param {Array} [options.collections.keys] - a list of translation keys from the collection to be loaded
 * @param {Array} [options.locales] - a list of valid locales
 *
 * @return {Handle} - returns a translations.Handle
 *
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if collections, collections or locales are not of Array type
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if collections doesn't have at least one collection defined
 * @throws {SuiteScriptError} INVALID_TRANSLATION_KEY if a key has an invalid format
 * @throws {SuiteScriptError} INVALID_TRANSLATION_COLLECTION if a collection has an invalid format
 * @throws {SuiteScriptError} INVALID_ALIAS if an alias has an invalid format
 * @throws {SuiteScriptError} INVALID_LOCALE if a locale is of an invalid format
 *
 * @since 2019.1
 * @version 2019.1-beta
 */
export function load(
    options: {
        collections: Collection[],
        locales?: Locale[],
    },
): Handle

/**
 * Creates a translations.Handle from an existing Handle for a specific locale
 *
 * @param {Handle} options.handle - a translations.Handle object
 * @param {Locale} options.locale - a valid locale supported by the handle
 *
 * @return {Handle} - returns a translations.Handle in the specified locale
 *
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if handle or locale is missing
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if handle is not a translations.Handle object
 * @throws {SuiteScriptError} INVALID_LOCALE if an unknown or unsupported locale is used in the scope of the handle
 * @throws {SuiteScriptError} TRANSLATION_HANDLE_IS_IN_AN_ILLEGAL_STATE if the handle passed is in an illegal state
 *
 * @since 2019.1
 * @version 2019.1-beta
 */
export function selectLocale(
    options: {
        handle: Handle,
        locale: Locale,
    }
): void;

/**
 * Translations.Handle has a hierarchical structure.
 *
 * Each of its nodes is either another Handle or a translator function
 */
export interface Handle {

    /**
     * JSON.stringify() implementation.
     */
    toJSON(): {
        type: string,
        allRawTranslations: Object,
        allTranslations: Object,
        locales: Locale[],
        recentLocale: Locale
    };

    /**
     * Returns the object type name (translations.Handle)
     */
    toString(): string;
}
