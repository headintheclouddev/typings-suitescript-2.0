import {File} from './file';

interface CheckStatusOptions {
    taskId: string;
}

type TaskCreateOptions =
    CsvImportTaskCreateOptions
    | EntityDeduplicationTaskCreateOptions
    | MapReduceScriptTaskCreateOptions
    | ScheduledScriptTaskCreateOptions
    | WorkflowTriggerTaskCreateOptions
    | SearchTaskCreateOptions;


interface SearchTaskCreateOptions {
    taskType: TaskType.SEARCH
    savedSearchId?: number;
    fileId?: number;
    filePath?: string;
}

interface SearchTask {
    submit(): string;
    addInboundDependency(dependency: ScheduledScriptTask | MapReduceScriptTask): void;
    toString(): string;
    savedSearchId: number;
    fileId: number;
    filePath: string;
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
    entityType?: string;
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
export function checkStatus(options: CheckStatusOptions): ScheduledScriptTaskStatus | MapReduceScriptTaskStatus | CsvImportTaskStatus | EntityDeduplicationTaskStatus | WorkflowTriggerTaskStatus;
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
    SEARCH = "SEARCH"
}
