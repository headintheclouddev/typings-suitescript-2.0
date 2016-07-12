/// <reference path="file.d.ts" />

 interface CheckStatusOptions {
    taskId: ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
}

 interface TaskCreateOptions {
    taskType: string;
}

 interface CsvImportTask {
    submit(): string;
    toString(): string;
    importFile: NSFile | string;
    linkedFiles: Object;
    mappingId: number | string;
    name: string;
    queueId: number;
}

 interface CsvImportTaskStatus {
    toString(): string;
    status: string;
}

 interface DedupeEntityTypes {
    CUSTOMER: string;
    CONTACT: string;
    VENDOR: string;
    PARTNER: string;
    LEAD: string;
    PROSPECT: string;
}

 interface DedupeModes {
    MERGE: string;
    DELETE: string;
    MAKE_MASTER_PARENT: string;
    MARK_AS_NOT_DUPES: string;
}

 interface EntityDeduplicationTask {
    submit(): string;
    toString(): string;
    dedupeMode: string;
    entityType: string;
    masterRecordId: number;
    masterSelectionMode: string;
    recordIds: number[];
}

 interface EntityDeduplicationTaskStatus {
    toString(): string;
    status: string;
}

 interface MapReduceScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: Object;
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
    stage: string;
    status: string;
}

 interface MapReduceStages {
    GET_INPUT: string;
    MAP: string;
    SHUFFLE: string;
    REDUCE: string;
    SUMMARIZE: string;
}

 interface MasterSelectionModes {
    CREATED_EARLIEST: string;
    MOST_RECENT_ACTIVITY: string;
    MOST_POPULATED_FIELDS: string;
    SELECT_BY_ID: string;
}

 interface ScheduledScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: Object;
}

 interface ScheduledScriptTaskStatus {
    toString(): string;
    scriptId: string;
    deploymentId: string;
    status: string;
}

 interface TaskStatuses {
    PENDING: string;
    PROCESSING: string;
    COMPLETE: string;
    FAILED: string;
}

 interface TaskTypes {
    SCHEDULED_SCRIPT: string;
    MAP_REDUCE: string;
    CSV_IMPORT: string;
    ENTITY_DEDUPLICATION: string;
    WORKFLOW_TRIGGER: string;
}

 interface WorkflowTriggerTask {
    submit(): string;
    toString(): string;
    params: Object;
    recordId: number;
    recordType: string;
    workflowId: number | string;
}

 interface WorkflowTriggerTaskStatus {
    toString(): string;
    status: string;
}
