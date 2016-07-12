/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface WorkflowModule {
    initiate(options: InitiateOptions): number;
    trigger(options: TriggerOptions): number;
}

export default WorkflowModule;
