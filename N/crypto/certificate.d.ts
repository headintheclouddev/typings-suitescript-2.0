/**
 * Load the N/crypto/certificate module to sign XML documents or strings with digital certificates using asymmetric cryptography.
 * In addition to signing XML documents, you can create signer and verifier objects and verify signed documents with this module.
 * Supported script types: Server scripts.
 */

import type {Encoding} from '../encode';
import type {File} from '../file';
import type {SecureString} from '../https';
import type {NSXMLDocument} from '../xml';

/**
 * Encapsulates an XML string that has been digitally signed. Returned by certificate.signXml(options).
 * @since 2019.1
 */
export interface SignedXml {
  /**
   * Returns the signed XML as a file.
   * @governance none
   * @since 2019.2
   */
  asFile(): File;
  /**
   * Returns the signed XML as a string.
   * @governance none
   * @since 2019.1
   */
  asString(): string;
  /**
   * Returns the signed XML as an XML document.
   * @governance none
   * @since 2019.2
   */
  asXml(): NSXMLDocument;
}

/**
 * Encapsulates a created signature (signer) for plain strings. Returned by certificate.createSigner(options).
 * @since 2019.1
 */
export interface Signer {
  /**
   * Updates the input string to be signed. The string can be encoded.
   * @throws {SuiteScriptError} SSS_UNSUPPORTED_ENCODING if options.inputEncoding is invalid. It must be a text value such as UTF-8, ISO_8859_1, or ASCII; encode.Encoding values are not valid.
   * @governance none
   * @since 2019.1
   */
  update(options: UpdateSignerOptions): void;
  /**
   * Signs the string and returns the signature. Formatting, such as line breaks, is disabled in signatures.
   * For ECDSA based algorithms, the signature is returned in ASN.1 DER format unless options.useRawFormatForECDSA is true.
   * @governance none
   * @since 2019.1
   */
  sign(options?: SignOptions): string;
}

/**
 * Encapsulates a created verifier for verifying plain string signatures. Returned by certificate.createVerifier(options).
 * @since 2019.1
 */
export interface Verifier {
  /**
   * Updates the string to be verified against a specified certificate.
   * @governance none
   * @since 2019.1
   */
  update(options: UpdateVerifierOptions): void;
  /**
   * Verifies a string against a provided signature using a specified certificate.
   * @throws {SuiteScriptError} INVALID_SIGNATURE if the signature is not verified, for example because the certificate or hash algorithm in the Verifier is wrong or the signature is not valid for the supplied string.
   * @governance none
   * @since 2019.1
   */
  verify(options: VerifyOptions): void;
}

/**
 * Creates the signer object for signing plain strings.
 * @governance 10 units
 * @since 2019.1
 */
export function createSigner(options: CreateSignerOptions): Signer;
/**
 * Creates the verifier object for verifying signatures of plain strings.
 * @governance 10 units
 * @since 2019.1
 */
export function createVerifier(options: CreateSignerOptions): Verifier;
/**
 * Verifies the signature of a signed XML string.
 * @governance 10 units
 * @since 2019.1
 */
export function verifyXmlSignature(options: VerifyXmlSignatureOptions): void;
/**
 * Signs an input XML string using a certificate ID. Formatting, such as line breaks, is disabled.
 * @governance 10 units
 * @since 2019.1
 */
export function signXml(options: SignXmlOptions): SignedXml;

interface CreateSignerOptions {
  /** The script ID of the digital certificate. */
  certId: string;
  /** The hash algorithm. Use the certificate.HashAlg enum to set this value. */
  algorithm: HashAlg;
}

interface SignXmlOptions {
  /** Input XML string. */
  xmlString: string;
  /** The script ID of the digital certificate. */
  certId: string;
  /** The hash algorithm. Use the certificate.HashAlg enum to set this value. */
  algorithm: HashAlg | string;
  /** Root tag of the XML section to sign. */
  rootTag: string;
  /** -optional- Tag where the signature should be inserted. */
  insertionTag?: string;
}

interface VerifyXmlSignatureOptions {
  /** Signed XML. */
  signedXml: string;
  /** Signed root XML tag. */
  rootTag: string;
  /** -optional- The script ID of the digital certificate. */
  certId?: string;
}

interface UpdateSignerOptions {
  /** The string to update. */
  input: string | SecureString;
  /**
   * -optional- Encoding of the string to sign (for example, UTF-8, ISO_8859_1, ASCII). The default value is UTF-8.
   * Note: This must be a text value. Values from encode.Encoding (N/encode module) are not accepted.
   */
  inputEncoding?: string;
}

interface UpdateVerifierOptions {
  /** The string to verify. */
  input: string;
  /** -optional- Encoding of the string to verify. The default value is UTF-8. */
  inputEncoding?: string;
}

interface SignOptions {
  /** -optional- Encoding of the signed string in Base64 format. */
  outputEncoding?: Encoding;
  /** -optional- Returns ECDSA signatures in raw format. Default value is set to false. */
  useRawFormatForECDSA?: boolean;
}

interface VerifyOptions {
  /** The signature to be verified. */
  signature: string;
  /** -optional- The signature's encoding in Base64 format. */
  signatureEncoding?: string;
}

/**
 * Holds the string values for hash algorithm types.
 * Supported digest methods are SHA256, SHA384, and SHA512 for RSA and ECDSA, and SHA256 for DSA.
 * @since 2019.1
 */
export enum HashAlg {
  SHA256,
  SHA384,
  SHA512
}
