interface EventType {
    beforeLoad:   string;
    beforeSubmit: string;
    afterSubmit:  string;
}

interface CreateOptions {
    /** A user-defined name (error code). */
    name: string;
    /** The error message displayed. This value displays on the Execution Log, in the Details column. */
    message: string | Error | SuiteScriptError | UserEventError;
    /** Sets whether email notification is suppressed. The default value is false. */
    notifyOff?: boolean;
}

/** Encapsulates a SuiteScript error thrown by any script type that is not a user event script. */
export interface SuiteScriptError {
    /** Error ID that is automatically generated when a new error is created. */
    readonly id: string;
    /** Text that displays on the SuiteScript Execution Log, in the Details column. */
    readonly message: string;
    /** A user-defined name (error code). */
    readonly name: string;
    /** A list of method calls that the script is executing when the error is thrown. The most recently executed method is listed at the top. */
    readonly stack: string[];
    /** The cause of the error message. */
    readonly cause: any;
    /** Whether email notification is suppressed. */
    notifyOff?: boolean;
}
    
/** Encapsulates a SuiteScript error thrown by a user event script. */
export interface UserEventError {
    /** The user event type. Holds one of the following values: beforeLoad, beforeSubmit, afterSubmit. */
    readonly eventType: EventType;
    /**  Error ID that is automatically generated when a new error is created. */
    readonly id: string;
    /** Text that displays on the SuiteScript Execution Log, in the Details column. */
    readonly message: string;
    /** A user-defined name (error code). */
    readonly name: string;
    /** The internal ID of the submitted record that triggered the script. This property only holds a value when the error is thrown by an afterSubmit user event script. */
    readonly recordId: string;
    /** A list of method calls that the script is executing when the error is thrown. The most recently executed method is listed at the top. */
    readonly stack: string[];
}

/** Creates a new error.SuiteScriptError or error.UserEventError object. */
export function create<T extends SuiteScriptError | UserEventError = SuiteScriptError>(options: CreateOptions): T;
