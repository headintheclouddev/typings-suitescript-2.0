import {record} from "../N";

interface InitiateOptions {
    recordType: string | record.Type;
    recordId: string | number;
    workflowId: string | number;
    defaultValues?: any;
}

interface TriggerOptions {
    recordType: string | record.Type;
    recordId: string | number;
    /**
     * Internal ID (number) or script ID (string) for the workflow definition. This is the ID field on the Workflow Definition Page.
     */
    workflowId: string | number;
    workflowInstanceId?: number | string;
    defaultValues?: any;
    /**
     * Internal ID of a button that appears on the record in the workflow.
     * Use this parameter to trigger the workflow as if the specified button were clicked.
     */
    actionId?: string | number;
    /** The internal ID (number) or script ID (string) of the workflow state that contains the action. */
    stateId?: string | number;
}

export function initiate(options: InitiateOptions): number;
export function trigger(options: TriggerOptions): number;
