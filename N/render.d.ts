/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./file.d.ts" />
/// <reference path="./http.d.ts" />
/// <reference path="./record.d.ts" />
/// <reference path="./search.d.ts" />

interface AddRecordOptions {
    templateName: string;
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
    templateId: number; // One of the below fields must be included
    entity?: Record; // Documentation says this is mandatory 
    recipient?: Record; // Documentation says this is mandatory 
    customRecord?: Record; // Documentation says this is mandatory 
    supportCaseId?: number; // Documentation says this is mandatory 
    transactionId?: number; // Documentation says this is mandatory 
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

interface RecordRef { // This isn't in use
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

interface TemplateRenderer {
    addRecord(options: AddRecordOptions): void;
    addSearchResults(options: AddSearchResultsOptions): void;
    renderAsPdf(): NSFile;
    renderAsPdfToResponse(options: RenderToResponseOptions): void;
    renderAsString(): string;
    renderToResponse(options: RenderToResponseOptions): void;
    templateContent: string;
}

interface TransactionOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
}

interface RenderModule {
    bom(options: BOMOptions): NSFile;
    create(): TemplateRenderer;
    mergeEmail(options: MergeEmailOptions): EmailMergeResult;
    packingSlip(options: PackingSlipOptions): NSFile;
    pickingTicket(options: PickingTicketOptions): NSFile;
    statement(options: StatementOptions): NSFile;
    transaction(options: TransactionOptions): NSFile;
    xmlToPdf(options: XMLToPDFOptions): NSFile;
    PrintMode: PrintModes;
}

declare module N {
    var render: RenderModule;
}

declare module 'N/render' {
    export = N.render;
}
