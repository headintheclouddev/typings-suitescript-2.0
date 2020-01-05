import {File} from './file';
import {Form} from './ui/serverWidget';
import {SecureString} from 'N/https';

interface AddHeaderOptions {
    /** The name of the header. */
    name: string;
    /** The value used to set the header. */
    value: string;
}

interface GetHeaderOptions {
    /** The name of the header. */
    name: string;
}

interface SendRedirectOptions {
    /**
     * The base type for this resource.
     * Use one of the following values: RECORD | TASKLINK | SUITELET
     */
    type: RedirectType;
    /**
     * The primary ID for this resource.
     * If the base type is RECORD, pass in the record type as listed on the Records Browser.
     * If the base type is TASKLINK, pass in the task ID. For a list of supported task IDs, see Supported Tasklinks.
     * If the base type is SUITELET, input the script ID.
     */
    identifier: string;
    /**
     * -optional- The secondary ID for this resource. If the base type is SUITLET, pass in the deployment ID.
     */
    id?: string;
    /**
     * -optional- If the base type is RECORD, this value determines whether to return a URL for the record in EDIT or VIEW mode.
     * The default value is false.
     */
    editMode?: boolean;
    /**
     * -optional- Additional URL parameters as name/value pairs.
     */
    parameters?: any;
}

interface SetHeaderOptions {
    /** The name of the header. */
    name: string;
    /** The value used to set the header. */
    value: string;
}

interface RenderPDFOptions {
    /** Content of the pdf. */
    xmlString: string;
}

interface SetCDNCacheableOptions {
    /** The value of the caching duration. Set using the http.CacheDuration enum. */
    type: CacheDuration;
}

interface WriteOptions {
    /** The output string or file being written. */
    output: string;
}

interface WriteFileOptions {
    /** The file to be written */
    file: File;
    /** -optional- Determines whether the field is inline. If true, the file is inline. */
    isInline?: boolean;
}

interface WriteLineOptions {
    /** The output string being written. */
    output: string;
}

interface WritePageOptions {
    /** A standalone page object in the form of an assistant, form or list. */
    pageObject: any;
}

interface GetLineCountOptions {
    /** The sublist internal ID. */
    group: string;
}

export interface GetOptions {
    /** The HTTP URL being requested. */
    url: string | SecureString;
    /** -optional- The HTTP headers. */
    headers?: any;
    /**
     * Pass an array of GUIDs here to be decoded by the server. Reference GUIDs must be in curly braces where used.
     * For example, if you have a GUID for a username:password for basic auth, your header would be: { Authorization: `Basic {${guid}}` }
     * Note: This attribute is undocumented as of 5 Jan 2020, but it is shown in the https module script sample code.
     * Confirmed that this actually a thing, as of NetSuite 2019.2.  Used in HITC SMS Suitelet for basic authentication.
     */
    credentials?: string[];
}

export interface DeleteOptions extends GetOptions {}

export interface PostOptions extends GetOptions {
    /** The POST data. */
    body: string | any;
}

export interface PutOptions extends PostOptions {}

export interface RequestOptions  extends GetOptions {
    /**
     * The HTTP request method. Set using the http.Method enum.
     * Allow usage as string here as N/http is a heavy import just
     * to get an enum.
     */
    method: Method | string;
    /**
     * -optional- The POST data if the method is POST. If method is DELETE, body data is ignored.
     */
    body?: string | any;
}

interface HttpDeleteFunction {
    (options: DeleteOptions): ClientResponse;
    promise(options: DeleteOptions): Promise<ClientResponse>;
}

interface HttpGetFunction {
    (options: GetOptions): ClientResponse;
    promise(options: GetOptions): Promise<ClientResponse>;
}

interface HttpPostFunction {
    (options: PostOptions): ClientResponse;
    promise(options: PostOptions): Promise<ClientResponse>;
}

interface HttpPutFunction {
    (options: PutOptions): ClientResponse;
    promise(options: PutOptions): Promise<ClientResponse>;
}

interface HttpRequestFunction {
    (options: RequestOptions): ClientResponse;
    promise(options: RequestOptions): Promise<ClientResponse>;
}

/**
 * Encapsulates the response to an HTTP client request.
 */
export interface ClientResponse {
    /**
     * The client response body.
     */
    body: string;
    /**
     * The client response code.
     */
    code: number;
    /**
     * The response header or headers.
     */
    headers: any;
}

interface GetSublistValueOptions {
    /** The sublist internal ID. */
    group: string;
    /** The sublist line item ID (name of the field). */
    name: string;
    /** The sublist line number (starts at 0). */
    line: number;
}

/**
 * Encapsulates the HTTP request information sent to an HTTP server. For example, a request received by a Suitelet or RESTlet.
 */
export interface ServerRequest {
    /**
     * Method used to return the number of lines in a sublist.
     */
    getLineCount(options: GetLineCountOptions): number;
    /**
     * Method used to return the value of a sublist line item.
     */
    getSublistValue(options: GetSublistValueOptions): string;
    /**
     * The server request body.
     */
    body: string;
    /**
     * The remote IP address that made this request.
     */
    clientIpAddress: string;
    /**
     * The server request files.
     */
    files: any;
    /**
     * The server request headers.
     */
    headers: any;
    /**
     * The server request http method.
     * Allow usage as string here as N/http is a heavy import just
     * to get an enum.
     */
    method: Method | string;
    /**
     * The server request parameters.
     */
    parameters: any;
    /**
     * The server request URL.
     */
    url: string;
}

/**
 * Encapsulates the response from an HTTP server to an HTTP request. For example, a response from a Suitelet or RESTlet.
 */
export interface ServerResponse {
    /**
     * Method used to add a header to the response.
     * If the same header has already been set, this method adds another line for that header.
     */
    addHeader(options: AddHeaderOptions): void;
    /**
     * Method used to return the value or values of a response header.
     * If multiple values are assigned to the header name, the values are returned as an Array.
     */
    getHeader(options: GetHeaderOptions): string | string[];
    /**
     * Method used to set the redirect URL by resolving to a NetSuite resource.
     */
    sendRedirect(options: SendRedirectOptions): void;
    /**
     * Method used to set the value of a response header.
     */
    setHeader(options: SetHeaderOptions): void;
    /**
     * Method used to generate and render a PDF directly to the response.
     * This primarily converts XML to PDF.
     */
    renderPdf(options: RenderPDFOptions): void;
    /**
     * Method used to set CDN caching for a period of time.
     */
    setCdnCacheable(options: SetCDNCacheableOptions): void;
    /**
     * Method used to write information to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     */
    write(output: string): void;
    /**
     * Method used to write information to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     */
    write(options: WriteOptions): void;
    /**
     * Method used to write a file to the response.
     */
    writeFile(options: WriteFileOptions): void;
    /**
     * Method used to write line information to the response.
     */
    writeLine(options: WriteLineOptions): void;
    /**
     * Method used to generate a page.
     */
    writePage(options: WritePageOptions): void;
    /**
     * Another method used to generate a page.
     * This isn't documented and shouldn't work, but does.
     */
    writePage(form: Form): void;
    /**
     * The server response headers. This property is read-only.
     */
    headers: any;
}

/**
 * Sends an HTTP GET request and returns the response.
 */
export var get: HttpGetFunction;

/**
 * Sends an HTTP DELETE request and returns the response.
 */
declare var deleteFunc: HttpDeleteFunction;
export {deleteFunc as delete};

/**
 * Sends an HTTP request and returns the response.
 */
export var request: HttpRequestFunction;

/**
 * Sends an HTTP POST request and returns the response.
 */
export var post: HttpPostFunction;

/**
 * Sends an HTTP PUT request and returns the response.
 */
export var put: HttpPutFunction;

/**
 * Holds the string values for supported cache durations.
 * This enum is used to set the value of the ServerResponse.setCdnCacheable(options) property.
 */
export enum CacheDuration {
    LONG,
    MEDIUM,
    SHORT,
    UNIQUE,
}

/**
 * Holds the string values for supported HTTP requests.
 * This enum is used to set the value of http.request(options) and ServerRequest.method.
 */
export enum Method {
    DELETE,
    GET,
    PUT,
    POST,
}

export enum RedirectType {
    MEDIA_ITEM,
    RECORD,
    RESTLET,
    SUITELET,
    TASK_LINK
}
