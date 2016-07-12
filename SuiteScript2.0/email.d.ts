/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface EmailModule {
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

declare var _: EmailModule;
export = _;
