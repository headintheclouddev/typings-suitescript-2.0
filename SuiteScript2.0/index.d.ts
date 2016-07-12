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
