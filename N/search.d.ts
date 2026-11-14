import type {FieldValue} from './record';

/**
 * Encapsulates a search filter used in a search.
 * Use the properties for the Filter object to get and set the filter properties.
 *
 * You create a search filter object with `search.createFilter(options)` and add it to a `search.Search` object that you create with `search.create(options)` or load with search.load(options).
 *
 * Note: NetSuite uses an implicit AND operator with search filters, as opposed to filter expressions which explicitly use either AND and OR operators. Use the following guidelines with the Filter object:
 *
 * * To search for a "none of null" value, meaning do not show results without a value for the specified field, use a value of @NONE@ in the Filter.formula property.
 *
 * * To search on checkbox fields, use the IS operator with a value of T or F to search for checked
 * or unchecked fields, respectively.
 * @since 2015.2
 */
export interface Filter {
    /**
     * Name or internal ID of the search field as a string.
     * @since 2015.2
     */
    readonly name: string;
    /**
     * Join ID for the search filter as a string.
     * @since 2015.2
     */
    readonly join: string;
    /** @since 2015.2 */
    readonly operator: Operator;
    /**
     * Summary type for the search filter. Use this property to get or set the value of the summary type. See search.Summary.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_SUM if an unknown summary type is set.
     * @since 2015.2
     */
    readonly summary: Summary;
    /**
     * Formula used by the search filter. Use this property to get or set the formula used by the search filter.
     * @since 2015.2
     */
    formula: string;
    /** Returns the object type name */
    toString(): string;
    /** Get JSON format of the object */
    toJSON(): {
        name: string;
        join: string | null | undefined;
        operator: keyof typeof Operator;
        summary: keyof typeof Summary | null | undefined;
        formula: string | null | undefined;
        values: string[];
        isor: boolean;
        isnot: boolean;
        leftparens: number;
        rightparens: number;
    };
}

interface SearchColumnSetWhenOrderedByOptions {
    /** The name of the search column for which the minimal or maximal value should be found. */
    name: string;
    /** The join id for the search column. */
    join: string;
}

/**
 * Encapsulates a single search column in a search.Search. Use the methods and properties available to the Column object to get or set Column properties.
 * @since 2015.2
 */
export interface Column {
    /**
     * Returns the search column for which the minimal or maximal value should be found when returning the search.Column value.
     * @governance none
     * @since 2015.2
     */
    setWhenOrderedBy?(options: SearchColumnSetWhenOrderedByOptions): Column;
    /**
     * Name of a search column as a string.
     * @since 2015.2
     */
    name: string;
    /**
     * Join ID for a search column as a string.
     * @since 2015.2
     */
    join?: string;
    /**
     * Returns the summary type for a search column.
     * @since 2015.2
     */
    summary?: Summary;
    /**
     * Formula used for a search column as a string. To set this value, you must use formulatext, formulanumeric, formuladatetime, formulapercent, or formulacurrency.
     * @since 2015.2
     */
    formula?: string;
    /**
     * Label used for the search column. You can only get or set custom labels with this property.
     * @since 2015.2
     */
    label?: string;
    /**
     * Special function applied to values in a search column. See Help for Supported Functions.
     * @throws {SuiteScriptError} INVALID_SRCH_FUNCTN if an unknown function is set.
     * @since 2015.2
     */
    function?: string
    /** The sort order of the column. Use the search.Sort enum to set the value. */
    sort?: Sort;
    /** Returns the object type name */
    toString(): string;
    /** Get JSON format of the object */
    // toJSON(): { // See https://github.com/headintheclouddev/typings-suitescript-2.0/issues/320
    //     name: string;
    //     join: string | null | undefined;
    //     summary: keyof typeof Summary | null | undefined;
    //     label: string | null;
    //     type: string | null;
    //     formula: string | null | undefined;
    //     function: string | null | undefined;
    //     sortdir: keyof typeof Sort;
    //     whenorderedby: string | null | undefined;
    //     whenorderedbyjoin: string | null | undefined;
    //     whenorderedbyalias: string | null | undefined;
    // };
}

interface ResultGetOptions {
    /** The search return column name. */
    name: string;
    /** The join id for this search return column. */
    join?: string;
    /** The summary type for this column. See search.Summary. */
    summary?: Summary | keyof typeof Summary;
}

/** @since 2015.2 */
export interface Result {
    /**
     * @governance none
     * @since 2015.2
     */
    getValue(column: Column | string): boolean | string | string[];
    /**
     * Returns the value of a specified search result column. Takes in arguments for name, join, and summary.
     * @governance none
     * @since 2015.2
     */
    getValue(options: ResultGetOptions): boolean | string | string[];
    /**
     * Returns the text value of a specified search result column, or null if the column has no text representation
     * (for example a text field rather than a select field).
     * @governance none
     * @since 2015.2
     */
    getText(options: Column | string): string | null;
    /**
     * Returns the text value of a specified search result column. Takes in arguments for name, join, and summary.
     * Returns null if the column has no text representation (for example a text field rather than a select field).
     * @governance none
     * @since 2015.2
     */
    getText(options: ResultGetOptions): string | null;
    /** This method is undocumented but works in client and server-side scripts in NetSuite 2019.2.  It returns an object containing all column values by name. */
    getAllValues(): { [fieldId: string]: boolean|string|LookupValueObject[] };
    /** This method is undocumented but works in client and server-side scripts in NetSuite 2019.2.  It returns an object representing the search result. */
    toJSON(): { recordType?: string, id?: string, values: { [columnName: string]: string|boolean } };
    /** @since 2015.2 */
    recordType: Type | string;
    /** @since 2015.2 */
    id: string;
    /** @since 2015.2 */
    columns: Column[];
}

interface SearchResultSetGetRangeOptions {
    start: number;
    end: number;
}

interface SearchResultSetGetRangeFunction {
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SearchResultSetGetRangeOptions): Promise<Result[]>;
    /**
     * @governance 10 units
     * @since 2015.2
     */
    (options: SearchResultSetGetRangeOptions): Result[];
}

interface SearchResultSetEachFunction {
    /**
     * Invokes the callback for each result. The callback must return true to continue iterating, or false to stop.
     * @governance 10 units
     * @since 2015.2
     */
    promise(callback: (result: Result) => boolean): Promise<boolean>;
    /**
     * Invokes the callback for each result. The callback must return true to continue iterating, or false to stop.
     * @governance 10 units
     * @since 2015.2
     */
    (callback: (result: Result) => boolean): void;
}

/** @since 2015.2 */
export interface ResultSet {
    each: SearchResultSetEachFunction;
    getRange: SearchResultSetGetRangeFunction;
    /** @since 2015.2 */
    columns: Column[];
}

interface FetchOptions {
    /** The index of the page range that bounds the desired data. */
    index: number;
}

interface PageNextFunction {
    /**
     * @governance 5 units
     * @since 2016.1
     */
    promise(): Promise<Page>;
    /**
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the page range is invalid, or when the page is the last page.
     * @governance 5 units
     * @since 2016.1
     */
    (): Page;
}

interface PagePrevFunction {
    /**
     * @governance 5 units
     * @since 2016.1
     */
    promise(): Promise<Page>;
    /**
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the page range is invalid, or when the page is the first page.
     * @governance 5 units
     * @since 2016.1
     */
    (): Page;
}

interface PagedDataFetchFunction {
    /**
     * @governance 5 units
     * @since 2016.1
     */
    promise(options: FetchOptions): Promise<Page>;
    /**
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the page range is not valid.
     * @governance 5 units
     * @since 2016.1
     */
    (options: FetchOptions): Page;
}

/** @since 2016.1 */
export interface Page {
    next: PageNextFunction;
    prev: PagePrevFunction;
    /** @since 2016.1 */
    data: Result[];
    /** @since 2016.1 */
    isFirst: boolean;
    /** @since 2016.1 */
    isLast: boolean;
    /** @since 2016.1 */
    pagedData: PagedData;
    /**
     * The PageRange Object used to fetch this Page Object. Page boundary information with the key and label.
     * @since 2016.1
     */
    readonly pageRange: PageRange;
}

/** @since 2016.1 */
export interface PageRange {
    /** @since 2016.1 */
    compoundLabel: string; /** Human-readable label with beginning and ending range identifiers */
    /** @since 2016.1 */
    index: number; // Read only
}

/** @since 2016.1 */
export interface PagedData {
    fetch: PagedDataFetchFunction;
    /** @since 2016.1 */
    count: number; // Read only
    /** @since 2016.1 */
    pageRanges: PageRange[];
    /** @since 2016.1 */
    pageSize: number; /** Read Only */
    /** @since 2016.1 */
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
    /**
     * @governance 5 units
     * @since 2016.1
     */
    promise(options?: RunPagedOptions): Promise<PagedData>;
    /**
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING if an unknown search parameter name is provided.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING_VALUE if an unsupported value is set for the provided search parameter name.
     * @governance 5 units
     * @since 2016.1
     */
    (options?: RunPagedOptions): PagedData;
}

/** @since 2015.2 */
export interface Search {
    /** @since 2015.2 */
    searchType: Type | string;
    /** @since 2015.2 */
    searchId: number;
    /**
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER if a value is invalid for the search filter type.
     * @since 2015.2
     */
    filters: Filter[];
    /**
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR if the value is not a valid search filter, filter array, or filter expression.
     * @since 2015.2
     */
    filterExpression: any[];
    /**
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_COLUMN if the value passed in was not a string or search.Column object.
     * @since 2015.2
     */
    columns: (Column | string)[];
    /** @since 2015.2 */
    title: string;
    /** @since 2015.2 */
    id: string;
    /** @since 2015.2 */
    isPublic: boolean;
    save(): number;
    /**
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING if an unknown search parameter name is provided.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING_VALUE if an unsupported value is set for the provided search parameter name.
     * @governance none
     * @since 2015.2
     */
    run(): ResultSet;
    runPaged: SearchRunPagedFunction;
}

export interface CreateSearchFilterOptions {
    /** Name or internal ID of the search field. */
    name: string;
    /** Join ID for the search filter. */
    join?: string;
    /** Operator used for the search filter. Use the search.Operator enum. */
    operator: Operator;
    /** Values to be used as filter parameters. */
    values?: Readonly<FieldValue> | readonly FieldValue[];
    /** Formula used by the search filter. */
    formula?: string;
    /** Summary type for the search filter. */
    summary?: Summary;
}

export interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: Summary;
    formula?: string;
    /**
     * See the list of Supported Function in NetSuite help.
     * For example, use "day" when creating a column to show a date/time column as just a date.
     * Do not specify this property when calling result.getValue(), only use it when creating the search column.
     */
    function?: string;
    label?: string;
    sort?: Sort;
}

type LookupValue = string | number | boolean | LookupValueObject[];

export interface LookupValueObject { value: string, text: string }

interface SearchLookupFieldsFunction {
    /**
     * @governance 1 unit
     * @since 2015.2
     */
    promise<T extends string>(options: {
		type: Type | string;
		id: FieldValue | string | number;
		columns: T | T[]
	}): Promise<{ [ K in T ]?: LookupValue }>;
	
	/**
	 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if options.columns includes invalid columns for the specified record.
	 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
	 * @governance 1 unit
	 * @since 2015.2
	 */
	<T extends string>(options: {
		type: Type | string;
		id: FieldValue | string | number;
		columns: T | T[]
	}): { [ K in T ]?: LookupValue };
}

/** Global search keywords string or expression. */
interface SearchGlobalOptions {
    keywords: string;
}

interface SearchGlobalFunction {
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SearchGlobalOptions): Promise<Result[] | undefined>;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 10 units
     * @since 2015.2
     */
    (options: SearchGlobalOptions): Result[];
}

interface SearchDuplicatesOptions {
    type: Type | string;
    fields?: string[];
    id?: number;
}

interface SearchDuplicatesFunction {
    /**
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SearchDuplicatesOptions): Promise<Result[]>;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 10 units
     * @since 2015.2
     */
    (options: SearchDuplicatesOptions): Result[];
}

interface SearchDeleteOptions {
    id: string | number;
}

interface SearchDeleteFunction {
    /**
     * @governance 5 units
     * @since 2015.2
     */
    promise(options: SearchDeleteOptions): Promise<void>;
    /**
     * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 5 units
     * @since 2015.2
     */
    (options: SearchDeleteOptions): void;
}

interface SearchLoadOptions {
    /** Internal ID or script ID of a saved search. The script ID starts with customsearch. */
    id: string | number;
    /**
     * The search type of the saved search to load. Use a value from the search.Type enum for this parameter.
     * This parameter is required if the saved search to load uses a standalone search type.
     * A standalone search type is a search type that does not have a corresponding record type.
     * Typically, the search type of the saved search can be determined automatically based on the corresponding record type.
     * In this case, this parameter is not required. For standalone search types, you must specify the search type explicitly using this parameter.
     *
     * The following is a list of standalone search types:
     * - DeletedRecord
     * - EndToEndTime
     * - ExpenseAmortPlanAndSchedule
     * - RevRecPlanAndSchedule
     * - GlLinesAuditLog
     * - Crosschargeable
     * - FinRptAggregateFR
     * - BillingAccountBillCycle
     * - BillingAccountBillRequest
     * - BinItemBalance
     * - PaymentEvent
     * - Permission
     * - GatewayNotification
     * - TimeApproval
     * - RecentRecord
     * - Role
     * - SavedSearch
     * - ShoppingCart
     * - SubscriptionRenewalHistory
     * - SuiteScriptDetail
     * - SupplyChainSnapshotDetails
     * - SystemNote
     * - TaxDetail
     * - TimesheetApproval
     * - Uber
     * - ResAllocationTimeOffConflict
     * - ComSearchOneWaySyn
     * - ComSearchGroupSyn
     * - Installment
     * - InventoryBalance
     * - InventoryNumberBin
     * - InventoryNumberItem
     * - InventoryStatusLocation
     * - InvtNumberItemBalance
     * - ItemBinNumber
     */
    type?: string | Type;
}

interface SearchLoadFunction {
    /**
     * @governance 5 units
     * @since 2015.2
     */
    promise(options: SearchLoadOptions): Promise<Search>;
    /**
     * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 5 units
     * @since 2015.2
     */
    (options: SearchLoadOptions): Search;
}

export interface SearchCreateOptions {
    type: Type | string;
    filters?: (CreateSearchFilterOptions[] | any[]);
    columns?: (Column | string)[];
    title?: string;
    id?: string;
    isPublic?: boolean;
    packageId?: string;
    settings?: Object | Object[] | string | string[] | Setting | Setting[];
    filterExpression?: Object[];
}

interface SearchCreateFunction {
    /**
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if the options.columns parameter is not a valid column, string, or column or string array.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR if the options.filters parameter is not a valid search filter, filter array, or filter expression.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance none
     * @since 2015.2
     */
    (options: SearchCreateOptions): Search;
    /**
     * @governance none
     * @since 2015.2
     */
    promise(options: SearchCreateOptions): Promise<Search>;
}

/** @since 2015.2 */
export enum Type { // As of 15 June 2020
    ACCOUNT,
    ACCOUNTING_BOOK,
    ACCOUNTING_CONTEXT,
    ACCOUNTING_PERIOD,
    ACTIVITY,
    ADV_INTER_COMPANY_JOURNAL_ENTRY,
    AGGR_FIN_DAT,
    ALLOC_RECOMMENDATION_DEMAND,
    ALLOC_RECOMMENDATION_DETAIL,
    AMORTIZATION_SCHEDULE,
    AMORTIZATION_TEMPLATE,
    ASSEMBLY_BUILD,
    ASSEMBLY_ITEM,
    ASSEMBLY_UNBUILD,
    AUTHENTICATE_DEVICE_INPUT,
    BALANCE_TRX_BY_SEGMENTS,
    BALANCING_DETAIL,
    BALANCING_RESULT,
    BALANCING_TRANSACTION,
    BILLING_ACCOUNT,
    BILLING_ACCOUNT_BILL_CYCLE,
    BILLING_ACCOUNT_BILL_REQUEST,
    BILLING_CLASS,
    BILLING_RATE_CARD,
    BILLING_REVENUE_EVENT,
    BILLING_SCHEDULE,
    BIN,
    BIN_ITEM_BALANCE,
    BIN_TRANSFER,
    BIN_WORKSHEET,
    BLANKET_PURCHASE_ORDER,
    BOM,
    BOM_REVISION,
    BONUS,
    BONUS_TYPE,
    BUDGET_EXCHANGE_RATE,
    BULK_OWNERSHIP_TRANSFER,
    BUNDLE_INSTALLATION_SCRIPT,
    CALENDAR_EVENT,
    CAMPAIGN,
    CARDHOLDER_AUTHENTICATION,
    CARDHOLDER_AUTHENTICATION_EVENT,
    CASH_REFUND,
    CASH_SALE,
    CHALLENGE_SHOPPER_INPUT,
    CHARGE,
    CHARGE_RULE,
    CHECK,
    CLASSIFICATION,
    CLIENT_SCRIPT,
    CMS_CONTENT,
    CMS_CONTENT_TYPE,
    CMS_PAGE,
    COMMERCE_CATEGORY,
    COMMERCE_SEARCH_ACTIVITY_DATA,
    COMM_AN_SESSION,
    COMPETITOR,
    COM_SEARCH_BOOST,
    COM_SEARCH_BOOST_TYPE,
    COM_SEARCH_GROUP_SYN,
    COM_SEARCH_ONE_WAY_SYN,
    CONSOLIDATED_EXCHANGE_RATE,
    CONTACT,
    CONTACT_CATEGORY,
    CONTACT_ROLE,
    COST_CATEGORY,
    COUPON_CODE,
    CREDIT_CARD_CHARGE,
    CREDIT_CARD_REFUND,
    CREDIT_MEMO,
    CURRENCY,
    CURRENCY_EXCHANGE_RATE,
    CUSTOMER,
    CUSTOMER_CATEGORY,
    CUSTOMER_DEPOSIT,
    CUSTOMER_MESSAGE,
    CUSTOMER_PAYMENT,
    CUSTOMER_PAYMENT_AUTHORIZATION,
    CUSTOMER_REFUND,
    CUSTOMER_STATUS,
    CUSTOMER_SUBSIDIARY_RELATIONSHIP,
    CUSTOM_PURCHASE,
    CUSTOM_RECORD,
    CUSTOM_SALE,
    CUSTOM_TRANSACTION,
    DELETED_RECORD,
    DEPARTMENT,
    DEPOSIT,
    DEPOSIT_APPLICATION,
    DESCRIPTION_ITEM,
    DISCOUNT_ITEM,
    DOWNLOAD_ITEM,
    EMAIL_TEMPLATE,
    EMPLOYEE,
    EMPLOYEE_CHANGE_REQUEST,
    EMPLOYEE_CHANGE_REQUEST_TYPE,
    EMPLOYEE_CHANGE_TYPE,
    EMPLOYEE_PAYROLL_ITEM,
    EMPLOYEE_STATUS,
    EMPLOYEE_TYPE,
    END_TO_END_TIME,
    ENTITY,
    ENTITY_ACCOUNT_MAPPING,
    ESTIMATE,
    EXPENSE_AMORTIZATION_EVENT,
    EXPENSE_AMORT_PLAN_AND_SCHEDULE,
    EXPENSE_CATEGORY,
    EXPENSE_PLAN,
    EXPENSE_REPORT,
    EXPENSE_REPORT_POLICY,
    FAIR_VALUE_PRICE,
    FINANCIAL_INSTITUTION,
    FIN_RPT_AGGREGATE_F_R,
    FIXED_AMOUNT_PROJECT_REVENUE_RULE,
    FOLDER,
    FULFILLMENT_REQUEST,
    GATEWAY_NOTIFICATION,
    GENERIC_RESOURCE,
    GIFT_CERTIFICATE,
    GIFT_CERTIFICATE_ITEM,
    GLOBAL_ACCOUNT_MAPPING,
    GLOBAL_INVENTORY_RELATIONSHIP,
    GL_LINES_AUDIT_LOG,
    GL_NUMBERING_SEQUENCE,
    GOAL,
    IMPORTED_EMPLOYEE_EXPENSE,
    INBOUND_SHIPMENT,
    INSTALLMENT,
    INTER_COMPANY_JOURNAL_ENTRY,
    INTER_COMPANY_TRANSFER_ORDER,
    INVENTORY_ADJUSTMENT,
    INVENTORY_BALANCE,
    INVENTORY_COST_REVALUATION,
    INVENTORY_COUNT,
    INVENTORY_DEMAND,
    INVENTORY_DETAIL,
    INVENTORY_ITEM,
    INVENTORY_NUMBER,
    INVENTORY_NUMBER_BIN,
    INVENTORY_NUMBER_ITEM,
    INVENTORY_STATUS,
    INVENTORY_STATUS_CHANGE,
    INVENTORY_STATUS_LOCATION,
    INVENTORY_TRANSFER,
    INVOICE,
    INVOICE_GROUP,
    INVT_NUMBER_ITEM_BALANCE,
    ISSUE,
    ITEM,
    ITEM_ACCOUNT_MAPPING,
    ITEM_BIN_NUMBER,
    ITEM_COLLECTION,
    ITEM_COLLECTION_ITEM_MAP,
    ITEM_DEMAND_PLAN,
    ITEM_FULFILLMENT,
    ITEM_GROUP,
    ITEM_LOCATION_CONFIGURATION,
    ITEM_PROCESS_FAMILY,
    ITEM_PROCESS_GROUP,
    ITEM_RECEIPT,
    ITEM_REVISION,
    ITEM_SUPPLY_PLAN,
    JOB,
    JOB_STATUS,
    JOB_TYPE,
    JOURNAL_ENTRY,
    KIT_ITEM,
    LABOR_BASED_PROJECT_REVENUE_RULE,
    LABOR_CATEGORY,
    LABOR_COST_CARD,
    LABOR_COST_CARD_ITEM,
    LABOR_COST_CARD_SEGMENT,
    LABOR_COST_ELEMENT,
    LEAD,
    LOCATION,
    LOT_NUMBERED_ASSEMBLY_ITEM,
    LOT_NUMBERED_INVENTORY_ITEM,
    MANUFACTURING_COST_TEMPLATE,
    MANUFACTURING_OPERATION_TASK,
    MANUFACTURING_ROUTING,
    MAP_REDUCE_SCRIPT,
    MARKUP_ITEM,
    MASSUPDATE_SCRIPT,
    MEM_DOC,
    MERCHANDISE_HIERARCHY_LEVEL,
    MERCHANDISE_HIERARCHY_NODE,
    MERCHANDISE_HIERARCHY_VERSION,
    MESSAGE,
    MFG_PLANNED_TIME,
    NEXUS,
    NON_INVENTORY_ITEM,
    NOTE,
    NOTE_TYPE,
    OPPORTUNITY,
    ORDER_RESERVATION,
    ORDER_TYPE,
    OTHER_CHARGE_ITEM,
    OTHER_NAME,
    OTHER_NAME_CATEGORY,
    PARTNER,
    PARTNER_CATEGORY,
    PAYCHECK,
    PAYCHECK_JOURNAL,
    PAYMENT_EVENT,
    PAYMENT_INSTRUMENT,
    PAYMENT_ITEM,
    PAYMENT_METHOD,
    PAYMENT_OPTION,
    PAYMENT_RESULT_PREVIEW,
    PAYROLL_ITEM,
    PAYROLL_SETUP,
    PCT_COMPLETE_PROJECT_REVENUE_RULE,
    PERFORMANCE_METRIC,
    PERFORMANCE_REVIEW,
    PERFORMANCE_REVIEW_SCHEDULE,
    PERIOD_END_JOURNAL,
    PERMISSION,
    PHONE_CALL,
    PICK_STRATEGY,
    PICK_TASK,
    PLANNED_ORDER,
    PLANNING_ENGINE_MESSAGE,
    PLANNING_ENGINE_PEGGING,
    PLANNING_ENGINE_RESULT,
    PLANNING_ITEM_CATEGORY,
    PLANNING_ITEM_GROUP,
    PLANNING_REPOSITORY_ALLOCATION,
    PLANNING_REPOSITORY_BOM_EDGE,
    PLANNING_REPOSITORY_ITEM_LOCATION,
    PLANNING_REPOSITORY_SOURCE,
    PLANNING_RULE_GROUP,
    PLANNING_VIEW,
    PORTLET,
    PRICE_BOOK,
    PRICE_LEVEL,
    PRICE_PLAN,
    PRICING,
    PRICING_GROUP,
    PROJECT_EXPENSE_TYPE,
    PROJECT_IC_CHARGE_REQUEST,
    PROJECT_TASK,
    PROJECT_TEMPLATE,
    PROMISING_SETUP,
    PROMOTION_CODE,
    PROSPECT,
    PURCHASE_CONTRACT,
    PURCHASE_ORDER,
    PURCHASE_REQUISITION,
    RECEIVED_VENDOR_BILL,
    RECENT_RECORD,
    RESOURCE_ALLOCATION,
    RESTLET,
    RES_ALLOCATION_TIME_OFF_CONFLICT,
    RETURN_AUTHORIZATION,
    REVENUE_ARRANGEMENT,
    REVENUE_COMMITMENT,
    REVENUE_COMMITMENT_REVERSAL,
    REVENUE_PLAN,
    REV_REC_PLAN_AND_SCHEDULE,
    REV_REC_SCHEDULE,
    REV_REC_TEMPLATE,
    ROLE,
    SALES_CHANNEL,
    SALES_ORDER,
    SALES_ROLE,
    SALES_TAX_ITEM,
    SAVED_SEARCH,
    SCHEDULED_SCRIPT,
    SCHEDULED_SCRIPT_INSTANCE,
    SCRIPT_DEPLOYMENT,
    SERIALIZED_ASSEMBLY_ITEM,
    SERIALIZED_INVENTORY_ITEM,
    SERVICE_ITEM,
    SHIP_ITEM,
    SHOPPING_CART,
    SOLUTION,
    STATE,
    STATISTICAL_JOURNAL_ENTRY,
    STORE_PICKUP_FULFILLMENT,
    SUBSCRIPTION,
    SUBSCRIPTION_CHANGE_ORDER,
    SUBSCRIPTION_LINE,
    SUBSCRIPTION_LINE_REVISION,
    SUBSCRIPTION_PLAN,
    SUBSCRIPTION_RENEWAL_HISTORY,
    SUBSCRIPTION_TERM,
    SUBSIDIARY,
    SUBTOTAL_ITEM,
    SUITELET,
    SUITE_SCRIPT_DETAIL,
    SUPPLY_CHAIN_SNAPSHOT,
    SUPPLY_CHAIN_SNAPSHOT_DETAILS,
    SUPPLY_CHANGE_ORDER,
    SUPPLY_PLAN_DEFINITION,
    SUPPORT_CASE,
    SYSTEM_NOTE,
    S_C_M_PREDICTED_RISKS,
    S_C_M_PREDICTION_TRAIN_HISTORY,
    S_C_M_PREDICTION_TRAIN_W_Q_STATUS,
    TASK,
    TAX_DETAIL,
    TAX_GROUP,
    TAX_PERIOD,
    TAX_TYPE,
    TERM,
    TIMESHEET_APPROVAL,
    TIME_APPROVAL,
    TIME_BILL,
    TIME_ENTRY,
    TIME_OFF_CHANGE,
    TIME_OFF_PLAN,
    TIME_OFF_REQUEST,
    TIME_OFF_RULE,
    TIME_OFF_TYPE,
    TIME_SHEET,
    TOPIC,
    TRANSACTION,
    TRANSFER_ORDER,
    UBER,
    UNITS_TYPE,
    UNLOCKED_TIME_PERIOD,
    USAGE,
    USEREVENT_SCRIPT,
    VENDOR,
    VENDOR_BILL,
    VENDOR_CATEGORY,
    VENDOR_CREDIT,
    VENDOR_PAYMENT,
    VENDOR_PREPAYMENT,
    VENDOR_PREPAYMENT_APPLICATION,
    VENDOR_RETURN_AUTHORIZATION,
    VENDOR_SUBSIDIARY_RELATIONSHIP,
    WAVE,
    WBS,
    WEBSITE,
    WORKFLOW_ACTION_SCRIPT,
    WORKPLACE,
    WORK_ORDER,
    WORK_ORDER_CLOSE,
    WORK_ORDER_COMPLETION,
    WORK_ORDER_ISSUE,
    ZONE
}

/**
 * Creates a new search and returns it as a search.Search object. The search can be modified and run as an on demand
 * search with Search.run(), without saving it. Alternatively, calling Search.save() will save the search to the
 * database, so it can be reused later in the UI or loaded with search.load(options). 
 *
 * Note: This method is agnostic in terms of its options.filters argument. It can accept input of a single search.Filter
 * object, an array of search.Filter objects, or a search filter expression. The search.create(options) method also
 * includes a promise version, search.create.promise(options).
 *
 * Important: When you use this method to create a search, consider the following: 
 *
 *  * When you define the search, make sure you sort using the field with the most unique values, or sort using multiple
 *    fields. Sorting with a single field that has multiple identical values can cause the result rows to be in a
 *    different order each time the search is run. 
 *
 *  * You cannot directly create a filter or column for a list/record type field in SuiteScript by passing in its text
 *    value. You must use the field’s internal ID. If you must use the field’s text value, you can create a filter or
 *    column with a formula using name: 'formulatext'.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if the options.columns parameter is not a valid column, string, or column or string array.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR if the options.filters parameter is not a valid search filter, filter array, or filter expression.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2015.2
 */
export const create: SearchCreateFunction;
/**
 * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 5 units
 * @since 2015.2
 */
export const load: SearchLoadFunction;
/**
 * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 5 units
 * @since 2015.2
 */
declare const deleteFunc: SearchDeleteFunction;
export { deleteFunc as delete };
/**
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 10 units
 * @since 2015.2
 */
export const duplicates: SearchDuplicatesFunction;

/**
 * Performs a global search against a single keyword or multiple keywords.
 * Similar to the global search functionality in the UI, you can programmatically filter the global
 * search results that are returned. For example, you can use the following filter to limit the
 * returned records to Customer records: `'cu: simpson'`
 *
 * @returns search.Result[] as an array of result objects containing these columns: name, type, info1, and info2
 * Results are limited to 1000 records. If there are no search results, this method returns null.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 10 units
 * @since 2015.2
 */
export const global: SearchGlobalFunction;

/**
 * Performs a search for one or more body fields on a record. You can use joined-field lookups with this method, with
 * the following syntax: join_id.field_name The search.lookupFields(options) method also includes a promise version,
 * search.lookupFields.promise(options). 
 *
 * Note that the return contains either an object or a scalar value, depending on whether the looked-up field holds a
 * single value, or a collection of values. Single select fields are returned as an object with value and text
 * properties. Multi-select fields are returned as an object with value: text pairs. 
 *
 * In the following example, a select field like my_select would return an array of objects containing a value and text
 * property. This select field contains multiple entries to select from, so each entry would have a numerical id (the
 * value) and a text display (the text). For "internalid" in this particular code snippet, the sample returns 1234. The
 * internal id of a record is a single value, so a scalar is returned:
 * ```
 * {
 *  internalid: 1234, 
 *  firstname: 'Joe', 
 *  my_select: [{value: 1, text: 'US Sub'}],
 *  my_multiselect: [{"value": "1,2", "text": "US Sub, EU Sub" }]
 * }
 * ```
 * @returns Returns select fields as an object with value and text properties. Returns multiselect fields as an 
 *  array of object with value:text pairs.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if options.columns includes invalid columns for the specified record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 1 unit
 * @since 2015.2
 */
export const lookupFields: SearchLookupFieldsFunction;

/**
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COLUMN_SUM if options.summary is not a valid search summary type.
 * @throws {SuiteScriptError} INVALID_SRCH_FUNCTN if an unknown function is provided.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2015.2
 */
export function createColumn(options: CreateSearchColumnOptions): Column;
/**
 *
 * Important: You cannot directly create a filter or column for a list/record type field in SuiteScript by passing 
 * in its text value. You must use the field’s internal ID. If you must use the field’s text value, you can create 
 * a filter or column with a formula using name: 'formulatext'. 
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_OPERATOR if options.operator is not a valid operator type.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_SUMMARY_TYP if options.summary is not a valid search summary type.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2015.2
 */
export function createFilter(options: CreateSearchFilterOptions): Filter;

/**
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING if an unknown search parameter name is provided.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING_VALUE if an unsupported value is set for the provided search parameter name.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2018.2
 */
export function createSetting<K extends SettingName>(options: CreateSearchSettingOptions<K>): Setting

interface CreateSearchSettingOptions<K extends SettingName> {
    name: K | string
    value: SettingValueType[K] | string 
}

/** @since 2018.2 */
export interface Setting {
    /** @since 2018.2 */
    name: string
    /** @since 2018.2 */
    value: ConsolidationEnum | IncludePeriodTransactionEnum
}

type SettingValueType = {
    [SettingName.consolidationtype]: ConsolidationEnum,
    [SettingName.includeperiodendtransactions]: IncludePeriodTransactionEnum
}

export enum SettingName {
    consolidationtype = "consolidationtype",
    includeperiodendtransactions = "includeperiodendtransactions"
}

export enum ConsolidationEnum {
    ACCTTYPE,
    AVERAGE,
    CURRENT,
    HISTORICAL,
    NONE,
}

export enum IncludePeriodTransactionEnum {
    F,
    FALSE,
    T,
    TRUE
}

/** @since 2015.2 */
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

/** @since 2015.2 */
export enum Summary {
    GROUP,
    COUNT,
    SUM,
    AVG,
    MIN,
    MAX,
}

/** @since 2015.2 */
export enum Sort {
    ASC,
    DESC,
    NONE,
}
