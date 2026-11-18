import type {File} from './file';
import type {Query} from './query';
import type {IOCIConfig} from './llm'
import type {DocumentType, Feature, Language} from './documentCapture';

interface CheckStatusOptions {
    taskId: string;
}

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

interface RecordActionTaskCreateOptions {
    taskType: TaskType.RECORD_ACTION
    action: string;
    condition: ActionCondition;
    params: {}[];
    recordType: string;
}

/** @since 2019.1 */
interface RecordActionTaskStatus {
    /** @since 2019.1 */
    readonly complete: number;
    /** @since 2019.1 */
    readonly errors: {};
    /** @since 2019.1 */
    readonly failed: number;
    /** @since 2019.1 */
    readonly pending: number;
    /** @since 2019.1 */
    readonly results: {};
    /** @since 2019.1 */
    readonly status: string;
    /** @since 2019.1 */
    readonly succeeded: number;
    readonly taskId: string;
}

/**
 * The properties of a record action task. Use the methods and properties for this object to submit a record action task into the task queue and to execute it asynchronously.
 * @since 2019.1
 */
interface RecordActionTask {
    /**
     * Submits a record action task script deployment for processing and returns its task ID.
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 50 units
     * @since 2019.1
     */
    submit(): string;
    /** @since 2019.1 */
    action: string;
    /** @since 2019.1 */
    condition: ActionCondition;
    id: string;
    /**
     * Property of type function that takes record ID and returns the parameter object for the specified record ID. Is to be used in conjunction with task.ActionCondition.
     * This parameter cannot be specified when RecordActionTask.params is specified.
     * @governance none
     * @since 2019.1
     */
    paramCallback?(taskId: string): {};
    /**
     * An array of parameter objects. Each object corresponds to one record ID of the record for which the action is to be executed.
     * The object has the following form: {recordId: 1, someParam: 'example1', otherParam: 'example2'}
     * @since 2019.1
     */
    params: {}[];
    /** @since 2019.1 */
    recordType: string;
}

/** Information about a dependent task, as found in the inboundDependencies property of a task. */
interface InboundDependency {
    /** The ID assigned to the dependent task. Included only after the parent task is submitted. */
    id?: string;
    /** The type of the dependent task (for example, task.ScheduledScriptTask). */
    type: string;
    /** The script ID of the dependent task. */
    scriptId: string;
    /** The script deployment ID of the dependent task. */
    deploymentId: string;
    /** The script parameters, as key-value pairs. */
    params?: {[key: string]: any};
}

interface AddInboundDependencyOptions {
    /** The script ID of the scheduled script record or map/reduce script record for the dependent task. */
    scriptId: string;
    /** The type of dependent task. This property uses one of the following values in the task.TaskType enum. */
    taskType: string;
    /** The script ID of the script deployment record for the dependent task. */
    deploymentId?: string;
    /** The parameters for the scheduled script or map/reduce script. */
    params?: {}
}

interface SuiteQLTaskCreateOptions {
    taskType: TaskType.SUITE_QL;
    /**
     * The internal ID of the CSV file to export search results to.
     * Oracle documents this as a number, but a string ID such as File.id from file.load() is also accepted here.
     */
    fileId?: number | string;
    /**
     * The path of the CSV file to export search results to.
     * This parameter is mutually exclusive with the options.fileId parameter. If you specify values for both parameters, an error occurs.
     */
    filePath?: string;
    params?: (string|boolean|number)[];
    query?: Query|string;
}

/**
 * The status of an asynchronous SuiteQL task (task.SuiteQLTask) in the NetSuite task queue.
 * @since 2020.2
 */
interface SuiteQLTaskStatus {
    /** @since 2020.2 */
    readonly fileId: number;
    /** @since 2020.2 */
    params: (string|boolean|number)[];
    /** @since 2020.2 */
    readonly query: string;
    /** @since 2020.2 */
    readonly status: string;
    /** @since 2020.2 */
    readonly taskId: string;
}

/** @since 2020.2 */
interface SuiteQLTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * Submits the SuiteQL task for asynchronous processing.
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
     * @governance none
     * @since 2020.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask | { taskType: TaskType, scriptId: string, deploymentId?: string, params?: {} } ): void;
    /** @since 2020.2 */
    query: string;
    /**
     * The internal ID of the CSV file to export results to.
     * Oracle documents this as a number, but a string ID such as File.id from file.load() is also accepted here.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both SuiteQLTask.fileId and SuiteQLTask.filePath.
     * @since 2020.2
     */
    fileId: number | string;
    /**
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both SuiteQLTask.fileId and SuiteQLTask.filePath.
     * @since 2020.2
     */
    filePath: string;
    /**
     * Key-value pairs that contain information about the dependent tasks added to the SuiteQL task.
     * Use this property to verify the properties of dependent tasks after you add the tasks using SuiteQLTask.addInboundDependency(options).
     * This property uses nested objects to store information about each dependent task.
     * A nested object is included for each dependent task added to the SuiteQL task, and these objects are referenced by their index (starting at 0).
     * Dependent tasks are indexed in the order they are added to the SuiteQL task.
     * Each nested object contains the task type, script ID, script deployment ID, and script parameters.
     * @since 2020.2
     */
    readonly inboundDependencies: Record<string, {id: string; type: TaskType.SCHEDULED_SCRIPT | TaskType.MAP_REDUCE, scriptId: string; deploymentId: string; params?: {}}>;
    /**
     * Parameters for the SuiteQL query.
     * @since 2020.2
     */
    params: (string|boolean|number)[];
}

interface SearchTaskCreateOptions {
    taskType: TaskType.SEARCH
    savedSearchId?: number | string;
    /**
     * The internal ID of the CSV file to export results to.
     * Oracle documents this as a number, but a string ID such as File.id from file.load() is also accepted here.
     */
    fileId?: number | string;
    filePath?: string;
}

interface QueryTaskCreateOptions {
    taskType: TaskType.QUERY
    query: Query;
    /**
     * The internal ID of the CSV file to export results to.
     * Oracle documents this as a number, but a string ID such as File.id from file.load() is also accepted here.
     */
    fileId?: number | string;
    filePath?: string;
}

/** @since 2020.2 */
interface QueryTaskStatus {
    /** @since 2020.2 */
    readonly fileId: number;
    /** @since 2020.2 */
    readonly query: string;
    /** @since 2020.2 */
    readonly status: string;
    /** @since 2020.2 */
    readonly taskId: string;
}

/** @since 2020.2 */
interface QueryTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * Key-value pairs containing information about the dependent tasks added to the query task, keyed by index (starting at 0).
     * @since 2020.2
     */
    readonly inboundDependencies: Record<string, InboundDependency>;
    /**
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
     * @governance none
     * @since 2020.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask): void;
    toString(): string;
    /** @since 2020.2 */
    query: Query;
    /**
     * The internal ID of the CSV file to export results to.
     * Oracle documents this as a number, but a string ID such as File.id from file.load() is also accepted here.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both QueryTask.fileId and QueryTask.filePath.
     * @since 2020.2
     */
    fileId: number | string;
    /**
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you specify values for both QueryTask.fileId and QueryTask.filePath.
     * @since 2020.2
     */
    filePath: string;
}

/** @since 2017.1 */
interface SearchTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
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
     * @governance none
     * @since 2018.2
     */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask): void;
    toString(): string;
    /** @since 2017.1 */
    savedSearchId: number;
    /**
     * The internal ID of the CSV file to export results to.
     * Oracle documents this as a number, but a string ID such as File.id from file.load() is also accepted here.
     * @throws {SuiteScriptError} UNSUPPORTED_COMBINATION_OF_PARAMETERS if both this property and SearchTask.filePath are set.
     * @since 2017.1
     */
    fileId: number | string;
    /**
     * @throws {SuiteScriptError} UNSUPPORTED_COMBINATION_OF_PARAMETERS if both this property and SearchTask.fileId are set.
     * @since 2017.1
     */
    filePath: string;
    /** @since 2018.2 */
    inboundDependencies: Record<string, Readonly<{id?: string; type: string; scriptId: string; deploymentId: string; params: any}>>;
}

/** @since 2017.1 */
interface SearchTaskStatus {
    toString(): string;
    /** @since 2017.1 */
    savedSearchId: number;
    /** @since 2017.1 */
    fileId: number;
    /** @since 2017.1 */
    status: TaskStatus | `${TaskStatus}`;
    /** @since 2017.1 */
    taskId: number;
}

interface CsvImportTaskCreateOptions {
    taskType: TaskType.CSV_IMPORT;
    importFile?: File | string;
    linkedFiles?: {[key: string]: any};
    mappingId?: number | string;
    name?: string;
    queueId?: number;
}

/** @since 2015.2 */
interface CsvImportTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 100 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** @since 2015.2 */
    importFile: File | string;
    /** @since 2015.2 */
    linkedFiles: any;
    /** @since 2015.2 */
    mappingId: number | string;
    /** @since 2015.2 */
    name: string;
    /** @since 2015.2 */
    queueId: number;
}

/** @since 2015.2 */
interface CsvImportTaskStatus {
    /**
     * The task ID associated with the specified task.
     */
    readonly taskId: string;
    toString(): string;
    /** @since 2015.2 */
    status: TaskStatus | `${TaskStatus}`;
}

interface EntityDeduplicationTaskCreateOptions {
    taskType: TaskType.ENTITY_DEDUPLICATION;
    dedupeMode?: DedupeMode;
    entityType?: string | DedupeEntityType;
    masterRecordId?: string | number;
    masterSelectionMode?: MasterSelectionMode;
    recordIds?: number[];
}

/** @since 2015.2 */
interface EntityDeduplicationTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 100 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** @since 2015.2 */
    dedupeMode: DedupeMode;
    /** @since 2015.2 */
    entityType: string;
    /** @since 2015.2 */
    masterRecordId: number | string;
    /** @since 2015.2 */
    masterSelectionMode: MasterSelectionMode;
    /** @since 2015.2 */
    recordIds: number[];
}

/** @since 2015.2 */
interface EntityDeduplicationTaskStatus {
    /**
     * The task ID associated with the specified task.
     */
    readonly taskId: string;
    toString(): string;
    /** @since 2015.2 */
    status: TaskStatus | `${TaskStatus}`;
}

interface MapReduceScriptTaskCreateOptions {
    taskType: TaskType.MAP_REDUCE;
    scriptId?: string;
    deploymentId?: string;
    params?: any;
}

/** @since 2015.2 */
interface MapReduceScriptTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 20 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** @since 2015.2 */
    scriptId: string;
    /** @since 2015.2 */
    deploymentId: string;
    /** @since 2015.2 */
    params: any;
}

/** @since 2015.2 */
interface MapReduceScriptTaskStatus {
    /**
     * @governance 25 units
     * @since 2015.2
     */
    getCurrentTotalSize(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getPendingMapCount(): number;
    /**
     * @governance 25 units
     * @since 2015.2
     */
    getPendingMapSize(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getPendingOutputCount(): number;
    /**
     * @governance 25 units
     * @since 2015.2
     */
    getPendingOutputSize(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getPendingReduceCount(): number;
    /**
     * @governance 25 units
     * @since 2015.2
     */
    getPendingReduceSize(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getPercentageCompleted(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getTotalMapCount(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getTotalReduceCount(): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    getTotalOutputCount(): number;
    toString(): string;
    /** @since 2015.2 */
    readonly scriptId: number | null;
    /** @since 2015.2 */
    readonly deploymentId: string | null;
    /** @since 2015.2 */
    readonly stage: MapReduceStage | `${MapReduceStage}` | null;
    /** @since 2015.2 */
    readonly status: TaskStatus | `${TaskStatus}` | null;
    readonly taskId: string;
}

interface ScheduledScriptTaskCreateOptions {
    taskType: TaskType.SCHEDULED_SCRIPT;
    scriptId?: string;
    deploymentId?: string;
    params?: any;
}

/** @since 2015.2 */
interface ScheduledScriptTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 20 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** @since 2015.2 */
    scriptId: string;
    /** @since 2015.2 */
    deploymentId: string;
    /** @since 2015.2 */
    params: any;
}

/** @since 2015.2 */
interface ScheduledScriptTaskStatus {
    /**
     * The task ID associated with the specified task.
     */
    readonly taskId: string;
    toString(): string;
    /** @since 2015.2 */
    scriptId: string;
    /** @since 2015.2 */
    deploymentId: string;
    /** @since 2015.2 */
    status: TaskStatus | `${TaskStatus}`;
}

interface WorkflowTriggerTaskCreateOptions {
    taskType: TaskType.WORKFLOW_TRIGGER;
    params?: any;
    recordId?: number | string;
    recordType?: string;
    workflowId?: number | string;
}

/** @since 2015.2 */
interface WorkflowTriggerTask {
    /**
     * The ID of the task.
     */
    readonly id: string;
    /**
     * @throws {SuiteScriptError} FAILED_TO_SUBMIT_JOB_REQUEST_1 if the task cannot be submitted.
     * @governance 20 units
     * @since 2015.2
     */
    submit(): string;
    toString(): string;
    /** @since 2015.2 */
    params: any;
    /** @since 2015.2 */
    recordId: number | string;
    /** @since 2015.2 */
    recordType: string;
    /** @since 2015.2 */
    workflowId: number | string;
}

/** @since 2015.2 */
interface WorkflowTriggerTaskStatus {
    /**
     * The task ID associated with the specified task.
     */
    readonly taskId: string;
    toString(): string;
    /** @since 2015.2 */
    status: TaskStatus | `${TaskStatus}`;
}

interface DocumentCaptureTaskCreateOptions {
    taskType: TaskType.DOCUMENT_CAPTURE;
    inputFile?: File;
    documentType?: DocumentType;
    outputFilePath?: string;
    features?: Feature[];
    language?: Language;
    /** @deprecated This object is no longer supported. Any values specified in this object are ignored. */
    ociConfig?: IOCIConfig;
    /** @deprecated Oracle does not document an addInboundDependency option for task.create(options). Use DocumentCaptureTask.addInboundDependency(options) on the created task instead. */
    addInboundDependency?: AddInboundDependencyOptions;
}

/** @since 2025.2 */
interface DocumentCaptureTask {
    /**
     * The ID of the task.
     * @since 2025.2
     */
    readonly id: string;
    /**
     * Key-value pairs containing information about the dependent tasks added to the document capture task, keyed by index (starting at 0).
     * @since 2025.2
     */
    readonly inboundDependencies: Record<string, InboundDependency>;
    /**
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
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the specified dependent task is not a scheduled script.
     * @governance none
     * @since 2025.2
     */
    addInboundDependency(dependency: ScheduledScriptTask): void;
    toString(): string;
    /**
     * @throws {SuiteScriptError} UNSUPPORTED_FILE_TYPE if the specified document is not in PDF, TIFF, JPG, or PNG format.
     * @since 2025.2
     */
    inputFile: File;
    /**
     * @throws {SuiteScriptError} INVALID_DOCUMENT_TYPE if the value is not included in the documentCapture.DocumentType enum.
     * @since 2025.2
     */
    documentType: DocumentType;
    /** @since 2025.2 */
    outputFilePath: string;
    /**
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the value includes values that are not in the documentCapture.Feature enum.
     * @since 2025.2
     */
    features: Feature[];
    /**
     * @throws {SuiteScriptError} INVALID_LANGUAGE if the value is not included in the documentCapture.Language enum.
     * @since 2025.2
     */
    language: Language;
    /**
     * @deprecated This object is no longer supported. Any values specified in this object are ignored.
     * @since 2025.2
     */
    ociConfig: IOCIConfig;
}

/** @since 2025.2 */
interface DocumentCaptureTaskStatus {
    /**
     * The task ID associated with the specified task.
     * @since 2025.2
     */
    readonly taskId: string;
    toString(): string;
    /** @since 2025.2 */
    status: TaskStatus | `${TaskStatus}`;
}

/**
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
 * @governance none
 * @since 2015.2
 */
export function checkStatus(options: CheckStatusOptions): ScheduledScriptTaskStatus | MapReduceScriptTaskStatus | CsvImportTaskStatus | EntityDeduplicationTaskStatus | WorkflowTriggerTaskStatus | SuiteQLTaskStatus | QueryTaskStatus | RecordActionTaskStatus | DocumentCaptureTaskStatus;

/**
 * Holds the string values for the possible record action conditions.
 * @since 2019.1
 */
declare enum ActionCondition {
    ALL_QUALIFIED_INSTANCES
}

/** @since 2015.2 */
export enum DedupeEntityType {
    CUSTOMER = "CUSTOMER",
    CONTACT = "CONTACT",
    VENDOR = "VENDOR",
    PARTNER = "PARTNER",
    LEAD = "LEAD",
    PROSPECT = "PROSPECT",
}
/** @since 2015.2 */
export enum DedupeMode {
    MERGE = "MERGE",
    DELETE = "DELETE",
    MAKE_MASTER_PARENT = "MAKE_MASTER_PARENT",
    MARK_AS_NOT_DUPES = "MARK_AS_NOT_DUPES",
}
/** @since 2015.2 */
export enum MapReduceStage {
    GET_INPUT = "GET_INPUT",
    MAP = "MAP",
    SHUFFLE = "SHUFFLE",
    REDUCE = "REDUCE",
    SUMMARIZE = "SUMMARIZE"
}
/** @since 2015.2 */
export enum MasterSelectionMode {
    CREATED_EARLIEST = "CREATED_EARLIEST",
    MOST_RECENT_ACTIVITY = "MOST_RECENT_ACTIVITY",
    MOST_POPULATED_FIELDS = "MOST_POPULATED_FIELDS",
    SELECT_BY_ID = "SELECT_BY_ID",
}
/** @since 2015.2 */
export enum TaskStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED",
}
/** @since 2015.2 */
export enum TaskType {
    SCHEDULED_SCRIPT = "SCHEDULED_SCRIPT",
    MAP_REDUCE = "MAP_REDUCE",
    CSV_IMPORT = "CSV_IMPORT",
    ENTITY_DEDUPLICATION = "ENTITY_DEDUPLICATION",
    WORKFLOW_TRIGGER = "WORKFLOW_TRIGGER",
    SEARCH = "SEARCH",
    RECORD_ACTION = "RECORD_ACTION",
    SUITE_QL = "SUITEQL",
    QUERY = "QUERY",
    DOCUMENT_CAPTURE = "DOCUMENT_CAPTURE",
}
