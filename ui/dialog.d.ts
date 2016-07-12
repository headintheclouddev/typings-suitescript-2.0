export interface AlertOptions {
    title?: string;
    message?: string;
}

export interface CreateDialogOptions {
    buttons?: DialogButton[];
    title?: string;
    message?: string;
}

export interface DialogButton {
    label: string;
    value: number | string;
}

export interface DialogModule {
    alert(options: AlertOptions): Promise<boolean>;
    confirm(options: AlertOptions): Promise<boolean>;
    create(options: CreateDialogOptions): Promise<string>;
}

export default DialogModule;
