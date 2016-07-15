/// <reference path="typings/index.d.ts" />

import {File} from './file';

interface SendOptions {
    author: number;
    recipients: number[] | string[];
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    attachments?: File[];
    relatedRecords?: RelatedRecordTypes;
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
