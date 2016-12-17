import {File} from './file';

interface CheckStatusOptions {
    taskId: ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
}

interface TaskCreateOptions {
    taskType: TaskType;
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

interface EntityDeduplicationTask {
    submit(): string;
    toString(): string;
    dedupeMode: DedupeMode;
    entityType: string;
    masterRecordId: number;
    masterSelectionMode: MasterSelectionMode;
    recordIds: number[];
}

interface EntityDeduplicationTaskStatus {
    toString(): string;
    status: TaskStatus;
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
    getTotalOutputCount(): number;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    stage: MapReduceStage;
    status: TaskStatus;
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

interface WorkflowTriggerTask {
    submit(): string;
    toString(): string;
    params: any;
    recordId: number;
    recordType: string;
    workflowId: number | string;
}

interface WorkflowTriggerTaskStatus {
    toString(): string;
    status: TaskStatus;
}

export function create(options: TaskCreateOptions): ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
export function checkStatus(options: CheckStatusOptions): ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
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
    SCHEDULED_SCRIPT,
    MAP_REDUCE,
    CSV_IMPORT,
    ENTITY_DEDUPLICATION,
    WORKFLOW_TRIGGER,
}
