/**
 * Load the N/documentCapture module to extract text content from supported documents.
 *
 * The N/documentCapture module lets you programmatically extract structured content and key information from a variety of document types (such as invoices, receipts, contracts, and so on) directly
 * within NetSuite. This module uses the AI-driven capabilities of the Oracle Cloud Infrastructure (OCI) Document Understanding service and can automate document processing, reduce manual data entry,
 * and enhance business workflows. For more information about the OCI Document Understanding service, refer to Document Understanding in the Oracle Cloud Infrastructure Documentation.
 */

import file = require('N/file');
import { IOCIConfig } from './llm';

interface Document {
    readonly mimeType: string;
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
