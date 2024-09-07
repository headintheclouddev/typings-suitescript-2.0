export function isArray(obj: any): obj is any[];
export function isBoolean(obj: any): obj is boolean;
export function isDate(obj: any): obj is Date;
export function isNumber(obj: any): obj is number;
export function isObject(obj: any): obj is object;
export function isRegExp(obj: any): obj is RegExp;
export function isString(obj: any): obj is string;
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
 */
export function each<T>(iterable: T[], callback: (item: T, idx: number, iterable: T[]) => void): T[];
export function each<T>(iterable: T, callback: (property: any, key: keyof T, iterable: T) => void): T;

/**
 * Copy all properties from contributor into receiver.
 * Properties in contributor that are already in receiver get overwritten.
 * @param receiver
 * @param contributor
 */
export function extend<T, U>(receiver: T, contributor: U): T & U;
