import AuthModule from './auth';
import ConfigModule from './config';
import CryptoModule from './crypto';
import CurrencyModule from './currency';
import CurrentRecordModule from './currentRecord';
import EmailModule from './email';
import EncodeModule from './encode';
import ErrorModule from './error';
import FileModule from './file';
import FormatModule from './format';
import HttpModule from './http';
import HttpsModule from './https';
import PluginModule from './plugin';
import PortletModule from './portlet';
import RecordModule from './record';
import RedirectModule from './redirect';
import RenderModule from './render';
import RuntimeModule from './runtime';
import SearchModule from './search';
import SsoModule from './sso';
import TaskModule from './task';
import TransactionModule from './transaction';
import URLModule from './url';
import WorkflowModule from './workflow';
import DialogModule from './ui/dialog';
import MessageModule from './ui/message';
import ServerWidgetModule from './ui/serverWidget';

export interface NUIModule {
    dialog: DialogModule;
    message: MessageModule;
    serverWidget: ServerWidgetModule;
}

export interface NModule {
    auth: AuthModule;
    config: ConfigModule;
    crypto: CryptoModule;
    currency: CurrencyModule;
    currentRecord: CurrentRecordModule;
    email: EmailModule;
    encode: EncodeModule;
    error: ErrorModule;
    file: FileModule;
    format: FormatModule;
    http: HttpModule;
    https: HttpsModule;
    plugin: PluginModule;
    portlet: PortletModule;
    record: RecordModule;
    redirect: RedirectModule;
    render: RenderModule;
    runtime: RuntimeModule;
    search: SearchModule;
    sso: SsoModule;
    task: TaskModule;
    transaction: TransactionModule;
    ui: NUIModule;
    url: URLModule;
    workflow: WorkflowModule;
}

export default NModule;

export interface LogFunction {
    (title: string, details: string);
}

export interface LogInterface {
    debug: LogFunction;
    audit: LogFunction;
    error: LogFunction;
    emergency: LogFunction;
}

declare var log: LogInterface;

export interface UtilInterface {
    each: any;
    extend: any;
    isArray: (toTest: any) => boolean;
    isBoolean: (toTest: any) => boolean;
    isDate: (toTest: any) => boolean;
    isFunction: (toTest: any) => boolean;
    isNumber: (toTest: any) => boolean;
    isObject: (toTest: any) => boolean;
    isRegExp: (toTest: any) => boolean;
    isString: (toTest: any) => boolean;
    trim: (toTrim: string) => string;
}

declare var util: UtilInterface;

export interface Window { // Fun undocumented NetSuite stuff
    /**
     * Gets the value of a URL parameter (undocumented NetSuite method).
     * @param {string} parameter The URL parameter to get the value of.
     */
    getParameter(parameter: string): string;
}

/**
 * Client method to submit the current record (undocumented NetSuite method).
 * @param {string} name The name of the save button to trigger.
 * @param {boolean} arg2 Not really sure what this parameter is used for.
 */
declare function NLDoMainFormButtonAction(name: string, arg2: boolean): void;

/**
 * Standard module loading function ala RequireJS.
 * Always available in SSv2 contexts.
 */
declare function require(modules: string[], callback?: (...any) => any);
