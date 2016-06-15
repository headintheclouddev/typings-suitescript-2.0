/// <reference path="../typings/index.d.ts" />
/// <reference path="crypto.d.ts" />
/// <reference path="http.d.ts" />

interface CreateSecureKeyOptions {
    /**
     * Specifies the encoding for the SecureKey.
     */
    encoding: string;
    /**
     * A GUID used to generate a secret key.
     * The GUID can resolve to either data or metadata.
     */
    guid: string;
}

interface CreateSecureStringOptions {
    /**
     * The string to convert to a secure string.
     */
    input: string;
    /**
     * Identifies the encoding that the input string uses. The default value is UTF_8
     */
    inputEncoding: string;
}

interface AppendStringOptions {
    /**
     * The string to append.
     */
    input: string;
    /**
     * The encoding of the string that is being appended.
     */
    encoding: string;
}

interface AppendSecureStringOptions {
    /**
     * The https.SecureString to append.
     */
    token: SecureString;
}

interface ConvertEncodingOptions {
    /**
     * The encoding to apply to the returned string.
     */
    toEncoding: string;
}

interface HashOptions {
    /**
     * The hash algorithm. Set the value using the crypto.Hash enum.
     */
    algorithm: string;
}

interface HmacOptions {
    /**
     * The hash algorithm. Set by the crypto.Hash enum.
     */
    algorithm: string;
    /**
     * A key returned from https.createSecureKey(options).
     */
    key: SecretKey;
}

interface SecureString {
    /**
     * Appends a passed in https.SecureString to another https.SecureString.
     */
    appendString(options: AppendStringOptions): SecureString;
    /**
     * Appends a passed in string to a https.SecureString.
     */
    appendSecureString(options: AppendSecureStringOptions): SecureString;
    /**
     * Changes the encoding of a https.SecureString.
     */
    convertEncoding(options: ConvertEncodingOptions): SecureString;
    /**
     * Produces the https.SecureString as a hash.
     */
    hash(options: HashOptions): SecureString;
    /**
     * Produces the https.SecureString as an hmac.
     */
    hmac(options: HmacOptions): SecureString;
    /**
     * Not Documented - 6/9/2016
     */
    toString(): string;
}

interface HttpsCreateSecureKeyFunction {
    (options: CreateSecureKeyOptions): SecretKey;
    promise(options: CreateSecureKeyOptions): Promise<SecretKey>;
}

interface HttpsCreateSecureStringFunction {
    (options: CreateSecureStringOptions): SecureString;
    promise(options: CreateSecureStringOptions): Promise<SecureString>;
}

interface HttpsModule {
    // OBJECTS \\
    /**
     * Encapsulates data that may be sent to a third-party via an HTTPS call.
     */
    SecureString: SecureString;
    /**
     * -read-only- Encapsulates the response to an HTTPS client request.
     */
    ClientResponse: ClientResponse;
    /**
     * -read-only- Encapsulates the HTTPS request information sent to an HTTPS server. For example, a request received by a Suitelet or RESTlet.
     */
    ServerRequest: ServerRequest;
    /**
     * Encapsulates the response from an HTTPS server to an HTTPS request. For example, a response from a Suitelet or RESTlet.
     */
    ServerResponse: ServerResponse;

    // METHODS \\
    /**
     * Creates a key for the contents of a credential field.
     */
    createSecureKey: HttpsCreateSecureKeyFunction;
    /**
     * Creates an https.SecureString object.
     */
    createSecureString: HttpsCreateSecureStringFunction;
    /**
     * Sends an HTTPS GET request and returns the response.
     */
    get: HttpGetFunction;
    /**
     * Sends an HTTPS DELETE request and returns the response.
     */
    delete: HttpDeleteFunction;
    /**
     * Sends an HTTPS request and returns the response.
     */
    request: HttpRequestFunction;
    /**
     * Sends an HTTPS POST request and returns the response.
     */
    post: HttpPostFunction;
    /**
     * Sends an HTTPS PUT request and returns the response.
     */
    put: HttpPutFunction;

    // ENUMS \\
    /**
     * Holds the string values for supported cache durations. 
     * This enum is used to set the value of the ServerResponse.setCdnCacheable(options) property.
     */
    CacheDuration: CacheDuration;
    /**
     * Holds the string values for supported HTTP requests. 
     * This enum is used to set the value of https.request(options) and ServerRequest.method.
     */
    Method: HttpMethod;
    /**
     * Holds the string values for supported encoding types.
     */
    Encoding: Encoding;

}

declare module N {
    var https: HttpsModule;
}

declare module 'N/https' {
    export = N.https;
}
