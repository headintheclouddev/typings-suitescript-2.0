/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

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

declare var _: HttpsModule;
export = _;
