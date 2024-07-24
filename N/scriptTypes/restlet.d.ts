/**
 * Use the N/scriptTypes/restlet module to create custom HTTP responses for your RESTlet script.
 * This module is available only to RESTlet script type.
 */

/** An HTTP response of a RESTlet script. This object is read-only. Use restlet.createResponse(options) to create and return this object. */
interface Response {
  /** The content of the RESTlet HTTP response. */
  readonly content: string;
  /** The Content-Type header of the RESTlet HTTP response. */
  readonly contentType: string;
}

/** Creates a custom RESTlet HTTP response. */
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
