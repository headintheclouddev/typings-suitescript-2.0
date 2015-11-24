/// <reference path="../typings/tsd.d.ts" />

interface InitiateOptions {
    recordType: number;
    recordId: string|number;
    workflowType: string|number;
    defaultValues?: Object;
}

interface TriggerOptions {
    recordType: number;
    recordId: string|number;
    workflowType: string|number;
    defaultValues?: Object;
    actionId?: string|number;
}

interface WorkflowModule {
    initiate(options: InitiateOptions): number;
    trigger(options: TriggerOptions): number;
}

declare module N {
    var workflow: WorkflowModule;
}

declare module 'N/workflow' {
    export = N.workflow;
}
