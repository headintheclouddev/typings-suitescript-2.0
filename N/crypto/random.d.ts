/**
 * Use the N/crypto/random module to provide cryptographically-secure, pseudorandom generator methods.
 *
 * The N/crypto/random module is available for both client and server scripts, but server scripts need to use SuiteScript 2.1.
 * If you cannot update your server script code to SuiteScript 2.1, consider implementing a small RESTlet in SuiteScript 2.1
 * that uses N/crypto/random module and consuming it from your script with https.requestRestlet(options).
 * Use this module instead of Math.random() for security-sensitive values such as tokens and nonces.
 */

/**
 * Generates a cryptographically strong pseudorandom set of bytes.
 * @governance none
 * @since 2023.1
 */
export function generateBytes(options: GenerateBytesOptions): Uint8Array;

/**
 * Method used to generate cryptographically strong pseudorandom number.
 * Note: Oracle's method page says it returns a string, but the module members table says number, and in testing it actually returns a number.
 * @governance 5 units
 * @since 2023.1
 */
export function generateInt(options: GenerateIntOptions): number;

/**
 * Method used to generate a v4 UUID using a cryptographically secure random number generator.
 * @governance none
 * @since 2023.1
 */
export function generateUUID(): string;

interface GenerateBytesOptions {
  /** The number of bytes to generate; between 1 and 512. */
  size: number;
}

interface GenerateIntOptions {
  /** End of random range (exclusive). */
  max: number;
  /** -optional- Start of random range. Default is 0. */
  min?: number;
}
