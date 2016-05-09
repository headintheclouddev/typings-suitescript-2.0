/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./encode.d.ts" />

/**
 * Encapsulates a cipher.
 */
interface Cipher {
  /**
   * Description TBA (5/9/2016)
   */
  final (options: FinalOptions): CipherPayload;
  /**
   * Description TBA (5/9/2016)
   */
  update (options: UpdateOptions): void;
}
/**
 * Encapsulates a cipher payload.
 */
interface CipherPayload {
  encoding: string;
  iv: number;
}

interface Decipher {
  /**
   * Description TBA (5/9/2016)
   */
  final (options: FinalOptions): string;
  /**
   * Method used to update decipher data with the specified encoding.
   */
  update (options: UpdateOptions): void;
}

interface Hash {
  /**
   * Calculates the digest of the data to be hashed.
   */
  digest (options: FinalOptions): string;
  /**
   * Method used to update hash data with the encoding specified.
   */
  update (options: UpdateOptions): void;
}

interface Hmac {
  /**
   * Gets the computed digest.
   */
  digest (options: FinalOptions): string;
  /**
   * Method used to update the hmac data with the encoding specified.
   */
  update (options: UpdateOptions): void;
}

interface SecretKey {
  guid: string;
  encoding: string;
}

interface FinalOptions {
  /**
   * The output encoding for a crypto.CipherPayload object.
   */
  outputEncoding: string;
}

interface UpdateOptions {
  /** 
   * The cipher data to be updated.
   */
  input: string;
  /**
   * The input encoding using encode.Encoding enum. Default: UTF_8.
   */
  inputEncoding?: Encoding;
}

interface CreateCipherOptions {
  /**
   * The hash algorithm. Set the value using thecrypto.Hash enum.
   */
  algorithm: HashAlgTypes;
  /**
   * The crypto.SecretKey object.
   */
  key: SecretKey;
  /**
   * The encryption mode for the cipher block.
   */
  blockCipherMode: string;
  /**
   * The padding for the cipher. Set the value using the crypto.Padding enum.
   */
  padding: PaddingTypes;
}

interface CreateDecipherOptions {
  /**
   * The hash algorithm. Set by the crypto.Hash enum.
   */
  algorithm: HashAlgTypes;
  /**
   * The crypto.SecretKey object.
   */
  key: SecretKey;
  /**
   * Description TBA (5/9/2016)
   */
  blockCipherMode: string;
  /**
   * Description TBA (5/9/2016)
   */
  padding: PaddingTypes;
  /**
   * Description TBA (5/9/2016)
   */
  iv: string;
}

interface CreateHashOptions {
  /**
   * The hash algorithm. Set by the crypto.Hash enum.
   */
  algorithm: HashAlgTypes;
}

interface CreateHmacOptions {
  /**
   * The hash algorithm. Set by the crypto.Hash enum.
   */
  algorithm: HashAlgTypes;
  /**
   * The crypto.SecretKey object.
   */
  key: SecretKey;
}

interface CreateSecretKeyOptions {
  guid: string;
  encoding: string;
}

interface EncryptionAlgTypes {
  AES: string;
}

interface HashAlgTypes {
  SHA1: string;
  SHA256: string;
  SHA512: string;
  MD5: string;
}

interface PaddingTypes {
  NoPadding: string;
  PKCS5Padding: string;
}

interface CryptoModule {
  Cipher: Cipher;
  CipherPayload: CipherPayload;
  Decipher: Decipher;
  Hash: Hash;
  Hmac: Hmac;
  SecretKey: SecretKey;
  EncryptionAlg: EncryptionAlgTypes;
  HashAlg: HashAlgTypes;
  Padding: PaddingTypes;
  /**
   * Method used to create and return a new crypto.EncryptionAlg object.
   * NOTE: we are NOT returning an EncryptionAlg, as it is not a real object. (5/9/2016)
   */
  createCipher (options: CreateCipherOptions): Cipher;
  /**
   * Method used to create a new crypto.Decipher object.
   */
  createDecipher (options: CreateDecipherOptions): Decipher;
  /**
   * Method used to create a new crypto.Hash object.
   */
  createHash (options: CreateHashOptions): Hash;
  /**
   * Method used to create a new crypto.Hmac object.
   */
  createHmac (options: CreateHmacOptions): Hmac;
  /**
   * Method used to create a new crypto.SecretKey object.
   */
  createSecretKey (options: CreateSecretKeyOptions): SecretKey;
}

declare module N {
    var crypto: CryptoModule;
}

declare module 'N/crypto' {
    export = N.crypto;
}
