import {Encoding} from './encode';
import {ClientResponse, ServerRequest, ServerResponse, RedirectType, SendRedirectOptions} from './http'
import {HashAlg, SecretKey} from './crypto';

interface CreateSecretKeyOptions {
    /** Specifies the encoding for the SecureKey. */
    encoding?: Encoding;
    /** A GUID used to generate a secret key. The GUID can resolve to either data or metadata. Required if secret is not specified */
    guid?: string;
    /** The script ID of the secret used for authentication. This parameter is not required if you use the options.guid parameter. You cannot use both the options.guid parameter and secret parameter in combination. */
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
    /** The PUT/POST data. This is ignored if the options.method is not POST or PUT. */
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
    method?: string,
    /** The parameters to be appended to the target URL as a query string. */
    urlParams?: Object
}

interface RequestRestletFunction {
    (options: RequestRestletOptions): ClientResponse
    promise(options: RequestRestletOptions): Promise<ClientResponse>;
}

interface RequestSuiteletOptions extends RequestRestletOptions {
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
/** Encapsulates data that may be sent to a third-party via an HTTPS call. */
export interface SecureString {
    /** Appends a passed in https.SecureString to another https.SecureString. */
    appendString(options: AppendStringOptions): SecureString;
    /** Appends a passed in string to a https.SecureString. */
    appendSecureString(options: AppendSecureStringOptions): SecureString;
    /** Changes the encoding of a https.SecureString. */
    convertEncoding(options: ConvertEncodingOptions): SecureString;
    /** Produces the https.SecureString as a hash. */
    hash(options: HashOptions): SecureString;
    /** Produces the https.SecureString as an hmac. */
    hmac(options: HmacOptions): SecureString;
    /** Replaces all occurrences of a pattern string inside an https.SecureString with a replacement string. */
    replaceString(options: { pattern: string, replacement: string }): SecureString;
    /** Not Documented - 6/9/2016 */
    toString(): string;
}

export {get, delete as delete, request, post, put, CacheDuration, Method, ClientResponse, ServerRequest, ServerResponse, GetOptions, DeleteOptions, PostOptions, PutOptions, RequestOptions, SendRedirectOptions, RedirectType} from './http';

// METHODS \\
/** Creates a key for the contents of a credential field. */
export var createSecretKey: HttpsCreateSecretKeyFunction;

/**
 * Creates an https.SecureString object.
 */
export var createSecureString: HttpsCreateSecureStringFunction;

/**
 * Sends an HTTPS request to a RESTlet and returns the response. Authentication headers are automatically added.
 * The RESTlet will run with the same privileges as the calling script.
 * 
 * @governance 10 units
 */
export var requestRestlet: RequestRestletFunction;

/**
 * Sends an HTTPS request to a Suitelet and returns the response.
 *
 * Use this method to perform an outbound HTTPS request in an anonymous client-side context. You can do this by performing the HTTPS request inside a Suitelet that is available without login, then calling the Suitelet inside your client script using the https.requestSuitelet(options) method.
 *
 * Currently, this method is supported only with the options.external parameter set to true
 *
 * @governance 10 units
 */
export var requestSuitelet: RequestSuiteletFunction;

/**
 * Sends an HTTPS request to a SuiteTalk REST endpoint and returns the response. Authentication headers are automatically added.
 * 
 * @governance 10 units
 */
export var requestSuiteTalkRest: RequestSuiteTalkRestFunction;

export {Encoding} from './encode';
