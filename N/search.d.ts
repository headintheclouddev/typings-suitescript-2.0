/// <reference path="../typings/index.d.ts" />

interface SearchOperator {
    AFTER: string;
    ALLOF: string;
    ANY: string;
    ANYOF: string;
    BEFORE: string;
    BETWEEN: string;
    CONTAINS: string;
    DOESNOTCONTAIN: string;
    DOESNOTSTARTWITH: string;
    EQUALTO: string;
    GREATERTHAN: string;
    GREATERTHANOREQUALTO: string;
    HASKEYWORDS: string;
    IS: string;
    ISEMPTY: string;
    ISNOT: string;
    ISNOTEMPTY: string;
    LESSTHAN: string;
    LESSTHANOREQUALTO: string;
    NONEOF: string;
    NOTAFTER: string;
    NOTALLOF: string;
    NOTBEFORE: string;
    NOTBETWEEN: string;
    NOTEQUALTO: string;
    NOTGREATERTHAN: string;
    NOTGREATERTHANOREQUALTO: string;
    NOTLESSTHAN: string;
    NOTLESSTHANOREQUALTO: string;
    NOTON: string;
    NOTONORAFTER: string;
    NOTONORBEFORE: string;
    NOTWITHIN: string;
    ON: string;
    ONORAFTER: string;
    ONORBEFORE: string;
    STARTSWITH: string;
    WITHIN: string;
}

interface SearchFilter {
    name: string;
    join: string;
    operator: string;
    summary: string;
    formula: string;
}

interface SearchSummary {
    GROUP: string;
    COUNT: string;
    SUM: string;
    AVG: string;
    MIN: string;
    MAX: string;
}

interface SearchSort {
    ASC: string;
    DESC: string;
    NONE: string;
}

interface SearchColumnSetWhenOrderedByOptions {
    name: string;
    join: string;
}

interface SearchColumn {
    setWhenOrderedBy?(SearchColumnSetWhenOrderedByOptions): SearchColumn;
    name: string;
    join?: string;
    summary?: string;
    formula?: string;
    label?: string;
    function?: string
    sort?: string; // SORT enum: ASC/DESC/NONE
}

interface SearchResultGetValueTextOptions {
    name: string;
    join: string;
    summary?: string;
}

interface SearchResult {
    getValue(options: SearchResultGetValueTextOptions): boolean|string|string[];
    getValue(SearchColumn): boolean|string|string[];
    getText(options: SearchResultGetValueTextOptions): string;
    getText(SearchColumn): string;
    recordType: string;
    id: string;
    columns: SearchColumn[];
}

interface SearchResultSetGetRangeOptions {
    start: number;
    end: number;
}

interface SearchResultSetGetRangeFunction {
    promise(options:SearchResultSetGetRangeOptions): Promise<SearchResult[]>;
    (options:SearchResultSetGetRangeOptions): SearchResult[];
}

interface SearchResultSetEachFunction {
    promise(callback: (result: SearchResult, index: number) => boolean): Promise<boolean>;
    (callback: (result: SearchResult, index: number) => boolean): void;
}

interface SearchResultSet {
    each: SearchResultSetEachFunction;
    getRange: SearchResultSetGetRangeFunction;
    columns: SearchColumn[];
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

interface Page {
    next: PageNextFunction;
    prev: PagePrevFunction; 
    data: SearchResult[];
    isFirst: boolean;
    isLast: boolean;
    pagedData: PagedData;
    pagedRange: PageRange;
}

interface PageRange {
    compoundLabel: string; /** Human-readable label with beginning and ending range identifiers */
    index: number; // Read only
}

interface PagedData {
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

interface Search {
    searchType: string;
    searchId: number;
    filters: SearchFilter[];
    filterExpression: Object[];
    columns: (SearchColumn[]|string[]);
    title: string;
    id: string;
    isPublic: boolean;
    save(): number;
    run(): SearchResultSet;
    runPaged: SearchRunPagedFunction;
}

interface CreateSearchFilterOptions {
    name: string;
    join?: string;
    operator: string;
    values?: (string|Date|number|string[]);
    formula?: string;
    summary?: string;
}

interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: string; // todo: use enum
    formula?: string;
    function?: string;
    label?: string;
    sort?: SearchSort;
}

interface SearchLookupFieldsOptions {
    type: string;
    id: string;
    columns: (string|string[]);
}

interface SearchLookupFieldsFunction {
    promise(options:SearchLookupFieldsOptions): Promise<Object>;
    (options:SearchLookupFieldsOptions): Object;
}

interface SearchGlobalOptions {
    keywords: string;
}

interface SearchGlobalFunction {
    promise(options:SearchGlobalOptions): Promise<SearchResult[]>;
    (options:SearchGlobalOptions): SearchResult[];
}

interface SearchDuplicatesOptions {
    type: string;
    fields?: string[];
    id?: number;
}

interface SearchDuplicatesFunction {
    promise(options:SearchDuplicatesOptions): Promise<SearchResult[]>;
    (options:SearchDuplicatesOptions): SearchResult[];
}

interface SearchDeleteOptions {
    id: string;
}

interface SearchDeleteFunction {
    promise(options:SearchDeleteOptions): Promise<void>;
    (options:SearchDeleteOptions): void;
}

interface SearchLoadOptions {
    id: string;
}

interface SearchLoadFunction {
    promise(options:SearchLoadOptions): Promise<Search>;
    (options:SearchLoadOptions): Search;
}

interface SearchCreateOptions {
    type: string;
    filters?: (SearchFilter[]|Object[]);
    columns?: (SearchColumn[]|string[]);
    title?: string;
    id?: string;
}

interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

interface SearchModule {
    create: SearchCreateFunction;
    load: SearchLoadFunction;
    delete: SearchDeleteFunction;
    duplicates: SearchDuplicatesFunction;
    global: SearchGlobalFunction;
    lookupFields: SearchLookupFieldsFunction;
    createColumn(options: CreateSearchColumnOptions): SearchColumn;
    createFilter(options: CreateSearchFilterOptions): SearchFilter;
    Operator: SearchOperator;
    Summary: SearchSummary;
    Sort: SearchSort;
    Type: SearchTypes;
}

declare module N {
    var search:SearchModule;
}

declare module "N/search" {
    export = N.search;
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
