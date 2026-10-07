/**
 * The N/llm module supports generative artificial intelligence (AI) capabilities in SuiteScript.
 * You can use this module to send requests to the large language models (LLMs) supported by NetSuite and to receive LLM responses to use in your scripts.
 *
 * Methods in this module that send requests to an LLM consume NetSuite AI Units.
 * Use llm.getRemainingUsage() to check the number of AI Units remaining.
 * For more information, see NetSuite AI Units and NetSuite Features and AI Units FAQ in the NetSuite Help Center.
 *
 * Supported script types: Server scripts (SuiteScript 2.1).
 */

import type {File} from './file';

/**
 * The chat message object returned by the llm.createChatMessage(options) method.
 * @since 2024.1
 */
interface ChatMessage {
    /**
     * Text of the chat message. This text can be either the prompt sent by the script or the response returned by the LLM.
     * @since 2024.1
     */
    text: string;
    /**
     * The author (role) of the chat message.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2024.1
     */
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
 * @since 2025.1
 */
interface Citation {
    /**
     * The IDs of the documents where the cited text is located.
     * @since 2025.1
     */
    documentIds: string[];
    /**
     * The ending position of the cited text.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly end: number;
    /**
     * The starting position of the cited text.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly start: number;
    /**
     * The cited text from the documents.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly text: string;
}

/**
 * The response returned from LLM. Use the llm.generateText(options) or the llm.generateText.promise(options) method to retrieve a response from the LLM.
 * @since 2024.1
 */
interface Response {
    /**
     * List of chat messages.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2024.1
     */
    readonly chatHistory: ChatMessage[];
    /**
     * List of citations used to generate the response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly citations: Citation[];
    /**
     * List of documents used to generate the response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly documents: Document[];
    /**
     * Model used to produce the LLM response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2024.1
     */
    readonly model: string;
    /**
     * Text returned by the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2024.1
     */
    readonly text: string;
    /**
     * Tool calls requested by the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly toolCalls: ToolCall[];
    /**
     * Token usage for a request to the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly usage: Usage;
}

/**
 * The streamed response returned from the LLM.
 * Use llm.generateTextStreamed(options) or llm.evaluatePromptStreamed(options) (or their promise versions) to retrieve a streamed response.
 *
 * You can access the partial response (using the StreamedResponse.text property) before the entire response has been generated, as well as StreamedResponse.model.
 * Other properties (such as StreamedResponse.documents and StreamedResponse.citations) are accessible only after the entire response has been generated.
 * @since 2025.1
 */
interface StreamedResponse {
    /**
     * List of chat messages.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly chatHistory: ChatMessage[];
    /**
     * List of citations used to generate the streamed response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly citations: Citation[];
    /**
     * List of documents used to generate the streamed response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly documents: Document[];
    /**
     * Model used to produce the streamed response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly model: string;
    /**
     * Text returned by the LLM. While streaming, this contains the partial response received so far.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly text: string;
    /**
     * Tool calls requested by the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
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
    /**
     * The description of the tool. Helps the LLM understand when to request the tool.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly description: string;
    /**
     * The name of the tool. Used when the LLM refers to this tool in tool call requests.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly name: string;
    /**
     * The parameters of the tool.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
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
    /**
     * The name of the requested tool.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly name: string;
    /**
     * The parameters of the requested tool as key-value pairs for each input parameter required by the tool, as specified in the tool definition.
     *
     * Note: The N/llm Module Members table lists this property's type as llm.ToolParameter[], but the llm.ToolCall object description and the
     * examples in "Tooling in the N/llm Module" show a plain object of key-value pairs (e.g. TOOL_HANDLERS[call.name](call.parameters) where
     * the handler reads options.userName).
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly parameters: Record<string, any>;
}

/**
 * A parameter for a tool. Created using llm.createToolParameter(options).
 *
 * Tool parameters define the individual input values that the LLM must provide when requesting a tool call.
 * @since 2025.2
 */
interface ToolParameter {
    /**
     * The description of the tool parameter. Helps the LLM prompt for and fill in the value correctly.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly description: string;
    /**
     * The name of the tool parameter. Used when the LLM refers to this specific input in tool call requests.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly name: string;
    /**
     * The type of the tool parameter. Values are from the llm.ToolParameterType enum.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
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
    /**
     * The originating tool call request from the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly call: ToolCall;
    /**
     * The outputs from running the tool specified in the tool call request.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.2
     */
    readonly outputs: object[];
}

/**
 * Token usage for a request to the LLM. Returned through the Response.usage property.
 * @since 2025.1
 */
interface Usage {
    /**
     * The number of tokens in the response from the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly completionTokens: number;
    /**
     * The number of tokens in the request to the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly promptTokens: number;
    /**
     * The total number of tokens for the entire request to the LLM.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly totalTokens: number;
}

/**
 * Creates a chat message based on a specified role and text.
 * Chat messages can be used in the chatHistory parameter of the llm.generateText(options) method.
 * Supported roles are defined by the llm.ChatRole enum.
 * @governance none
 * @since 2024.1
 */
export function createChatMessage(options: {
    /** Author of the message (as a role). Use llm.ChatRole to set the value. */
    role: ChatRole | string,
    /** Text of the chat message. */
    text: string,
}): ChatMessage;

/**
 * Creates a document with the specified ID and content.
 *
 * A document represents source content that you can provide as additional context to the LLM when you call llm.generateText(options) or llm.generateText.promise(options).
 * The LLM uses information in the provided documents to augment its response using retrieval-augmented generation (RAG).
 * For more information about RAG, see What Is Retrieval-Augmented Generation (RAG)?
 *
 * You do not need to use this method to create a document before providing the document to llm.generateText(options) or llm.generateText.promise(options).
 * You can also provide a plain JavaScript object that uses the id and data properties.
 * @governance none
 * @since 2025.1
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
 *
 * Embeddings include the semantic information of the original data; protect, store, log, and delete them according to the same rules as the original data.
 *
 * This method consumes AI Units.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.inputs is not provided.
 * @throws {SuiteScriptError} INVALID_MODEL_FAMILY_VALUE if options.embedModelFamily is not included in the llm.EmbedModelFamily enum.
 * @throws {SuiteScriptError} MAXIMUM_PARALLEL_REQUESTS_LIMIT_EXCEEDED if the number of parallel requests to the LLM is greater than 5.
 * @throws {SuiteScriptError} NO_INPUTS_TO_EMBED if options.inputs has a length of 0.
 * @throws {SuiteScriptError} CAN_EMBED_1_INPUTS_AT_MAXIMUM if options.inputs has a length greater than 96.
 * @throws {SuiteScriptError} INVALID_TRUNCATION_METHOD if options.truncate is not included in the llm.Truncate enum.
 * @throws {SuiteScriptError} UNSUPPORTED_NUMBER_OF_TOKENS if too many tokens were provided as embeddings input.
 * @governance 50 units
 * @since 2025.1
 */
export const embed: IEmbedFunction;

/**
 * Takes the ID of an existing prompt and values for variables used in the prompt and returns the response from the LLM.
 *
 * You can use this method to evaluate a prompt that is available in Prompt Studio by providing values for any variables that the prompt uses.
 * The resulting prompt is sent to the LLM, and this method returns the LLM response, similar to the llm.generateText(options) method.
 * For more information about Prompt Studio, see Prompt Studio.
 *
 * This method consumes AI Units.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.id is missing.
 * @throws {SuiteScriptError} INVALID_ID_PREFIX if the prefix of options.id is not custprompt.
 * @throws {SuiteScriptError} MAXIMUM_PARALLEL_REQUESTS_LIMIT_EXCEEDED if the number of parallel requests to the LLM is greater than 5.
 * @throws {SuiteScriptError} TEMPLATE_PROCESSING_EXCEPTION if the template for the prompt contains errors and cannot be processed (for example, required variables are missing from options.variables).
 * @governance 100 units
 * @since 2025.1
 */
export const evaluatePrompt: IEvaluatePromptFunction;

/**
 * Alias for llm.evaluatePrompt(options). Uses the same parameters and can throw the same errors.
 * @governance 100 units
 * @since 2025.1
 */
export const executePrompt: IEvaluatePromptFunction;

/**
 * Takes the ID of an existing prompt and values for variables used in the prompt and returns the streamed response from the LLM.
 * This method consumes AI Units.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.id is missing.
 * @throws {SuiteScriptError} INVALID_ID_PREFIX if the prefix of options.id is not custprompt.
 * @throws {SuiteScriptError} MAXIMUM_PARALLEL_REQUESTS_LIMIT_EXCEEDED if the number of parallel requests to the LLM is greater than 5.
 * @throws {SuiteScriptError} TEMPLATE_PROCESSING_EXCEPTION if the template for the prompt contains errors and cannot be processed (for example, required variables are missing from options.variables).
 * @governance 100 units
 * @since 2025.1
 */
export const evaluatePromptStreamed: IEvaluatePromptStreamedFunction;

/**
 * Alias for llm.evaluatePromptStreamed(options). Uses the same parameters and can throw the same errors.
 * @governance 100 units
 * @since 2025.1
 */
export const executePromptStreamed: IEvaluatePromptStreamedFunction;

/**
 * Takes a prompt and parameters for the LLM and returns the response from the LLM.
 * This method consumes AI Units.
 * @throws {SuiteScriptError} COHERE_VISION_DOES_NOT_SUPPORT_TOOLING if options.tools or options.toolResults is used with the COHERE_COMMAND_VISION or COHERE_COMMAND_VISION_LATEST model.
 * @throws {SuiteScriptError} DOCUMENT_IDS_MUST_BE_UNIQUE if documents provided using options.documents have duplicate IDs.
 * @throws {SuiteScriptError} DUPLICATE_PARAMETER_NAME if the options object includes duplicate parameter names.
 * @throws {SuiteScriptError} DUPLICATE_TOOL_NAME if options.tools includes duplicate tool names.
 * @throws {SuiteScriptError} DUPLICATE_TOOL_RESULT if options.toolResults includes duplicate tool results.
 * @throws {SuiteScriptError} INAPPROPRIATE_CONTENT_DETECTED if the response from the LLM included sensitive or inappropriate content that is restricted by the safety mode.
 * @throws {SuiteScriptError} INVALID_FREQUENCY_PENALTY_VALUE if options.modelParameters.frequencyPenalty is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_IMAGE if options.image references an invalid image.
 * @throws {SuiteScriptError} INVALID_MAX_TOKENS_VALUE if options.modelParameters.maxTokens is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_MODEL_FAMILY_VALUE if options.modelFamily is not set to a valid option.
 * @throws {SuiteScriptError} INVALID_PRESENCE_PENALTY_VALUE if options.modelParameters.presencePenalty is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_REASONING_EFFORT if options.modelParameters.reasoningEffort is not a valid llm.ReasoningEffort value.
 * @throws {SuiteScriptError} INVALID_TEMPERATURE_VALUE if options.modelParameters.temperature is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_TOP_K_VALUE if options.modelParameters.topK is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_TOP_P_VALUE if options.modelParameters.topP is incorrect for the model.
 * @throws {SuiteScriptError} MAXIMUM_PARALLEL_REQUESTS_LIMIT_EXCEEDED if the number of parallel requests to the LLM is greater than 5.
 * @throws {SuiteScriptError} MODEL_1_DOES_NOT_ACCEPT_DOCUMENTS if options.documents is provided but the model does not support RAG.
 * @throws {SuiteScriptError} MODEL_1_DOES_NOT_ACCEPT_IMAGE if options.image is provided but the model does not support image processing.
 * @throws {SuiteScriptError} MODEL_1_DOES_NOT_ACCEPT_SAFETY_MODE if options.safetyMode is provided but the model does not support safety mode.
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both presencePenalty and frequencyPenalty are used with COHERE_COMMAND or COHERE_COMMAND_LATEST, or if options.responseFormat is used with options.documents, options.tools, or options.toolResults.
 * @throws {SuiteScriptError} REASONING_EFFORT_PARAMETER_NOT_AVAILABLE if options.modelParameters.reasoningEffort is provided but the model does not support reasoning effort.
 * @throws {SuiteScriptError} RESPONSE_FORMAT_HAS_INVALID_JSON_SCHEMA if options.responseFormat does not represent a valid JSON schema.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.prompt is missing.
 * @throws {SuiteScriptError} UNRECOGNIZED_MODEL_PARAMETERS if one or more unrecognized model parameters are used.
 * @throws {SuiteScriptError} UNSUPPORTED_SAFETY_MODE if options.safetyMode is not a valid llm.SafetyMode value.
 * @governance 100 units
 * @since 2024.1
 */
export const generateText: GenerateTextFunction;

/**
 * Alias for llm.generateText(options). Uses the same parameters and can throw the same errors.
 * @governance 100 units
 * @since 2024.1
 */
export const chat: GenerateTextFunction;

/**
 * Returns the streamed response from the LLM for a given prompt.
 *
 * This method is similar to llm.generateText(options) but returns the LLM response as a stream.
 * After calling this method, you can access the partial response (using the StreamedResponse.text property of the returned llm.StreamedResponse object) before the entire response has been generated.
 * You can also use an iterator to examine each token returned by the LLM.
 *
 * This method consumes AI Units.
 * @throws {SuiteScriptError} COHERE_VISION_DOES_NOT_SUPPORT_TOOLING if options.tools or options.toolResults is used with the COHERE_COMMAND_VISION or COHERE_COMMAND_VISION_LATEST model.
 * @throws {SuiteScriptError} DOCUMENT_IDS_MUST_BE_UNIQUE if documents provided using options.documents have duplicate IDs.
 * @throws {SuiteScriptError} DUPLICATE_PARAMETER_NAME if the options object includes duplicate parameter names.
 * @throws {SuiteScriptError} DUPLICATE_TOOL_NAME if options.tools includes duplicate tool names.
 * @throws {SuiteScriptError} DUPLICATE_TOOL_RESULT if options.toolResults includes duplicate tool results.
 * @throws {SuiteScriptError} INAPPROPRIATE_CONTENT_DETECTED if the response from the LLM included sensitive or inappropriate content that is restricted by the safety mode.
 * @throws {SuiteScriptError} INVALID_FREQUENCY_PENALTY_VALUE if options.modelParameters.frequencyPenalty is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_IMAGE if options.image references an invalid image.
 * @throws {SuiteScriptError} INVALID_MAX_TOKENS_VALUE if options.modelParameters.maxTokens is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_MODEL_FAMILY_VALUE if options.modelFamily is not set to a valid option.
 * @throws {SuiteScriptError} INVALID_PRESENCE_PENALTY_VALUE if options.modelParameters.presencePenalty is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_REASONING_EFFORT if options.modelParameters.reasoningEffort is not a valid llm.ReasoningEffort value.
 * @throws {SuiteScriptError} INVALID_TEMPERATURE_VALUE if options.modelParameters.temperature is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_TOP_K_VALUE if options.modelParameters.topK is incorrect for the model.
 * @throws {SuiteScriptError} INVALID_TOP_P_VALUE if options.modelParameters.topP is incorrect for the model.
 * @throws {SuiteScriptError} MAXIMUM_PARALLEL_REQUESTS_LIMIT_EXCEEDED if the number of parallel requests to the LLM is greater than 5.
 * @throws {SuiteScriptError} MODEL_1_DOES_NOT_ACCEPT_DOCUMENTS if options.documents is provided but the model does not support RAG.
 * @throws {SuiteScriptError} MODEL_1_DOES_NOT_ACCEPT_IMAGE if options.image is provided but the model does not support image processing.
 * @throws {SuiteScriptError} MODEL_1_DOES_NOT_ACCEPT_SAFETY_MODE if options.safetyMode is provided but the model does not support safety mode.
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both presencePenalty and frequencyPenalty are used with COHERE_COMMAND or COHERE_COMMAND_LATEST, or if options.responseFormat is used with options.documents, options.tools, or options.toolResults.
 * @throws {SuiteScriptError} REASONING_EFFORT_PARAMETER_NOT_AVAILABLE if options.modelParameters.reasoningEffort is provided but the model does not support reasoning effort.
 * @throws {SuiteScriptError} RESPONSE_FORMAT_HAS_INVALID_JSON_SCHEMA if options.responseFormat does not represent a valid JSON schema.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.prompt is missing.
 * @throws {SuiteScriptError} UNRECOGNIZED_MODEL_PARAMETERS if one or more unrecognized model parameters are used.
 * @throws {SuiteScriptError} UNSUPPORTED_SAFETY_MODE if options.safetyMode is not a valid llm.SafetyMode value.
 * @governance 100 units
 * @since 2025.1
 */
export const generateTextStreamed: GenerateTextStreamedFunction;

/**
 * Alias for llm.generateTextStreamed(options). Uses the same parameters and can throw the same errors.
 * @governance 100 units
 * @since 2025.1
 */
export const chatStreamed: GenerateTextStreamedFunction;

/**
 * Returns the number of AI Units remaining for regular LLM requests (such as llm.generateText(options)) and embed requests (such as llm.embed(options)).
 * For more information, see NetSuite AI Units and NetSuite Features and AI Units FAQ in the NetSuite Help Center.
 * @governance none
 * @since 2026.1
 */
export const getRemainingUsage: GetRemainingUsageFunction;

/**
 * Returns the number of free requests in the current month.
 * @governance none
 * @since 2024.1
 * @deprecated As of 2026.2, use llm.getRemainingUsage() instead. This method remains available for compatibility and calls llm.getRemainingUsage().
 */
export const getRemainingFreeUsage: GetRemainingFreeUsageFunction;

/**
 * Returns the number of free embeddings requests in the current month.
 * @governance none
 * @since 2025.1
 * @deprecated As of 2026.2, use llm.getRemainingUsage() instead. Embed usage is no longer tracked separately.
 * This method remains available for compatibility and calls llm.getRemainingUsage().
 */
export const getRemainingFreeEmbedUsage: GetRemainingFreeEmbedUsageFunction;

interface IEmbedFunction {
    (options: IEmbedOptions): EmbedResponse;
    /**
     * Asynchronously returns the embeddings from the LLM for a given input. The parameters and errors thrown are the same as those for llm.embed(options).
     * @governance 50 units
     * @since 2025.1
     */
    promise(options: IEmbedOptions): Promise<EmbedResponse>;
}

interface IEvaluatePromptFunction {
    (options: IEvaluatePromptOptions): Response;
    /**
     * Asynchronously returns the response from the LLM for an existing prompt. The parameters and errors thrown are the same as those for llm.evaluatePrompt(options).
     * @governance 100 units
     * @since 2025.1
     */
    promise(options: IEvaluatePromptOptions): Promise<Response>;
}

interface IEvaluatePromptStreamedFunction {
    (options: IEvaluatePromptOptions): StreamedResponse;
    /**
     * Asynchronously returns the streamed response from the LLM for an existing prompt. The parameters and errors thrown are the same as those for llm.evaluatePrompt(options).
     * @governance 100 units
     * @since 2025.1
     */
    promise(options: IEvaluatePromptOptions): Promise<StreamedResponse>;
}

interface GenerateTextFunction {
    (options: IGenerateTextOptions | IGenerateTextToolResultsOptions): Response;
    /**
     * Asynchronously returns the response from the LLM. The parameters and errors thrown are the same as those for llm.generateText(options).
     * @governance 100 units
     * @since 2024.1
     */
    promise(options: IGenerateTextOptions | IGenerateTextToolResultsOptions): Promise<Response>;
}

interface GenerateTextStreamedFunction {
    (options: IGenerateTextStreamedOptions | IGenerateTextStreamedToolResultsOptions): StreamedResponse;
    /**
     * Asynchronously returns the streamed response from the LLM. The parameters and errors thrown are the same as those for llm.generateTextStreamed(options).
     * @governance 100 units
     * @since 2025.1
     */
    promise(options: IGenerateTextStreamedOptions | IGenerateTextStreamedToolResultsOptions): Promise<StreamedResponse>;
}

interface GetRemainingUsageFunction {
    (): number;
    /**
     * Asynchronously returns the number of NetSuite AI Units remaining.
     * @governance none
     * @since 2026.1
     */
    promise(): Promise<number>;
}

/** @deprecated As of 2026.2, use llm.getRemainingUsage() and llm.getRemainingUsage.promise() instead. */
interface GetRemainingFreeUsageFunction {
    /** @deprecated As of 2026.2, use llm.getRemainingUsage() instead. Remains available for compatibility and calls llm.getRemainingUsage(). */
    (): number;
    /**
     * @governance none
     * @since 2024.1
     * @deprecated As of 2026.2, use llm.getRemainingUsage.promise() instead. Remains available for compatibility and calls llm.getRemainingUsage.promise().
     */
    promise(): Promise<number>;
}

/** @deprecated As of 2026.2, use llm.getRemainingUsage() and llm.getRemainingUsage.promise() instead. */
interface GetRemainingFreeEmbedUsageFunction {
    /** @deprecated As of 2026.2, use llm.getRemainingUsage() instead. Remains available for compatibility and calls llm.getRemainingUsage(). */
    (): number;
    /**
     * @governance none
     * @since 2025.1
     * @deprecated As of 2026.2, use llm.getRemainingUsage.promise() instead. Remains available for compatibility and calls llm.getRemainingUsage.promise().
     */
    promise(): Promise<number>;
}

/**
 * The embeddings response returned from the LLM.
 * @since 2025.1
 */
interface EmbedResponse {
    /**
     * The embeddings returned from the LLM.
     * Note: Oracle's N/llm members table types this property as number[], but the EmbedResponse.embeddings page types it as number[][]; typed as number[] here.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly embeddings: number[];
    /**
     * The list of inputs used to generate the embeddings response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly inputs: string[];
    /**
     * The model used to generate the embeddings response.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
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
    /**
     * This object is no longer supported. Any values specified in this object are ignored.
     * @deprecated As of 2026.2, the ociConfig object is no longer supported for SuiteScript AI APIs. Providing it doesn't generate an error, but the values are ignored.
     */
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
     * This object is no longer supported. Any values specified in this object are ignored.
     * @deprecated As of 2026.2, the ociConfig object is no longer supported for SuiteScript AI APIs. Providing it doesn't generate an error, but the values are ignored.
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
     * This object is no longer supported. Any values specified in this object are ignored.
     * @deprecated As of 2026.2, the ociConfig object is no longer supported for SuiteScript AI APIs. Providing it doesn't generate an error, but the values are ignored.
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
     * Cannot be used with the documents, tools, or toolResults parameters (MUTUALLY_EXCLUSIVE_ARGUMENTS).
     * @since 2025.1
     */
    responseFormat?: object;
    /**
     * An image to query. You can send an image (as a file.File object) to the LLM and ask questions about the image.
     * For example, you can ask for advanced image captions, a detailed description of the image, or information about charts and graphs in the image.
     *
     * Image processing is available only when using the Cohere Command A Vision model (cohere.command-a-vision), so set options.modelFamily to llm.ModelFamily.COHERE_COMMAND_VISION.
     * This parameter was previously supported by the Meta Llama model family, which is no longer listed in llm.ModelFamily.
     * @since 2026.1
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
    /**
     * A JSON schema specifying the format of the response.
     * You can provide an object that represents a valid JSON schema, and the response will contain keys and values as defined in your schema that are populated by the generated content.
     *
     * Cannot be used with the documents, tools, or toolResults parameters (MUTUALLY_EXCLUSIVE_ARGUMENTS).
     * Note: Oracle lists this parameter as Since 2025.1 for llm.generateText(options) but Since 2026.1 for llm.generateTextStreamed(options).
     * @since 2026.1
     */
    responseFormat?: object;
    /**
     * An image to query. You can send an image (as a file.File object) to the LLM and ask questions about the image.
     * Image processing is available only when using the Cohere Command A Vision model (cohere.command-a-vision), so set options.modelFamily to llm.ModelFamily.COHERE_COMMAND_VISION.
     * @since 2026.1
     */
    image?: File;
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

/**
 * A document to be used as source content when calling the LLM. Created using llm.createDocument(options).
 * @since 2025.1
 */
interface Document {
    /**
     * The content of the document.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
    readonly data: string;
    /**
     * The ID of the document.
     * @throws {SuiteScriptError} READ_ONLY if setting the property is attempted.
     * @since 2025.1
     */
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
     * The reasoning effort to use for LLM requests. Reasoning effort controls how much internal reasoning a model uses before providing a response.
     * Higher values can improve performance on complex tasks but may increase token usage and response time.
     * Use values from the llm.ReasoningEffort enum. If not specified, llm.ReasoningEffort.MEDIUM is used.
     * Supported only when using the GPT OSS (openai.gpt-oss-120b) model.
     * @since 2026.2
     */
    reasoningEffort?: ReasoningEffort | string;
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

/**
 * OCI configuration details.
 * @deprecated As of 2026.2, the ociConfig object is no longer supported for SuiteScript AI APIs (N/llm and N/documentCapture). Any values specified in this object are ignored.
 */
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

/**
 * The author (role) of a chat message. Use this enum to set the value of the options.role parameter in llm.createChatMessage(options).
 * @since 2024.1
 */
declare enum ChatRole {
    /** Identifies the author of the chat message (prompt) sent to the large language model. */
    USER = "USER",
    /** Identifies the author of the chat message (response text) received from the large language model. */
    CHATBOT = "CHATBOT"
}

/**
 * The large language model to be used to generate embeddings. Use this enum to set the value of the options.embedModelFamily parameter in llm.embed(options).
 * @since 2025.1
 */
declare enum EmbedModelFamily {
    /** Cohere Embed v4.0. This is the default when the options.embedModelFamily parameter is omitted. */
    COHERE_EMBED = 'cohere.embed-v4.0',
    /** Always uses the latest supported Cohere Embed model. */
    COHERE_EMBED_LATEST = 'cohere.embed-v4.0'
}

/**
 * The large language model to be used. Use this enum to set the value of the options.modelFamily parameter in llm.generateText(options) and llm.generateTextStreamed(options).
 * @since 2024.2
 */
declare enum ModelFamily {
    /** Cohere Command A. Supports RAG (documents) and preambles. This is the default when the options.modelFamily parameter is omitted. */
    COHERE_COMMAND = 'cohere.command-a-03-2025',
    /** Always uses the latest supported Cohere Command model. Supports RAG (documents) and preambles. */
    COHERE_COMMAND_LATEST = 'cohere.command-a-03-2025',
    /**
     * Cohere Command A Vision. Required when providing an image using the options.image parameter.
     * Note: Oracle's llm.ModelFamily page gives no Since value for individual values; the options.image parameter that requires this model is Since 2026.1.
     */
    COHERE_COMMAND_VISION = 'cohere.command-a-vision',
    /**
     * Always uses the latest supported Cohere Command Vision model. Required when providing an image using the options.image parameter.
     * Note: Oracle's llm.ModelFamily page gives no Since value for individual values; the options.image parameter that requires this model is Since 2026.1.
     */
    COHERE_COMMAND_VISION_LATEST = 'cohere.command-a-vision',
    /** OpenAI gpt-oss 120B. Supports preambles; does not support RAG (documents). */
    GPT_OSS = 'openai.gpt-oss-120b',
    /** Always uses the latest supported OpenAI gpt-oss model. Supports preambles; does not support RAG (documents). */
    GPT_OSS_LATEST = 'openai.gpt-oss-120b'
}

/**
 * The reasoning effort to use for LLM requests. Reasoning effort is available only for GPT OSS models.
 * Choose the lowest value that meets your response quality requirements.
 *
 * Use this enum to set the value of the options.modelParameters.reasoningEffort parameter in llm.generateText(options) and llm.generateTextStreamed(options).
 * @since 2026.2
 */
declare enum ReasoningEffort {
    /** Uses minimal reasoning to prioritize faster responses and lower token use. Suitable for straightforward tasks and time-sensitive workflows. */
    LOW = 'LOW',
    /** Provides a balanced level of reasoning, quality, timeliness, and token use. This is the default value for GPT OSS models. */
    MEDIUM = 'MEDIUM',
    /** Uses more thorough reasoning for complex problems where quality is more important than response time. */
    HIGH = 'HIGH'
}

/**
 * The safety mode to be used for LLM requests.
 *
 * Safety mode is available for Cohere models only and is designed to help filter and moderate content generated by the LLM.
 * When using strict mode or contextual mode, the LLM may refuse to provide certain responses that include sensitive, harmful, or illegal suggestions.
 *
 * Use this enum to set the value of the options.safetyMode parameter in llm.generateText(options) and llm.generateTextStreamed(options).
 * Note: The INAPPROPRIATE_CONTENT_DETECTED error description mentions llm.SafetyMode.OFF, but the llm.SafetyMode page lists only CONTEXTUAL and STRICT.
 * @since 2025.1
 */
declare enum SafetyMode {
    /** This mode offers a less restrictive approach than strict mode but still rejects harmful or illegal suggestions. This mode is suited for creative, entertainment, or academic purposes. */
    CONTEXTUAL = 'CONTEXTUAL',
    /** This mode aims to avoid sensitive topics entirely and is suited for corporate communications and customer service. This is the default mode when calling llm.generateText(options) or llm.generateTextStreamed(options). */
    STRICT = 'STRICT'
}

/**
 * The data type for a tool parameter. Use this enum to set the value of the options.type parameter in llm.createToolParameter(options).
 * @since 2025.2
 */
declare enum ToolParameterType {
    ARRAY = 'ARRAY',
    BOOLEAN = 'BOOLEAN',
    FLOAT = 'FLOAT',
    INTEGER = 'INTEGER',
    OBJECT = 'OBJECT',
    STRING = 'STRING'
}

/**
 * The truncation method to use when embeddings input exceeds 512 tokens. Use this enum to set the value of the options.truncate parameter in llm.embed(options).
 * @since 2025.1
 */
declare enum Truncate {
    /** Truncates the embeddings input from the end of the input string. */
    END = 'END',
    /** Doesn't truncate the embeddings input. */
    NONE = 'NONE',
    /** Truncates the embeddings input from the start of the input string. */
    START = 'START'
}
