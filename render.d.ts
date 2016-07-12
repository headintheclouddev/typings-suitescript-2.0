import {Record} from './record';
import {SearchResult} from './search';
import {ServerResponse} from './http';
import {NSFile} from './file';

export interface AddCustomDataSourceOptions {
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

export interface AddRecordOptions {
    /**
     * Name of the template.
     */
    templateName: string;
    /**
     * The loaded record object to add.
     */
    record: Record;
}

export interface AddSearchResultsOptions {
    templateName: string;
    searchResult: SearchResult;
}

export interface BOMOptions {
    entityId: number;
    printMode?: string;
}

export interface EmailMergeResult {
    body: string;
    subject: string;
}

export interface MergeEmailOptions {
    templateId: number;    // One of the below fields must be included.
    entity?: RecordRef;
    recipient?: RecordRef;
    customRecord?: RecordRef;
    supportCaseId?: number;
    transactionId?: number;
}

export interface PackingSlipOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    fulfillmentId?: number;
}

export interface PickingTicketOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    shipgroup?: number;
    location?: number;
}

export interface PrintModes {
    DEFAULT: string;
    HTML: string;
    PDF: string;
}

export interface RecordRef {
    id: number;
    type: string;
}

export interface RenderToResponseOptions {
    response: ServerResponse;
}

export interface StatementOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    startDate?: Date;
    statementDate?: Date;
    TransactionsOnly?: boolean;
}

export interface XMLToPDFOptions {
    xmlString: string;
}

export interface DataSources {
    JSON: string;
    OBJECT: string;
    XML_DOC: string;
    XML_STRING: string;
}

export interface TemplateRenderer {
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

export interface TransactionOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
}

export interface RenderModule {
    bom(options: BOMOptions): NSFile;
    create(): TemplateRenderer;
    mergeEmail(options: MergeEmailOptions): EmailMergeResult;
    packingSlip(options: PackingSlipOptions): NSFile;
    pickingTicket(options: PickingTicketOptions): NSFile;
    statement(options: StatementOptions): NSFile;
    transaction(options: TransactionOptions): NSFile;
    xmlToPdf(options: XMLToPDFOptions): NSFile;
    DataSource: DataSources;
    PrintMode: PrintModes;
}

export default RenderModule;
