/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./file.d.ts" />

interface PrintModes {
  DEFAULT: string;
  HTML: string;
  PDF: string;
}

interface StatementOptions {
  entityId: number;
  printMode?: string;
  formId?: number;
  startDate?: Date;
  statementDate?: Date;
  TransactionsOnly?: boolean;
}

interface RenderModule {
  statement(options: StatementOptions): NSFile;
  PrintMode: PrintModes;
}

declare module N {
    var render: RenderModule;
}

declare module 'N/render' {
    export = N.render;
}
