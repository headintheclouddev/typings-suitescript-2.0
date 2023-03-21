import {record} from "../N";

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
    recordType: string | record.Type; // Documentation says it just accepts string, but record.Type values are strings.
    recordId: string | number;
    isEditMode?: boolean;
    params?: any;
}

interface resolveScriptOptions {
    /** The script ID (string) or internal ID (number) of the script. The ID must identify a RESTlet or a Suitelet. */
    scriptId: string|number;
    /** The script ID (string) or internal ID (number) of the deployment script. */
    deploymentId: string|number;
    /** The object containing name/value pairs to describe the query. */
    params?: any;
    /** Indicates whether to return the external URL. By default, the internal URL is returned (that is, the default value is false). */
    returnExternalUrl?: boolean;
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
