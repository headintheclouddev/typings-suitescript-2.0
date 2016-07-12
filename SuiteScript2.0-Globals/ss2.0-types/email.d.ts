/// <reference path="../typings/index.d.ts" />
/// <reference path="file.d.ts" />

interface SendOptions {
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
