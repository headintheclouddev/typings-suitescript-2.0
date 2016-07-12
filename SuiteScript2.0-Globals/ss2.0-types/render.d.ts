/// <reference path="record.d.ts" />
/// <reference path="search.d.ts" />
/// <reference path="http.d.ts" />
/// <reference path="file.d.ts" />

interface AddCustomDataSourceOptions {
    /**
     * Data source alias.
     */
    alias: string;
    /**
     * Data format, uses the render.DataFormat enum.
     */
    format: string;
    /**
     * Object, document, or string.
     */
    data: Object | Document | string;
}

interface AddRecordOptions {
    /**
     * Name of the template.
     */
    templateName: string;
    /**
     * The loaded record object to add.
     */
    record: Record;
}

interface AddSearchResultsOptions {
    templateName: string;
    searchResult: SearchResult;
}

interface BOMOptions {
    entityId: number;
    printMode?: string;
}

interface EmailMergeResult {
    body: string;
    subject: string;
}

interface MergeEmailOptions {
    templateId: number;    // One of the below fields must be included.
    entity?: RecordRef;
    recipient?: RecordRef;
    customRecord?: RecordRef;
    supportCaseId?: number;
    transactionId?: number;
}

interface PackingSlipOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    fulfillmentId?: number;
}

interface PickingTicketOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    shipgroup?: number;
    location?: number;
}

interface PrintModes {
    DEFAULT: string;
    HTML: string;
    PDF: string;
}

interface RecordRef {
    id: number;
    type: string;
}

interface RenderToResponseOptions {
    response: ServerResponse;
}

interface StatementOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    startDate?: Date;
    statementDate?: Date;
    TransactionsOnly?: boolean;
}

interface XMLToPDFOptions {
    xmlString: string;
}

interface DataSources {
    JSON: string;
    OBJECT: string;
    XML_DOC: string;
    XML_STRING: string;
}

interface TemplateRenderer {
    /**
     * Adds XML or JSON as custom data source to an advanced PDF/HTML template.
     */
    addCustomDataSource(options: AddCustomDataSourceOptions): void;
    /**
     * Binds a record to a template variable.
     */
    addRecord(options: AddRecordOptions): void;
    addSearchResults(options: AddSearchResultsOptions): void;
    renderAsPdf(): NSFile;
    renderAsPdfToResponse(options: RenderToResponseOptions): void;
    renderAsString(): string;
    renderToResponse(options: RenderToResponseOptions): void;
    /**
     * Sets the template using the internal ID.
     */
    setTemplateById(options: { id: number; }): void;
    /**
     * Sets the template using the script ID.
     */
    setTemplateByScriptId(options: { scriptId: string; }): void;
    templateContent: string;
}

interface TransactionOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
}
