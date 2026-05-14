import * as N_action from "./N/action";
import * as N_auth from "./N/auth";
import * as N_cache from "./N/cache";
import * as N_certificateControl from "./N/certificateControl";
import type * as N_commerce_recordView from "./N/commerce/recordView";
import * as N_compress from "./N/compress";
import * as N_config from "./N/config";
import * as N_crypto from "./N/crypto";
import * as N_currency from "./N/currency";
import * as N_currentRecord from "./N/currentRecord";
import * as N_dataset from "./N/dataset";
import * as N_documentCapture from "./N/documentCapture";
import * as N_email from "./N/email";
import * as N_encode from "./N/encode";
import * as N_error from "./N/error";
import * as N_file from "./N/file";
import * as N_format from "./N/format";
import * as N_http from "./N/http";
import * as N_https from "./N/https";
import * as N_keyControl from "./N/keyControl";
import * as N_llm from "./N/llm";
import * as N_log from "./N/log";
import * as N_machineTranslation from "./N/machineTranslation";
import * as N_pgp from "./N/pgp";
import * as N_piRemoval from "./N/piremoval";
import * as N_plugin from "./N/plugin";
import * as N_portlet from "./N/portlet";
import * as N_query from "./N/query";
import * as N_record from "./N/record";
import * as N_recordContext from "./N/recordContext";
import * as N_redirect from "./N/redirect";
import * as N_render from "./N/render";
import * as N_runtime from "./N/runtime";
import * as N_search from "./N/search";
import * as N_sftp from "./N/sftp";
import * as N_sso from "./N/sso";
import * as N_suiteAppInfo from "./N/suiteAppInfo";
import * as N_task from "./N/task";
import * as N_transaction from "./N/transaction";
import * as N_translation from "./N/translation";
import type * as N_ui_dialog from "./N/ui/dialog";
import type * as N_ui_message from "./N/ui/message";
import type * as N_ui_serverWidget from "./N/ui/serverWidget";
import * as N_url from "./N/url";
import * as N_util from "./N/util";
import * as N_workbook from "./N/workbook";
import * as N_workflow from "./N/workflow";
import * as N_xml from "./N/xml";

// import * as N_crypto_certificate from './N/crypto/certificate';
// import * as N_https_clientCertificate from './N/https/clientCertificate';

export {
  N_action as action,
  N_auth as auth,
  N_cache as cache,
  N_certificateControl as certificateControl,
  N_compress as compress,
  N_config as config,
  N_crypto as crypto,
  N_currency as currency,
  N_currentRecord as currentRecord,
  N_dataset as dataset,
  N_documentCapture as documentCapture,
  N_email as email,
  N_encode as encode,
  N_error as error,
  N_file as file,
  N_format as format,
  N_http as http,
  N_https as https,
  N_keyControl as keyControl,
  N_llm as llm,
  N_log as log,
  N_machineTranslation as machineTranslation,
  N_pgp as pgp,
  N_piRemoval as piremoval,
  N_plugin as plugin,
  N_portlet as portlet,
  N_query as query,
  N_record as record,
  N_recordContext as recordContext,
  N_redirect as redirect,
  N_render as render,
  N_runtime as runtime,
  N_search as search,
  N_sftp as sftp,
  N_sso as sso,
  N_suiteAppInfo as suiteAppInfo,
  N_task as task,
  N_transaction as transaction,
  N_translation as translation,
  N_url as url,
  N_util as util,
  N_workbook as workbook,
  N_workflow as workflow,
  N_xml as xml,
};

declare interface N_UI_Module {
  dialog: typeof N_ui_dialog;
  message: typeof N_ui_message;
  serverWidget: typeof N_ui_serverWidget;
}

declare interface N_Commerce_Module {
  recordView: typeof N_commerce_recordView;
}

declare const N_ui: N_UI_Module;
declare const N_commerce: N_Commerce_Module;

// declare const N_crypto_:  N_Crypto_Module;
// declare const N_https_:   N_Https_Module;
export { N_commerce as commerce, N_ui as ui };
// export {N_crypto_ as crypto}; // We don't have to do this
// export {N_https_  as https};  // We don't have to do this
