interface formatOptions {
    domain: string;
    parameters: Object;
}

interface resolveRecordOptions {
    recordType: string;
    recordId: string;
    isEditMode?: boolean;
    params?: Object;
}

interface resolveScriptOptions {
    scriptId: string;
    deploymentId: string;
    returnExternalUrl?: boolean;
    params?: Object;
}

interface resolveTaskLinkOptions {
    id: string;
    parameters?: Object;
}
