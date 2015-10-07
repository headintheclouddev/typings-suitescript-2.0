/// <reference path="../typings/tsd.d.ts" />

interface SendOptions {
    author: number;
    recipients: number|string[];
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

interface EmailModule {
    send: (options: SendOptions) => void;
    sendBulk: (options: SendOptions) => void;
    sendCampaign: (options: SendCampaignOptions) => number;
}

declare module N {
    var email: EmailModule;
}

declare module 'N/email' {
    export = N.email;
}
