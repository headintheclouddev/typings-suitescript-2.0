/**
 * Use the N/crypto module to perform hashing, hash-based message authentication (hmac), and symmetrical encryption functions.
 * When the N/crypto module is used, SuiteScript also loads the N/encode module.
 * Supported script types: Server scripts.
 */

import type {Encoding} from './encode';
import type {Type} from './record';
export {Encoding} from './encode';

/**
 * Encapsulates a cipher.
 * @since 2015.2
 */
export interface Cipher {
  /**
   * Returns the cipher data. Sets the output encoding for the crypto.CipherPayload object.
   * @governance none
   * @since 2015.2
   */
  final(options?: CipherFinalOptions): CipherPayload;
  /**
   * Updates the clear data with the specified encoding.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/**
 * Encapsulates a cipher payload.
 * @since 2015.2
 */
export interface CipherPayload {
  /**
   * The result of the ciphering process. For example, to take the cipher payload and send it to another system.
   * @since 2015.2
   */
  ciphertext: string;
  /**
   * Initialization vector for the cipher payload. You can pass this value to crypto.createDecipher(options).
   * This property is always encoded in encode.Encoding.HEX.
   * @since 2015.2
   */
  iv: string;
}

/**
 * Encapsulates a decipher. This object has methods that decrypt.
 * @since 2015.2
 */
export interface Decipher {
  /**
   * Returns the clear data.
   * @governance none
   * @since 2015.2
   */
  final(options?: FinalOptions): string;
  /**
   * Updates decipher data with the specified encoding. The default input encoding is encode.Encoding.HEX.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/**
 * Encapsulates a hash.
 * @since 2015.2
 */
export interface Hash {
  /**
   * Calculates the digest of the data to be hashed. The default output encoding is encode.Encoding.HEX.
   * @governance none
   * @since 2015.2
   */
  digest(options?: FinalOptions): string;
  /**
   * Updates clear data with the encoding specified.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/**
 * Encapsulates an hmac.
 * @since 2015.2
 */
export interface Hmac {
  /**
   * Returns the computed digest. The default output encoding is encode.Encoding.HEX.
   * @governance none
   * @since 2015.2
   */
  digest(options?: FinalOptions): string;
  /**
   * Updates the clear data with the encoding specified.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/**
 * Encapsulates the handle to a key. The handle does not store the key value; it points to the key stored within the NetSuite system.
 * @since 2015.2
 */
export interface SecretKey {
  /**
   * The GUID associated with the secret key.
   * @since 2015.2
   */
  guid: string;
  /**
   * The encoding used for the clear text value of the secret key.
   * @since 2015.2
   */
  encoding: string;
  /**
   * The script ID of an API secret stored at Setup > Company > API Secrets.
   * @since 2021.1
   */
  secret?: string;
}

interface FinalOptions {
  /** -optional- The output encoding. Use the encode.Encoding enum to set the value. */
  outputEncoding?: Encoding;
}

interface CipherFinalOptions {
  /** -optional- The output encoding for a crypto.CipherPayload object. Use the encode.Encoding enum to set the value. The default value is HEX. */
  outputEncoding?: Encoding;
}

interface UpdateOptions {
  /** The data to be updated. */
  input: string;
  /** -optional- The input encoding. Use the encode.Encoding enum to set the value. */
  inputEncoding?: Encoding;
}

interface CreateCipherOptions {
  /** The encryption algorithm. Use the crypto.EncryptionAlg enum to set the value. */
  algorithm: EncryptionAlg;
  /**
   * The crypto.SecretKey object.
   * When using the crypto.SecretKey object for an AES algorithm, the length of the text (secret key) that is used to generate the GUID must be 16, 24, or 32 characters.
   */
  key: SecretKey;
  /** -optional- The padding for the cipher text. Use the crypto.Padding enum to set the value. The default value is PKCS5Padding. */
  padding?: Padding;
}

interface CreateDecipherOptions {
  /** The encryption algorithm. Use the crypto.EncryptionAlg enum to set the value. */
  algorithm: EncryptionAlg;
  /**
   * The crypto.SecretKey object used for encryption.
   * When using the crypto.SecretKey object for an AES algorithm, the length of the text (secret key) that is used to generate the GUID must be 16, 24, or 32 characters.
   */
  key: SecretKey;
  /** -optional- The padding for the cipher. Use the crypto.Padding enum to set the value. */
  padding?: Padding;
  /** The initialization vector that was used for encryption. You can use a CipherPayload.iv value. */
  iv: string;
}

interface CreateHashOptions {
  /** The hash algorithm. Use the crypto.HashAlg enum to set the value. */
  algorithm: HashAlg;
}

interface CreateHmacOptions {
  /** The hash algorithm. Use the crypto.HashAlg enum to set the value. */
  algorithm: HashAlg;
  /** The crypto.SecretKey object. */
  key: SecretKey;
}

interface CreateSecretKeyOptions {
  /**
   * A GUID used to generate a secret key. The GUID can resolve to either data or metadata.
   * You can create a GUID using Form.addCredentialField(options).
   * Required if options.secret is not specified. You cannot use options.guid in combination with options.secret.
   */
  guid?: string;
  /**
   * The script ID of the secret used for authentication. You can store secrets at Setup > Company > API Secrets.
   * Required if options.guid is not specified. You cannot use options.secret in combination with options.guid.
   * @since 2021.1
   */
  secret?: string;
  /** -optional- Specifies the encoding for the secret key. Set this value using the encode.Encoding enum. The default value is HEX. */
  encoding?: Encoding;
}

export interface CheckPasswordFieldOptions {
  /**
   * ID of the password field.
   */
  fieldId: string;
  /**
   * Zero-based line index of the password field if the password is on a line.
   */
  line?: number;
  /**
   * ID of the record that has the password field.
   */
  recordId: number;
  /**
   * Type of record that has the password field.
   */
  recordType: string | Type;
  /**
   * ID of the sublist if the password field is on a sublist line.
   */
  sublistId?: string;
  /**
   * Input password value to be checked against the password stored in the record.
   */
  value: string;
}

/**
 * Holds the string values for supported encryption algorithms.
 * Use this enum to set the options.algorithm parameter for crypto.createCipher(options) and crypto.createDecipher(options).
 * @since 2015.2
 */
export declare enum EncryptionAlg {
  AES,
}

/**
 * Holds the string values for supported hashing algorithms.
 * Use this enum to set the value of the options.algorithm parameter for crypto.createHash(options) and crypto.createHmac(options).
 * @since 2015.2
 */
export declare enum HashAlg {
  SHA256,
  SHA512
}

/**
 * Holds the string values for supported cipher padding.
 * Use this enum to set the options.padding parameter for crypto.createCipher(options) and crypto.createDecipher(options).
 * @since 2015.2
 */
export declare enum Padding {
  NoPadding,
  PKCS5Padding,
}

/**
 * Creates and returns a new crypto.Cipher object. The block cipher mode is automatically set to CBC.
 * @governance none
 * @since 2015.2
 */
export declare function createCipher(options: CreateCipherOptions): Cipher;
/**
 * Creates and returns a new crypto.Decipher object. The block cipher mode is automatically set to CBC.
 * @governance none
 * @since 2015.2
 */
export declare function createDecipher(options: CreateDecipherOptions): Decipher;
/**
 * Creates and returns a new crypto.Hash object.
 * @governance none
 * @since 2015.2
 */
export declare function createHash(options: CreateHashOptions): Hash;
/**
 * Creates and returns a new crypto.Hmac object.
 * @governance none
 * @since 2015.2
 */
export declare function createHmac(options: CreateHmacOptions): Hmac;
/**
 * Creates and returns a new crypto.SecretKey object. This method can take a GUID or the script ID of an API secret.
 * Keep keys in API Secrets or credential fields rather than hard-coding them in scripts.
 * @governance none
 * @since 2015.2
 */
export declare function createSecretKey(options: CreateSecretKeyOptions): SecretKey;

/**
 * Checks whether a password in a record corresponds to the password entered by the user.
 *
 * Use this method instead of Record.getValue(options) or CurrentRecord.getValue(options) on a custom password field.
 * You should no longer use those methods for custom password fields.
 * This method provides a more secure way to check custom password fields.
 * @governance none
 * @since 2021.1
 */
export declare function checkPasswordField(options: CheckPasswordFieldOptions): boolean;
