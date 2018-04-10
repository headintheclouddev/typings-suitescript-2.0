import {Encoding} from './encode';
export {Encoding} from './encode';

/** Encapsulates a cipher. */
interface Cipher {
  /** Method used to return the cipher data. Sets the output encoding for the crypto.CipherPayload object. */
  final(options: FinalOptions): CipherPayload;
  /** Method used to update the clear data with the specified encoding. */
  update(options: UpdateOptions): void;
}

/** Encapsulates a cipher payload. */
interface CipherPayload {
  /** The result of the ciphering process. For example, to take the cipher payload and send it to another system. */
  ciphertext: string;
  /** Initialization vector for the cipher payload. You can pass in the iv value to crypto.createDecipher(options). */
  iv: number;
}

/** Encapsulates a decipher. This object has methods that decrypt. */
interface Decipher {
  /** Method used to return the clear data. */
  final(options: FinalOptions): string;
  /** Method used to update decipher data with the specified encoding. */
  update(options: UpdateOptions): void;
}

export interface Hash {
  /** Calculates the digest of the data to be hashed. */
  digest(options: FinalOptions): string;
  /** Method used to update hash data with the encoding specified. */
  update(options: UpdateOptions): void;
}

interface Hmac {
  /** Calculates the digest of the data to be hashed. Default output encoding is HEX. */
  digest(options?: { outputEncoding: Encoding }): string;
  /** Method used to update the hmac data with the encoding specified. */
  update(options: UpdateOptions): void;
}

export interface SecretKey {
  /** The GUID associated with the secret key. */
  guid: string;
  /** The encoding used for the clear text value of the secret key. */
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
  guid: string;
  /** Specifies the encoding for the SecureKey. Set this value using the encode.Encoding enum. The default value is HEX. */
  encoding?: Encoding;
}

export declare enum EncryptionAlg {
  AES,
}

export declare enum HashAlg {
  SHA1,
  SHA256,
  SHA512,
  MD5,
}

export declare enum Padding {
  NoPadding,
  PKCS5Padding,
}

/**
 * Method used to create and return a new crypto.EncryptionAlg object.
 * NOTE: we are NOT returning an EncryptionAlg, as it is not a real object. (5/9/2016)
 */
export declare function createCipher(options: CreateCipherOptions): Cipher;
/** Method used to create a new crypto.Decipher object. */
export declare function createDecipher(options: CreateDecipherOptions): Decipher;
/** Method used to create a new crypto.Hash object. */
export declare function createHash(options?: CreateHashOptions): Hash;
/** Method used to create a new crypto.Hmac object. */
export declare function createHmac(options: CreateHmacOptions): Hmac;
/** Method used to create a new crypto.SecretKey object. */
export declare function createSecretKey(options: CreateSecretKeyOptions): SecretKey;
