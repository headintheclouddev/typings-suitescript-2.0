/// <reference path="../typings/tsd.d.ts" />

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
}

declare module N {
    var render: RenderModule;
}

declare module 'N/render' {
    export = N.render;
}
