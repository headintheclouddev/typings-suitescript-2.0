import file = require('./file');

/**
 * The N/certificateControl module enables scripting access to the Digital Certificates list found in the UI at Setup > Company > Certificates.
 * You can use this module to find, create, update, read and delete certificates records. For more information, see Digital Signing and Uploading Digital Certificates in Help.
 * In order to access this module, you must use the Execute As Role field on the script deployment record. Select either the Administrator role or a custom role with the Certificate Access permission.
 */

export interface Certificate {
  /** Saves a certificate record object. */
  save: () => Certificate;
  /** Describes the certificate record. */
  description: string;
  /** The File Object Members object of the certificate uploaded to the certificate record. */
  file: file.File;
  /** The name of the certificate record. */
  name: string;
  /**
   * Indicates the setting of the Month box for Expiration Reminders on the certificate record.
   * This property is set to true if the Month box is checked and email reminders are sent to account administrators one month before the certificate expires.
   * If the Copy Employees box is also checked, selected employees are copied on the reminder emails.
   */
  monthReminder: boolean;
  /**
   * The internal IDs of the employees copied on expiration notification email.
   * The values for this property are found in the Copy Employees field of the Audience tab on the certificate record.
   * When you create or edit a certificate object with values for this property, you also check the Copy Employees box for the certificate record.
   */
  notifications: number[];
  /**
   * The password for the digital certificate (write-only).
   * If the certificate file is password-protected, you can store the password with the certificate record.
   * If the certificate is not password-protected, enter an empty string.
   */
  password: string;
  /**
   * The internal IDs of the employees selected in the Restrict to Employees field of the certificate record.
   * If you set this property with an employee internal ID, you check the Restrict to Employees box and select that employee.
   * Employees selected must also have either the Certificate Management or Certificate Access role permission in order to access the certificate.
   * When the Restrict to Employees box is checked, only Administrators and the employees selected can access the certificate.
   */
  restrictions: number[];
  /** The ID of the certificate record. The script ID for certificate records begins with “custcertificate.” */
  scriptId: string;
  /** The internal IDs of the subsidiaries associated with the certificate record. Subsidiary selections associate a certificate to one or more subsidiaries but do not affect access. */
  subsidiaries: number[];
  /**
   * Indicates the setting of the 3 Months box for Expiration Reminders on the certificate record.
   * This property is set to true if the 3 Months box is checked.
   * When set to true , email reminders are sent to account administrators three months before the certificate expires.
   * If the Copy Employees box is also checked, selected employees are copied on the reminder emails.
   */
  threeMonthsReminder: boolean;
  /**
   * Indicates the setting of the Week box for Expiration Reminders on the certificate record.
   * This property is set to true if the Week box is checked.
   * When set to true , email reminders are sent to account administrators one week before the certificate expires.
   * If the Copy Employees box is also checked, selected employees are copied on the reminder emails.
   */
  weekReminder: boolean;
}

export function createCertificate(options: CreateCertificateOptions): Certificate;
export function findCertificates(options: FindCertificatesOptions): { [key: string]: string };
export function findUsages(options: FindUsagesOptions): Operation[];
export function deleteCertificate(options: DeleteCertificateOptions): string;
export function loadCertificate(options: { scriptId: string }): Certificate;

interface CreateCertificateOptions {
  /** A File Object Members object. The file must already be uploaded to the File Cabinet. */
  file: file.File;
  /** If applicable, the password associated with your digital certificate. */
  password?: string;
  /** The desired script ID of the certificate record. The script ID is automatically prefixed with ‘custcertificate_’ */
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
  subsidiary?: string;
  /** The certificate file type. */
  type?: string;
  /** The internal ID of an employee selected in the Restrict to Employees field. */
  restriction?: number;
  /** The internal ID of an employee selected in the Copy Employees field. */
  notification?: number;
  /** The certificate name. You can use this filter with the certificateControl.Operator enum. */
  name?: string;
  /** The certificate description. You can use this filter with the certificateControl.Operator enum. */
  description?: string;
}

interface FindUsagesOptions {
  /** The start date for your audit trail search */
  from?: Date;
  /** The end date for your audit trail search */
  to?: Date;
  /** The script ID of the certificate record. */
  id?: string;
  /** The certificateControl.Operation performed with the digital certificate. */
  operation?: string;
  /** The script ID of a script record that used a certificate record. */
  script?: number;
  /** The script ID of a script deployment that used a certificate record. */
  deploy?: number;
  /** The internal ID of the employee who performed the operation. */
  entity?: number;
}

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

export enum Operator {
  CONTAINS,
  ENDS_WITH,
  EQUALS,
  STARTS_WITH
}

export enum Type {
  PFX,
  P12,
  PEM
}
