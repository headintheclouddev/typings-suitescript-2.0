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
    value: number | string;
}
