/**
 * Load the clientCertificate module to send SSL requests with a digital certificate.
 * Supported script types: Server scripts.
 * If negotiating a connection exceeds 5 seconds, or transferring a payload exceeds 45 seconds, the request times out.
 */

import type {ClientResponse, Method} from '../https';

/**
 * Sends a SSL secured POST request to a remote server and returns the response.
 * @governance 10 units
 * @since 2019.1
 */
export function post(options: PostPutOptions): ClientResponse;
/**
 * Sends a SSL secured GET request to a remote server and returns the response.
 * @governance 10 units
 * @since 2019.2
 */
export function get(options: GetDeleteOptions): ClientResponse;
/**
 * Sends a SSL secured PUT request to a remote server and returns the response.
 * @governance 10 units
 * @since 2019.2
 */
export function put(options: PostPutOptions): ClientResponse;
/**
 * Sends a SSL secured DELETE request to a remote server and returns the response.
 * @governance 10 units
 * @since 2019.2
 */
declare const deleteFunc: DeleteMethod; // Workaround for the fact that "delete" is a JS keyword.
export {deleteFunc as delete};
/**
 * Sends a SSL secured request to a remote server and returns the response.
 * @governance 10 units
 * @since 2019.2
 */
export function request(options: RequestOptions): ClientResponse;

interface DeleteMethod {
  (options: GetDeleteOptions): ClientResponse;
}

interface GetDeleteOptions {
  /** The URL address of the remote server. */
  url: string;
  /** The ID of the client certificate. */
  certId: string;
  /** -optional- The HTTPS headers associated with the request. */
  headers?: Record<string, string>;
}

interface PostPutOptions extends GetDeleteOptions {
  /** The POST/PUT data to be sent to the remote server. */
  body: string;
}

interface RequestOptions {
  /** The URL address of the remote server. */
  url: string;
  /** -optional- The body content to send in the HTTPS request. Only the PUT, POST, and PATCH methods support this parameter; all other methods ignore it. */
  body?: string;
  /** The ID of the client certificate. */
  certId: string;
  /** The HTTPS headers associated with the request. (Oracle lists this parameter as required for clientCertificate.request(options).) */
  headers?: Record<string, string>;
  /** The HTTP method to be used. Use the https.Method enum to set this value. */
  method: Method | `${Method}`;
}
