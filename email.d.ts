import {NSFile} from './file';

export interface SendOptions {
    author: number;
    recipients: number[] | string[];
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    attachments?: NSFile[];
    relatedRecords?: RelatedRecordTypes;
    isInternalOnly?: boolean;
}

export interface RelatedRecordTypes {
    transactionId?: number;
    activityId?: number;
    entityId?: number;
    customRecord?: CustomRecordObject;
}

export interface CustomRecordObject {
    id: number;
    recordType: string;
}

export interface SendCampaignOptions {
    campaignEventId: number;
    recipientId: number;
}

export interface EmailSendFunction {
    (options: SendOptions): void;
    promise(options: SendOptions): Promise<void>;
}

export interface EmailSendCampaignFunction {
    (options: SendCampaignOptions): number;
    promise(options: SendCampaignOptions): Promise<number>;
}

export interface EmailModule {
    /**
     * Method used to send transactional email asynchronously and receive bounceback notifications if the email is not successfully delivered.
     */
    send: EmailSendFunction;
    /**
     * This method is used to send bulk email when a bounceback notification is not required.
     */
    sendBulk: EmailSendFunction;
    /**
     * Method used to send a single “on-demand” campaign email to a specified recipient and return a campaign response ID to track the email.
     * Email (campaignemail) sublists are not supported. The campaign must use a Lead Nurturing (campaigndrip) sublist.
     */
    sendCampaign: EmailSendCampaignFunction;
}

export default EmailModule;