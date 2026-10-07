/**
 * Use the N/workflow module to initiate new workflow instances or trigger existing workflow instances.
 * Supported script types: Server scripts.
 */

import type {FieldValue, Type} from "./record";

interface InitiateOptions {
    /** The record type ID of the workflow base record. Use values from the record.Type enum. This is the Record Type field on the Workflow Definition Page. */
    recordType: string | Type;
    /** The internal ID of the base record. */
    recordId: string | number;
    /** Internal ID (number) or script ID (string) for the workflow definition. This is the ID field on the Workflow Definition Page. */
    workflowId: string | number;
    /**
     * The object that contains key-value pairs to set default values on fields specific to the workflow.
     * These can include fields on the Workflow Definition Page or workflow and state Workflow Custom Fields.
     */
    defaultValues?: {[fieldId: string]: FieldValue};
}

interface TriggerOptions {
    /** The record type ID of the workflow base record. Use values from the record.Type enum. This is the Record Type field on the Workflow Definition Page. */
    recordType: string | Type;
    /** The internal ID of the workflow base record. */
    recordId: string | number;
    /**
     * Internal ID (number) or script ID (string) for the workflow definition. This is the ID field on the Workflow Definition Page.
     */
    workflowId: string | number;
    /** The internal ID of the workflow instance. */
    workflowInstanceId?: number | string;
    /** Key-value pairs to set default values on fields specific to the workflow. Not documented by Oracle for workflow.trigger(options). */
    defaultValues?: {[fieldId: string]: FieldValue};
    /**
     * Internal ID of a button that appears on the record in the workflow.
     * Use this parameter to trigger the workflow as if the specified button were clicked.
     */
    actionId?: string | number;
    /** The internal ID (number) or script ID (string) of the workflow state that contains the action. */
    stateId?: string | number;
}

/**
 * Initiates a workflow on-demand. This method is the programmatic equivalent of the Initiate Workflow Action action in SuiteFlow.
 * To asynchronously initiate a workflow, see task.WorkflowTriggerTask.
 * Supported script types: Server scripts.
 *
 * @returns The internal ID of the workflow instance used to track the workflow against the record.
 * @governance 20 units
 * @since 2015.2
 */
export function initiate(options: InitiateOptions): number;

/**
 * Triggers a workflow on a record. The actions and transitions of the workflow are evaluated for the record in the workflow instance,
 * based on the current state for the workflow instance.
 * Supported script types: Server scripts.
 *
 * @returns The internal ID of the workflow instance used to track the workflow against the record.
 * @governance 20 units
 * @since 2015.2
 */
export function trigger(options: TriggerOptions): number;
