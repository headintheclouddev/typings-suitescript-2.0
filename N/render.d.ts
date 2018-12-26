import {File} from './file';
import {Record} from './record';
import {ServerResponse} from './http';
import {Result} from './search';
import {NSXMLDocument} from './xml';

interface AddCustomDataSourceOptions {
    /** Data source alias. */
    alias: string;
    /** Data format, uses the render.DataSource enum. */
    format: DataSource;
    /** Object, document, or string. */
    data: any | NSXMLDocument | string;
}

interface AddRecordOptions {
    /** Name of the template. */
    templateName: string;
    /** The loaded record object to add. */
    record: Record;
}

interface AddSearchResultsOptions {
    /** Name of the template. */
    templateName: string;
    /** The search results to add. Note: Documentation says this is a single result, but it's actually an array of results. */
    searchResult: Result[];
}

interface BOMOptions {
    /** The internal ID of the bill of material to print. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. */
    printMode?: PrintMode;
}

interface EmailMergeResult {
    /** The body of the email distribution in string format. */
    body: string;
    /** The subject of the email distribution in string format. */
    subject: string;
}

interface MergeEmailOptions {
    /** Internal ID of the template. */
    templateId: number;    // One of the below fields must be included.
    /** Entity record reference. For example, an employee. */
    entity?: RecordRef; 
    /** Recipient record reference.  For example, a lead. */
    recipient?: RecordRef; 
    /** Custom record reference. */
    customRecord?: RecordRef; 
    /** Support Case ID. */
    supportCaseId?: number;
    /** Transaction ID. */ 
    transactionId?: number;
}

interface PackingSlipOptions {
    /** The internal ID of the packing slip to print. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. */
    printMode?: PrintMode;
    /** The packing slip form number. */
    formId?: number;
    /** Fulfillment ID number. */
    fulfillmentId?: number;
}

interface PickingTicketOptions {
    /** The internal ID of the picking ticket to print. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. */
    printMode?: PrintMode;
    /** The packing slip form number. */
    formId?: number;
    /** Shipping group for the ticket. */
    shipgroup?: number;
    /** Location for the ticket. */
    location?: number;
}

interface RecordRef {
    id: number;
    type: string;
}

interface RenderToResponseOptions {
    /** Response that will be written to PDF. For example, the response passed from a Suitelet. */
    response: ServerResponse;
}

interface StatementOptions {
    /** The internal ID of the statement to print. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. */
    printMode?: PrintMode;
    /** Internal ID of the form to use to print the statement. */
    formId?: number;
    /** Date of the oldest transaction to appear on the statement. */
    startDate?: string;
    /** Statement date. NS Docs say this should be a Date object, but in practice it should be a string.*/
    statementDate?: string;
    /** Include only open transactions. */
    openTransactionsOnly?: boolean;
}

interface XMLToPDFOptions {
    /** XML document or string to convert to PDF. */
    xmlString: string;
}

interface TemplateRenderer {
    /** Adds XML or JSON as custom data source to an advanced PDF/HTML template. */
    addCustomDataSource(options: AddCustomDataSourceOptions): void;
    /** Binds a record to a template variable. */
    addRecord(options: AddRecordOptions): void;
    /** Binds a search result to a template variable. */
    addSearchResults(options: AddSearchResultsOptions): void;
    /** Uses the advanced template to produce a PDF printed form. */
    renderAsPdf(): File;
    /** Renders a server response into a PDF file. */
    renderAsPdfToResponse(options: RenderToResponseOptions): void;
    /** Return template content in string form. */
    renderAsString(): string;
    /** Writes template content to a server response. */
    renderToResponse(options: RenderToResponseOptions): void;
    /** Sets the template using the internal ID. */
    setTemplateById(options: { id: number; }): void;
    /** Sets the template using the script ID. */
    setTemplateByScriptId(options: { scriptId: string; }): void;
    /** Content of template. */
    templateContent: string;
}

interface TransactionOptions {
    /** The internal ID of the transaction to print. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. */
    printMode?: PrintMode|string;
    /** The transaction form number. */
    formId?: number;
}

/** Use this method to create a PDF or HTML object of a bill of material. */
export function bom(options: BOMOptions): File;
/** Use this method to produce HTML and PDF printed forms with advanced PDF/HTML templates. */
export function create(): TemplateRenderer;
/** Creates a render.EmailMergeResult object for a mail merge with an existing scriptable email template. */
export function mergeEmail(options: MergeEmailOptions): EmailMergeResult;
/** Use this method to create a PDF or HTML object of a packing slip. */
export function packingSlip(options: PackingSlipOptions): File;
/** Use this method to create a PDF or HTML object of a picking ticket. */
export function pickingTicket(options: PickingTicketOptions): File;
/** Use this method to create a PDF or HTML object of a statement. */
export function statement(options: StatementOptions): File;
/** Use this method to create a PDF or HTML object of a transaction. */
export function transaction(options: TransactionOptions): File;
/** Method used to pass XML to the Big Faceless Organization tag library (which is stored by NetSuite), and return a PDF file. */
export function xmlToPdf(options: XMLToPDFOptions): File;

/** Holds the string values for supported data source types. Use this enum to set the options.format parameter. */
export enum DataSource {
    JSON,
    OBJECT,
    XML_DOC,
    XML_STRING
}

/** Holds the string values for supported print output types. Use this enum to set the options.printMode parameter. */
export enum PrintMode {
    DEFAULT,
    HTML,
    PDF
}
