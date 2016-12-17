interface formatOptions {
    domain: string;
    parameters: any;
}

interface resolveRecordOptions {
    recordType: string;
    recordId: string;
    isEditMode?: boolean;
    params?: any;
}

interface resolveScriptOptions {
    scriptId: string;
    deploymentId: string;
    returnExternalUrl?: boolean;
    params?: any;
}

interface resolveTaskLinkOptions {
    id: string;
    parameters?: any;
}

export function format(options: formatOptions): string;
export function resolveRecord(options: resolveRecordOptions): string;
export function resolveScript(options: resolveScriptOptions): string;
export function resolveTaskLink(options: resolveTaskLinkOptions): string;
