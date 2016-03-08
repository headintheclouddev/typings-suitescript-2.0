/// <reference path="../typings/tsd.d.ts" />

interface RecordSaveFunction {
    (options?: SubmitConfig): number;
    promise(options?:SubmitConfig): Promise<void>;
}

interface AttachOptions {
    record: AttachRecordOptions;
    to: AttachRecordOptions;
    attributes?: Object;
}

interface AttachRecordOptions {
    type: string;
    id: number|string;
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
    record: AttachRecordOptions;
    from: AttachRecordOptions;
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

interface InsertLineOptions {
    sublistId: string,
    line: number,
    ignoreRecalc?: boolean // Default is false
}

interface SelectLineOptions {
    sublistId: string;
    line: number;
}

interface SetCurrentSublistValueOptions {
    sublistId: string;
    fieldId: string;
    value: boolean|string|number;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetCurrentSublistTextOptions {
    sublistId: string;
    fieldId: string;
    text: number|Date|string|string[];
    ignoreFieldChange?: boolean; // Default false
}

interface SetFieldOptions {
    fieldId: string;
    value: any;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetFieldTextOptions {
    fieldId: string;
    text: any;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetSublistTextOptions {
    sublistId: string;
    fieldId: string;
    line: number;
    text: string;
}

interface SetSublistValueOptions {
    sublistId: string;
    fieldId: string;
    line: number;
    value: boolean|number|Date|string|string[];
}

interface Field {
    getSelectOptions(options: GetSelectOptionsOpts): Object[];
    toString(): string;
    label: string;
    id: string;
    sublistId: string;
    type: string;
    isMandatory: boolean;
    isDisabled: boolean;
    isPopup: boolean;
    isDisplay: boolean;
    isVisible: boolean;
    isReadOnly: boolean;
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
    getSublistField(options: GetSublistValueOptions): Field;
    getSublistFields(options: RecordGetLineCountOptions): string[];
    getSublistSubrecord(options: GetSublistValueOptions): Record;
    getSublistText(options: GetSublistValueOptions): string;
    getSublistValue(options: GetSublistValueOptions): string;
    getSublistValue(sublistId: string, fieldId: string, line: number): string;
    getSubRecord(options: GetFieldOptions): Record;
    getText(options:GetFieldOptions): string;
    getText(fieldId:string): string;
    getValue(options:GetFieldOptions): Date|number|string|string[]|boolean;
    getValue(fieldId:string): string;
    insertLine(options: InsertLineOptions): Record;
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): Record;
    removeLine(options: InsertLineOptions): Record;
    removeSublistSubrecord(options: GetSublistValueOptions): Record;
    removeSubrecord(options: RecordGetLineCountOptions): Record;
    save: RecordSaveFunction;
    selectLine(options: SelectLineOptions): Record;
    selectLine(sublistId: string, line: number): Record;
    selectNewLine(options: RecordGetLineCountOptions): Record;
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): Record;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: string|number): Record;
    setCurrentSublistText(options: SetCurrentSublistTextOptions): Record;
    setSublistText(options: SetSublistTextOptions): Record;
    setSublistValue(options: SetSublistValueOptions): Record;
    setText(options: SetFieldTextOptions): Record;
    setText(fieldId: string, value: string): Record;
    setValue(options: SetFieldOptions): Record;
    setValue(fieldId: string, value: string): Record;
    toString(): string;
    id: string;
    isDynamic: boolean;
    type: string;
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
/**
 * The 'value' parameter in this function is an object with matching properties and values.
 * ex.: value: {'name': 'Bob', 'department': '12'}
 */
interface SubmitFieldsFunction {
    (options: SubmitFieldsOptions): number;
    promise(options: SubmitFieldsOptions): Promise<number>;
}

interface RecordAttachFunction {
    (options: AttachOptions): void;
    promise(options: AttachOptions): Promise<void>;
}

interface RecordCopyFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
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

interface RecordDetachFunction {
    (options: DetachOptions): void;
    promise(options: DetachOptions): Promise<void>;
}

interface RecordLoadFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
}

interface RecordDeleteFunction {
    (options: RecordDeleteOptions): void;
    promise(options: RecordDeleteOptions): Promise<void>;
}

interface RecordTransformFunction {
    (options: RecordTransformOptions): Record;
    promise(options: RecordTransformOptions): Promise<Record>;
}

interface RecordTransformOptions {
    fromType: string; // Documented as just "type" but that's wrong.
    fromId: number; // Documented as just "id" but that's wrong.
    toType: string;
    isDynamic?: boolean;
    defaultValues?: Object;
}

interface RecordModule {
    attach: RecordAttachFunction;
    copy: RecordCopyFunction;
    create: RecordCreateFunction;
    load: RecordLoadFunction;
    delete: RecordDeleteFunction;
    detach: RecordDetachFunction;
    submitFields: SubmitFieldsFunction;
    transform: RecordTransformFunction;
    Type: RecordTypes;
}

declare module N {
    var record: RecordModule;
}

declare module 'N/record' {
    export = N.record;
}
