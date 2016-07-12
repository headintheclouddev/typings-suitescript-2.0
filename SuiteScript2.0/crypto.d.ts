/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

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
  createCipher(options: CreateCipherOptions): Cipher;
  /**
   * Method used to create a new crypto.Decipher object.
   */
  createDecipher(options: CreateDecipherOptions): Decipher;
  /**
   * Method used to create a new crypto.Hash object.
   */
  createHash(options: CreateHashOptions): Hash;
  /**
   * Method used to create a new crypto.Hmac object.
   */
  createHmac(options: CreateHmacOptions): Hmac;
  /**
   * Method used to create a new crypto.SecretKey object.
   */
  createSecretKey(options: CreateSecretKeyOptions): SecretKey;
}

declare var _: CryptoModule;
export = _;
