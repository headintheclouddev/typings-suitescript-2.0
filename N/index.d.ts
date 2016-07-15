import * as N_auth from './auth';
import * as N_config from './config';
import * as N_crypto from './crypto';
import * as N_currency from './currency';
import * as N_currentRecord from './currentRecord';
import * as N_email from './email';
import * as N_encode from './encode';
import * as N_error from './error';
import * as N_file from './file';
import * as N_format from './format';
import * as N_http from './http';
import * as N_https from './https';
import * as N_log from './log';
import * as N_plugin from './plugin';
import * as N_portlet from './portlet';
import * as N_record from './record';
import * as N_redirect from './redirect';
import * as N_render from './render';
import * as N_runtime from './runtime';
import * as N_search from './search';
import * as N_sso from './sso';
import * as N_task from './task';
import * as N_transaction from './transaction';
import * as N_url from './url';
import * as N_util from './util';
import * as N_workflow from './workflow';
import * as N_ui_dialog from './ui/dialog';
import * as N_ui_message from './ui/message';
import * as N_ui_serverWidget from './ui/serverWidget';

export {N_auth as auth};
export {N_config as config};
export {N_crypto as crypto};
export {N_currency as currency};
export {N_currentRecord as currentRecord};
export {N_email as email};
export {N_encode as encode};
export {N_error as error};
export {N_file as file};
export {N_format as format};
export {N_http as http};
export {N_https as https};
export {N_log as log};
export {N_plugin as plugin};
export {N_portlet as portlet};
export {N_record as record};
export {N_redirect as redirect};
export {N_render as render};
export {N_runtime as runtime};
export {N_search as search};
export {N_sso as sso};
export {N_task as task};
export {N_transaction as transaction};
export {N_url as url};
export {N_util as util};
export {N_workflow as workflow};

declare interface N_UI_Module {
    dialog: typeof N_ui_dialog,
    message: typeof N_ui_message,
    serverWidget: typeof N_ui_serverWidget,
}
declare var N_ui: N_UI_Module;
export {N_ui as ui};

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
            lineNum: string;
            columnNum: string;
        }
        type fieldChanged = (scriptContext?: fieldChangedContext) => void;

        interface lineInitContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }
        type lineInit = (scriptContext?: lineInitContext) => void;

        interface pageInitContext {
            currentRecord: N_record.ClientCurrentRecord;
            mode: string;
        }
        type pageInit = (scriptContext?: pageInitContext) => void;

        interface postSourcingContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            fieldId: string;
        }
        type postSourcing = (scriptContext?: postSourcingContext) => void;

        interface saveRecordContext {
            currentRecord: N_record.ClientCurrentRecord;
        }
        type saveRecord = (scriptContext?: saveRecordContext) => boolean;

        interface sublistChangedContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            /**
             * Commit, etc.
             */
            operation: string;
        }
        type sublistChanged = (scriptContext?: sublistChangedContext) => void;

        interface validateDeleteContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }
        type validateDelete = (scriptContext?: validateDeleteContext) => boolean;

        interface validateFieldContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
            fieldId: string;
            lineNum?: string;
            columnNum?: string;
        }
        type validateField = (scriptContext?: validateFieldContext) => boolean;

        interface validateInsertContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }
        type validateInsert = (scriptContext?: validateInsertContext) => boolean;

        interface validateLineContext {
            currentRecord: N_record.ClientCurrentRecord;
            sublistId: string;
        }
        type validateLine = (scriptContext?: validateLineContext) => boolean;
    }

    namespace UserEvent {
        interface beforeLoadContext {
            newRecord: N_record.Record;
            form: N_ui_serverWidget.Form;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }
        type beforeLoad = (scriptContext?: beforeLoadContext) => void;

        interface beforeSubmitContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }
        type beforeSubmit = (scriptContext?: beforeSubmitContext) => void;

        interface afterSubmitContext {
            newRecord: N_record.Record;
            oldRecord: N_record.Record;
            type: UserEventType;
            UserEventType: UserEventTypes;
        }
        type afterSubmit = (scriptContext?: afterSubmitContext) => void;
    }

    namespace Scheduled {
        interface executeContext {
            type: ScheduledInvocationType;
            InvocationType: ScheduledInvocationTypes;
        }
        type execute = (scriptContext?: executeContext) => void;
    }

    namespace MapReduce {
        interface ObjectReference {
            id: string;
            type: string;
        }
        type getInputData = () => N_search.Search | Object | Object[] | ObjectReference;

        interface mapContext {
            key: string;
            value: string;
            write: (key: string, value: string) => void;
        }
        type map = (scriptContext?: mapContext) => void;

        interface reduceContext {
            key: string;
            values: string[];
            write: (key: string, value: string[]) => void;
        }
        type reduce = (scriptContext?: reduceContext) => void;

        interface MapReduceIterator {
            each(callback: (key: string, value: string) => void): void;
        }
        interface MapReduceIteratorContainer {
            iterator(): MapReduceIterator;
        }
        interface InputSummary {
            dateCreated: Date;
            seconds: number;
            usage: number;
            error: string;
        }
        interface MapSummary {
            dateCreated: Date;
            seconds: number;
            usage: number;
            concurrency: number;
            yields: number;
            keys: MapReduceIteratorContainer;
            errors: MapReduceIteratorContainer;
        }
        interface ReduceSummary {
            dateCreated: Date;
            seconds: number;
            usage: number;
            concurrency: number;
            yields: number;
            keys: MapReduceIteratorContainer;
            errors: MapReduceIteratorContainer;
        }
        interface summaryContext {
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
        type summary = (summary?: summaryContext) => void;
    }

    namespace Portlet {
        interface renderContext {
            portlet: N_portlet.Portlet;
            column: number;
            entityid: string;
        }
        type render = (scriptContext?: renderContext) => void;
    }

    namespace Suitelet {
        interface onRequestContext {
            request: N_http.ServerRequest;
            response: N_http.ServerResponse;
        }
        type onRequest = (scriptContext?: onRequestContext) => void;
    }
}
