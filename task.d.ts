import {NSFile} from './file';

export interface CheckStatusOptions {
    taskId: ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
}

export interface TaskCreateOptions {
    taskType: string;
}

export interface CsvImportTask {
    submit(): string;
    toString(): string;
    importFile: NSFile | string;
    linkedFiles: Object;
    mappingId: number | string;
    name: string;
    queueId: number;
}

export interface CsvImportTaskStatus {
    toString(): string;
    status: string;
}

export interface DedupeEntityTypes {
    CUSTOMER: string;
    CONTACT: string;
    VENDOR: string;
    PARTNER: string;
    LEAD: string;
    PROSPECT: string;
}

export interface DedupeModes {
    MERGE: string;
    DELETE: string;
    MAKE_MASTER_PARENT: string;
    MARK_AS_NOT_DUPES: string;
}

export interface EntityDeduplicationTask {
    submit(): string;
    toString(): string;
    dedupeMode: string;
    entityType: string;
    masterRecordId: number;
    masterSelectionMode: string;
    recordIds: number[];
}

export interface EntityDeduplicationTaskStatus {
    toString(): string;
    status: string;
}

export interface MapReduceScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: Object;
}

export interface MapReduceScriptTaskStatus {
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
    stage: string;
    status: string;
}

export interface MapReduceStages {
    GET_INPUT: string;
    MAP: string;
    SHUFFLE: string;
    REDUCE: string;
    SUMMARIZE: string;
}

export interface MasterSelectionModes {
    CREATED_EARLIEST: string;
    MOST_RECENT_ACTIVITY: string;
    MOST_POPULATED_FIELDS: string;
    SELECT_BY_ID: string;
}

export interface ScheduledScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: Object;
}

export interface ScheduledScriptTaskStatus {
    toString(): string;
    scriptId: string;
    deploymentId: string;
    status: string;
}

export interface TaskStatuses {
    PENDING: string;
    PROCESSING: string;
    COMPLETE: string;
    FAILED: string;
}

export interface TaskTypes {
    SCHEDULED_SCRIPT: string;
    MAP_REDUCE: string;
    CSV_IMPORT: string;
    ENTITY_DEDUPLICATION: string;
    WORKFLOW_TRIGGER: string;
}

export interface WorkflowTriggerTask {
    submit(): string;
    toString(): string;
    params: Object;
    recordId: number;
    recordType: string;
    workflowId: number | string;
}

export interface WorkflowTriggerTaskStatus {
    toString(): string;
    status: string;
}

export interface TaskModule {
    create(options: TaskCreateOptions): ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
    checkStatus(options: CheckStatusOptions): ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
    DedupeEntityType: DedupeEntityTypes;
    DedupeMode: DedupeModes;
    MapReduceStage: MapReduceStages;
    MasterSelectionMode: MasterSelectionModes;
    TaskStatus: TaskStatuses;
    TaskType: TaskTypes;
}

export default TaskModule;
