/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../N/file.d.ts" />
/// <reference path="../N/record.d.ts" />

interface ClientResponse {
    toString(): string;
    body: string;
    code: number;
    headers: Object;
    method: string;
    parameters: Object;
    url: string;
}

interface ServerRequest {
    getLineCount(options: GetLineCountOptions): number;
    getSublistValue(options: GetSublistValueOptions): string;
    toString(): string;
    body: string;
    files: Object;
    headers: Object;
    method: string;
    parameters: Object;
    url: string;
}

interface ServerResponse {
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
    writePage(form: UIForm): void;
    /**
     * The server response headers. This property is read-only.
     */
    headers: Object;
}

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
    file: NSFile;
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

interface CacheDuration {
    LONG: string;
    MEDIUM: string;
    SHORT: string;
    UNIQUE: string;
}

interface HttpMethod {
    DELETE: string;
    GET: string;
    PUT: string;
    POST: string;
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

interface HttpModule {
    /**
     * Sends an HTTP GET request and returns the response.
     */
    get: HttpGetFunction;
    /**
     * Sends an HTTP DELETE request and returns the response.
     */
    delete: HttpDeleteFunction;
    /**
     * Sends an HTTP request and returns the response.
     */
    request: HttpRequestFunction;
    /**
     * Sends an HTTP POST request and returns the response.
     */
    post: HttpPostFunction;
    /**
     * Sends an HTTP PUT request and returns the response.
     */
    put: HttpPutFunction;
    /**
     * Holds the string values for supported cache durations. 
     * This enum is used to set the value of the ServerResponse.setCdnCacheable(options) property.
     */
    CacheDuration: CacheDuration;
    /**
     * Holds the string values for supported HTTP requests. 
     * This enum is used to set the value of http.request(options) and ServerRequest.method.
     */
    Method: HttpMethod;
}

declare module N {
     var http: HttpModule;
}

declare module 'N/http' {
      export = N.http;
}
