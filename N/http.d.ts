/// <reference path="typings/index.d.ts" />

import {File} from './file';
import {Form} from './ui/serverWidget';

interface AddHeaderOptions {
    /**
     * The name of the header.
     */
    name: string;
    /**
     * The value used to set the header.
     */
    value: string;
}

interface GetHeaderOptions {
    /**
     * The name of the header.
     */
    name: string;
}

interface SendRedirectOptions {
    /**
     * The base type for this resource. 
     * Use one of the following values: RECORD | TASKLINK | SUITELET
     */
    type: string;
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
    editmode?: boolean;
    /**
     * -optional- Additional URL parameters as name/value pairs.
     */
    parameters?: Object;
}

interface SetHeaderOptions {
    /**
     * The name of the header.
     */
    name: string;
    /**
     * The value used to set the header.
     */
    value: string;
}

interface RenderPDFOptions {
    /**
     * Content of the pdf.
     */
    xmlString: string;
}

interface SetCDNCacheableOptions {
    /**
     * The value of the caching duration. Set using the http.CacheDuration enum.
     */
    type: string;
}

interface WriteOptions {
    /**
     * The output string or file being written.
     */
    output: string;
}

interface WriteFileOptions {
    /**
     * The file to be written
     */
    file: File;
    /**
     * -optional- Determines whether the field is inline. If true, the file is inline.
     */
    isInline?: boolean;
}

interface WriteLineOptions {
    /**
     * The output string being written.
     */
    output: string;
}

interface WritePageOptions {
    /**
     * A standalone page object in the form of an assistant, form or list.
     */
    pageobject: Object;
}

interface GetLineCountOptions {
    /**
     * The sublist internal ID.
     */
    group: string;
}

interface GetOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * -optional- The HTTP headers.
     */
    headers?: Object;
}

interface DeleteOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * -optional- The HTTP headers.
     */
    headers?: Object;
}

interface RequestOptions {
    /**
     * The HTTP request method. Set using the http.Method enum.
     */
    method: string;
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * -optional- The POST data if the method is POST. If method is DELETE, body data is ignored.
     */
    body?: string | Object;
    /**
     * -optional- An object containing request headers.
     */
    headers?: Object;
}

interface PostOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * The POST data.
     */
    body: string | Object;
    /**
     * -optional- The HTTP headers.
     */
    headers?: Object;
}

interface PutOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * The PUT data.
     */
    body: string | Object;
    /**
     * The HTTP headers.
     */
    headers?: Object;
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
     * Not Documented. (6/8/2016)
     */
    toString(): string;
    /**
     * The client response body.
     */
    body: string;
    /**
     * The client response code.
     */
    code: number;
    /**
     * The client response headers. Object key/values not yet documented.
     */
    headers: Object;
    /**
     * Not Documented. (6/8/2016)
     */
    method: string;
    /**
     * Not Documented. (6/8/2016)
     */
    parameters: Object;
    /**
     * Not Documented. (6/8/2016)
     */
    url: string;
}

interface GetSublistValueOptions {
    sublistId: string;
    fieldId: string;
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
     * Not Documented.
     */
    toString(): string;
    /**
     * The server request body.
     */
    body: string;
    /**
     * The server request files. Object key/values not yet documented.
     */
    files: Object;
    /**
     * The server request headers. Object key/values not yet documented.
     */
    headers: Object;
    /**
     * The server request http method.
     */
    method: string;
    /**
     * The server request parameters. Object key/values not yet documented.
     */
    parameters: Object;
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
    headers: Object;
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
