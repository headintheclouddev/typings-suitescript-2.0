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
    /** The name of the relationship field on which join with other query type is performed For example "salesrep". */
    name: string;

    /** The query type on which is relationship field used to create the join with this component. */
    source: string;
}

interface CreateConditionOptions {
    /** Field (column) id */
    fieldId: string;

    /** Use the Operator enum. */
    operator: Operator;

    /** Array of values */
    values: string | boolean | string[] | boolean[] | number[] | Date[]; // You wouldn't have multiple boolean values in an array, obviously. But you might specify it like: [true].

    /** Aggregate function. Use the Aggregate enum. */
    aggregate?: string;
}

interface CreateConditionWithFormulaOptions {
    /** Formula */
    formula: string;

    /** Explicitly define value type in case it is not determined correctly from the formula. Use the ReturnType enum. */
    type?: string;

    /** Aggregate function. Use the Aggregate enum. */
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
    /** Id of query to be loaded. */
    id: string;
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

interface RunSuiteQLPagedOptions extends RunSuiteQLOptions {
    pageSize?: number;
}

interface SuiteQL {
    readonly columns: Column[];
    readonly params: (string | number | boolean)[];
    readonly query: string;
    readonly type: string;

    run(): ResultSet;

    runPaged(options: { pageSize: number }): PagedData;
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

    toSuiteQL(): SuiteQL;

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

    /** Holds the name of the query result column. */
    readonly fieldId: string;

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

    readonly label: string;
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

    /**
     * Returns the query result set as an array of mapped results.
     * A mapped result is a JavaScript object with key-value pairs.
     * In this object, the key is either the field ID or the alias that was used for the corresponding query.Column object.
     */
    asMappedResults(): Array<{ [fieldId: string]: string|boolean|number|null }>;
}

/** Corresponds to a single row of the ResultSet. */
export interface Result {
    /**
     * The result values. Value types correspond to the ResultSet.types property. Number and order of values in
     * the array exactly matches the ResultSet.types, ResultSet.columns or Result.columns property.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    readonly values: Array<boolean | string | number | null>;

    /**
     * The return columns. This is equivalent to ResultSet.columns.
     * @throws {SuiteScriptError} READ_ONLY when setting the property is attempted
     */
    // readonly columns: Column[]; // As of 2019.2, this is not in the Help documentation.

    /**
     * Returns the query result as a mapped result.
     * A mapped result is a JavaScript object with key-value pairs.
     * In this object, the key is either the field ID or the alias that was used for the corresponding query.Column object.
     */
    asMap(): { [fieldId: string]: string|boolean|number|null };
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
    iterator(): PageIterator;

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

interface PageIterator {
    each(f: (result: { value: Page }) => boolean): void;
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
export const load: QueryLoadFunction;

interface QueryLoadFunction {
    (options: LoadQueryOptions): Query;
    promise: (options: LoadQueryOptions) => Promise<Query>;
}

interface deleteQuery {
  /**
   * Deletes query by id
   * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options or id are undefined
   * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object or id isn't number
   * @throws {SuiteScriptError} UNABLE_TO_DELETE_QUERY if query doesn't exist or no permissions to delete it
   */
  (options: DeleteQueryOptions): Query;
  promise: (options: DeleteQueryOptions) => Promise<Query>;
}

export {deleteQuery as delete};

/**
 * Deletes query by id
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options or query are undefined
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options isn't object or id isn't number
 * @throws {SuiteScriptError} UNABLE_TO_DELETE_QUERY if query doesn't exist or no permissions to delete it
 */
interface RunSuiteQL {
    (options: RunSuiteQLOptions): ResultSet;
    promise: (options: RunSuiteQLOptions) => Promise<ResultSet>;
}

export const runSuiteQL: RunSuiteQL;

/**
 * Execute the suiteQL query and return paged results.
 * @governance 10 units
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if options or query are undefined
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if there's parameter of different type than string/number/boolean in params array
 *
 * @since 2020.1
 */
interface RunSuiteQLPaged {
    (options: RunSuiteQLPagedOptions): PagedData;
    promise: (options: RunSuiteQLPagedOptions) => Promise<PagedData>;
}

export const runSuiteQLPaged: RunSuiteQLPaged;

export const enum DateId {
    DAYS_AGO = "dago",
    DAYS_FROM_NOW = "dfn",
    HOURS_AGO = "hago",
    HOURS_FROM_NOW = "hfn",
    MINUTES_AGO = "nago",
    MINUTES_FROM_NOW = "nfn",
    MONTHS_AGO = "mago",
    MONTHS_FROM_NOW = "mfn",
    QUARTERS_AGO = "qago",
    QUARTERS_FROM_NOW = "qfn",
    SECONDS_AGO = "sago",
    SECONDS_FROM_NOW = "sfn",
    WEEKS_AGO = "wago",
    WEEKS_FROM_NOW = "wfn",
    YEARS_AGO = "yago",
    YEARS_FROM_NOW = "yfn"
}

/**
 * Special object which can be used as a condition while querying dates
 *
 * @since 2019.1
 */
interface RelativeDate {

    /**
     * Start of relative date
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     *
     * @since 2019.1
     */    
    readonly start: Object;

    /**
     * End of relative date
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     *
     * @since 2019.1
     */    
    readonly end: Object;

    /**
     * Interval of relative date
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     *
     * @since 2019.1
     */    
    readonly interval: Object;

    /**
     * Value of relative date
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     *
     * @since 2019.1
     */    
    readonly value: Object;

    /**
     * Flag if this relative date represents range
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     *
     * @since 2019.1
     */    
    readonly isRange: boolean;

    /**
     * Id of relative date
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     *
     * @since 2019.1
     */    
    readonly dateId: Object;

    /**
     * Returns the object type name (query.RelativeDate)
     *
     * @since 2019.1
     */    
    toString(): string;
    
    /**
     * get JSON format of the object
     *
     * @since 2019.1
     */    
    toJSON(): any;
}

interface CreateRelativeDateOptions {
   /**
    * The ID of the relative date to create.
    */
   dateId: DateId;

   /**
    * The value to use to create the relative date.
    */
   value: number;
}


/**
 * Creates a query.RelativeDate object that represents a date relative to the current date.
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT If options or id are undefined.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE If options isn't object or id isn't string.
 *
 * @since 2019.2
 */
export function createRelativeDate(options: CreateRelativeDateOptions): RelativeDate;

export enum Operator {
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

export enum Type { // As of 15 June 2020
    ACCOUNT = "account",
    ACCOUNTING_CONTEXT = "accountingcontext",
    ACCOUNTING_PERIOD = "accountingperiod",
    ALLOCATION_METHOD = "allocationmethod",
    AMORTIZATION_SCHEDULE = "amortizationschedule",
    AMORTIZATION_TEMPLATE = "amortizationtemplate",
    BILLING_SCHEDULE = "billingschedule",
    BIN = "bin",
    BUDGETCATEGORY = "budgetcategory",
    BUDGETS = "budgets",
    BUDGET_EXCHANGE_RATE = "budgetexchangerate",
    BULK_PROC_SUBMISSION = "bulkprocsubmission",
    BUNDLE_INSTALLATION_SCRIPT = "bundleinstallationscript",
    BUNDLE_INSTALLATION_SCRIPT_DEPLOYMENT = "bundleinstallationscriptdeployment",
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
    CAMPAIGN_SUBSCRIPTION = "campaignsubscription",
    CAMPAIGN_TEMPLATE = "campaigntemplate",
    CAMPAIGN_VERTICAL = "campaignvertical",
    CARDHOLDER_AUTHENTICATION = "cardholderauthentication",
    CARDHOLDER_AUTHENTICATION_EVENT = "cardholderauthenticationevent",
    CATEGORY1099MISC = "category1099misc",
    CLASSIFICATION = "classification",
    CLIENT_SCRIPT = "clientscript",
    CLIENT_SCRIPT_DEPLOYMENT = "clientscriptdeployment",
    COMPETITOR = "competitor",
    CONSOLIDATED_EXCHANGE_RATE = "consolidatedexchangerate",
    CONSOLIDATED_RATE_ADJUSTOR_PLUGIN = "consolidatedrateadjustorplugin",
    CONTACT = "contact",
    CONTACT_CATEGORY = "contactcategory",
    CONTACT_ROLE = "contactrole",
    CONTACT_SUBSIDIARY_RELATIONSHIP = "contactsubsidiaryrelationship",
    COST_CATEGORY = "costcategory",
    COUPON_CODE = "couponcode",
    CURRENCY = "currency",
    CURRENCY_RATE = "currencyrate",
    CUSTOMER = "customer",
    CUSTOMER_CATEGORY = "customercategory",
    CUSTOMER_MESSAGE = "customermessage",
    CUSTOMER_SUBSIDIARY_RELATIONSHIP = "customersubsidiaryrelationship",
    CUSTOM_FIELD = "customfield",
    CUSTOM_GL_PLUGIN = "customglplugin",
    CUSTOM_LIST = "customlist",
    CUSTOM_RECORD_TYPE = "customrecordtype",
    CUSTOM_TRANSACTION_TYPE = "customtransactiontype",
    DELETED_RECORD = "deletedrecord",
    DEPARTMENT = "department",
    DEVICE_ID = "deviceid",
    DOMAIN = "domain",
    EMAIL_CAPTURE_PLUGIN = "emailcaptureplugin",
    EMAIL_TEMPLATE = "emailtemplate",
    EMPLOYEE = "employee",
    EMPLOYEE_LIST = "employeelist",
    EMPLOYEE_STATUS = "employeestatus",
    EMPLOYEE_SUBSIDIARY_RELATIONSHIP = "employeesubsidiaryrelationship",
    EMPLOYEE_TYPE = "employeetype",
    ENTITY = "entity",
    ENTITY_GROUP = "entitygroup",
    ENTITY_SUBSIDIARY_RELATIONSHIP = "entitysubsidiaryrelationship",
    EXPENSE_CATEGORY = "expensecategory",
    FAX_TEMPLATE = "faxtemplate",
    FILE = "file",
    FI_CONNECTIVITY_PLUGIN = "ficonnectivityplugin",
    FORECAST = "forecast",
    FULFILLMENT_EXCEPTION_REASON = "fulfillmentexceptionreason",
    GATEWAY_NOTIFICATION = "gatewaynotification",
    GENERAL_ALLOCATION_SCHEDULE = "generalallocationschedule",
    GENERAL_TOKEN = "generaltoken",
    GENERIC_RESOURCE = "genericresource",
    GENERIC_RESOURCE_SUBSIDIARY_RELATIONSHIP = "genericresourcesubsidiaryrelationship",
    GIFT_CERTIFICATE = "giftcertificate",
    GL_LINES_AUDIT_LOG = "gllinesauditlog",
    GL_LINES_PLUGIN_REVISION = "gllinespluginrevision",
    INCO_TERM = "incoterm",
    INVENTORY_COST_TEMPLATE = "inventorycosttemplate",
    INVENTORY_NUMBER = "inventorynumber",
    INVT_ITEM_PRICE_HISTORY = "invtitempricehistory",
    ITEM = "item",
    ITEM_COLLECTION = "itemcollection",
    ITEM_DEMAND_PLAN = "itemdemandplan",
    ITEM_REVISION = "itemrevision",
    ITEM_SUPPLY_PLAN = "itemsupplyplan",
    I_P_RESTRICTIONS = "iprestrictions",
    JOB = "job",
    JOB_RESOURCE_ROLE = "jobresourcerole",
    JOB_STATUS = "jobstatus",
    JOB_TYPE = "jobtype",
    KNOWLEDGE_BASE = "knowledgebase",
    LOCATION = "location",
    LOGIN_AUDIT = "loginaudit",
    MAIL_TEMPLATE = "mailtemplate",
    MANUFACTURING_COST_TEMPLATE = "manufacturingcosttemplate",
    MANUFACTURING_ROUTING = "manufacturingrouting",
    MANUFACTURING_TRANSACTION = "manufacturingtransaction",
    MAP_REDUCE_SCRIPT = "mapreducescript",
    MAP_REDUCE_SCRIPT_DEPLOYMENT = "mapreducescriptdeployment",
    MASS_UPDATE_SCRIPT = "massupdatescript",
    MASS_UPDATE_SCRIPT_DEPLOYMENT = "massupdatescriptdeployment",
    MEDIA_ITEM_FOLDER = "mediaitemfolder",
    MEM_DOC = "memdoc",
    MEM_DOC_TRANSACTION_TEMPLATE = "memdoctransactiontemplate",
    MESSAGE = "message",
    MFG_PLANNED_TIME = "mfgplannedtime",
    NEXUS = "nexus",
    NOTE = "note",
    ONLINE_CASE_FORM = "onlinecaseform",
    ONLINE_FORM_TEMPLATE = "onlineformtemplate",
    ONLINE_LEAD_FORM = "onlineleadform",
    OTHER_NAME = "othername",
    OTHER_NAME_CATEGORY = "othernamecategory",
    OTHER_NAME_SUBSIDIARY_RELATIONSHIP = "othernamesubsidiaryrelationship",
    OUTBOUND_REQUEST = "outboundrequest",
    O_AUTH_TOKEN = "oauthtoken",
    PARTNER = "partner",
    PARTNER_SUBSIDIARY_RELATIONSHIP = "partnersubsidiaryrelationship",
    PAYMENT_CARD_TOKEN = "paymentcardtoken",
    PAYMENT_EVENT = "paymentevent",
    PAYMENT_GATEWAY_PLUGIN = "paymentgatewayplugin",
    PAYMENT_INSTRUMENT = "paymentinstrument",
    PAYMENT_METHOD = "paymentmethod",
    PAYMENT_PROCESSING_PROFILE = "paymentprocessingprofile",
    PAYMENT_RESULT_PREVIEW = "paymentresultpreview",
    PAYROLL_ITEM = "payrollitem",
    PDF_TEMPLATE = "pdftemplate",
    PHONE_CALL = "phonecall",
    PLANNED_STANDARD_COST = "plannedstandardcost",
    PLATFORM_EXTENSION_PLUGIN = "platformextensionplugin",
    PLUG_IN_TYPE = "plugintype",
    PLUG_IN_TYPE_IMPL = "plugintypeimpl",
    PORTLET = "portlet",
    PORTLET_DEPLOYMENT = "portletdeployment",
    PRICE_LEVEL = "pricelevel",
    PRICING = "pricing",
    PRICING_GROUP = "pricinggroup",
    PROJECT_SUBSIDIARY_RELATIONSHIP = "projectsubsidiaryrelationship",
    PROJECT_TASK = "projecttask",
    PROJECT_TEMPLATE = "projecttemplate",
    PROJECT_TEMPLATE_SUBSIDIARY_RELATIONSHIP = "projecttemplatesubsidiaryrelationship",
    PROMOTIONS_PLUGIN = "promotionsplugin",
    PROMOTION_CODE = "promotioncode",
    PUBLISHED_SAVED_SEARCH = "publishedsavedsearch",
    QUANTITY_PRICING_SCHEDULE = "quantitypricingschedule",
    QUOTA = "quota",
    RECENT_RECORD = "recentrecord",
    REDIRECT = "redirect",
    RESOURCE_GROUP = "resourcegroup",
    RESTLET = "restlet",
    RESTLET_DEPLOYMENT = "restletdeployment",
    ROLE = "role",
    SALES_INVOICED = "salesinvoiced",
    SALES_ORDERED = "salesordered",
    SALES_TAX_ITEM = "salestaxitem",
    SCHEDULED_SCRIPT = "scheduledscript",
    SCHEDULED_SCRIPT_DEPLOYMENT = "scheduledscriptdeployment",
    SCHEDULED_SCRIPT_INSTANCE = "scheduledscriptinstance",
    SCRIPT = "script",
    SCRIPT_CUSTOM_RECORD_TYPE = "scriptcustomrecordtype",
    SCRIPT_DEPLOYMENT = "scriptdeployment",
    SCRIPT_NOTE = "scriptnote",
    SCRIPT_RECORD_TYPE = "scriptrecordtype",
    SEARCH_CAMPAIGN = "searchcampaign",
    SENT_EMAIL = "sentemail",
    SHIPPING_PACKAGE = "shippingpackage",
    SHIPPING_PARTNERS_PLUGIN = "shippingpartnersplugin",
    SHIP_ITEM = "shipitem",
    SHOPPING_CART = "shoppingcart",
    SITE_CATEGORY = "sitecategory",
    SOLUTION = "solution",
    STANDARD_COST_VERSION = "standardcostversion",
    STORE_TAB = "storetab",
    SUBLIST = "sublist",
    SUBSIDIARY = "subsidiary",
    SUBSIDIARY_SETTINGS = "subsidiarysettings",
    SUITELET = "suitelet",
    SUITELET_DEPLOYMENT = "suiteletdeployment",
    SUITE_SCRIPT_DETAIL = "suitescriptdetail",
    SUPPORT_CASE = "supportcase",
    SYSTEM_EMAIL_TEMPLATE = "systememailtemplate",
    SYSTEM_NOTE = "systemnote",
    SYSTEM_NOTE2 = "systemnote2",
    SYSTEM_NOTE_FIELD = "systemnotefield",
    TASK = "task",
    TAX_CALCULATION_PLUGIN = "taxcalculationplugin",
    TAX_ITEM_TAX_GROUP = "taxitemtaxgroup",
    TAX_TYPE = "taxtype",
    TERM = "term",
    TEST_PLUGIN = "testplugin",
    TIME_BILL = "timebill",
    TIME_MODIFICATION_REQUEST = "timemodificationrequest",
    TOPIC = "topic",
    TRANSACTION = "transaction",
    TRANSACTION_DELETION_REASON = "transactiondeletionreason",
    TRANSACTION_HISTORY = "transactionhistory",
    TRANSACTION_NUMBERING_AUDIT_LOG = "transactionnumberingauditlog",
    UMD_FIELD = "umdfield",
    UNDELIVERED_EMAIL = "undeliveredemail",
    UNITS_TYPE = "unitstype",
    USER_EVENT_SCRIPT = "usereventscript",
    USER_EVENT_SCRIPT_DEPLOYMENT = "usereventscriptdeployment",
    USER_O_AUTH_TOKEN = "useroauthtoken",
    USRSAVEDSEARCH = "usrsavedsearch",
    USR_AUDIT_LOG = "usrauditlog",
    USR_DS_AUDIT_LOG = "usrdsauditlog",
    USR_DS_EXECUTION_LOG = "usrdsexecutionlog",
    USR_EXECUTION_LOG = "usrexecutionlog",
    VENDOR = "vendor",
    VENDOR_CATEGORY = "vendorcategory",
    VENDOR_SUBSIDIARY_RELATIONSHIP = "vendorsubsidiaryrelationship",
    WEBAPP = "webapp",
    WEB_SITE = "website",
    WORKFLOW_ACTION_SCRIPT = "workflowactionscript",
    WORKFLOW_ACTION_SCRIPT_DEPLOYMENT = "workflowactionscriptdeployment",
    WORK_CALENDAR = "workcalendar"
}

export enum Aggregate {
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

export enum ReturnType {
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

export enum SortLocale {
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
