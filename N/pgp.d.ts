/**
 * Use the N/pgp module to enable secure messaging, file encryption, and document signing. Based on OpenPGP encryption standards.
 * PGP stands for Pretty Good Privacy and is most commonly used for encrypting emails.
 * PGP keys must be generated outside NetSuite and stored in Secrets Management (Setup > Company > API Secrets).
 * Supported script types: Server scripts (SuiteScript 2.1).
 */

import type {HashAlg, Signer} from "./crypto/certificate";

/**
 * Stores general configuration options that can be used for message decryption. Use the pgp.createConfig(options) method to create a new configuration object.
 * @since 2022.2
 */
export interface Config {
  /**
   * Enables decryption that is not secured with signing keys.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly allowInsecureDecryptionWithSigningKeys: boolean;
  /**
   * Allows messages without integrity protection.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly allowMessagesWithoutIntegrityProtection: boolean;
  /**
   * Allows relaxed signature parsing for configuration objects.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly useRelaxedSignatureParsing: boolean;
}

/**
 * Stores multiple cryptographic keys and metadata.
 * You can use this object in the Message.decrypt(options) and MessageData.encrypt(options) methods.
 * @since 2022.2
 */
export interface Key {
  // TODO: Nothing in the documentation?
}

/**
 * Stores an octet scalar that identifies a (sub)key. This object is used for verification signatures.
 * @since 2022.2
 */
export interface KeyId {
  /**
   * Returns the Key ID as a hexadecimal string.
   * @governance none
   * @since 2022.2
   */
  asHex: () => string;
}

/**
 * Stores processed PGP data. Responsible for enabling message serialization and providing a set of single-step processors to covert to a readable message.
 * Use the MessageData.toMessage() and MessageData.encrypt(options) to create a Message object.
 * @since 2022.2
 */
export interface Message {
  /**
   * Message type that specifies how a message is processed. Enables you to pick the appropriate method to process a message.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly type: boolean;
  /**
   * Converts a message to ASCII armored format.
   * @governance none
   * @since 2022.2
   */
  asArmored: () => string;
  /**
   * Converts a pgp.Message object to message data without any processing. This method only works if the message is not encrypted.
   * @throws {SuiteScriptError} PGP_EXPECTED_UNENCRYPTED_MESSAGE if the message is encrypted.
   * @governance none
   * @since 2022.2
   */
  toMessageData: () => MessageData;
  /**
   * Decrypts a message and optionally verifies the signatures. If the message is not well formed, various parse errors can be thrown.
   * @throws {SuiteScriptError} PGP_EXPECTED_ENCRYPTED_MESSAGE if the message is not encrypted. (Oracle's page spells this code "PGP_EXPECTED_ENCRYPTED MESSAGE".)
   * @throws {SuiteScriptError} PGP_NO_MATCHING_DECRYPTION_KEY_ANALYSIS_1 if no matching decryption key was found.
   * @throws {SuiteScriptError} PGP_MESSAGE_IS_NOT_INTEGRITY_PROTECTED if the message is not integrity protected.
   * @throws {SuiteScriptError} PGP_INTEGRITY_VERIFICATION_FAILED if the message is corrupted.
   * @throws {SuiteScriptError} PGP_VERIFICATION_FAILED_NO_SIGNATURE if the message is not signed, but verification keys were provided.
   * @throws {SuiteScriptError} PGP_VERIFICATION_FAILED_1 if none of the signatures could be verified using the provided verification keys.
   * @governance none
   * @since 2022.2
   */
  decrypt: (options: DecryptMessageOptions) => MessageData;
}

/**
 * Stores message data. The responsibilities of this object includes:
 * - Store message contents with meta data.
 * - Enable reading message contents and metadata.
 * - For further processing, determines whether data is text or binary.
 * - Provides a set of single-step processors for various PGP use cases.
 * Use the pgp.createMessageData(options) method to create a message data object.
 * @since 2022.2
 */
export interface MessageData {
  /**
   * The name of a file.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly filename: string;
  /**
   * Date of a message or modification date of the file.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly date: Date;
  /**
   * Literal data packet type.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly format: Format;
  /**
   * Extracts the contents of the message as text.
   * @governance none
   * @since 2022.2
   */
  getText: () => string;
  /**
   * Creates a message with no signature, compression, or encryption.
   * @governance none
   * @since 2022.2
   */
  toMessage: () => Message;
  /**
   * Creates an encrypted message that is optionally signed.
   * @throws {SuiteScriptError} PGP_NO_ENCRYPTION_KEY_FOUND_IN_KEY_PARAM_1 if no valid encryption (sub)key was found in one of the provided keys.
   * @throws {SuiteScriptError} PGP_NO_SIGNING_KEY_FOUND_IN_KEY_PARAM_1 if no valid signing (sub)key was found in one of the provided keys.
   * @governance none
   * @since 2022.2
   */
  encrypt: (options: EncryptMessageDataOptions) => Message;
}

/**
 * Stores verification results. Use the pgp.createVerification() method to create a Verification object.
 * @since 2022.2
 */
export interface Verification {
  /**
   * Indicates whether the message verification was successful.
   * Listed in Oracle's Verification Object Members table (no separate member page).
   * @since 2022.2
   */
  readonly verified: null|boolean;
  /**
   * List of individual verifications, one per each signature.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly signatures: null|VerificationSignature[];
}

/**
 * Stores a verification result for single signature.
 * @since 2022.2
 */
export interface VerificationSignature {
  /**
   * ID of the (sub)key that was used for signing.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly keyId: KeyId;
  /**
   * Date when the message was signed.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly dateSigned: Date;
  /**
   * Indicates whether verification was successful.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly verified: boolean;
  /**
   * List of problems for more fine-grained decision making.
   * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted.
   * @since 2022.2
   */
  readonly problems: string[];
}

/**
 * Creates a new pgp.Config object. A configuration object stores general configuration options that can be used for message decryption.
 * @governance none
 * @since 2022.2
 */
export function createConfig(options: CreateConfigOptions): Config;

/**
 * Creates a new pgp.MessageData object. A message data object stores message content with metadata.
 * @governance none
 * @since 2022.2
 */
export function createMessageData(options: CreateMessageDataOptions): MessageData;

/**
 * Creates a certificate.Signer object for signing plain strings.
 * If the given PGP key contains multiple valid signing sub keys, the most recently added will be used.
 * This behavior is consistent with MessageData.encrypt(options) method.
 * @throws {SuiteScriptError} UNSUPPORTED_COMBINATION_OF_KEY_AND_HASH_ALGORITHMS if the key's encryption algorithm is not compatible with the hash algorithm.
 * @throws {SuiteScriptError} PGP_NO_SIGNING_KEY_FOUND_IN_KEY_PARAM_1 if no valid signing (sub)keys are found in the given key.
 * @governance 10 units
 * @since 2022.2
 */
export function createSigner(options: CreateSignerOptions): Signer;

/**
 * Creates an empty verification object.
 * @governance none
 * @since 2022.2
 */
export function createVerification(): Verification;

/**
 * Loads a key whose contents are securely stored in a secret.
 * @throws {SuiteScriptError} REFERENCED_SECRET_IS_NOT_AVAILABLE if the secret/password parameter references a non-existing secret or you lack permission.
 * @throws {SuiteScriptError} PGP_NONSTANDARD_KEY_DOES_NOT_COMPLY_WITH_PGP_KEY_FORMAT if parsing of the key fails.
 * @throws {SuiteScriptError} PGP_YOU_CANNOT_PROVIDE_PASSWORD_FOR_A_PUBLIC_KEY if a password is provided but the key is public.
 * @throws {SuiteScriptError} PGP_INVALID_KEY_PASSWORD if the password is wrong or the private key is not password protected.
 * @throws {SuiteScriptError} PGP_THIS_KEY_IS_PASSWORD_PROTECTED if no password is provided but the private key is password protected.
 * @governance none
 * @since 2022.2
 */
export function loadKeyFromSecret(options: LoadKeyFromSecretOptions): Key;

/**
 * Parses an existing PGP key. Use pgp.loadKeyFromSecret(options) to load private keys.
 * @throws {SuiteScriptError} PGP_NONSTANDARD_KEY_DOES_NOT_COMPLY_WITH_PGP_KEY_FORMAT if parsing of the key fails.
 * @throws {SuiteScriptError} PGP_YOU_CANNOT_PROVIDE_PASSWORD_FOR_A_PUBLIC_KEY if a password is provided when the key is public.
 * @throws {SuiteScriptError} PGP_INVALID_KEY_PASSWORD if the password is wrong or the private key is not password protected.
 * @throws {SuiteScriptError} PGP_THIS_KEY_IS_PASSWORD_PROTECTED if no password is provided but the private key is password protected.
 * @governance none
 * @since 2022.2
 */
export function parseKey(options: ParseKeyOptions): Key;

/**
 * Parses a PGP message. Parameter value is ASCII armored representation of the message.
 * @governance none
 * @since 2022.2
 */
export function parseMessage(options: { value: string }): Message;

/**
 * Holds the values for available compression algorithms. Use this enum to set options.compressionAlgorithm of MessageData.encrypt(options).
 * @since 2022.2
 */
export enum CompressionAlgorithm {
  ZLIB
}

/**
 * Literal data packet type. Use this enum to set options.format of pgp.createMessageData(options).
 * @since 2022.2
 */
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
  /**
   * Oracle's documented spelling of suppressVerificationErrors. Which spelling the runtime accepts is unverified, so both are typed.
   * If set to true, the verification errors will not be thrown. Default value = false.
   */
  supressVerificationErrors?: boolean;
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

interface CreateSignerOptions {
  /** The PGP key. */
  key: Key;
  /** The hash algorithm. Use the certificate.HashAlg enum (N/crypto/certificate) to set this value. */
  algorithm: HashAlg | string;
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
