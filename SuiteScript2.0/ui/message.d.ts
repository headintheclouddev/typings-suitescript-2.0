/// <reference path="../../SuiteScript2.0-Globals/index.d.ts" />

interface MessageModule {
    create(options: MessageCreateOptions): Message;
    Type: MessageType;
}

declare var _: MessageModule;
export = _;
