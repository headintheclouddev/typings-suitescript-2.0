import type {File} from './file';
import type {Assistant, Form, List} from './ui/serverWidget';
import type {SecureString} from './https';

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

export interface SendRedirectOptions {
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
    identifier: number | string;
    /**
     * -optional- The secondary ID for this resource. If the base type is SUITLET, pass in the deployment ID.
     */
    id?: number | string;
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
    pageObject: Assistant | Form | List;
}

interface GetLineCountOptions {
    /** The sublist internal ID. */
    group: string;
}

export interface GetOptions {
    /** The HTTP URL being requested. */
    url: string | SecureString;
    /** -optional- The HTTP headers. */
    headers?: object;
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
    method: Method | `${Method}`;
    /**
     * -optional- The POST data if the method is POST. If method is DELETE, body data is ignored.
     */
    body?: string | any;
}

interface HttpDeleteFunction {
    (options: DeleteOptions): ClientResponse;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: DeleteOptions): Promise<ClientResponse>;
}

interface HttpGetFunction {
    (options: GetOptions): ClientResponse;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: GetOptions): Promise<ClientResponse>;
}

interface HttpPostFunction {
    (options: PostOptions): ClientResponse;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: PostOptions): Promise<ClientResponse>;
}

interface HttpPutFunction {
    (options: PutOptions): ClientResponse;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: PutOptions): Promise<ClientResponse>;
}

interface HttpRequestFunction {
    (options: RequestOptions): ClientResponse;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: RequestOptions): Promise<ClientResponse>;
}

/**
 * Encapsulates the response to an HTTP client request.
 * @since 2015.2
 */
export interface ClientResponse {
    /**
     * The client response body.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    body: string;
    /**
     * The client response code.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    code: number;
    /**
     * The response header or headers.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    headers: object;
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
 * @since 2015.2
 */
export interface ServerRequest {
    /**
     * Method used to return the number of lines in a sublist.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.group is not specified.
     * @governance none
     * @since 2015.2
     */
    getLineCount(options: GetLineCountOptions): number;
    /**
     * Method used to return the value of a sublist line item.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.group or options.line is not specified.
     * @governance none
     * @since 2015.2
     */
    getSublistValue(options: GetSublistValueOptions): string;
    /**
     * The server request body.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    body: string;
    /**
     * The remote IP address that made this request.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    clientIpAddress: string;
    /**
     * The server request files.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    files: any;
    /**
     * The server request headers.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    headers: { [key: string]: string };
    /**
     * The server request http method.
     * Allow usage as string here as N/http is a heavy import just
     * to get an enum.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    method: Method | `${Method}`;
    /**
     * The server request parameters.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    parameters: any;
    /**
     * The server request URL.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    url: string;
}

/**
 * Encapsulates the response from an HTTP server to an HTTP request. For example, a response from a Suitelet or RESTlet.
 * @since 2015.2
 */
export interface ServerResponse {
    /**
     * Method used to add a header to the response.
     * If the same header has already been set, this method adds another line for that header.
     * @throws {SuiteScriptError} SSS_INVALID_HEADER if the header name or value is invalid (or the header is blocked for Suitelet responses).
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.name or options.value is not specified.
     * @governance none
     * @since 2015.2
     */
    addHeader(options: AddHeaderOptions): void;
    /**
     * Method used to return the value or values of a response header.
     * If multiple values are assigned to the header name, the values are returned as an Array.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.name is not specified.
     * @governance none
     * @since 2015.2
     */
    getHeader(options: GetHeaderOptions): string | string[];
    /**
     * Method used to set the redirect URL by resolving to a NetSuite resource.
     * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the redirect type is RECORD and an invalid record type is input for options.identifier. (https.ServerResponse.sendRedirect(options) documents this as INVALID_RCRD_TYPE.)
     * @throws {SuiteScriptError} SSS_INVALID_SCRIPT_ID_1 if the type is SUITELET or RESTLET and an invalid script ID or deployment ID is input for options.identifier or options.id. (https documents this as INVALID_ID.)
     * @throws {SuiteScriptError} SSS_INVALID_TASK_ID if the type is TASK_LINK and an invalid task ID is input for options.identifier. (https documents this as INVALID_TASK_ID.)
     * @throws {SuiteScriptError} SSS_INVALID_URL_CATEGORY if options.type is not a recognized http.RedirectType value.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.identifier or options.type is not specified (also thrown if an enum value is misspelled).
     * @governance none
     * @since 2015.2
     */
    sendRedirect(options: SendRedirectOptions): void;
    /**
     * Method used to set the value of a response header.
     * @throws {SuiteScriptError} SSS_INVALID_HEADER if the header name or value is invalid (or the header is blocked for Suitelet responses).
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.name or options.value is not specified.
     * @governance none
     * @since 2015.2
     */
    setHeader(options: SetHeaderOptions): void;
    /**
     * Method used to generate and render a PDF directly to the response.
     * This primarily converts XML to PDF.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.xmlString is not specified.
     * @governance 10 units
     * @since 2015.2
     */
    renderPdf(options: RenderPDFOptions): void;
    /**
     * Method used to set CDN caching for a period of time.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type is not specified.
     * @governance none
     * @since 2015.2
     */
    setCdnCacheable(options: SetCDNCacheableOptions): void;
    /**
     * Method used to write information to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     * @governance none
     * @since 2015.2
     */
    write(output: string): void;
    /**
     * Method used to write information to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.output is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.output is not a string.
     * @governance none
     * @since 2015.2
     */
    write(options: WriteOptions): void;
    /**
     * Method used to write a file to the response.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.file is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.file is not a file.File object.
     * @governance none
     * @since 2015.2
     */
    writeFile(options: WriteFileOptions): void;
    /**
     * Method used to write line information to the response.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.output is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.output is not a string.
     * @governance none
     * @since 2015.2
     */
    writeLine(options: WriteLineOptions): void;
    /**
     * Method used to generate a page.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.pageObject is not specified.
     * @governance none
     * @since 2015.2
     */
    writePage(options: WritePageOptions): void;
    /**
     * Another method used to generate a page.
     * This isn't documented and shouldn't work, but does.
     */
    writePage(form: Form): void;
    /**
     * The server response headers. This property is read-only.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    headers: object;
}

/**
 * Sends an HTTP GET request and returns the response.
 * @throws {SuiteScriptError} SSS_INVALID_HOST_CERT if an untrusted, unsupported, or invalid certificate was found for this host, or the domain name in options.url is misspelled or uses invalid syntax.
 * @throws {SuiteScriptError} SSS_INVALID_URL if an invalid URL is specified in options.url.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.url is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if a script calls back into itself recursively using an HTTP/HTTPS request. (Listed for https.get(options) only.)
 * @governance 10 units
 * @since 2015.2
 */
export const get: HttpGetFunction;

/**
 * Sends an HTTP DELETE request and returns the response.
 * @throws {SuiteScriptError} SSS_INVALID_HOST_CERT if an untrusted, unsupported, or invalid certificate was found for this host, or the domain name in options.url is misspelled or uses invalid syntax.
 * @throws {SuiteScriptError} SSS_INVALID_URL if an invalid URL is specified in options.url.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.url is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if a script calls back into itself recursively using an HTTP/HTTPS request. (Listed for https.delete(options) only.)
 * @governance 10 units
 * @since 2015.2
 */
declare const deleteFunc: HttpDeleteFunction;
export {deleteFunc as delete};

/**
 * Sends an HTTP request and returns the response.
 * @throws {SuiteScriptError} SSS_INVALID_HOST_CERT if an untrusted, unsupported, or invalid certificate was found for this host, or the domain name in options.url is misspelled or uses invalid syntax.
 * @throws {SuiteScriptError} SSS_INVALID_URL if an invalid URL is specified in options.url.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.method or options.url is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if a script calls back into itself recursively using an HTTP/HTTPS request. (Listed for https.request(options) only.)
 * @throws {SuiteScriptError} SSS_REQUEST_TIME_EXCEEDED if connecting takes longer than 5 seconds or sending the payload takes longer than 45 seconds. (Listed for https.request(options) only.)
 * @governance 10 units
 * @since 2015.2
 */
export const request: HttpRequestFunction;

/**
 * Sends an HTTP POST request and returns the response.
 * @throws {SuiteScriptError} SSS_INVALID_HOST_CERT if an untrusted, unsupported, or invalid certificate was found for this host, or the domain name in options.url is misspelled or uses invalid syntax.
 * @throws {SuiteScriptError} SSS_INVALID_URL if options.url is not a fully qualified URL.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.body or options.url is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if a script calls back into itself recursively using an HTTP/HTTPS request.
 * @governance 10 units
 * @since 2015.2
 */
export const post: HttpPostFunction;

/**
 * Sends an HTTP PUT request and returns the response.
 * @throws {SuiteScriptError} SSS_INVALID_HOST_CERT if an untrusted, unsupported, or invalid certificate was found for this host, or the domain name in options.url is misspelled or uses invalid syntax.
 * @throws {SuiteScriptError} SSS_INVALID_URL if an invalid URL is specified in options.url.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.body or options.url is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if a script calls back into itself recursively using an HTTP/HTTPS request. (Listed for https.put(options) only.)
 * @governance 10 units
 * @since 2015.2
 */
export const put: HttpPutFunction;

/**
 * Holds the string values for supported cache durations.
 * This enum is used to set the value of the ServerResponse.setCdnCacheable(options) property.
 * @since 2015.2
 */
export enum CacheDuration {
    LONG = "LONG",
    MEDIUM = "MEDIUM",
    SHORT = "SHORT",
    UNIQUE = "UNIQUE",
}

/**
 * Holds the string values for supported HTTP requests.
 * This enum is used to set the value of http.request(options) and ServerRequest.method.
 * @since 2015.2
 */
export enum Method {
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    PUT = "PUT",
    POST = "POST",
    PATCH = "PATCH"
}

/** @since 2015.2 */
export enum RedirectType {
    MEDIA_ITEM = "MEDIAITEM",
    RECORD = "RECORD",
    RESTLET = "RESTLET",
    SUITELET = "SUITELET",
    TASK_LINK = "TASKLINK"
}
