interface formatOptions {
    domain: string;
    params: any;
}

interface resolveHostOptions {
    /** The type of domain name you want to retrieve. Set this value using the url.HostType enum. */
    hostType: HostType;
    /** The NetSuite account ID for which you want to retrieve data. If no account is specified, the system returns data on the account that is running the script. */
    accountId?: string;
}

interface resolveRecordOptions {
    recordType: string;
    recordId: string | number;
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
    params?: any;
}

/** Creates a serialized representation of an object containing query parameters. Use the returned value to build a URL query string. */
export function format(options: formatOptions): string;
/** Returns a domain name for a NetSuite account. */
export function resolveDomain(options: resolveHostOptions): string;
/** Returns the URL string to a NetSuite record. */
export function resolveRecord(options: resolveRecordOptions): string;
/** Returns an external or internal URL string to a script. */
export function resolveScript(options: resolveScriptOptions): string;
/** Returns the internal URL to a NetSuite tasklink. */
export function resolveTaskLink(options: resolveTaskLinkOptions): string;

export enum HostType {
    /** The domain for UI access, for users with a non-Customer Center role. Sample: system.na2.netsuite.com */
    APPLICATION,
    /** The domain for UI access, for users with a Customer Center role. Sample: system.na2.netsuite.com */
    CUSTOMER_CENTER,
    /** The domain for forms hosted online, usually in Suitelets. Sample: forms.na2.netsuite.com */
    FORM,
    /** The domain for calling a RESTlet from an external source. Sample: rest.na2.netsuite.com */
    RESTLET,
    /** The domain for SuiteTalk (web services) requests. Sample: webservices.​na2.​netsuite.​com */
    SUITETALK
}
