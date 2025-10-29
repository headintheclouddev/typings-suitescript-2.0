/**
 * Load the N/documentCapture module to extract text content from supported documents.
 *
 * The N/documentCapture module lets you programmatically extract structured content and key information from a variety of document types (such as invoices, receipts, contracts, and so on) directly
 * within NetSuite. This module uses the AI-driven capabilities of the Oracle Cloud Infrastructure (OCI) Document Understanding service and can automate document processing, reduce manual data entry,
 * and enhance business workflows. For more information about the OCI Document Understanding service, refer to Document Understanding in the Oracle Cloud Infrastructure Documentation.
 */

import file = require('N/file');
import { IOCIConfig } from './llm';

/** The extracted data from a document. */
interface Document {
    /**
     * The MIME type of the document.
     * This property can contain the following MIME types, depending on the extension of the file provided to
     * documentCapture.documentToStructure(options) or parsed using documentCapture.parseResult(options):
     *     JPG – image/jpeg
     *     PDF – application/pdf
     *     PNG – image/png
     *     TIFF – image/tiff
     */
    readonly mimeType: string;
    /**
     * The pages of the document.
     * The documentCapture.documentToStructure(options) method supports documents up to five pages in length, so the
     * returned documentCapture.Document object can contain up to five pages (as documentCapture.Page objects).
     * When you submit an asynchronous extraction task using the N/task module, you can provide documents of any length,
     * so the returned object contains as many pages as were in the provided document.
     */
    readonly pages: Page[];
    /** Returns the entire text of the document. */
    getText: () => string;
}

/** An extracted page from a document. */
interface Page {
    /**
     * A set of confidence levels indicating whether the page represents a particular type of document.
     * This property is a set of objects, and each object has a documentType value and confidence value.
     * The documentType value is a type of supported document (such as "INVOICE"), and the confidence value is a number between 0 and 1 indicating how confident the service is about whether
     * the page is a document of that type.
     * For example, a documentType value of "INVOICE" and a confidence value of 0.95 means that the service is 95% confident that the page represents an invoice.
    */
    readonly detectedDocumentTypes: { documentType: DocumentType, confidence: number }[];
    /** The extracted fields from the page of a document. */
    readonly fields: Field[];
    readonly lines: Line[];
    readonly tables: Table[];
    readonly words: Word[];
    getText: () => string;
}

interface Field {
    readonly label: string;
    readonly type: string;
    readonly value: string;
}

interface FieldLabel {
    readonly confidence: number;
    readonly name: string;
}

interface FieldValue {
    readonly confidence: number;
    readonly text: string;
}

interface Cell {
    readonly confidence: number;
    readonly text: string;
}

interface Table {
    readonly bodyRows: TableRow[];
    readonly columnCount: number;
    readonly confidence: number;
    readonly footerRows: TableRow[];
    readonly headerRows: TableRow[];
    readonly rowCount: number;
}

interface TableRow {
    readonly cells: Cell[];
}

/** An extracted line of text from a document. */
interface Line {
    readonly confidence: number;
    readonly text: string;
}

/** An extracted word from a document. */
 interface Word {
    readonly confidence: number;
    readonly text: string;
}

interface DocumentToStructureOptions {
    file: file.File,
    documentType?: DocumentType;
    features?: Feature[];
    language?: Language;
    ociConfig?: IOCIConfig;
    timeout?: number;
}

interface DocumentToStructureFunction {
    (options: DocumentToStructureOptions): Document;
    promise(options: DocumentToStructureOptions): Promise<Document>;
}

export const documentToStructure: DocumentToStructureFunction;

interface DocumentToTextOptions {
    /**
     * The PDF file to extract content from.
     * The specified file must be located in the NetSuite File Cabinet and be in PDF format.
     * You can specify the file using its internal ID or the path to the file in the File Cabinet.
     * For more information, see N/file Module. Encrypted files are not supported.
     */
    file: file.File;
    /**
     * The timeout period to wait for a response from the service.
     * By default, the timeout period is 30,000 milliseconds (30 seconds).
     * You can specify a longer timeout period, but you can't specify one that's shorter than 30,000 milliseconds.
     * If you try to specify a shorter timeout period, the default value of 30,000 milliseconds is used instead.
     */
    timeout?: number;
}

interface DocumentToTextFunction {
    (options: DocumentToTextOptions): string;
    promise(options: DocumentToTextFunction): Promise<string>;
}

export const documentToText: DocumentToTextFunction;

interface GetRemainingConcurrencyFunction {
    (): number;
    promise(): Promise<number>;
}

export const getRemainingConcurrency: GetRemainingConcurrencyFunction;

interface GetRemainingFreeUsageFunction {
    (): number;
    promise(): Promise<number>;
}

export const getRemainingFreeUsage: GetRemainingFreeUsageFunction;

export function parseResult(options: { file: file.File }): Document;

// @ts-ignore Ignore the fact that this interface name conflicts with others (not NetSuite related)
enum DocumentType {
    BANK_STATEMEN,
    CHECK,
    DRIVER_LICENSE,
    HEALTH_INSURANCE_ID,
    INVOICE,
    OTHERS,
    PASSPORT,
    PAYSLIP,
    RECEIPT,
    RESUME,
    TAX_FORM
}

enum Feature {
    DOCUMENT_CLASSIFICATION,
    FIELD_EXTRACTION,
    TABLE_EXTRACTION,
    TEXT_EXTRACTION
}

enum FieldType {
    KEY_VALUE,
    LINE_ITEM,
    LINE_ITEM_FIELD,
    LINE_ITEM_GROUP,
    UNKNOWN
}

enum Language {
    ARA,
    CES,
    CHI_SIM,
    DAN,
    DEU,
    ELL,
    ENG,
    FIN,
    FRA,
    HIN,
    HUN,
    ITA,
    JPN,
    KOR,
    NLD,
    NOR,
    OTHERS,
    POL,
    POR,
    RON,
    RUS,
    SLK,
    SWE,
    TUR
}
