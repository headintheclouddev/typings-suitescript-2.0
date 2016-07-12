import AuthModule = require('./auth');
import ConfigModule = require('./config');
import CryptoModule = require('./crypto');
import CurrencyModule = require('./currency');
import CurrentRecordModule = require('./currentRecord');
import EmailModule = require('./email');
import EncodeModule = require('./encode');
import ErrorModule = require('./error');
import FileModule = require('./file');
import FormatModule = require('./format');
import HttpModule = require('./http');
import HttpsModule = require('./https');
import PluginModule = require('./plugin');
import PortletModule = require('./portlet');
import RecordModule = require('./record');
import RedirectModule = require('./redirect');
import RenderModule = require('./render');
import RuntimeModule = require('./runtime');
import SearchModule = require('./search');
import SsoModule = require('./sso');
import TaskModule = require('./task');
import TransactionModule = require('./transaction');
import URLModule = require('./url');
import WorkflowModule = require('./workflow');
import DialogModule = require('./ui/dialog');
import MessageModule = require('./ui/message');
import ServerWidgetModule = require('./ui/serverWidget');

interface NUIModule {
    dialog: typeof DialogModule;
    message: typeof MessageModule;
    serverWidget: typeof ServerWidgetModule;
}

interface NModule {
    auth: typeof AuthModule;
    config: typeof ConfigModule;
    crypto: typeof CryptoModule;
    currency: typeof CurrencyModule;
    currentRecord: typeof CurrentRecordModule;
    email: typeof EmailModule;
    encode: typeof EncodeModule;
    error: typeof ErrorModule;
    file: typeof FileModule;
    format: typeof FormatModule;
    http: typeof HttpModule;
    https: typeof HttpsModule;
    plugin: typeof PluginModule;
    portlet: typeof PortletModule;
    record: typeof RecordModule;
    redirect: typeof RedirectModule;
    render: typeof RenderModule;
    runtime: typeof RuntimeModule;
    search: typeof SearchModule;
    sso: typeof SsoModule;
    task: typeof TaskModule;
    transaction: typeof TransactionModule;
    ui: NUIModule;
    url: typeof URLModule;
    workflow: typeof WorkflowModule;
}

declare var _: NModule;
export = _;
