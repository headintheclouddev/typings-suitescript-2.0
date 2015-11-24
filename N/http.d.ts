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
    addHeader(options: AddHeaderOptions): void;
    getHeader(options: GetHeaderOptions): string;
    sendRedirect(options: SendRedirectOptions): void;
    setHeader(options: SetHeaderOptions): void;
    renderPdf(options: RenderPDFOptions): void; // Converts XML to PDF
    setCdnCacheable(options: SetCDNCacheableOptions): void;
    write(options: WriteOptions): void;
    writeFile(options: WriteFileOptions): void; // This doesn't work.  Defect filed.
    writeLine(options: WriteLineOptions): void;
    writePage(options: WritePageOptions): void; // This doesn't work.
    writePage(form: UIForm): void; // This isn't documented and shouldn't work, but does.
    headers: Object;
}

interface AddHeaderOptions {
    name: string; // The name of the header.
    value: string; // The value used to set the header.
}

interface GetHeaderOptions {
    name: string;
}

interface SendRedirectOptions {
    type: string;
    identifier: string;
    id?: string;
    editmode?: boolean;
    parameters?: Object; // Additional URL parameters as name/value pairs
}

interface SetHeaderOptions {
    name: string; // The name of the header.
    value: string; // The value used to set the header.
}

interface RenderPDFOptions {
    xmlString: string; // Content of the pdf.
}

interface SetCDNCacheableOptions {
    type: string; // The value of the caching duration. Set using the http.CacheDuration enum.
}

interface WriteOptions {
    output: string; // The output string or file being written.
}

interface WriteFileOptions {
    file: NSFile; // The file to be written
    isInline?: boolean; // Determines whether the field is inline. If true, the file is inline.
}

interface WriteLineOptions {
     output: string; // The output string being written.
}

interface WritePageOptions {
     pageobject: Object;
}

interface GetLineCountOptions {
    group: string;
}

interface GetOptions {
    url: string;
    headers?: Object;
}

interface DeleteOptions {
    url: string;
    headers?: Object;
}

interface RequestOptions {
    method: string;
    url: string;
    body?: string|Object;
    headers?: Object;
}

interface PostOptions {
    url: string;
    body: string|Object;
    headers?: Object;
}

interface PutOptions {
    url: string;
    body: string|Object;
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

interface HttpModule {
    get(options: GetOptions): ClientResponse;
    delete(options: DeleteOptions): ClientResponse;
    request(options: RequestOptions): ClientResponse;
    post(options: PostOptions): ClientResponse;
    put(options: PutOptions): ClientResponse;
    CacheDuration: CacheDuration;
    Method: HttpMethod;
}

declare module N {
     var http: HttpModule;
}

declare module 'N/http' {
      export = N.http;
}
