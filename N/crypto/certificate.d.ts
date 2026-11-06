/**
 * Load the N/crypto/certificate module to sign XML documents or strings with digital certificates using asymmetric cryptography.
 * In addition to signing XML documents, you can create signer and verifier objects and verify signed documents with this module.
 */

import type {Encoding} from '../encode';
import type {File} from '../file';
import type {NSXMLDocument} from '../xml';

/** @since 2019.1 */
export interface SignedXml {
  /**
   * @governance none
   * @since 2019.2
   */
  asFile(): File;
  /**
   * @governance none
   * @since 2019.1
   */
  asString(): string;
  /**
   * @governance none
   * @since 2019.2
   */
  asXml(): NSXMLDocument;
}

/** @since 2019.1 */
export interface Signer {
  /**
   * @throws {SuiteScriptError} SSS_UNSUPPORTED_ENCODING if options.inputEncoding is invalid. It must be a text value such as UTF-8, ISO_8859_1, or ASCII; encode.Encoding values are not valid.
   * @governance none
   * @since 2019.1
   */
  update(options: UpdateCertificateOptions): void;
  /**
   * @governance none
   * @since 2019.1
   */
  sign(options?: SignOptions): string;
}

/** @since 2019.1 */
export interface Verifier {
  /**
   * @governance none
   * @since 2019.1
   */
  update(options: UpdateCertificateOptions): void;
  /**
   * @throws {SuiteScriptError} INVALID_SIGNATURE if the signature is not verified, for example because the certificate or hash algorithm in the Verifier is wrong or the signature is not valid for the supplied string.
   * @governance none
   * @since 2019.1
   */
  verify(options: VerifyOptions): void;
}

/**
 * @governance 10 units
 * @since 2019.1
 */
export function createSigner(options: CreateSignerOptions): Signer;
/**
 * @governance 10 units
 * @since 2019.1
 */
export function createVerifier(options: CreateSignerOptions): Verifier; // The documentation says this just returns a Parameters object?  May need to verify.
/**
 * @governance 10 units
 * @since 2019.1
 */
export function verifyXmlSignature(options: { signedXml: string; rootTag: string; certId?: string }): void;
/**
 * @governance 10 units
 * @since 2019.1
 */
export function signXml(options: { xmlString: string; certId: string; algorithm: string; rootTag: string; insertionTag?: string; }): SignedXml;

interface CreateSignerOptions {
  /** The script ID of the digital certificate. */
  certId: string;
  /** The hash algorithm. */
  algorithm: HashAlg;
}

interface UpdateCertificateOptions {
  /** The string to update. */
  input: string;
  /**
   * Encoding of the string to sign (e.g., UTF-8, ISO_8859_1, ASCII). The default value is UTF-8.
   * Note: This must be a text value. Values from encode.Encoding (N/encode module) are not accepted.
   */
  inputEncoding?: string;
}

interface SignOptions {
  /** Encoding of the signed string in Base64 format. */
  outputEncoding?: Encoding
  /** Returns ECDSA signatures in raw format. Default value is set to false. */
  useRawFormatForECDSA?: boolean;
}

interface VerifyOptions {
  /** The signature to be verified. */
  signature: string;
  /** The signature's encoding in Base64 format. */
  signatureEncoding?: string;
}

/** @since 2019.1 */
export enum HashAlg {
  // SHA1,
  SHA256,
  SHA384,
  SHA512
}
