/// <reference path="../typings/tsd.d.ts" />

interface RecordSaveFunction {
    (options?:SubmitConfig): void;
    promise(options?:SubmitConfig): Promise<void>;
}

interface AttachOptions {
  record: Record;
  // Need record type and Id?
  to: Record;  
  // Need record type and id?
  attributes: Object;
}

interface CancelCommitLineOptions {
    sublistId: string;
}

interface CopyLoadOptions {
    type: string;
    id: number|string;
    isDynamic?: boolean;
    defaultValue?: Object;
}

interface DetachOptions {
    record: Record;
    // Need type and id?
    from: Record;
    // Need type and id?
    attributes?: Object;
}

interface FindSublistLineWithValueOptions {
    sublistId: string;
    fieldId: string;
    value: any;
}

interface GetCurrentSublistValueOptions {
    sublistId: string;
    fieldId: string;
}

interface GetFieldOptions {
    fieldId: string;
}

interface RecordGetLineCountOptions {
    sublistId: string;
}

interface GetSublistValueOptions {
    sublistId: string;
    fieldId: string;
    line: number;
}

interface SelectLineOptions {
    sublistId: string;
    line: number;
}

interface SetCurrentSublistValueOptions {
    sublistId: string;
    fieldId: string;
    value: string|number;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetFieldOptions {
    fieldId: string;
    value: any;
    ignoreFieldChange?: boolean;
}

interface Field {
  
}

interface Record {
    cancelLine(options: CancelCommitLineOptions): void;
    cancelLine(sublistId: string): void;
    commitLine(options: CancelCommitLineOptions): Record;
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): string;
    getCurrentSublistValue(sublistId: string, fieldId: string): string;
    getField(options: GetFieldOptions): Field;
    getFields(): string[];
    getLineCount(options: RecordGetLineCountOptions): number;
    getLineCount(sublistId: string): number;
    // Todo: pick up here in defining stuff
    getSublistValue(options: GetSublistValueOptions): string;
    getSublistValue(sublistId: string, fieldId: string, line: number): string;
    getText(options:GetFieldOptions): string;
    getText(fieldId:string): string;
    getValue(options:GetFieldOptions): Date;
    getValue(options:GetFieldOptions): number|string|string[];
    getValue(fieldId:string): string;
    selectLine(options: SelectLineOptions): void;
    selectLine(sublistId: string, line: number): void;
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): void;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: string|number): void;
    setText(options:SetFieldOptions): void;
    setText(fieldId:string, value:string): void;
    setValue(options:SetFieldOptions): void;
    setValue(fieldId:string, value:string): void;
    save: RecordSaveFunction;
    id: string;
    isDynamic: boolean;
    type: RecordTypes;
}

interface RecordTypes {
    ACCOUNT: string;
    ACCOUNTING_BOOK: string;
    ADDRESS: string;
    AMORTIZATION_SCHEDULE: string;
    AMORTIZATION_TEMPLATE: string;
    ACTIVITY: string;
    ASSEMBLY_BUILD: string;
    ASSEMBLY_UNBUILD: string;
    BILLING_CLASS: string;
    BILLING_SCHEDULE: string;
    BIN: string;
    BIN_PUTAWAY_WORKSHEET: string;
    BIN_TRANSFER: string;
    BLANKET_PURCHASE_ORDER: string;
    BUILD_ASSEMBLY: string;
    CAMPAIGN: string;
    CAMPAIGN_TEMPLATE: string;
    CASE: string;
    CASH_REFUND: string;
    CASH_SALE: string;
    CHARGE: string;
    CHECK: string;
    CLASS: string;
    COMPETITOR: string;
    CONTACT: string;
    COUPON_CODE: string;
    CREDIT_MEMO: string;
    CURRENCY: string;
    CUSTOMER: string;
    CUSTOMER_CATEGORY: string;
    CUSTOMER_DEPOSIT: string;
    CUSTOMER_PAYMENT: string;
    CUSTOMER_REFUND: string;
    CUSTOM_LIST: string;
    DEPARTMENT: string;
    DEPOSIT: string;
    DEPOSIT_APPLICATION: string;
    DESCRIPTION: string;
    DISCOUNT: string;
    DOWNLOAD_ITEM: string;
    EMAIL_TEMPLATE: string;
    EMPLOYEE: string;
    ENTITY: string;
    ESTIMATE_QUOTE: string;
    EVENT: string;
    EXPENSE_CATEGORY: string;
    EXPENSE_REPORT: string;
    FOLDER: string;
    GIFT_CERTIFICATE: string;
    GIFT_CERTIFICATE_ITEM: string;
    GLOBAL_ACCOUNT_MAPPING: string;
    GROUP: string;
    INTERCOMPANY_JOURNAL_ENTRY: string;
    INVENTORY_ADJUSTMENT: string;
    INVENTORY_COST_REVALUATION: string;
    INVENTORY_COUNT: string;
    INVENTORY_DETAIL: string;
    INVENTORY_ITEM: string;
    INVENTORY_NUMBER: string;
    INVENTORY_TRANSFER: string;
    INVOICE: string;
    ISSUE: string;
    ITEM_ACCOUNT_MAPPING: string;
    ITEM_SEARCH: string;
    ITEM_DEMAND_PLAN: string;
    ITEM_FULFILLMENT: string;
    ITEM_GROUP: string;
    ITEM_RECEIPT: string;
    ITEM_REVISION: string;
    ITEM_SUPPLY_PLAN: string;
    JOURNAL_ENTRY: string;
    KIT: string;
    LANDED_COST: string;
    LEAD: string;
    LOCATION: string;
    LOT_NUMBERED_ASSEMBLY_ITEM: string;
    LOT_NUMBERED_INVENTORY_ITEM: string;
    MANUFACTURING_COST_TEMPLATE: string;
    MANUFACTURING_PLANNED_TIME: string;
    MANUFACTURING_OPERATION_TASK: string;
    MANUFACTURING_ROUTING: string;
    MARKUP: string;
    MESSAGE: string;
    MULTIBOOK_ACCOUNTING_TRANSACTION: string;
    NEXUS: string;
    NON_INVENTORY_PART: string;
    NOTE: string;
    OPPORTUNITY: string;
    OTHER_CHARGE_ITEM: string;
    OTHER_NAME: string;
    PARTNER: string;
    PAYCHECK_JOURNAL: string;
    PAYMENT: string;
    PAYROLL_ITEM: string;
    PHONE_CALL: string;
    PRICE_LEVEL: string;
    PROJECT_JOB: string;
    PROJECT_EXPENSE_TYPE: string;
    PROJECT_TASK: string;
    PROMOTION: string;
    PROSPECT: string;
    PURCHASE_CONTRACT: string;
    PURCHASE_ORDER: string;
    REALLOCATE_ITEMS: string;
    REQUISITION: string;
    RESOURCE_ALLOCATION: string;
    RETURN_AUTHORIZATION: string;
    REVENUE_COMMITMENT: string;
    REVENUE_COMMITMENT_REVERSAL: string;
    REVENUE_RECOGNITION_SCHEDULE: string;
    REVENUE_RECOGNITION_TEMPLATE: string;
    SALES_ORDER: string;
    SALES_TAX_ITEM: string;
    SCHEDULED_SCRIPT_INSTANCE: string;
    SERIALIZED_ASSEMBLY_ITEM: string;
    SERIALIZED_INVENTORY_ITEM: string;
    SERVICE: string;
    SOLUTION: string;
    STATISTICAL_JOURNAL_ENTRY: string;
    SUBSIDIARY: string;
    SUBTOTAL: string;
    TASK: string;
    TAX_CONTROL_ACCOUNT: string;
    TAX_GROUP: string;
    TAX_PERIOD: string;
    TAX_TYPE: string;
    TERM: string;
    TIME: string;
    TIME_ENTRY: string;
    TIMESHEET: string;
    TOPIC: string;
    TRANSACTION_SEARCH: string;
    TRANSFER_ORDER: string;
    UNIT_OF_MEASURE: string;
    VENDOR: string;
    VENDOR_BILL: string;
    VENDOR_CATEGORY: string;
    VENDOR_CREDIT: string;
    VENDOR_PAYMENT: string;
    VENDOR_RETURN_AUTHORIZATION: string;
    WEB_SITE_SETUP: string;
    WORK_ORDER: string;
    WORK_ORDER_CLOSE: string;
    WORK_ORDER_COMPLETION: string;
    WORK_ORDER_ISSUE: string;
}

interface SubmitConfig {
    enableSourcing?: boolean;
    disableTriggers?: boolean;
    ignoreMandatoryFields?: boolean;
}

interface SubmitFieldsOptions {
    type: string;
    id: string|number;
    values: any;
    options?: SubmitConfig;
    defaultValues?: Object;
}

interface SubmitFieldsFunction {
    (options: SubmitFieldsOptions): number;
    promise(options: SubmitFieldsOptions): Promise<number>;
}

interface RecordCreateOptions {
    type: string;
    isDynamic?: boolean;
    defaultValue?: Object;
}

interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    promise(options: RecordCreateOptions): Promise<Record>;
}

interface RecordDeleteOptions {
    type: string;
    id: (string|number);
}

interface RecordLoadFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
}

interface RecordDeleteFunction {
    (options:RecordDeleteOptions): void;
    promise(options: RecordDeleteOptions): Promise<void>;
}

interface RecordTransformOptions {
    type: string;
    id: number;
    toType: string;
    isDynamic?: boolean;
    defaultValues?: Object;
}

interface RecordModule {
    attach(options: AttachOptions): void;
    copy(options: CopyLoadOptions): Record;
    create: RecordCreateFunction;
    load: RecordLoadFunction;
    delete: RecordDeleteFunction;
    detach(options: DetachOptions): void;
    submitFields: SubmitFieldsFunction;
    transform(options: RecordTransformOptions): Record;
    Type: RecordTypes;
}

declare module N {
    var record:RecordModule;
}

declare module 'N/record' {
    export = N.record;
}
