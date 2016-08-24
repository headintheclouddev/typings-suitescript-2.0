
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

export function alert(options: AlertOptions): Promise<boolean>;
export function confirm(options: AlertOptions): Promise<boolean>;
export function create(options: CreateDialogOptions): Promise<string>;
