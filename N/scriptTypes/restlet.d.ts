/**
 * Use the N/scriptTypes/restlet module to create custom HTTP responses for your RESTlet script.
 *
 * Supported script types: RESTlet scripts
 */

/**
 * An HTTP response of a RESTlet script. This object is read-only. Use restlet.createResponse(options) to create and return this object.
 * @since 2024.1
 */
interface Response {
  /**
   * The content of the RESTlet HTTP response.
   * @since 2024.1
   */
  readonly content: string;
  /**
   * The Content-Type header of the RESTlet HTTP response.
   * @since 2024.1
   */
  readonly contentType: string;
}

/**
 * Creates a custom HTTP response for a RESTlet. Return the created object from a RESTlet entry point.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter has an invalid type.
 * @governance none
 * @since 2024.1
 */
export function createResponse(options: CreateResponseOptions): Response;

interface CreateResponseOptions {
  /** The content of the response. */
  content: string;
  /**
   * The Content-Type header of the response.
   * This value overrides the default Content-Type header, which is the same as the Content-Type header of the RESTlet HTTP request.
   */
  contentType: string;
}
