import type * as N_http from './http';
import type * as N_portlet from './portlet';
import type * as N_query from './query';
import type * as N_record from './record';
import type * as N_restlet from './scriptTypes/restlet';
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

/**
 * Holds the string values for user event execution contexts (context.UserEventType).
 * @since 2015.2
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
    /** Not listed in Oracle's context.UserEventType values. */
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
    /** Not listed in Oracle's context.UserEventType values. */
    SAVESUBMIT: UserEventType;
    SHIP: UserEventType;
    SPECIALORDER: UserEventType;
    TRANSFORM: UserEventType;
    VIEW: UserEventType;
    XEDIT: UserEventType;
}

/**
 * Holds the string values for scheduled script execution contexts (context.InvocationType).
 * @since 2015.2
 */
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
    /** Client Script entry points. See "SuiteScript 2.x Client Script Entry Points and API". */
    namespace Client {
        interface fieldChangedContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name, or null if the changed field is a body field. */
            readonly sublistId: string | null;
            /** The field ID name. */
            readonly fieldId: string;
            /** The line number (zero-based index) if the field is in a sublist or a matrix; otherwise undefined. (Oracle's parameter table lists the type as string.) */
            readonly line?: number;
            /** The column number (zero-based index) if the field is in a matrix; otherwise undefined. (Oracle's parameter table lists the type as string.) */
            readonly column?: number;
        }

        /**
         * Executes when a field is changed by a user or client call.
         * @since 2015.2
         */
        type fieldChanged = (scriptContext: fieldChangedContext) => void;

        interface lineInitContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId: string;
        }

        /**
         * Executes when an existing line is selected.
         * @since 2015.2
         */
        type lineInit = (scriptContext: lineInitContext) => void;

        interface pageInitContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The mode in which the record is being accessed: copy, create, or edit. ('view' is not listed by Oracle.) */
            readonly mode: 'create' | 'copy' | 'edit' | 'view';
        }

        /**
         * Executes when the page completes loading or when the form is reset.
         * @since 2015.2
         */
        type pageInit = (scriptContext: pageInitContext) => void;

        interface postSourcingContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId?: string;
            /** The field ID name. */
            readonly fieldId: string;
        }

        /**
         * Executes on transaction forms when a field that sources information from another field is modified.
         * @since 2015.2
         */
        type postSourcing = (scriptContext: postSourcingContext) => void;

        interface saveRecordContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
        }

        /**
         * Executes after the submit button is pressed but before the form is submitted. Return true to save the record, false to block saving.
         * @since 2015.2
         */
        type saveRecord = (scriptContext: saveRecordContext) => boolean;

        interface sublistChangedContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId: string;
            /**
             * The sublist operation that triggered the entry point (for example, commit, insert, or remove).
             * Not listed in Oracle's parameter table, but used in Oracle samples.
             */
            readonly operation: string;
        }

        /**
         * Executes after a sublist has been inserted, removed, or edited.
         * @since 2015.2
         */
        type sublistChanged = (scriptContext: sublistChangedContext) => void;

        interface validateDeleteContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId: string;
            /**
             * The number of lines to be deleted. Defined only when validateDelete is triggered by the Clear All Lines button in the UI.
             * @since 2020.2
             */
            readonly lineCount?: number;
        }

        /**
         * Executes when removing an existing line from an edit sublist. Return true if the sublist line is valid, false to block the removal.
         * @since 2015.2
         */
        type validateDelete = (scriptContext: validateDeleteContext) => boolean;

        interface validateFieldContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId?: string;
            /** The field ID name. */
            readonly fieldId: string;
            /** The line number (zero-based index) if the field is in a sublist or a matrix; otherwise undefined. (Oracle's parameter table lists the type as string.) */
            readonly line?: number;
            /** The column number (zero-based index) if the field is in a matrix; otherwise undefined. (Oracle's parameter table lists the type as string.) */
            readonly column?: number;
        }

        /**
         * Executes when a field is about to be changed by a user or client call. Return true if the field is valid, false to prevent the change.
         * @since 2015.2
         */
        type validateField = (scriptContext: validateFieldContext) => boolean;

        interface validateInsertContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId: string;
        }

        /**
         * Executes when you insert a line into an edit sublist. Return true if the sublist line is valid, false to block the insert.
         * @since 2015.2
         */
        type validateInsert = (scriptContext: validateInsertContext) => boolean;

        interface validateLineContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /** The sublist ID name. */
            readonly sublistId: string;
        }

        /**
         * Executes before a line is added to an inline editor sublist or editor sublist. Return true if the sublist line is valid, false to reject it.
         * @since 2015.2
         */
        type validateLine = (scriptContext: validateLineContext) => boolean;

        interface localizationContext {
            /** The current form record. */
            readonly currentRecord: N_record.ClientCurrentRecord;
            /**
             * The list of countries that represent the new localization context.
             * @since 2020.1
             */
            readonly locale: string;
        }

        /**
         * Executes when the localization context of the record is set or changed and the record enters a localization context.
         * @since 2020.1
         */
        type localizationContextEnter = (scriptContext: localizationContext) => void;
        /**
         * Executes when the localization context of the record is changed and the record exits its current localization context.
         * @since 2020.1
         */
        type localizationContextExit = (scriptContext: localizationContext) => void;
    }

    /** User Event Script entry points. See "SuiteScript 2.x User Event Script Entry Points and API". */
    namespace UserEvent {
        interface beforeLoadContext {
            /** The new record (the record being loaded). */
            readonly newRecord: N_record.Record;
            /** The current form. */
            readonly form: N_ui_serverWidget.Form;
            /** The trigger type. Compare against the values in scriptContext.UserEventType. */
            readonly type: UserEventType;
            /** Holds the string values for user event execution contexts. */
            readonly UserEventType: UserEventTypes;
            /** The HTTP request information sent from the browser. Defined only for beforeLoad triggered by a browser request. */
            readonly request: N_http.ServerRequest | undefined;
        }

        /**
         * Executes whenever a read operation occurs on a record, and prior to returning the record or page.
         * @since 2015.2
         */
        type beforeLoad = (scriptContext: beforeLoadContext) => void;

        interface beforeSubmitContext {
            /** The new record. Changes made to this record are saved. */
            readonly newRecord: N_record.Record;
            /**
             * The old record (the previous state of the record). Null when there is no previous state (for example, on create).
             * (Oracle's beforeSubmit parameter table lists this as a required record.Record.)
             */
            readonly oldRecord: N_record.Record | null;
            /** The trigger type. Compare against the values in scriptContext.UserEventType. */
            readonly type: UserEventType;
            /** Holds the string values for user event execution contexts. */
            readonly UserEventType: UserEventTypes;
        }

        /**
         * Executes prior to any write operation on the record.
         * @since 2015.2
         */
        type beforeSubmit = (scriptContext: beforeSubmitContext) => void;

        interface afterSubmitContext {
            /**
             * The new record. The record has already been submitted, so it is read-only: changes made to it are not saved.
             * To modify the record, load it with record.load() or use record.submitFields().
             */
            readonly newRecord: N_record.Record & { id: number };
            /** The old record (the previous state of the record). Null when there is no previous state (for example, on create). */
            readonly oldRecord: N_record.Record | null;
            /** The trigger type. Compare against the values in scriptContext.UserEventType. */
            readonly type: UserEventType;
            /** Holds the string values for user event execution contexts. */
            readonly UserEventType: UserEventTypes;
        }

        /**
         * Executes immediately after a write operation on a record.
         * @since 2015.2
         */
        type afterSubmit = (scriptContext: afterSubmitContext) => void;
    }

    /** Scheduled Script entry point. See "SuiteScript 2.x Scheduled Script Entry Points and API". */
    namespace Scheduled {
        interface executeContext {
            /** The context in which the script is executed. Compare against the values in scriptContext.InvocationType. */
            readonly type: ScheduledInvocationType;
            /** Holds the string values for scheduled script execution contexts. */
            readonly InvocationType: ScheduledInvocationTypes;
        }

        /**
         * Definition of the scheduled script trigger point.
         * @since 2015.2
         */
        type execute = (scriptContext: executeContext) => void | Promise<void>;
    }

    /** Map/Reduce Script entry points. See "SuiteScript 2.x Map/Reduce Script Entry Points and API". */
    namespace MapReduce {
        /** Map/reduce configuration options, exported from the script as `config`. */
        interface Configuration {
            /** The number of times (0-3) a map or reduce function invocation is retried after an uncaught error or a server restart. */
            retryCount?: 0 | 1 | 2 | 3;
            /** If true, the script stops (goes to summarize) when an uncaught error is thrown in a map or reduce function. The default value is false. */
            exitOnError?: boolean;
        }

        type config = Configuration;

        /** Object reference returned from getInputData to identify a saved search, query, or file by ID. */
        interface ObjectReference {
            /** The internal ID or script ID of the object. */
            id: string | number;
            /** The type of the object, for example 'search', 'query', or 'file'. */
            type: string;
        }

        interface getInputDataContext {
            /** Indicates whether the getInputData function was invoked again (restarted). */
            readonly isRestarted: boolean;
            /** Object used to create a reference to a saved search, query, or file to return from getInputData. */
            ObjectRef: ObjectReference;
        }

        /** Data accepted as the return value of getInputData: an array, an object, a file, a query.Query, a dataset, a search.Search, a SuiteQL object, or an object reference (file, suiteql, query, search). */
        type GetInputDataResponse = N_search.Search | N_query.Query | N_query.SuiteQL | ObjectReference | unknown[] | object;
        /**
         * Marks the beginning of the map/reduce script execution. Returns the input data for the map stage.
         * @since 2015.2
         */
        type getInputData = (scriptContext: getInputDataContext) => Promise<GetInputDataResponse> | GetInputDataResponse;

        interface mapContext {
            /** Indicates whether the current invocation of the map function is the first or a subsequent (restarted) invocation for the current key/value pair. */
            readonly isRestarted: boolean;
            /** The number of times the map function was invoked for the current key/value pair. */
            readonly executionNo: number;
            /** Holds serialized errors thrown during previous attempts to execute the map function on the current key/value pair. */
            readonly errors: MapReduceErrorIteratorContainer;
            /** The key to be processed during the map stage. */
            readonly key: string;
            /** The value to be processed during the map stage. */
            readonly value: string;
            /** Writes the map output as a key/value pair. Non-string keys and values are serialized with JSON.stringify(). */
            write(key: string | object, value: string | object): void;
            write(options: IKeyValuePair): void;
        }

        /**
         * Executes when the map entry point is triggered, once for each key/value pair from getInputData.
         * @since 2015.2
         */
        type map = (scriptContext: mapContext) => Promise<void> | void;

        interface reduceContext {
            /** Indicates whether the current invocation of the reduce function is the first or a subsequent (restarted) invocation for the current key/values pair. */
            readonly isRestarted: boolean;
            /** The number of times the reduce function was invoked for the current key/values pair. */
            readonly executionNo: number;
            /** Holds serialized errors thrown during previous attempts to execute the reduce function on the current key/values pair. */
            readonly errors: MapReduceErrorIteratorContainer;
            /** The key to be processed during the reduce stage. */
            readonly key: string;
            /** The values to be processed during the reduce stage. */
            readonly values: string[];
            /** Writes the reduce output as a key/value pair. Non-string keys and values are serialized with JSON.stringify(). */
            write(key: string | object, value: string | object): void;
            write(options: IKeyValuePair): void;
        }

        /**
         * Executes when the reduce entry point is triggered, once for each key and its list of values.
         * @since 2015.2
         */
        type reduce = (scriptContext: reduceContext) => Promise<void> | void;

        interface MapReduceOutputIterator {
            /** Iterates over the reduce (or map) output key/value pairs. Return true to continue iterating, false to stop. */
            each(callback: (key: string, value: string) => boolean): void;
        }

        interface MapReduceOutputIteratorContainer {
            iterator(): MapReduceOutputIterator;
        }

        interface MapReduceSummaryIterator {
            /** Iterates over the keys processed by the stage. Return true to continue iterating, false to stop. */
            each(callback: (key: string, executionCount: number, completionState: string) => boolean): void;
        }

        interface MapReduceSummaryIteratorContainer {
            iterator(): MapReduceSummaryIterator;
        }

        interface MapReduceErrorIterator {
            /** Iterates over the serialized errors. Return true to continue iterating, false to stop. */
            each(callback: (key: string, error: string, executionNo: number) => boolean): void;
        }

        interface MapReduceErrorIteratorContainer {
            iterator(): MapReduceErrorIterator;
        }

        /** Holds statistics about the getInputData stage. */
        interface InputSummary {
            /** The time and day when the getInputData stage began running. */
            readonly dateCreated: Date;
            /** A serialized error thrown during the getInputData stage, if any. */
            readonly error: string;
            /** The total seconds elapsed during the getInputData stage. */
            readonly seconds: number;
            /** The total number of usage units consumed during the getInputData stage. */
            readonly usage: number;
        }

        /** Holds statistics about the map stage. */
        interface MapSummary {
            /** The time and day when the map stage began running. */
            readonly dateCreated: Date;
            /** The total seconds elapsed during the map stage. */
            readonly seconds: number;
            /** The total number of usage units consumed during the map stage. */
            readonly usage: number;
            /** The maximum concurrency used during the map stage. */
            readonly concurrency: number;
            /** The total number of yields that occurred during the map stage. */
            readonly yields: number;
            /** Holds the keys passed to the map stage. */
            readonly keys: MapReduceSummaryIteratorContainer;
            /** Holds serialized errors thrown during the map stage. */
            readonly errors: MapReduceErrorIteratorContainer;
        }

        /** Holds statistics about the reduce stage. */
        interface ReduceSummary {
            /** The time and day when the reduce stage began running. */
            readonly dateCreated: Date;
            /** The total seconds elapsed during the reduce stage. */
            readonly seconds: number;
            /** The total number of usage units consumed during the reduce stage. */
            readonly usage: number;
            /** The maximum concurrency used during the reduce stage. */
            readonly concurrency: number;
            /** The total number of yields that occurred during the reduce stage. */
            readonly yields: number;
            /** Holds the keys passed to the reduce stage. */
            readonly keys: MapReduceSummaryIteratorContainer;
            /** Holds serialized errors thrown during the reduce stage. */
            readonly errors: MapReduceErrorIteratorContainer;
        }

        interface summarizeContext {
            /** Indicates whether the summarize function was invoked again (restarted). */
            readonly isRestarted: boolean;
            /** The time and day when the map/reduce script began running. */
            readonly dateCreated: Date;
            /** The total seconds elapsed while the script was running. */
            readonly seconds: number;
            /** The total number of usage units consumed by the script. */
            readonly usage: number;
            /** The maximum concurrency used by the script. */
            readonly concurrency: number;
            /** The total number of yields that occurred while the script was running. */
            readonly yields: number;
            /** Statistics about the getInputData stage. */
            readonly inputSummary: InputSummary;
            /** Statistics about the map stage. */
            readonly mapSummary: MapSummary;
            /** Statistics about the reduce stage. */
            readonly reduceSummary: ReduceSummary;
            /** Holds the key/value pairs written as output of the reduce stage (or the map stage, if there is no reduce stage). */
            readonly output: MapReduceOutputIteratorContainer;
        }

        /**
         * Executes when the summarize entry point is triggered, after all map and reduce processing is complete.
         * @since 2015.2
         */
        type summarize = (summary: summarizeContext) => Promise<void> | void;
    }

    /** Portlet Script entry point. See "SuiteScript 2.x Portlet Script Entry Points and API". */
    namespace Portlet {
        interface renderContext {
            /** The portlet object used for rendering. The available Portlet members depend on the portlet type. */
            readonly portlet: N_portlet.Portlet;
            /** The column index for the portlet on the dashboard, as a string representation of the numeric value: left column (1), center column (2), or right column (3). */
            readonly column: string;
            /** The customer ID for the selected customer. */
            readonly entity: string;
        }

        /**
         * Defines the portlet script trigger point.
         * @since 2015.2
         */
        type render = (scriptContext: renderContext) => void;
    }

    /** Suitelet entry point. See "SuiteScript 2.x Suitelet Script Entry Points and API". */
    namespace Suitelet {
        interface onRequestContext {
            /** The incoming request. */
            readonly request: N_http.ServerRequest;
            /** The Suitelet response. */
            readonly response: N_http.ServerResponse;
        }

        /**
         * Defines the Suitelet script trigger point.
         * @since 2015.2
         */
        type onRequest = (scriptContext: onRequestContext) => void;
    }

    /** Mass Update Script entry point. See "SuiteScript 2.x Mass Update Script Entry Points and API". */
    namespace MassUpdate {
        interface eachContext {
            /** The internal ID of the record being processed. */
            readonly id: number;
            /** The record type of the record being processed. */
            readonly type: string;
        }

        /**
         * Iterates through each applicable record.
         * @since 2016.1
         */
        type each = (scriptContext: eachContext) => void;
    }

    /** Workflow Action Script entry point. See "SuiteScript 2.x Workflow Action Script Entry Points and API". */
    namespace WorkflowAction {
        interface onActionContext {
            /** The new record. */
            readonly newRecord: N_record.Record;
            /** The old record (the previous state of the record), if any. */
            readonly oldRecord: N_record.Record | null;
            /**
             * The current form. Available only in the beforeLoad context of the workflow.
             * @since 2016.2
             */
            readonly form?: N_ui_serverWidget.Form;
            /**
             * The event type that triggered the workflow (for example, create, edit, view, or delete).
             * @since 2016.2
             */
            readonly type?: string;
            /**
             * The internal ID of the workflow that calls the script.
             * @since 2016.2
             */
            readonly workflowId?: number;
        }

        /**
         * Defines a workflow action script trigger point.
         * Oracle's onAction(scriptContext) page lists the return type as void, but the Workflow Action Script Type sample returns a value
         * that the workflow can store in a workflow field (Store Result In), so any return value is allowed here.
         * @since 2016.1
         */
        type onAction = (scriptContext: onActionContext) => unknown;
    }

    /**
     * RESTlet entry points. See "SuiteScript 2.x RESTlet Script Entry Points and API".
     * T is the shape of the request parameters/body; Y is the return type. A RESTlet can return a string, an object
     * (serialized as JSON when the Content-Type is application/json), or a custom response created with N/scriptTypes/restlet createResponse(options).
     */
    namespace RESTlet {
        /** Custom HTTP response created with restlet.createResponse(options) (N/scriptTypes/restlet). */
        type Response = N_restlet.Response;
        /**
         * Executes when an HTTP GET request is sent. requestParams holds the URL query parameters (as strings).
         * @since 2015.2
         */
        type get<T = unknown, Y = string> = (requestParams?: Partial<T>) => Promise<Y | Response> | Y | Response;
        /**
         * Executes when an HTTP DELETE request is sent. requestParams holds the URL query parameters (as strings).
         * @since 2015.2
         */
        type delete_<T = unknown, Y = string> = (requestParams?: Partial<T>) => Promise<Y | Response> | Y | Response;
        /**
         * Executes when an HTTP POST request is sent. requestBody is an object if the Content-Type is application/json, otherwise a string.
         * @since 2015.2
         */
        type post<T = unknown, Y = string> = (requestBody?: Partial<T> | string) => Promise<Y | Response> | Y | Response;
        /**
         * Executes when an HTTP PUT request is sent. requestBody is an object if the Content-Type is application/json, otherwise a string.
         * @since 2015.2
         */
        type put<T = unknown, Y = string> = (requestBody?: Partial<T> | string) => Promise<Y | Response> | Y | Response;
    }

    /** Bundle Installation Script entry points. See "SuiteScript 2.x Bundle Installation Script Entry Points". */
    namespace BundleInstallation {
        interface onAfterInstallContext {
            /** The version of the bundle being installed in the target account. */
            readonly version: string;
        }

        /**
         * Executes after a bundle is installed for the first time in a target account.
         * @since 2016.1
         */
        type afterInstall = (scriptContext: onAfterInstallContext) => void;

        interface onAfterUpdateContext {
            /** The version of the bundle that is currently installed in the target account. */
            readonly fromVersion: string;
            /** The new version of the bundle that is being installed in the target account. */
            readonly toVersion: string;
        }

        /**
         * Executes after a bundle in a target account is updated.
         * @since 2016.1
         */
        type afterUpdate = (scriptContext: onAfterUpdateContext) => void;

        interface onBeforeInstallContext {
            /** The version of the bundle being installed in the target account. */
            readonly version: string;
        }

        /**
         * Executes before a bundle is installed for the first time in a target account. Calls to scheduled scripts are not supported.
         * @since 2016.1
         */
        type beforeInstall = (scriptContext: onBeforeInstallContext) => void;

        interface onBeforeUninstallContext {
            /** The version of the bundle being uninstalled from the target account. */
            readonly version: string;
        }

        /**
         * Executes before a bundle is uninstalled from a target account. Calls to scheduled scripts are not supported.
         * @since 2016.1
         */
        type beforeUninstall = (scriptContext: onBeforeUninstallContext) => void;

        interface onBeforeUpdateContext {
            /** The version of the bundle currently installed in the target account. */
            readonly fromVersion: string;
            /** The version of the bundle that will be installed in the target account. */
            readonly toVersion: string;
        }

        /**
         * Executes before a bundle in a target account is updated. Calls to scheduled scripts are not supported.
         * @since 2016.1
         */
        type beforeUpdate = (scriptContext: onBeforeUpdateContext) => void;
    }

    /** SDF Installation Script entry point. See "SuiteScript 2.x SDF Installation Script Entry Points". */
    namespace SDFInstallation {
        interface runContext {
            /** The version of the SuiteApp currently installed on the account. Null if this is a new installation. */
            readonly fromVersion: string | null;
            /** The version of the SuiteApp that will be installed on the account. */
            readonly toVersion: string;
        }

        /**
         * Defines the SDF installation script trigger point.
         * @since 2015.2
         */
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

            interface refreshDataContext extends N_FiConnectivity.refreshDataContext {

            }

            interface getRefreshRequestStatusContext extends N_FiConnectivity.getRefreshRequestStatusContext {

            }

            type getTransactionData = N_FiConnectivity.getTransactionData;
            type getAccounts = N_FiConnectivity.getAccounts;
            type getConfigurationIFrameUrl = N_FiConnectivity.getConfigurationIFrameUrl;
            type refreshData = N_FiConnectivity.refreshData;
            type getRefreshRequestStatus = N_FiConnectivity.getRefreshRequestStatus;
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

    /**
     * Custom Tool Script (AI Connector) tool methods. See "SuiteScript 2.1 Custom Tool Script Type".
     * Custom tool scripts have no fixed entry points: each tool method is named in the tool's JSON schema, receives the
     * input values as a single args object, and must be declared async.
     */
    namespace CustomTool {
        /**
         * A custom tool method. A is the shape of the input arguments (per the tool's JSON-RPC schema); R is the (serializable) result.
         * Oracle recommends converting objects to JSON strings before returning them.
         */
        type method<A = Record<string, unknown>, R = unknown> = (args: A) => Promise<R>;
    }

    /**
     * Custom Record Action Script entry points.
     * Not documented on Oracle's SuiteScript 2.1 Script Types pages; these context shapes are based on community usage and are unverified.
     */
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
