import * as N_http from './http';
import * as N_portlet from './portlet';
import * as N_record from './record';
import * as N_search from './search';
import * as N_ui_serverWidget from './ui/serverWidget';

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
    SHIP: UserEventType;
    SPECIALORDER: UserEventType;
    TRANSFORM: UserEventType;
    VIEW: UserEventType;
    XEDIT: UserEventType;
}

declare enum ScheduledInvocationType {
    SCHEDULED,
    ON_DEMAND,
    USER,
    ABORTED,
    SKIPPED,
}
declare interface ScheduledInvocationTypes {
    SCHEDULED: ScheduledInvocationType;
    ON_DEMAND: ScheduledInvocationType;
    USER: ScheduledInvocationType;
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
            mode: 'create'|'copy'|'edit';
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
            retryCount?: 0|1|2|3;
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
            readonly write: (key: string, value: string) => void;
        }
        type map = (scriptContext: mapContext) => void;

        interface reduceContext {
            readonly isRestarted: boolean;
            readonly executionNo: number;
            readonly errors: MapReduceErrorIteratorContainer;
            readonly key: string;
            readonly values: string[];
            readonly write: (key: string, value: string) => void;
        }
        type reduce = (scriptContext: reduceContext) => void;

        interface MapReduceIterator {
            each(callback: (key: string, value: string) => boolean): void;
        }
        interface MapReduceIteratorContainer {
            iterator(): MapReduceIterator;
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
            keys: MapReduceIteratorContainer;
            errors: MapReduceErrorIteratorContainer;
        }
        interface ReduceSummary {
            dateCreated: Date;
            seconds: number;
            usage: number;
            concurrency: number;
            yields: number;
            keys: MapReduceIteratorContainer;
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
            output: MapReduceIteratorContainer;
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
        }
        type onAction = (scriptContext: onActionContext) => void;
    }

    namespace RESTlet {
        type get = (requestParameters: any) => any;
        type delete_ = (requestParameters: any) => any;
        type post = (requestBody: any) => any;
        type put = (requestBody: any) => any;
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
}
