import type {Encoding} from './encode';
import type {Type} from './record';
export {Encoding} from './encode';

/**
 * Encapsulates a cipher.
 * @since 2015.2
 */
export interface Cipher {
  /**
   * Method used to return the cipher data. Sets the output encoding for the crypto.CipherPayload object.
   * @governance none
   * @since 2015.2
   */
  final(options: FinalOptions): CipherPayload;
  /**
   * Method used to update the clear data with the specified encoding.
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
   * Initialization vector for the cipher payload. You can pass in the iv value to crypto.createDecipher(options).
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
   * Method used to return the clear data.
   * @governance none
   * @since 2015.2
   */
  final(options: FinalOptions): string;
  /**
   * Method used to update decipher data with the specified encoding.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/** @since 2015.2 */
export interface Hash {
  /**
   * Calculates the digest of the data to be hashed.
   * @governance none
   * @since 2015.2
   */
  digest(options: FinalOptions): string;
  /**
   * Method used to update hash data with the encoding specified.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/** @since 2015.2 */
export interface Hmac {
  /**
   * Calculates the digest of the data to be hashed. Default output encoding is HEX.
   * @governance none
   * @since 2015.2
   */
  digest(options?: { outputEncoding: Encoding }): string;
  /**
   * Method used to update the hmac data with the encoding specified.
   * @governance none
   * @since 2015.2
   */
  update(options: UpdateOptions): void;
}

/** @since 2015.2 */
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
}

interface FinalOptions {
  /** The output encoding for a crypto.CipherPayload object. */
  outputEncoding?: Encoding;
}

interface UpdateOptions {
  /** The cipher data to be updated. */
  input: string;
  /** The input encoding using encode.Encoding enum. Default: UTF_8. */
  inputEncoding?: Encoding;
}

interface CreateCipherOptions {
  /** The hash algorithm. Set the value using the crypto.EncryptionAlg enum. */
  algorithm: EncryptionAlg;
  /** The crypto.SecretKey object. When using the crypto.SecretKey object for an AES algorithm, the length of the text (secret key) that is used to generate the GUID must be 16, 24, or 32 characters.*/
  key: SecretKey;
  /** The padding for the cipher. Set the value using the crypto.Padding enum. By default, the value is set to PKCS5Padding. */
  padding?: Padding;
}

interface CreateDecipherOptions {
  /** The hash algorithm. Set by the crypto.EncryptionAlg enum. */
  algorithm: EncryptionAlg;
  /** The crypto.SecretKey object. */
  key: SecretKey;
  /** The padding for the cipher. Set the value using the crypto.Padding enum. */
  padding?: Padding;
  /** The initialization vector that was used for encryption. */
  iv: string;
}

interface CreateHashOptions {
  /** The hash algorithm. Set by the crypto.Hash enum. Default value is HEX. */
  algorithm: HashAlg;
}

interface CreateHmacOptions {
  /** The hash algorithm. Set by the crypto.Hash enum. */
  algorithm: HashAlg;
  /** The crypto.SecretKey object. */
  key: SecretKey;
}

interface CreateSecretKeyOptions {
  /** A GUID used to generate a secret key. The GUID can resolve to either data or metadata. */
  guid?: string;
  /**
   * The script ID of the secret used for authentication. You can store secrets at Setup > Company > API Secrets. For more information, see Secrets Management.
   * This is only required if GUID is not provided. You cannot use the secret parameter in combination with the passwordGuid parameter.
   * @since 2021.1
   */
  secret?: string;
  /** Specifies the encoding for the SecureKey. Set this value using the encode.Encoding enum. The default value is HEX. */
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
  sublistId?: string
  /**
   * Input password value to be checked against the password stored in the record.
   */
  value: string
}

/** @since 2015.2 */
export declare enum EncryptionAlg {
  AES = "AES",
}

/**
 * Holds the string values for supported hashing algorithms.
 * Use this enum to set the value of the options.algorithm parameter for crypto.createHash(options) and crypto.createHmac(options).
 * @since 2015.2
 */
export declare enum HashAlg {
  SHA256 = "SHA256",
  SHA512 = "SHA512"
}

/** @since 2015.2 */
export declare enum Padding {
  NoPadding = "NoPadding",
  PKCS5Padding = "PKCS5Padding",
}

/**
 * Method used to create and return a new crypto.EncryptionAlg object.
 * NOTE: we are NOT returning an EncryptionAlg, as it is not a real object. (5/9/2016)
 * @governance none
 * @since 2015.2
 */
export declare function createCipher(options: CreateCipherOptions): Cipher;
/**
 * Method used to create a new crypto.Decipher object.
 * @governance none
 * @since 2015.2
 */
export declare function createDecipher(options: CreateDecipherOptions): Decipher;
/**
 * Method used to create a new crypto.Hash object.
 * @governance none
 * @since 2015.2
 */
export declare function createHash(options?: CreateHashOptions): Hash;
/**
 * Method used to create a new crypto.Hmac object.
 * @governance none
 * @since 2015.2
 */
export declare function createHmac(options: CreateHmacOptions): Hmac;
/**
 * Method used to create a new crypto.SecretKey object.
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
