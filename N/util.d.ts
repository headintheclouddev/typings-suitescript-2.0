/**
 * Returns true if the obj parameter is a JavaScript Array object and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isArray(obj: unknown): obj is any[];
/**
 * Returns true if the obj parameter is a JavaScript Boolean and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isBoolean(obj: unknown): obj is boolean;
/**
 * Returns true if the obj parameter is a JavaScript Date object and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isDate(obj: unknown): obj is Date;
/**
 * Returns true if the obj parameter is a JavaScript Number object or primitive, and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isNumber(obj: unknown): obj is number;
/**
 * Returns true if the obj parameter is a plain JavaScript object (new Object() or {} for example), and false otherwise.
 * Use this method, for example, to verify that a variable is a JavaScript object and not a JavaScript Function.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isObject(obj: unknown): obj is object;
/**
 * Returns true if the obj parameter is a JavaScript RegExp object, and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isRegExp(obj: unknown): obj is RegExp;
/**
 * Returns true if the obj parameter is a JavaScript String object or primitive, and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isString(obj: unknown): obj is string;
/**
 * Returns true if the obj parameter is a JavaScript Function or AsyncFunction and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2016.1
 */
export function isFunction(obj: unknown): obj is Function;
/**
 * Returns true if the obj parameter is a JavaScript AsyncFunction and false otherwise.
 * @param obj Object for which you want to verify the type.
 * @governance none
 * @since 2020.1
 */
export function isAsyncFunction(obj: unknown): obj is (...args: any[]) => Promise<unknown>;

/**
 * Returns the number of nanoseconds elapsed since an arbitrary epoch.
 * Use this to calculate the time between two events.
 * Note: This method is not listed in Oracle's N/util Module documentation (no Governance or Since information is published).
 */
export function nanoTime(): number;

/**
 * Iterates over each member in an Object or Array. This method calls the callback function on each member of the iterable.
 * @param iterable The data collection to iterate on.
 * @param callback The custom logic to execute on each member of the collection.
 * @returns The original collection.
 * @governance none
 * @since 2016.1
 */
export function each<T>(iterable: T[], callback: (item: T, idx: number, iterable: T[]) => void): T[];
export function each<T>(iterable: T, callback: (property: any, key: keyof T, iterable: T) => void): T;

/**
 * Copies the properties in a source object (contributor) to a destination object (receiver). You can use this method to merge two objects.
 * Properties in contributor that are already in receiver get overwritten.
 * @param receiver The destination object.
 * @param contributor The source object.
 * @returns The destination object.
 * @governance none
 * @since 2016.1
 */
export function extend<T, U>(receiver: T, contributor: U): T & U;
