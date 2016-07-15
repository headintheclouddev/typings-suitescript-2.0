interface EventType {
    beforeLoad: string;
    beforeSubmit: string;
    afterSubmit: string;
}

interface CreateOptions {
    name: string;
    message: string;
    notifyOff?: boolean;
}

/**
 * Encapsulates a SuiteScript error thrown by any script type that is not a user event script.
 */
export interface SuiteScriptError {
    toString(): string;
    id: string;
    message: string;
    name: string;
    stack: string[];
}
    
/**
 * Encapsulates a SuiteScript error thrown by a user event script.
 */
export interface UserEventError {
    toString(): string;
    eventType: EventType;
    id: string;
    message: string;
    name: string;
    recordId: string;
    stack: string[];
}

/**
 * Creates a new error.SuiteScriptError or error.UserEventError object.
 */
export function create(options: CreateOptions): SuiteScriptError | UserEventError;
