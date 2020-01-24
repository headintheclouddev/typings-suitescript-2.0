interface Action {
  id:          string;
  recordType:  string;
  label:       string;
  description: string;
  parameters:  Object;
}

interface ExecuteBulkOptions {
  recordType: string;
  /** The action ID */
  id:     string;
  params: { recordId: string };
  condition: string;
  paramCallback: string;
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
  promise(options: FindGetOptions): Promise<Object>;
}

interface ActionGetFunction {
  (options: FindGetOptions): Action;
  promise(options: FindGetOptions): Promise<Action>;
}

interface ActionExecuteFunction {
  (options: ExecuteOptions): Object;
  promise(options: ExecuteOptions): Promise<Object>;
}

/**
 * Returns an executable record action for the specified record type.
 * If the recordId parameter is specified, the action object is returned only if the specified action can be executed on the specified record instance.
 */
export var get: ActionGetFunction;

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
 */
export var find: ActionFindFunction;

/**
 * Executes the record action and returns the action results in a plain JavaScript object.
 * If the action fails, it is listed in the results object’s notifications property.
 * If the action executes successfully, the notifications property is usually empty.
 */
export var execute: ActionExecuteFunction;

/**
 * Executes an asynchronous bulk record action and returns its task ID for status queries with action.getBulkStatus(options).
 * The options.params parameter is mutually exclusive to options.condition and options.paramCallback.
 */
export const executeBulk: (options: ExecuteBulkOptions) => string;
