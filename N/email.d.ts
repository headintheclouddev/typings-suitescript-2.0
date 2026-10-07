/**
 * Use the N/email module to send email messages from within NetSuite. You can use the N/email module to send regular, bulk, and campaign email.
 *
 * Supported script types: Client and server scripts (the promise versions are client scripts only).
 */

import type {File} from './file';

interface SendOptions {
    /**
     * Internal ID of the email sender.
     * To send email on another user's behalf, the role executing the script must have the Vicarious Email (ADMI_VICARIOUS_EMAIL) permission.
     */
    author: number;
    /**
     * The internal ID or email address of the recipient.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     * Note: Only the first recipient displays on the Communication tab (under the Recipient column).
     */
    recipients: number | string | (number | string)[] | readonly (number | string)[];
    /**
     * The email address that appears in the reply-to header when an email is sent out.
     * You can use either a single external email address or a generic email address created by the Email Capture Plug-in.
     */
    replyTo?: string;
    /**
     * The internal ID or email address of the secondary recipient to copy.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     */
    cc?: (number | string)[] | readonly (number | string)[];
    /**
     * The internal ID or email address of the secondary recipient to blind copy.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     */
    bcc?: (number | string)[] | readonly (number | string)[];
    /**
     * Subject of the outgoing message.
     */
    subject: string;
    /**
     * Contents of the outgoing message.
     * If HTML tags are present, the message is formatted as HTML. Otherwise, the message is formatted in plain text.
     * Escape untrusted values before including them in an HTML body.
     */
    body: string;
    /**
     * The email file attachments. You can send multiple attachments of any media type.
     * An individual attachment must not exceed 10MB and the total message size must be 15MB or less.
     * Note: Supported for server scripts only.
     */
    attachments?: File[] | readonly File[];
    /**
     * Object that contains key/value pairs to associate (attach) the Message record with related records (transaction, activity, entity, and custom records).
     */
    relatedRecords?: RelatedRecordTypes;
    /**
     * If true, the Message record is not visible to an external Entity (for example, a customer or contact). Default is false.
     */
    isInternalOnly?: boolean;
}

/**
 * The NetSuite records to which the email Message record should be attached.
 * For email.send(options), customRecord, transactionId, and activityId are mutually exclusive; only entityId is compatible with the other records.
 */
interface RelatedRecordTypes {
    /**
     * The Transaction record to attach the Message record to. Use for transaction and opportunity record types.
     */
    transactionId?: number;
    /**
     * The Activity record to attach the Message record to. Use for Case and Campaign record types.
     */
    activityId?: number;
    /**
     * The Entity record to attach the Message record to. Use for all Entity record types (for example, customer, contact).
     */
    entityId?: number;
    /**
     * The custom record to attach the Message record to. For custom records you must specify both the record ID and the record type ID.
     */
    customRecord?: CustomRecordObject;
}

interface CustomRecordObject {
    /**
     * The instance ID for the custom record to attach the Message record to.
     */
    id: number;
    /**
     * The integer ID of the custom record type to attach the Message record to. This ID is shown as part of the record's URL (for example, /custrecordentry.nl?rectype=2&id=56).
     */
    recordType: string;
}

interface SendCampaignOptions {
    /**
     * The internal ID of the campaign event. The campaign must use a Lead Nurturing (campaigndrip) sublist.
     */
    campaignEventId: number;
    /**
     * The internal ID of the recipient. The recipient's record must contain an email address.
     */
    recipientId: number;
}

interface EmailSendFunction {
    (options: SendOptions): void;
    /**
     * Sends email asynchronously to an individual or group of recipients and receives bounceback notifications.
     * The parameters and errors thrown are the same as those for email.send(options).
     * Supported script types: Client scripts.
     * @governance 20 units
     * @since 2015.2
     */
    promise(options: SendOptions): Promise<void>;
}

interface EmailSendBulkFunction {
    (options: SendOptions): void;
    /**
     * Sends bulk email asynchronously (for use when a bounceback notification is not required).
     * The parameters and errors thrown are the same as those for email.sendBulk(options).
     * Supported script types: Client scripts.
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SendOptions): Promise<void>;
}

interface EmailSendCampaignFunction {
    (options: SendCampaignOptions): number;
    /**
     * Sends a single 'on-demand' campaign email asynchronously to a specified recipient and returns a campaign response ID to track the email.
     * If the email fails to send, the value returned is -1.
     * The parameters and errors thrown are the same as those for email.sendCampaignEvent(options).
     * Supported script types: Client scripts. Note: Oracle's N/email members table lists client and server scripts, but the method page lists client scripts only.
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SendCampaignOptions): Promise<number>;
}

/**
 * Sends transactional email to an individual or group of recipients and receives bounceback notifications.
 * A maximum of 10 recipients (recipient + cc + bcc) is allowed. The total message size (including attachments) must be 15MB or less.
 * The size of each attachment cannot exceed 10MB.
 * @throws {SuiteScriptError} SSS_AUTHOR_MUST_BE_EMPLOYEE if the author internal ID or email address doesn't match an employee.
 * @throws {SuiteScriptError} SSS_INVALID_TO_EMAIL if a recipient's email address is invalid.
 * @throws {SuiteScriptError} SSS_INVALID_CC_EMAIL if an email address in options.cc is invalid.
 * @throws {SuiteScriptError} SSS_INVALID_BCC_EMAIL if an email address in options.bcc is invalid.
 * @throws {SuiteScriptError} SSS_MAXIMUM_NUMBER_RECIPIENTS_EXCEEDED if the total number of recipients exceeds 10.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if a parameter's type is incorrect.
 * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if an attachment exceeds the 10 MB file size limit.
 * @throws {SuiteScriptError} ATTACH_SIZE_EXCEEDED if the size of the attachments exceeds the limit.
 * @governance 20 units
 * @since 2015.2
 */
export const send: EmailSendFunction;
/**
 * Sends bulk email (for use when a bounceback notification is not required). This method normally uses a bulk email server;
 * use email.send(options) to increase the successful delivery rate.
 * The total message size (including attachments) must be 15MB or less. The size of each attachment cannot exceed 10MB.
 * @throws {SuiteScriptError} SSS_AUTHOR_MUST_BE_EMPLOYEE if the author internal ID or email address doesn't match an employee.
 * @throws {SuiteScriptError} SSS_INVALID_TO_EMAIL if a recipient's email address is invalid.
 * @throws {SuiteScriptError} SSS_INVALID_CC_EMAIL if an email address in options.cc is invalid.
 * @throws {SuiteScriptError} SSS_INVALID_BCC_EMAIL if an email address in options.bcc is invalid.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if a parameter's type is incorrect.
 * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if an attachment exceeds the 10 MB file size limit.
 * @throws {SuiteScriptError} ATTACH_SIZE_EXCEEDED if the size of the attachments exceeds the limit.
 * @governance 10 units
 * @since 2015.2
 */
export const sendBulk: EmailSendBulkFunction;
/**
 * Sends a single 'on-demand' campaign email to a specified recipient and returns a campaign response ID (tracking code) to track the email.
 * If the email fails to send, the value returned is -1.
 * Email (campaignemail) sublists are not supported. The campaign must use a Lead Nurturing (campaigndrip) sublist.
 * Note: Oracle's errors table for this method repeats the email.send(options) errors, including ones for parameters this method doesn't take.
 * @throws {SuiteScriptError} SSS_AUTHOR_MUST_BE_EMPLOYEE if the author internal ID or email address doesn't match an employee.
 * @throws {SuiteScriptError} SSS_INVALID_TO_EMAIL if a recipient's email address is invalid.
 * @throws {SuiteScriptError} SSS_INVALID_CC_EMAIL if an email address in options.cc is invalid.
 * @throws {SuiteScriptError} SSS_INVALID_BCC_EMAIL if an email address in options.bcc is invalid.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if a parameter's type is incorrect.
 * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if an attachment exceeds the 10 MB file size limit.
 * @throws {SuiteScriptError} ATTACH_SIZE_EXCEEDED if the size of the attachments exceeds the limit.
 * @governance 10 units
 * @since 2015.2
 */
export const sendCampaignEvent: EmailSendCampaignFunction;
