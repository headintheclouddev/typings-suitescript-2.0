/// <reference path="../typings/tsd.d.ts" />

interface InitiateOptions {
    recordType: string; // Documentation says number, but examples clearly contradict
    recordId: string|number;
    workflowType: string|number;
    defaultValues?: Object;
}

interface TriggerOptions {
    recordType: string; // Documentation says number, but examples clearly contradict
    recordId: string|number;
    /**
     * Internal ID (number) or script ID (string) for the workflow definition. This is the ID field on the Workflow Definition Page.
     */
    workflowType: string|number;
    defaultValues?: Object;
    /**
     * Internal ID of a button that appears on the record in the workflow.
     * Use this parameter to trigger the workflow as if the specified button were clicked.
     */
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
