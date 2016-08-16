/// <reference path="typings/index.d.ts" />

/** Encapsulates a search filter used in a search. Use the properties for the Filter object to get and set the filter properties. */
export interface Filter {
    /** Name or internal ID of the search field as a string. */
    name: string;
    /** Join ID for the search filter as a string. */
    join: string;
    /** Operator used for the search filter. See search.Operator. */
    operator: Operator;
    /** Summary type for the search filter. Use this property to get or set the value of the summary type. See search.Summary. */
    summary: Summary;
    /** Formula used by the search filter. Use this property to get or set the formula used by the search filter. */
    formula: string;
}

interface SearchColumnSetWhenOrderedByOptions {
    /** The name of the search column for which the minimal or maximal value should be found. */
    name: string;
    /** The join id for the search column. */
    join: string;
}

/** Encapsulates a single search column in a search.Search. Use the methods and properties available to the Column object to get or set Column properties. */
export interface Column {
    /** Returns the search column for which the minimal or maximal value should be found when returning the search.Column value. */
    setWhenOrderedBy?(SearchColumnSetWhenOrderedByOptions): Column;
    /** Name of a search column as a string. */
    name: string;
    /** Join ID for a search column as a string. */
    join?: string;
    /** Returns the summary type for a search column. */
    summary?: Summary;
    /** Formula used for a search column as a string. To set this value, you must use formulatext, formulanumeric, formuladatetime, formulapercent, or formulacurrency. */
    formula?: string;
    /** Label used for the search column. You can only get or set custom labels with this property. */
    label?: string;
    /** Special function applied to values in a search column. See Help for Supported Functions. */
    function?: string
    /** The sort order of the column. Use the search.Sort enum to set the value. */
    sort?: Sort;
}

interface SearchResultGetValueTextOptions {
    name: string;
    join: string;
    summary?: Summary;
}

export interface Result {
    getValue(options: SearchResultGetValueTextOptions): boolean | string | string[];
    getValue(SearchColumn): boolean | string | string[];
    getText(options: SearchResultGetValueTextOptions): string;
    getText(SearchColumn): string;
    recordType: string;
    id: string;
    columns: Column[];
}

interface SearchResultSetGetRangeOptions {
    start: number;
    end: number;
}

interface SearchResultSetGetRangeFunction {
    promise(options: SearchResultSetGetRangeOptions): Promise<Result[]>;
    (options: SearchResultSetGetRangeOptions): Result[];
}

interface SearchResultSetEachFunction {
    promise(callback: (result: Result, index: number) => boolean): Promise<boolean>;
    (callback: (result: Result, index: number) => boolean): void;
}

export interface ResultSet {
    each: SearchResultSetEachFunction;
    getRange: SearchResultSetGetRangeFunction;
    columns: Column[];
}

interface FetchOptions {
    /**
     * The index of the page range that bounds the desired data.
     */
    index: number;
}

interface PageNextFunction {
    promise(): Promise<Page>;
    (): Page;
}

interface PagePrevFunction {
    promise(): Promise<Page>;
    (): Page;
}

interface PagedDataFetchFunction {
    promise(options: FetchOptions): Promise<Page>;
    (options: FetchOptions): Page;
}

export interface Page {
    next: PageNextFunction;
    prev: PagePrevFunction;
    data: Result[];
    isFirst: boolean;
    isLast: boolean;
    pagedData: PagedData;
    pagedRange: PageRange;
}

export interface PageRange {
    compoundLabel: string; /** Human-readable label with beginning and ending range identifiers */
    index: number; // Read only
}

export interface PagedData {
    fetch: PagedDataFetchFunction;
    count: number; // Read only
    pageRanges: PageRange[];
    pageSize: number; /** Read Only */
    searchDefinition: Search; // Read only    
}

interface RunPagedOptions {
    /**
     * Maximum number of entries per page.
     * There is an upper limit, a lower limit, and a default setting:
     * - The maximum number allowed is 1000.
     * - The minimum number allowed is 5.
     * - By default, the page size is set to 50 entries per page.
     */
    pageSize?: number;
}

interface SearchRunPagedFunction {
    promise(options?: RunPagedOptions): Promise<PagedData>;
    (options?: RunPagedOptions): PagedData;
}

export interface Search {
    searchType: string;
    searchId: number;
    filters: Filter[];
    filterExpression: Object[];
    columns: (Column[] | string[]);
    title: string;
    id: string;
    isPublic: boolean;
    save(): number;
    run(): ResultSet;
    runPaged: SearchRunPagedFunction;
}

interface CreateSearchFilterOptions {
    name: string;
    join?: string;
    operator: Operator;
    values?: (string | Date | number | string[]);
    formula?: string;
    summary?: Summary;
}

interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: Summary;
    formula?: string;
    function?: string;
    label?: string;
    sort?: Sort;
}

interface SearchLookupFieldsOptions {
    type: string;
    id: string;
    columns: (string | string[]);
}

interface SearchLookupFieldsFunction {
    promise(options: SearchLookupFieldsOptions): Promise<Object>;
    (options: SearchLookupFieldsOptions): Object;
}

interface SearchGlobalOptions {
    keywords: string;
}

interface SearchGlobalFunction {
    promise(options: SearchGlobalOptions): Promise<Result[]>;
    (options: SearchGlobalOptions): Result[];
}

interface SearchDuplicatesOptions {
    type: string;
    fields?: string[];
    id?: number;
}

interface SearchDuplicatesFunction {
    promise(options: SearchDuplicatesOptions): Promise<Result[]>;
    (options: SearchDuplicatesOptions): Result[];
}

interface SearchDeleteOptions {
    id: string;
}

interface SearchDeleteFunction {
    promise(options: SearchDeleteOptions): Promise<void>;
    (options: SearchDeleteOptions): void;
}

interface SearchLoadOptions {
    id: string;
}

interface SearchLoadFunction {
    promise(options: SearchLoadOptions): Promise<Search>;
    (options: SearchLoadOptions): Search;
}

interface SearchCreateOptions {
    type: string;
    filters?: (Filter[] | Object[]);
    columns?: (Array<Column|string>);
    title?: string;
    id?: string;
}

interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

interface SearchTypes { // as of 3/23/2016
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
    NON_INVENTORY_ITEM: string;
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

export var create: SearchCreateFunction;
export var load: SearchLoadFunction;
declare var deleteFunc: SearchDeleteFunction;
export {deleteFunc as delete};
export var duplicates: SearchDuplicatesFunction;
export var global: SearchGlobalFunction;
export var lookupFields: SearchLookupFieldsFunction;
export function createColumn(options: CreateSearchColumnOptions): Column;
export function createFilter(options: CreateSearchFilterOptions): Filter;
export enum Operator {
    AFTER,
    ALLOF,
    ANY,
    ANYOF,
    BEFORE,
    BETWEEN,
    CONTAINS,
    DOESNOTCONTAIN,
    DOESNOTSTARTWITH,
    EQUALTO,
    GREATERTHAN,
    GREATERTHANOREQUALTO,
    HASKEYWORDS,
    IS,
    ISEMPTY,
    ISNOT,
    ISNOTEMPTY,
    LESSTHAN,
    LESSTHANOREQUALTO,
    NONEOF,
    NOTAFTER,
    NOTALLOF,
    NOTBEFORE,
    NOTBETWEEN,
    NOTEQUALTO,
    NOTGREATERTHAN,
    NOTGREATERTHANOREQUALTO,
    NOTLESSTHAN,
    NOTLESSTHANOREQUALTO,
    NOTON,
    NOTONORAFTER,
    NOTONORBEFORE,
    NOTWITHIN,
    ON,
    ONORAFTER,
    ONORBEFORE,
    STARTSWITH,
    WITHIN,
}
export enum Summary {
    GROUP,
    COUNT,
    SUM,
    AVG,
    MIN,
    MAX,
}
export enum Sort {
    ASC,
    DESC,
    NONE,
}
//Use an interface instead of an enum for custom record searches.
export var Type: SearchTypes;
