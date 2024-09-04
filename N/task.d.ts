import {File} from './file';
import {Query} from './query';

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
    | SearchTaskCreateOptions;

interface RecordActionTaskCreateOptions {
    taskType: TaskType.RECORD_ACTION
    action: string;
    condition: ActionCondition;
    params: {}[];
    recordType: string;
}

interface RecordActionTaskStatus {
    readonly complete: number;
    readonly errors: {};
    readonly failed: number;
    readonly pending: number;
    readonly results: {};
    readonly status: string;
    readonly succeeded: number;
    readonly taskId: string;
}

/** The properties of a record action task. Use the methods and properties for this object to submit a record action task into the task queue and to execute it asynchronously. */
interface RecordActionTask {
    /** Submits a record action task script deployment for processing and returns its task ID. */
    submit(): string;
    action: string;
    condition: ActionCondition;
    id: string;
    /**
     * Property of type function that takes record ID and returns the parameter object for the specified record ID. Is to be used in conjunction with task.ActionCondition.
     * This parameter cannot be specified when RecordActionTask.params is specified.
     */
    paramCallback?(taskId: string): {};
    /**
     * An array of parameter objects. Each object corresponds to one record ID of the record for which the action is to be executed.
     * The object has the following form: {recordId: 1, someParam: 'example1', otherParam: 'example2'}
     */
    params: {}[];
    recordType: string;
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
    /** The internal ID of the CSV file to export search results to. */
    fileId?: number;
    /**
     * The path of the CSV file to export search results to.
     * This parameter is mutually exclusive with the options.fileId parameter. If you specify values for both parameters, an error occurs.
     */
    filePath?: string;
    params?: (string|boolean|number)[];
    query?: Query|string;
}

/** The status of an asynchronous SuiteQL task (task.SuiteQLTask) in the NetSuite task queue. */
interface SuiteQLTaskStatus {
    readonly fileId: number;
    params: (string|boolean|number)[];
    readonly query: string;
    readonly status: string;
    readonly taskId: string;
}

interface SuiteQLTask {
    /** Submits the SuiteQL task for asynchronous processing. */
    submit(): string;
    /** Adds a scheduled script task or map/reduce script task as a dependent task to the SuiteQL task. */
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask | { taskType: TaskType, scriptId: string, deploymentId?: string, params?: {} } ): void;
    query: string;
    fileId: number;
    filePath: string;
    /**
     * Key-value pairs that contain information about the dependent tasks added to the SuiteQL task.
     * Use this property to verify the properties of dependent tasks after you add the tasks using SuiteQLTask.addInboundDependency(options).
     * This property uses nested objects to store information about each dependent task.
     * A nested object is included for each dependent task added to the SuiteQL task, and these objects are referenced by their index (starting at 0).
     * Dependent tasks are indexed in the order they are added to the SuiteQL task.
     * Each nested object contains the task type, script ID, script deployment ID, and script parameters.
     */
    readonly inboundDependencies: {}[];
    /** Parameters for the SuiteQL query. */
    params: (string|boolean|number)[];
}

interface SearchTaskCreateOptions {
    taskType: TaskType.SEARCH
    savedSearchId?: number | string;
    fileId?: number;
    filePath?: string;
}

interface QueryTaskCreateOptions {
    taskType: TaskType.QUERY
    query: Query;
    fileId?: number;
    filePath?: string;
}

interface QueryTaskStatus {
    readonly fileId: number;
    readonly query: string;
    readonly status: string;
    readonly taskId: string;
}

interface QueryTask {
    submit(): string;
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask): void;
    toString(): string;
    query: Query;
    fileId: number;
    filePath: string;
}

interface SearchTask {
    submit(): string;
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask): void;
    toString(): string;
    savedSearchId: number;
    fileId: number;
    filePath: string;
    inboundDependencies: Record<string, Readonly<{id?: string; type: string; scriptId: string; deploymentId: string; params: any}>>;
}

interface SearchTaskStatus {
    toString(): string;
    savedSearchId: number;
    fileId: number;
    status: TaskStatus;
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

interface CsvImportTask {
    submit(): string;
    toString(): string;
    importFile: File | string;
    linkedFiles: any;
    mappingId: number | string;
    name: string;
    queueId: number;
}

interface CsvImportTaskStatus {
    toString(): string;
    status: TaskStatus;
}

interface EntityDeduplicationTaskCreateOptions {
    taskType: TaskType.ENTITY_DEDUPLICATION;
    dedupeMode?: DedupeMode;
    entityType?: string | DedupeEntityType;
    masterRecordId?: string | number;
    masterSelectionMode?: MasterSelectionMode;
    recordIds?: number[];
}

interface EntityDeduplicationTask {
    submit(): string;
    toString(): string;
    dedupeMode: DedupeMode;
    entityType: string;
    masterRecordId: number | string;
    masterSelectionMode: MasterSelectionMode;
    recordIds: number[];
}

interface EntityDeduplicationTaskStatus {
    toString(): string;
    status: TaskStatus;
}

interface MapReduceScriptTaskCreateOptions {
    taskType: TaskType.MAP_REDUCE;
    scriptId?: string;
    deploymentId?: string;
    params?: any;
}

interface MapReduceScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: any;
}

interface MapReduceScriptTaskStatus {
    getCurrentTotalSize(): number;
    getPendingMapCount(): number;
    getPendingMapSize(): number;
    getPendingOutputCount(): number;
    getPendingOutputSize(): number;
    getPendingReduceCount(): number;
    getPendingReduceSize(): number;
    getPercentageCompleted(): number;
    getTotalMapCount(): number;
    getTotalReduceCount(): number;
    getTotalOutputCount(): number;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    stage: MapReduceStage;
    status: TaskStatus;
}

interface ScheduledScriptTaskCreateOptions {
    taskType: TaskType.SCHEDULED_SCRIPT;
    scriptId?: string;
    deploymentId?: string;
    params?: any;
}

interface ScheduledScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: any;
}

interface ScheduledScriptTaskStatus {
    toString(): string;
    scriptId: string;
    deploymentId: string;
    status: TaskStatus;
}

interface WorkflowTriggerTaskCreateOptions {
    taskType: TaskType.WORKFLOW_TRIGGER;
    params?: any;
    recordId?: number | string;
    recordType?: string;
    workflowId?: number | string;
}

interface WorkflowTriggerTask {
    submit(): string;
    toString(): string;
    params: any;
    recordId: number | string;
    recordType: string;
    workflowId: number | string;
}

interface WorkflowTriggerTaskStatus {
    toString(): string;
    status: TaskStatus;
}

export function create(options: CsvImportTaskCreateOptions):  CsvImportTask;
export function create(options: EntityDeduplicationTaskCreateOptions): EntityDeduplicationTask;
export function create(options: MapReduceScriptTaskCreateOptions): MapReduceScriptTask;
export function create(options: ScheduledScriptTaskCreateOptions): ScheduledScriptTask;
export function create(options: WorkflowTriggerTaskCreateOptions): WorkflowTriggerTask;
export function create(options: SearchTaskCreateOptions): SearchTask;
export function create(options: QueryTaskCreateOptions): QueryTask;
export function create(options: RecordActionTaskCreateOptions): RecordActionTask;
export function create(options: SuiteQLTaskCreateOptions): SuiteQLTask;
export function checkStatus(options: CheckStatusOptions): ScheduledScriptTaskStatus | MapReduceScriptTaskStatus | CsvImportTaskStatus | EntityDeduplicationTaskStatus | WorkflowTriggerTaskStatus | SuiteQLTaskStatus | QueryTaskStatus | RecordActionTaskStatus;

/** Holds the string values for the possible record action conditions. */
declare enum ActionCondition {
    ALL_QUALIFIED_INSTANCES
}

export enum DedupeEntityType {
    CUSTOMER,
    CONTACT,
    VENDOR,
    PARTNER,
    LEAD,
    PROSPECT,
}
export enum DedupeMode {
    MERGE,
    DELETE,
    MAKE_MASTER_PARENT,
    MARK_AS_NOT_DUPES,
}
export enum MapReduceStage {
    GET_INPUT,
    MAP,
    SHUFFLE,
    REDUCE,
    SUMMARIZE,
}
export enum MasterSelectionMode {
    CREATED_EARLIEST,
    MOST_RECENT_ACTIVITY,
    MOST_POPULATED_FIELDS,
    SELECT_BY_ID,
}
export enum TaskStatus {
    PENDING,
    PROCESSING,
    COMPLETE,
    FAILED,
}
export enum TaskType {
    SCHEDULED_SCRIPT = "SCHEDULED_SCRIPT",
    MAP_REDUCE = "MAP_REDUCE",
    CSV_IMPORT = "CSV_IMPORT",
    ENTITY_DEDUPLICATION = "ENTITY_DEDUPLICATION",
    WORKFLOW_TRIGGER = "WORKFLOW_TRIGGER",
    SEARCH = "SEARCH",
    RECORD_ACTION = "RECORD_ACTION",
    SUITE_QL = "SUITE_QL",
    QUERY = "QUERY"
}
