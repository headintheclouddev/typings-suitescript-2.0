/**
 * Load the N/crypto/certificate module to sign XML documents or strings with digital certificates using asymmetric cryptography.
 * In addition to signing XML documents, you can create signer and verifier objects and verify signed documents with this module.
 */

import N_file = require('../file');
import N_xml  = require('../xml');

export interface SignedXml {
  asFile(): N_file.File;
  asString(): string;
  asXml(): N_xml.NSXMLDocument;
}

export interface Signer {
  update(options: UpdateCertificateOptions): void;
  sign(options?: { outputEncoding?: string }): string; // Specify encoding of the signed string in Base64 format.
}

export interface Verifier {
  update(options: UpdateCertificateOptions): void;
  verify(options: VerifyOptions): void;
}

export function createSigner(options: CreateSignerOptions): Signer;
export function createVerifier(options: CreateSignerOptions): Verifier; // The documentation says this just returns a Parameters object?  May need to verify.
export function verifyXmlSignature(options: { signedXml: string; rootTag: string; certId?: string }): void;
export function signXml(options: { xmlString: string; certId: string; algorithm: string; rootTag: string; insertionTag?: string; }): SignedXml;

interface CreateSignerOptions {
  /** The script ID of the digital certificate. */
  certId: string;
  /** The hash algorithm. */
  algorithm: string;
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

interface VerifyOptions {
  /** The signature to be verified. */
  signature: string;
  /** The signature's encoding in Base64 format. */
  signatureEncoding?: string;
}

export enum HashAlg {
  SHA1,
  SHA256,
  SHA384,
  SHA512
}
