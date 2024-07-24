/**
 * Use the N/pgp module to enable secure messaging, file encryption, and document signing. Based on OpenPGP encryption standards.
 * PGP stands for Pretty Good Privacy and is most commonly used for encrypting emails.
 */

import {Signer} from "./crypto/certificate";

/** Stores general configuration options that can be used for message decryption. Use the pgp.createConfig(options) method to create a new configuration object. */
interface Config {
  /** Enables decryption that is not secured with signing keys. */
  readonly allowInsecureDecryptionWithSigningKeys: boolean;
  /** Allows messages without integrity protection. */
  readonly allowMessagesWithoutIntegrityProtection: boolean;
  /** Allows relaxed signature parsing for configuration objects. */
  readonly useRelaxedSignatureParsing: boolean;
}

/**
 * Stores multiple cryptographic keys and metadata.
 * You can use this object in the Message.decrypt(options) and MessageData.encrypt(options) methods.
 */
interface Key {
  // TODO: Nothing in the documentation?
}

/** Stores an octet scalar that identifies a (sub)key. This object is used for verification signatures. */
interface KeyId {
  /** Returns the Key ID as a hexadecimal string. */
  asHex: () => string;
}

/**
 * Stores processed PGP data. Responsible for enabling message serialization and providing a set of single-step processors to covert to a readable message.
 * Use the MessageData.toMessage() and MessageData.encrypt(options) to create a Message object.
 */
interface Message {
  /** Message type that specifies how a message is processed. Enables you to pick the appropriate method to process a message. */
  readonly type: boolean;
  /** Converts a message to ASCII armored format. */
  asArmored: () => string;
  /** Converts a pgp.Message object to message data without any processing. This method only works if the message is not encrypted. */
  toMessageData: () => MessageData;
  /** Decrypts a message and optionally verifies the signatures. */
  decrypt: (options: DecryptMessageOptions) => MessageData;
}

/**
 * Stores message data. The responsibilities of this object includes:
 * - Store message contents with meta data.
 * - Enable reading message contents and metadata.
 * - For further processing, determines whether data is text or binary.
 * - Provides a set of single-step processors for various PGP use cases.
 * Use the pgp.createMessageData(options) method to create a message data object.
 */
interface MessageData {
  readonly filename: string;
  readonly date: Date;
  readonly format: Format;
  /** Extracts the contents of the message as text. */
  getText: () => string;
  /** Creates a message with no signature, compression, or encryption. */
  toMessage: () => Message;
  /** Creates an encrypted message that is optionally signed. */
  encrypt: (options: EncryptMessageDataOptions) => Message;
}

/** Stores verification results. Use the pgp.createVerification() method to create a Verification object. */
interface Verification {
  /** Indicates whether the message verification was successful. */
  readonly verified: null|boolean;
  /** List of individual verifications, one per each signature. */
  readonly signatures: null|VerificationSignature[];
}

/** Stores a verification result for single signature. */
interface VerificationSignature {
  /** ID of the (sub)key that was used for signing. */
  readonly keyId: KeyId;
  /** Date when the message was signed. */
  readonly dateSigned: Date;
  /** Indicates whether verification was successful. */
  readonly verified: boolean;
  /** List of problems for more fine-grained decision making. */
  readonly problems: string[];
}

/** Creates a new pgp.Config object. A configuration object stores general configuration options that can be used for message decryption. */
export function createConfig(options: CreateConfigOptions): Config;

/** Creates a new pgp.MessageData object. A message data object stores message content with metadata. */
export function createMessageData(options: CreateMessageDataOptions): MessageData;

/**
 * Creates a certificate.Signer object for signing plain strings.
 * If the given PGP key contains multiple valid signing sub keys, the most recently added will be used.
 * This behavior is consistent with MessageData.encrypt(options) method.
 */
export function createSigner(options: { key: Key, algorithm: string }): Signer;

/** Creates an empty verification object. */
export function createVerification(): Verification;

/** Loads a key contents that are securely stored in a secret. */
export function loadKeyFromSecret(options: LoadKeyFromSecretOptions): Key;

/** Parses an existing PGP key. Use pgp.loadKeyFromSecret(options) to load private keys. */
export function parseKey(options: ParseKeyOptions): Key;

/** Parses a PGP message. Parameter value is ASCII armored representation of the message. */
export function parseMessage(options: { value: string }): Message;

export enum CompressionAlgorithm {
  ZLIB
}

export enum Format {
  UTF8,
  BINARY
}

interface CreateConfigOptions {
  /** Enables decryption that is not secured with signing keys. Default value is false. */
  allowInsecureDecryptionWithSigningKeys?: boolean;
  /** Allows messages without integrity protection. Default value is false. */
  allowMessagesWithoutIntegrityProtection?: boolean;
  /** Allows relaxed signature parsing for configuration objects. Default value is false. */
  useRelaxedSignatureParsing?: boolean;
}

interface CreateMessageDataOptions {
  /** Content of the message. */
  content: string;
  /** File name if the message represents a file, empty string otherwise. */
  filename?: string;
  /** Date of the message or modification date of the file. Default value = new Date(). */
  date?: Date;
  /** Literal data packet type. Default value = Format.UTF8, if content is a string. Format.BINARY otherwise. */
  format?: Format;
}

interface DecryptMessageOptions {
  /** Uses one or more keys to attempt message decryption. */
  decryptionKeys: Key|Key[];
  /**
   * Uses zero or more keys to attempt message signature verification. If you do not provide a verification key, the message's signature (if any) will be ignored.
   * If you do provide a verification key, at least one signature must be verifiable by one of the provided keys, otherwise an error will be thrown.
   * An expired key works if the signature was made before the expiration. Default value = [].
   */
  verificationKeys?: Key|Key[];
  /** An empty verification object. If you provide a value for this parameter, the verification results will be flushed instead of throwing an error for invalid signature. Default value = null. */
  verification?: Verification;
  /** If set to true, the verification errors will not be thrown. This value is implicitly set to true when the verification parameter is provided. Default value = false. */
  suppressVerificationErrors?: boolean;
  /** The configuration. Default value is pgp.createConfig(options). */
  config?: Config;
}

interface EncryptMessageDataOptions {
  /** One or more keys used to encrypt a message. If a key contains multiple valid encryption (sub)keys, the most recent key added will be used. */
  encryptionKeys: Key|Key[];
  /** Zero or more keys used for signing. If a key contains multiple valid signing (sub)keys, the most recent key added will be used. Default value = []. */
  signingKeys?: Key|Key[];
  /** The compression algorithm to use. Default value = CompressionAlgorithm.ZLIB. */
  compressionAlgorithm?: CompressionAlgorithm;
}

interface LoadKeyFromSecretOptions {
  /** Secret that contains a PGP key in ASCII armored format. */
  secret: { scriptId: string };
  /** Secret that contains a password to unlock the key. Applicable for private keys. */
  password?: { scriptId: string };
}

interface ParseKeyOptions {
  /** ASCII armored key */
  value: string;
  /** Password to unlock the key. Applicable for private keys. */
  password?: string;
}
