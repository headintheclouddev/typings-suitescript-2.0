import type {Encoding} from './encode';
import type {ClientResponse, Method} from './http'
import type {HashAlg, SecretKey} from './crypto';

interface CreateSecretKeyOptions {
    /** Specifies the encoding for the SecureKey. */
    encoding?: Encoding;
    /** A GUID used to generate a secret key. The GUID can resolve to either data or metadata. Required if secret is not specified */
    guid?: string;
    /**
     * The script ID of the secret used for authentication. This parameter is not required if you use the options.guid parameter. You cannot use both the options.guid parameter and secret parameter in combination.
     * @since 2021.1
     */
    secret?: string;
}

interface CreateSecureStringOptions {
    /** The string to convert to a secure string. */
    input: string;
    /** Identifies the encoding that the input string uses. The default value is UTF_8. */
    inputEncoding?: Encoding;
}

interface AppendStringOptions {
    /** The string to append. */
    input: string;
    /**
     * The encoding of the string that is being appended.
     * The default value is https.Encoding.UTF_8.
     * Note: This parameter is deprecated; it is recommended to use this method only for appending a string (UTF-8) content to a SecureString.
     */
    inputEncoding?: Encoding;
    /** Keeps the appended string in its original encoding. Set this value to true to prevent unexpected content re-encoding. The default value is false. */
    keepEncoding?: boolean;
}

interface AppendSecureStringOptions {
    /** The https.SecureString to append. */
    secureString: SecureString;
    /** Keeps the appended string in its original encoding. Set this value to true to prevent unexpected content re-encoding. The default value is false. */
    keepEncoding?: boolean;
}

interface ConvertEncodingOptions {
    /** The encoding to be used to decode the current content of the SecureString. */
    fromEncoding: Encoding;
    /** The encoding to apply to the returned string. */
    toEncoding: Encoding;
}

interface HashOptions {
    /** The hash algorithm. Set the value using the crypto.Hash enum. */
    algorithm: HashAlg;
    /** Encoding used to convert/decode the current string content into binary data for hashing. Use values from the https.Encoding enum. */
    contentEncoding?: Encoding;
    /** Encoding used encode the binary result as a string. Use values from the https.Encoding enum. */
    resultEncoding?: Encoding;
}

interface HmacOptions {
    /** The hash algorithm. Set by the crypto.Hash enum. */
    algorithm: HashAlg;
    /** A key returned from https.createSecureKey(options). */
    key: SecretKey;
    /** Encoding used to convert/decode the current string content into binary data for hmac processing. */
    contentEncoding?: Encoding;
    /** Encoding used encode the binary result as a string. Use values from the https.Encoding enum. */
    resultEncoding?: Encoding;
}

interface HttpsCreateSecretKeyFunction {
    (options: CreateSecretKeyOptions): SecretKey;
    promise(options: CreateSecretKeyOptions): Promise<SecretKey>;
}

interface HttpsCreateSecureStringFunction {
    (options: CreateSecureStringOptions): SecureString;
    promise(options: CreateSecureStringOptions): Promise<SecureString>;
}

export interface RequestRestletOptions {
    /** The body content to send in the HTTPS request. Only the PUT, POST, and PATCH https.Method values support this parameter; all other methods ignore it. */
    body?: string | Object,
    /** The script ID of the script deployment record. */
    deploymentId: string,
    /** The internal ID or script ID of the script record. Specify internal ID as a number. Specify script ID as a string. */
    scriptId: string,
    /** The HTTPS headers. */
    headers?: Object,
    /**
     * The HTTPS method (DELETE, GET, HEAD, POST, PUT).
     * The default value is GET if options.body is not specified, and POST if options.body is specified.
     */
    method?: Method | `${Method}`;
    /** The parameters to be appended to the target URL as a query string. */
    urlParams?: Object
}

interface RequestRestletFunction {
    (options: RequestRestletOptions): ClientResponse
    /**
     * @governance 10 units
     * @since 2020.2
     */
    promise(options: RequestRestletOptions): Promise<ClientResponse>;
}

export interface RequestSuiteletOptions extends RequestRestletOptions {
    /** Specifies whether to perform the request as an unauthenticated user; this case uses the Online Form User role. */
    external?: boolean,
}

/**
 * Sends an HTTPS request to a Suitelet and returns the response.
 *
 * Use this method to perform an outbound HTTPS request in an anonymous client-side context.
 * You can do this by performing the HTTPS request inside a Suitelet that is available without login, then calling the Suitelet inside your client script using the https.requestSuitelet(options) method.
 *
 * Currently, this method is supported only with the options.external parameter set to true.
 */
interface RequestSuiteletFunction {
    (options: RequestSuiteletOptions): ClientResponse
    /**
     * @governance 10 units
     * @since 2023.1
     */
    promise(options: RequestSuiteletOptions): Promise<ClientResponse>;
}

interface RequestSuiteTalkRestOptions {
    /** The PUT/POST data. This is ignored if the options.method parameter is not POST or PUT. */
    body?: string | Object,
    /** 
     * The URL of a SuiteTalk REST endpoint. It may also contain query parameters.
     * The URL may be fully qualified, relative, or relative with the /services/rest/ prefix omitted.
     */
    url: string,
    /** The HTTPS headers. */
    headers?: Object,
    /**
     * The HTTPS method (DELETE, GET, HEAD, POST, PUT).
     * The default value is GET if options.body is not specified, and POST if options.body is specified.
     */
    method?: string
}

interface RequestSuiteTalkRestFunction {
    (options: RequestSuiteTalkRestOptions): ClientResponse
}

// OBJECTS \\
/**
 * Encapsulates data that may be sent to a third-party via an HTTPS call.
 * @since 2015.2
 */
export interface SecureString {
    /**
     * Appends a passed in string to a https.SecureString.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if options.keepEncoding is false and an invalid attempt to re-encode from binary to string data occurred during the append.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if options.keepEncoding is false and an invalid attempt to re-encode from string to binary data occurred during the append.
     * @throws {SuiteScriptError} INVALID_VALUE_1_FOR_PARAMETER_2 if options.inputEncoding is set to a value other than https.Encoding.UTF_8 and options.keepEncoding is true.
     * @governance none
     * @since 2015.2
     */
    appendString(options: AppendStringOptions): SecureString;
    /**
     * Appends a passed in https.SecureString to another https.SecureString.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if options.keepEncoding is false and an invalid attempt to re-encode from binary to string data occurred during the append.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if options.keepEncoding is false and an invalid attempt to re-encode from string to binary data occurred during the append.
     * @governance none
     * @since 2015.2
     */
    appendSecureString(options: AppendSecureStringOptions): SecureString;
    /**
     * Changes the encoding of a https.SecureString.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if the content of the SecureString is binary data that does not represent a valid UTF-8-encoded string.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if the content of the SecureString is not a valid encoded string according to options.fromEncoding.
     * @governance none
     * @since 2015.2
     */
    convertEncoding(options: ConvertEncodingOptions): SecureString;
    /**
     * Produces the https.SecureString as a hash.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if an invalid attempt was made to encode the binary result to a UTF-8 string.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if the content of the SecureString is not a valid encoded string according to options.contentEncoding.
     * @governance none
     * @since 2015.2
     */
    hash(options: HashOptions): SecureString;
    /**
     * Produces the https.SecureString as an hmac.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if an invalid attempt was made to encode the binary result to a UTF-8 string.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if the content of the SecureString is not a valid encoded string according to options.contentEncoding.
     * @governance none
     * @since 2015.2
     */
    hmac(options: HmacOptions): SecureString;
    /**
     * Replaces all occurrences of a pattern string inside an https.SecureString with a replacement string.
     * @governance none
     * @since 2021.2
     */
    replaceString(options: { pattern: string, replacement: string }): SecureString;
    /** Not Documented - 6/9/2016 */
    toString(): string;
}

export {get, delete as delete, request, post, put, CacheDuration, Method, ClientResponse, ServerRequest, ServerResponse, GetOptions, DeleteOptions, PostOptions, PutOptions, RequestOptions, SendRedirectOptions, RedirectType} from './http';

// METHODS \\
/**
 * Creates a key for the contents of a credential field.
 * @governance none
 * @since 2015.2
 */
export const createSecretKey: HttpsCreateSecretKeyFunction;

/**
 * Creates an https.SecureString object.
 * @governance none
 * @since 2015.2
 */
export const createSecureString: HttpsCreateSecureStringFunction;

/**
 * Sends an HTTPS request to a RESTlet and returns the response. Authentication headers are automatically added.
 * The RESTlet will run with the same privileges as the calling script.
 *
 * @throws {SuiteScriptError} INVALID_SCRIPT_DEPLOYMENT_ID_1 if options.deploymentId does not reference a valid deployment for the script.
 * @throws {SuiteScriptError} SSS_AUTHORIZATION_HEADER_NOT_ALLOWED if the authorization header is set.
 * @throws {SuiteScriptError} SSS_INVALID_HEADER if options.headers is in an invalid format or contains an invalid header.
 * @throws {SuiteScriptError} SSS_INVALID_SCRIPT_ID_1 if options.scriptId does not reference a RESTlet script.
 * @throws {SuiteScriptError} SSS_INVALID_URL_PARAMS if options.urlParams is in an invalid format.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.body, options.deploymentId, or options.scriptId is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if the script calls itself recursively too many times.
 * @governance 10 units
 * @since 2020.2
 */
export const requestRestlet: RequestRestletFunction;

/**
 * Sends an HTTPS request to a Suitelet and returns the response.
 *
 * Use this method to perform an outbound HTTPS request in an anonymous client-side context. You can do this by performing the HTTPS request inside a Suitelet that is available without login, then calling the Suitelet inside your client script using the https.requestSuitelet(options) method.
 *
 * Currently, this method is supported only with the options.external parameter set to true
 *
 * @throws {SuiteScriptError} INVALID_SCRIPT_DEPLOYMENT_ID_1 if options.deploymentId does not reference a valid deployment for the script.
 * @throws {SuiteScriptError} SSS_AUTHORIZATION_HEADER_NOT_ALLOWED if the authorization header is set.
 * @throws {SuiteScriptError} SSS_INVALID_HEADER if options.headers is in an invalid format or contains an invalid header.
 * @throws {SuiteScriptError} SSS_INVALID_SCRIPT_ID_1 if options.scriptId does not reference a Suitelet script.
 * @throws {SuiteScriptError} SSS_INVALID_URL_PARAMS if options.urlParams is in an invalid format.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.deploymentId or options.scriptId is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if the script calls itself recursively too many times.
 * @governance 10 units
 * @since 2023.1
 */
export const requestSuitelet: RequestSuiteletFunction;

/**
 * Sends an HTTPS request to a SuiteTalk REST endpoint and returns the response. Authentication headers are automatically added.
 *
 * @throws {SuiteScriptError} SSS_AUTHORIZATION_HEADER_NOT_ALLOWED if the authorization header is set.
 * @throws {SuiteScriptError} SSS_INVALID_HEADER if options.headers is in an invalid format or contains an invalid header.
 * @throws {SuiteScriptError} SSS_INVALID_URL if options.url is invalid or does not reference a SuiteTalk REST endpoint.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.body, options.method, or options.url is not specified.
 * @throws {SuiteScriptError} SSS_REQUEST_LOOP_DETECTED if the script calls itself recursively too many times.
 * @governance 10 units
 * @since 2020.2
 */
export const requestSuiteTalkRest: RequestSuiteTalkRestFunction;

export {Encoding} from './encode';
