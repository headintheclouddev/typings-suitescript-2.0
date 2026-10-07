import type {Type} from "./record";

/** URL query parameters as name/value pairs. */
type UrlParameters = Record<string, unknown>;

interface formatOptions {
    /** The domain name. */
    domain: string;
    /** Additional URL parameters as name/value pairs. */
    params: UrlParameters;
}

interface resolveHostOptions {
    /** The type of domain name you want to retrieve. Set this value using the url.HostType enum. */
    hostType: HostType;
    /** The NetSuite account ID for which you want to retrieve data. If no account is specified, the system returns data on the account that is running the script. */
    accountId?: string;
}

interface resolveRecordOptions {
    /** The type of record. For example, 'purchaseorder'. */
    recordType: string | Type; // Documentation says it just accepts string, but Type values are strings.
    /**
     * The record ID of the target record instance.
     * Note: Oracle's parameter table marks this as required, but omitting it produces a URL to a new record, so it is kept optional.
     */
    recordId?: string | number;
    /**
     * If set to true, returns a URL for the record in Edit mode. If set to false, returns a URL for the record in View mode. The default value is View.
     * Note: Oracle's parameter table marks this as required but also documents a default (View), so it is kept optional.
     */
    isEditMode?: boolean;
    /** Object used to add parameters for a custom URL. */
    params?: UrlParameters;
}

interface resolveScriptOptions {
    /** The script ID (string) or internal ID (number) of the script. The ID must identify a RESTlet or a Suitelet. */
    scriptId: string|number;
    /** The script ID (string) or internal ID (number) of the deployment script. */
    deploymentId: string|number;
    /** The object containing name/value pairs to describe the query. */
    params?: UrlParameters;
    /**
     * Indicates whether to return the external URL. By default, the internal URL is returned (that is, the default value is false).
     * Setting this value to true requires that the script is run in a trusted context for authenticated users.
     * To call a Suitelet with its internal URL from a server script, use https.requestSuitelet(options).
     */
    returnExternalUrl?: boolean;
}

interface resolveTaskLinkOptions {
    /** The task ID for the tasklink. Each page in NetSuite has a unique task ID associated with it for a specific record type. */
    id: string;
    /** The object containing name/value pairs to describe the query. */
    params?: UrlParameters;
}

/**
 * Creates a serialized representation of an object containing query parameters. Use the returned value to build a URL query string.
 *
 * Supported script types: Client and server scripts.
 * @returns The URL as a string.
 * @governance none
 * @since 2015.1
 */
export function format(options: formatOptions): string;
/**
 * Returns a domain name for a NetSuite account.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2017.1
 */
export function resolveDomain(options: resolveHostOptions): string;
/**
 * Returns the URL string to a NetSuite record.
 * This method doesn't work in unauthenticated client-side contexts.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.1
 */
export function resolveRecord(options: resolveRecordOptions): string;
/**
 * Returns an external or internal URL string to a RESTlet or Suitelet.
 * This method doesn't work in unauthenticated client-side contexts.
 *
 * Supported script types: Client and server scripts.
 * @governance none
 * @since 2015.1
 */
export function resolveScript(options: resolveScriptOptions): string;
/**
 * Returns the internal URL to a NetSuite tasklink.
 * This method doesn't work in unauthenticated client-side contexts.
 *
 * Supported script types: Client and server scripts.
 * @returns The URL as a string.
 * @governance none
 * @since 2015.2
 */
export function resolveTaskLink(options: resolveTaskLinkOptions): string;

/**
 * Holds the string values that describe a category of domain name. Use this enum to set the value of the hostType parameter of the url.resolveDomain(options) method.
 * The returned domains may change without notice; scripts must discover domain names dynamically.
 * @since 2017.1
 */
export enum HostType {
    /** The domain for UI access. Sample: <accountID>.app.netsuite.com */
    APPLICATION,
    /** The customer center. Sample: <accountID>.app.netsuite.com */
    CUSTOMER_CENTER,
    /** The domain for forms hosted online, usually in Suitelets. Sample: <accountID>.extforms.netsuite.com */
    FORM,
    /** The domain for calling a RESTlet from an external source. Sample: <accountID>.restlets.api.netsuite.com */
    RESTLET,
    /** The domain for SOAP web services requests. Sample: <accountID>.suitetalk.api.netsuite.com */
    SUITETALK
}
