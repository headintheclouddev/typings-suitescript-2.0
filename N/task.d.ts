import type {File} from './file';
import type {Query} from './query';
import type {IOCIConfig} from './llm'
import type {DocumentType, Feature, Language} from './documentCapture';

// N/task Module: create tasks and place them in the internal NetSuite scheduling or task queue.
// Tasks are always triggered asynchronously. Supported script types: Server scripts.

interface CheckStatusOptions {
    /** Unique ID of the task to check the status of (the value returned by the task's submit() method). */
    taskId: string;
}

/** Key-value pairs that override static script parameter field values on a script deployment record. */
type ScriptParameters = Record<string, unknown>;

/** A task status value, either as the task.TaskStatus enum or its raw string value. */
type TaskStatusValue = TaskStatus | `${TaskStatus}`;

type TaskCreateOptions =
    CsvImportTaskCreateOptions
    | EntityDeduplicationTaskCreateOptions
    | MapReduceScriptTaskCreateOptions
    | ScheduledScriptTaskCreateOptions
    | WorkflowTriggerTaskCreateOptions
    | QueryTaskCreateOptions
    | RecordActionTaskCreateOptions
    | SuiteQLTaskCreateOptions
    | SearchTaskCreateOptions
    | DocumentCaptureTaskCreateOptions;

/**
 * A parameter object for a record action task. Each object corresponds to one record ID of the record for which the action is to be executed.
 * For example: `{recordId: 1, someParam: 'example1', otherParam: 'example2'}`
 */
interface RecordActionParams {
    /** The internal ID of the record for which the action is to be executed. */
    recordId: number | string;
    [paramName: string]: unknown;
}

interface RecordActionTaskCreateOptions {
    taskType: TaskType.RECORD_ACTION
    /** The ID of the action to be invoked. */
    action?: string;
    /** The condition used to select record IDs of records for which the action is to be executed. Use the task.ActionCondition enum. */
    condition?: ActionCondition;
    /** An array of parameter objects. Each object corresponds to one record ID of the record for which the action is to be executed. */
    params?: RecordActionParams[];
    /** The record type on which the action is to be performed. */
    recordType?: string;
}

/**
 * Encapsulates the status of a record action task. Use task.checkStatus(options) to get this object.
 * @since 2019.1
 */
interface RecordActionTaskStatus {
    /**
     * The number of record actions that are already executed, either failed or successful.
     * @since 2019.1
     */
    readonly complete: number;
    /**
     * The error details of failed action executions, keyed by record instance ID.
     * Note: Oracle's description says each value has code and message properties, but Oracle's syntax sample shows name and message.
     * @since 2019.1
     */
    readonly errors: Record<string, { code?: string; name?: string; message: string }>;
    /**
     * The number of record actions with a failed status.
     * @since 2019.1
     */
    readonly failed: number;
    /**
     * The number of record actions with a pending status.
     * @since 2019.1
     */
    readonly pending: number;
    /**
     * The results of successfully executed record action tasks, keyed by task instance ID.
     * @since 2019.1
     */
    readonly results: Record<string, unknown>;
    /**
     * Represents the record action task status. Returns a value from the task.TaskStatus enum.
     * @since 2019.1
     */
    readonly status: TaskStatusValue;
    /**
     * The number of record actions with a successful status.
     * @since 2019.1
     */
    readonly succeeded: number;
    /** The task ID associated with the specified task. */
    readonly taskId: string;
}

/**
 * The properties of a record action task. Use the methods and properties for this object to submit a record action task into the task queue and to execute it asynchronously.
 * @since 2019.1
 */
interface RecordActionTask {
    /**
     * Submits a record action task script deployment for processing and returns its task ID.
     * The task executes the specified record action for each record ID provided in the parameters.
     * @returns The task ID.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 50 units
     * @since 2019.1
     */
    submit(): string;
    /**
     * The ID of the action to be invoked.
     * @since 2019.1
     */
    action: string;
    /**
     * The condition used to select record IDs of records for which the action is to be executed. Use the task.ActionCondition enum.
     * Used in conjunction with RecordActionTask.paramCallback.
     * @since 2019.1
     */
    condition: ActionCondition;
    /** The ID of the task. */
    id: string;
    /**
     * Function that takes a record ID and returns the parameter object for the specified record ID. Is to be used in conjunction with task.ActionCondition.
     * This parameter cannot be specified when RecordActionTask.params is specified.
     * If not specified, this default callback is used: `function(v) { return { recordId: v }; }`
     * @governance none
     * @since 2019.1
     */
    paramCallback?(recordId: number | string): Record<string, unknown>;
    /**
     * An array of parameter objects. Each object corresponds to one record ID of the record for which the action is to be executed.
     * The object has the following form: {recordId: 1, someParam: 'example1', otherParam: 'example2'}
     * @since 2019.1
     */
    params: RecordActionParams[];
    /**
     * The record type on which the action is to be performed. For a list of record types, see record.Type.
     * @since 2019.1
     */
    recordType: string;
}

/** Defines a dependent scheduled script or map/reduce script task by its script ID instead of a task object. */
interface AddInboundDependencyOptions {
    /** The script ID of the scheduled script record or map/reduce script record for the dependent task. */
    scriptId: string;
    /** The type of dependent task. Use task.TaskType.SCHEDULED_SCRIPT or task.TaskType.MAP_REDUCE. */
    taskType: TaskType.SCHEDULED_SCRIPT | TaskType.MAP_REDUCE | 'SCHEDULED_SCRIPT' | 'MAP_REDUCE';
    /** The script ID of the script deployment record for the dependent task. If not specified, an available deployment is selected automatically. */
    deploymentId?: string;
    /** The parameters for the scheduled script or map/reduce script. */
    params?: ScriptParameters;
}

/** Defines a dependent scheduled script task by its script ID instead of a task object. Used by DocumentCaptureTask.addInboundDependency(options). */
interface AddScheduledScriptDependencyOptions extends AddInboundDependencyOptions {
    /** The type of dependent task. Only task.TaskType.SCHEDULED_SCRIPT is supported. */
    taskType: TaskType.SCHEDULED_SCRIPT | 'SCHEDULED_SCRIPT';
}

/** Information about a dependent task added to an asynchronous task with addInboundDependency(). */
interface InboundDependency {
    /** The ID of the dependent task. Available after the parent task is submitted. */
    readonly id?: string;
    /** The type of the dependent task, for example "task.ScheduledScriptTask" or "task.MapReduceScriptTask". */
    readonly type: string;
    /** The script ID of the dependent script. */
    readonly scriptId: string;
    /** The script ID of the deployment record of the dependent script. */
    readonly deploymentId: string;
    /** The parameters for the dependent script. */
    readonly params?: ScriptParameters;
}

interface SuiteQLTaskCreateOptions {
    taskType: TaskType.SUITE_QL;
    /** The internal ID of the CSV file to export query results to. */
    fileId?: number;
    /**
     * The path of the CSV file to export query results to.
     * This parameter is mutually exclusive with the options.fileId parameter. If you specify values for both parameters, an error occurs.
     */
    filePath?: string;
    /**
     * An array of parameters for the SuiteQL query. The parameters are substituted into the query string when you submit the task.
     * Security note: use params (with ? placeholders) instead of concatenating untrusted values into the SuiteQL string.
     */
    params?: (string|boolean|number)[];
    /** The SuiteQL query to run, as a string. */
    query?: string;
}

/**
 * The status of an asynchronous SuiteQL task (task.SuiteQLTask) in the NetSuite task queue. Use task.checkStatus(options) to get this object.
 * @since 2020.2
 */
interface SuiteQLTaskStatus {
    /**
     * Internal ID of the CSV file that SuiteQL query results are exported to.
     * @since 2020.2
     */
    readonly fileId: number;
    /**
     * Parameters for the SuiteQL query.
     * @since 2020.2
     */
    readonly params: (string|boolean|number)[];
    /**
     * SuiteQL query definition for the SuiteQL task.
     * @since 2020.2
     */
    readonly query: string;
    /**
     * Status of the SuiteQL task. Returns a task.TaskStatus enum value.
     * @since 2020.2
     */
    readonly status: TaskStatusValue;
    /**
     * ID of the submitted SuiteQL task. This is the same task ID that SuiteQLTask.submit() returns.
     * @since 2020.2
     */
    readonly taskId: string;
}

/**
 * The properties of a SuiteQL task. Use the methods and properties of this object to submit a SuiteQL task into the NetSuite task queue.
 * @since 2020.2
 */
interface SuiteQLTask {
    /**
     * Submits the SuiteQL task for asynchronous processing and returns the task ID.
     * When the submission is successful, the IDs of any dependent tasks are added to SuiteQLTask.inboundDependencies.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_DEPENDENCY_MR_ALREADY_SUBMITTED if a dependent map/reduce script task is already submitted and is not complete.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_DEPENDENCY_MR_INCORRECT_STATUS if the deployment status of the dependent map/reduce script task is not 'Not Scheduled'.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_DEPENDENCY_SS_ALREADY_SUBMITTED if a dependent scheduled script task is already submitted and is not complete.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_DEPENDENCY_SS_INCORRECT_STATUS if the deployment status of the dependent scheduled script task is not 'Not Scheduled'.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_DEPLOYMENT_FOR_DEPENDENCY if a script deployment record for the dependent task is not available.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_MULTIPLE_DEPENDENCIES if the same dependent task is added more than one time.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_SCRIPT_ID_NOT_FOUND if the specified dependent task is not found.
     * @throws {SuiteScriptError} ASYNC_SUITEQL_SUITEQL_ID_NOT_FOUND if a SuiteQL task with the specified script ID is not found.
     * @throws {SuiteScriptError} CANNOT_RESUBMIT_SUBMITTED_ASYNC_SUITEQL_TASK if the SuiteQL task was already submitted and completed successfully.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the SuiteQL task cannot be submitted due to an unexpected error.
     * @throws {SuiteScriptError} MUST_IDENTIFY_A_FILE if SuiteQLTask.filePath specifies a folder and not a file.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required property is not specified.
     * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if SuiteQLTask.fileId or SuiteQLTask.filePath references a file that does not exist.
     * @throws {SuiteScriptError} YOU_DO_NOT_HAVE_ACCESS_TO_THE_MEDIA_ITEM_YOU_SELECTED if you do not have permission to access the file specified by SuiteQLTask.fileId or SuiteQLTask.filePath.
     * @governance 100 units
     * @since 2020.2
     */
    submit(): string;
    /**
     * Adds a scheduled script task or map/reduce script task as a dependent task to the SuiteQL task.
     * Dependent tasks are processed automatically when the SuiteQL task is complete. You can add only one dependent task per call.
     * @param dependency A task.ScheduledScriptTask or task.MapReduceScriptTask object, or an object that describes the dependent task.
     * @governance none
     * @since 2020.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask | AddInboundDependencyOptions): void;
    /**
     * SuiteQL query definition for the SuiteQL task, as a string.
     * @since 2020.2
     */
    query: string;
    /**
     * Internal ID of the CSV file to export SuiteQL query results to. Mutually exclusive with SuiteQLTask.filePath.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both SuiteQLTask.fileId and SuiteQLTask.filePath.
     * @since 2020.2
     */
    fileId: number;
    /**
     * Path of the CSV file to export SuiteQL query results to. Mutually exclusive with SuiteQLTask.fileId.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both SuiteQLTask.fileId and SuiteQLTask.filePath.
     * @since 2020.2
     */
    filePath: string;
    /** The ID of the task. */
    id: string;
    /**
     * Key-value pairs that contain information about the dependent tasks added to the SuiteQL task, keyed by index (starting at 0) in the order they were added.
     * Each nested object contains the task type, script ID, script deployment ID, and script parameters. The ID of each dependent task is added after the SuiteQL task is submitted.
     * @since 2020.2
     */
    readonly inboundDependencies: Record<string, InboundDependency>;
    /**
     * Parameters for the SuiteQL query. The parameters are substituted into the SuiteQL query string when you submit the task.
     * @since 2020.2
     */
    params: (string|boolean|number)[];
}

interface SearchTaskCreateOptions {
    taskType: TaskType.SEARCH
    /** The internal ID of the saved search to be executed during the task. */
    savedSearchId?: number | string;
    /** The internal ID of the CSV file to export search results to. Mutually exclusive with options.filePath. */
    fileId?: number;
    /** The path of the CSV file to export search results to. Mutually exclusive with options.fileId. */
    filePath?: string;
}

interface QueryTaskCreateOptions {
    taskType: TaskType.QUERY
    /** The query.Query object that represents the query to run. */
    query: Query;
    /** The internal ID of the CSV file to export query results to. Mutually exclusive with options.filePath. */
    fileId?: number;
    /** The path of the CSV file to export query results to. Mutually exclusive with options.fileId. */
    filePath?: string;
}

/**
 * The status of a query task placed into the NetSuite task queue. Use task.checkStatus(options) to get this object.
 * @since 2020.2
 */
interface QueryTaskStatus {
    /**
     * Internal ID of the CSV file that query results are exported to.
     * @since 2020.2
     */
    readonly fileId: number;
    /**
     * Query definition (a query.Query object) for the submitted query task.
     * @since 2020.2
     */
    readonly query: Query;
    /**
     * Status of the submitted query task. Returns a task.TaskStatus enum value.
     * @since 2020.2
     */
    readonly status: TaskStatusValue;
    /**
     * ID of the submitted query task. This is the same task ID that QueryTask.submit() returns.
     * @since 2020.2
     */
    readonly taskId: string;
}

/**
 * The properties of a query task. Use the methods and properties of this object to submit a query task into the NetSuite task queue.
 * @since 2020.2
 */
interface QueryTask {
    /**
     * Submits the query task for asynchronous processing and returns the task ID.
     * When the submission is successful, the IDs of any dependent tasks are added to QueryTask.inboundDependencies.
     * @throws {SuiteScriptError} ASYNC_QUERY_DEPENDENCY_MR_ALREADY_SUBMITTED if a dependent map/reduce script task is already submitted and is not complete.
     * @throws {SuiteScriptError} ASYNC_QUERY_DEPENDENCY_MR_INCORRECT_STATUS if the deployment status of the dependent map/reduce script task is not 'Not Scheduled'.
     * @throws {SuiteScriptError} ASYNC_QUERY_DEPENDENCY_SS_ALREADY_SUBMITTED if a dependent scheduled script task is already submitted and is not complete.
     * @throws {SuiteScriptError} ASYNC_QUERY_DEPENDENCY_SS_INCORRECT_STATUS if the deployment status of the dependent scheduled script task is not 'Not Scheduled'.
     * @throws {SuiteScriptError} ASYNC_QUERY_DEPLOYMENT_FOR_DEPENDENCY if a script deployment record for the dependent task is not available.
     * @throws {SuiteScriptError} ASYNC_QUERY_MULTIPLE_DEPENDENCIES if the same dependent task is added more than one time.
     * @throws {SuiteScriptError} ASYNC_QUERY_QUERY_ID_NOT_FOUND if a query task with the specified script ID is not found.
     * @throws {SuiteScriptError} ASYNC_QUERY_SCRIPT_ID_NOT_FOUND if the specified dependent task is not found.
     * @throws {SuiteScriptError} CANNOT_RESUBMIT_SUBMITTED_ASYNC_QUERY_TASK if the query task was already submitted and completed successfully.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the query task cannot be submitted due to an unexpected error.
     * @throws {SuiteScriptError} MUST_IDENTIFY_A_FILE if QueryTask.filePath specifies a folder and not a file.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required property is not specified.
     * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if QueryTask.fileId or QueryTask.filePath references a file that does not exist.
     * @throws {SuiteScriptError} YOU_DO_NOT_HAVE_ACCESS_TO_THE_MEDIA_ITEM_YOU_SELECTED if you do not have permission to access the file specified by QueryTask.fileId or QueryTask.filePath.
     * @governance 100 units
     * @since 2020.2
     */
    submit(): string;
    /**
     * Adds a scheduled script task or map/reduce script task as a dependent task to the query task.
     * Dependent tasks are processed automatically when the query task is complete. You can add only one dependent task per call.
     * @param dependency A task.ScheduledScriptTask or task.MapReduceScriptTask object, or an object that describes the dependent task.
     * @governance none
     * @since 2020.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask | AddInboundDependencyOptions): void;
    toString(): string;
    /**
     * Query definition (a query.Query object) for the query task.
     * @since 2020.2
     */
    query: Query;
    /**
     * Internal ID of the CSV file to export query results to. Mutually exclusive with QueryTask.filePath.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both QueryTask.fileId and QueryTask.filePath.
     * @since 2020.2
     */
    fileId: number;
    /**
     * Path of the CSV file to export query results to. Mutually exclusive with QueryTask.fileId.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both QueryTask.fileId and QueryTask.filePath.
     * @since 2020.2
     */
    filePath: string;
    /** The ID of the task. */
    id: string;
    /**
     * Key-value pairs that contain information about the dependent tasks added to the query task, keyed by index (starting at 0) in the order they were added.
     * @since 2020.2
     */
    readonly inboundDependencies: Record<string, InboundDependency>;
}

/**
 * The properties of a search task. Use this object to submit a search task into the task queue, execute it asynchronously, and persist search results.
 * @since 2017.1
 */
interface SearchTask {
    /**
     * Directs NetSuite to initiate the asynchronous search task and returns a unique ID for the task.
     * When the submission is successful, the internal IDs of any dependent scripts are added to SearchTask.inboundDependencies.
     * @returns The task ID.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @throws {SuiteScriptError} YOU_DO_NOT_HAVE_ACCESS_TO_THE_MEDIA_ITEM_YOU_SELECTED if you do not have permission to access the file.
     * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if the file references a file that does not exist.
     * @throws {SuiteScriptError} MUST_IDENTIFY_A_FILE if the path specifies a folder and not a file.
     * @throws {SuiteScriptError} CANNOT_RESUBMIT_SUBMITTED_ASYNC_SEARCH_TASK if the search task was already submitted and completed successfully.
     * @throws {SuiteScriptError} ASYNC_SEARCH_DEPENDENCY_MR_ALREADY_SUBMITTED if a dependent map/reduce script is already submitted and is not complete.
     * @throws {SuiteScriptError} ASYNC_SEARCH_DEPENDENCY_MR_INCORRECT_STATUS if the deployment status of the dependent map/reduce script is not 'Not Scheduled'.
     * @throws {SuiteScriptError} ASYNC_SEARCH_DEPENDENCY_SS_ALREADY_SUBMITTED if a dependent scheduled script is already submitted and is not complete.
     * @throws {SuiteScriptError} ASYNC_SEARCH_DEPENDENCY_SS_INCORRECT_STATUS if the deployment status of the dependent scheduled script is not 'Not Scheduled'.
     * @throws {SuiteScriptError} ASYNC_SEARCH_DEPLOYMENT_FOR_DEPENDENCY if a deployment record for the dependent script is not available.
     * @throws {SuiteScriptError} ASYNC_SEARCH_MULTIPLE_DEPENDENCIES if the same dependent script is added more than one time.
     * @throws {SuiteScriptError} ASYNC_SEARCH_SCRIPT_ID_NOT_FOUND if the specified dependent script is not found.
     * @throws {SuiteScriptError} ASYNC_SEARCH_SEARCH_ID_NOT_FOUND if the search task with the specified search ID is not found.
     * @governance 100 units
     * @since 2017.1
     */
    submit(): string;
    /**
     * Adds a scheduled script task or map/reduce script task to the search task as a dependent script.
     * Dependent scripts are processed automatically when the search task is complete. You can add only one dependent script per call.
     * @param dependency The task.ScheduledScriptTask or task.MapReduceScriptTask to add as a dependent script.
     * @governance none
     * @since 2018.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask): void;
    toString(): string;
    /**
     * ID of the saved search to be executed during the task.
     * @since 2017.1
     */
    savedSearchId: number;
    /**
     * ID of the CSV file to export search results into. Either this property or SearchTask.filePath must be set.
     * @throws {SuiteScriptError} UNSUPPORTED_COMBINATION_OF_PARAMETERS if both this property and SearchTask.filePath are set.
     * @since 2017.1
     */
    fileId: number;
    /**
     * Path of the CSV file to export search results into. Either this property or SearchTask.fileId must be set.
     * @throws {SuiteScriptError} UNSUPPORTED_COMBINATION_OF_PARAMETERS if both this property and SearchTask.fileId are set.
     * @since 2017.1
     */
    filePath: string;
    /** The ID of the task. */
    id: string;
    /**
     * Key-value pairs to describe the dependent scripts added to the search task, keyed by index (starting at 0) in the order they were added.
     * @since 2018.2
     */
    readonly inboundDependencies: Record<string, InboundDependency>;
}

/**
 * The status of an asynchronous search task (task.SearchTask) placed into the NetSuite task queue. Use task.checkStatus(options) to get this object.
 * @since 2017.1
 */
interface SearchTaskStatus {
    toString(): string;
    /**
     * ID of the saved search executed during the task.
     * @since 2017.1
     */
    readonly savedSearchId: number;
    /**
     * ID of the CSV file into which search results are exported.
     * @since 2017.1
     */
    readonly fileId: number;
    /**
     * Status of the asynchronous search task. Returns a task.TaskStatus enum value.
     * @since 2017.1
     */
    readonly status: TaskStatusValue;
    /**
     * ID of the task.SearchTask object. SearchTask.submit() returns this ID.
     * @since 2017.1
     */
    readonly taskId: string;
}

interface CsvImportTaskCreateOptions {
    taskType: TaskType.CSV_IMPORT;
    /** A CSV file to import. Use a file.File object or a string that represents the CSV text to be imported. */
    importFile?: File | string;
    /**
     * A map of key-value pairs that sets the data to be imported in a linked file for a multi-file import job.
     * The key is the internal ID of the record sublist for which data is being imported and the value is either a file.File object or the raw CSV data to import.
     */
    linkedFiles?: Record<string, File | string>;
    /** The internal ID (as a number) or script ID (as a string) of a saved import map created using the Import Assistant. */
    mappingId?: number | string;
    /** The name for the CSV import task. This name appears on the CSV Import Job Status page. */
    name?: string;
    /** Overrides the Queue Number property under Advanced Options on the Import Options page of the Import Assistant. Requires a SuiteCloud Plus license. */
    queueId?: number;
}

/**
 * The properties of a CSV import task. Use the methods and properties for this object to submit a CSV import task into the task queue and asynchronously import record data into NetSuite.
 * CSV imports performed within scripts are subject to the application limit of 25,000 records.
 * @since 2015.2
 */
interface CsvImportTask {
    /**
     * Directs NetSuite to place a CSV import task into the NetSuite task queue and returns a unique ID for the task.
     * Throws errors resulting from inline validation of CSV file data before the import begins. You can use this method only in bundle installation scripts, scheduled scripts, and RESTlets.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 100 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** The ID of the task. */
    id: string;
    /**
     * CSV file to import. Use a file.File object or a string that represents the CSV text to be imported.
     * @since 2015.2
     */
    importFile: File | string;
    /**
     * A map of key-value pairs that sets the data to be imported in a linked file for a multi-file import job, keyed by sublist internal ID.
     * Each value is either a file.File object or the raw CSV data to import.
     * @since 2015.2
     */
    linkedFiles: Record<string, File | string>;
    /**
     * Script ID or internal ID of the saved import map that you created when you ran the Import Assistant.
     * @since 2015.2
     */
    mappingId: number | string;
    /**
     * Name for the CSV import task. In the UI, this name appears on the CSV Import Job Status page.
     * @since 2015.2
     */
    name: string;
    /**
     * Overrides the Queue Number property under Advanced Options on the Import Options page of the Import Assistant. Available only with a SuiteCloud Plus license.
     * @since 2015.2
     */
    queueId: number;
}

/**
 * The status of a CSV import task placed into the NetSuite scheduling queue. Use task.checkStatus(options) to get this object.
 * @since 2015.2
 */
interface CsvImportTaskStatus {
    toString(): string;
    /**
     * Status for a CSV import task. Returns a task.TaskStatus enum value.
     * @since 2015.2
     */
    readonly status: TaskStatusValue;
    /** The task ID associated with the specified task. */
    readonly taskId: string;
}

interface EntityDeduplicationTaskCreateOptions {
    taskType: TaskType.ENTITY_DEDUPLICATION;
    /** Sets the mode for merging or deleting duplicate records. Use the task.DedupeMode enum. */
    dedupeMode?: DedupeMode;
    /** Sets the type of entity on which you want to merge duplicate records. Use the task.DedupeEntityType enum. If you specify CUSTOMER, prospects and leads are included automatically. */
    entityType?: string | DedupeEntityType;
    /** The ID of the master record. You must also set masterSelectionMode to SELECT_BY_ID, or NetSuite ignores this setting. */
    masterRecordId?: string | number;
    /** Determines which of the duplicate records to keep, or selects the master record by ID. Use the task.MasterSelectionMode enum. */
    masterSelectionMode?: MasterSelectionMode;
    /** The internal IDs of the records to perform the merge or delete operation on. */
    recordIds?: number[];
}

/**
 * All the properties of a merge duplicate records task request. Use the methods and properties of this object to submit a merge duplicate record job task into the NetSuite task queue.
 * You can submit only 200 records in a single merge duplicate records task.
 * @since 2015.2
 */
interface EntityDeduplicationTask {
    /**
     * Directs NetSuite to place the merge duplicate records task into the NetSuite task queue and returns a unique ID for the task.
     * @returns The task ID.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 100 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /**
     * The mode in which to merge or delete duplicate records. Use values from the task.DedupeMode enum.
     * @since 2015.2
     */
    dedupeMode: DedupeMode;
    /**
     * The type of entity on which you want to merge duplicate records. Use a task.DedupeEntityType enum to set the value.
     * If you set entityType to CUSTOMER, prospects and leads are included automatically.
     * @since 2015.2
     */
    entityType: string;
    /** The ID of the task. */
    id: string;
    /**
     * The ID of the master record to use in the merge. You must also set masterSelectionMode to SELECT_BY_ID, or NetSuite ignores this setting.
     * @since 2015.2
     */
    masterRecordId: number | string;
    /**
     * Determines which of the duplicate records to keep, or selects the master record by ID. Use values from the task.MasterSelectionMode enum.
     * @since 2015.2
     */
    masterSelectionMode: MasterSelectionMode;
    /**
     * Number array of record internal IDs to perform the merge or delete operation on.
     * @since 2015.2
     */
    recordIds: number[];
}

/**
 * The status of a merge duplicate record task placed into the NetSuite task queue. Use task.checkStatus(options) to get this object.
 * @since 2015.2
 */
interface EntityDeduplicationTaskStatus {
    toString(): string;
    /**
     * Status for a merge duplicate record task. Returns a task.TaskStatus enum value.
     * @since 2015.2
     */
    readonly status: TaskStatusValue;
    /** The task ID associated with the specified task. */
    readonly taskId: string;
}

interface MapReduceScriptTaskCreateOptions {
    taskType: TaskType.MAP_REDUCE;
    /** The internal ID (as a number) or script ID (as a string) for the map/reduce script record. */
    scriptId?: number | string;
    /** The script ID (as a string) of the script deployment record. */
    deploymentId?: string;
    /** Key-value pairs that override static script parameter field values on the script deployment record. */
    params?: ScriptParameters;
}

/**
 * The properties of a map/reduce script deployment. Use this object to programmatically submit a script deployment for processing.
 * @since 2015.2
 */
interface MapReduceScriptTask {
    /**
     * Submits a map/reduce script deployment for processing and returns the task ID.
     * A map/reduce script can be submitted only if there is no unfinished task for the same script ID and deployment ID, so no task ID is returned when a map/reduce script resubmits itself.
     * @returns The task ID, except as noted above.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 20 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /**
     * Internal ID (as a number), or script ID (as a string), for the map/reduce script record.
     * @since 2015.2
     */
    scriptId: number | string;
    /**
     * Script ID (as a string), for the script deployment record for a map/reduce script.
     * @since 2015.2
     */
    deploymentId: string;
    /** The ID of the task. */
    id: string;
    /**
     * Object that represents key-value pairs that override static script parameter field values on the script deployment record.
     * @since 2015.2
     */
    params: ScriptParameters;
}

/**
 * The status of a map/reduce script deployment that has been submitted for processing. Use task.checkStatus(options) to get this object.
 * @since 2015.2
 */
interface MapReduceScriptTaskStatus {
    /**
     * Returns the total size in bytes of all stored work in progress by a task.MapReduceScriptTask.
     * @governance 25 units
     * @since 2015.2
     */
    getCurrentTotalSize(): number;
    /**
     * Returns the total number of records or rows not yet processed by the map stage.
     * @governance 10 units
     * @since 2015.2
     */
    getPendingMapCount(): number;
    /**
     * Returns the total number of bytes not yet processed by the map stage, as a component of total size.
     * @governance 25 units
     * @since 2015.2
     */
    getPendingMapSize(): number;
    /**
     * Returns the total number of records or rows not yet processed.
     * @governance 10 units
     * @since 2015.2
     */
    getPendingOutputCount(): number;
    /**
     * Returns the total size in bytes of all key-value pairs written as output, as a component of total size.
     * @governance 25 units
     * @since 2015.2
     */
    getPendingOutputSize(): number;
    /**
     * Returns the total number of records or rows not yet processed by the reduce stage.
     * @governance 10 units
     * @since 2015.2
     */
    getPendingReduceCount(): number;
    /**
     * Returns the total number of bytes not yet processed by the reduce stage, as a component of total size.
     * @governance 25 units
     * @since 2015.2
     */
    getPendingReduceSize(): number;
    /**
     * Returns the current percentage complete for the current stage. The input and summarize stages are either 0% or 100% complete at any time.
     * @governance 10 units
     * @since 2015.2
     */
    getPercentageCompleted(): number;
    /**
     * Returns the total number of records or rows passed as input to the map stage.
     * @governance 10 units
     * @since 2015.2
     */
    getTotalMapCount(): number;
    /**
     * Returns the total number of record or row inputs to the reduce stage.
     * @governance 10 units
     * @since 2015.2
     */
    getTotalReduceCount(): number;
    /**
     * Returns the total number of key-value pairs passed as inputs to the summarize stage.
     * @governance 10 units
     * @since 2015.2
     */
    getTotalOutputCount(): number;
    toString(): string;
    /**
     * Internal ID for a map/reduce script record associated with a specific task.MapReduceScriptTask.
     * @since 2015.2
     */
    readonly scriptId: number | null;
    /**
     * Script ID for a script deployment record associated with a specific task.MapReduceScriptTask.
     * @since 2015.2
     */
    readonly deploymentId: string | null;
    /**
     * The current stage of processing for a map/reduce script deployment instance. Returns a task.MapReduceStage enum value.
     * @since 2015.2
     */
    readonly stage: MapReduceStage | `${MapReduceStage}` | null;
    /**
     * Status of a map/reduce script deployment that was submitted for processing. Returns a task.TaskStatus enum value.
     * @since 2015.2
     */
    readonly status: TaskStatusValue | null;
    /** The task ID associated with the specified task. */
    readonly taskId: string;
}

interface ScheduledScriptTaskCreateOptions {
    taskType: TaskType.SCHEDULED_SCRIPT;
    /** The internal ID (as a number) or script ID (as a string) for the scheduled script record. */
    scriptId?: number | string;
    /** The script ID (as a string) of the script deployment record. */
    deploymentId?: string;
    /** Key-value pairs that override static script parameter field values on the script deployment record. */
    params?: ScriptParameters;
}

/**
 * All the properties of a scheduled script task in SuiteScript. Use this object to place a scheduled script deployment into the NetSuite scheduling queue.
 * @since 2015.2
 */
interface ScheduledScriptTask {
    /**
     * Directs NetSuite to place a scheduled script deployment into the NetSuite scheduling queue and returns a unique ID for the task.
     * The scheduled script deployment must have a status of Not Scheduled. A scheduled script can be submitted only if there is no unfinished task for the same script ID and deployment ID.
     * @returns The task ID, except as noted above.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 20 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /**
     * Internal ID (as a number), or script ID (as a string) for the script record associated with a task.ScheduledScriptTask object.
     * @since 2015.2
     */
    scriptId: number | string;
    /**
     * Script ID (as a string), for the script deployment record associated with a task.ScheduledScriptTask object.
     * @since 2015.2
     */
    deploymentId: string;
    /**
     * The ID of the task.
     * @since 2015.2
     */
    id: string;
    /**
     * Object with key-value pairs that override the static script parameter field values on the script deployment.
     * @since 2015.2
     */
    params: ScriptParameters;
}

/**
 * The properties and status of a scheduled script placed into the NetSuite scheduling queue. Use task.checkStatus(options) to get this object.
 * @since 2015.2
 */
interface ScheduledScriptTaskStatus {
    toString(): string;
    /**
     * Internal ID for a script record associated with a specific task.ScheduledScriptTask object.
     * @since 2015.2
     */
    readonly scriptId: number;
    /**
     * Script ID for a script deployment record associated with a specific task.ScheduledScriptTask object.
     * @since 2015.2
     */
    readonly deploymentId: string;
    /**
     * Status for a scheduled script task. Returns a task.TaskStatus enum value.
     * @since 2015.2
     */
    readonly status: TaskStatusValue;
    /** The task ID associated with the specified task. */
    readonly taskId: string;
}

interface WorkflowTriggerTaskCreateOptions {
    taskType: TaskType.WORKFLOW_TRIGGER;
    /** Key-value pairs to set default values on fields specific to the workflow (workflow definition fields, or workflow and state custom fields). */
    params?: ScriptParameters;
    /** The internal ID of the base record. */
    recordId?: number | string;
    /** The record type of the workflow definition base record, such as customer, salesorder, or lead. */
    recordType?: string;
    /** The internal ID (as a number) or script ID (as a string) for the workflow definition. */
    workflowId?: number | string;
}

/**
 * All the properties required to asynchronously initiate a workflow.
 * The task is not queued if an identical instance of the workflow (same recordType, recordId, and workflowId) is currently executing or already queued.
 * @since 2015.2
 */
interface WorkflowTriggerTask {
    /**
     * Directs NetSuite to place the asynchronous workflow initiation task into the NetSuite scheduling queue and returns a unique ID for the task.
     * @returns The task ID.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 20 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** The ID of the task. */
    id: string;
    /**
     * Key-value pairs to set default values on fields specific to the workflow (workflow definition fields, or workflow and state custom fields).
     * @since 2015.2
     */
    params: ScriptParameters;
    /**
     * Internal ID of the workflow definition base record. For example, 55 or 124.
     * @since 2015.2
     */
    recordId: number | string;
    /**
     * Record type of the workflow definition base record. For example, customer, salesorder, or lead.
     * @since 2015.2
     */
    recordType: string;
    /**
     * Internal ID (as a number), or script ID (as a string), for the workflow definition.
     * @since 2015.2
     */
    workflowId: number | string;
}

/**
 * The status of an asynchronous workflow initiation task placed into the NetSuite task queue. Use task.checkStatus(options) to get this object.
 * @since 2015.2
 */
interface WorkflowTriggerTaskStatus {
    toString(): string;
    /**
     * Status for an asynchronous workflow placed in the NetSuite task queue. Returns a value from the task.TaskStatus enum.
     * @since 2015.2
     */
    readonly status: TaskStatusValue;
    /** The task ID associated with the specified task. */
    readonly taskId: string;
}

interface DocumentCaptureTaskCreateOptions {
    taskType: TaskType.DOCUMENT_CAPTURE;
    /** The document to extract content from. */
    inputFile?: File;
    /** The document type. Use the documentCapture.DocumentType enum. */
    documentType?: DocumentType;
    /** The path of the JSON file to export document capture results to. */
    outputFilePath?: string;
    /** The features to extract from the document. Use the documentCapture.Feature enum. Defaults to TEXT_EXTRACTION and TABLE_EXTRACTION. */
    features?: Feature[];
    /** The language of the document. Use the documentCapture.Language enum. Defaults to English. */
    language?: Language;
    /** @deprecated This object is no longer supported. Any values specified in this object are ignored. */
    ociConfig?: IOCIConfig;
    /**
     * @deprecated Oracle does not document an addInboundDependency option for task.create(options). Use DocumentCaptureTask.addInboundDependency(options) on the created task instead.
     */
    addInboundDependency?: AddInboundDependencyOptions;
}

/**
 * An asynchronous document capture task. Use the methods and properties of this object to submit a document capture task into the NetSuite task queue and execute it asynchronously.
 * @since 2025.2
 */
interface DocumentCaptureTask {
    /**
     * Submits the document capture task for asynchronous processing and returns the task ID.
     * When the submission is successful, the IDs of any dependent tasks are added to DocumentCaptureTask.inboundDependencies.
     * @throws {SuiteScriptError} CANNOT_RESUBMIT_SUBMITTED_DOCUMENT_CAPTURE_TASK if the document capture task was already submitted and completed successfully.
     * @throws {SuiteScriptError} DOCUMENT_CAPTURE_DEPENDENCY_SS_ALREADY_SUBMITTED if a dependent scheduled script task is already submitted and is not complete.
     * @throws {SuiteScriptError} DOCUMENT_CAPTURE_DEPENDENCY_SS_INCORRECT_STATUS if the deployment status of the dependent scheduled script task is not 'Not Scheduled'.
     * @throws {SuiteScriptError} DOCUMENT_CAPTURE_DEPLOYMENT_FOR_DEPENDENCY if a script deployment record for the dependent task is not available.
     * @throws {SuiteScriptError} DOCUMENT_CAPTURE_MULTIPLE_DEPENDENCIES if the same dependent task is added more than one time.
     * @throws {SuiteScriptError} DOCUMENT_CAPTURE_SCRIPT_ID_NOT_FOUND if the specified dependent task is not found.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the document capture task cannot be submitted due to an unexpected error.
     * @throws {SuiteScriptError} MUST_IDENTIFY_A_FILE if DocumentCaptureTask.outputFilePath specifies a folder and not a file.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required property is not specified.
     * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if DocumentCaptureTask.inputFile references a file that does not exist.
     * @throws {SuiteScriptError} YOU_DO_NOT_HAVE_ACCESS_TO_THE_MEDIA_ITEM_YOU_SELECTED if you do not have permission to access the file specified by DocumentCaptureTask.inputFile.
     * @governance 100 units
     * @since 2025.2
     */
    submit(): string;
    /**
     * Adds a scheduled script task to the document capture task as a dependent task. Only scheduled scripts are supported.
     * Dependent tasks are processed automatically when the document capture task is complete. You can add only one dependent task per call.
     * @param dependency A task.ScheduledScriptTask object, or an object that describes the dependent scheduled script task.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the specified dependent task is not a scheduled script.
     * @governance none
     * @since 2025.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | AddScheduledScriptDependencyOptions): void;
    toString(): string;
    /**
     * The ID of the task.
     * @since 2025.2
     */
    id: string;
    /**
     * The document to extract content from, as a file.File object that represents a file in the File Cabinet.
     * @throws {SuiteScriptError} UNSUPPORTED_FILE_TYPE if the specified document is not in PDF, TIFF, JPG, or PNG format.
     * @since 2025.2
     */
    inputFile: File;
    /**
     * The document type. Use a value from the documentCapture.DocumentType enum.
     * @throws {SuiteScriptError} INVALID_DOCUMENT_TYPE if the value is not included in the documentCapture.DocumentType enum.
     * @since 2025.2
     */
    documentType: DocumentType;
    /**
     * The path of the JSON file in the File Cabinet to export document capture results to.
     * @since 2025.2
     */
    outputFilePath: string;
    /**
     * The features to extract from the document (such as fields, tables, or text). Use values from the documentCapture.Feature enum.
     * Defaults to TEXT_EXTRACTION and TABLE_EXTRACTION.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the value includes values that are not in the documentCapture.Feature enum.
     * @since 2025.2
     */
    features: Feature[];
    /**
     * The language of the document. Use a value from the documentCapture.Language enum. Defaults to English.
     * @throws {SuiteScriptError} INVALID_LANGUAGE if the value is not included in the documentCapture.Language enum.
     * @since 2025.2
     */
    language: Language;
    /**
     * @since 2025.2
     * @deprecated This object is no longer supported. Any values specified in this object are ignored.
     */
    ociConfig: IOCIConfig;
    /**
     * Key-value pairs that contain information about the dependent tasks added to the document capture task, keyed by index (starting at 0) in the order they were added.
     * @since 2025.2
     */
    readonly inboundDependencies: Record<string, InboundDependency>;
}

/**
 * The status of a document capture task placed into the NetSuite task queue. Use task.checkStatus(options) to get this object.
 * @since 2025.2
 */
interface DocumentCaptureTaskStatus {
    toString(): string;
    /**
     * The status of the submitted document capture task. Returns a task.TaskStatus enum value.
     * @since 2025.2
     */
    readonly status: TaskStatusValue;
    /**
     * ID of the submitted document capture task. This is the same task ID that DocumentCaptureTask.submit() returns.
     * @since 2025.2
     */
    readonly taskId: string;
}

/**
 * Creates a task object for the specified task type and returns the object.
 * Use the task.TaskType enum to set options.taskType.
 *
 * Supported script types: Server scripts.
 * @governance none
 * @since 2015.2
 */
export function create(options: CsvImportTaskCreateOptions):  CsvImportTask;
export function create(options: EntityDeduplicationTaskCreateOptions): EntityDeduplicationTask;
export function create(options: MapReduceScriptTaskCreateOptions): MapReduceScriptTask;
export function create(options: ScheduledScriptTaskCreateOptions): ScheduledScriptTask;
export function create(options: WorkflowTriggerTaskCreateOptions): WorkflowTriggerTask;
export function create(options: SearchTaskCreateOptions): SearchTask;
export function create(options: QueryTaskCreateOptions): QueryTask;
export function create(options: RecordActionTaskCreateOptions): RecordActionTask;
export function create(options: SuiteQLTaskCreateOptions): SuiteQLTask;
export function create(options: DocumentCaptureTaskCreateOptions): DocumentCaptureTask;
/**
 * Returns a task status object associated with a specific task ID.
 * Note: Oracle's checkStatus page does not list task.DocumentCaptureTaskStatus as a return type, but the task.DocumentCaptureTask pages say this method returns it for document capture task IDs.
 *
 * Supported script types: Server scripts.
 * @governance none
 * @since 2015.2
 */
export function checkStatus(options: CheckStatusOptions): ScheduledScriptTaskStatus | MapReduceScriptTaskStatus | CsvImportTaskStatus | EntityDeduplicationTaskStatus | WorkflowTriggerTaskStatus | SearchTaskStatus | SuiteQLTaskStatus | QueryTaskStatus | RecordActionTaskStatus | DocumentCaptureTaskStatus;

/**
 * Holds the string values for the possible record action conditions. This enum is returned by RecordActionTask.condition.
 * @since 2019.1
 */
export enum ActionCondition {
    ALL_QUALIFIED_INSTANCES
}

/**
 * Holds the string values for entity types for which you can merge duplicate records with task.EntityDeduplicationTask.
 * @since 2015.2
 */
export enum DedupeEntityType {
    CUSTOMER,
    CONTACT,
    VENDOR,
    PARTNER,
    LEAD,
    PROSPECT,
}
/**
 * Holds the string values for the available deduplication modes when merging duplicate records with task.EntityDeduplicationTask.
 * @since 2015.2
 */
export enum DedupeMode {
    MERGE,
    DELETE,
    MAKE_MASTER_PARENT,
    MARK_AS_NOT_DUPES,
}
/**
 * Holds the string values for possible stages in task.MapReduceScriptTask for a map/reduce script. This enum is returned by MapReduceScriptTaskStatus.stage.
 * @since 2015.2
 */
export enum MapReduceStage {
    GET_INPUT = "GET_INPUT",
    MAP = "MAP",
    SHUFFLE = "SHUFFLE",
    REDUCE = "REDUCE",
    SUMMARIZE = "SUMMARIZE"
}
/**
 * Holds the string values for supported master selection modes when merging duplicate records with task.EntityDeduplicationTask.
 * @since 2015.2
 */
export enum MasterSelectionMode {
    CREATED_EARLIEST,
    MOST_RECENT_ACTIVITY,
    MOST_POPULATED_FIELDS,
    SELECT_BY_ID,
}
/**
 * Holds the string values for possible task statuses.
 * @since 2015.2
 */
export enum TaskStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED",
}
/**
 * Holds the string values for the types of task objects you can create using task.create(options).
 * @since 2015.2
 */
export enum TaskType {
    SCHEDULED_SCRIPT = "SCHEDULED_SCRIPT",
    MAP_REDUCE = "MAP_REDUCE",
    CSV_IMPORT = "CSV_IMPORT",
    ENTITY_DEDUPLICATION = "ENTITY_DEDUPLICATION",
    WORKFLOW_TRIGGER = "WORKFLOW_TRIGGER",
    SEARCH = "SEARCH",
    RECORD_ACTION = "RECORD_ACTION",
    SUITE_QL = "SUITE_QL",
    QUERY = "QUERY",
    DOCUMENT_CAPTURE = "DOCUMENT_CAPTURE"
}
