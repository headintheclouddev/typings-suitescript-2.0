/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface TaskModule {
    create(options: TaskCreateOptions): ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
    checkStatus(options: CheckStatusOptions): ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
    DedupeEntityType: DedupeEntityTypes;
    DedupeMode: DedupeModes;
    MapReduceStage: MapReduceStages;
    MasterSelectionMode: MasterSelectionModes;
    TaskStatus: TaskStatuses;
    TaskType: TaskTypes;
}

declare var _: TaskModule;
export = _;
