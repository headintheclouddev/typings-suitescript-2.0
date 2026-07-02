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
    /** List of chat messages. */
    readonly chatHistory: ChatMessage[];
    /** List of citations used to generate the response. */
    readonly citations: Citation[];
    /** List of documents used to generate the response. */
    readonly documents: Document[];
    /** Model used to produce the LLM response. */
    readonly model: string;
    /** Text returned by the LLM. */
    readonly text: string;
    /** Tool calls requested by the LLM. @since 2025.2 */
    readonly toolCalls: ToolCall[];
    /** Token usage for a request to the LLM. @since 2025.2 */
    readonly usage: Usage;
}

/**
 * The streamed response returned from the LLM.
 * Use llm.generateTextStreamed(options) or llm.evaluatePromptStreamed(options) (or their promise versions) to retrieve a streamed response.
 *
 * You can access the partial response (using the StreamedResponse.text property) before the entire response has been generated, as well as StreamedResponse.model.
 * Other properties (such as StreamedResponse.documents and StreamedResponse.citations) are accessible only after the entire response has been generated.
 */
interface StreamedResponse {
    /** List of chat messages. */
    readonly chatHistory: ChatMessage[];
    /** List of citations used to generate the streamed response. */
    readonly citations: Citation[];
    /** List of documents used to generate the streamed response. */
    readonly documents: Document[];
    /** Model used to produce the streamed response. */
    readonly model: string;
    /** Text returned by the LLM. While streaming, this contains the partial response received so far. */
    readonly text: string;
    /** Tool calls requested by the LLM. @since 2025.2 */
    readonly toolCalls: ToolCall[];
    /**
     * Returns an iterator that lets you examine each token returned by the LLM as it is generated.
     *
     * @example
     *  const response = llm.generateTextStreamed({ prompt: 'Hello World' });
     *  const iter = response.iterator();
     *  iter.each((token) => {
     *      log.debug('token.value: ' + token.value);
     *      log.debug('response.text: ' + response.text); // Partial response up to and including this token
     *      return true;
     *  });
     */
    iterator(): StreamedResponseIterator;
}

interface StreamedResponseIterator {
    /** Iterates over each token returned by the LLM. Return true from the callback to continue iterating, or false to stop. */
    each(callback: (token: { value: string }) => boolean): void;
}

/**
 * A tool the LLM can request. Created using llm.createTool(options).
 *
 * Tools are callable operations that the LLM can request to augment its responses.
 * They are custom utilities that you define, and they let the LLM retrieve external data (such as data from NetSuite using SuiteQL),
 * perform calculations, or trigger business logic as part of an LLM interaction.
 *
 * Provide tools to llm.generateText(options) or llm.generateTextStreamed(options) using the options.tools parameter.
 * @since 2025.2
 */
interface Tool {
    /** The description of the tool. Helps the LLM understand when to request the tool. */
    readonly description: string;
    /** The name of the tool. Used when the LLM refers to this tool in tool call requests. */
    readonly name: string;
    /** The parameters of the tool. */
    readonly parameters: ToolParameter[];
}

/**
 * A tool call request from the LLM, returned as part of the response from llm.generateText(options) or llm.generateTextStreamed(options)
 * through the Response.toolCalls or StreamedResponse.toolCalls property.
 *
 * The LLM generates a tool call request when it determines that running a particular tool may help provide a more accurate or useful response to your prompt.
 * Your SuiteScript code is responsible for iterating over these tool calls, running the appropriate handler logic with the provided parameters,
 * and returning the results to the LLM (as llm.ToolResult objects created using llm.createToolResult(options)).
 * @since 2025.2
 */
interface ToolCall {
    /** The name of the requested tool. */
    readonly name: string;
    /**
     * The parameters of the requested tool as key-value pairs for each input parameter required by the tool, as specified in the tool definition.
     *
     * Note: The N/llm Module Members table lists this property's type as llm.ToolParameter[], but the llm.ToolCall object description and the
     * examples in "Tooling in the N/llm Module" show a plain object of key-value pairs (e.g. TOOL_HANDLERS[call.name](call.parameters) where
     * the handler reads options.userName).
     */
    readonly parameters: { [name: string]: any };
}

/**
 * A parameter for a tool. Created using llm.createToolParameter(options).
 *
 * Tool parameters define the individual input values that the LLM must provide when requesting a tool call.
 * @since 2025.2
 */
interface ToolParameter {
    /** The description of the tool parameter. Helps the LLM prompt for and fill in the value correctly. */
    readonly description: string;
    /** The name of the tool parameter. Used when the LLM refers to this specific input in tool call requests. */
    readonly name: string;
    /** The type of the tool parameter. Values are from the llm.ToolParameterType enum. */
    readonly type: string;
}

/**
 * A tool result to send back to the LLM. Created using llm.createToolResult(options).
 *
 * Tool results let you send the output of a tool (such as the result of a SuiteQL query or a business operation) back to the LLM
 * by providing them to subsequent llm.generateText(options) or llm.generateTextStreamed(options) calls using the options.toolResults parameter.
 * @since 2025.2
 */
interface ToolResult {
    /** The originating tool call request from the LLM. */
    readonly call: ToolCall;
    /** The outputs from running the tool specified in the tool call request. */
    readonly outputs: object[];
}

/** Token usage for a request to the LLM. Returned through the Response.usage property. @since 2025.2 */
interface Usage {
    /** The number of tokens in the response from the LLM. */
    readonly completionTokens: number;
    /** The number of tokens in the request to the LLM. */
    readonly promptTokens: number;
    /** The total number of tokens for the entire request to the LLM. */
    readonly totalTokens: number;
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

/**
 * Creates a tool definition that you can provide when calling llm.generateText(options) or llm.generateTextStreamed(options) using the options.tools parameter.
 *
 * Tools are callable operations that the LLM can request to augment its responses. They are custom utilities that you define, and they let the LLM
 * retrieve external data (such as data from NetSuite using SuiteQL), perform calculations, or trigger business logic as part of an LLM interaction.
 * You can create and provide multiple tool definitions based on your use cases.
 * @governance none
 * @since 2025.2
 */
export function createTool(options: {
    /** A description of what the tool does. This parameter helps the LLM understand when to request the tool. */
    description: string,
    /** A unique identifier for the tool. Used when the LLM refers to this tool in tool call requests (which are represented as llm.ToolCall objects). */
    name: string,
    /** An array of tool parameters, which are created using llm.createToolParameter(options). These parameters specify the input values required to run the tool. */
    parameters: ToolParameter[],
}): Tool;

/**
 * Creates a tool parameter that you can provide when creating a tool using llm.createTool(options).
 *
 * Tool parameters define the individual input values that the LLM must provide when requesting a tool call.
 * These parameters help the LLM understand how to call the tool accurately and ensure that tool call requests include all necessary and correctly typed data.
 * @governance none
 * @since 2025.2
 */
export function createToolParameter(options: {
    /** A description of what data the tool parameter represents. This parameter helps the LLM prompt for and fill in the value correctly. */
    description: string,
    /** A unique identifier for the tool parameter. Used when the LLM refers to this specific input in tool call requests. */
    name: string,
    /** The data type of the parameter. Use values from the llm.ToolParameterType enum to set this parameter. */
    type: ToolParameterType | string,
}): ToolParameter;

/**
 * Creates a tool result that you can provide when calling llm.generateText(options) or llm.generateTextStreamed(options) using the options.toolResults parameter.
 *
 * Tool results let you send the output of a tool (such as the result of a SuiteQL query or a business operation) back to the LLM.
 * You generate tool results in your SuiteScript code after handling a tool call request, which is represented by a llm.ToolCall object.
 * @governance none
 * @since 2025.2
 */
export function createToolResult(options: {
    /** The original tool call request from the LLM. This parameter links the result to a specific tool call request. */
    call: ToolCall,
    /** An array of output objects representing the results of running the tool. Each output object typically includes a result property (or another relevant property) that contains the value to send back to the LLM. */
    outputs: object[],
}): ToolResult;

/**
 * Returns the embeddings from the LLM for a given input.
 *
 * You can use embeddings to compare the similarity of a set of inputs, which is useful for finding similar items based on item attributes,
 * implementing semantic search, and applying text classification or text clustering.
 * @governance 50
 */
export const embed: IEmbedFunction;

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
 * @governance 100
 */
export const evaluatePrompt: IEvaluatePromptFunction;

/** Alias for llm.evaluatePrompt(options). Uses the same parameters and can throw the same errors. */
export const executePrompt: IEvaluatePromptFunction;

/**
 * Takes the ID of an existing prompt and values for variables used in the prompt and returns the streamed response from the LLM.
 * When you're using unlimited usage mode, this method also accepts the OCI configuration parameters.
 * @governance 100
 */
export const evaluatePromptStreamed: IEvaluatePromptStreamedFunction;

/** Alias for llm.evaluatePromptStreamed(options). Uses the same parameters and can throw the same errors. */
export const executePromptStreamed: IEvaluatePromptStreamedFunction;

/**
 * Takes a prompt and parameters for the LLM and returns the response from the LLM.
 * When you're using unlimited usage mode, this method also accepts the OCI configuration parameters.
 * @governance 100
 */
export const generateText: GenerateTextFunction;

/** Alias for llm.generateText(options). Uses the same parameters and can throw the same errors. */
export const chat: GenerateTextFunction;

/**
 * Returns the streamed response from the LLM for a given prompt.
 *
 * This method is similar to llm.generateText(options) but returns the LLM response as a stream.
 * After calling this method, you can access the partial response (using the StreamedResponse.text property of the returned llm.StreamedResponse object) before the entire response has been generated.
 * You can also use an iterator to examine each token returned by the LLM.
 * @governance 100
 */
export const generateTextStreamed: GenerateTextStreamedFunction;

/** Alias for llm.generateTextStreamed(options). Uses the same parameters and can throw the same errors. */
export const chatStreamed: GenerateTextStreamedFunction;

/** Returns the number of free requests in the current month. */
export const getRemainingFreeUsage: GetRemainingFreeUsageFunction;

/** Returns the number of free embeddings requests in the current month. This method tracks free requests for embed API calls, such as llm.embed(options). To track free requests for non-embed API calls (such as llm.generateText(options)), use llm.getRemainingFreeUsage() instead. */
export const getRemainingFreeEmbedUsage: GetRemainingFreeUsageFunction;

interface IEmbedFunction {
    (options: IEmbedOptions): EmbedResponse;
    promise(options: IEmbedOptions): Promise<EmbedResponse>;
}

interface IEvaluatePromptFunction {
    (options: IEvaluatePromptOptions): Response;
    promise(options: IEvaluatePromptOptions): Promise<Response>;
}

interface IEvaluatePromptStreamedFunction {
    (options: IEvaluatePromptOptions): StreamedResponse;
    promise(options: IEvaluatePromptOptions): Promise<StreamedResponse>;
}

interface GenerateTextFunction {
    (options: IGenerateTextOptions | IGenerateTextToolResultsOptions): Response;
    promise(options: IGenerateTextOptions | IGenerateTextToolResultsOptions): Promise<Response>;
}

interface GenerateTextStreamedFunction {
    (options: IGenerateTextStreamedOptions | IGenerateTextStreamedToolResultsOptions): StreamedResponse;
    promise(options: IGenerateTextStreamedOptions | IGenerateTextStreamedToolResultsOptions): Promise<StreamedResponse>;
}

interface GetRemainingFreeUsageFunction {
    (): number;
    promise(): Promise<number>;
}

/** The embeddings response returned from the LLM. */
interface EmbedResponse {
    /** The embeddings returned from the LLM. */
    readonly embeddings: number[];
    /** The list of inputs used to generate the embeddings response. */
    readonly inputs: string[];
    /** The model used to generate the embeddings response. */
    readonly model: string;
}

interface IEmbedOptions {
    /** An array of inputs to get embeddings for. You can provide a maximum of 96 inputs in a single call. */
    inputs: string[] | readonly string[];
    /**
     * The number of dimensions of the returned embeddings array.
     *
     * You can use this parameter to limit the number of dimensions in the returned embeddings.
     * The embed model that's currently supported, Cohere Embed v4.0, returns embeddings with 1536 dimensions.
     * If you generated embeddings using previously supported models and stored these embeddings for later use,
     * you should regenerate those embeddings using the currently supported embed model with the additional supported dimensions.
     *
     * The supported range of values for this parameter is 1 - 1536. The default value is 1536.
     * @since 2025.2
     */
    dimensions?: number;
    /** The embed model family to use. Use values from llm.EmbedModelFamily to set this value. If not specified, the Cohere Embed model (cohere.embed-v4.0) is used. */
    embedModelFamily?: EmbedModelFamily | string;
    /** Configuration needed for unlimited usage through OCI Generative AI Service. Required only when accessing the LLM through an Oracle Cloud Account and the OCI Generative AI Service. SuiteApps installed to target accounts are prevented from using the free usage pool for N/llm and must use the OCI configuration. */
    ociConfig?: IOCIConfig;
    /** The amount of time to wait for a response from the LLM, in milliseconds. If not specified, the default value is 30,000. */
    timeout?: number;
    /** The truncation method to use when embeddings input exceeds 512 tokens. Use values from llm.Truncate to set this value. If not specified, no truncation method is used. */
    truncate?: Truncate | string;
}

interface IEvaluatePromptOptions {
    /** ID of the prompt to evaluate. */
    id: string | number;
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

interface IGenerateTextBaseOptions {
    /** Chat history to be taken into consideration. */
    chatHistory?: ChatMessage[];
    /**
     * A list of documents to provide additional context for the LLM to generate the response.
     * This parameter is supported only for Cohere models.
     */
    documents?: Document[];
    /** Specifies the LLM to use. Use llm.ModelFamily to set the value. If not specified, the Cohere Command A model (cohere.command-a-03-2025) is used. */
    modelFamily?: ModelFamily;
    /** Parameters of the model. For more information about the model parameters, refer to Offered Pretrained Foundational Models in Generative AI in the Oracle Cloud Infrastructure Documentation. */
    modelParameters?: IModelParameters;
    /**
     * Configuration needed for unlimited usage through OCI Generative AI Service.
     * Required only when accessing the LLM through an Oracle Cloud Account and the OCI Generative AI Service.
     * SuiteApps installed to target accounts are prevented from using the free usage pool for N/llm and must use the OCI configuration.
     */
    ociConfig?: IOCIConfig;
    /** Preamble override for the LLM. A preamble is the initial context or guiding message for an LLM. For more details about using a preamble, refer to Offered Pretrained Foundational Models in Generative AI in the Oracle Cloud Infrastructure Documentation. */
    preamble?: string;
    /**
     * Specifies the safety mode to use. Safety mode is available for Cohere models only.
     * Use values from the llm.SafetyMode enum to set the value of this parameter. If not specified, the llm.SafetyMode.STRICT mode is used by default.
     * @since 2025.1
     */
    safetyMode?: SafetyMode | string;
    /** Timeout in milliseconds, defaults to 30,000. */
    timeout?: number;
    /**
     * The tools that are available for the LLM to request. Create tools using llm.createTool(options).
     * When the LLM determines that running a tool may help its response, tool call requests are returned in the Response.toolCalls (or StreamedResponse.toolCalls) property.
     * @since 2025.2
     */
    tools?: Tool[];
}

interface IGenerateTextOptions extends IGenerateTextBaseOptions {
    /** Prompt for the LLM. Required if options.toolResults is not specified. */
    prompt: string;
    /**
     * A JSON schema specifying the format of the response.
     *
     * Use this parameter to direct the LLM to return its response in a structured JSON format.
     * You can provide an object that represents a valid JSON schema, and the response will contain keys and values as defined in your schema that are populated by the generated content.
     * You can then parse the response (Response.text) as JSON content.
     *
     * This parameter is supported for Cohere models only, and cannot be used with the documents, tools, or toolResults parameters (MUTUALLY_EXCLUSIVE_ARGUMENTS).
     * @since 2025.1
     */
    responseFormat?: object;
    /**
     * @deprecated As of 2025.1 this parameter is no longer included in the Help documentation for llm.generateText(options),
     * and the Meta Llama (vision-capable) model family is no longer listed in llm.ModelFamily.
     */
    image?: File;
}

/**
 * Options for a follow-up llm.generateText(options) call that provides tool results back to the LLM.
 * When toolResults is specified, any prompt provided is ignored — the LLM uses only the specified tool results (and chat history, if available) to generate a follow-up response.
 * @since 2025.2
 */
interface IGenerateTextToolResultsOptions extends IGenerateTextBaseOptions {
    /** Prompt for the LLM. Ignored when options.toolResults is specified. */
    prompt?: string;
    /**
     * The tool results to use to generate a follow-up response. Create tool results using llm.createToolResult(options).
     * When you specify a value for this parameter, any prompt you provide using the options.prompt parameter is ignored.
     */
    toolResults: ToolResult[];
}

interface IGenerateTextStreamedOptions extends IGenerateTextBaseOptions {
    /** Prompt for the LLM. Required if options.toolResults is not specified. */
    prompt: string;
}

/**
 * Options for a follow-up llm.generateTextStreamed(options) call that provides tool results back to the LLM.
 * When toolResults is specified, any prompt provided is ignored — the LLM uses only the specified tool results (and chat history, if available) to generate a follow-up response.
 * @since 2025.2
 */
interface IGenerateTextStreamedToolResultsOptions extends IGenerateTextBaseOptions {
    /** Prompt for the LLM. Ignored when options.toolResults is specified. */
    prompt?: string;
    /**
     * The tool results to use to generate a follow-up response. Create tool results using llm.createToolResult(options).
     * When you specify a value for this parameter, any prompt you provide using the options.prompt parameter is ignored.
     */
    toolResults: ToolResult[];
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

export interface IOCIConfig { // Also referenced in N/documentCapture
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

/** The large language model to be used to generate embeddings. Use this enum to set the value of the options.embedModelFamily parameter in llm.embed(options). */
declare enum EmbedModelFamily {
    /** Cohere Embed v4.0. This is the default when the options.embedModelFamily parameter is omitted. */
    COHERE_EMBED = 'cohere.embed-v4.0',
    /** Always uses the latest supported Cohere Embed model. */
    COHERE_EMBED_LATEST = 'cohere.embed-v4.0'
}

/** The large language model to be used. Use this enum to set the value of the options.modelFamily parameter in llm.generateText(options) and llm.generateTextStreamed(options). */
declare enum ModelFamily {
    /** Cohere Command A. Supports RAG (documents) and preambles. This is the default when the options.modelFamily parameter is omitted. */
    COHERE_COMMAND = 'cohere.command-a-03-2025',
    /** Always uses the latest supported Cohere Command model. Supports RAG (documents) and preambles. */
    COHERE_COMMAND_LATEST = 'cohere.command-a-03-2025',
    /** OpenAI gpt-oss 120B. Supports preambles; does not support RAG (documents). */
    GPT_OSS = 'openai.gpt-oss-120b',
    /** Always uses the latest supported OpenAI gpt-oss model. Supports preambles; does not support RAG (documents). */
    GPT_OSS_LATEST = 'openai.gpt-oss-120b'
}

/**
 * The safety mode to be used for LLM requests.
 *
 * Safety mode is available for Cohere models only and is designed to help filter and moderate content generated by the LLM.
 * When using strict mode or contextual mode, the LLM may refuse to provide certain responses that include sensitive, harmful, or illegal suggestions.
 *
 * Use this enum to set the value of the options.safetyMode parameter in llm.generateText(options) and llm.generateTextStreamed(options).
 * @since 2025.1
 */
declare enum SafetyMode {
    /** This mode offers a less restrictive approach than strict mode but still rejects harmful or illegal suggestions. This mode is suited for creative, entertainment, or academic purposes. */
    CONTEXTUAL = 'CONTEXTUAL',
    /** This mode aims to avoid sensitive topics entirely and is suited for corporate communications and customer service. This is the default mode when calling llm.generateText(options) or llm.generateTextStreamed(options). */
    STRICT = 'STRICT'
}

/** The data type for a tool parameter. Use this enum to set the value of the options.type parameter in llm.createToolParameter(options). @since 2025.2 */
declare enum ToolParameterType {
    ARRAY = 'ARRAY',
    BOOLEAN = 'BOOLEAN',
    FLOAT = 'FLOAT',
    INTEGER = 'INTEGER',
    OBJECT = 'OBJECT',
    STRING = 'STRING'
}

/** The truncation method to use when embeddings input exceeds 512 tokens. Use this enum to set the value of the options.truncate parameter in llm.embed(options). */
declare enum Truncate {
    END = 'END',
    NONE = 'NONE',
    START = 'START'
}
