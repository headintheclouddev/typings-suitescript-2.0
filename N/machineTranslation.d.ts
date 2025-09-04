/**
 * Use the N/machineTranslation module to translate text into supported languages using generative AI.
 * This module uses the Oracle Cloud Infrastructure (OCI) Language service to translate text in documents you provide.
 * For more information about this service, see Language in the OCI documentation.
 */

/**
 * A document returned from machineTranslation.createDocument(options) or machineTranslation.translate(options).
 * A document represents text that you send to or receive from the translation service.
 * This object includes properties for the document ID (Document.id), document language (Document.language), and document text (Document.text).
 */
interface Document {
    /** The ID of the document. When passing documents to machineTranslation.translate(options), all document IDs must be unique. */
    readonly id: string;
    readonly language?: string;
    readonly text: string;
}

/**
 * An error returned from the translation service when calling machineTranslation.translate(options).
 * The translation service returns an error if a provided document couldn't be translated.
 * An error might occur if the text to translate isn't formatted correctly (for example, if it contains unrecognized characters).
 * This object includes properties for the ID of the document that the error relates to (Error.documentId) and the text of the error message (Error.message).
 */
interface IMachineTranslationError {
    /** The ID of the document that the error relates to. */
    readonly documentId: string;
    /** The text of the error message. */
    readonly message: string;
}

/** A response returned from machineTranslation.translate(options). */
interface Response {
    /** The errors returned from the translation service. */
    readonly errors: IMachineTranslationError[];
    /** The translation documents. */
    readonly results: Document[];
}

/**
 * Creates a document with the specified ID, source language, and text content.
 * A document represents text to translate using machineTranslation.translate(options).
 * When you create a document for translation, you can specify the source language of the document.
 * If you don't specify the source language, the translation service detects the language automatically.
 *
 * Note For best translation results, each document should contain text in a single language only.
 * The translation service supports documents that use multiple languages, but the accuracy and completeness of the resulting translation may vary.
 *
 * When passing documents to machineTranslation.translate(options) for translation, keep the following considerations in mind:
 * - All document IDs must be unique.
 * - The maximum length for a single document is 5,000 characters.
 * - The overall maximum length for all documents is 20,000 characters.
 * - You can't pass an empty document (one where the Document.text property is empty).
 * - If you pass a document that doesn't specify its source language (one where the Document.language property is null or undefined), the translation service detects the source language automatically.
 */
export function createDocument(options: { id: string, text: string, language?: string }): Document;

interface ITranslateFunction {
    (options: { documents: Document[], targetLanguage: string, timeout?: number }): Response;
    promise(options: { documents: Document[], targetLanguage: string, timeout?: number }): Promise<Response>;
}

export const translate: ITranslateFunction;

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
