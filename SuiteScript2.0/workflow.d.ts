/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface WorkflowModule {
    initiate(options: InitiateOptions): number;
    trigger(options: TriggerOptions): number;
}

declare var _: WorkflowModule;
export = _;
