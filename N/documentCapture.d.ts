/**
 * Load the N/documentCapture module to extract text content from supported documents.
 *
 * The N/documentCapture module lets you programmatically extract structured content and key information from a variety of document types (such as invoices, receipts, contracts, and so on) directly
 * within NetSuite. This module uses the AI-driven capabilities of the Oracle Cloud Infrastructure (OCI) Document Understanding service and can automate document processing, reduce manual data entry,
 * and enhance business workflows. For more information about the OCI Document Understanding service, refer to Document Understanding in the Oracle Cloud Infrastructure Documentation.
 */

import file = require('N/file');
import { IOCIConfig } from './llm';

/**
 * The extracted data from a document.
 * @since 2025.2
 */
interface Document {
    /**
     * The MIME type of the document.
     * This property can contain the following MIME types, depending on the extension of the file provided to
     * documentCapture.documentToStructure(options) or parsed using documentCapture.parseResult(options):
     *     JPG – image/jpeg
     *     PDF – application/pdf
     *     PNG – image/png
     *     TIFF – image/tiff
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly mimeType: string;
    /**
     * The pages of the document.
     * The documentCapture.documentToStructure(options) method supports documents up to five pages in length, so the
     * returned documentCapture.Document object can contain up to five pages (as documentCapture.Page objects).
     * When you submit an asynchronous extraction task using the N/task module, you can provide documents of any length,
     * so the returned object contains as many pages as were in the provided document.
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly pages: Page[];
    /**
     * Returns the entire text of the document.
     * @governance none
     * @since 2025.2
     */
    getText: () => string;
}

/**
 * An extracted page from a document.
 * @since 2025.2
 */
interface Page {
    /**
     * A set of confidence levels indicating whether the page represents a particular type of document.
     * This property is a set of objects, and each object has a documentType value and confidence value.
     * The documentType value is a type of supported document (such as "INVOICE"), and the confidence value is a number between 0 and 1 indicating how confident the service is about whether
     * the page is a document of that type.
     * For example, a documentType value of "INVOICE" and a confidence value of 0.95 means that the service is 95% confident that the page represents an invoice.
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly detectedDocumentTypes: { documentType: DocumentType, confidence: number }[];
    /**
     * The extracted fields from the page of a document.
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly fields: Field[];
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly lines: Line[];
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly tables: Table[];
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly words: Word[];
    /**
     * @governance none
     * @since 2025.2
     */
    getText: () => string;
}

/** @since 2025.2 */
interface Field {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly label: string;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly type: string;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly value: string;
}

/** @since 2025.2 */
interface FieldLabel {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly confidence: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly name: string;
}

/** @since 2025.2 */
interface FieldValue {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly confidence: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly text: string;
}

/** @since 2025.2 */
interface Cell {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly confidence: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly text: string;
}

/** @since 2025.2 */
interface Table {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly bodyRows: TableRow[];
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly columnCount: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly confidence: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly footerRows: TableRow[];
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly headerRows: TableRow[];
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly rowCount: number;
}

/** @since 2025.2 */
interface TableRow {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly cells: Cell[];
}

/**
 * An extracted line of text from a document.
 * @since 2025.2
 */
interface Line {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly confidence: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly text: string;
}

/**
  * An extracted word from a document.
  * @since 2025.2
  */
 interface Word {
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly confidence: number;
    /**
     * @throws {SuiteScriptError} READ_ONLY if you try to set the value of this property.
     * @since 2025.2
     */
    readonly text: string;
}

interface DocumentToStructureOptions {
    file: file.File,
    documentType?: DocumentType;
    features?: Feature[];
    language?: Language;
    /**
     * This object is no longer supported. Any values specified in this object are ignored.
     * @deprecated As of 2026.2, the ociConfig object is no longer supported for SuiteScript AI APIs. Providing it doesn't generate an error, but the values are ignored.
     */
    ociConfig?: IOCIConfig;
    timeout?: number;
}

interface DocumentToStructureFunction {
    (options: DocumentToStructureOptions): Document;
    /**
     * @governance 100 units
     * @since 2025.2
     */
    promise(options: DocumentToStructureOptions): Promise<Document>;
}

/**
 * @throws {SuiteScriptError} DOCUMENT_TOO_LONG if the file is longer than five pages.
 * @throws {SuiteScriptError} FEATURES_CANNOT_BE_EMPTY if options.features is an empty array.
 * @throws {SuiteScriptError} FEATURE_1_DOES_NOT_SUPPORT_LANGUAGE_2 if a feature is not supported in the specified language.
 * @throws {SuiteScriptError} INCOMPATIBLE_DOCUMENT_TYPE_FOR_FEATURE_1 if a feature is not supported for the specified document type.
 * @throws {SuiteScriptError} INVALID_DOCUMENT_CAPTURE_RESULT if the result provided by the service is invalid.
 * @throws {SuiteScriptError} INVALID_DOCUMENT_TYPE if the document type is not included in the documentCapture.DocumentType enum.
 * @throws {SuiteScriptError} INVALID_LANGUAGE if the language is not included in the documentCapture.Language enum.
 * @throws {SuiteScriptError} MAXIMUM_PARALLEL_REQUESTS_LIMIT_EXCEEDED if more than five parallel requests are made.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.file is not specified.
 * @throws {SuiteScriptError} UNSUPPORTED_FILE_TYPE if the file is not in PDF, JPG, PNG, or TIFF format.
 * @governance 100 units
 * @since 2025.2
 */
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
    /**
     * @governance 100 units
     * @since 2025.2
     */
    promise(options: DocumentToTextOptions): Promise<string>;
}

/**
 * @throws {SuiteScriptError} FILE_CANNOT_BE_EMPTY if the file is empty.
 * @throws {SuiteScriptError} FILE_CORRUPTED_OR_INVALID if the file couldn't be parsed.
 * @throws {SuiteScriptError} UNSUPPORTED_ENCODING_EXCEPTION if the file is corrupted or contains invalid characters.
 * @throws {SuiteScriptError} UNSUPPORTED_FILE_TYPE_1_USE_2 if the file is not a PDF file.
 * @governance 100 units
 * @since 2025.2
 */
export const documentToText: DocumentToTextFunction;

interface GetRemainingConcurrencyFunction {
    (): number;
    /**
     * @governance none
     * @since 2025.2
     */
    promise(): Promise<number>;
}

/**
 * @governance none
 * @since 2025.2
 */
export const getRemainingConcurrency: GetRemainingConcurrencyFunction;

/** @deprecated As of 2026.2, use llm.getRemainingUsage() and llm.getRemainingUsage.promise() from the N/llm module instead. */
interface GetRemainingFreeUsageFunction {
    /** @deprecated As of 2026.2, use llm.getRemainingUsage() instead. Remains available for compatibility and calls llm.getRemainingUsage(). */
    (): number;
    /**
     * @governance none
     * @since 2025.2
     * @deprecated As of 2026.2, use llm.getRemainingUsage.promise() instead. Remains available for compatibility and calls llm.getRemainingUsage.promise().
     */
    promise(): Promise<number>;
}

/**
 * Returns the number of free requests in the current month.
 * @governance none
 * @since 2025.2
 * @deprecated As of 2026.2, use llm.getRemainingUsage() from the N/llm module instead, which returns the number of AI Units remaining.
 * This method remains available for compatibility and calls llm.getRemainingUsage().
 */
export const getRemainingFreeUsage: GetRemainingFreeUsageFunction;

/**
 * @throws {SuiteScriptError} UNSUPPORTED_FILE_TYPE_1_USE_2 if the file is not a JSON file.
 * @governance none
 * @since 2025.2
 */
export function parseResult(options: { file: file.File }): Document;

// @ts-ignore Ignore the fact that this interface name conflicts with others (not NetSuite related)
/** @since 2025.2 */
export enum DocumentType {
    BANK_STATEMENT,
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

/** @since 2025.2 */
export enum Feature {
    DOCUMENT_CLASSIFICATION,
    FIELD_EXTRACTION,
    TABLE_EXTRACTION,
    TEXT_EXTRACTION
}

/** @since 2025.2 */
export enum FieldType {
    KEY_VALUE,
    LINE_ITEM,
    LINE_ITEM_FIELD,
    LINE_ITEM_GROUP,
    UNKNOWN
}

/** @since 2025.2 */
export enum Language {
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
