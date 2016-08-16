interface GetParameterOptions {
    /** The name of the script parameter. */
    name: string;
}

interface SetOptions {
    /** Key used to store the runtime.Session. */
    name: string;
    /** Value to associate with the key in the user session. */
    value: string;
}

/** Encapsulates the runtime settings of the currently executing script. */
interface Script {
    /** Returns the value of a script parameter for the currently executing script. */
    getParameter(options: GetParameterOptions): boolean | number | Date | string | string[];
    /** Returns a number value for the usage units remaining for the currently executing script. */
    getRemainingUsage(): number;
    /** The deployment ID for the script deployment on the currently executing script. */
    deploymentId: string;
    /** The script ID for the currently executing script. */
    id: string;
    /** The script logging level for the current script execution. This method is not supported on client scripts. */
    logLevel: string;
    /** The percent complete specified for the current scheduled script execution. The return value will appear in the % Complete column in the Scheduled Script Status page. */
    percentComplete: number;
    /** An Array of bundle IDs for the bundles that include the currently executing script. */
    bundleIds: string[];
}

/** Encapsulates the user session for the currently executing script. */
interface Session {
    /** Returns the user-defined session object value associated with the session object key. */
    get(options: GetParameterOptions): string;
    /** Sets a key and value for a user-defined runtime.Session. */
    set(options: SetOptions): void;
}

/** Encapsulates the properties and preferences for the user of the currently executing script. */
interface User {
    /** Returns a user permission level for the specified permission as a runtime.Permission enumeration. */
    getPermission(options: GetParameterOptions): Permission;
    /** Returns the value of a NetSuite preference. */
    getPreference(options: GetParameterOptions): string;
    /** The internal ID of the department for the currently logged-in user. */
    department: number;
    /** The email address of the currently logged-in user. */
    email: string;
    /** The internal ID of the currently logged-in user. */
    id: number;
    /** The internal ID of the location of the currently logged-in user. */
    location: number;
    /** The name of the currently logged-in user. */
    name: string;
    /** The internal ID of the role for the currently logged-in user. */
    role: number;
    /** The internal ID of the center type, or role center, for the currently logged-in user. */
    roleCenter: number;
    /** The custom scriptId of the role for the currently logged-in user. */
    roleId: string;
    /** The internal ID of the subsidiary for the currently logged-in user. */
    subsidiary: number;
}

interface FeatureOptions {
    /** The internal ID of the feature to check. */
    name: string;
}

/** The NetSuite account ID for the currently logged-in user. */
export var accountId: string;
/** The current environment in which the script is executing. This property returns one of the values from the runtime.EnvType enumeration. */
export var envType: string;
/** Returns a runtime.ContextType enumeration that represents what triggered the current script. */
export var executionContext: ContextType;
/** Returns the number of scheduled script queues in a given account. */
export var queueCount: number;
/** Returns the version of NetSuite that the method is called in. For example, the  runtime.version property in an account running NetSuite 2015.2 is 2015.2. */
export var version: string;
/** Returns a runtime.Script that represents the currently executing script. */
export function getCurrentScript(): Script;
/** Returns a runtime.Session that represents the user session for the currently executing script. */
export function getCurrentSession(): Session;
/** Returns a runtime.User that represents the properties and preferences for the user of the currently executing script. */
export function getCurrentUser(): User;
/** Use this method to determine if a particular feature is enabled in a NetSuite account. These are the features that appear on the Enable Features page at Setup > Company > Setup Tasks > Enable Features. */
export function isFeatureInEffect(options: FeatureOptions): boolean;
/** Enumeration that holds the context information about what triggered the current script. Returned by the runtime.executionContext property of the N/runtime Module. */
export enum ContextType {
    USER_INTERFACE,
    WEBSERVICES,
    WEBSTORE,
    PORTLET,
    SCHEDULED,
    SUITELET,
    CSV_IMPORT,
    CUSTOM_MASSUPDATE,
    WORKFLOW,
    USEREVENT,
}
/** Enumeration that holds all possible environment types that the current script can execute in. */
export enum EnvType {
    SANDBOX,
    PRODUCTION,
    BETA,
    INTERNAL,
}
/** Enumeration that holds the user permission level for a specific permission ID. Returned by the User.getPermission(options) method. */
export enum Permission {
    FULL,
    EDIT,
    CREATE,
    VIEW,
    NONE,
}
