/**
 * Use the N/plugin module to load custom plug-in implementations.
 *
 * Supported script types: Server scripts
 */

interface FindImplementationsOptions {
    /** The script ID of the custom plug-in type. */
    type: string;
    /** The default value is true, indicating that the default implementation should be included in the list. */
    includeDefault?: boolean;
}

interface LoadImplementationOptions {
    /** The script ID of the custom plug-in type. */
    type: string;
    /** The script ID of the custom plug-in implementation. If omitted, the implementation currently selected on the Manage Plug-ins page is loaded. */
    implementation?: 'default' | (string & {});
}

/**
 * Returns the script IDs of custom plug-in type implementations.
 * Returns an empty list when there is no custom plug-in type with the script ID available for the executing script.
 * @returns A list of custom plug-in implementation script IDs.
 * @governance none
 * @since 2016.1
 */
// When includeDefault is false, returns string[]
export function findImplementations(options: {type: string; includeDefault: false}): string[];
/**
 * Returns the script IDs of custom plug-in type implementations, including the default implementation.
 * Returns an empty list when there is no custom plug-in type with the script ID available for the executing script.
 * @returns A list of custom plug-in implementation script IDs.
 * @governance none
 * @since 2016.1
 */
// When includeDefault is true or undefined, returns at least ['default']
export function findImplementations(options: {type: string; includeDefault?: true}): ['default', ...string[]];
/**
 * Returns the script IDs of custom plug-in type implementations.
 * Returns an empty list when there is no custom plug-in type with the script ID available for the executing script.
 * @returns A list of custom plug-in implementation script IDs.
 * @governance none
 * @since 2016.1
 */
// When includeDefault is a non-literal boolean
export function findImplementations(options: FindImplementationsOptions): string[];

/**
 * Instantiates an implementation of the custom plugin type.
 *
 * @param options - The options for loading the implementation.
 * @returns An object implementing the custom plug-in type. When no implementation ID is provided, the implementation currently selected in the UI (Manage Plug-ins page) is returned.
 * @throws {SuiteScriptError} UNABLE_TO_FIND_IMPLEMENTATION_1_FOR_PLUGIN_2 if either there is no such implementation of the provided plug-in type, or the plug-in type does not exist.
 * @governance none
 * @since 2016.1
 */
export function loadImplementation<T extends { [K in keyof T]: (...args: never[]) => unknown } = Record<string, (...args: never[]) => unknown>>(options: LoadImplementationOptions): T;
