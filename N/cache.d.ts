/**
 * Use the N/cache module to enable temporary, short-term storage of data.
 * Cached values are stored and returned as strings; cached data is not persistent.
 * Supported script types: Server scripts.
 */

interface LoaderContext {
    /** The key of the value being loaded. */
    key: string;
}

interface GetOptions {
    /** A string that identifies the value to be retrieved from the cache. This value cannot be null. The maximum length of a key is 4KB (4096 bytes). */
    key: string;

    /**
     * Optional, but strongly recommended
     * A user-defined function (or the name of a user-defined function) that returns the requested value if it is not already present in the cache. Additionally, when the loader retrieves a value, the system automatically places that value in the cache. For this reason, NetSuite recommends using the loader function as the primary means of populating the cache.
     * Note also that if the value returned by the loader is not a string, the system uses JSON.stringify() to convert the value before it is placed in the cache and returned. The maximum size of a value that can be placed in the cache is 500KB.
     * When no loader is specified and a value is missing from the cache, the system returns null.
     */
    loader?: ((context: LoaderContext) => unknown) | string;

    /**
     * The maximum duration, in seconds, that a value retrieved by the loader can remain in the cache. The value may be removed before the ttl limit is reached.
     * The minimum value is 300 (five minutes). The default is no limit.
     */
    ttl?: number;
}

interface PutOptions {
    /** An identifier of the value that is being cached. This value cannot be null. The maximum length of a key is 4KB (4096 bytes). */
    key: string;

    /** The value to place in the cache. If the value submitted is not a string, the system uses JSON.stringify() to convert the value before it is placed in the cache. The maximum size of the value is 500KB. */
    value: unknown;

    /**
     * The maximum duration, in seconds, that the value may remain in the cache. The value may be removed before the ttl limit is reached.
     * The minimum value is 300 (five minutes). If not specified, there is no default maximum value.
     */
    ttl?: number;
}

interface RemoveOptions {
    /** An identifier of the value that is being removed. */
    key: string;
}

/**
 * A segment of memory that can be used to temporarily store data (on a short term basis). Returned by cache.getCache(options).
 * @since 2016.2
 */
export interface Cache {
    /**
     * The name of the cache.
     * @since 2016.2
     */
    name: string;

    /**
     * The availability of the cache to other scripts. A cache can be made available to the current script only, to all scripts in the current bundle, or to all scripts in your NetSuite account.
     * Set this value using the cache.Scope enum.
     * @since 2016.2
     */
    scope: string | Scope;

    /**
     * Retrieves a string value from the cache based on a key that you provide. If the requested value is not present in the cache, the method calls the user-defined function identified by options.loader. The value retrieved by this function is cached (as a string) and then returned.
     * @returns The cached string, or null if the value is missing and no loader is specified.
     * @governance 1 unit if the value is present in the cache, 2 units if the loader function is used
     * @since 2016.2
     */
    get(options: GetOptions): string | null;

    /**
     * Puts a value into the cache. If the value provided is not a string, the system uses JSON.stringify() to convert the value to a string.
     * @governance 1 unit
     * @since 2016.2
     */
    put(options: PutOptions): void;

    /**
     * Removes a value from the cache.
     * @governance 1 unit
     * @since 2016.2
     */
    remove(options: RemoveOptions): void;
}

interface GetCacheOptions {
    /** A label that will identify the cache you are creating. The maximum size of the cache name is 1 kilobyte. */
    name: string;

    /** The scope of the cache. This value determines the availability of the cache. The default value is cache.Scope.PRIVATE. */
    scope?: Scope;
}

/**
 * Checks for a cache object with the specified name. If the cache exists, this method returns the cache object. If the cache does not exist, the system creates it.
 * @governance none
 * @since 2016.2
 */
export function getCache(options: GetCacheOptions): Cache;

/**
 * Holds the string values that describe the availability of the cache.
 * Use this enum to set the value of the Cache.scope property and the options.scope parameter of cache.getCache(options).
 * @since 2016.2
 */
export enum Scope {
    /** The cache is available only to the current script. This value is the default. */
    PRIVATE,

    /**
     * The cache is available only to some scripts, as follows:
     *  - If the script is part of a bundle, the cache is available to all scripts in the same bundle.
     *  - If the script is not in a bundle, then the cache is available to all scripts not in a bundle.
     */
    PROTECTED,

    /** The cache is available to all server scripts in the NetSuite account. */
    PUBLIC,
}
