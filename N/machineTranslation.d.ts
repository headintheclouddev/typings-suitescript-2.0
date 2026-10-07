/**
 * Use the N/machineTranslation module to translate text into supported languages using generative AI.
 * This module uses the Oracle Cloud Infrastructure (OCI) Language service to translate text in documents you provide.
 * For more information about this service, see Language in the OCI documentation.
 *
 * Unlike methods in the N/llm module, this module supports unlimited translation requests and doesn't consume AI Units.
 *
 * Supported script types: Server scripts (SuiteScript 2.1).
 * @since 2025.1
 */

/**
 * A document returned from machineTranslation.createDocument(options) or machineTranslation.translate(options).
 * A document represents text that you send to or receive from the translation service.
 * This object includes properties for the document ID (Document.id), document language (Document.language), and document text (Document.text).
 * @since 2025.1
 */
interface Document {
    /**
     * The ID of the document. When passing documents to machineTranslation.translate(options), all document IDs must be unique.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly id: string;
    /**
     * The language of the document.
     * When passing a document to machineTranslation.translate(options), this is the source language (detected automatically if null or undefined).
     * When receiving a document as part of a machineTranslation.Response object, this is the language the document was translated into.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly language?: string;
    /**
     * The content of the document.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly text: string;
}

/**
 * An error returned from the translation service when calling machineTranslation.translate(options).
 * The translation service returns an error if a provided document couldn't be translated.
 * An error might occur if the text to translate isn't formatted correctly (for example, if it contains unrecognized characters).
 * This object includes properties for the ID of the document that the error relates to (Error.documentId) and the text of the error message (Error.message).
 * @since 2025.1
 */
interface IMachineTranslationError {
    /**
     * The ID of the document that the error relates to.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly documentId: string;
    /**
     * The text of the error message.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly message: string;
}

/**
 * A response returned from machineTranslation.translate(options).
 * @since 2025.1
 */
interface Response {
    /**
     * The errors returned from the translation service.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly errors: IMachineTranslationError[];
    /**
     * The translated documents returned from the translation service.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly results: Document[];
}

/**
 * Creates a document with the specified ID, source language, and text content.
 * A document represents text to translate using machineTranslation.translate(options).
 * When you create a document for translation, you can specify the source language of the document.
 * If you don't specify the source language, the translation service detects the language automatically.
 *
 * Note: For best translation results, each document should contain text in a single language only.
 * The translation service supports documents that use multiple languages, but the accuracy and completeness of the resulting translation may vary.
 *
 * When passing documents to machineTranslation.translate(options) for translation, keep the following considerations in mind:
 * - All document IDs must be unique.
 * - The maximum length for a single document is 5,000 characters.
 * - The overall maximum length for all documents is 20,000 characters.
 * - You can't pass an empty document (one where the Document.text property is empty).
 * - If you pass a document that doesn't specify its source language (one where the Document.language property is null or undefined), the translation service detects the source language automatically.
 *
 * @throws {SuiteScriptError} INVALID_LANGUAGE if options.language uses a value that isn't part of the machineTranslation.Language enum.
 * @governance none
 * @since 2025.1
 */
export function createDocument(options: {
    /** The ID of the document. */
    id: string,
    /** The text of the document. */
    text: string,
    /** The language of the document. Use values from the machineTranslation.Language enum. If not specified, the language is detected automatically. */
    language?: Language | string,
}): Document;

interface ITranslateOptions {
    /** The documents to translate. You can pass documents created using machineTranslation.createDocument(options) or plain objects with id and text properties. */
    documents: Document[] | readonly Document[];
    /** The language to translate the specified documents into. Use values from the machineTranslation.Language enum. */
    targetLanguage: Language | string;
    /** The timeout period to wait for a response from the translation service, in milliseconds. The default value is 30,000 (30 seconds). */
    timeout?: number;
}

interface ITranslateFunction {
    (options: ITranslateOptions): Response;
    /**
     * Asynchronously translates the provided documents into the specified language.
     * The parameters and errors thrown are the same as those for machineTranslation.translate(options).
     * @governance 100 units
     * @since 2025.1
     */
    promise(options: ITranslateOptions): Promise<Response>;
}

/**
 * Translates the provided documents into the specified language.
 * This method supports unlimited translation requests and doesn't consume AI Units.
 * @throws {SuiteScriptError} DOCUMENT_CANNOT_BE_EMPTY if one of the documents is empty.
 * @throws {SuiteScriptError} DOCUMENT_IDS_MUST_BE_UNIQUE if two or more documents have duplicate IDs.
 * @throws {SuiteScriptError} DOCUMENT_TOO_LARGE if one of the documents is longer than 5,000 characters.
 * @throws {SuiteScriptError} INPUT_TOO_LARGE if the total length of all documents is longer than 20,000 characters.
 * @throws {SuiteScriptError} INVALID_LANGUAGE if a language isn't part of the machineTranslation.Language enum.
 * @governance 100 units
 * @since 2025.1
 */
export const translate: ITranslateFunction;

/**
 * The language to translate documents to or from. Use this enum to set options.targetLanguage in machineTranslation.translate(options) or options.language in machineTranslation.createDocument(options).
 * @since 2025.1
 */
declare enum Language {
    ARABIC = 'ARABIC',
    BRAZILIAN_PORTUGUESE = 'BRAZILIAN_PORTUGUESE',
    CANADIAN_FRENCH = 'CANADIAN_FRENCH',
    CROATIAN = 'CROATIAN',
    CZECH = 'CZECH',
    DANISH = 'DANISH',
    DUTCH = 'DUTCH',
    ENGLISH = 'ENGLISH',
    FINNISH = 'FINNISH',
    FRENCH = 'FRENCH',
    GERMAN = 'GERMAN',
    GREEK = 'GREEK',
    HEBREW = 'HEBREW',
    HUNGARIAN = 'HUNGARIAN',
    ITALIAN = 'ITALIAN',
    JAPANESE = 'JAPANESE',
    KOREAN = 'KOREAN',
    NORWEGIAN = 'NORWEGIAN',
    POLISH = 'POLISH',
    PORTUGUESE = 'PORTUGUESE',
    ROMANIAN = 'ROMANIAN',
    RUSSIAN = 'RUSSIAN',
    SIMPLIFIED_CHINESE = 'SIMPLIFIED_CHINESE',
    SLOVAK = 'SLOVAK',
    SLOVENIAN = 'SLOVENIAN',
    SPANISH = 'SPANISH',
    SWEDISH = 'SWEDISH',
    THAI = 'THAI',
    TRADITIONAL_CHINESE = 'TRADITIONAL_CHINESE',
    TURKISH = 'TURKISH',
    VIETNAMESE = 'VIETNAMESE',
}
