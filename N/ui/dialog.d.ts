/// <reference path="../../typings/tsd.d.ts" />

interface AlertOptions {
    title?: string;
    message?: string;
}

interface CreateDialogOptions {
    buttons?: DialogButton[];
    title?: string;
    message?: string;
}

interface DialogButton {
    label: string;
    value: number|string;
}

interface dialog {
    alert(options: AlertOptions): Promise<boolean>;
    confirm(options: AlertOptions): Promise<boolean>;
    create(options: CreateDialogOptions): Promise<string>;
}

declare module ui {
    var dialog: dialog;
}

declare module 'N/ui/dialog' {
    export = ui.dialog;
}
