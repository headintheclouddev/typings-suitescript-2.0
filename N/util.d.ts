/**
 * @governance none
 * @since 2016.1
 */
export function isArray(obj: any): obj is any[];
/**
 * @governance none
 * @since 2016.1
 */
export function isBoolean(obj: any): obj is boolean;
/**
 * @governance none
 * @since 2016.1
 */
export function isDate(obj: any): obj is Date;
/**
 * @governance none
 * @since 2016.1
 */
export function isNumber(obj: any): obj is number;
/**
 * @governance none
 * @since 2016.1
 */
export function isObject(obj: any): obj is object;
/**
 * @governance none
 * @since 2016.1
 */
export function isRegExp(obj: any): obj is RegExp;
/**
 * @governance none
 * @since 2016.1
 */
export function isString(obj: any): obj is string;
/**
 * @governance none
 * @since 2016.1
 */
export function isFunction(obj: any): obj is Function;

/**
 * Returns the number of nanoseconds elapsed since an arbitrary epoch.
 * Use this to calculate the time between two events.
 */
export function nanoTime(): number;

/**
 * Iterate over each element of an array or each property of an object.
 * @param iterable
 * @param callback
 * @governance none
 * @since 2016.1
 */
export function each<T>(iterable: T[], callback: (item: T, idx: number, iterable: T[]) => void): T[];
export function each<T>(iterable: T, callback: (property: any, key: keyof T, iterable: T) => void): T;

/**
 * Copy all properties from contributor into receiver.
 * Properties in contributor that are already in receiver get overwritten.
 * @param receiver
 * @param contributor
 * @governance none
 * @since 2016.1
 */
export function extend<T, U>(receiver: T, contributor: U): T & U;
