/** @since 2018.2 */
interface Action {
  /** @since 2018.2 */
  id:          string;
  /** @since 2018.2 */
  recordType:  string;
  /** @since 2018.2 */
  label:       string;
  /** @since 2018.2 */
  description: string;
  /** @since 2018.2 */
  parameters:  Object;
}

interface ExecuteBulkOptions {
  recordType: string;
  /** The action ID */
  id:     string;
  /**
   * An array of parameter objects. Each object corresponds to one record ID of the record for which the action is to be executed.
   * The recordId parameter is always required. Other parameters are optional and are specific to the particular action.
   * This parameter is mutually exclusive to options.condition and options.paramCallback.
   */
  params?: { recordId: number | string, [param: string]: any }[];
  /**
   * The condition used to select record IDs of records for which the action is to be executed.
   * Only the action.ALL_QUALIFIED_INSTANCES constant is currently supported.
   */
  condition?: string;
  /**
   * Function that takes record ID and returns the parameter object for the specified record ID.
   * Oracle documents the type of this parameter as string, even though the description calls it a function.
   */
  paramCallback?: string;
}

interface ExecuteOptions {
  recordType: string;
  /** The action ID */
  id:     string;
  params: { recordId: string };
}

interface FindGetOptions {
  recordType: string;
  recordId?:  string;
  /** The ID of the action. */
  id?: string;
}

interface ActionFindFunction {
  (options: FindGetOptions): Object;
  /**
   * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record ID does not exist
   * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
   * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
   * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.recordType is missing or undefined
   * @governance none
   * @since 2018.2
   */
  promise(options: FindGetOptions): Promise<Object>;
}

interface ActionGetFunction {
  (options: FindGetOptions): Action;
  /**
   * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record instance does not exist
   * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
   * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
   * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
   * @governance none
   * @since 2018.2
   */
  promise(options: FindGetOptions): Promise<Action>;
}

interface ActionExecuteFunction {
  (options: ExecuteOptions): Object;
  /**
   * @throws {SuiteScriptError} RECORD_DOES_NOT_EXIST if the specified record instance does not exist
   * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
   * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
   * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
   * @governance none (per the method page; the N/action module page says governance varies by action and record type)
   * @since 2018.2
   */
  promise(options: ExecuteOptions): Promise<Object>;
}

/**
 * Returns an executable record action for the specified record type.
 * If the recordId parameter is specified, the action object is returned only if the specified action can be executed on the specified record instance.
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
 * This method returns a plain JavaScript object of NetSuite record actions available for the record type.
 * The object contains one or more action.Action objects. If there are no available actions for the specified record type, an empty object is returned.
 *
 * If the recordId is specified in this call, the actions that are found are considered qualified. You do not have to provide the recordId to execute a qualified action.
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
 * @throws {SuiteScriptError} SSS_INVALID_ACTION_ID if the action does not exist on the record type, or cannot be executed on the record instance
 * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the record type is invalid
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.recordType is missing or undefined
 * @governance 50 units
 * @since 2019.1
 */
export const executeBulk: (options: ExecuteBulkOptions) => string;
