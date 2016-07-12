/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface RenderModule {
    bom(options: BOMOptions): NSFile;
    create(): TemplateRenderer;
    mergeEmail(options: MergeEmailOptions): EmailMergeResult;
    packingSlip(options: PackingSlipOptions): NSFile;
    pickingTicket(options: PickingTicketOptions): NSFile;
    statement(options: StatementOptions): NSFile;
    transaction(options: TransactionOptions): NSFile;
    xmlToPdf(options: XMLToPDFOptions): NSFile;
    DataSource: DataSources;
    PrintMode: PrintModes;
}

export default RenderModule;
