import * as N_action from './N/action';
import * as N_auth from './N/auth';
import * as N_cache from './N/cache';
import * as N_config from './N/config';
import * as N_crypto from './N/crypto';
import * as N_currency from './N/currency';
import * as N_currentRecord from './N/currentRecord';
import * as N_email from './N/email';
import * as N_encode from './N/encode';
import * as N_error from './N/error';
import * as N_file from './N/file';
import * as N_format from './N/format';
import * as N_http from './N/http';
import * as N_https from './N/https';
import * as N_log from './N/log';
import * as N_plugin from './N/plugin';
import * as N_portlet from './N/portlet';
import * as N_query from './N/query';
import * as N_record from './N/record';
import * as N_redirect from './N/redirect';
import * as N_render from './N/render';
import * as N_runtime from './N/runtime';
import * as N_search from './N/search';
import * as N_sftp from './N/sftp';
import * as N_sso from './N/sso';
import * as N_task from './N/task';
import * as N_transaction from './N/transaction';
import * as N_url from './N/url';
import * as N_util from './N/util';
import * as N_workflow from './N/workflow';
import * as N_xml from './N/xml';
import * as N_commerce_recordView from './N/commerce/recordView';
import * as N_ui_dialog from './N/ui/dialog';
import * as N_ui_message from './N/ui/message';
import * as N_ui_serverWidget from './N/ui/serverWidget';

export {N_action as action};
export {N_auth as auth};
export {N_cache as cache};
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
export {N_query as query};
export {N_record as record};
export {N_redirect as redirect};
export {N_render as render};
export {N_runtime as runtime};
export {N_search as search};
export {N_sftp as sftp};
export {N_sso as sso};
export {N_task as task};
export {N_transaction as transaction};
export {N_url as url};
export {N_util as util};
export {N_workflow as workflow};
export {N_xml as xml};

declare interface N_UI_Module {
    dialog:       typeof N_ui_dialog;
    message:      typeof N_ui_message;
    serverWidget: typeof N_ui_serverWidget;
}

declare interface N_Commerce_Module {
    recordView: typeof N_commerce_recordView;
}

declare var N_ui:       N_UI_Module;
declare var N_commerce: N_Commerce_Module;
export {N_ui       as ui};
export {N_commerce as commerce};
