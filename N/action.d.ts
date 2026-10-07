/**
 * Use the N/action module to execute business logic to update the state of records in view mode.
 * Changes made to records with N/action APIs are persisted in the database immediately.
 * To execute business logic on records in edit mode, use the record macro APIs in N/record.
 * Oracle's N/action module page says governance for action APIs varies by action and record type, but the individual
 * execute method pages list their governance as None. See Supported Record Actions.
 * Supported script types: Client and server scripts. The promise versions are supported in client scripts only.
 */

import type {MacroNotification, Type} from './record';
import type {RecordActionTaskStatus} from './task';

/**
 * Action arguments. The values that are required vary by action. The recordId is always required,
 * unless the action object is qualified (returned by action.get(options) or action.find(options) with a recordId).
 */
interface ActionParams {
    /** The internal ID of the record on which the action is to be performed. */
    recordId: number | string;
    /** Other action-specific parameters, such as `note` for the timebill approve action. */
    [param: string]: unknown;
}

/**
 * Arguments for executing an action object directly. recordId is optional when the action object is qualified.
 * Oracle's parameter table calls this options.params.recordId, but Oracle's syntax examples pass recordId directly, such as `myAction({ recordId: 1 })`.
 */
interface ActionExecuteOptions {
    /** The internal ID of the record on which the action is to be performed. Required unless the action object is qualified. */
    recordId?: number | string;
    /** Other action-specific parameters. */
    [param: string]: unknown;
}

/**
 * The plain JavaScript object returned when an action is executed, in the form `{notifications: [], response: {}}`.
 * If the action fails, it is listed in the notifications property. If the action executes successfully, the notifications property is usually empty.
 */
export interface ActionResult<TResponse = { [key: string]: any }> {
    /** Notifications returned from the action. */
    notifications: MacroNotification[];
    /** The action-specific response data, such as `{ id: 5 }` for inventory count actions. */
    response: TResponse;
}

interface ActionBulkOptions {
    /**
     * An array of parameter objects. Each object corresponds to one record ID of the record for which the action is to be executed,
     * for example `{recordId: 1, note: 'example'}`. Mutually exclusive with options.condition and options.paramCallback.
     */
    params?: ActionParams[];
    /**
     * The condition used to select record IDs of records for which the action is to be executed.
     * Only the action.ALL_QUALIFIED_INSTANCES constant is currently supported.
     */
    condition?: string;
    /**
     * Function (or the name of a function) that takes a record ID and returns the parameter object for that record ID. Used with options.condition.
     * Oracle documents the type as string (the name of the function).
     */
    paramCallback?: string | ((recordId: number) => ActionParams);
}

interface ActionExecuteFunctionOnAction {
    /**
     * Executes the action and returns the action results in an object.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance none (per the method page; the N/action module page says governance varies by action and record type)
     * @since 2018.2
     */
    <TResponse = { [key: string]: any }>(options?: ActionExecuteOptions): ActionResult<TResponse>;
    /**
     * Executes the action asynchronously and returns the action results in an object. Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance none (per the method page; the N/action module page says governance varies by action and record type)
     * @since 2018.2
     */
    promise<TResponse = { [key: string]: any }>(options?: ActionExecuteOptions): Promise<ActionResult<TResponse>>;
}

/**
 * Encapsulates a NetSuite record action. Returned by action.get(options) and action.find(options).
 * An Action can be called directly, like a function: `myAction(options)` and `myAction.promise(options)` are equivalent to
 * `myAction.execute(options)` and `myAction.execute.promise(options)`.
 * Supported script types: Client and server scripts.
 * @since 2018.2
 */
interface Action extends ActionExecuteFunctionOnAction {
    /**
     * The ID of the action. For a list of action IDs, see Supported Record Actions.
     * @since 2018.2
     */
    id: string;
    /**
     * The type of the record on which the action is to be performed.
     * @since 2018.2
     */
    recordType: string;
    /**
     * The action label.
     * @since 2018.2
     */
    label: string;
    /**
     * The action description.
     * @since 2018.2
     */
    description: string;
    /**
     * The action parameters.
     * @since 2018.2
     */
    parameters: { [parameterId: string]: unknown };
    /**
     * Executes the action and returns the action results in an object.
     * @governance none (per the method page; the N/action module page says governance varies by action and record type)
     * @since 2018.2
     */
    execute: ActionExecuteFunctionOnAction;
    /**
     * Executes an asynchronous bulk record action and returns its task ID for status queries with action.getBulkStatus(options).
     * The options.params parameter is mutually exclusive to options.condition and options.paramCallback.
     *
     * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
     * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance 50 units
     * @since 2019.1
     */
    executeBulk(options: ActionBulkOptions): string;
}

interface ExecuteBulkOptions extends ActionBulkOptions {
    /** The record type. For a list of record types, see record.Type. */
    recordType: Type | string;
    /** The action ID. */
    id: string;
}

interface ExecuteOptions {
    /** The record type. For a list of record types, see record.Type. */
    recordType: Type | string;
    /** The action ID. For a list of action IDs, see Supported Record Actions. */
    id: string;
    /** Action arguments. */
    params: ActionParams;
}

interface FindGetOptions {
    /** The record type. For a list of record types, see record.Type. */
    recordType: Type | string;
    /** The record instance ID. */
    recordId?: string | number;
    /** The ID of the action. Required for action.get(options); optional for action.find(options). */
    id?: string;
}

interface GetOptions extends FindGetOptions {
    /** The ID of the action. For a list of action IDs, see Supported Record Actions. */
    id: string;
}

interface GetBulkStatusOptions {
    /** The task ID returned by a previous action.executeBulk(options) call. */
    taskId: string;
}

interface ActionFindFunction {
    (options: FindGetOptions): { [actionId: string]: Action };
    /**
     * The promise version of action.find(options). Supported in client scripts only.
     * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record ID does not exist
     * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
     * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.recordType is missing or undefined
     * @governance none
     * @since 2018.2
     */
    promise(options: FindGetOptions): Promise<{ [actionId: string]: Action }>;
}

interface ActionGetFunction {
    (options: GetOptions): Action;
    /**
     * The promise version of action.get(options). Supported in client scripts only.
     * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record instance does not exist
     * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
     * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance none
     * @since 2018.2
     */
    promise(options: GetOptions): Promise<Action>;
}

interface ActionExecuteFunction {
    <TResponse = { [key: string]: any }>(options: ExecuteOptions): ActionResult<TResponse>;
    /**
     * The promise version of action.execute(options). Supported in client scripts only.
     * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record instance does not exist
     * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
     * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance none (per the method page; the N/action module page says governance varies by action and record type)
     * @since 2018.2
     */
    promise<TResponse = { [key: string]: any }>(options: ExecuteOptions): Promise<ActionResult<TResponse>>;
}

/**
 * Returns an executable record action for the specified record type.
 * If the recordId parameter is specified, the action object is returned only if the specified action can be executed on the specified record instance.
 *
 * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record instance does not exist
 * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
 * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
 * @governance none
 * @since 2018.2
 */
export const get: ActionGetFunction;

/**
 * Performs a search for available record actions.
 * If only the recordType parameter is specified, all actions available for the record type are returned.
 * If the recordId parameter is also specified, then only actions that qualify for execution on the given record instance are returned.
 * If the id parameter is specified, then only the action with the specified action ID is returned.
 *
 * This method returns a plain JavaScript object of NetSuite record actions available for the record type, indexed by action ID.
 * The object contains one or more action.Action objects. If there are no available actions for the specified record type, an empty object is returned.
 *
 * If the recordId is specified in this call, the actions that are found are considered qualified. You do not have to provide the recordId to execute a qualified action.
 *
 * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record ID does not exist
 * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
 * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.recordType is missing or undefined
 * @governance none
 * @since 2018.2
 */
export const find: ActionFindFunction;

/**
 * Executes the record action and returns the action results in a plain JavaScript object.
 * If the action fails, it is listed in the results object’s notifications property.
 * If the action executes successfully, the notifications property is usually empty.
 *
 * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record instance does not exist
 * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
 * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
 * @governance none (per the method page; the N/action module page says governance varies by action and record type)
 * @since 2018.2
 */
export const execute: ActionExecuteFunction;

/**
 * Executes an asynchronous bulk record action and returns its task ID for status queries with action.getBulkStatus(options).
 * The options.params parameter is mutually exclusive to options.condition and options.paramCallback.
 *
 * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
 * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.recordType is missing or undefined
 * @governance 50 units
 * @since 2019.1
 */
export const executeBulk: (options: ExecuteBulkOptions) => string;

/**
 * Returns the current status of action.executeBulk(options) for the specified task ID. The bulk execution status is returned in a status object.
 *
 * @governance none
 * @since 2019.1
 */
export function getBulkStatus(options: GetBulkStatusOptions): RecordActionTaskStatus;

/**
 * The condition to use with options.condition in action.executeBulk(options) and Action.executeBulk(options)
 * to execute the action on all qualifying record instances. Only works if the record action implements the findInstances method,
 * such as approve on the timebill and timesheet records.
 * Oracle has no reference page for this constant; it is typed as string because options.condition is documented as a string.
 */
export const ALL_QUALIFIED_INSTANCES: string;
