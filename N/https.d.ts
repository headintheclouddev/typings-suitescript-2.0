import {Encoding} from './encode';
import {ClientResponse, ServerRequest, ServerResponse, RedirectType, SendRedirectOptions} from './http'
import {HashAlg, SecretKey} from './crypto';

interface CreateSecureKeyOptions {
    /** Specifies the encoding for the SecureKey. */
    encoding?: Encoding;
    /** A GUID used to generate a secret key. The GUID can resolve to either data or metadata. */
    guid: string;
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
    /** The encoding of the string that is being appended. */
    encoding: Encoding;
}

interface AppendSecureStringOptions {
    /** The https.SecureString to append. */
    secureString: SecureString;
}

interface ConvertEncodingOptions {
    /** The encoding to apply to the returned string. */
    toEncoding: Encoding;
}

interface HashOptions {
    /** The hash algorithm. Set the value using the crypto.Hash enum. */
    algorithm: HashAlg;
}

interface HmacOptions {
    /** The hash algorithm. Set by the crypto.Hash enum. */
    algorithm: HashAlg;
    /** A key returned from https.createSecureKey(options). */
    key: SecretKey;
}

interface HttpsCreateSecureKeyFunction {
    (options: CreateSecureKeyOptions): SecretKey;
    promise(options: CreateSecureKeyOptions): Promise<SecretKey>;
}

interface HttpsCreateSecureStringFunction {
    (options: CreateSecureStringOptions): SecureString;
    promise(options: CreateSecureStringOptions): Promise<SecureString>;
}

interface RequestRestletOptions {
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
    /** Not Documented - 6/9/2016 */
    toString(): string;
}

export {get, delete as delete, request, post, put, CacheDuration, Method, ClientResponse, ServerRequest, ServerResponse, GetOptions, DeleteOptions, PostOptions, PutOptions, RequestOptions, SendRedirectOptions, RedirectType} from './http';

// METHODS \\
/** Creates a key for the contents of a credential field. */
export var createSecretKey: HttpsCreateSecureKeyFunction;

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
 * Sends an HTTPS request to a SuiteTalk REST endpoint and returns the response. Authentication headers are automatically added.
 * 
 * @governance 10 units
 */
export var requestSuiteTalkRest: RequestSuiteTalkRestFunction;

export {Encoding} from './encode';
