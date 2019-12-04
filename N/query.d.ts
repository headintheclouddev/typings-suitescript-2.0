interface RunMethodType {
    (): ResultSet;
    promise(): Promise<ResultSet>;
}

interface RunPagedMethodType {
    (options: {pageSize: number}): PagedData;
    promise(options: {pageSize: number}): Promise<PagedData>;
}

interface AutoJoinOptions {
    /**
     * The relationship field that will be used to determine the query type of the
     * newly joined component and also the columns on which the query types will be joined
     * together. For example "salesrep".
     */
    fieldId: string;
}

interface JoinOptions {
    /**
     * The column type (field type) that joins the parent component to the new component.
     * This value determines the columns on which the components are joined and the type of the newly joined component. For example "salesrep".
     */
    fieldId: string;
}

interface JoinToOptions {
    /**
     * The name of the relationship field on which join with other query type is performed For example "entity".
     */
    fieldId: string;

    /**
     * The target target of the join. It is the specialized query type with which is this component joined.
     */
    target: string;
}

interface JoinFromOptions {
    /**
     * The name of the relationship field on which join with other query type is performed For example "salesrep".
     */
    name: string;

    /**
     * The query type on which is relationship field used to create the join with this component
     */
    source: string;
}

interface CreateConditionOptions {
    /**
     * Field (column) id
     */
    fieldId: string;

    /**
     * Use the Operator enum.
     */
    operator: Operator;

    /**
     * Array of values
     */
    values: string | string[];

    /**
     * Aggregate function. Use the Aggregate enum.
     */
    aggregate?: string;
}

interface CreateConditionWithFormulaOptions {
    /**
     * Formula
     */
    formula: string;

    /**
     * Explicitly define value type in case it is not determined correctly from the formula. Use the ReturnType enum.
     */
    type?: string;

    /**
     * Aggregate function. Use the Aggregate enum.
     */
    aggregate?: string;
}

interface CreateColumnOptions {
    /**
     * Field (column) id
     */
    fieldId: string;

    /**
     * Aggregate function. Use the Aggregate enum.
     */
    aggregate?: Aggregate;

    /**
     * Indicates that we want the results grouped by this column; used together with aggregate function defined
     * on other columns.
     */
    groupBy?: boolean;
}

interface CreateColumnWithFormulaOptions {

    /**
     * Formula
     */
    formula: string;

    /**
     * Explicitly define value type in case it is not determined correctly from the formula. Use the ReturnType enum.
     */
    type?: ReturnType;

    /**
     * Aggregate function. Use the Aggregate enum.
     */
    aggregate?: Aggregate;

    /**
     * Indicates that we want the results grouped by this column; used together with aggregate function defined
     * on other columns.
     */
    groupBy?: boolean;
}

interface CreateSortOptions {
    /**
     * The Column by which we want to sort.
     */
    column: Column;

    /**
     * The sort direction. True by default.
     */
    ascending?: boolean;

    /**
     * Where to put results with null value. Defaults to value of ascending flag
     */
    nullsLast?: boolean;

    caseSensitive?: boolean;

    locale?: SortLocale;
}

interface CreateQueryOptions {
    /**
     * The query type. Use the Type enum.
     */
    type: string;
}

interface LoadQueryOptions {
    /**
     * Id of query to be loaded
     */
    id: number;
}

interface DeleteQueryOptions {
    /**
     * Id of query to be delete
     */
    id: number;
}

interface RunSuiteQLOptions {
    /**
     * String representation of SuiteQL query
     */
    query: string;

    params?: Array<string | number | boolean>;
}

export interface Query {
    /**
     * Query type. Returns the query type given upon the creation of the query object.
     */
    readonly type: string;

    /**
     * Query condition.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting value of different type than Query.Condition
     */
    condition: Condition;

    /**
     * Columns to be returned from the query.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting value of different type than Query.Column array
     */
    columns: Column[];

    /**
     * Specifies how the results will be sorted.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting value of different type than Query.Sort array
     */
    sort: Sort[];

    /**
     * Children of the root component of the query. It is an object with key/value pairs where key is the name of the
     * child component and value is the corresponding Component object.
     * This is a shortcut for the Query.root.child expression.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly child: object;

    /**
     * Id of this query, null if query is not saved
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly id: number;

    /**
     * Name of this query, null if query is not saved
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly name: string;

    /**
     * Access the root component of the query. It is the component that corresponds to the query type given upon the
     * creation of the whole Query object.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly root: Component;

    /**
     * Execute the query and return results.
     * @governance 10 points
     */
    readonly run: RunMethodType;

    /**
     * Execute the query and return paged results.
     * @governance 10 points
     */
    readonly runPaged: RunPagedMethodType;

    /**
     * join the root component of the Query with another query type. This is a shortcut for Query.root.autoJoin.
     * @see Component.autoJoin
     */
    autoJoin(options: AutoJoinOptions): Component;

    /**
     * join the root component of the Query with another query type. This is a shortcut for Query.root.autoJoin.
     * @see Component.join
     */
    join(options: JoinOptions): Component;

    /**
     * join the root component of the Query with another (target) query type. This is a shortcut for Query.root.joinTo.
     * @see Component.joinTo
     */
    joinTo(options: JoinToOptions): Component;

    /**
     * join the root component of the Query with another (source) query type. This is a shortcut
     * for Query.root.joinFrom.
     * @see Component.joinFrom
     */
    joinFrom(options: JoinFromOptions): Component;

    /**
     * Create a Condition object based on the root component of the Query. This is a shortcut
     * for Query.root.createCondition.
     * @see Component.createCondition
     */
    createCondition(options: CreateConditionOptions | CreateConditionWithFormulaOptions): Condition;

    /**
     * Create a Column object based on the root component of the Query. This is a shortcut for Query.root.createColumn.
     * @see Component.createColumn
     */
    createColumn(options: CreateColumnOptions): Column;

    /**
     * Create a Sort object based on the root component of the Query. This is a shortcut for Query.root.createSort.
     * @see Component.createSort
     */
    createSort(options: CreateSortOptions): Sort;

    /**
     * Create a new Condition object that corresponds to a logical conjunction (AND) of the Condition objects given to
     * the method as arguments. The arguments must be one or more Condition objects.
     */
    and(...conditions: Condition[]): Condition;

    /**
     * Create a new Condition object that corresponds to a logical disjunction (OR) of the Condition objects given to
     * the method as arguments. The arguments must be one or more Condition objects.
     */
    or(...conditions: Condition[]): Condition;

    /**
     * Create a new Condition object that corresponds to a logical negation (NOT) of the Condition object given
     * to the method as argument.
     */
    not(condition: Condition): Condition;

    /**
     * Returns the object type name.
     */
    toString(): string;

    /**
     * JSON.stringify() implementation.
     */
    toJSON(): object;
}

/**
 * One component of the query definition. The Query object always contains at least one Component object called
 * the root component. Queries with multi-level joins contain multiple Component objects linked together into
 * a parent/child hierarchy.
 */
export interface Component {
    /**
     * Query type. Returns the query type of this component.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly type: string;

    /**
     * Inverse target. Returns the source query type from which is this component joined.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly source: string;

    /**
     * Polymorphic target. Returns the target target of this component.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly target: string;

    /**
     * Returns the Component that corresponds to the ancestor of this component in the query object model.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly parent: string;

    /**
     * Children of this component. It is an object with key/value pairs where key is the name of the child component
     * and value is the corresponding Component object.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly child: object;

    /**
     * join this component with another query type. A new component corresponding to the given relationship is created
     * and joined with this one.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if fieldId is undefined
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if relationship is already used
     */
    autoJoin(options: AutoJoinOptions): Component;

    /**
     * join this component with another query type. A new component corresponding to the given relationship is created
     * and joined with this one.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if name is undefined
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if relationship is already used
     */
    join(options: JoinOptions): Component;

    /**
     * join this component with another query type. A new component corresponding to the given relationship is created
     * and joined with this one.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if relationship is undefined
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if relationship is already used
     */
    joinTo(options: JoinToOptions): Component;

    /**
     * join this component with another query type. A new component corresponding to the given relationship is created
     * and joined with this one.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if relationship is undefined
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if relationship is already used
     */
    joinFrom(options: JoinFromOptions): Component;

    /**
     * Create a Condition object based on this query component. Use either fieldId + operator + values or
     * formula + (optional) type.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options are undefined
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object
     * @throws {SuiteScriptError} OPERATOR_ARITY_MISMATCH if requested operator cannot work with specified number of
     *                                                    arguments
     * @throws {SuiteScriptError} INVALID_SEARCH_OPERATOR if wrong query operator is used
     */
    createCondition(options: CreateConditionOptions | CreateConditionWithFormulaOptions): Condition;

    /**
     * Create a Column object based on this query component. Use either name or formula + (optional) type.
     * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options are undefined
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object
     * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS when two mutually arguments are defined
     * @throws {SuiteScriptError} NEITHER_ARGUMENT_DEFINED when neither of two mandatory arguments is defined
     */
    createColumn(options: CreateColumnOptions | CreateColumnWithFormulaOptions): Column;

    /**
     * Create a Sort object based on this query component.
     */
    createSort(options: CreateSortOptions): Sort;
}

/**
 * Specifies a return column.
 */
export interface Column {
    /**
     * Id of column field.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly prototype: string;

    /**
     * Query component. Returns the Component to which this column belongs.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly component: Component;

    /**
     * Formula.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly formula: string;

    /**
     * Desired value type of the formula (if it was explicitly stated upon Column creation).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly type: string;

    /**
     * Aggregate function (value from Aggregate enum).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly aggregate: string;

    /**
     * The group-by flag.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly groupBy: boolean;
}

/**
 * Specifies sorting by the values of a given column and the sort direction.
 */
export interface Sort {
    /**
     * The query column by which we want to sort.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly column: Column;

    /**
     * Flag indicating if sort is ascending
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting wrong sort order is attempted
     */
    ascending: boolean;

    /**
     * Sort case sensitivity.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting non-boolean parameter
     */
    caseSensitive: boolean;

    /**
     * Flag indicating where results with null value should be sorted
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting non-boolean parameter
     */
    nullsLast: boolean;

    /**
     * Sort locale
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE when setting non-boolean parameter
     */
    locale: string;
}

/**
 * Specifies the condition used to filter the results. It can consist of other Condition objects.
 */
export interface Condition {
    /**
     * This is only applicable to "non-leaf" conditions that were created by AND-ing, OR-ing or NOT-ing other
     * Condition objects. In such case this property holds the child Component objects that are arguments of the
     * logical operation.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly children: Condition[];

    /**
     * Field id. This is only applicable to "leaf" conditions (equivalent to the former Filter).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly fieldId: string;

    /**
     * Operator. This is only applicable to "leaf" conditions (equivalent to the former Filter).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly operator: Operator;

    /**
     * Values. This is only applicable to "leaf" conditions (equivalent to the former Filter).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly values: string[];

    /**
     * Formula. This is only applicable to "leaf" conditions (equivalent to the former Filter).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly formula: string;

    /**
     * Return type of the formula, if explicitly specified. This is only applicable to "leaf" conditions
     * (equivalent to the former Filter). (values from the ReturnType enum)
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly type: string;

    /**
     * Aggregate function. This is only applicable to "leaf" conditions (equivalent to the former Filter).
     * (values from the Aggregate enum)
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly aggregate: string;

    /**
     * Query component to which this condition belongs. This is only applicable to "leaf" conditions (equivalent to the
     * former Filter).
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly component: Component;
}

/**
 * Set of results returned by the query.
 */
export interface ResultSet {
    /**
     * The actual query results.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly results: Result[];

    /**
     * The types of the return values. Array of values from the ReturnType enum. Number and order of values in the array
     * exactly matches the ResultSet.columns property.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly types: string[];

    /**
     * The return columns.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly columns: Column[];

    /**
     * Standard object for iterating through results.
     * @governance 10 points for each page returned
     */
    iterator(): Iterator;
}

/**
 * Corresponds to a single row of the ResultSet.
 */
export interface Result {
    /**
     * The result values. Value types correspond to the ResultSet.types property. Number and order of values in
     * the array exactly matches the ResultSet.types, ResultSet.columns or Result.columns property.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly values: Array<string | number | null>;

    /**
     * The return columns. This is equivalent to ResultSet.columns.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly columns: Column[];
}

/**
 * One page of the paged query results.
 * @since 2018.1
 */
export interface Page {
    /**
     * References the query results contained in this page.
     */
    readonly data: ResultSet;

    /**
     * Indicates whether this page is the first of the paged query results.
     */
    readonly isFirst: boolean;

    /**
     * Indicates whether this page is the last of the paged query results.
     */
    readonly isLast: boolean;

    /**
     * References the set of paged query results that this page is from.
     */
    readonly pagedData: PagedData;

    /**
     * The range of query results for this page.
     */
    readonly pageRange: PageRange;
}

/**
 * Encapsulates a set of paged query results. This object also contains information about the set of paged results
 * it encapsulates.
 */
export interface PagedData {
    /**
     * Describes the total number of paged query results.
     */
    readonly count: number;

    /**
     * Holds an array of page ranges for the set of paged query results.
     */
    readonly pageRanges: PageRange[];

    /**
     * Describes the number of query result rows per page.
     */
    readonly pageSize: number;

    /**
     * Standard SuiteScript 2.0 object for iterating through results.
     */
    iterator(): Iterator;

    fetch(index: number): Page;
}

/**
 * Encapsulates the range of query results for a page.
 */
export interface PageRange {
    /**
     * Describes the array index for this page range.
     */
    readonly index: number;

    /**
     * Describes the number of query result rows in this page range.
     */
    readonly size: number;
}

export interface Iterator {
    each(f: (result: Result) => boolean): void;
}

/**
 * Create a Query object with a single query component based on the given query type.
 * @throws {SuiteScriptError} INVALID_RCRD_TYPE when query type is invalid
 */
export function create(options: CreateQueryOptions): Query;

/**
 * Loads query by id
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options or id are undefined
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object or id isn't number
 * @throws {SuiteScriptError} UNABLE_TO_LOAD_QUERY if query doesn't exist or no permissions to load it
 */
export function load(options: LoadQueryOptions): Query;

interface deleteQuery {
  /**
   * Deletes query by id
   * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options or id are undefined
   * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object or id isn't number
   * @throws {SuiteScriptError} UNABLE_TO_DELETE_QUERY if query doesn't exist or no permissions to delete it
   */
  (options: DeleteQueryOptions): Query;
}

export {deleteQuery as delete};

/**
 * Deletes query by id
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options or query are undefined
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object or id isn't number
 * @throws {SuiteScriptError} UNABLE_TO_DELETE_QUERY if query doesn't exist or no permissions to delete it
 */
export function runSuiteQL(options: RunSuiteQLOptions): ResultSet;

export const enum Operator {
    AFTER = "AFTER",
    AFTER_NOT = "AFTER_NOT",
    ANY_OF = "ANY_OF",
    ANY_OF_NOT = "ANY_OF_NOT",
    BEFORE = "BEFORE",
    BEFORE_NOT = "BEFORE_NOT",
    BETWEEN = "BETWEEN",
    BETWEEN_NOT = "BETWEEN_NOT",
    CONTAIN = "CONTAIN",
    CONTAIN_NOT = "CONTAIN_NOT",
    EMPTY = "EMPTY",
    EMPTY_NOT = "EMPTY_NOT",
    ENDWITH = "ENDWITH",
    ENDWITH_NOT = "ENDWITH_NOT",
    EQUAL = "EQUAL",
    EQUAL_NOT = "EQUAL_NOT",
    GREATER = "GREATER",
    GREATER_NOT = "GREATER_NOT",
    GREATER_OR_EQUAL = "GREATER_OR_EQUAL",
    GREATER_OR_EQUAL_NOT = "GREATER_OR_EQUAL_NOT",
    IS = "IS",
    IS_NOT = "IS_NOT",
    LESS = "LESS",
    LESS_NOT = "LESS_NOT",
    LESS_OR_EQUAL = "LESS_OR_EQUAL",
    LESS_OR_EQUAL_NOT = "LESS_OR_EQUAL_NOT",
    ON = "ON",
    ON_NOT = "ON_NOT",
    ON_OR_AFTER = "ON_OR_AFTER",
    ON_OR_AFTER_NOT = "ON_OR_AFTER_NOT",
    ON_OR_BEFORE = "ON_OR_BEFORE",
    ON_OR_BEFORE_NOT = "ON_OR_BEFORE_NOT",
    START_WITH = "START_WITH",
    START_WITH_NOT = "START_WITH_NOT",
    WITHIN = "WITHIN",
    WITHIN_NOT = "WITHIN_NOT",
}

export const enum Type {
    ACCOUNT = "account",
    ACCOUNTING_CONTEXT = "accountingcontext",
    ACCOUNTING_PERIOD = "accountingperiod",
    ADVANCED_REV_REC_PLUGIN = "advancedrevrecplugin",
    ADV_INTERCOMPANY_JOURNAL_ENTRY = "advintercompanyjournalentry",
    ALLOCATION_METHOD = "allocationmethod",
    AMORTIZATION_SCHEDULE = "amortizationschedule",
    AMORTIZATION_TEMPLATE = "amortizationtemplate",
    ANOTHER_HIERARCHY_RECORD = "anotherhierarchyrecord",
    BANK_CONNECTIVITY_PLUGIN = "bankconnectivityplugin",
    BILLING_CLASS = "billingclass",
    BILLING_SCHEDULE = "billingschedule",
    BRANCHRECORD = "branchrecord",
    BUDGETCATEGORY = "budgetcategory",
    BUDGETEXCHANGERATE = "budgetexchangerate",
    BUDGETIMPORT = "budgetimport",
    BUDGETS = "budgets",
    BULK_PROC_SUBMISSION = "bulkprocsubmission",
    BUNDLE_INSTALLATION_SCRIPT = "bundleinstallationscript",
    BUNDLE_INSTALLATION_SCRIPT_DEPLOYMENT = "bundleinstallationscriptdeployment",
    BUYING_REASON = "buyingreason",
    BUYING_TIME_FRAME = "buyingtimeframe",
    CALENDAR_EVENT = "calendarevent",
    CAMPAIGN_AUDIENCE = "campaignaudience",
    CAMPAIGN_CATEGORY = "campaigncategory",
    CAMPAIGN_CHANNEL = "campaignchannel",
    CAMPAIGN_EMAIL_ADDRESS = "campaignemailaddress",
    CAMPAIGN_EVENT = "campaignevent",
    CAMPAIGN_FAMILY = "campaignfamily",
    CAMPAIGN_OFFER = "campaignoffer",
    CAMPAIGN_RESPONSE = "campaignresponse",
    CAMPAIGN_SEARCH_ENGINE = "campaignsearchengine",
    CAMPAIGN_TEMPLATE = "campaigntemplate",
    CAMPAIGN_VERTICAL = "campaignvertical",
    CASE_PROFILE = "caseprofile",
    CASH_REFUND = "cashrefund",
    CASH_SALE = "cashsale",
    CATEGORY1099MISC = "category1099misc",
    CHECK = "check",
    CLASSIFICATION = "classification",
    CLIENT_SCRIPT = "clientscript",
    CLIENT_SCRIPT_DEPLOYMENT = "clientscriptdeployment",
    CLOB_RECORD = "clobrecord",
    COMPANY = "company",
    COMPETITOR = "competitor",
    COMPOSITE_KEY_SOURCE_RECORD = "compositekeysourcerecord",
    COMPOSITE_RECORD = "compositerecord",
    CONSOLIDATEDEXCHANGERATE = "consolidatedexchangerate",
    CONSOLIDATEDEXCHANGERATEINTERNAL = "consolidatedexchangerateinternal",
    CONSOLIDATED_RATE_ADJUSTOR_PLUGIN = "consolidatedrateadjustorplugin",
    CONSOLIDATION_ACCOUNT = "consolidationaccount",
    CONSOLIDATION_ACCOUNT_TYPE = "consolidationaccounttype",
    CONSOLIDATION_BUDGET_RATE = "consolidationbudgetrate",
    CONSOLIDATION_CURRENCY = "consolidationcurrency",
    CONSOLIDATION_RATE = "consolidationrate",
    CONSOLIDATION_SUBSIDIARY = "consolidationsubsidiary",
    CONSOLIDATION_TRANSACTION = "consolidationtransaction",
    CONSUMER_SPECIFIC_RECORD_TYPE = "consumerspecificrecordtype",
    CONTACT = "contact",
    CONTACT_CATEGORY = "contactcategory",
    CONTACT_ROLE = "contactrole",
    COUPON_CODE = "couponcode",
    COURSE_RECORD = "courserecord",
    CREDIT_CARDS = "creditcards",
    CREDIT_CARD_CHARGE = "creditcardcharge",
    CREDIT_CARD_REFUND = "creditcardrefund",
    CREDIT_MEMO = "creditmemo",
    CRM_TEMPLATE = "crmtemplate",
    CRM_TEMPLATE_CATEGORY = "crmtemplatecategory",
    CURRENCY = "currency",
    CURRENCY_FIELD_RECORD = "currencyfieldrecord",
    CURRENCY_FIELD_TYPE = "currencyfieldtype",
    CURRENCY_RATE = "currencyrate",
    CUSTOM = "custom",
    CUSTOMER = "customer",
    CUSTOMER_CATEGORY = "customercategory",
    CUSTOMER_CHARGE = "customercharge",
    CUSTOMER_DEPOSIT = "customerdeposit",
    CUSTOMER_MESSAGE = "customermessage",
    CUSTOMER_PAYMENT = "customerpayment",
    CUSTOMER_REFUND = "customerrefund",
    CUSTOMER_STATUS = "customerstatus",
    CUSTOMRECORD1 = "customrecord1",
    CUSTOM_GL_PLUGIN = "customglplugin",
    CUSTOM_LIST = "customlist",
    CUSTOM_RECORD_TYPE = "customrecordtype",
    DATE_FIELD_TYPE = "datefieldtype",
    DATE_RECORD = "daterecord",
    DATE_TIME_RECORD = "datetimerecord",
    DATE_TIME_ZONE = "datetimezone",
    DEFAULTING_PORTED_RECORD = "defaultingportedrecord",
    DEF_VIEW_TEST_RECORD = "defviewtestrecord",
    DELETED_RECORD = "deletedrecord",
    DEPARTMENT = "department",
    DEPOSIT = "deposit",
    DEPOSIT_APPLICATION = "depositapplication",
    DESCRIPTION_ITEM = "descriptionitem",
    DEVICE_ID = "deviceid",
    DISABLEDCHANNELFORMTESTRECORD = "disabledchannelformtestrecord",
    DISCOUNT_ITEM = "discountitem",
    DISPLAY_INACTIVE_TEST_RECORD = "displayinactivetestrecord",
    DOMAIN = "domain",
    DOWNLOAD_ITEM = "downloaditem",
    DURATION_RECORD = "durationrecord",
    EMAIL_CAPTURE_PLUGIN = "emailcaptureplugin",
    EMAIL_TEMPLATE = "emailtemplate",
    EMPLOYEE = "employee",
    EMPLOYEE_LIST = "employeelist",
    EMPLOYEE_STATUS = "employeestatus",
    END_TO_END_TIME = "endtoendtime",
    ENTITY = "entity",
    ENTITY_GROUP = "entitygroup",
    ESCALATION_TERRITORY = "escalationterritory",
    ESTIMATE = "estimate",
    EXAMPLE_TRANSACTION = "exampletransaction",
    EXPENSE_CATEGORY = "expensecategory",
    EXPENSE_REPORT = "expensereport",
    EXPOSURENOTLIMITEDRECORD = "exposurenotlimitedrecord",
    FACULTYRECORD = "facultyrecord",
    FAX_TEMPLATE = "faxtemplate",
    FIELD_LABEL = "fieldlabel",
    FILE = "file",
    FLOAT_NUMBERS_TEST_RECORD = "floatnumberstestrecord",
    FORECAST = "forecast",
    FORMULA_POLYMORPHIC_RECORD = "formulapolymorphicrecord",
    FORMULA_RECORD = "formularecord",
    FULFILLMENT_EXCEPTION_REASON = "fulfillmentexceptionreason",
    FX_REVAL = "fxreval",
    GATEWAY_NOTIFICATION = "gatewaynotification",
    GENERAL_ALLOCATION_SCHEDULE = "generalallocationschedule",
    GENERIC_RESOURCE = "genericresource",
    GENERIC_TEST_RECORD = "generictestrecord",
    GIFT_CERTIFICATE = "giftcertificate",
    GIFT_CERTIFICATE_ITEM = "giftcertificateitem",
    HIERARCHY_RECORD = "hierarchyrecord",
    HYBRID_RECORD_LOG = "hybridrecordlog",
    INCOTERM = "incoterm",
    INTEGRATION_APP = "integrationapp",
    INTERNAL_ID_TEST_RECORD = "internalidtestrecord",
    INVENTORY_ADJUSTMENT = "inventoryadjustment",
    INVENTORY_DISTRIBUTION = "inventorydistribution",
    INVENTORY_ITEM = "inventoryitem",
    INVENTORY_TRANSFER = "inventorytransfer",
    INVENTORY_WORKSHEET = "inventoryworksheet",
    INVOICE = "invoice",
    INVT_ITEM_PRICE_HISTORY = "invtitempricehistory",
    ISSUE = "issue",
    ISSUE_EXTERNAL_STATUS = "issueexternalstatus",
    ISSUE_PRIORITY = "issuepriority",
    ISSUE_PRODUCT = "issueproduct",
    ISSUE_REPRODUCIBILITY = "issuereproducibility",
    ISSUE_ROLE = "issuerole",
    ISSUE_SEVERITY = "issueseverity",
    ISSUE_SOURCE = "issuesource",
    ISSUE_STATUS = "issuestatus",
    ISSUE_TAG = "issuetag",
    ISSUE_TRACK_CODE = "issuetrackcode",
    ISSUE_TYPE = "issuetype",
    ITEM = "item",
    ITEM_FULFILLMENT = "itemfulfillment",
    ITEM_GROUP = "itemgroup",
    ITEM_RECEIPT = "itemreceipt",
    I_P_RESTRICTIONS = "iprestrictions",
    JOB = "job",
    JOB_RESOURCE_ROLE = "jobresourcerole",
    JOB_STATUS = "jobstatus",
    JOB_TYPE = "jobtype",
    JOURNAL = "journal",
    KIT_ITEM = "kititem",
    KNOWLEDGE_BASE = "knowledgebase",
    LOCATION = "location",
    LOCATION_COSTING_GROUP = "locationcostinggroup",
    LOGIN_AUDIT = "loginaudit",
    MAIL_TEMPLATE = "mailtemplate",
    MAP_REDUCE_SCRIPT = "mapreducescript",
    MAP_REDUCE_SCRIPT_DEPLOYMENT = "mapreducescriptdeployment",
    MARKUP_ITEM = "markupitem",
    MASS_UPDATE_SCRIPT = "massupdatescript",
    MASS_UPDATE_SCRIPT_DEPLOYMENT = "massupdatescriptdeployment",
    MATERIALIZED_HIERARCHY_RECORD = "materializedhierarchyrecord",
    MEDIA_ITEM_FOLDER = "mediaitemfolder",
    MEM_DOC = "memdoc",
    MEM_DOC_TRANSACTION_TEMPLATE = "memdoctransactiontemplate",
    MESSAGE = "message",
    NAMED_GROUP_RECORD = "namedgrouprecord",
    NEXUS = "nexus",
    NON_INVENTORY_PURCHASE_ITEM = "noninventorypurchaseitem",
    NON_INVENTORY_RESALE_ITEM = "noninventoryresaleitem",
    NON_INVENTORY_SALE_ITEM = "noninventorysaleitem",
    NOTE = "note",
    NOTE_TYPE = "notetype",
    NUMERIC_RECORD = "numericrecord",
    ONLINE_CASE_FORM = "onlinecaseform",
    ONLINE_FORM_TEMPLATE = "onlineformtemplate",
    ONLINE_LEAD_FORM = "onlineleadform",
    OPPORTUNITY = "opportunity",
    OTHER_CHARGE_PURCHASE_ITEM = "otherchargepurchaseitem",
    OTHER_CHARGE_RESALE_ITEM = "otherchargeresaleitem",
    OTHER_CHARGE_SALE_ITEM = "otherchargesaleitem",
    OTHER_NAME = "othername",
    OTHER_NAME_CATEGORY = "othernamecategory",
    PAGE = "page",
    PAGINATION_RECORD = "paginationrecord",
    PARTNER = "partner",
    PARTNER_CATEGORY = "partnercategory",
    PAYCHECK = "paycheck",
    PAYMENT_EVENT = "paymentevent",
    PAYMENT_GATEWAY_PLUGIN = "paymentgatewayplugin",
    PAYMENT_ITEM = "paymentitem",
    PAYMENT_METHOD = "paymentmethod",
    PAYMENT_PROCESSING_PROFILE = "paymentprocessingprofile",
    PAYROLL_ITEM = "payrollitem",
    PDF_TEMPLATE = "pdftemplate",
    PERSISTED_RECORD = "persistedrecord",
    PERSISTED_RECORD_FULL_JOIN = "persistedrecordfulljoin",
    PERSISTED_RECORD_INVALID_TABLE = "persistedrecordinvalidtable",
    PERSISTED_RECORD_NO_CREATE = "persistedrecordnocreate",
    PERSISTED_RECORD_NO_DELETE = "persistedrecordnodelete",
    PERSISTED_RECORD_NO_EDIT = "persistedrecordnoedit",
    PERSISTED_RECORD_NO_LOAD = "persistedrecordnoload",
    PERSISTED_RECORD_RIGHT_JOIN = "persistedrecordrightjoin",
    PERSISTED_RECORD_SIMPLE_OPTIONS = "persistedrecordsimpleoptions",
    PERSISTED_RECORD_U_Q_KEY_REF = "persistedrecorduqkeyref",
    PERSISTED_RECORD_U_Q_KEY_REF_TYPE = "persistedrecorduqkeyreftype",
    PHONE_CALL = "phonecall",
    PLUG_IN_TYPE = "plugintype",
    PLUG_IN_TYPE_IMPL = "plugintypeimpl",
    PORTLET = "portlet",
    PORTLET_DEPLOYMENT = "portletdeployment",
    PRICE_LEVEL = "pricelevel",
    PRICING = "pricing",
    PRICING_GROUP = "pricinggroup",
    PRIMARY_RECORD = "primaryrecord",
    PROJECT_TASK = "projecttask",
    PROJECT_TEMPLATE = "projecttemplate",
    PROMOTIONS_PLUGIN = "promotionsplugin",
    PROMOTION_CODE = "promotioncode",
    PUBLISHED_SAVED_SEARCH = "publishedsavedsearch",
    PURCHASE_ORDER = "purchaseorder",
    PURCHASE_REQUISITION = "purchaserequisition",
    QUANTITY_PRICING_SCHEDULE = "quantitypricingschedule",
    QUOTA = "quota",
    RECENT_RECORD = "recentrecord",
    RECORD_SERVICE_TEST_RECORD = "recordservicetestrecord",
    RECORD_TYPE = "recordtype",
    RECORD_WITH_HIERARCHY_RELATIONSHIP = "recordwithhierarchyrelationship",
    REDIRECT = "redirect",
    REGION = "region",
    RELATIONSHIP_DISPLAY_INACTIVE = "relationshipdisplayinactive",
    RELATIONSHIP_SELECT_EMPLOYEE_RECORD = "relationshipselectemployeerecord",
    REPORT_DEFINITION = "reportdefinition",
    REQUEST_LEVEL_RECORD1 = "requestlevelrecord1",
    REQUEST_LEVEL_RECORD2 = "requestlevelrecord2",
    RESOURCE = "resource",
    RESTLET = "restlet",
    RESTLET_DEPLOYMENT = "restletdeployment",
    RESTRICTIONS_ONCE_REMOVED = "restrictionsonceremoved",
    RESTRICTIONS_TWICE_REMOVED = "restrictionstwiceremoved",
    RESTRICTION_ANNOTATION_TEST_RECORD = "restrictionannotationtestrecord",
    RESTRICTION_TEST_RECORD = "restrictiontestrecord",
    RETURN_AUTHORIZATION = "returnauthorization",
    REV_REC_SCHEDULE = "revrecschedule",
    REV_REC_TEMPLATE = "revrectemplate",
    ROLE = "role",
    RSTR_ALT_LOCATION = "rstraltlocation",
    RSTR_LOCATION = "rstrlocation",
    RSTR_RECORD = "rstrrecord",
    SALES = "sales",
    SALES_ORDER = "salesorder",
    SALES_READINESS = "salesreadiness",
    SALES_ROLE = "salesrole",
    SALES_TAX_ITEM = "salestaxitem",
    SALES_TERRITORY = "salesterritory",
    SALES_TRANSACTION = "salestransaction",
    SAMPLE_RECORD = "samplerecord",
    SCHEDULED_SCRIPT = "scheduledscript",
    SCHEDULED_SCRIPT_DEPLOYMENT = "scheduledscriptdeployment",
    SCHEDULED_SCRIPT_INSTANCE = "scheduledscriptinstance",
    SCRIPT = "script",
    SCRIPTING_TEST_RECORD = "scriptingtestrecord",
    SCRIPTING_TEST_RECORD_SUBRECORD2_TARGET = "scriptingtestrecordsubrecord2target",
    SCRIPTING_TEST_RECORD_SUBRECORD2_TARGET2 = "scriptingtestrecordsubrecord2target2",
    SCRIPTING_TEST_RECORD_SUBRECORD3_TARGET = "scriptingtestrecordsubrecord3target",
    SCRIPTING_TEST_RECORD_SUBRECORD3_TARGET2 = "scriptingtestrecordsubrecord3target2",
    SCRIPTING_TEST_RECORD_SUBRECORD4_TARGET = "scriptingtestrecordsubrecord4target",
    SCRIPTING_TEST_RECORD_SUBRECORD4_TARGET2 = "scriptingtestrecordsubrecord4target2",
    SCRIPTING_TEST_RECORD_SUBRECORD_TARGET = "scriptingtestrecordsubrecordtarget",
    SCRIPTING_TEST_RECORD_SUBRECORD_TARGET2 = "scriptingtestrecordsubrecordtarget2",
    SCRIPTING_TEST_RECORD_TARGET = "scriptingtestrecordtarget",
    SCRIPTING_TEST_RECORD_TARGET2 = "scriptingtestrecordtarget2",
    SCRIPT_DEPLOYMENT = "scriptdeployment",
    SCRIPT_NOTE = "scriptnote",
    SCRIPT_RECORD_TYPE = "scriptrecordtype",
    SCRIP_INH_TEST_RECORD1 = "scripinhtestrecord1",
    SCRIP_INH_TEST_RECORD2 = "scripinhtestrecord2",
    SCRIP_INH_TEST_RECORD3 = "scripinhtestrecord3",
    SCRIP_INH_TEST_RECORD4 = "scripinhtestrecord4",
    SEARCH_CAMPAIGN = "searchcampaign",
    SEARCH_SCHEDULE = "searchschedule",
    SEARCH_URL_TEST_SOURCE_RECORD = "searchurltestsourcerecord",
    SEARCH_URL_TEST_TARGET_RECORD = "searchurltesttargetrecord",
    SELECT_OPTIONS_SOURCE_RECORD = "selectoptionssourcerecord",
    SERVICE_PURCHASE_ITEM = "servicepurchaseitem",
    SERVICE_RESALE_ITEM = "serviceresaleitem",
    SERVICE_SALE_ITEM = "servicesaleitem",
    SHIPPING_PACKAGE = "shippingpackage",
    SHIPPING_PARTNERS_PLUGIN = "shippingpartnersplugin",
    SHIP_ITEM = "shipitem",
    SHOPPING_CART = "shoppingcart",
    SIMPLE_RECORD = "simplerecord",
    SIMPLE_RECORD_LOCATION = "simplerecordlocation",
    SITE_CATEGORY = "sitecategory",
    SLAVE = "slave",
    SLAVE_EMPTY_EXPRESSION = "slaveemptyexpression",
    SLAVE_FEATURE = "slavefeature",
    SLAVE_MASTER_PERMISSION = "slavemasterpermission",
    SLAVE_PERMISSION = "slavepermission",
    SLAVE_TARGET_PROPERTY = "slavetargetproperty",
    SLAVE_VALID_EXPRESSION = "slavevalidexpression",
    SOLUTION = "solution",
    SORT_BASE_RECORD = "sortbaserecord",
    SORT_RECORD = "sortrecord",
    SORT_RELATED_RECORD = "sortrelatedrecord",
    STATIC_LIST_RECORD = "staticlistrecord",
    STATIC_OPTIONS_FIELD_TEST_RECORD = "staticoptionsfieldtestrecord",
    STATIC_OPTIONS_VALUE = "staticoptionsvalue",
    STORE_TAB = "storetab",
    STUDENT_RECORD = "studentrecord",
    SUBLIST = "sublist",
    SUBSIDIARY = "subsidiary",
    SUBTOTAL_ITEM = "subtotalitem",
    SUB_SELECT_GROUP_RECORD = "subselectgrouprecord",
    SUITELET = "suitelet",
    SUITELET_DEPLOYMENT = "suiteletdeployment",
    SUITE_SCRIPT_DETAIL = "suitescriptdetail",
    SUPPORT_CASE = "supportcase",
    SUPPORT_CASE_ISSUE = "supportcaseissue",
    SUPPORT_CASE_ORIGIN = "supportcaseorigin",
    SUPPORT_CASE_PRIORITY = "supportcasepriority",
    SUPPORT_CASE_STATUS = "supportcasestatus",
    SUPPORT_CASE_TYPE = "supportcasetype",
    SUPPORT_TERRITORY = "supportterritory",
    SYSTEM_EMAIL_TEMPLATE = "systememailtemplate",
    SYSTEM_JOURNAL = "systemjournal",
    SYSTEM_NOTE = "systemnote",
    SYSTEM_NOTE_FIELD = "systemnotefield",
    TABLE_CONDITION_TEST_RECORD = "tableconditiontestrecord",
    TASK = "task",
    TASK_ITEM_STATUS = "taskitemstatus",
    TAX_CALCULATION_PLUGIN = "taxcalculationplugin",
    TAX_ITEM_TAX_GROUP = "taxitemtaxgroup",
    TAX_PERIOD = "taxperiod",
    TAX_TYPE = "taxtype",
    TERM = "term",
    TESTDOAGGREGATEDOSUBTYPE = "testdoaggregatedosubtype",
    TESTDOAGGREGATERESTRICTIONRECORD = "testdoaggregaterestrictionrecord",
    TEST_COMPOSED_RECORD1 = "testcomposedrecord1",
    TEST_COMPOSED_RECORD2 = "testcomposedrecord2",
    TEST_COMPOSED_RECORD3 = "testcomposedrecord3",
    TEST_CONFIGURABLE_RECORD = "testconfigurablerecord",
    TEST_DO_AGGREGATE_RECORD = "testdoaggregaterecord",
    TEST_EXPOSURE_RECORD = "testexposurerecord",
    TEST_FEATURE_RECORD = "testfeaturerecord",
    TEST_FULL_RECORD = "testfullrecord",
    TEST_MACROS_UMD_RECORD = "testmacrosumdrecord",
    TEST_MULTI_TABLE_PERSISTENCE_RECORD = "testmultitablepersistencerecord",
    TEST_NEW_URLS_RECORD = "testnewurlsrecord",
    TEST_NEW_URLS_TARGET_RECORD = "testnewurlstargetrecord",
    TEST_NEW_URLS_UNSUPPORTED_RECORD = "testnewurlsunsupportedrecord",
    TEST_NEXT_STANDARD_RECORD = "testnextstandardrecord",
    TEST_PLUGIN = "testplugin",
    TEST_PRIMARY_RECORD_FOR_RELATIONSHIPS = "testprimaryrecordforrelationships",
    TEST_RECORD = "testrecord",
    TEST_RECORD_ACTION_RECORD = "testrecordactionrecord",
    TEST_RECORD_UNIQUE_KEY = "testrecorduniquekey",
    TEST_RECORD_WITHOUT_LABEL = "testrecordwithoutlabel",
    TEST_RECORD_WITH_DISABLED_RECORD_SORT_FIELDS = "testrecordwithdisabledrecordsortfields",
    TEST_RECORD_WITH_SORT_FIELDS = "testrecordwithsortfields",
    TEST_REGRESSION_RECORD = "testregressionrecord",
    TEST_RELATED_PROPERTY = "testrelatedproperty",
    TEST_SECURED_RECORD = "testsecuredrecord",
    TEST_SIMPLE_PERSISTENCE_RECORD = "testsimplepersistencerecord",
    TEST_SIMPLE_PERSISTENCE_SELECT_SIDE_RECORD = "testsimplepersistenceselectsiderecord",
    TEST_SLAVING_RATE_FIELD_RECORD = "testslavingratefieldrecord",
    TEST_SLAVING_RECORD = "testslavingrecord",
    TEST_SLAVING_RECORD_OPTIMIZED = "testslavingrecordoptimized",
    TEST_SOURCING_MASTER_FIELD_ANNOTATION_MASTER = "testsourcingmasterfieldannotationmaster",
    TEST_SOURCING_MASTER_FIELD_ANNOTATION_RECORD = "testsourcingmasterfieldannotationrecord",
    TEST_SOURCING_OPTIONS_CONDITION_MASTER = "testsourcingoptionsconditionmaster",
    TEST_SOURCING_OPTIONS_CONDITION_RECORD = "testsourcingoptionsconditionrecord",
    TEST_SOURCING_OPTIONS_CONDITION_TARGET = "testsourcingoptionsconditiontarget",
    TEST_SOURCING_SUBLIST_FIELD_ANNOTATION_MASTER = "testsourcingsublistfieldannotationmaster",
    TEST_SOURCING_SUBLIST_FIELD_ANNOTATION_RECORD = "testsourcingsublistfieldannotationrecord",
    TEST_SOURCING_VALUE_RATE_COL_MASTER = "testsourcingvalueratecolmaster",
    TEST_SOURCING_VALUE_RATE_COL_RECORD = "testsourcingvalueratecolrecord",
    TEST_STANDARD_RECORD = "teststandardrecord",
    TEST_TRANSACTION = "testtransaction",
    TIME_BILL = "timebill",
    TOPIC = "topic",
    TRACKING_NUMBER = "trackingnumber",
    TRANSACTION = "transaction",
    TRANSACTION_ADDRESSBOOK = "transactionaddressbook",
    TRANSACTION_BILLING_ADDRESSBOOK = "transactionbillingaddressbook",
    TRANSACTION_NUMBERING_AUDIT_LOG = "transactionnumberingauditlog",
    TRANSACTION_RETURN_ADDRESSBOOK = "transactionreturnaddressbook",
    TRANSACTION_SHIPPING_ADDRESSBOOK = "transactionshippingaddressbook",
    TRANSFER = "transfer",
    TRANSFER_ORDER = "transferorder",
    TWO_FACTOR_DEVICE = "twofactordevice",
    TYPE_FIELD_PARENT_RECORD = "typefieldparentrecord",
    TYPE_FIELD_RECORD = "typefieldrecord",
    UMD_FIELD = "umdfield",
    UNDELIVERED_EMAIL = "undeliveredemail",
    UNIFICATION_TEST = "unificationtest",
    USER_EVENT_SCRIPT = "usereventscript",
    USER_EVENT_SCRIPT_DEPLOYMENT = "usereventscriptdeployment",
    USRCATEGORY = "usrcategory",
    USRSAVEDSEARCH = "usrsavedsearch",
    USR_ANALYTICAL = "usranalytical",
    USR_AUDITING_SOURCE_RECORD = "usrauditingsourcerecord",
    USR_AUDIT_LOG = "usrauditlog",
    USR_CHANNEL_AG_BTH_ROOT = "usrchannelagbthroot",
    USR_CHANNEL_AG_BTH_ROOT_SUB_TYPE = "usrchannelagbthrootsubtype",
    USR_CHANNEL_AG_BTH_SEARCH_MTM_ROOT = "usrchannelagbthsearchmtmroot",
    USR_CHANNEL_AG_BTH_SEARCH_MTM_SUB_TYPE = "usrchannelagbthsearchmtmsubtype",
    USR_CHANNEL_AG_BTH_SEARCH_MTO_ROOT = "usrchannelagbthsearchmtoroot",
    USR_CHANNEL_AG_BTH_SEARCH_MTO_SUB_TYPE = "usrchannelagbthsearchmtosubtype",
    USR_CHANNEL_AG_SRC_ROOT = "usrchannelagsrcroot",
    USR_CHANNEL_AG_SRC_ROOT_SUB_TYPE = "usrchannelagsrcrootsubtype",
    USR_CHANNEL_AG_SRC_SEARCH_MTM_PRIMARY = "usrchannelagsrcsearchmtmprimary",
    USR_CHANNEL_AG_SRC_SEARCH_MTO_PRIMARY = "usrchannelagsrcsearchmtoprimary",
    USR_CHANNEL_AG_TGT_ROOT = "usrchannelagtgtroot",
    USR_CHANNEL_AG_TGT_SEARCH_MTM_ROOT = "usrchannelagtgtsearchmtmroot",
    USR_CHANNEL_AG_TGT_SEARCH_MTM_SUB_TYPE = "usrchannelagtgtsearchmtmsubtype",
    USR_CHANNEL_AG_TGT_SEARCH_MTO_ROOT = "usrchannelagtgtsearchmtoroot",
    USR_CHANNEL_AG_TGT_SEARCH_MTO_SUB_TYPE = "usrchannelagtgtsearchmtosubtype",
    USR_CHANNEL_STD_ROOT = "usrchannelstdroot",
    USR_CHANNEL_STD_SEARCH_MTM_PRIMARY = "usrchannelstdsearchmtmprimary",
    USR_CHANNEL_STD_SEARCH_MTO_PRIMARY = "usrchannelstdsearchmtoprimary",
    USR_EXECUTION_LOG = "usrexecutionlog",
    USR_EXPOSE_EXTERNAL = "usrexposeexternal",
    USR_EXPOSE_IMPORTANT = "usrexposeimportant",
    USR_EXPOSE_INTNL_FLD_PLAIN_AG_TGT_PLAIN_MTO_ROOT = "usrexposeintnlfldplainagtgtplainmtoroot",
    USR_EXPOSE_INTNL_FLD_PLAIN_AG_TGT_PLAIN_MTO_SUB_TYPE = "usrexposeintnlfldplainagtgtplainmtosubtype",
    USR_EXPOSE_INTNL_FLD_PLAIN_AG_TGT_ROOT = "usrexposeintnlfldplainagtgtroot",
    USR_EXPOSE_INTNL_FLD_PLAIN_STD_N_VAL_MTO_PRIMARY = "usrexposeintnlfldplainstdnvalmtoprimary",
    USR_EXPOSE_INTNL_FLD_PLAIN_STD_ROOT = "usrexposeintnlfldplainstdroot",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_BTH_N_VAL_MTO_ROOT = "usrexposeplainfldintnlagbthnvalmtoroot",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_BTH_N_VAL_MTO_SUB_TYPE = "usrexposeplainfldintnlagbthnvalmtosubtype",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_BTH_PLAIN_MTO_ROOT = "usrexposeplainfldintnlagbthplainmtoroot",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_BTH_PLAIN_MTO_SUB_TYPE = "usrexposeplainfldintnlagbthplainmtosubtype",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_SRC_N_VAL_MTO_PRIMARY = "usrexposeplainfldintnlagsrcnvalmtoprimary",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_SRC_PLAIN_MTO_PRIMARY = "usrexposeplainfldintnlagsrcplainmtoprimary",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_TGT_N_VAL_MTO_ROOT = "usrexposeplainfldintnlagtgtnvalmtoroot",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_TGT_N_VAL_MTO_SUB_TYPE = "usrexposeplainfldintnlagtgtnvalmtosubtype",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_TGT_PLAIN_MTO_ROOT = "usrexposeplainfldintnlagtgtplainmtoroot",
    USR_EXPOSE_PLAIN_FLD_INTNL_AG_TGT_PLAIN_MTO_SUB_TYPE = "usrexposeplainfldintnlagtgtplainmtosubtype",
    USR_EXPOSE_PLAIN_FLD_INTNL_STD_N_VAL_MTM_PRIMARY = "usrexposeplainfldintnlstdnvalmtmprimary",
    USR_EXPOSE_PLAIN_FLD_INTNL_STD_N_VAL_MTO_PRIMARY = "usrexposeplainfldintnlstdnvalmtoprimary",
    USR_EXPOSE_PLAIN_FLD_INTNL_STD_PLAIN_MTM_PRIMARY = "usrexposeplainfldintnlstdplainmtmprimary",
    USR_EXPOSE_PLAIN_FLD_INTNL_STD_PLAIN_MTO_PRIMARY = "usrexposeplainfldintnlstdplainmtoprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_BTH_N_VAL_MTO_ROOT = "usrexposeplainfldplainagbthnvalmtoroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_BTH_N_VAL_MTO_SUB_TYPE = "usrexposeplainfldplainagbthnvalmtosubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_BTH_PLAIN_MTO_ROOT = "usrexposeplainfldplainagbthplainmtoroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_BTH_PLAIN_MTO_SUB_TYPE = "usrexposeplainfldplainagbthplainmtosubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_BTH_ROOT = "usrexposeplainfldplainagbthroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_BTH_SUB_TYPE = "usrexposeplainfldplainagbthsubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_SRC_N_VAL_MTM_PRIMARY = "usrexposeplainfldplainagsrcnvalmtmprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_SRC_N_VAL_MTO_PRIMARY = "usrexposeplainfldplainagsrcnvalmtoprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_SRC_PLAIN_MTM_PRIMARY = "usrexposeplainfldplainagsrcplainmtmprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_SRC_PLAIN_MTO_PRIMARY = "usrexposeplainfldplainagsrcplainmtoprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_SRC_ROOT = "usrexposeplainfldplainagsrcroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_SRC_SUB_TYPE = "usrexposeplainfldplainagsrcsubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_N_VAL_MTM_ROOT = "usrexposeplainfldplainagtgtnvalmtmroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_N_VAL_MTM_SUB_TYPE = "usrexposeplainfldplainagtgtnvalmtmsubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_N_VAL_MTO_ROOT = "usrexposeplainfldplainagtgtnvalmtoroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_N_VAL_MTO_SUB_TYPE = "usrexposeplainfldplainagtgtnvalmtosubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_PLAIN_MTM_ROOT = "usrexposeplainfldplainagtgtplainmtmroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_PLAIN_MTM_SUB_TYPE = "usrexposeplainfldplainagtgtplainmtmsubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_PLAIN_MTO_ROOT = "usrexposeplainfldplainagtgtplainmtoroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_PLAIN_MTO_SUB_TYPE = "usrexposeplainfldplainagtgtplainmtosubtype",
    USR_EXPOSE_PLAIN_FLD_PLAIN_AG_TGT_ROOT = "usrexposeplainfldplainagtgtroot",
    USR_EXPOSE_PLAIN_FLD_PLAIN_STD_N_VAL_MTM_PRIMARY = "usrexposeplainfldplainstdnvalmtmprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_STD_N_VAL_MTO_PRIMARY = "usrexposeplainfldplainstdnvalmtoprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_STD_PLAIN_MTM_PRIMARY = "usrexposeplainfldplainstdplainmtmprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_STD_PLAIN_MTO_PRIMARY = "usrexposeplainfldplainstdplainmtoprimary",
    USR_EXPOSE_PLAIN_FLD_PLAIN_STD_ROOT = "usrexposeplainfldplainstdroot",
    USR_FEATURE_AG_BTH_ROOT = "usrfeatureagbthroot",
    USR_FEATURE_AG_BTH_ROOT_SUB_TYPE = "usrfeatureagbthrootsubtype",
    USR_FEATURE_AG_SRC_ROOT = "usrfeatureagsrcroot",
    USR_FEATURE_AG_SRC_ROOT_SUB_TYPE = "usrfeatureagsrcrootsubtype",
    USR_FEATURE_AG_TGT_ROOT = "usrfeatureagtgtroot",
    USR_FEATURE_CSM_DEFAULT_COLUMNS_RECORD = "usrfeaturecsmdefaultcolumnsrecord",
    USR_FEATURE_CSM_IMPORTANT_JOIN_RECORD = "usrfeaturecsmimportantjoinrecord",
    USR_FEATURE_CSM_INHERITANCE_RECORD = "usrfeaturecsminheritancerecord",
    USR_FEATURE_CSM_USAGE_SPECIFIC_RECORD = "usrfeaturecsmusagespecificrecord",
    USR_FEATURE_STD_ROOT = "usrfeaturestdroot",
    USR_NON_SYSTEM_RECORD = "usrnonsystemrecord",
    USR_PERMISSION_AG_BTH_DENIED_MTM_ROOT = "usrpermissionagbthdeniedmtmroot",
    USR_PERMISSION_AG_BTH_DENIED_MTM_SUB_TYPE = "usrpermissionagbthdeniedmtmsubtype",
    USR_PERMISSION_AG_BTH_DENIED_MTO_ROOT = "usrpermissionagbthdeniedmtoroot",
    USR_PERMISSION_AG_BTH_DENIED_MTO_SUB_TYPE = "usrpermissionagbthdeniedmtosubtype",
    USR_PERMISSION_AG_BTH_GRANTED_MTM_ROOT = "usrpermissionagbthgrantedmtmroot",
    USR_PERMISSION_AG_BTH_GRANTED_MTM_SUB_TYPE = "usrpermissionagbthgrantedmtmsubtype",
    USR_PERMISSION_AG_BTH_GRANTED_MTO_ROOT = "usrpermissionagbthgrantedmtoroot",
    USR_PERMISSION_AG_BTH_GRANTED_MTO_SUB_TYPE = "usrpermissionagbthgrantedmtosubtype",
    USR_PERMISSION_AG_BTH_ROOT = "usrpermissionagbthroot",
    USR_PERMISSION_AG_BTH_ROOT_SUB_TYPE = "usrpermissionagbthrootsubtype",
    USR_PERMISSION_AG_SRC_DENIED_MTM_PRIMARY = "usrpermissionagsrcdeniedmtmprimary",
    USR_PERMISSION_AG_SRC_DENIED_MTO_PRIMARY = "usrpermissionagsrcdeniedmtoprimary",
    USR_PERMISSION_AG_SRC_GRANTED_MTM_PRIMARY = "usrpermissionagsrcgrantedmtmprimary",
    USR_PERMISSION_AG_SRC_GRANTED_MTO_PRIMARY = "usrpermissionagsrcgrantedmtoprimary",
    USR_PERMISSION_AG_SRC_ROOT = "usrpermissionagsrcroot",
    USR_PERMISSION_AG_SRC_ROOT_SUB_TYPE = "usrpermissionagsrcrootsubtype",
    USR_PERMISSION_AG_TGT_DENIED_MTM_ROOT = "usrpermissionagtgtdeniedmtmroot",
    USR_PERMISSION_AG_TGT_DENIED_MTM_SUB_TYPE = "usrpermissionagtgtdeniedmtmsubtype",
    USR_PERMISSION_AG_TGT_DENIED_MTO_ROOT = "usrpermissionagtgtdeniedmtoroot",
    USR_PERMISSION_AG_TGT_DENIED_MTO_SUB_TYPE = "usrpermissionagtgtdeniedmtosubtype",
    USR_PERMISSION_AG_TGT_GRANTED_MTM_ROOT = "usrpermissionagtgtgrantedmtmroot",
    USR_PERMISSION_AG_TGT_GRANTED_MTM_SUB_TYPE = "usrpermissionagtgtgrantedmtmsubtype",
    USR_PERMISSION_AG_TGT_GRANTED_MTO_ROOT = "usrpermissionagtgtgrantedmtoroot",
    USR_PERMISSION_AG_TGT_GRANTED_MTO_SUB_TYPE = "usrpermissionagtgtgrantedmtosubtype",
    USR_PERMISSION_AG_TGT_ROOT = "usrpermissionagtgtroot",
    USR_PERMISSION_STD_DENIED_MTM_PRIMARY = "usrpermissionstddeniedmtmprimary",
    USR_PERMISSION_STD_DENIED_MTO_PRIMARY = "usrpermissionstddeniedmtoprimary",
    USR_PERMISSION_STD_GRANTED_MTM_PRIMARY = "usrpermissionstdgrantedmtmprimary",
    USR_PERMISSION_STD_GRANTED_MTO_PRIMARY = "usrpermissionstdgrantedmtoprimary",
    USR_PERMISSION_STD_ROOT = "usrpermissionstdroot",
    USR_POLYMORPHIC_CHILD_ONE_RECORD = "usrpolymorphicchildonerecord",
    USR_POLYMORPHIC_CHILD_TWO_RECORD = "usrpolymorphicchildtworecord",
    USR_POLYMORPHIC_JOIN_TEST_RECORD = "usrpolymorphicjointestrecord",
    USR_TARGET_PROPERTIES_GROUP_BY_TARGET_RECORD = "usrtargetpropertiesgroupbytargetrecord",
    USR_TARGET_PROPERTIES_MTO2_TARGET_RECORD = "usrtargetpropertiesmto2targetrecord",
    USR_TARGET_PROPERTIES_MTO_TARGET_RECORD = "usrtargetpropertiesmtotargetrecord",
    USR_TARGET_PROPERTIES_ROOT_RECORD = "usrtargetpropertiesrootrecord",
    USR_UNIVERSAL = "usruniversal",
    VENDOR = "vendor",
    VENDOR_BILL = "vendorbill",
    VENDOR_CATEGORY = "vendorcategory",
    VENDOR_CREDIT = "vendorcredit",
    VENDOR_PAYMENT = "vendorpayment",
    VENDOR_SUBSIDIARY_RELATIONSHIP = "vendorsubsidiaryrelationship",
    WEBAPP = "webapp",
    WEB_SITE = "website",
    WIN_LOSS_REASON = "winlossreason",
    WORKFLOW_ACTION_SCRIPT = "workflowactionscript",
    WORKFLOW_ACTION_SCRIPT_DEPLOYMENT = "workflowactionscriptdeployment",
    WORKPLACE = "workplace",
    WORK_CALENDAR = "workcalendar",
}

export const enum Aggregate {
    AVERAGE = "AVERAGE",
    AVERAGE_DISTINCT = "AVERAGE_DISTINCT",
    COUNT = "COUNT",
    COUNT_DISTINCT = "COUNT_DISTINCT",
    MAXIMUM = "MAXIMUM",
    MAXIMUM_DISTINCT = "MAXIMUM_DISTINCT",
    MEDIAN = "MEDIAN",
    MINIMUM = "MINIMUM",
    MINIMUM_DISTINCT = "MINIMUM_DISTINCT",
    SUM = "SUM",
    SUM_DISTINCT = "SUM_DISTINCT",
}

export const enum ReturnType {
    ANY = "ANY",
    BOOLEAN = "BOOLEAN",
    CURRENCY = "CURRENCY",
    DATE = "DATE",
    DATETIME = "DATETIME",
    DURATION = "DURATION",
    FLOAT = "FLOAT",
    INTEGER = "INTEGER",
    KEY = "KEY",
    RELATIONSHIP = "RELATIONSHIP",
    STRING = "STRING",
    UNKNOWN = "UNKNOWN",
}

export const enum SortLocale {
    ARABIC = "ARABIC",
    ARABIC_ABJ_MATCH = "ARABIC_ABJ_MATCH",
    ARABIC_ABJ_MATCH_CI = "ARABIC_ABJ_MATCH_CI",
    ARABIC_ABJ_SORT = "ARABIC_ABJ_SORT",
    ARABIC_ABJ_SORT_CI = "ARABIC_ABJ_SORT_CI",
    ARABIC_CI = "ARABIC_CI",
    ARABIC_MATCH = "ARABIC_MATCH",
    ARABIC_MATCH_CI = "ARABIC_MATCH_CI",
    ASCII7 = "ASCII7",
    ASCII7_CI = "ASCII7_CI",
    AZERBAIJANI = "AZERBAIJANI",
    AZERBAIJANI_CI = "AZERBAIJANI_CI",
    BENGALI = "BENGALI",
    BENGALI_CI = "BENGALI_CI",
    BIG5 = "BIG5",
    BIG5_CI = "BIG5_CI",
    BINARY = "BINARY",
    BINARY_CI = "BINARY_CI",
    BULGARIAN = "BULGARIAN",
    BULGARIAN_CI = "BULGARIAN_CI",
    CANADIAN_M = "CANADIAN_M",
    CATALAN = "CATALAN",
    CATALAN_CI = "CATALAN_CI",
    CROATIAN = "CROATIAN",
    CROATIAN_CI = "CROATIAN_CI",
    CS_CZ = "CS_CZ",
    CZECH = "CZECH",
    CZECH_CI = "CZECH_CI",
    CZECH_PUNCTUATION = "CZECH_PUNCTUATION",
    CZECH_PUNCTUATION_CI = "CZECH_PUNCTUATION_CI",
    DANISH = "DANISH",
    DANISH_CI = "DANISH_CI",
    DANISH_M = "DANISH_M",
    DA_DK = "DA_DK",
    DE_DE = "DE_DE",
    DUTCH = "DUTCH",
    DUTCH_CI = "DUTCH_CI",
    EBCDIC = "EBCDIC",
    EBCDIC_CI = "EBCDIC_CI",
    EEC_EURO = "EEC_EURO",
    EEC_EUROPA3 = "EEC_EUROPA3",
    EEC_EUROPA3_CI = "EEC_EUROPA3_CI",
    EEC_EURO_CI = "EEC_EURO_CI",
    EN = "EN",
    EN_AU = "EN_AU",
    EN_CA = "EN_CA",
    EN_GB = "EN_GB",
    EN_US = "EN_US",
    ESTONIAN = "ESTONIAN",
    ESTONIAN_CI = "ESTONIAN_CI",
    ES_AR = "ES_AR",
    ES_ES = "ES_ES",
    FINNISH = "FINNISH",
    FINNISH_CI = "FINNISH_CI",
    FRENCH = "FRENCH",
    FRENCH_AI = "FRENCH_AI",
    FRENCH_CI = "FRENCH_CI",
    FRENCH_M = "FRENCH_M",
    FR_CA = "FR_CA",
    FR_FR = "FR_FR",
    GBK = "GBK",
    GBK_AI = "GBK_AI",
    GBK_CI = "GBK_CI",
    GENERIC_M = "GENERIC_M",
    GERMAN = "GERMAN",
    GERMAN_AI = "GERMAN_AI",
    GERMAN_CI = "GERMAN_CI",
    GERMAN_DIN = "GERMAN_DIN",
    GERMAN_DIN_AI = "GERMAN_DIN_AI",
    GERMAN_DIN_CI = "GERMAN_DIN_CI",
    GREEK = "GREEK",
    GREEK_AI = "GREEK_AI",
    GREEK_CI = "GREEK_CI",
    HEBREW = "HEBREW",
    HEBREW_AI = "HEBREW_AI",
    HEBREW_CI = "HEBREW_CI",
    HE_IL = "HE_IL",
    HKSCS = "HKSCS",
    HKSCS_AI = "HKSCS_AI",
    HKSCS_CI = "HKSCS_CI",
    HUNGARIAN = "HUNGARIAN",
    HUNGARIAN_AI = "HUNGARIAN_AI",
    HUNGARIAN_CI = "HUNGARIAN_CI",
    ICELANDIC = "ICELANDIC",
    ICELANDIC_AI = "ICELANDIC_AI",
    ICELANDIC_CI = "ICELANDIC_CI",
    INDONESIAN = "INDONESIAN",
    INDONESIAN_AI = "INDONESIAN_AI",
    INDONESIAN_CI = "INDONESIAN_CI",
    ITALIAN = "ITALIAN",
    ITALIAN_AI = "ITALIAN_AI",
    ITALIAN_CI = "ITALIAN_CI",
    IT_IT = "IT_IT",
    JAPANESE_M = "JAPANESE_M",
    JA_JP = "JA_JP",
    KOREAN_M = "KOREAN_M",
    KO_KR = "KO_KR",
    LATIN = "LATIN",
    LATIN_AI = "LATIN_AI",
    LATIN_CI = "LATIN_CI",
    LATVIAN = "LATVIAN",
    LATVIAN_AI = "LATVIAN_AI",
    LATVIAN_CI = "LATVIAN_CI",
    LITHUANIAN = "LITHUANIAN",
    LITHUANIAN_AI = "LITHUANIAN_AI",
    LITHUANIAN_CI = "LITHUANIAN_CI",
    MALAY = "MALAY",
    MALAY_AI = "MALAY_AI",
    MALAY_CI = "MALAY_CI",
    NL_NL = "NL_NL",
    NORWEGIAN = "NORWEGIAN",
    NORWEGIAN_AI = "NORWEGIAN_AI",
    NORWEGIAN_CI = "NORWEGIAN_CI",
    POLISH = "POLISH",
    POLISH_AI = "POLISH_AI",
    POLISH_CI = "POLISH_CI",
    PT_BR = "PT_BR",
    PUNCTUATION = "PUNCTUATION",
    PUNCTUATION_AI = "PUNCTUATION_AI",
    PUNCTUATION_CI = "PUNCTUATION_CI",
    ROMANIAN = "ROMANIAN",
    ROMANIAN_AI = "ROMANIAN_AI",
    ROMANIAN_CI = "ROMANIAN_CI",
    RUSSIAN = "RUSSIAN",
    RUSSIAN_AI = "RUSSIAN_AI",
    RUSSIAN_CI = "RUSSIAN_CI",
    RU_RU = "RU_RU",
    SCHINESE_PINYIN_M = "SCHINESE_PINYIN_M",
    SCHINESE_RADICAL_M = "SCHINESE_RADICAL_M",
    SCHINESE_STROKE_M = "SCHINESE_STROKE_M",
    SLOVAK = "SLOVAK",
    SLOVAK_AI = "SLOVAK_AI",
    SLOVAK_CI = "SLOVAK_CI",
    SLOVENIAN = "SLOVENIAN",
    SLOVENIAN_AI = "SLOVENIAN_AI",
    SLOVENIAN_CI = "SLOVENIAN_CI",
    SPANISH = "SPANISH",
    SPANISH_AI = "SPANISH_AI",
    SPANISH_CI = "SPANISH_CI",
    SPANISH_M = "SPANISH_M",
    SV_SE = "SV_SE",
    SWEDISH = "SWEDISH",
    SWEDISH_AI = "SWEDISH_AI",
    SWEDISH_CI = "SWEDISH_CI",
    SWISS = "SWISS",
    SWISS_AI = "SWISS_AI",
    SWISS_CI = "SWISS_CI",
    TCHINESE_RADICAL_M = "TCHINESE_RADICAL_M",
    TCHINESE_STROKE_M = "TCHINESE_STROKE_M",
    THAI_M = "THAI_M",
    TH_TH = "TH_TH",
    TR_TR = "TR_TR",
    TURKISH = "TURKISH",
    TURKISH_AI = "TURKISH_AI",
    TURKISH_CI = "TURKISH_CI",
    UKRAINIAN = "UKRAINIAN",
    UKRAINIAN_AI = "UKRAINIAN_AI",
    UKRAINIAN_CI = "UKRAINIAN_CI",
    UNICODE_BINARY = "UNICODE_BINARY",
    UNICODE_BINARY_AI = "UNICODE_BINARY_AI",
    UNICODE_BINARY_CI = "UNICODE_BINARY_CI",
    VIETNAMESE = "VIETNAMESE",
    VIETNAMESE_AI = "VIETNAMESE_AI",
    VIETNAMESE_CI = "VIETNAMESE_CI",
    WEST_EUROPEAN = "WEST_EUROPEAN",
    WEST_EUROPEAN_AI = "WEST_EUROPEAN_AI",
    WEST_EUROPEAN_CI = "WEST_EUROPEAN_CI",
    ZH_CN = "ZH_CN",
    ZH_TW = "ZH_TW",
}
