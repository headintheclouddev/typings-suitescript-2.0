import type {File} from './file';

/**
 * The N/certificateControl module enables scripting access to the Digital Certificates list found in the UI at Setup > Company > Certificates.
 * You can use this module to find, create, update, read and delete certificates records. For more information, see Digital Signing and Uploading Digital Certificates in Help.
 * In order to access this module, you must use the Execute As Role field on the script deployment record. Select either the Administrator role or a custom role with the Certificate Access permission.
 */

/**
 * Encapsulates a digital certificate record. The certificate record is not a standard NetSuite record and cannot be accessed with N/record.
 * Supported script types: Server scripts.
 * @since 2019.2
 */
export interface Certificate {
  /**
   * Saves a certificate record object.
   * @governance 10 units
   * @since 2019.2
   */
  save: () => Certificate;
  /**
   * A description of the certificate record.
   * @since 2019.2
   */
  description: string;
  /**
   * The File Object Members object of the certificate uploaded to the certificate record.
   * @since 2019.2
   */
  file: File;
  /**
   * The name of the certificate record.
   * @since 2019.2
   */
  name: string;
  /**
   * Indicates the setting of the Month box for Expiration Reminders on the certificate record.
   * This property is set to true if the Month box is checked and email reminders are sent to account administrators one month before the certificate expires.
   * If the Copy Employees box is also checked, selected employees are copied on the reminder emails.
   * @since 2019.2
   */
  monthReminder: boolean;
  /**
   * The internal IDs of the employees copied on expiration notification email.
   * The values for this property are found in the Copy Employees field of the Audience tab on the certificate record.
   * When you create or edit a certificate object with values for this property, you also check the Copy Employees box for the certificate record.
   * @since 2019.2
   */
  notifications: number[];
  /**
   * The password for the digital certificate (write-only).
   * If the certificate file is password-protected, you can store the password with the certificate record.
   * If the certificate is not password-protected, enter an empty string.
   * This property accepts the script ID of an API secret that stores your certificate password.
   * @since 2019.2
   */
  password: string;
  /**
   * The internal IDs of the employees selected in the Restrict to Employees field of the certificate record.
   * If you set this property with an employee internal ID, you check the Restrict to Employees box and select that employee.
   * Employees selected must also have either the Certificate Management or Certificate Access role permission in order to access the certificate.
   * When the Restrict to Employees box is checked, only Administrators and the employees selected can access the certificate.
   * @since 2019.2
   */
  restrictions: number[];
  /**
   * The ID of the certificate record. The script ID for certificate records begins with “custcertificate.”
   * @since 2019.2
   */
  scriptId: string;
  /**
   * The internal IDs of the subsidiaries associated with the certificate record. Subsidiary selections associate a certificate to one or more subsidiaries but do not affect access.
   * @since 2019.2
   */
  subsidiaries: number[];
  /**
   * Indicates the setting of the 3 Months box for Expiration Reminders on the certificate record.
   * This property is set to true if the 3 Months box is checked.
   * When set to true , email reminders are sent to account administrators three months before the certificate expires.
   * If the Copy Employees box is also checked, selected employees are copied on the reminder emails.
   * @since 2019.2
   */
  threeMonthsReminder: boolean;
  /**
   * Indicates the setting of the Week box for Expiration Reminders on the certificate record.
   * This property is set to true if the Week box is checked.
   * When set to true , email reminders are sent to account administrators one week before the certificate expires.
   * If the Copy Employees box is also checked, selected employees are copied on the reminder emails.
   * @since 2019.2
   */
  weekReminder: boolean;
}

/**
 * Creates a certificate record on the Certificates page using a file from the File Cabinet.
 * After saving with Certificate.save(), the certificate is accessible on the Certificates page.
 * Your role must have Create, Edit, or Full access to the Certificate Access permission.
 * @governance 10 units
 * @since 2019.2
 */
export function createCertificate(options: CreateCertificateOptions): Certificate;
/**
 * Returns metadata about the certificates available. You can use the parameters as filters for this search.
 * If you do not use any parameters, all certificate records are returned.
 * @governance 10 units
 * @since 2019.1
 */
export function findCertificates(options?: FindCertificatesOptions): CertificateMetadata[];
/**
 * Returns an audit trail of how a certificate has been used. Includes operations performed with time stamps.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter provided is the wrong type.
 * @throws {SuiteScriptError} TOO_MANY_RESULTS if there are more than 1000 results.
 * @governance 10 units
 * @since 2019.2
 */
export function findUsages(options?: FindUsagesOptions): Record<string, unknown>[];
/**
 * Deletes a certificate record. History of the certificate is not deleted.
 * Your role must have Edit or Full access to the Certificate Access permission.
 * @returns The script ID of the deleted certificate.
 * @governance 10 units
 * @since 2019.2
 */
export function deleteCertificate(options: DeleteCertificateOptions): string;
/**
 * Loads a certificate record that has been uploaded to the Certificates list in the UI or created using certificateControl.createCertificate(options).
 * @governance 10 units
 * @since 2019.2
 */
export function loadCertificate(options: LoadCertificateOptions): Certificate;
/**
 * Locks a certificate record so that it cannot be edited until it is unlocked with certificateControl.unlock(options).
 * @governance 10 units
 * @since 2021.1
 */
export function lock(options: LockOptions): void;
/**
 * Unlocks a certificate record that has been locked with certificateControl.lock(options).
 * @governance 10 units
 * @since 2021.1
 */
export function unlock(options: LockOptions): void;

/** Metadata about a certificate, as returned by certificateControl.findCertificates(options). */
export interface CertificateMetadata {
  /** The ID of the certificate. */
  id: string;
  [key: string]: unknown;
}

interface LoadCertificateOptions {
  /**
   * The script ID or internal ID for the certificate you want to load.
   * You can view the ID of a certificate from the Digital Certificates list at Setup > Company > Certificates.
   */
  scriptId: string;
}

interface LockOptions {
  /**
   * The script ID or internal ID for the certificate.
   * You can view the ID of a certificate from the Digital Certificates list at Setup > Company > Certificates.
   */
  id: string;
}

interface CreateCertificateOptions {
  /** A File Object Members object. The file must already be uploaded to the File Cabinet. */
  file: File;
  /** If applicable, the password associated with your digital certificate. The script ID of an API secret can be accepted. */
  password?: string;
  /** The desired script ID of the certificate record. The script ID is automatically prefixed with 'custcertificate'. */
  scriptId?: string;
  /** Description of the certificate record. */
  description?: string;
  /** The internal ID of subsidiaries associated with the certificate in either number or string format. */
  subsidiaries?: (string|number)[];
  /** The internal ID of employees selected in the Restricted to Employees field for a certificate. */
  restrictions?: (string|number)[];
  /** The internal ID of employees selected in the Copy Employees field on the certificate record. */
  notifications?: (string|number)[];
  /** The name of the certificate record. */
  name: string;
  /** The setting for the Expiration Reminder : Week checkbox. */
  weekReminder?: boolean;
  /** The setting for the Expiration Reminder : Month checkbox. */
  monthReminder?: boolean;
  /** The setting for the Expiration Reminder : 3 Months checkbox. */
  threeMonthsReminder?: boolean;
}

interface DeleteCertificateOptions {
  /**
   * The script ID or internal ID for the certificate you want to delete.
   * You can view the ID of a certificate from the Digital Certificates list at Setup > Company > Certificates.
   */
  scriptId: string;
}

interface FindCertificatesOptions {
  /** The internal ID of the subsidiary. */
  subsidiary?: number;
  /** The certificate file type. You can use the certificateControl.Type enum with this parameter. */
  type?: Type | string;
  /**
   * The internal ID of an employee selected in the Restrict to Employees field.
   * @since 2019.2
   */
  restriction?: number;
  /**
   * The internal ID of an employee selected in the Copy Employees field.
   * @since 2019.2
   */
  notification?: number;
  /**
   * The certificate name. Oracle says you can use the certificateControl.Operator enum with this parameter, but does not document how the operator is passed.
   * @since 2019.2
   */
  name?: string;
  /**
   * The certificate description. Oracle says you can use the certificateControl.Operator enum with this parameter, but does not document how the operator is passed.
   * @since 2019.2
   */
  description?: string;
  /**
   * Script name to be used for searching for certificates with restrictions to a particular script.
   * @since 2022.1
   */
  scriptRestriction?: string;
}

interface FindUsagesOptions {
  /** The start date for your audit trail search */
  from?: Date;
  /** The end date for your audit trail search */
  to?: Date;
  /** The script ID of the certificate record. */
  id?: string;
  /** The certificateControl.Operation performed with the digital certificate. */
  operation?: Operation | string;
  /** The script ID of a script record that used a certificate record. */
  script?: number;
  /** The script ID of a script deployment that used a certificate record. */
  deploy?: number;
  /** The internal ID of the employee who performed the operation. */
  entity?: number;
}

/**
 * Holds the values for the operation when searching for certificates with certificateControl.findUsages(options).
 * @since 2019.2
 */
export enum Operation {
  CONNECT,
  DELETE,
  FIND,
  GET,
  HEAD,
  POST,
  PUT,
  SIGN_STRING,
  SIGN_XML,
  VERIFY_STRING,
  VERIFY_XML
}

/**
 * Holds the values for search operators to use with the name and description parameters of certificateControl.findCertificates(options).
 * @since 2019.2
 */
export enum Operator {
  CONTAINS,
  ENDS_WITH,
  EQUALS,
  STARTS_WITH
}

/**
 * Holds the values for the certificate file type to use with the type parameter of certificateControl.findCertificates(options).
 * @since 2019.1
 */
export enum Type {
  PFX,
  P12,
  PEM
}
