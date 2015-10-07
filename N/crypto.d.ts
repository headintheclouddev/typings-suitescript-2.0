/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./encode.d.ts" />

interface Cipher {
  final: (options: FinalOptions) => CipherPayload;
  update: (options: UpdateOptions) => void;
}

interface CipherPayload {
  encoding: string;
  iv: string;
}

interface Decipher {
  final: (options: FinalOptions) => string;
  update: (options: UpdateOptions) => void;
}

interface Hash {
  digest: (options: FinalOptions) => string;
  update: (options: UpdateOptions) => void;
}

interface Hmac {
  digest: (options: FinalOptions) => string;
  update: (options: UpdateOptions) => void;
}

interface SecretKey {
  // apparently its still a secret.
}

interface CreateCipherOptions {
  algorithm: HashAlgTypes;
  key: SecretKey;
  blockCipherMode: string;
  padding: PaddingTypes;
}

interface FinalOptions {
  outputEncoding: string;
}

interface UpdateOptions {
  input: string;
  inputEncoding: Encoding;
}

interface CreateDecipherOptions {
  algorithm: HashAlgTypes;
  key: SecretKey;
  blockCipherMode: string;
  padding: PaddingTypes;
  iv: string;
}

interface CreateHashOptions {
  algorithm: HashAlgTypes;
}

interface CreateHmacOptions {
  algorithm: HashAlgTypes;
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
  createCipher: (options: CreateCipherOptions) => Cipher;
  createDecipher: (options: CreateDecipherOptions) => Decipher;
  createHash: (options: CreateHashOptions) => Hash;
  createSecretKey: (options: CreateSecretKeyOptions) => SecretKey;
  EncryptionAlg: EncryptionAlgTypes;
  HashAlg: HashAlgTypes;
  Padding: PaddingTypes;
}

declare module N {
    var crypto: CryptoModule;
}

declare module 'N/crypto' {
    export = N.crypto;
}
