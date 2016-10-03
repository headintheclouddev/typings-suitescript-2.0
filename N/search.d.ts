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
    recordType: Type | string;
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
    searchType: Type | string;
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
    type: Type | string;
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
    type: Type | string;
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
    type: Type | string;
    filters?: (Filter[] | Object[]);
    columns?: (Array<Column | string>);
    title?: string;
    id?: string;
}

interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

export enum Type { // as of 3/23/2016
    ACCOUNT,
    ACCOUNTING_BOOK,
    ADDRESS,
    AMORTIZATION_SCHEDULE,
    AMORTIZATION_TEMPLATE,
    ACTIVITY,
    ASSEMBLY_BUILD,
    ASSEMBLY_UNBUILD,
    BILLING_CLASS,
    BILLING_SCHEDULE,
    BIN,
    BIN_PUTAWAY_WORKSHEET,
    BIN_TRANSFER,
    BLANKET_PURCHASE_ORDER,
    BUILD_ASSEMBLY,
    CAMPAIGN,
    CAMPAIGN_TEMPLATE,
    CASE,
    CASH_REFUND,
    CASH_SALE,
    CHARGE,
    CHECK,
    CLASS,
    COMPETITOR,
    CONTACT,
    COUPON_CODE,
    CREDIT_MEMO,
    CURRENCY,
    CUSTOMER,
    CUSTOMER_CATEGORY,
    CUSTOMER_DEPOSIT,
    CUSTOMER_PAYMENT,
    CUSTOMER_REFUND,
    CUSTOM_LIST,
    DEPARTMENT,
    DEPOSIT,
    DEPOSIT_APPLICATION,
    DESCRIPTION,
    DISCOUNT,
    DOWNLOAD_ITEM,
    EMAIL_TEMPLATE,
    EMPLOYEE,
    ENTITY,
    ESTIMATE_QUOTE,
    EVENT,
    EXPENSE_CATEGORY,
    EXPENSE_REPORT,
    FOLDER,
    GIFT_CERTIFICATE,
    GIFT_CERTIFICATE_ITEM,
    GLOBAL_ACCOUNT_MAPPING,
    GROUP,
    INTERCOMPANY_JOURNAL_ENTRY,
    INVENTORY_ADJUSTMENT,
    INVENTORY_COST_REVALUATION,
    INVENTORY_COUNT,
    INVENTORY_DETAIL,
    INVENTORY_ITEM,
    INVENTORY_NUMBER,
    INVENTORY_TRANSFER,
    INVOICE,
    ISSUE,
    ITEM,
    ITEM_ACCOUNT_MAPPING,
    ITEM_SEARCH,
    ITEM_DEMAND_PLAN,
    ITEM_FULFILLMENT,
    ITEM_GROUP,
    ITEM_RECEIPT,
    ITEM_REVISION,
    ITEM_SUPPLY_PLAN,
    JOURNAL_ENTRY,
    KIT,
    LANDED_COST,
    LEAD,
    LOCATION,
    LOT_NUMBERED_ASSEMBLY_ITEM,
    LOT_NUMBERED_INVENTORY_ITEM,
    MANUFACTURING_COST_TEMPLATE,
    MANUFACTURING_PLANNED_TIME,
    MANUFACTURING_OPERATION_TASK,
    MANUFACTURING_ROUTING,
    MARKUP,
    MESSAGE,
    MULTIBOOK_ACCOUNTING_TRANSACTION,
    NEXUS,
    NON_INVENTORY_ITEM,
    NOTE,
    OPPORTUNITY,
    OTHER_CHARGE_ITEM,
    OTHER_NAME,
    PARTNER,
    PAYCHECK_JOURNAL,
    PAYMENT,
    PAYROLL_ITEM,
    PHONE_CALL,
    PRICE_LEVEL,
    PROJECT_JOB,
    PROJECT_EXPENSE_TYPE,
    PROJECT_TASK,
    PROMOTION,
    PROSPECT,
    PURCHASE_CONTRACT,
    PURCHASE_ORDER,
    REALLOCATE_ITEMS,
    REQUISITION,
    RESOURCE_ALLOCATION,
    RETURN_AUTHORIZATION,
    REVENUE_COMMITMENT,
    REVENUE_COMMITMENT_REVERSAL,
    REVENUE_RECOGNITION_SCHEDULE,
    REVENUE_RECOGNITION_TEMPLATE,
    SALES_ORDER,
    SALES_TAX_ITEM,
    SCHEDULED_SCRIPT_INSTANCE,
    SERIALIZED_ASSEMBLY_ITEM,
    SERIALIZED_INVENTORY_ITEM,
    SERVICE,
    SOLUTION,
    STATISTICAL_JOURNAL_ENTRY,
    SUBSIDIARY,
    SUBTOTAL,
    TASK,
    TAX_CONTROL_ACCOUNT,
    TAX_GROUP,
    TAX_PERIOD,
    TAX_TYPE,
    TERM,
    TIME_BILL,
    TIME_OFF_CHANGE,
    TIME_OFF_PLAN,
    TIME_OFF_REQUEST,
    TIME_OFF_RULE,
    TIME_OFF_TYPE,
    TOPIC,
    TRANSACTION_SEARCH,
    TRANSFER_ORDER,
    UNIT_OF_MEASURE,
    VENDOR,
    VENDOR_BILL,
    VENDOR_CATEGORY,
    VENDOR_CREDIT,
    VENDOR_PAYMENT,
    VENDOR_RETURN_AUTHORIZATION,
    WEB_SITE_SETUP,
    WORK_ORDER,
    WORK_ORDER_CLOSE,
    WORK_ORDER_COMPLETION,
    WORK_ORDER_ISSUE,
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
