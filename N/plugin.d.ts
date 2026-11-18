interface FindImplementationsOptions {
    /** The script ID of the custom plug-in type. */
    type: string;
    /** The default value is true, indicating that the default implementation should be included in the list. */
    includeDefault?: boolean;
}

interface LoadImplementationOptions {
    /** The script ID of the custom plug-in type. */
    type: string;
    /** The script ID of the custom plug-in implementation. */
    implementation?: 'default' | (string & {});
}

/**
 * Returns the script IDs of custom plug-in type implementations.
 * Returns an empty list when there is no custom plug-in type with the script ID available for the executing script.
 * @governance none
 * @since 2016.1
 */
// When includeDefault is false, returns string[]
export function findImplementations(options: {type: string; includeDefault: false}): string[];
// When includeDefault is true or undefined, returns at least ['default']
/**
 * @governance none
 * @since 2016.1
 */
export function findImplementations(options: {type: string; includeDefault?: true}): ['default', ...string[]];

/**
 * Instantiates an implementation of the custom plugin type.
 *
 * @param options - The options for loading the implementation.
 * @returns The implementation which is currently selected in the UI (Manage Plug-ins page) when no implementation ID is explicitly provided.
 * @throws {SuiteScriptError} UNABLE_TO_FIND_IMPLEMENTATION_1_FOR_PLUGIN_2 if either there is no such implementation of the provided plug-in type, or the plug-in type does not exist.
 * @governance none
 * @since 2016.1
 */
export function loadImplementation<T extends Record<string, (...s: any) => any>>(options: LoadImplementationOptions): T;
