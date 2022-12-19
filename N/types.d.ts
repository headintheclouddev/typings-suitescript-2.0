import * as N_http from './http';
import * as N_portlet from './portlet';
import * as N_record from './record';
import * as N_search from './search';
import * as N_ui_serverWidget from './ui/serverWidget';
import * as N_FiConnectivity from "./plugins/fiConnectivityPlugin";
import * as N_FiParser from "./plugins/fiParserPlugin";
import * as N_dataset from "./dataset";
import * as N_workbook from "./workbook";

/*Don't export these into the Namespace as we don't
want to accidentally use a comparison like this:
export var beforeSubmit: EntryPoints.UserEvent.beforeSubmit = (ctx) => {
    //THIS IS WRONG
    if(ctx.Type == EntryPoints.UserEvent.Type.EDIT) {
        ...
    }
};
*/

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
            sublistId: string;
            fieldId: string;
            line: number;
            column: number;
        }

        type fieldChanged = (scriptContext: fieldChangedContext) => void;

        interface lineInitContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }

        type lineInit = (scriptContext: lineInitContext) => void;

        interface pageInitContext {
            currentRecord: N_record.ClientCurrentRecord;
            mode: 'create' | 'copy' | 'edit' | 'view';
        }

        type pageInit = (scriptContext: pageInitContext) => void;

        interface postSourcingContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            fieldId: string;
        }

        type postSourcing = (scriptContext: postSourcingContext) => void;

        interface saveRecordContext {
            currentRecord: N_record.ClientCurrentRecord;
        }

        type saveRecord = (scriptContext: saveRecordContext) => boolean;

        interface sublistChangedContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            /**
             * Commit, etc.
             */
            operation: string;
        }

        type sublistChanged = (scriptContext: sublistChangedContext) => void;

        interface validateDeleteContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            lineCount: number; // As of 2020.2
        }

        type validateDelete = (scriptContext: validateDeleteContext) => boolean;

        interface validateFieldContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            fieldId: string;
            line?: number;
            column?: number;
        }

        type validateField = (scriptContext: validateFieldContext) => boolean;

        interface validateInsertContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }

        type validateInsert = (scriptContext: validateInsertContext) => boolean;

        interface validateLineContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }

        type validateLine = (scriptContext: validateLineContext) => boolean;

        interface localizationContext {
            currentRecord: N_record.ClientCurrentRecord;
            locale: string;
        }

        type localizationContextEnter = (scriptContext: localizationContext) => void;
        type localizationContextExit = (scriptContext: localizationContext) => void;
    }

    namespace UserEvent {
        interface beforeLoadContext {
            newRecord: N_record.Record;
            form: N_ui_serverWidget.Form;
            type: UserEventType;
            UserEventType: UserEventTypes;
            request: N_http.ServerRequest;
        }

        type beforeLoad = (scriptContext: beforeLoadContext) => void;

        interface beforeSubmitContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }

        type beforeSubmit = (scriptContext: beforeSubmitContext) => void;

        interface afterSubmitContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }

        type afterSubmit = (scriptContext: afterSubmitContext) => void;
    }

    namespace Scheduled {
        interface executeContext {
            type: ScheduledInvocationType;
            InvocationType: ScheduledInvocationTypes;
        }

        type execute = (scriptContext: executeContext) => void;
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

        type getInputData = (scriptContext: getInputDataContext) => N_search.Search | any | any[] | ObjectReference;

        interface mapContext {
            readonly isRestarted: boolean;
            readonly executionNo: number;
            readonly errors: MapReduceErrorIteratorContainer;
            readonly key: string;
            readonly value: string;
            write(key: string | object, value: string | object): void;
            write(options: IKeyValuePair): void;
        }

        type map = (scriptContext: mapContext) => void;

        interface reduceContext {
            readonly isRestarted: boolean;
            readonly executionNo: number;
            readonly errors: MapReduceErrorIteratorContainer;
            readonly key: string;
            readonly values: string[];
            write(key: string | object, value: string | object): void;
            write(options: IKeyValuePair): void;
        }

        type reduce = (scriptContext: reduceContext) => void;

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

        type summarize = (summary: summarizeContext) => void;
    }

    namespace Portlet {
        interface renderContext {
            portlet: N_portlet.Portlet;
            column: number;
            /** This is entityid in the docs, but entity in practice */
            entity: string;
        }

        type render = (scriptContext: renderContext) => void;
    }

    namespace Suitelet {
        interface onRequestContext {
            request: N_http.ServerRequest;
            response: N_http.ServerResponse;
        }

        type onRequest = (scriptContext: onRequestContext) => void;
    }

    namespace MassUpdate {
        interface eachContext {
            id: number;
            type: string;
        }

        type each = (scriptContext: eachContext) => void;
    }

    namespace WorkflowAction {
        interface onActionContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record;
            form?: N_ui_serverWidget.Form;
            type?: string;
            workflowId?: number;
        }

        type onAction = (scriptContext: onActionContext) => void;
    }

    namespace RESTlet {
        type get = (requestParameters: {[key: string]: any}) => {[key: string]: any} | string;
        type delete_ = (requestParameters: {[key: string]: any}) => {[key: string]: any} | string;
        type post = (requestBody: {[key: string]: any} | string) => {[key: string]: any} | string;
        type put = (requestBody: {[key: string]: any} | string) => {[key: string]: any} | string;
    }

    namespace BundleInstallation {
        interface onAfterInstallContext {
            version: number;
        }

        type afterInstall = (scriptContext: onAfterInstallContext) => void;

        interface onAfterUpdateContext {
            fromVersion: number;
            toVersion: number;
        }

        type afterUpdate = (scriptContext: onAfterUpdateContext) => void;

        interface onBeforeInstallContext {
            version: number;
        }

        type beforeInstall = (scriptContext: onBeforeInstallContext) => void;

        interface onBeforeUninstallContext {
            version: number;
        }

        type beforeUninstall = (scriptContext: onBeforeUninstallContext) => void;

        interface onBeforeUpdateContext {
            fromVersion: number;
            toVersion: number;
        }

        type beforeUpdate = (scriptContext: onBeforeUpdateContext) => void;
    }

    namespace SDFInstallation {
        interface runContext {
            /** The version of the SuiteApp currently installed on the account. Specify Null if this is a new installation. */
            fromVersion: string;
            /** The version of the SuiteApp that will be installed on the account. */
            toVersion: string;
        }

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
}

interface IKeyValuePair {
    key: string|object;
    value: string|object;
}
