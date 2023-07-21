/**
 * Use the N/crypto/random module to provide cryptographically-secure, pseudorandom generator methods.
 *
 * The N/crypto/random module is available for both client and server scripts, but server scripts need to use SuiteScript 2.1.
 * If you cannot update your server script code to SuiteScript 2.1, consider implementing a small RESTlet in SuiteScript 2.1
 * that uses N/crypto/random module and consuming it from your script with https.requestRestlet(options).
 */

/** Cryptographically strong pseudorandom data. */
export function generateBytes(options: GenerateBytesOptions): Uint8Array;

/**
 * Method used to generate cryptographically strong pseudorandom number.
 * Note: As of 21 July 2023, the documentation says it returns a string, but in testing it actually returns a number.
 */
export function generateInt(options: GenerateIntOptions): number;

/** Method used to generate a v4 UUID using a cryptographically secure random number generator. */
export function generateUUID(): string;

interface GenerateBytesOptions {
  /** The number of bytes to generate. */
  size: number;
}

interface GenerateIntOptions {
  /** End of random range (exclusive). */
  max: number;
  /** Start of random range. Default is 0. */
  min?: number;
}
