/**
 * Use the N/https module to manage content sent to a third party using HTTPS calls.
 * This module encapsulates all the functionality of the N/http module, but does not allow the HTTP protocol.
 * You can make HTTPS calls from client and server scripts. SecureString functionality is supported only in server scripts.
 * Use TLS 1.2 endpoints. Prefer token-based authentication (TBA) or OAuth 2.0 over plain-text credentials,
 * and keep secrets in API Secrets / credential fields (GUIDs) rather than in script code.
 */

import type {Encoding} from './encode';
import type {ClientResponse, Method} from './http'
import type {HashAlg, SecretKey} from './crypto';

interface CreateSecretKeyOptions {
    /** -optional- Specifies the encoding for the secret key. Use the https.Encoding enum to set this value. */
    encoding?: Encoding;
    /**
     * A GUID used to generate a secret key. Use Form.addCredentialField(options) to generate a GUID.
     * The GUID can resolve to either data or metadata.
     * Required if options.secret is not specified. You cannot use both options.guid and options.secret.
     */
    guid?: string;
    /**
     * The script ID of the secret used for authentication. You can store secrets at Setup > Company > API Secrets.
     * Required if options.guid is not specified. You cannot use both options.guid and options.secret.
     * @since 2021.1
     */
    secret?: string;
}

interface CreateSecureStringOptions {
    /**
     * The string to convert to a https.SecureString.
     * Accepted patterns: `{<32 hexadecimal characters forming a GUID>}`, `{custsecret<1 to 89 alphanumeric characters or underscores>}`,
     * or specific payment plug-in tokens.
     */
    input: string;
    /** -optional- Identifies the encoding that the input string uses. The default value is UTF_8. */
    inputEncoding?: Encoding;
}

interface AppendStringOptions {
    /**
     * The string to append.
     * Accepted patterns: `{<32 hexadecimal characters forming a GUID>}`, `{custsecret<1 to 89 alphanumeric characters or underscores>}`,
     * or specific payment plug-in tokens.
     */
    input: string;
    /**
     * -optional- The encoding of the string that is being appended.
     * The default value is https.Encoding.UTF_8.
     * @deprecated Oracle documents this parameter as not supported; use this method only for appending string (UTF-8) content to a SecureString.
     */
    inputEncoding?: Encoding;
    /** -optional- Keeps the appended string in its original encoding. Set this value to true to prevent unexpected content re-encoding. The default value is false. */
    keepEncoding?: boolean;
}

interface AppendSecureStringOptions {
    /** The https.SecureString to append. */
    secureString: SecureString;
    /** -optional- Keeps the appended string in its original encoding. Set this value to true to prevent unexpected content re-encoding. The default value is false. */
    keepEncoding?: boolean;
}

interface ConvertEncodingOptions {
    /** The encoding to be used to decode the current content of the SecureString. Use the https.Encoding enum. */
    fromEncoding: Encoding;
    /** The encoding to store the content as. Use the https.Encoding enum. */
    toEncoding: Encoding;
}

interface HashOptions {
    /** The hash algorithm. Use the https.HashAlg enum to set this value. */
    algorithm: HashAlg;
    /**
     * -optional- Encoding used to convert/decode the current string content into binary data for hashing. Use values from the https.Encoding enum.
     * Defaults to the current internal encoding of the SecureString; specifying it is highly encouraged.
     */
    contentEncoding?: Encoding;
    /**
     * -optional- Encoding used to encode the binary result as a string. Use values from the https.Encoding enum.
     * Defaults to HEX when options.contentEncoding is specified, otherwise to the current internal encoding of the SecureString.
     */
    resultEncoding?: Encoding;
}

interface HmacOptions {
    /** The hash algorithm. Use the https.HashAlg enum to set this value. */
    algorithm: HashAlg;
    /** A key returned from https.createSecretKey(options), or a https.SecureString. */
    key: SecretKey | SecureString;
    /**
     * -optional- Encoding used to convert/decode the current string content into binary data for hmac processing. Use values from the https.Encoding enum.
     * Defaults to the current internal encoding of the SecureString; specifying it is highly encouraged.
     */
    contentEncoding?: Encoding;
    /**
     * -optional- Encoding used to encode the binary result as a string. Use values from the https.Encoding enum.
     * Defaults to HEX when options.contentEncoding is specified, otherwise to the current internal encoding of the SecureString.
     */
    resultEncoding?: Encoding;
}

interface ReplaceStringOptions {
    /** The string to be replaced. */
    pattern: string;
    /** The replacement string. */
    replacement: string;
}

interface HttpsCreateSecretKeyFunction {
    (options: CreateSecretKeyOptions): SecretKey;
    /** Not documented by Oracle (there is no https.createSecretKey.promise(options) page). */
    promise(options: CreateSecretKeyOptions): Promise<SecretKey>;
}

interface HttpsCreateSecureStringFunction {
    (options: CreateSecureStringOptions): SecureString;
    /** Not documented by Oracle (there is no https.createSecureString.promise(options) page). */
    promise(options: CreateSecureStringOptions): Promise<SecureString>;
}

export interface RequestRestletOptions {
    /**
     * -optional- The PUT/POST data. Required if options.method is POST or PUT; ignored if options.method is not POST or PUT.
     */
    body?: string | object;
    /** The script ID of the script deployment record. */
    deploymentId: string;
    /** The internal ID or script ID of the script record. Specify internal ID as a number. Specify script ID as a string. */
    scriptId: string | number;
    /**
     * -optional- The HTTPS headers. Required if options.method is POST or PUT, and must contain at least a Content-Type header in that case.
     * The Authorization header cannot be set (authentication headers are added automatically).
     */
    headers?: Record<string, string>;
    /**
     * -optional- The HTTPS method (DELETE, GET, HEAD, POST, PUT).
     * The default value is GET if options.body is not specified, and POST if options.body is specified.
     */
    method?: Method | `${Method}`;
    /** -optional- The parameters to be appended to the target URL as a query string. */
    urlParams?: Record<string, string | number | boolean>;
}

interface RequestRestletFunction {
    (options: RequestRestletOptions): ClientResponse;
    /**
     * Sends an HTTPS request asynchronously to a RESTlet and returns the response. Parameters and errors are the same as for https.requestRestlet(options).
     * Supported script types: Server scripts.
     * @governance 10 units
     * @since 2020.2
     */
    promise(options: RequestRestletOptions): Promise<ClientResponse>;
}

export interface RequestSuiteletOptions {
    /** -optional- The body content to send in the HTTPS request. Only the PUT, POST, and PATCH methods support this parameter; all other methods ignore it. */
    body?: string | object;
    /** The script ID of the script deployment record. */
    deploymentId: string;
    /** The script ID of the script record. */
    scriptId: string;
    /** -optional- The HTTPS headers. The Authorization header cannot be set. */
    headers?: Record<string, string>;
    /**
     * -optional- The HTTPS request method. Use https.Method to set this value.
     * The default value is GET if options.body is not specified, and POST if options.body is specified.
     */
    method?: Method | `${Method}`;
    /** -optional- Parameters to be appended to the target URL as a query string. */
    urlParams?: Record<string, string | number | boolean>;
    /**
     * Specifies whether to perform the request as an unauthenticated user; this case uses the Online Form User role.
     * @deprecated The options.external parameter was removed in NetSuite 2024.1. https.requestSuitelet(options) can only call internal Suitelets in trusted contexts for authenticated users.
     */
    external?: boolean;
}

interface RequestSuiteletFunction {
    (options: RequestSuiteletOptions): ClientResponse;
    /**
     * Sends an HTTPS request asynchronously to a Suitelet and returns the response. Parameters and errors are the same as for https.requestSuitelet(options).
     * @governance 10 units
     * @since 2023.1
     */
    promise(options: RequestSuiteletOptions): Promise<ClientResponse>;
}

interface RequestSuiteTalkRestOptions {
    /** -optional- The PUT/POST data. Required if options.method is POST or PUT; ignored if options.method is not POST or PUT. */
    body?: string | object;
    /**
     * The URL of a SuiteTalk REST endpoint. It may also contain query parameters.
     * The URL may be fully qualified, relative, or relative with the /services/rest/ prefix omitted.
     */
    url: string;
    /** -optional- The HTTPS headers. The Authorization header cannot be set (authentication headers are added automatically). */
    headers?: Record<string, string>;
    /**
     * -optional- The HTTPS method (DELETE, GET, HEAD, POST, PUT).
     * The default value is GET if options.body is not specified, and POST if options.body is specified.
     */
    method?: Method | `${Method}`;
}

interface RequestSuiteTalkRestFunction {
    (options: RequestSuiteTalkRestOptions): ClientResponse;
}

// OBJECTS \\
/**
 * Encapsulates data that may be sent to a third-party via an HTTPS call.
 * Supported script types: Server scripts.
 * @since 2015.2
 */
export interface SecureString {
    /**
     * Appends a string to a https.SecureString. Use this method only for appending string (UTF-8) content.
     * @returns The converted https.SecureString (not a new SecureString).
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if options.keepEncoding is false and an invalid attempt to re-encode from binary to string data occurred during the append.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if options.keepEncoding is false and an invalid attempt to re-encode from string to binary data occurred during the append.
     * @throws {SuiteScriptError} INVALID_VALUE_1_FOR_PARAMETER_2 if options.inputEncoding is set to a value other than https.Encoding.UTF_8 and options.keepEncoding is true.
     * @governance none
     * @since 2015.2
     */
    appendString(options: AppendStringOptions): SecureString;
    /**
     * Appends one https.SecureString to another https.SecureString.
     * @returns The converted https.SecureString (not a new SecureString).
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if options.keepEncoding is false and an invalid attempt to re-encode from binary to string data occurred during the append.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if options.keepEncoding is false and an invalid attempt to re-encode from string to binary data occurred during the append.
     * @governance none
     * @since 2015.2
     */
    appendSecureString(options: AppendSecureStringOptions): SecureString;
    /**
     * Converts the content of a https.SecureString between two encodings.
     * @returns The converted https.SecureString (not a new SecureString).
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if the content of the SecureString is binary data that does not represent a valid UTF-8-encoded string.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if the content of the SecureString is not a valid encoded string according to options.fromEncoding.
     * @governance none
     * @since 2015.2
     */
    convertEncoding(options: ConvertEncodingOptions): SecureString;
    /**
     * Creates a hash for a https.SecureString.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if an invalid attempt was made to encode the binary result to a UTF-8 string.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if the content of the SecureString is not a valid encoded string according to options.contentEncoding.
     * @governance none
     * @since 2015.2
     */
    hash(options: HashOptions): SecureString;
    /**
     * Creates an hmac for a https.SecureString using a specified hash algorithm and secret key.
     * @throws {SuiteScriptError} FAILED_TO_CONVERT_BINARY_DATA_TO_UTF_8 if an invalid attempt was made to encode the binary result to a UTF-8 string.
     * @throws {SuiteScriptError} FAILED_TO_DECODE_STRING_ENCODED_BINARY_DATA_USING_1_ENCODING if the content of the SecureString is not a valid encoded string according to options.contentEncoding.
     * @governance none
     * @since 2015.2
     */
    hmac(options: HmacOptions): SecureString;
    /**
     * Replaces all occurrences of a pattern string inside a https.SecureString with a replacement string.
     * For example, use it to escape special characters when a SecureString is used as a URL.
     * @returns The converted https.SecureString (not a new SecureString).
     * @governance none
     * @since 2021.2
     */
    replaceString(options: ReplaceStringOptions): SecureString;
    /** Not Documented - 6/9/2016 */
    toString(): string;
}

export {get, delete as delete, request, post, put, CacheDuration, Method, ClientResponse, ServerRequest, ServerResponse, GetOptions, DeleteOptions, PostOptions, PutOptions, RequestOptions, SendRedirectOptions, RedirectType} from './http';

// METHODS \\
/**
 * Creates and returns a crypto.SecretKey object for the contents of a credential field (GUID) or an API secret.
 * Supported script types: Server scripts.
 * @governance none
 * @since 2015.2
 */
export const createSecretKey: HttpsCreateSecretKeyFunction;

/**
 * Creates and returns a https.SecureString object. The input can be a GUID or a secret.
 * Supported script types: Server scripts.
 * @governance none
 * @since 2015.2
 */
export const createSecureString: HttpsCreateSecureStringFunction;

/**
 * Sends an HTTPS request to a RESTlet and returns the response. Authentication headers are automatically added.
 * The RESTlet will run with the same privileges as the calling script.
 * Supported script types: Server scripts.
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
 * This method can only call an internal Suitelet in trusted contexts for authenticated users.
 * It can no longer be used to perform outbound HTTPS requests in an anonymous client-side context (the options.external parameter was removed in 2024.1).
 * Supported script types: Client and server scripts.
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
 * Supported script types: Server scripts.
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

/**
 * Holds the string values for supported encoding types (https.Encoding). Re-exported from N/encode.
 * Use this enum to set encoding parameters of SecureString.appendString(options), SecureString.convertEncoding(options), and https.createSecureString(options).
 * @since 2020.2
 */
export {Encoding} from './encode';

/**
 * Holds the string values for supported hashing algorithms (SHA256, SHA512).
 * Use this enum to set the value of options.algorithm in SecureString.hash(options) and SecureString.hmac(options).
 * @since 2020.2
 */
export {HashAlg} from './crypto';
