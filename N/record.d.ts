/// <reference path="typings/index.d.ts" />

import {Sublist} from './ui/serverWidget';
import {Operator} from './search';

interface RecordSaveFunction {
    (options?: SubmitConfig): number;
    promise(options?: SubmitConfig): Promise<number>;
}

interface AttachOptions {
    /**
     * The record to attach.
     */
    record: AttachRecordOptions;
    /**
     * The record that the options.record gets attached to.
     */
    to: AttachRecordOptions;
    /**
     * The name-value pairs containing attributes for the attachment.
     */
    attributes?: Object;
}

interface AttachRecordOptions {
    /**
     * The type of record to attach.
     */
    type: string;
    /**
     * The internal ID of the record to attach.
     */
    id: number | string;
}

interface CancelCommitLineOptions {
    sublistId: string;
}

interface CopyLoadOptions {
    /**
     * The record type.
     */
    type: string;
    /**
     * The internal ID of the existing record instance in NetSuite.
     */
    id: number;
    /**
     * Determines whether the new record is dynamic. If set to true, the record is created in dynamic mode. If set to false, the record is created in standard mode. By default, this value is false.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in standard mode, the record’s body fields and sublist line items are not sourced, calculated, and validated until the record is saved (submitted) with Record.save(options).
     * - When you work with a record in standard mode, you do not need to set values in any particular order. After submitting the record, NetSuite processes the record’s body fields and sublist line items in the correct order, regardless of the organization of your script.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in dynamic mode, the record’s body fields and sublist line items are sourced, calculated, and validated in real-time. A record in dynamic mode emulates the behavior of a record in the UI.
     * - When you work with a record in dynamic mode, it is important that you set values in the same order you would within the UI. If you fail to do this, your results may not be accurate.
     */
    isDynamic?: boolean;
    /**
     * Name-value pairs containing default values of fields in the new record.
     */
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
    value: FieldValue;
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
    value: FieldValue;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetCurrentSublistTextOptions {
    sublistId: string;
    fieldId: string;
    text: number | Date | string | string[];
    ignoreFieldChange?: boolean; // Default false
}

interface SetFieldOptions {
    fieldId: string;
    value: FieldValue;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetFieldTextOptions {
    fieldId: string;
    text: string;
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
    value: FieldValue;
}

interface GetSelectOptionsOpts {
    filter?: string;
    filteroperator?: Operator;
}

export interface Field {
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

type FieldValue = Date | number | string | string[] | boolean;

/**
 * Almost like a full Record, except without things like save().
 */
export interface ClientCurrentRecord {
    cancelLine(options: CancelCommitLineOptions): void;
    cancelLine(sublistId: string): void;
    commitLine(options: CancelCommitLineOptions): Record;
    findMatrixSublistLineWithValue(options: any): number; // TODO: Document this?
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    getCurrentMatrixSublistValue(options: any): FieldValue; // TODO: Document this?
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    getCurrentSublistSubrecord(options: any): Record; // TODO: Document this?
    getCurrentSublistText(options: GetCurrentSublistValueOptions): string; // TODO: Document this?
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): FieldValue;
    getCurrentSublistValue(sublistId: string, fieldId: string): FieldValue;
    getField(options: GetFieldOptions): Field;
    getLineCount(options: RecordGetLineCountOptions): number;
    getLineCount(sublistId: string): number;
    getMatrixHeaderCount(options: any): number; // TODO: Document this?
    getMatrixHeaderField(options: any): Field;  // TODO: Document this?
    getMatrixHeaderValue(options: any): string; // TODO: Document this?
    getMatrixSublistField(options: any): Field; // TODO: Document this?
    getMatrixSublistValue(options: any): FieldValue; // TODO: Document this?
    getSublist(options: any): Sublist; // TODO: Document this?
    getSublistField(options: GetSublistValueOptions): Field;
    getSublistText(options: GetSublistValueOptions): string;
    getSublistValue(options: GetSublistValueOptions): FieldValue;
    getSublistValue(sublistId: string, fieldId: string, line: number): FieldValue;
    getSubRecord(options: GetFieldOptions): Record;
    getText(options: GetFieldOptions): string | string[];
    getText(fieldId: string): string | string[];
    getValue(options: GetFieldOptions): FieldValue;
    getValue(fieldId: string): FieldValue;
    hasCurrentSublistSubrecord(options: any): boolean; // TODO: Document this?
    hasSublistSubrecord(options: any): boolean; // TODO: Document this?
    hasSubrecord(options: any): boolean; // TODO: Document this?
    id: string;
    insertLine(options: InsertLineOptions): void;
    isDynamic: boolean;
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): void;
    removeLine(options: InsertLineOptions): void;
    removeSubrecord(options: RecordGetLineCountOptions): void;
    selectLine(options: SelectLineOptions): void;
    selectLine(sublistId: string, line: number): void;
    selectNewLine(options: RecordGetLineCountOptions): void;
    setCurrentMatrixSublistValue(options: any): void; // TODO: Document this?
    setCurrentSublistText(options: SetCurrentSublistTextOptions): void;
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): void;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: FieldValue): void;
    setMatrixHeaderValue(options: any): void; // TODO: Document this?
    setMatrixSublistValue(options: any): void; // TODO: Document this?
    setText(options: SetFieldTextOptions): void;
    setText(fieldId: string, value: string): void;
    setValue(options: SetFieldOptions): void;
    setValue(fieldId: string, value: FieldValue): void;
    type: string;
}

//Exported for other modules to be able to consume this type
export interface Record extends ClientCurrentRecord {
    getFields(): string[];
    getSublistFields(options: RecordGetLineCountOptions): string[];
    getSublistSubrecord(options: GetSublistValueOptions): Record;
    removeSublistSubrecord(options: GetSublistValueOptions): Record;
    save: RecordSaveFunction;
    setSublistText(options: SetSublistTextOptions): Record;
    setSublistValue(options: SetSublistValueOptions): Record;
    toString(): string;
}

interface SubmitConfig {
    enableSourcing?: boolean;
    disableTriggers?: boolean;
    ignoreMandatoryFields?: boolean;
}

interface SubmitFieldsOptions {
    type: string;
    id: string | number;
    values: {[fieldId:string]: FieldValue};
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
    /**
     * The record type.
     */
    type: string;
    /**
     * Determines whether the new record is dynamic. If set to true, the record is created in dynamic mode. If set to false, the record is created in standard mode. By default, this value is false.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in standard mode, the record’s body fields and sublist line items are not sourced, calculated, and validated until the record is saved (submitted) with Record.save(options).
     * - When you work with a record in standard mode, you do not need to set values in any particular order. After submitting the record, NetSuite processes the record’s body fields and sublist line items in the correct order, regardless of the organization of your script.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in dynamic mode, the record’s body fields and sublist line items are sourced, calculated, and validated in real-time. A record in dynamic mode emulates the behavior of a record in the UI.
     * - When you work with a record in dynamic mode, it is important that you set values in the same order you would within the UI. If you fail to do this, your results may not be accurate.
     */
    isDynamic?: boolean;
    /**
     * Name-value pairs containing default values of fields in the new record.
     */
    defaultValue?: Object;
}

interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    promise(options: RecordCreateOptions): Promise<Record>;
}

interface RecordDeleteOptions {
    /**
     * The record type.
     */
    type: string;
    /**
     * The internal ID of the record instance to be deleted.
     */
    id: (string | number);
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

/**
 * Attaches a record to another record.
 */
export var attach: RecordAttachFunction;
export var copy: RecordCopyFunction;
export var create: RecordCreateFunction;
/**
 * Loads an existing record.
 */
export var load: RecordLoadFunction;
declare var deleteFunc: RecordDeleteFunction;
export {deleteFunc as delete};
export var detach: RecordDetachFunction;
export var submitFields: SubmitFieldsFunction;
export var transform: RecordTransformFunction;

/**
 * N/record.Types enum
 * Implemented as an interface to support custom record types as strings.
 */
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
export var Type: RecordTypes;