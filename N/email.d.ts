/// <reference path="typings/index.d.ts" />

import {File} from './file';

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
    recipients: number[]|string[];
    /**
     * The email address that appears in the reply-to header when an email is sent out.
     */
    replyTo?: string;
    /**
     * The internal ID or email address of the secondary recipient to copy.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     */
    cc?: string[]|number[];
    /**
     * The internal ID or email address of the secondary recipient to blind copy.
     * For multiple recipients, use an array of internal IDs or email addresses. You can use an array that contains a combination of internal IDs and email addresses.
     * A maximum of 10 recipients (recipient + cc + bcc) is allowed.
     */
    bcc?: string[]|number[];
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
    attachments?: File[];
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
    transactionId?: number;
    activityId?: number;
    entityId?: number;
    customRecord?: CustomRecordObject;
}

interface CustomRecordObject {
    id: number;
    recordType: string;
}

interface SendCampaignOptions {
    campaignEventId: number;
    recipientId: number;
}

interface EmailSendFunction {
    (options: SendOptions): void;
    promise(options: SendOptions): Promise<void>;
}

interface EmailSendCampaignFunction {
    (options: SendCampaignOptions): number;
    promise(options: SendCampaignOptions): Promise<number>;
}

/**
 * Method used to send transactional email asynchronously and receive bounceback notifications if the email is not successfully delivered.
 */
export var send: EmailSendFunction;
/**
 * This method is used to send bulk email when a bounceback notification is not required.
 */
export var sendBulk: EmailSendFunction;
/**
 * Method used to send a single “on-demand” campaign email to a specified recipient and return a campaign response ID to track the email.
 * Email (campaignemail) sublists are not supported. The campaign must use a Lead Nurturing (campaigndrip) sublist.
 */
export var sendCampaign: EmailSendCampaignFunction;
