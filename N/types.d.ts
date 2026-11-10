import type * as N_http from './http';
import type * as N_portlet from './portlet';
import type * as N_record from './record';
import type * as N_search from './search';
import type * as N_ui_serverWidget from './ui/serverWidget';
import type * as N_FiConnectivity from "./plugins/fiConnectivityPlugin";
import type * as N_FiParser from "./plugins/fiParserPlugin";
import type * as N_GlPlugin from "./plugins/glPlugin";
import type * as N_dataset from "./dataset";
import type * as N_workbook from "./workbook";

/*Don't export these into the Namespace as we don't
want to accidentally use a comparison like this:
export const beforeSubmit: EntryPoints.UserEvent.beforeSubmit = (context) => {
    //THIS IS WRONG
    if(context.Type == EntryPoints.UserEvent.Type.EDIT) {
        ...
    }
};
*/

/** @since 2015.2 */
declare enum UserEventType {
    APPROVE,
    CANCEL,
    CHANGEPASSWORD,
    COPY,
    CREATE,
    DELETE,
    DROPSHIP,
    EDIT,
    EDITFORECAST,
    EMAIL,
    MARKCOMPLETE,
    ORDERITEMS,
    PACK,
    PAYBILLS,
    PRINT,
    QUICKVIEW,
    REASSIGN,
    REJECT,
    SAVESUBMIT,
    SHIP,
    SPECIALORDER,
    TRANSFORM,
    VIEW,
    XEDIT,
}

declare interface UserEventTypes {
    APPROVE: UserEventType;
    CANCEL: UserEventType;
    CHANGEPASSWORD: UserEventType;
    COPY: UserEventType;
    CREATE: UserEventType;
    DELETE: UserEventType;
    DROPSHIP: UserEventType;
    EDIT: UserEventType;
    EDITFORECAST: UserEventType;
    EMAIL: UserEventType;
    MARKCOMPLETE: UserEventType;
    ORDERITEMS: UserEventType;
    PACK: UserEventType;
    PAYBILLS: UserEventType;
    PRINT: UserEventType;
    QUICKVIEW: UserEventType;
    REASSIGN: UserEventType;
    REJECT: UserEventType;
    SAVESUBMIT: UserEventType;
    SHIP: UserEventType;
    SPECIALORDER: UserEventType;
    TRANSFORM: UserEventType;
    VIEW: UserEventType;
    XEDIT: UserEventType;
}

/** @since 2015.2 */
declare enum ScheduledInvocationType {
    SCHEDULED,      // The normal execution according to the deployment options specified in the UI.
    ON_DEMAND,      // The script is executed via a call from a script (using ScheduledScriptTask.submit()).
    USER_INTERFACE, // The script is executed via the UI (the Save & Execute button has been clicked).
    ABORTED,        // The script re-executed automatically following an aborted execution (system went down during execution).
    SKIPPED         // The script is executed automatically following downtime during which the script should have been executed.
}

declare interface ScheduledInvocationTypes {
    SCHEDULED: ScheduledInvocationType;
    ON_DEMAND: ScheduledInvocationType;
    USER_INTERFACE: ScheduledInvocationType;
    ABORTED: ScheduledInvocationType;
    SKIPPED: ScheduledInvocationType;
}

export namespace EntryPoints {
    namespace Client {
        interface fieldChangedContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string | null;
            fieldId: string;
            line?: number;
            column?: number;
        }

        /** @since 2015.2 */
        type fieldChanged = (scriptContext: fieldChangedContext) => void;

        interface lineInitContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }

        /** @since 2015.2 */
        type lineInit = (scriptContext: lineInitContext) => void;

        interface pageInitContext {
            currentRecord: N_record.ClientCurrentRecord;
            mode: 'create' | 'copy' | 'edit' | 'view';
        }

        /** @since 2015.2 */
        type pageInit = (scriptContext: pageInitContext) => void;

        interface postSourcingContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId?: string;
            fieldId: string;
        }

        /** @since 2015.2 */
        type postSourcing = (scriptContext: postSourcingContext) => void;

        interface saveRecordContext {
            currentRecord: N_record.ClientCurrentRecord;
        }

        /** @since 2015.2 */
        type saveRecord = (scriptContext: saveRecordContext) => boolean;

        interface sublistChangedContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            /**
             * Commit, etc.
             */
            operation: string;
        }

        /** @since 2015.2 */
        type sublistChanged = (scriptContext: sublistChangedContext) => void;

        interface validateDeleteContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            /** @since 2020.2 */
            lineCount: number; // As of 2020.2
        }

        /** @since 2015.2 */
        type validateDelete = (scriptContext: validateDeleteContext) => boolean;

        interface validateFieldContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId?: string;
            fieldId: string;
            line?: number;
            column?: number;
        }

        /** @since 2015.2 */
        type validateField = (scriptContext: validateFieldContext) => boolean;

        interface validateInsertContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }

        /** @since 2015.2 */
        type validateInsert = (scriptContext: validateInsertContext) => boolean;

        interface validateLineContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }

        /** @since 2015.2 */
        type validateLine = (scriptContext: validateLineContext) => boolean;

        interface localizationContext {
            currentRecord: N_record.ClientCurrentRecord;
            /** @since 2020.1 */
            locale: string;
        }

        /** @since 2020.1 */
        type localizationContextEnter = (scriptContext: localizationContext) => void;
        /** @since 2020.1 */
        type localizationContextExit = (scriptContext: localizationContext) => void;
    }

    namespace UserEvent {
        interface beforeLoadContext {
            newRecord: N_record.Record;
            form: N_ui_serverWidget.Form;
            type: UserEventType;
            UserEventType: UserEventTypes;
            request: N_http.ServerRequest | undefined;
        }

        /** @since 2015.2 */
        type beforeLoad = (scriptContext: beforeLoadContext) => void;

        interface beforeSubmitContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record | null;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }

        /** @since 2015.2 */
        type beforeSubmit = (scriptContext: beforeSubmitContext) => void;

        interface afterSubmitContext {
            newRecord: N_record.Record & { id: number };
            oldRecord: N_record.Record | null;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }

        /** @since 2015.2 */
        type afterSubmit = (scriptContext: afterSubmitContext) => void;
    }

    namespace Scheduled {
        interface executeContext {
            type: ScheduledInvocationType;
            InvocationType: ScheduledInvocationTypes;
        }

        /** @since 2015.2 */
        type execute = (scriptContext: executeContext) => void | Promise<void>;
    }

    namespace MapReduce {
        interface Configuration {
            retryCount?: 0 | 1 | 2 | 3;
            exitOnError?: boolean;
        }

        type config = Configuration;

        interface ObjectReference {
            id: string;
            type: string;
        }

        interface getInputDataContext {
            readonly isRestarted: boolean;
            ObjectRef: ObjectReference;
        }

        type GetInputDataResponse = N_search.Search | any | any[] | ObjectReference;
        /** @since 2015.2 */
        type getInputData = (scriptContext: getInputDataContext) => Promise<GetInputDataResponse> | GetInputDataResponse;

        interface mapContext {
            readonly isRestarted: boolean;
            readonly executionNo: number;
            readonly errors: MapReduceErrorIteratorContainer;
            readonly key: string;
            readonly value: string;
            write(key: string | object, value: string | object): void;
            write(options: IKeyValuePair): void;
        }

        /** @since 2015.2 */
        type map = (scriptContext: mapContext) => Promise<void> | void;

        interface reduceContext {
            readonly isRestarted: boolean;
            readonly executionNo: number;
            readonly errors: MapReduceErrorIteratorContainer;
            readonly key: string;
            readonly values: string[];
            write(key: string | object, value: string | object): void;
            write(options: IKeyValuePair): void;
        }

        /** @since 2015.2 */
        type reduce = (scriptContext: reduceContext) => Promise<void> | void;

        interface MapReduceOutputIterator {
            each(callback: (key: string, value: string) => boolean): void;
        }

        interface MapReduceOutputIteratorContainer {
            iterator(): MapReduceOutputIterator;
        }

        interface MapReduceSummaryIterator {
            each(callback: (key: string, executionCount: number, completionState: string) => boolean): void;
        }

        interface MapReduceSummaryIteratorContainer {
            iterator(): MapReduceSummaryIterator;
        }

        interface MapReduceErrorIterator {
            each(callback: (key: string, error: string, executionNo: number) => boolean): void;
        }

        interface MapReduceErrorIteratorContainer {
            iterator(): MapReduceErrorIterator;
        }

        interface InputSummary {
            dateCreated: Date;
            error: string;
            seconds: number;
            usage: number;
        }

        interface MapSummary {
            dateCreated: Date;
            seconds: number;
            usage: number;
            concurrency: number;
            yields: number;
            keys: MapReduceSummaryIteratorContainer;
            errors: MapReduceErrorIteratorContainer;
        }

        interface ReduceSummary {
            dateCreated: Date;
            seconds: number;
            usage: number;
            concurrency: number;
            yields: number;
            keys: MapReduceSummaryIteratorContainer;
            errors: MapReduceErrorIteratorContainer;
        }

        interface summarizeContext {
            readonly isRestarted: boolean;
            dateCreated: Date;
            seconds: number;
            usage: number;
            concurrency: number;
            yields: number;
            inputSummary: InputSummary;
            mapSummary: MapSummary;
            reduceSummary: ReduceSummary;
            output: MapReduceOutputIteratorContainer;
        }

        /** @since 2015.2 */
        type summarize = (summary: summarizeContext) => Promise<void> | void;
    }

    namespace Portlet {
        interface renderContext {
            portlet: N_portlet.Portlet;
            column: number;
            /** This is entityid in the docs, but entity in practice */
            entity: string;
        }

        /** @since 2015.2 */
        type render = (scriptContext: renderContext) => void;
    }

    namespace Suitelet {
        interface onRequestContext {
            request: N_http.ServerRequest;
            response: N_http.ServerResponse;
        }

        /** @since 2015.2 */
        type onRequest = (scriptContext: onRequestContext) => void;
    }

    namespace MassUpdate {
        interface eachContext {
            id: number;
            type: string;
        }

        /** @since 2016.1 */
        type each = (scriptContext: eachContext) => void;
    }

    namespace WorkflowAction {
        interface onActionContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record | null;
            /** @since 2016.2 */
            form?: N_ui_serverWidget.Form;
            /** @since 2016.2 */
            type?: string;
            /** @since 2016.2 */
            workflowId?: number;
        }

        /** @since 2016.1 */
        type onAction = (scriptContext: onActionContext) => void;
    }

    namespace RESTlet {
        /** @since 2015.2 */
        type get<T = unknown, Y = string> = (requestParams?: Partial<T>) => Promise<Y> | Y;
        /** @since 2015.2 */
        type delete_<T = unknown, Y = string> = (requestParams?: Partial<T>) => Promise<Y> | Y;
        /** @since 2015.2 */
        type post<T = unknown, Y = string> = (requestBody: Partial<T> | string) => Promise<Y> | Y;
        /** @since 2015.2 */
        type put<T = unknown, Y = string> = (requestBody: Partial<T> | string) => Promise<Y> | Y;
    }

    namespace BundleInstallation {
        interface onAfterInstallContext {
            version: number;
        }

        /** @since 2016.1 */
        type afterInstall = (scriptContext: onAfterInstallContext) => void;

        interface onAfterUpdateContext {
            fromVersion: number;
            toVersion: number;
        }

        /** @since 2016.1 */
        type afterUpdate = (scriptContext: onAfterUpdateContext) => void;

        interface onBeforeInstallContext {
            version: number;
        }

        /** @since 2016.1 */
        type beforeInstall = (scriptContext: onBeforeInstallContext) => void;

        interface onBeforeUninstallContext {
            version: number;
        }

        /** @since 2016.1 */
        type beforeUninstall = (scriptContext: onBeforeUninstallContext) => void;

        interface onBeforeUpdateContext {
            fromVersion: number;
            toVersion: number;
        }

        /** @since 2016.1 */
        type beforeUpdate = (scriptContext: onBeforeUpdateContext) => void;
    }

    namespace SDFInstallation {
        interface runContext {
            /** The version of the SuiteApp currently installed on the account. Specify Null if this is a new installation. */
            fromVersion: string;
            /** The version of the SuiteApp that will be installed on the account. */
            toVersion: string;
        }

        /** @since 2015.2 */
        type run = (scriptContext: runContext) => void;
    }

    namespace Plugins {

        namespace FiParser {

            interface getConfigurationPageUrlContext extends N_FiParser.getConfigurationPageUrlContext {

            }

            interface parseDataContext extends N_FiParser.parseDataContext {

            }

            interface getStandardTransactionCodesContext extends N_FiParser.getStandardTransactionCodesContext {

            }

            interface getExpenseCodesContext extends N_FiParser.getExpenseCodesContext {

            }

            type getConfigurationPageUrl = N_FiParser.getConfigurationPageUrl;
            type parseData = N_FiParser.parseData;
            type getStandardTransactionCodes = N_FiParser.getStandardTransactionCodes;
            type getExpenseCodes = N_FiParser.getExpenseCodes;
        }

        namespace FiConnectivity {

            interface getTransactionDataContext extends N_FiConnectivity.getTransactionDataContext {

            }

            interface getAccountsContext extends N_FiConnectivity.getAccountsContext {

            }

            interface getConfigurationIFrameUrlContext extends N_FiConnectivity.getConfigurationIFrameUrlContext {

            }

            interface IAccountRequest extends N_FiConnectivity.IAccountRequest {

            }

            type getTransactionData = N_FiConnectivity.getTransactionData;
            type getAccounts = N_FiConnectivity.getAccounts;
            type getConfigurationIFrameUrl = N_FiConnectivity.getConfigurationIFrameUrl;
        }

        namespace DatasetBuilder {
            interface createDatasetContext {
                dataset: N_dataset.Dataset;
                readonly description: string;
                readonly name: string;
                readonly owner: number;
                readonly role: number;
            }

            type createDataset = (scriptContext: createDatasetContext) => void;
        }

        namespace WorkbookBuilder {
            interface createWorkbookContext {
                workbook: N_workbook.Workbook;
                readonly description: string;
                readonly name: string;
                readonly owner: number;
                readonly role: number;
            }

            type createWorkbook = (scriptContext: createWorkbookContext) => void;
        }

        namespace GlPlugin {
            interface glPluginContext extends N_GlPlugin.glPluginContext {
            }

            type customizeGlImpact = N_GlPlugin.customizeGlImpact;
        }
    }

    namespace CustomRecordAction {
        interface isQualifiedContext {
            ids: string[];
            recordType: string;
            qualified: Map<string, string>;
        }

        type isQualified = (scriptContext: isQualifiedContext) => void;

        interface executeActionContext {
            ids: string[];
            recordType: string;
            params: object;
            response: object;
        }

        type executeAction = (scriptContext: executeActionContext) => void;
    }

    /**
     * Event Subscriber scripts are server scripts that run asynchronously after supported record events occur,
     * such as a record being created, updated, or deleted. Unlike user event scripts, which run during record processing,
     * they run after the originating operation is complete. Declare `@NScriptType EventSubscriber` (SuiteScript 2.1 only),
     * and configure the subscription criteria in an `eventsubscriber` SDF object.
     *
     * Each execution allows up to 1,000 usage units and can run for up to 300 seconds.
     * @since 2026.2
     */
    namespace EventSubscriber {
        /** The options object NetSuite passes to the handle(options) entry point. */
        interface handleContext {
            /** Contains context about the event. */
            context: {
                /** The record type ID of the record that triggered the event, such as 'SALESORDER' or 'CUSTOMER'. */
                recordType: string;
            };
            /** Contains the event payload. */
            payload: {
                /** Internal ID of the record that triggered the event. */
                recordId: string;
            };
        }

        /**
         * Defines the function that handles a subscribed event.
         * @governance 1,000 units per execution
         * @since 2026.2
         */
        type handle = (options: handleContext) => void | Promise<void>;
    }
}

interface IKeyValuePair {
    key: string|object;
    value: string|object;
}
