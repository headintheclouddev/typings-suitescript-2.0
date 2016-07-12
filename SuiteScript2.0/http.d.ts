/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface HttpModule {
    /**
     * Encapsulates the response to an HTTP client request.
     */
    ClientResponse: ClientResponse;
    /**
     * Encapsulates the HTTP request information sent to an HTTP server. For example, a request received by a Suitelet or RESTlet.
     */
    ServerRequest: ServerRequest;
    /**
     * Encapsulates the response from an HTTP server to an HTTP request. For example, a response from a Suitelet or RESTlet.
     */
    ServerResponse: ServerResponse;
    /**
     * Sends an HTTP GET request and returns the response.
     */
    get: HttpGetFunction;
    /**
     * Sends an HTTP DELETE request and returns the response.
     */
    delete: HttpDeleteFunction;
    /**
     * Sends an HTTP request and returns the response.
     */
    request: HttpRequestFunction;
    /**
     * Sends an HTTP POST request and returns the response.
     */
    post: HttpPostFunction;
    /**
     * Sends an HTTP PUT request and returns the response.
     */
    put: HttpPutFunction;
    /**
     * Holds the string values for supported cache durations. 
     * This enum is used to set the value of the ServerResponse.setCdnCacheable(options) property.
     */
    CacheDuration: CacheDuration;
    /**
     * Holds the string values for supported HTTP requests. 
     * This enum is used to set the value of http.request(options) and ServerRequest.method.
     */
    Method: HttpMethod;
}

export default HttpModule;
