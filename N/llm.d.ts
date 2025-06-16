/**
 * The N/llm module supports generative artificial intelligence (AI) capabilities in SuiteScript.
 * You can use this module to send requests to the large language models (LLMs) supported by NetSuite and to receive LLM responses to use in your scripts.
 */

import type {File} from './file';

/** The chat message object returned by the llm.createChatMessage(options) method. */
interface ChatMessage {
    text: string;
    readonly role: ChatRole;
}

/**
 * A citation returned from the LLM when source documents are provided to llm.generateText(options) or llm.generateText.promise(options).
 *
 * A citation represents the content from source documents where the LLM found relevant information for its response.
 * Citations are created using retrieval-augmented generation (RAG), which lets you provide additional context that the LLM can use to generate its responses.
 * For more information about RAG, see What Is Retrieval-Augmented Generation (RAG)?
 *
 * Citation objects are included in the llm.Response object that is returned from llm.generateText(options) or llm.generateText.promise(options), if applicable, through the Response.citations property.
 * You can use the citation object to identify the documents that the LLM used for its response, as well as where the cited text appears in the response.
 * The object includes properties that specify the documents used (Citation.documentIds), the start and end points of the cited text (Citation.start and Citation.end), and the content itself (Citation.text).
 */
interface Citation {
    documentIds: string[];
    readonly end: number;
    readonly start: number;
    readonly text: string;
}

/** The response returned from LLM. Use the llm.generateText(options) or the llm.generateText.promise(options) method to retrieve a response from the LLM. */
interface Response {
    readonly citations: Citation[];
    readonly documents: Document[];
    readonly text: string;
    readonly model: string;
    readonly chatHistory: ChatMessage[];
}

interface StreamedResponse {
    readonly citations: Citation[];
    readonly documents: Document[];
    readonly text: string;
    readonly model: string;
    readonly chatHistory: ChatMessage[];
}

/**
 * Creates a chat message based on a specified role and text.
 * Chat messages can be used in the chatHistory parameter of the llm.generateText(options) method.
 * Supported roles are defined by the llm.ChatRole enum.
 */
export function createChatMessage(options: { role: string, text: string }): ChatMessage;

/**
 * Creates a document with the specified ID and content.
 *
 * A document represents source content that you can provide as additional context to the LLM when you call llm.generateText(options) or llm.generateText.promise(options).
 * The LLM uses information in the provided documents to augment its response using retrieval-augmented generation (RAG).
 * For more information about RAG, see What Is Retrieval-Augmented Generation (RAG)?
 *
 * You do not need to use this method to create a document before providing the document to llm.generateText(options) or llm.generateText.promise(options).
 * You can also provide a plain JavaScript object that uses the id and data properties.
 */
export function createDocument(options: { data: string, id: string }): Document;

export const embed: IEmbededFunction

/**
 * Takes the ID of an existing prompt and values for variables used in the prompt and returns the response from the LLM.
 *
 * You can use this method to evaluate a prompt that is available in Prompt Studio by providing values for any variables that the prompt uses.
 * The resulting prompt is sent to the LLM, and this method returns the LLM response, similar to the llm.generateText(options) method.
 * For more information about Prompt Studio, see Prompt Studio.
 *
 * When unlimited usage mode is used, this method accepts the OCI configuration parameters.
 * You can also specify OCI configuration parameters on the SuiteScript tab of the AI Preferences page.
 * For more information, see Using Your Own OCI Configuration for SuiteScript Generative AI APIs.
 */
export const evaluatePrompt: IEvaluatePromptFunction;

export const evaluatePromptStreamed: IEvaluatePromptStreamedFunction;

export const generateText: GenerateTextFunction;

/**
 * Returns the streamed response from the LLM for a given prompt.
 *
 * This method is similar to llm.generateText(options) but returns the LLM response as a stream.
 * After calling this method, you can access the partial response (using the StreamedResponse.text property of the returned llm.StreamedResponse object) before the entire response has been generated.
 * You can also use an iterator to examine each token returned by the LLM.
 */
export const generateTextStreamed: GenerateTextStreamedFunction;

/** Returns the number of free requests in the current month. */
export const getRemainingFreeUsage: GetRemainingFreeUsageFunction;

/** Returns the number of free embeddings requests in the current month. This method tracks free requests for embed API calls, such as llm.embed(options). To track free requests for non-embed API calls (such as llm.generateText(options)), use llm.getRemainingFreeUsage() instead. */
export const getRemainingFreeEmbedUsage: GetRemainingFreeUsageFunction;

interface IEmbededFunction {
    (options: IEmbedOptions): EmbeddedResponse;
    promise(options: IEmbedOptions): EmbeddedResponse;
}

interface IEvaluatePromptFunction {
    (options: IEvaluatePromptOptions): Response;
    promise(options: IEvaluatePromptOptions): Response;
}

interface IEvaluatePromptStreamedFunction {
    (options: IEvaluatePromptOptions): StreamedResponse;
    promise(options: IEvaluatePromptOptions): StreamedResponse;
}

interface GenerateTextFunction {
    (options: IGenerateTextOptions): Response;
    promise(options: IGenerateTextOptions): Response;
}

interface GenerateTextStreamedFunction {
    (options: IGenerateTextOptions): StreamedResponse;
    promise(options: IGenerateTextOptions): StreamedResponse;
}

interface GetRemainingFreeUsageFunction {
    (): number;
    promise(): number;
}

interface EmbeddedResponse {
    readonly embeddings: number[];
    /** The list of inputs used to generate the embeddings response. */
    readonly inputs: string[];
    /** The model used to generate the embeddings response. */
    readonly model: string;
}

interface IEmbedOptions {
    /** An array of inputs to get embeddings for. */
    inputs: string[];
    /** The embed model family to use. Use values from llm.EmbedModelFamily to set this value. If not specified, the Cohere Embed Multilingual model is used. */
    embededModelFamily?: string;
    /** Configuration needed for unlimited usage through OCI Generative AI Service. Required only when accessing the LLM through an Oracle Cloud Account and the OCI Generative AI Service. SuiteApps installed to target accounts are prevented from using the free usage pool for N/llm and must use the OCI configuration. */
    ociConfig?: IOCIConfig;
    /** The amount of time to wait for a response from the LLM, in milliseconds. If not specified, the default value is 30,000. */
    timeout?: number;
    /** The truncation method to use when embeddings input exceeds 512 tokens. Use values from llm.Truncate to set this value. If not specified, no truncation method is used. */
    truncate?: string;
}

interface IEvaluatePromptOptions {
    id: string|number;
    /**
     * Configuration needed for unlimited usage through OCI Generative AI Service.
     * Required only when accessing the LLM through an Oracle Cloud Account and the OCI Generative AI Service.
     * SuiteApps installed to target accounts are prevented from using the free usage pool for N/llm and must use the OCI configuration.
     *
     * Instead of specifying OCI configuration details using this parameter, you can specify them on the SuiteScript tab of the AI Preferences page.
     * When you do so, those OCI configuration details are used for all scripts in your account that use N/llm module methods, and unlimited usage mode is enabled for those scripts.
     * If you specify OCI configuration details in both places (using this parameter and using the SuiteScript tab of the AI Preferences page), the details provided in this parameter override those that are specified on the SuiteScript tab.
     * For more information, see Using Your Own OCI Configuration for SuiteScript Generative AI APIs.
     */
    ociConfig?: IOCIConfig;
    /** Timeout in milliseconds, defaults to 30,000. */
    timeout?: number;
    /**
     * Values for the variables that are used in the prompt. Provide these values as an object with key-value pairs.
     * For an example, see the Syntax section.
     *
     * You can use Prompt Studio to generate a SuiteScript example that uses this method and includes the variables for a prompt in the correct format.
     * When viewing a prompt in Prompt Studio, click Show SuiteScript Example to generate SuiteScript code with all the variables that prompt uses.
     * You can then use this code in your scripts and provide a value for each variable.
     */
    variables?: object;
}

interface IGenerateTextOptions {
    /** Prompt for the LLM. */
    prompt: string;
    /** Chat history to be taken into consideration. */
    chatHistory?: ChatMessage[];
    /** A list of documents to provide additional context for the LLM to generate the response. */
    documents?: Document[];
    /**
     * An image to query. You can send an image (as a file.File object) to the LLM and ask questions about the image and get text outputs, such as:
     * - Advanced image captions
     * - Detailed description of an image
     * - Answers to questions about an image
     * - Information about charts and graphs in an image
     */
    image?: File;
    /** Specifies the LLM to use. Use llm.ModelFamily to set the value. If not specified, the Cohere Command R LLM is used. */
    modelFamily?: ModelFamily;
    modelParameters?: IModelParameters;
    /**
     * Configuration needed for unlimited usage through OCI Generative AI Service.
     * Required only when accessing the LLM through an Oracle Cloud Account and the OCI Generative AI Service.
     * SuiteApps installed to target accounts are prevented from using the free usage pool for N/llm and must use the OCI configuration.
     */
    ociConfig?: IOCIConfig;
    /** Preamble override for the LLM. A preamble is the Initial context or guiding message for an LLM. For more details about using a preamble, refer to About the Chat Models in Generative AI (Chat Model Parameters section) in the Oracle Cloud Infrastructure Documentation. */
    preamble?: string;
    /** Timeout in milliseconds, defaults to 30,000. */
    timeout?: number;
}

interface Document {
    readonly data: string;
    readonly id: string;
}

interface IModelParameters {
    /** A penalty that is assigned to a token when that token appears frequently. The higher the value, the stronger a penalty is applied to previously present tokens, proportional to how many times they have already appeared in the prompt or prior generation. See Model Parameter Values by LLM for valid values. */
    frequencyPenalty?: number;
    /** The maximum number of tokens the LLM is allowed to generate. The average number of tokens per word is 3. See Model Parameter Values by LLM for valid values. */
    maxTokens?: number;
    /**
     * A penalty that is assigned to each token when it appears in the output to encourage generating outputs with tokens that haven't been used.
     * Similar to frequencyPenalty, except that this penalty is applied equally to all tokens that have already appeared, regardless of their exact frequencies.
     * See Model Parameter Values by LLM for valid values.
     */
    presencePenalty?: number;
    /**
     * Defines a range of randomness for the response.
     * A lower temperature will lean toward the highest probability tokens and expected answers, while a higher temperature will deviate toward random and unconventional responses.
     * A lower value works best for responses that must be more factual or accurate, and a higher value works best for getting more creative responses.
     * See Model Parameter Values by LLM for valid values.
     */
    temperature?: number;
    /** Determines how many tokens are considered for generation at each step. See Model Parameter Values by LLM for valid values. */
    topK?: number;
    /**
     * Sets the probability, which ensures that only the most likely tokens with total probability mass of p are considered for generation at each step.
     * If both topK and topP are set, topP acts after topK. See Model Parameter Values by LLM for valid values.
     */
    topP?: number;
}

interface IOCIConfig {
    /** Compartment OCID. For more information, refer to Managing Compartments in the Oracle Cloud Infrastructure Documentation. */
    compartmentId?: string;
    /**
     * Endpoint ID. This value is needed only when a custom OCI DAC (dedicated AI cluster) is to be used.
     * For more information, refer to Managing an Endpoint in Generative AI in the Oracle Cloud Infrastructure Documentation.
     */
    endpointId?: string;
    /**
     * Fingerprint of the public key (only a NetSuite secret is accepted—see Creating Secrets).
     * For more information, refer to Required Keys and OCIDs in the Oracle Cloud Infrastructure Documentation.
     */
    fingerprint?: string;
    /**
     * Private key of the OCI user (only a NetSuite secret is accepted—see Creating Secrets).
     * For more information, refer to Required Keys and OCIDs in the Oracle Cloud Infrastructure Documentation.
     */
    privateKey?: string;
    /** Tenancy OCID. For more information, refer to Managing the Tenancy in the Oracle Cloud Infrastructure Documentation. */
    tenancyId?: string;
    /** User OCID. For more information, refer to Managing Users in the Oracle Cloud Infrastructure Documentation. */
    userId?: string;
}

declare enum ChatRole {
    /** Identifies the author of the chat message (prompt) sent to the large language model. */
    USER = "USER",
    /** Identifies the author of the chat message (response text) received from the large language model. */
    CHATBOT = "CHATBOT"
}

/** The large language model to be used to generate embeddings. */
declare enum EmbedModelFamily {
    COHERE_EMBED_ENGLISH = 'cohere.embed-english-v3.0',
    /** Light versions of embedding models might generate embeddings faster than regular embedding models, but the output might not be as accurate. */
    COHERE_EMBED_ENGLISH_LIGHT = 'cohere.embed-english-light-v3.0',
    COHERE_EMBED_MULTILINGUAL = 'cohere.embed-multilingual-v3.0',
    /** Light versions of embedding models might generate embeddings faster than regular embedding models, but the output might not be as accurate. */
    COHERE_EMBED_MULTILINGUAL_LIGHT = 'cohere.embed-multilingual-light-v3.0'
}

/** The large language model to be used. */
declare enum ModelFamily {
    /** Always uses the latest supported Cohere model. Cohere Command-R is the default when the options.modelFamily parameter is omitted. */
    COHERE_COMMAND = 'cohere.command-r-16k',
    /** Always uses the latest supported Meta Llama model. */
    META_LLAMA = 'meta.llama-3.1-70b-instruct'
}

/** The truncation method to use when embeddings input exceeds 512 tokens. Use this enum to set the value of the options.truncate parameter in llm.embed(options). */
declare enum Truncate {
    END = 'END',
    NONE = 'NONE',
    START = 'START'
}
