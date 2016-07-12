/// <reference path="../../SuiteScript2.0-Globals/index.d.ts" />

interface DialogModule {
    alert(options: AlertOptions): Promise<boolean>;
    confirm(options: AlertOptions): Promise<boolean>;
    create(options: CreateDialogOptions): Promise<string>;
}

declare var _: DialogModule;
export = _;
