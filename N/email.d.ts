import type {File} from './file';

interface SendOptions {
    /**
     * Internal ID of the email sender.
     */
    author: number;
    /**
     * The internal ID or email address of the recipient.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     * Note: Only the first recipient displays on the Communication tab (under the Recipient column).
     */
    recipients: number|string|(number|string)[]|readonly (number|string)[];
    /**
     * The email address that appears in the reply-to header when an email is sent out.
     */
    replyTo?: string;
    /**
     * The internal ID or email address of the secondary recipient to copy.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     */
    cc?: (number|string)[]|readonly (number|string)[];
    /**
     * The internal ID or email address of the secondary recipient to blind copy.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     */
    bcc?: (number|string)[]|readonly (number|string)[];
    /**
     * Subject of the outgoing message
     */
    subject: string;
    /**
     * Contents of the email.
     */
    body: string;
    /**
     * The email file attachments.
     * An individual attachment must not exceed 5MB and the total message size must be 15MB or less.
     * Note: Supported for server-side scripts only.
     */
    attachments?: File[]|readonly File[];
    /**
     * Object that contains key/value pairs to associate the Message record with related records (including custom records).
     */
    relatedRecords?: RelatedRecordTypes;
    /**
     * If true, the Message record is not visible to an external Entity (for example, a customer or contact). Default is false.
     */
    isInternalOnly?: boolean;
}

interface RelatedRecordTypes {
    /**
     * The Transaction record(s) attached to the Message record. Use for transaction and opportunity record types.
     */
    transactionId?: number;
    /**
     * The Activity record(s) attached to the Email Message record. Use for Case and Campaign record types.
     */
    activityId?: number;
    /**
     * The Entity record(s) attached to the Email Message record. Use for all Entity record types (for example, customer, contact).
     */
    entityId?: number;
    /**
     * The custom record(s) attached to the Email Message record. For custom records you must specify both the record ID and the record type ID.
     */
    customRecord?: CustomRecordObject;
}

interface CustomRecordObject {
    /**
     * The instance ID for the custom record attached to the Email Message record.
     */
    id: number;
    /**
     * The custom record type attached to the Message record.
     */
    recordType: string;
}

interface SendCampaignOptions {
    /**
     * The internal ID of the campaign event.
     */
    campaignEventId: number;
    /**
     * The internal ID of the recipient.
     */
    recipientId: number;
}

interface EmailSendFunction {
    (options: SendOptions): void;
    /**
     * @governance 20 units
     * @since 2015.2
     */
    promise(options: SendOptions): Promise<void>;
}

interface EmailSendCampaignFunction {
    (options: SendCampaignOptions): number;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SendCampaignOptions): Promise<number>;
}

/**
 * Method used to send transactional email asynchronously and receive bounceback notifications if the email is not successfully delivered.
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
 * This method is used to send bulk email when a bounceback notification is not required.
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
export const sendBulk: EmailSendFunction;
/**
 * Method used to send a single “on-demand” campaign email to a specified recipient and return a campaign response ID to track the email.
 * Email (campaignemail) sublists are not supported. The campaign must use a Lead Nurturing (campaigndrip) sublist.
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
