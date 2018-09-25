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
    /** The script ID of the center type, or role center, for the currently logged-in user.
      *  NOTE: The actual behavior of this strays from the documentation. This in practice returns the script id
      *  of the role center as opposed to its internal id. That is why the return type is string | number instead of
      *  what the documentation claims (just number).
      */
    roleCenter: string | number;
    /** The custom scriptId of the role for the currently logged-in user. */
    roleId: string;
    /** The internal ID of the subsidiary for the currently logged-in user. */
    subsidiary: number;
}

interface FeatureOptions {
    /** The internal ID of the feature to check. */
    feature: string;
}

/** The NetSuite account ID for the currently logged-in user. */
export var accountId: string;
/** The current environment in which the script is executing. This property returns one of the values from the runtime.EnvType enumeration. */
export var envType: EnvType;
/** Returns a runtime.ContextType enumeration that represents what triggered the current script. */
export var executionContext: ContextType;
/** The number of processors available to the currently logged in account.
 SuiteCloud Processors is the current system used to execute (process) scheduled scripts and map/reduce scripts. This property is helpful if you are a SuiteApp developer and your script needs to know the total number of processors available to a deployment.
 For scheduled script deployments that continue to use queues, use runtime.queueCount. With the introduction of SuiteCloud Processors, map/reduce script deployments and new scheduled script deployments no longer use queues, but pre-existing scheduled script deployments continue to use queues until the queues are removed (see SuiteCloud Processors – Supported Task Types).
 Be aware that the number of processors available may not be the same as the number of queues available. For more information, see SuiteCloud Plus Settings.
 */
export var processorCount: number;
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
    ACTION,
    BUNDLE_INSTALLATION,
    CLIENT,
    CONSOLRATEADJUSTOR,
    CSV_IMPORT,
    CUSTOMGLLINES,
    CUSTOM_MASSUPDATE,
    DEBUGGER,
    EMAIL_CAPTURE,
    MAP_REDUCE,
    PAYMENTGATEWAY,
    PORTLET,
    PROMOTIONS,
    RESTLET,
    SCHEDULED,
    SHIPPING_PARTNERS,
    SUITELET,
    TAX_CALCULATION,
    USEREVENT,
    USER_INTERFACE,
    WEBAPPLICATION,
    WEBSERVICES,
    WEBSTORE,
    WORKFLOW
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
