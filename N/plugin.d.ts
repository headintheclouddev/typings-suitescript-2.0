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
    implementation?: string;
}

/**
 * Returns the script IDs of custom plug-in type implementations.
 * Returns an empty list when there is no custom plug-in type with the script ID available for the executing script.
 */
export function findImplementations(options: FindImplementationsOptions): string[];

/**
 * Instantiates an implementation of the custom plugin type.
 * Returns the implementation which is currently selected in the UI (Manage Plug-ins page) when no implementation ID is explicitly provided.
 */
export function loadImplementation<T extends Record<string, (...s: any) => any>>(options: LoadImplementationOptions): T;
