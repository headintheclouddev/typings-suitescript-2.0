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
    // toJSON(): { // See https://github.com/headintheclouddev/typings-suitescript-2.1/issues/320
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
     * @governance none
     * @since 2015.2
     */
    getText(options: Column | string): string;
    /**
     * Returns the text value of a specified search result column. Takes in arguments for name, join, and summary.
     * @governance none
     * @since 2015.2
     */
    getText(options: ResultGetOptions): string;
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
     * The columns of the search. You can assign column names as strings or search.Column objects.
     *
     * When you read this property, NetSuite always returns search.Column objects, even for columns given as strings,
     * so use `(columns as search.Column[]).map(c => c.name)` to get the names. It is null if the search was created without columns.
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
    ACCOUNT = "account",
    ACCOUNTING_BOOK = "accountingbook",
    ACCOUNTING_CONTEXT = "accountingcontext",
    ACCOUNTING_PERIOD = "accountingperiod",
    ACTIVITY = "activity",
    ADV_INTER_COMPANY_JOURNAL_ENTRY = "advintercompanyjournalentry",
    AGGR_FIN_DAT = "AggrFinDat",
    ALLOC_RECOMMENDATION_DEMAND = "AllocRecommendationDemand",
    ALLOC_RECOMMENDATION_DETAIL = "AllocRecommendationDetail",
    AMORTIZATION_SCHEDULE = "amortizationschedule",
    AMORTIZATION_TEMPLATE = "amortizationtemplate",
    ASSEMBLY_BUILD = "assemblybuild",
    ASSEMBLY_ITEM = "assemblyitem",
    ASSEMBLY_UNBUILD = "assemblyunbuild",
    AUTHENTICATE_DEVICE_INPUT = "AuthenticateDeviceInput",
    BALANCE_TRX_BY_SEGMENTS = "BalanceTrxBySegments",
    BALANCING_DETAIL = "BalancingDetail",
    BALANCING_RESULT = "BalancingResult",
    BALANCING_TRANSACTION = "BalancingTransaction",
    BILLING_ACCOUNT = "billingaccount",
    BILLING_ACCOUNT_BILL_CYCLE = "BillingAccountBillCycle",
    BILLING_ACCOUNT_BILL_REQUEST = "BillingAccountBillRequest",
    BILLING_CLASS = "billingclass",
    BILLING_RATE_CARD = "billingratecard",
    BILLING_REVENUE_EVENT = "billingrevenueevent",
    BILLING_SCHEDULE = "billingschedule",
    BIN = "bin",
    BIN_ITEM_BALANCE = "BinItemBalance",
    BIN_TRANSFER = "bintransfer",
    BIN_WORKSHEET = "binworksheet",
    BLANKET_PURCHASE_ORDER = "blanketpurchaseorder",
    BOM = "bom",
    BOM_REVISION = "bomrevision",
    BONUS = "bonus",
    BONUS_TYPE = "bonustype",
    BUDGET_EXCHANGE_RATE = "budgetexchangerate",
    BULK_OWNERSHIP_TRANSFER = "bulkownershiptransfer",
    BUNDLE_INSTALLATION_SCRIPT = "bundleinstallationscript",
    CALENDAR_EVENT = "calendarevent",
    CAMPAIGN = "campaign",
    CARDHOLDER_AUTHENTICATION = "CardholderAuthentication",
    CARDHOLDER_AUTHENTICATION_EVENT = "CardholderAuthenticationEvent",
    CASH_REFUND = "cashrefund",
    CASH_SALE = "cashsale",
    CHALLENGE_SHOPPER_INPUT = "ChallengeShopperInput",
    CHARGE = "charge",
    CHARGE_RULE = "chargerule",
    CHECK = "check",
    CLASSIFICATION = "classification",
    CLIENT_SCRIPT = "clientscript",
    CMS_CONTENT = "cmscontent",
    CMS_CONTENT_TYPE = "cmscontenttype",
    CMS_PAGE = "cmspage",
    COMMERCE_CATEGORY = "commercecategory",
    COMMERCE_SEARCH_ACTIVITY_DATA = "CommerceSearchActivityData",
    COMM_AN_SESSION = "CommAnSession",
    COMPETITOR = "competitor",
    COM_SEARCH_BOOST = "ComSearchBoost",
    COM_SEARCH_BOOST_TYPE = "ComSearchBoostType",
    COM_SEARCH_GROUP_SYN = "ComSearchGroupSyn",
    COM_SEARCH_ONE_WAY_SYN = "ComSearchOneWaySyn",
    CONSOLIDATED_EXCHANGE_RATE = "consolidatedexchangerate",
    CONTACT = "contact",
    CONTACT_CATEGORY = "contactcategory",
    CONTACT_ROLE = "contactrole",
    COST_CATEGORY = "costcategory",
    COUPON_CODE = "couponcode",
    CREDIT_CARD_CHARGE = "creditcardcharge",
    CREDIT_CARD_REFUND = "creditcardrefund",
    CREDIT_MEMO = "creditmemo",
    CURRENCY = "currency",
    CURRENCY_EXCHANGE_RATE = "CurrencyExchangeRate",
    CUSTOMER = "customer",
    CUSTOMER_CATEGORY = "customercategory",
    CUSTOMER_DEPOSIT = "customerdeposit",
    CUSTOMER_MESSAGE = "customermessage",
    CUSTOMER_PAYMENT = "customerpayment",
    CUSTOMER_PAYMENT_AUTHORIZATION = "customerpaymentauthorization",
    CUSTOMER_REFUND = "customerrefund",
    CUSTOMER_STATUS = "customerstatus",
    CUSTOMER_SUBSIDIARY_RELATIONSHIP = "customersubsidiaryrelationship",
    CUSTOM_PURCHASE = "custompurchase",
    CUSTOM_RECORD = "customrecord",
    CUSTOM_SALE = "customsale",
    CUSTOM_TRANSACTION = "customtransaction",
    DELETED_RECORD = "DeletedRecord",
    DEPARTMENT = "department",
    DEPOSIT = "deposit",
    DEPOSIT_APPLICATION = "depositapplication",
    DESCRIPTION_ITEM = "descriptionitem",
    DISCOUNT_ITEM = "discountitem",
    DOWNLOAD_ITEM = "downloaditem",
    EMAIL_TEMPLATE = "emailtemplate",
    EMPLOYEE = "employee",
    EMPLOYEE_CHANGE_REQUEST = "employeechangerequest",
    EMPLOYEE_CHANGE_REQUEST_TYPE = "employeechangerequesttype",
    EMPLOYEE_PAYROLL_ITEM = "EmployeePayrollItem",
    EMPLOYEE_STATUS = "EmployeeStatus",
    EMPLOYEE_TYPE = "EmployeeType",
    END_TO_END_TIME = "EndToEndTime",
    ENTITY = "entity",
    ENTITY_ACCOUNT_MAPPING = "entityaccountmapping",
    ESTIMATE = "estimate",
    EXPENSE_AMORTIZATION_EVENT = "expenseamortizationevent",
    EXPENSE_AMORT_PLAN_AND_SCHEDULE = "ExpenseAmortPlanAndSchedule",
    EXPENSE_CATEGORY = "expensecategory",
    EXPENSE_PLAN = "expenseplan",
    EXPENSE_REPORT = "expensereport",
    EXPENSE_REPORT_POLICY = "expensereportpolicy",
    FAIR_VALUE_PRICE = "fairvalueprice",
    FINANCIAL_INSTITUTION = "financialinstitution",
    FIXED_AMOUNT_PROJECT_REVENUE_RULE = "fixedamountprojectrevenuerule",
    FOLDER = "folder",
    FULFILLMENT_REQUEST = "fulfillmentrequest",
    GATEWAY_NOTIFICATION = "GatewayNotification",
    GENERIC_RESOURCE = "genericresource",
    GIFT_CERTIFICATE = "giftcertificate",
    GIFT_CERTIFICATE_ITEM = "giftcertificateitem",
    GLOBAL_ACCOUNT_MAPPING = "globalaccountmapping",
    GLOBAL_INVENTORY_RELATIONSHIP = "globalinventoryrelationship",
    GL_LINES_AUDIT_LOG = "GlLinesAuditLog",
    GL_NUMBERING_SEQUENCE = "glnumberingsequence",
    GOAL = "goal",
    IMPORTED_EMPLOYEE_EXPENSE = "importedemployeeexpense",
    INBOUND_SHIPMENT = "inboundshipment",
    INSTALLMENT = "Installment",
    INTER_COMPANY_JOURNAL_ENTRY = "intercompanyjournalentry",
    INTER_COMPANY_TRANSFER_ORDER = "intercompanytransferorder",
    INVENTORY_ADJUSTMENT = "inventoryadjustment",
    INVENTORY_BALANCE = "InventoryBalance",
    INVENTORY_COST_REVALUATION = "inventorycostrevaluation",
    INVENTORY_COUNT = "inventorycount",
    INVENTORY_DEMAND = "InventoryDemand",
    INVENTORY_DETAIL = "inventorydetail",
    INVENTORY_ITEM = "inventoryitem",
    INVENTORY_NUMBER = "inventorynumber",
    INVENTORY_NUMBER_BIN = "InventoryNumberBin",
    INVENTORY_NUMBER_ITEM = "InventoryNumberItem",
    INVENTORY_STATUS = "inventorystatus",
    INVENTORY_STATUS_CHANGE = "inventorystatuschange",
    INVENTORY_STATUS_LOCATION = "InventoryStatusLocation",
    INVENTORY_TRANSFER = "inventorytransfer",
    INVOICE = "invoice",
    INVOICE_GROUP = "invoicegroup",
    INVT_NUMBER_ITEM_BALANCE = "InvtNumberItemBalance",
    ISSUE = "issue",
    ITEM = "item",
    ITEM_ACCOUNT_MAPPING = "itemaccountmapping",
    ITEM_BIN_NUMBER = "ItemBinNumber",
    ITEM_COLLECTION = "itemcollection",
    ITEM_COLLECTION_ITEM_MAP = "itemcollectionitemmap",
    ITEM_DEMAND_PLAN = "itemdemandplan",
    ITEM_FULFILLMENT = "itemfulfillment",
    ITEM_GROUP = "itemgroup",
    ITEM_LOCATION_CONFIGURATION = "itemlocationconfiguration",
    ITEM_PROCESS_FAMILY = "itemprocessfamily",
    ITEM_PROCESS_GROUP = "itemprocessgroup",
    ITEM_RECEIPT = "itemreceipt",
    ITEM_REVISION = "itemrevision",
    ITEM_SUPPLY_PLAN = "itemsupplyplan",
    JOB = "job",
    JOB_STATUS = "jobstatus",
    JOB_TYPE = "jobtype",
    JOURNAL_ENTRY = "journalentry",
    KIT_ITEM = "kititem",
    LABOR_BASED_PROJECT_REVENUE_RULE = "laborbasedprojectrevenuerule",
    LABOR_CATEGORY = "LaborCategory",
    LABOR_COST_CARD = "LaborCostCard",
    LABOR_COST_CARD_ITEM = "LaborCostCardItem",
    LABOR_COST_CARD_SEGMENT = "LaborCostCardSegment",
    LABOR_COST_ELEMENT = "LaborCostElement",
    LEAD = "lead",
    LOCATION = "location",
    LOT_NUMBERED_ASSEMBLY_ITEM = "lotnumberedassemblyitem",
    LOT_NUMBERED_INVENTORY_ITEM = "lotnumberedinventoryitem",
    MANUFACTURING_COST_TEMPLATE = "manufacturingcosttemplate",
    MANUFACTURING_OPERATION_TASK = "manufacturingoperationtask",
    MANUFACTURING_ROUTING = "manufacturingrouting",
    MAP_REDUCE_SCRIPT = "mapreducescript",
    MARKUP_ITEM = "markupitem",
    MASSUPDATE_SCRIPT = "massupdatescript",
    MEM_DOC = "memdoc",
    MERCHANDISE_HIERARCHY_LEVEL = "merchandisehierarchylevel",
    MERCHANDISE_HIERARCHY_NODE = "merchandisehierarchynode",
    MERCHANDISE_HIERARCHY_VERSION = "merchandisehierarchyversion",
    MESSAGE = "message",
    MFG_PLANNED_TIME = "mfgplannedtime",
    NEXUS = "nexus",
    NON_INVENTORY_ITEM = "noninventoryitem",
    NOTE = "note",
    NOTE_TYPE = "notetype",
    OPPORTUNITY = "opportunity",
    ORDER_RESERVATION = "orderreservation",
    ORDER_TYPE = "ordertype",
    OTHER_CHARGE_ITEM = "otherchargeitem",
    OTHER_NAME = "othername",
    OTHER_NAME_CATEGORY = "othernamecategory",
    PARTNER = "partner",
    PARTNER_CATEGORY = "partnercategory",
    PAYCHECK = "paycheck",
    PAYCHECK_JOURNAL = "paycheckjournal",
    PAYMENT_EVENT = "PaymentEvent",
    PAYMENT_INSTRUMENT = "PaymentInstrument",
    PAYMENT_ITEM = "paymentitem",
    PAYMENT_METHOD = "paymentmethod",
    PAYMENT_OPTION = "PaymentOption",
    PAYMENT_RESULT_PREVIEW = "PaymentResultPreview",
    PAYROLL_ITEM = "payrollitem",
    PAYROLL_SETUP = "PayrollSetup",
    PCT_COMPLETE_PROJECT_REVENUE_RULE = "pctcompleteprojectrevenuerule",
    PERFORMANCE_METRIC = "performancemetric",
    PERFORMANCE_REVIEW = "performancereview",
    PERFORMANCE_REVIEW_SCHEDULE = "performancereviewschedule",
    PERIOD_END_JOURNAL = "periodendjournal",
    PERMISSION = "Permission",
    PHONE_CALL = "phonecall",
    PICK_STRATEGY = "pickstrategy",
    PICK_TASK = "picktask",
    PLANNED_ORDER = "plannedorder",
    PLANNING_ENGINE_MESSAGE = "PlanningEngineMessage",
    PLANNING_ENGINE_PEGGING = "PlanningEnginePegging",
    PLANNING_ENGINE_RESULT = "PlanningEngineResult",
    PLANNING_ITEM_CATEGORY = "planningitemcategory",
    PLANNING_ITEM_GROUP = "planningitemgroup",
    PLANNING_REPOSITORY_ALLOCATION = "PlanningRepositoryAllocation",
    PLANNING_REPOSITORY_BOM_EDGE = "PlanningRepositoryBomEdge",
    PLANNING_REPOSITORY_ITEM_LOCATION = "PlanningRepositoryItemLocation",
    PLANNING_REPOSITORY_SOURCE = "PlanningRepositorySource",
    PLANNING_RULE_GROUP = "planningrulegroup",
    PLANNING_VIEW = "planningview",
    PORTLET = "portlet",
    PRICE_BOOK = "pricebook",
    PRICE_LEVEL = "pricelevel",
    PRICE_PLAN = "priceplan",
    PRICING = "Pricing",
    PRICING_GROUP = "pricinggroup",
    PROJECT_EXPENSE_TYPE = "projectexpensetype",
    PROJECT_IC_CHARGE_REQUEST = "ProjectIcChargeRequest",
    PROJECT_TASK = "projecttask",
    PROJECT_TEMPLATE = "projecttemplate",
    PROMISING_SETUP = "PromisingSetup",
    PROMOTION_CODE = "promotioncode",
    PROSPECT = "prospect",
    PURCHASE_CONTRACT = "purchasecontract",
    PURCHASE_ORDER = "purchaseorder",
    PURCHASE_REQUISITION = "purchaserequisition",
    RECEIVED_VENDOR_BILL = "ReceivedVendorBill",
    RECENT_RECORD = "RecentRecord",
    RESOURCE_ALLOCATION = "resourceallocation",
    RESTLET = "restlet",
    RES_ALLOCATION_TIME_OFF_CONFLICT = "ResAllocationTimeOffConflict",
    RETURN_AUTHORIZATION = "returnauthorization",
    REVENUE_ARRANGEMENT = "revenuearrangement",
    REVENUE_COMMITMENT = "revenuecommitment",
    REVENUE_COMMITMENT_REVERSAL = "revenuecommitmentreversal",
    REVENUE_PLAN = "revenueplan",
    REV_REC_PLAN_AND_SCHEDULE = "RevRecPlanAndSchedule",
    REV_REC_SCHEDULE = "revrecschedule",
    REV_REC_TEMPLATE = "revrectemplate",
    ROLE = "Role",
    SALES_CHANNEL = "saleschannel",
    SALES_ORDER = "salesorder",
    SALES_ROLE = "salesrole",
    SALES_TAX_ITEM = "salestaxitem",
    SAVED_SEARCH = "SavedSearch",
    SCHEDULED_SCRIPT = "scheduledscript",
    SCHEDULED_SCRIPT_INSTANCE = "scheduledscriptinstance",
    SCRIPT_DEPLOYMENT = "scriptdeployment",
    SERIALIZED_ASSEMBLY_ITEM = "serializedassemblyitem",
    SERIALIZED_INVENTORY_ITEM = "serializedinventoryitem",
    SERVICE_ITEM = "serviceitem",
    SHIP_ITEM = "shipitem",
    SHOPPING_CART = "ShoppingCart",
    SOLUTION = "solution",
    STATE = "State",
    STATISTICAL_JOURNAL_ENTRY = "statisticaljournalentry",
    STORE_PICKUP_FULFILLMENT = "storepickupfulfillment",
    SUBSCRIPTION = "subscription",
    SUBSCRIPTION_CHANGE_ORDER = "subscriptionchangeorder",
    SUBSCRIPTION_LINE = "subscriptionline",
    SUBSCRIPTION_LINE_REVISION = "SubscriptionLineRevision",
    SUBSCRIPTION_PLAN = "subscriptionplan",
    SUBSCRIPTION_RENEWAL_HISTORY = "SubscriptionRenewalHistory",
    SUBSCRIPTION_TERM = "subscriptionterm",
    SUBSIDIARY = "subsidiary",
    SUBTOTAL_ITEM = "subtotalitem",
    SUITELET = "suitelet",
    SUITE_SCRIPT_DETAIL = "SuiteScriptDetail",
    SUPPLY_CHAIN_SNAPSHOT = "supplychainsnapshot",
    SUPPLY_CHAIN_SNAPSHOT_DETAILS = "SupplyChainSnapshotDetails",
    SUPPLY_CHANGE_ORDER = "supplychangeorder",
    SUPPLY_PLAN_DEFINITION = "supplyplandefinition",
    SUPPORT_CASE = "supportcase",
    SYSTEM_NOTE = "SystemNote",
    S_C_M_PREDICTED_RISKS = "SCMPredictedRisks",
    S_C_M_PREDICTION_TRAIN_HISTORY = "SCMPredictionTrainHistory",
    S_C_M_PREDICTION_TRAIN_W_Q_STATUS = "SCMPredictionTrainWQStatus",
    TASK = "task",
    TAX_DETAIL = "TaxDetail",
    TAX_GROUP = "taxgroup",
    TAX_PERIOD = "taxperiod",
    TAX_TYPE = "taxtype",
    TERM = "term",
    TIMESHEET_APPROVAL = "TimesheetApproval",
    TIME_APPROVAL = "TimeApproval",
    TIME_BILL = "timebill",
    TIME_ENTRY = "timeentry",
    TIME_OFF_CHANGE = "timeoffchange",
    TIME_OFF_PLAN = "timeoffplan",
    TIME_OFF_REQUEST = "timeoffrequest",
    TIME_OFF_RULE = "timeoffrule",
    TIME_OFF_TYPE = "timeofftype",
    TIME_SHEET = "timesheet",
    TOPIC = "topic",
    TRANSACTION = "transaction",
    TRANSFER_ORDER = "transferorder",
    UBER = "Uber",
    UNITS_TYPE = "unitstype",
    UNLOCKED_TIME_PERIOD = "unlockedtimeperiod",
    USAGE = "usage",
    USEREVENT_SCRIPT = "usereventscript",
    VENDOR = "vendor",
    VENDOR_BILL = "vendorbill",
    VENDOR_CATEGORY = "vendorcategory",
    VENDOR_CREDIT = "vendorcredit",
    VENDOR_PAYMENT = "vendorpayment",
    VENDOR_PREPAYMENT = "vendorprepayment",
    VENDOR_PREPAYMENT_APPLICATION = "vendorprepaymentapplication",
    VENDOR_RETURN_AUTHORIZATION = "vendorreturnauthorization",
    VENDOR_SUBSIDIARY_RELATIONSHIP = "vendorsubsidiaryrelationship",
    WAVE = "wave",
    WBS = "wbs",
    WEBSITE = "website",
    WORKFLOW_ACTION_SCRIPT = "workflowactionscript",
    WORKPLACE = "workplace",
    WORK_ORDER = "workorder",
    WORK_ORDER_CLOSE = "workorderclose",
    WORK_ORDER_COMPLETION = "workordercompletion",
    WORK_ORDER_ISSUE = "workorderissue",
    ZONE = "zone"
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
    AFTER = "after",
    ALLOF = "allof",
    ANY = "any",
    ANYOF = "anyof",
    BEFORE = "before",
    BETWEEN = "between",
    CONTAINS = "contains",
    DOESNOTCONTAIN = "doesnotcontain",
    DOESNOTSTARTWITH = "doesnotstartwith",
    EQUALTO = "equalto",
    GREATERTHAN = "greaterthan",
    GREATERTHANOREQUALTO = "greaterthanorequalto",
    HASKEYWORDS = "haskeywords",
    IS = "is",
    ISEMPTY = "isempty",
    ISNOT = "isnot",
    ISNOTEMPTY = "isnotempty",
    LESSTHAN = "lessthan",
    LESSTHANOREQUALTO = "lessthanorequalto",
    NONEOF = "noneof",
    NOTAFTER = "notafter",
    NOTALLOF = "notallof",
    NOTBEFORE = "notbefore",
    NOTBETWEEN = "notbetween",
    NOTEQUALTO = "notequalto",
    NOTGREATERTHAN = "notgreaterthan",
    NOTGREATERTHANOREQUALTO = "notgreaterthanorequalto",
    NOTLESSTHAN = "notlessthan",
    NOTLESSTHANOREQUALTO = "notlessthanorequalto",
    NOTON = "noton",
    NOTONORAFTER = "notonorafter",
    NOTONORBEFORE = "notonorbefore",
    NOTWITHIN = "notwithin",
    ON = "on",
    ONORAFTER = "onorafter",
    ONORBEFORE = "onorbefore",
    STARTSWITH = "startswith",
    WITHIN = "within",
}

/** @since 2015.2 */
export enum Summary {
    GROUP = "GROUP",
    COUNT = "COUNT",
    SUM = "SUM",
    AVG = "AVG",
    MIN = "MIN",
    MAX = "MAX",
}

/** @since 2015.2 */
export enum Sort {
    ASC = "ASC",
    DESC = "DESC",
    NONE = "NONE",
}
