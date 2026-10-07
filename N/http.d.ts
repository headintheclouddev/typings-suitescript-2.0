/**
 * Use the N/http module to make HTTP calls from server or client scripts.
 * For client scripts, this module also provides the ability to make cross-domain HTTP requests using NetSuite servers as proxies.
 * The N/http module does not accept the HTTPS protocol. Use the N/https module for that purpose.
 *
 * Some headers (Connection, Content-Length, Host, JSESSIONID, Trailer, Transfer-Encoding, Upgrade, Via) cannot be set manually; their values are discarded.
 * Custom header names must not contain underscores.
 */

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
    /** The type of resource redirected to. Use the http.RedirectType enum to set this value. */
    type: RedirectType;
    /**
     * The primary ID for this resource. The value you use varies depending on the value of options.type:
     * - MEDIA_ITEM: the internal ID of a file stored in the NetSuite File Cabinet.
     * - RECORD: the record type (use record.Type).
     * - RESTLET: the script ID from the script record of the RESTlet.
     * - SUITELET: the script ID from the script record of the Suitelet.
     * - TASK_LINK: the task ID.
     */
    identifier: number | string;
    /**
     * -optional- The secondary ID for this resource.
     * If options.type is SUITELET or RESTLET, use the deployment ID.
     * If options.type is RECORD, you can use the internal ID of a specific record instance.
     */
    id?: number | string;
    /**
     * -optional- Applicable when redirecting to a record resource.
     * If true, returns the record in edit mode. If false, returns the record in view mode.
     * The default value is false.
     */
    editMode?: boolean;
    /** -optional- Additional URL parameters as name:value pairs. */
    parameters?: Record<string, string | number | boolean>;
}

interface SetHeaderOptions {
    /** The name of the header. */
    name: string;
    /** The value used to set the header. */
    value: string;
}

interface RenderPDFOptions {
    /** Content of the PDF (BFO XML). */
    xmlString: string;
}

interface SetCDNCacheableOptions {
    /**
     * The value of the caching duration. Use the http.CacheDuration enum to set this value.
     * When used with a Suitelet, if this value is set to UNIQUE, the Suitelet will never be cached.
     */
    type: CacheDuration;
}

interface WriteOptions {
    /** The string being written. */
    output: string;
}

interface WriteFileOptions {
    /** A file.File object that encapsulates the file to be written. */
    file: File;
    /** -optional- If true, the file is inline. The default value is false. */
    isInline?: boolean;
}

interface WriteLineOptions {
    /** The string being written. */
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
    /** The HTTP(S) URL being requested. */
    url: string | SecureString;
    /**
     * -optional- The HTTP headers, as name:value pairs.
     * Header names are case-insensitive; custom header names must not contain underscores.
     */
    headers?: Record<string, string>;
    /**
     * -optional- An array of string GUIDs. These GUIDs are searched for in the request and are replaced by the
     * decrypted passwords before they are sent to a third-party server. Reference GUIDs must be in curly braces where used.
     * For example, if you have a GUID for a username:password for basic auth, your header would be: { Authorization: `Basic {${guid}}` }
     * Oracle documents this parameter only on https.request(options) (where GUIDs are searched for in options.body);
     * it is typed on all request methods because it has been observed to work with them (for example, in headers for basic authentication).
     */
    credentials?: string[];
}

export interface DeleteOptions extends GetOptions {}

export interface PostOptions extends GetOptions {
    /**
     * The POST/PUT data.
     * Sending a file using multipart/form-data content type is not supported.
     */
    body: string | object;
}

export interface PutOptions extends PostOptions {}

export interface RequestOptions extends GetOptions {
    /**
     * The HTTP request method. Set using the http.Method enum.
     * Allow usage as string here as N/http is a heavy import just
     * to get an enum.
     */
    method: Method | `${Method}`;
    /**
     * -optional- The body content to send in the request.
     * Only the PUT, POST, and PATCH methods support this parameter; all other methods ignore it.
     */
    body?: string | object;
}

interface HttpDeleteFunction {
    (options: DeleteOptions): ClientResponse;
    /**
     * Sends an HTTP DELETE request asynchronously. Parameters and errors are the same as for delete(options).
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: DeleteOptions): Promise<ClientResponse>;
}

interface HttpGetFunction {
    (options: GetOptions): ClientResponse;
    /**
     * Sends an HTTP GET request asynchronously. Parameters and errors are the same as for get(options).
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: GetOptions): Promise<ClientResponse>;
}

interface HttpPostFunction {
    (options: PostOptions): ClientResponse;
    /**
     * Sends an HTTP POST request asynchronously. Parameters and errors are the same as for post(options).
     * When a Suitelet is invoked by this method, it waits for all pending promises to finish.
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: PostOptions): Promise<ClientResponse>;
}

interface HttpPutFunction {
    (options: PutOptions): ClientResponse;
    /**
     * Sends an HTTP PUT request asynchronously. Parameters and errors are the same as for put(options).
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: PutOptions): Promise<ClientResponse>;
}

interface HttpRequestFunction {
    (options: RequestOptions): ClientResponse;
    /**
     * Sends an HTTP request asynchronously. Parameters and errors are the same as for request(options).
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: RequestOptions): Promise<ClientResponse>;
}

/**
 * Encapsulates the response to an HTTP client request (for example, http.get(options)).
 * This object is read-only.
 * @since 2015.2
 */
export interface ClientResponse {
    /**
     * The client response body.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly body: string;
    /**
     * The client HTTP response or status code.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly code: number;
    /**
     * The response headers.
     * Header names are repeated in lower-case and Title-Case (and original case if it differs); prefer lower-case names.
     * On the server, each header value is a string (only the first of multiple same-named headers is available).
     * In client scripts, each header value is a string[] instead.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly headers: Record<string, string>;
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
 * This object is read-only.
 * Supported script types: Server scripts.
 * @since 2015.2
 */
export interface ServerRequest {
    /**
     * Returns the number of lines in a sublist.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.group is not specified.
     * @governance none
     * @since 2015.2
     */
    getLineCount(options: GetLineCountOptions): number;
    /**
     * Returns the value of a sublist line item.
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
    readonly body: string;
    /**
     * The remote client IP address.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly clientIpAddress: string;
    /**
     * The server request files, as an object of ID to file.File pairs. For example, `request.files['file_id']`.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly files: Record<string, File>;
    /**
     * The server request headers, as name:value pairs.
     * Typically each header name is present in lower case and title case; prefer lower-case names.
     * The Authorization header is reserved for OAuth-authenticated requests.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly headers: Record<string, string>;
    /**
     * The server request HTTP method.
     * Allow usage as string here as N/http is a heavy import just
     * to get an enum.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly method: Method | `${Method}`;
    /**
     * The server request parameters, as name:value pairs.
     * For GET requests parameters come from the URL; for POST requests they come from the request body.
     * Parameters cannot be arrays. Validate parameters to avoid cross-site scripting (XSS) injection.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly parameters: Record<string, string>;
    /**
     * The server request URL.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly url: string;
}

/**
 * Encapsulates the response from an HTTP server to an HTTP request. For example, a response from a Suitelet or RESTlet.
 * Supported script types: Server scripts.
 * @since 2015.2
 */
export interface ServerResponse {
    /**
     * Adds a header to the response.
     * If the same header has already been set, this method adds another line for that header.
     * @throws {SuiteScriptError} SSS_INVALID_HEADER if the header name or value is invalid (or the header is blocked for Suitelet responses).
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.name or options.value is not specified.
     * @governance none
     * @since 2015.2
     */
    addHeader(options: AddHeaderOptions): void;
    /**
     * Returns the value or values of a response header.
     * If multiple values are assigned to the header name, the values are returned as an Array.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.name is not specified.
     * @governance none
     * @since 2015.2
     */
    getHeader(options: GetHeaderOptions): string | string[];
    /**
     * Sets the redirect URL by resolving to a NetSuite resource.
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
     * Sets the value of a response header.
     * @throws {SuiteScriptError} SSS_INVALID_HEADER if the header name or value is invalid (or the header is blocked for Suitelet responses).
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.name or options.value is not specified.
     * @governance none
     * @since 2015.2
     */
    setHeader(options: SetHeaderOptions): void;
    /**
     * Generates and renders a PDF directly to the response.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.xmlString is not specified.
     * @governance 10 units
     * @since 2015.2
     */
    renderPdf(options: RenderPDFOptions): void;
    /**
     * Sets CDN caching for a period of time.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type is not specified.
     * @governance none
     * @since 2015.2
     */
    setCdnCacheable(options: SetCDNCacheableOptions): void;
    /**
     * Writes information (text, xml, html) to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     * This string overload is not documented by Oracle; the documented form is write(options).
     * @governance none
     * @since 2015.2
     */
    write(output: string): void;
    /**
     * Writes information (text, xml, html) to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.output is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.output is not a string.
     * @governance none
     * @since 2015.2
     */
    write(options: WriteOptions): void;
    /**
     * Writes a file to the response.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.file is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.file is not a file.File object.
     * @governance none
     * @since 2015.2
     */
    writeFile(options: WriteFileOptions): void;
    /**
     * Writes line information (text, xml, html) to the response.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.output is not specified.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.output is not a string.
     * @governance none
     * @since 2015.2
     */
    writeLine(options: WriteLineOptions): void;
    /**
     * Generates a page.
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
     * If multiple values are assigned to one header name, the values are returned as an array.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly headers: Record<string, string | string[]>;
}

/**
 * Sends an HTTP GET request and returns the response.
 * Supported script types: Client and server scripts. Doesn't work in unauthenticated client-side contexts.
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
 * Supported script types: Client and server scripts. Doesn't work in unauthenticated client-side contexts.
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
 * Supported script types: Client and server scripts. Doesn't work in unauthenticated client-side contexts.
 * If connecting takes longer than 5 seconds or sending the payload takes longer than 45 seconds, the request times out.
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
 * Supported script types: Client and server scripts. Doesn't work in unauthenticated client-side contexts.
 * If connecting takes longer than 5 seconds or sending the payload takes longer than 45 seconds, the request times out.
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
 * Supported script types: Client and server scripts. Doesn't work in unauthenticated client-side contexts.
 * If connecting takes longer than 5 seconds or sending the payload takes longer than 45 seconds, the request times out.
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
    /** Conceptually, this corresponds to days. */
    LONG,
    /** Conceptually, this corresponds to hours. */
    MEDIUM,
    /** Conceptually, this corresponds to minutes. */
    SHORT,
    /** When used with a Suitelet, the Suitelet will never be cached and will always be executed. */
    UNIQUE,
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

/**
 * Holds the string values for supported NetSuite resources that you can redirect to.
 * Use this enum to set the value of the type parameter for ServerResponse.sendRedirect(options).
 * @since 2015.2
 */
export enum RedirectType {
    MEDIA_ITEM,
    RECORD,
    RESTLET,
    SUITELET,
    TASK_LINK
}
