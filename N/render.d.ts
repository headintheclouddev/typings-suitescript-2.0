/**
 * Use the N/render module for printing, PDF creation, form creation from templates, and email creation from templates.
 * Direct manipulation of the print URL is not supported.
 *
 * Supported script types: Server scripts.
 */

import type {File} from './file';
import type {Record} from './record';
import type {ServerResponse} from './http';
import type {Result} from './search';
import type {NSXMLDocument} from './xml';
import type {Query} from './query';

interface AddCustomDataSourceOptions {
    /** Data source alias. */
    alias: string;
    /** Data format, uses the render.DataSource enum. */
    format: DataSource;
    /** Object, document, or string. Use an object for DataSource.OBJECT, an xml.Document for DataSource.XML_DOC, and a string for DataSource.JSON or DataSource.XML_STRING. */
    data: object | NSXMLDocument | string;
}

interface AddRecordOptions {
    /** Name of the record object variable referred to in the template. */
    templateName: string;
    /** The loaded record object to add. */
    record: Record;
}

interface AddSearchResultsOptions {
    /** Name of the results iterator variable referred to in the template. */
    templateName: string;
    /** The search results to add. Note: Documentation says this is a single result, but in practice an array of results is typically passed. */
    searchResult: Result | Result[] | readonly Result[];
}

interface BOMOptions {
    /** The internal ID of the transaction associated with the bill of materials. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. By default, uses the company/user preference for print output. */
    printMode?: PrintMode;
    /** Applies when advanced templates are used. Prints the document in the customer's locale. If basic printing is used, this parameter is ignored and the transaction form is printed in the customer's locale. */
    inCustLocale?: boolean;
}

/**
 * Encapsulates an email merge result. Use render.mergeEmail(options) to create this object.
 * @since 2015.2
 */
interface EmailMergeResult {
    /**
     * The body of the email distribution in string format.
     * @since 2015.2
     */
    readonly body: string;
    /**
     * The subject of the email distribution in string format.
     * @since 2015.2
     */
    readonly subject: string;
}

interface MergeEmailOptions {
    /** Internal ID of the template. */
    templateId: number;    // One of the below fields must be included.
    /** Entity record reference. For example, an employee. */
    entity?: RecordRef;
    /** Recipient record reference. For example, a lead. The recipient can be specified with this parameter or with email.send(options). */
    recipient?: RecordRef;
    /** Custom record reference. */
    customRecord?: RecordRef;
    /** Support Case ID. */
    supportCaseId?: number;
    /** Transaction ID. */
    transactionId?: number;
}

interface PackingSlipOptions {
    /** The internal ID of the transaction associated with the packing slip. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. By default, uses the company/user preference for print output. */
    printMode?: PrintMode;
    /** The packing slip form number. */
    formId?: number;
    /** Fulfillment ID number. */
    fulfillmentId?: number;
    /** Applies when advanced templates are used. Prints the document in the customer's locale. If basic printing is used, this parameter is ignored and the transaction form is printed in the customer's locale. */
    inCustLocale?: boolean;
}

interface PickingTicketOptions {
    /** The internal ID of the transaction associated with the picking ticket. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. By default, uses the company/user preference for print output. */
    printMode?: PrintMode;
    /** The packing slip form number. */
    formId?: number;
    /** Shipping group for the ticket. */
    shipgroup?: number;
    /** Location for the ticket. */
    location?: number;
    /** Applies when advanced templates are used. Prints the document in the customer's locale. If basic printing is used, this parameter is ignored and the transaction form is printed in the customer's locale. */
    inCustLocale?: boolean;
}

/** Encapsulates the type and ID of a particular record instance. Used to designate the record to perform the mail merge on. */
interface RecordRef {
    /** Internal ID of the record instance. */
    id: number;
    /** The record type ID. */
    type: string;
}

interface RenderToResponseOptions {
    /** Response that will be written to. For example, the response passed from a Suitelet. */
    response: ServerResponse;
}

interface StatementOptions {
    /** Flag to convert all amount values to the base currency. */
    consolidateStatements?: boolean;
    /** The internal ID of the statement to print. */
    entityId: number;
    /** Internal ID of the form to use to print the statement. */
    formId?: number;
    /** Applies when advanced templates are used. Prints the document in the customer's locale. If basic printing is used, this parameter is ignored and the transaction form is printed in the customer's locale.*/
    inCustLocale?: boolean;
    /** Include only open transactions. */
    openTransactionsOnly?: boolean;
    /** The print output type. Set using the render.PrintMode enum. By default, uses the company/user preference for print output. */
    printMode?: PrintMode;
    /** Date of the oldest transaction to appear on the statement. Note: Oracle's render.statement page types this as Date, but in practice it must be a string. */
    startDate?: string;
    /** Statement date. Note: Oracle's render.statement page types this as Date, but in practice it must be a string. */
    statementDate?: string;
    /** Internal ID of the subsidiary. Note: This parameter only works for advanced printing. */
    subsidiaryId?: number;
}

interface XMLToPDFOptions {
    /**
     * XML document or string to convert to PDF. File size cannot exceed 10MB.
     * Escape untrusted values (for example, with xml.escape(options)) before including them in the XML.
     */
    xmlString: NSXMLDocument | string;
}

/** See: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/subsect_156215822877.html **/
interface GLImpactOptions {
    /** The internal ID of the transaction to print GL Impact. */
    internalId: number;
    /** The print output type. Set using the render.PrintMode enum. */
    printMode: PrintMode|string;
    /** Include only specific subsidiaries. Default to false. */
    printPerSubsidiary?: boolean;
    /** Specific subsidiaries. Ignored when printPerSubsidiary is false. */
    subsidiaries?: number[];
    /** Specific accounting books. If not specified, prints GL Impact in all accounting books. */
    accountingBooks?: number[];
    /** Internal ID of the template. If not specified, the default template is used. */
    template?: number;
}

/**
 * Encapsulates a template object that produces HTML and PDF printed forms utilizing advanced PDF/HTML template capabilities.
 * This object is available when the Advanced PDF/HTML Templates feature is enabled.
 * @since 2015.2
 */
interface TemplateRenderer {
    /**
     * Adds XML or JSON as custom data source to an advanced PDF/HTML template.
     * @governance none
     * @since 2016.1
     */
    addCustomDataSource(options: AddCustomDataSourceOptions): void;
    /**
     * Uses Query as the renderer’s data source.
     * You can specify the SuiteAnalytics workbook query either in the Query object, or provide a workbook ID to use the query from an existing SuiteAnalytics workbook.
     * One of options.query or options.id is required in the script.
     * Returns a maximum of 5000 results; use options.pageIndex and options.pageSize to retrieve more.
     *
     * There is no governance for this method. When the renderer is executed, rendering consumes 10 units for every iteration through the results,
     * plus an additional 5 units before the first iteration if the query is specified using a workbook ID.
     * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.query and options.id are provided.
     * @throws {SuiteScriptError} NEITHER_ARGUMENT_DEFINED if neither options.query nor options.id is provided.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.templateName is not specified.
     * @throws {SuiteScriptError} UNABLE_TO_LOAD_QUERY if the query ID is not valid.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.query is not a query.Query.
     * @governance none
     * @since 2019.2
     */
    addQuery(options: AddQueryOptions): void;
    /**
     * Binds a record to a template variable.
     * @governance none
     * @since 2015.2
     */
    addRecord(options: AddRecordOptions): void;
    /**
     * Binds a search result to a template variable.
     * @governance none
     * @since 2015.2
     */
    addSearchResults(options: AddSearchResultsOptions): void;
    /**
     * Uses the advanced template to produce a PDF printed form.
     * @governance none
     * @since 2015.2
     */
    renderAsPdf(): File;
    /**
     * Renders a server response into a PDF file. For example, you can pass in a response to be rendered as a PDF in a browser, or downloaded by a user.
     * @governance none
     * @since 2015.2
     */
    renderPdfToResponse(options: RenderToResponseOptions): void;
    renderPdfToResponse(serverResponse: ServerResponse): void;
    /**
     * Return template content in string form.
     * @governance none
     * @since 2015.2
     */
    renderAsString(): string;
    /**
     * Writes template content to a server response.
     * @governance none
     * @since 2015.2
     */
    renderToResponse(options: RenderToResponseOptions): void;
    renderToResponse(serverResponse: ServerResponse): void;
    /**
     * Sets the template using the internal ID.
     * @governance none
     * @since 2016.1
     */
    setTemplateById(options: { id: number; }): void;
    /**
     * Sets the template using the script ID.
     * @governance none
     * @since 2016.1
     */
    setTemplateByScriptId(options: { scriptId: Uppercase<string>; }): void;
    /**
     * Content of the template, interpreted by FreeMarker.
     * @since 2015.2
     */
    templateContent: string;
}

interface AddQueryOptions {
    /** Name of the results iterator variable referred to in the template. */
    templateName: string;
    /** Workbook query definition. Required if options.id is not specified. */
    query?: Query;
    /** Workbook query ID. Required if options.query is not specified. */
    id?: string;
    /** Page index. */
    pageIndex?: number;
    /** Page size. The minimum value is 5, and the maximum value is 1000. */
    pageSize?: number;
}

interface TransactionOptions {
    /** The internal ID of the transaction to print. */
    entityId: number;
    /** The print output type. Set using the render.PrintMode enum. By default, uses the company/user preference for print output. */
    printMode?: PrintMode|string;
    /** The transaction form number. */
    formId?: number;
    /** Applies when advanced templates are used. Print the document in the customer's locale. If basic printing is used, this parameter is ignored and the transaction form is printed in the customer's locale. */
    inCustLocale?: boolean;
}

/**
 * Creates a PDF or HTML file object containing a bill of materials.
 * @governance 10 units
 * @since 2015.2
 */
export function bom(options: BOMOptions): File;
/**
 * Creates a render.TemplateRenderer object, used to produce HTML and PDF printed forms with advanced PDF/HTML templates.
 * The Advanced PDF/HTML Templates feature must be enabled.
 * @governance none
 * @since 2015.2
 */
export function create(): TemplateRenderer;
/**
 * Creates a render.EmailMergeResult object for a mail merge with an existing scriptable email template.
 * Use the N/email module to send the email.
 * @governance none
 * @since 2015.2
 */
export function mergeEmail(options: MergeEmailOptions): EmailMergeResult;
/**
 * Creates a PDF or HTML file object containing a packing slip.
 * @governance 10 units
 * @since 2015.2
 */
export function packingSlip(options: PackingSlipOptions): File;
/**
 * Creates a PDF or HTML file object containing a picking ticket.
 * @governance 10 units
 * @since 2015.2
 */
export function pickingTicket(options: PickingTicketOptions): File;
/**
 * Creates a PDF or HTML file object containing a statement.
 * @governance 10 units
 * @since 2015.2
 */
export function statement(options: StatementOptions): File;
/**
 * Creates a PDF or HTML file object containing a transaction. File size is limited to 10MB.
 * If the Advanced PDF/HTML Templates feature is enabled, the advanced template associated with the transaction's custom form is used.
 * @governance 10 units
 * @since 2015.2
 */
export function transaction(options: TransactionOptions): File;
/**
 * Passes XML to the Big Faceless Organization (BFO) tag library (which is stored by NetSuite), and returns a PDF file. File size cannot exceed 10MB.
 * @governance 10 units
 * @since 2015.2
 */
export function xmlToPdf(options: XMLToPDFOptions): File;
/**
 * Creates a PDF or HTML file object containing the GL Impact of a transaction.
 * Note: This method isn't listed in Oracle's N/render members table. It is documented in "Printing the GL Impact for a Transaction", which states that internalId and printMode are mandatory.
 */
export function glImpact(options: GLImpactOptions): File;

/**
 * Holds the string values for supported data source types. Use this enum to set the options.format parameter of TemplateRenderer.addCustomDataSource(options).
 * @since 2015.2
 */
export enum DataSource {
    JSON,
    OBJECT,
    XML_DOC,
    XML_STRING
}

/**
 * Holds the string values for supported print output types. Use this enum to set the options.printMode parameter.
 * @since 2015.2
 */
export enum PrintMode {
    DEFAULT,
    HTML,
    PDF
}
