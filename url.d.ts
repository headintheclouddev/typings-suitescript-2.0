export interface formatOptions {
    domain: string;
    parameters: Object;
}

export interface resolveRecordOptions {
    recordType: string;
    recordId: string;
    isEditMode?: boolean;
    params?: Object;
}

export interface resolveScriptOptions {
    scriptId: string;
    deploymentId: string;
    returnExternalUrl?: boolean;
    params?: Object;
}

export interface resolveTaskLinkOptions {
    id: string;
    parameters?: Object;
}

export interface URLModule {
    format: (options: formatOptions) => string;
    resolveRecord: (options: resolveRecordOptions) => string;
    resolveScript: (options: resolveScriptOptions) => string;
    resolveTaskLink: (options: resolveTaskLinkOptions) => string;
}

export default URLModule;
