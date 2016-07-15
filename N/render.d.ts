import {File} from './file';
import {Record} from './record';
import {ServerResponse} from './http';
import {Result} from './search';

interface AddCustomDataSourceOptions {
    /**
     * Data source alias.
     */
    alias: string;
    /**
     * Data format, uses the render.DataSource enum.
     */
    format: DataSource;
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
    searchResult: Result;
}

interface BOMOptions {
    entityId: number;
    printMode?: PrintMode;
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
    printMode?: PrintMode;
    formId?: number;
    fulfillmentId?: number;
}

interface PickingTicketOptions {
    entityId: number;
    printMode?: PrintMode;
    formId?: number;
    shipgroup?: number;
    location?: number;
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
    printMode?: PrintMode;
    formId?: number;
    startDate?: Date;
    statementDate?: Date;
    TransactionsOnly?: boolean;
}

interface XMLToPDFOptions {
    xmlString: string;
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
    renderAsPdf(): File;
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
    printMode?: PrintMode;
    formId?: number;
}

export function bom(options: BOMOptions): File;
export function create(): TemplateRenderer;
export function mergeEmail(options: MergeEmailOptions): EmailMergeResult;
export function packingSlip(options: PackingSlipOptions): File;
export function pickingTicket(options: PickingTicketOptions): File;
export function statement(options: StatementOptions): File;
export function transaction(options: TransactionOptions): File;
export function xmlToPdf(options: XMLToPDFOptions): File;

export enum DataSource {
    JSON,
    OBJECT,
    XML_DOC,
    XML_STRING,
}

export enum PrintMode {
    DEFAULT,
    HTML,
    PDF,
}
