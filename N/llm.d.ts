/**
 * The N/llm module supports generative artificial intelligence (AI) capabilities in SuiteScript.
 * You can use this module to send requests to the large language models (LLMs) supported by NetSuite and to receive LLM responses to use in your scripts.
 */

/** The chat message object returned by the llm.createChatMessage(options) method. */
interface ChatMessage {
    text: string;
    readonly role: ChatRole;
}

/** The response returned from LLM. Use the llm.generateText(options) or the llm.generateText.promise(options) method to retrieve a response from the LLM. */
interface Response {
    readonly text: string;
    readonly model: string;
    readonly chatHistory: ChatMessage[];
}

export function createChatMessage(options: { role: string, text: string }): ChatMessage;

export const generateText: GenerateTextFunction;

/** Returns the number of free requests in the current month. */
export const getRemainingFreeUsage: GetRemainingFreeUsageFunction;

interface GenerateTextFunction {
    (options: IGenerateTextOptions): Response;
    promise(options: IGenerateTextOptions): Response;
}

interface GetRemainingFreeUsageFunction {
    (): number;
    promise(): number;
}

interface IGenerateTextOptions {
    /** Prompt for the LLM. */
    prompt: string;
    /** Chat history to be taken into consideration. */
    chatHistory?: ChatMessage[];
    /** Specifies the LLM to use. Use llm.ModelFamily to set the value. If not specified, the Cohere Command R LLM is used. */
    modelFamily?: ModelFamily;
    modelParameters?: IModelParameters;
    /**
     * Configuration needed for unlimited usage through OCI Generative AI Service.
     * Required only when accessing the LLM through an Oracle Cloud Account and the OCI Generative AI Service.
     * SuiteApps installed to target accounts are prevented from using the free usage pool for N/llm and must use the OCI configuration.
     */
    ociConfig?: IOCIConfig;
    preamble?: string;
    timeout?: number;
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

/** The large language model to be used. */
declare enum ModelFamily {
    /** Always uses the latest supported Cohere model. Cohere Command-R is the default when the options.modelFamily parameter is omitted. */
    COHERE_COMMAND = 'cohere.command-r-16k',
    /** Always uses the latest supported Meta Llama model. */
    META_LLAMA = 'meta.llama-3.1-70b-instruct'
}
