/**
 * Load the N/query module to create and run queries using the SuiteAnalytics Workbook query engine,
 * and to run arbitrary SuiteQL queries.
 * Supported script types: client and server scripts.
 */

interface SuiteQLRunOptions {
    /**
     * A unique identifier used for potential performance issues in a query.
     * If your query produces performance issues, the custom script ID identifies where the update will need to occur.
     * The script ID must be unique or the performance enhancements will affect each query with the same customScriptId.
     */
    customScriptId?: string;
}

interface SuiteQLRunPagedOptions extends SuiteQLRunOptions {
    /**
     * The size of each page in the query results. The default value is 50 results per page.
     * The minimum page size is 5 results per page, and the maximum page size is 1000 results per page.
     */
    pageSize?: number;
}

/**
 * Indicates whether the query should fail if you lack the necessary permissions for some fields or records.
 * SUITE_QL (default): the query fails if you access fields or records without the necessary permissions.
 * STATIC: the query succeeds, but returns no data for fields or records you lack permissions for.
 */
export type MetaDataProvider = "SUITE_QL" | "STATIC";

interface RunOptions extends SuiteQLRunOptions {
    /**
     * Indicates whether the query should fail if you lack the necessary permissions for some fields or records.
     * If set to SUITE_QL, the query fails. If set to STATIC, the query succeeds but returns no data for those fields or records.
     * Defaults to SUITE_QL.
     */
    metaDataProvider?: MetaDataProvider;
}

interface RunPagedOptions extends RunOptions {
    /**
     * The size of each page in the query results. The default page size is 50 results per page.
     * The minimum page size is 5 results per page, and the maximum page size is 1000 results per page.
     * (Oracle's Query.runPaged(options) page lists this parameter as a string; the PagedData.pageSize page documents it as a number.)
     */
    pageSize?: number;
}

interface RunMethodType {
    (options?: RunOptions): ResultSet;
    promise(options?: RunOptions): Promise<ResultSet>;
}

interface RunPagedMethodType {
    (options?: RunPagedOptions): PagedData;
    promise(options?: RunPagedOptions): Promise<PagedData>;
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

    /** The target of the join. It is the specialized query type with which is this component joined. */
    target: string;
}

interface JoinFromOptions {
    /** The name of the relationship field on which join with other query type is performed For example "salesrep". */
    fieldId: string;

    /** The query type on which is relationship field used to create the join with this component. */
    source: string;
}

export interface CreateConditionOptions {
    /** Field (column) id. Required if options.operator and options.values are used. */
    fieldId?: string;

    /** Use the Operator enum. */
    operator: Operator;

    /**
     * Value or array of values to use for the condition.
     * Required if options.fieldId and options.operator are used, and options.operator does not have a value of query.Operator.EMPTY or query.Operator.EMPTY_NOT.
     */
    values?: string | boolean | number | Date |
        string[] | readonly string[] |
        boolean[] | readonly boolean[] | // You wouldn't have multiple boolean values in an array, obviously. But you might specify it like: [true].
        number[] | readonly number[] |
        Date[] | readonly Date[] |
        RelativeDate[] | readonly RelativeDate[] |
        Period[] | readonly Period[];

    /** The formula used to create the condition. Required if options.fieldId is not used. */
    formula?: string;

    /**
     * If you use the options.formula parameter, use this parameter to explicitly define the formula’s return type. This value sets the Condition.type property.
     * Use the appropriate query.ReturnType enum value to pass in your argument. Required if options.formula is used.
     */
    type?: ReturnType | string;

    /** Aggregate function. Use the query.Aggregate enum. */
    aggregate?: Aggregate | string;

    /**
     * Whether filtered text is case sensitive. Only valid for text fields; you may encounter script errors
     * if this parameter is set with number or date values.
     */
    caseSensitive?: boolean;
}

interface CreateConditionWithFormulaOptions {
    /** Formula */
    formula: string;

    /** Explicitly define value type in case it is not determined correctly from the formula. Use the query.ReturnType enum. */
    type?: ReturnType | string;

    /** Aggregate function. Use the query.Aggregate enum. */
    aggregate?: Aggregate | string;
}

interface ColumnContextOptions {
    /** The name of the field context. */
    name: string | FieldContext,
    /** The additional parameters to use with the specified field context. */
    params?: {
        /** The internal ID of the currency to convert to. */
        currencyId?: number,
        /** The date to use for the actual exchange rate between the base currency and the currency to convert to. */
        date?: RelativeDate | Date
    }
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

    /**
     * An alias for this column. An alias is an alternate name for a column, and the alias is used in mapped results.
     * In general, the alias is an optional property.
     *
     * To use mapped results, you must specify an alias in the following situations:
     * 1. You must specify an alias for a column when the column uses a formula.
     * 2. You must specify an alias when two columns in a joined query use the same field ID.
     */
    alias?: string;

    /** The field context for values in the query result column. This value sets the Column.context property. */
    context?: string | FieldContext | ColumnContextOptions

    /**
     * The label for the column. A label is important if the query is used as the data source for printing,
     * such as in render.TemplateRenderer.addQuery(options). This value sets the Column.label property.
     */
    label?: string;
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

    /**
     * An alias for this column. An alias is an alternate name for a column, and the alias is used in mapped results.
     * In general, the alias is an optional property.
     *
     * To use mapped results, you must specify an alias in the following situations:
     * 1. You must specify an alias for a column when the column uses a formula.
     * 2. You must specify an alias when two columns in a joined query use the same field ID.
     */
    alias?: string;

    /** The field context for values in the query result column. This value sets the Column.context property. */
    context?: string | FieldContext | ColumnContextOptions

    /** The label for the column. This value sets the Column.label property. */
    label?: string;
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

    /** Indicates whether the sort is case sensitive. */
    caseSensitive?: boolean;

    /** The locale to use for the sort. Use the query.SortLocale enum. */
    locale?: SortLocale;
}

interface CreateQueryOptions {
    /** The query type. Use the query.Type enum. */
    type: Type | string;
    /** The columns of the query. Equivalent to setting Query.columns. */
    columns?: Column[] | readonly Column[];
    /** The condition of the query. Equivalent to setting Query.condition. */
    condition?: Condition;
    /** The sort of the query. Equivalent to setting Query.sort. */
    sort?: Sort[] | readonly Sort[];
}

interface LoadQueryOptions {
    /** The workbook ID or dataset ID of the query definition to load. */
    id: string;
}

interface DeleteQueryOptions {
    /** The script ID of the query to delete. */
    id: string;
}

/** A value that can be bound to a `?` placeholder in a SuiteQL query. */
export type SuiteQLParam = string | number | boolean;

export interface RunSuiteQLOptions {
    /**
     * String representation of SuiteQL query
     */
    query: string;

    /**
     * Parameters for the query. Each value is bound to a `?` placeholder in options.query.
     * Values must be strings, numbers, or booleans (otherwise SSS_INVALID_TYPE_ARG is thrown).
     * Security: use params instead of concatenating untrusted values into the query string to prevent SuiteQL injection.
     */
    params?: SuiteQLParam[] | readonly SuiteQLParam[];

    /**
     * A unique identifier used for potential performance issues in a query.
     * If your query produces performance issues, the custom script ID identifies where the update will need to occur.
     */
    customScriptId?: string;

    /**
     * Indicates whether the query should fail if you lack the necessary permissions for some fields or records.
     * If set to SUITE_QL, the query fails. If set to STATIC, the query succeeds but returns no data for those fields or records.
     * Defaults to SUITE_QL. (Documented for query.runSuiteQL(options) and query.runSuiteQLPaged(options), but not for their promise versions.)
     */
    metaDataProvider?: MetaDataProvider;
}

export interface RunSuiteQLPagedOptions extends RunSuiteQLOptions {
    /**
     * The size of each page in the query results. The default value is 50 results per page.
     * The minimum page size is 5 results per page, and the maximum page size is 1000 results per page.
     */
    pageSize?: number;
}

/**
 * A SuiteQL query. Create this object by calling Query.toSuiteQL().
 * @since 2020.1
 */
export interface SuiteQL {
    /**
     * The result columns to return from the query.
     * @since 2020.1
     */
    readonly columns: Column[];
    /**
     * The parameters for the query.
     * @since 2020.1
     */
    readonly params: SuiteQLParam[];
    /**
     * The string representation of the SuiteQL query.
     * @since 2020.1
     */
    readonly query: string;
    /**
     * The type of the query. This property uses values from the query.Type enum.
     * @since 2020.1
     */
    readonly type: string;

    /**
     * Runs the SuiteQL query and returns the query results.
     * If the SuiteAnalytics Connect feature is not enabled, this method can return a maximum of 100,000 results.
     * Oracle documents no promise version of this method.
     * @governance 10 units
     * @since 2020.1
     */
    run(options?: SuiteQLRunOptions): ResultSet;

    /**
     * Runs the SuiteQL query as a paged query and returns the paged query results. Returns a maximum of 1000 pages.
     * If the SuiteAnalytics Connect feature is not enabled, this method can return a maximum of 100,000 results across all pages.
     * Oracle documents no promise version of this method.
     * @governance 10 units
     * @since 2020.1
     */
    runPaged(options?: SuiteQLRunPagedOptions): PagedData;
}

/**
 * The query definition. Use query.create(options) or query.load(options) to create this object.
 * @since 2018.1
 */
export interface Query {
    /**
     * The initial query type of the query definition. This property is set when query.create(options) is called.
     * @since 2018.1
     */
    readonly type: string;

    /**
     * The simple or nested condition (a query.Condition object) that narrows the query results.
     * @since 2018.1
     */
    condition: Condition | null;

    /**
     * An array of result columns (query.Column objects) returned from the query.
     * Before you run the query, you must assign all created columns as values to this property.
     * @since 2018.1
     */
    columns: Column[];

    /**
     * An array of query.Sort objects used for sorting.
     * @since 2018.1
     */
    sort: Sort[];

    /**
     * A reference to children of the root component of the query definition. The value of this property is an object of
     * key-value pairs. Each key is the name of a child component. Each value is the corresponding query.Component object.
     * @since 2018.1
     */
    readonly child: Record<string, Component>;

    /**
     * The ID of the query definition. This property has a value only for existing queries that are loaded using
     * query.load(options). If you create a query using query.create(options) but do not save it, this property is null.
     * Oracle documents this property as a number, although query.load(options) and query.delete(options) take string IDs.
     * @since 2018.1
     */
    readonly id: number;

    /**
     * The name of the query definition. This property has a value only for existing queries that are loaded using
     * query.load(options). If you create a query using query.create(options) but do not save it, this property is null.
     * @since 2018.1
     */
    readonly name: string;

    /**
     * The root component of the query definition. It encapsulates the initial query type passed to query.create(options).
     * @since 2018.1
     */
    readonly root: Component;

    /**
     * Executes the query and returns the query result set.
     * Returns a maximum of 5000 results; use Query.runPaged(options) to retrieve more.
     * Also available as Query.run.promise(), which has the same parameters, errors, and governance.
     * @governance 10 units
     * @since 2018.1
     */
    readonly run: RunMethodType;

    /**
     * Executes the query and returns a set of paged results.
     * The default page size is 50; the minimum is 5 and the maximum is 1000 results per page.
     * Also available as Query.runPaged.promise(options), which has the same parameters, errors, and governance.
     * @governance 10 units
     * @since 2018.1
     */
    readonly runPaged: RunPagedMethodType;

    /**
     * Creates a join relationship from the root component of the query. This method selects the correct join type automatically.
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.2
     */
    autoJoin(options: AutoJoinOptions): Component;

    /**
     * Creates a join relationship. This method is an alias to Query.autoJoin(options).
     * @governance none
     * @since 2018.1
     */
    join(options: JoinOptions): Component;

    /**
     * Creates an explicit directional join relationship from the root component to another component (a forward join).
     * This method sets the Component.target property on the returned query.Component object.
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.2
     */
    joinTo(options: JoinToOptions): Component;

    /**
     * Creates an explicit directional join relationship from another component to the root component (an inverse join).
     * This method sets the Component.source property on the returned query.Component object.
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.2
     */
    joinFrom(options: JoinFromOptions): Component;

    /**
     * Creates a condition (query filter) based on the query.Query object.
     * Use either fieldId + operator + values, or formula + (optional) type.
     * @governance none
     * @since 2018.1
     */
    createCondition(options: CreateConditionOptions | CreateConditionWithFormulaOptions): Condition;

    /**
     * Creates a query result column based on the query.Query object.
     * @governance none
     * @since 2018.1
     */
    createColumn(options: CreateColumnOptions | CreateColumnWithFormulaOptions): Column;

    /**
     * Creates a sort based on the query.Query object.
     * @governance none
     * @since 2018.1
     */
    createSort(options: CreateSortOptions): Sort;

    /**
     * Creates a new condition (a query.Condition object) that corresponds to a logical conjunction (AND) of the arguments
     * passed to the method. The arguments must be one or more query.Condition objects.
     * @governance none
     * @since 2018.1
     */
    and(...conditions: Condition[]): Condition;

    /**
     * Creates a new condition (a query.Condition object) that corresponds to a logical disjunction (OR) of the arguments
     * passed to the method. The arguments must be one or more query.Condition objects.
     * @governance none
     * @since 2018.1
     */
    or(...conditions: Condition[]): Condition;

    /**
     * Creates a new condition (a query.Condition object) that corresponds to a logical negation (NOT) of the argument
     * passed to the method. The argument must be a query.Condition object.
     * @governance none
     * @since 2018.1
     */
    not(condition: Condition): Condition;

    /**
     * Converts this query.Query object to its corresponding SuiteQL representation (a query.SuiteQL object).
     * @governance none
     * @since 2020.1
     */
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
 * @since 2018.1
 */
export interface Component {
    /**
     * The query type of this component.
     * @since 2018.1
     */
    readonly type: string;

    /**
     * The query type of the component joined to this component (the inverse relationship).
     * This property is set when Query.joinFrom(options) or Component.joinFrom(options) is called.
     * @since 2018.1
     */
    readonly source: string | null;

    /**
     * The target query type of this component (the relationship).
     * This property is set when Query.joinTo(options) or Component.joinTo(options) is called.
     * @since 2018.1
     */
    readonly target: string | null;

    /**
     * A reference to the parent query.Component object of this component.
     * Oracle's property page lists the type as string, but its description says this is a reference to the parent query.Component object.
     * @since 2018.1
     */
    readonly parent: Component | null;

    /**
     * A reference to children of this component. The value of this property is an object of key-value pairs.
     * Each key is the name of a child component. Each value is the corresponding query.Component object.
     * @since 2018.1
     */
    readonly child: Record<string, Component>;

    /**
     * Creates a join relationship. This method selects the correct join type automatically.
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.2
     */
    autoJoin(options: AutoJoinOptions): Component;

    /**
     * Creates a join relationship. This method is an alias to Component.autoJoin(options).
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.1
     */
    join(options: JoinOptions): Component;

    /**
     * Creates an explicit directional join relationship from this component to its child component (a forward join).
     * This method sets the Component.target property on the returned query.Component object.
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.2
     */
    joinTo(options: JoinToOptions): Component;

    /**
     * Creates an explicit directional join relationship from a child component to this component (an inverse join).
     * This method sets the Component.source property on the returned query.Component object.
     * @throws {SuiteScriptError} RELATIONSHIP_ALREADY_USED if the specified join relationship already exists
     * @governance none
     * @since 2018.2
     */
    joinFrom(options: JoinFromOptions): Component;

    /**
     * Creates a condition (query filter) based on this component. Use either fieldId + operator + values or
     * formula + (optional) type.
     * @governance none
     * @since 2018.1
     */
    createCondition(options: CreateConditionOptions | CreateConditionWithFormulaOptions): Condition;

    /**
     * Creates a query result column based on this component. Use either fieldId or formula + (optional) type.
     * @governance none
     * @since 2018.1
     */
    createColumn(options: CreateColumnOptions | CreateColumnWithFormulaOptions): Column;

    /**
     * Creates a sort based on this component.
     * @governance none
     * @since 2018.1
     */
    createSort(options: CreateSortOptions): Sort;
}

/**
 * A query result column. Use Query.createColumn(options) or Component.createColumn(options) to create this object.
 * @since 2018.1
 */
export interface Column {
    /**
     * Id of column field.
     * @deprecated Not documented by Oracle. Use Column.fieldId instead.
     */
    readonly prototype?: string;

    /**
     * A reference to the query.Component object to which this query result column belongs.
     * @since 2018.1
     */
    readonly component?: Component;

    /**
     * The name of the query result column. This property and the Column.formula property cannot be set at the same time.
     * @since 2018.1
     */
    readonly fieldId: string;

    /**
     * The formula used to create the query result column. This property and the Column.fieldId property cannot be set at the same time.
     * @since 2018.1
     */
    readonly formula?: string | null;

    /**
     * The return type of the formula used to create the query result column. Uses values from the query.ReturnType enum.
     * @since 2018.1
     */
    readonly type?: ReturnType | string | null;

    /**
     * An aggregate function that is performed on the query result column (value from the query.Aggregate enum).
     * @since 2018.1
     */
    readonly aggregate?: Aggregate | string | null;

    /**
     * Whether the query results are grouped by this query result column.
     * @since 2018.1
     */
    readonly groupBy?: boolean;

    /**
     * The label for the column. A label is important if the query object is used as the data source for printing
     * (for example, in render.TemplateRenderer.addQuery(options)).
     * @since 2019.2
     */
    readonly label?: string;

    /**
     * An alias for this column. An alias is an alternate name for a column, and the alias is used in mapped results
     * (Result.asMap(), ResultSet.asMappedResults()).
     * @since 2019.2
     */
    readonly alias?: string;

    /**
     * The field context for values in the query result column. The field context determines how field values are displayed.
     * @since 2019.1
     */
    readonly context?: ColumnContextOptions;
}

/**
 * A sort that is placed on a particular query result column.
 * Use Query.createSort(options) or Component.createSort(options) to create this object.
 * @since 2018.1
 */
export interface Sort {
    /**
     * The query result column that the query results are sorted by.
     * @since 2018.1
     */
    readonly column: Column;

    /**
     * Whether the sort direction is ascending. The default value is true.
     * @since 2018.2
     */
    ascending: boolean;

    /**
     * Whether the sort is case sensitive. The default value is false.
     * @since 2018.2
     */
    caseSensitive: boolean;

    /**
     * Whether query results with null values are listed at the end of the query results.
     * The default value is the value of the Sort.ascending property.
     * @since 2018.2
     */
    nullsLast: boolean;

    /**
     * The locale to use for the sort. Uses values from the query.SortLocale enum.
     * @since 2018.2
     */
    locale: SortLocale | string;
}

/**
 * A condition that narrows the query results. Use Query.createCondition(options) or Component.createCondition(options)
 * to create this object.
 * @since 2018.1
 */
export interface Condition {
    /**
     * An array of child conditions used to create the parent condition. Only applicable to parent conditions created
     * with Query.and(conditions), Query.or(conditions), or Query.not(condition).
     * @since 2018.1
     */
    readonly children?: Condition[];

    /**
     * The name of the field that is used in the condition. Not applicable to parent conditions.
     * @since 2018.1
     */
    readonly fieldId: string;

    /**
     * The name of the operator used to create the condition. Not applicable to parent conditions.
     * @since 2018.1
     */
    readonly operator: Operator;

    /**
     * An array of values used by an operator to create the condition.
     * Oracle's members table also lists a single string, number, or boolean value.
     * @since 2018.1
     */
    readonly values?: string[] | number[] | boolean[] | Date[] | RelativeDate[] | Period[];

    /**
     * The formula used to create the condition.
     * @since 2018.1
     */
    readonly formula?: string;

    /**
     * The return type of the formula used to create the condition (value from the query.ReturnType enum).
     * @since 2018.1
     */
    readonly type?: ReturnType | string;

    /**
     * An aggregate function that is performed on the condition (value from the query.Aggregate enum).
     * @since 2018.1
     */
    readonly aggregate?: Aggregate | string;

    /**
     * The query.Component object to which this condition belongs. Not applicable to parent conditions.
     * @since 2018.1
     */
    readonly component?: Component;
}

export type QueryResultValue = string | boolean | number | bigint | null;
export type QueryResultMap = Record<string, QueryResultValue>;
/**
 * The set of results returned by the query. The maximum number of results in a ResultSet object is 5000.
 * @since 2018.1
 */
export interface ResultSet {
    /**
     * An array of query.Result objects.
     * @since 2018.1
     */
    readonly results: Result[];

    /**
     * An array of the return types for ResultSet.results. The values correspond with the ResultSet.columns values.
     * @since 2018.1
     */
    readonly types: string[];

    /**
     * An array of query result column references. The values correspond with the ResultSet.types values.
     * @since 2018.1
     */
    readonly columns: Column[];

    /**
     * Standard SuiteScript 2.0 object for iterating through results.
     * @governance none
     * @since 2018.1
     */
    iterator(): Iterator;

    /**
     * Returns the query result set as an array of mapped results.
     * A mapped result is a JavaScript object with key-value pairs.
     * In this object, the key is either the field ID or the alias that was used for the corresponding query.Column object.
     * @governance none
     * @since 2019.2
     */
    asMappedResults<T = QueryResultMap>(): T[];
}

/**
 * A single row of the result set (query.ResultSet).
 * @since 2018.1
 */
export interface Result {
    /**
     * The result values. Value types correspond to the ResultSet.types property. Values correspond to the values for
     * ResultSet.columns.
     * @since 2018.1
     */
    readonly values: QueryResultValue[];

    /**
     * The return columns. This is equivalent to ResultSet.columns.
     */
    // readonly columns: Column[]; // As of 2019.2, this is not in the Help documentation.

    /**
     * Returns the query result as a mapped result.
     * A mapped result is a JavaScript object with key-value pairs.
     * In this object, the key is either the field ID or the alias that was used for the corresponding query.Column object.
     * @governance none
     * @since 2019.2
     */
    asMap<T = QueryResultMap>(): T;

    /**
     * Gets the value at a given index in Result.values. Value types correspond to the ResultSet.types property.
     * @param options The index of the element from Result.values to return.
     * @governance none
     * @since 2018.2
     */
    getValue(options: number): QueryResultValue;
}

/**
 * One page of the paged query results.
 * @since 2018.1
 */
export interface Page {
    /**
     * The query results contained in this page.
     * @since 2018.1
     */
    readonly data: ResultSet;

    /**
     * Whether this page is the first of the paged query results.
     * @since 2018.1
     */
    readonly isFirst: boolean;

    /**
     * Whether this page is the last of the paged query results.
     * @since 2018.1
     */
    readonly isLast: boolean;

    /**
     * The set of paged query results that this page is from.
     * @since 2018.1
     */
    readonly pagedData: PagedData;

    /**
     * The range of query results for this page.
     * @since 2018.1
     */
    readonly pageRange: PageRange;
}

/**
 * A set of paged query results. This object also contains information about the set of paged results
 * it encapsulates.
 * @since 2018.1
 */
export interface PagedData {
    /**
     * The total number of paged query result rows.
     * @since 2018.1
     */
    readonly count: number;

    /**
     * An array of query.PageRange objects for the set of paged query results.
     * @since 2018.1
     */
    readonly pageRanges: PageRange[];

    /**
     * The number of query result rows per page. The maximum is 1000 and the minimum is 5
     * (except for the last page in the result set).
     * @since 2018.1
     */
    readonly pageSize: number;

    /**
     * Standard SuiteScript 2.x object for iterating through results.
     * @governance 10 units
     * @since 2018.1
     */
    iterator(): PageIterator;

    /**
     * Retrieves a page in the set of pages included in the PagedData object (page indexes start at 0).
     * Also available as PagedData.fetch.promise(options), which has the same errors and governance.
     * @throws {SuiteScriptError} INVALID_PAGE_INDEX if the value of the options.index parameter is not a number
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the value of the options.index parameter is a negative number or is greater than or equal to the number of pages
     * @governance none
     * @since 2018.1
     */
    readonly fetch: FetchType;
}

interface FetchType {
    (options: { index: number }): Page;
    promise(options: { index: number }): Promise<Page>;
}

/**
 * The range of query results for a page.
 * @since 2018.1
 */
export interface PageRange {
    /**
     * The index for this page range.
     * @since 2018.1
     */
    readonly index: number;

    /**
     * The number of query result rows in this page range.
     * @since 2018.1
     */
    readonly size: number;
}

/**
 * A period of time to use in query conditions. Use query.createPeriod(options) to create this object.
 * @since 2020.1
 */
export interface Period {
    /**
     * The adjustment of the period. This property uses values from the query.PeriodAdjustment enum.
     * If you create a period using query.createPeriod(options) and do not specify a value for the options.adjustment
     * parameter, the default value of this property is query.PeriodAdjustment.NOT_LAST.
     * @since 2020.1
     */
    readonly adjustment: string;
    /**
     * The code of the period. This property uses values from the query.PeriodCode enum.
     * @since 2020.1
     */
    readonly code: string;
    /**
     * The type of the period. This property uses values from the query.PeriodType enum.
     * If you create a period using query.createPeriod(options) and do not specify a value for the options.type
     * parameter, the default value of this property is query.PeriodType.START.
     * @since 2020.1
     */
    readonly type: string;
}

export interface Iterator {
    each(f: (result: { value: Result }) => boolean): void;
}

export interface PageIterator {
    each(f: (result: { value: Page }) => boolean): void;
}

/**
 * Creates a query.Query object (the initial query definition) based on the given query type.
 * @throws {SuiteScriptError} INVALID_RCRD_TYPE if the specified query type is invalid (custom record types are validated when the query is run)
 * @governance none
 * @since 2018.1
 */
export function create(options: CreateQueryOptions): Query;

/**
 * Loads an existing query definition (previously created in the SuiteAnalytics Workbook UI) as a query.Query object.
 * Also available as query.load.promise(options), which has the same errors and governance.
 * @throws {SuiteScriptError} UNABLE_TO_LOAD_QUERY if the query does not exist or you do not have permission to load it
 * @throws {SuiteScriptError} WORKBOOK_MORE_TABLEVIEWS_ARE_ASSIGNED if more than one table view is included in the specified workbook or dataset
 * @throws {SuiteScriptError} WORKBOOK_NO_TABLEVIEW_IS_ASSIGNED if no table views are included in the specified workbook or dataset
 * @governance 5 units
 * @since 2018.2
 */
export const load: QueryLoadFunction;

interface QueryLoadFunction {
    (options: LoadQueryOptions): Query;
    promise: (options: LoadQueryOptions) => Promise<Query>;
}

interface deleteQuery {
    (options: DeleteQueryOptions): void;
    /** Not listed in Oracle's N/query members table. */
    promise: (options: DeleteQueryOptions) => Promise<void>;
}

/**
 * Deletes an existing query definition (previously created in the SuiteAnalytics Workbook UI).
 * @throws {SuiteScriptError} UNABLE_TO_DELETE_QUERY if the query does not exist or you do not have permission to delete it
 * @governance 5 units
 * @since 2018.2
 */
export { deleteQuery as delete };

interface RunSuiteQL {
    (options: RunSuiteQLOptions): ResultSet;
    promise: (options: RunSuiteQLOptions) => Promise<ResultSet>;
}

/**
 * Runs an arbitrary SuiteQL query and returns the results as a query.ResultSet. Returns a maximum of 5000 results;
 * use query.runSuiteQLPaged(options) to retrieve more.
 * SuiteQL is a query language based on the SQL-92 revision of the SQL database query language.
 * Also available as query.runSuiteQL.promise(options), which has the same errors and governance.
 * Security: bind untrusted values with `?` placeholders and options.params rather than string concatenation.
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if the parameter is missing
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if types other than string, number, or boolean are included in options.params
 * @governance 10 units
 * @since 2020.1
 */
export const runSuiteQL: RunSuiteQL;

interface RunSuiteQLPaged {
    (options: RunSuiteQLPagedOptions): PagedData;
    promise: (options: RunSuiteQLPagedOptions) => Promise<PagedData>;
}

/**
 * Runs an arbitrary SuiteQL query as a paged query. Returns a maximum of 1000 pages.
 * Also available as query.runSuiteQLPaged.promise(options), which has the same errors and governance.
 * Security: bind untrusted values with `?` placeholders and options.params rather than string concatenation.
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if the parameter is missing
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if types other than string, number, or boolean are included in options.params
 * @governance 10 units
 * @since 2020.1
 */
export const runSuiteQLPaged: RunSuiteQLPaged;

interface ListTablesOptions {
    /** The ID of the workbook containing the table view objects to list. */
    workbookId: string;
}

/** A table view included in a SuiteAnalytics workbook, as returned by query.listTables(options). */
export interface TableView {
    /** The name of the table view object. */
    name: string;
    /** The script ID of the table view object. */
    scriptId: string;
}

/**
 * Lists the table view objects that are included in a workbook in SuiteAnalytics Workbook.
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if a required parameter is missing
 * @throws {SuiteScriptError} SCRIPT_ID_OF_WORKBOOK_IS_REQUIRED if the specified workbook ID represents an analytical record that is not a workbook
 * @throws {SuiteScriptError} SSS_INVALID_SCRIPT_ID_1 if the specified workbook ID is not valid
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if the specified workbook ID is not a string
 * @governance none
 * @since 2020.1
 */
export function listTables(options: ListTablesOptions): TableView[];

/**
 * Holds the string values for supported date codes in relative dates. Use with query.createRelativeDate(options).
 * @since 2019.1
 */
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
 * A relative date to use in query conditions. Use query.createRelativeDate(options) to create this object,
 * or use a value from the query.RelativeDateRange enum.
 * @since 2019.1
 */
export interface RelativeDate {
    /**
     * The start point of the relative date.
     * @since 2019.1
     */
    readonly start: object;

    /**
     * The end point of the relative date.
     * @since 2019.1
     */
    readonly end: object;

    /**
     * The interval from RelativeDate.start to RelativeDate.end.
     * @since 2019.1
     */
    readonly interval: object;

    /**
     * The value associated with the relative date (for example, the number of days for query.DateId.DAYS_AGO).
     * @since 2019.1
     */
    readonly value: number;

    /**
     * Indicates whether this relative date represents a range of dates (true for query.RelativeDateRange values)
     * or a specific moment in time (false for relative dates created using query.createRelativeDate(options)).
     * @since 2019.1
     */
    readonly isRange: boolean;

    /**
     * The ID of the relative date (a query.DateId value for relative dates created using query.createRelativeDate(options)).
     * @since 2019.1
     */
    readonly dateId: string;

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
    toJSON(): object;
}

interface CreatePeriodOptions {
    /** The code of the period. This property uses values from the query.PeriodCode enum. */
    code: PeriodCode;
    /** The adjustment of the period. This property uses values from the query.PeriodAdjustment enum. The default value of this property is query.PeriodAdjustment.NOT_LAST. */
    adjustment?: PeriodAdjustment;
    /** The type of the period. This property uses values from the query.PeriodType enum. The default value of this property is query.PeriodType.START. */
    type?: PeriodType;
}

/**
 * Creates a query.Period object, which represents a period of time to use in query conditions.
 * @throws {SuiteScriptError} INVALID_PERIOD_ADJUSTMENT if the specified period adjustment is not a value from the query.PeriodAdjustment enum
 * @throws {SuiteScriptError} INVALID_PERIOD_CODE if the specified period code is not a value from the query.PeriodCode enum
 * @throws {SuiteScriptError} INVALID_PERIOD_TYPE if the specified period type is not a value from the query.PeriodType enum
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if any of the parameters is not a string
 * @governance none
 * @since 2020.1
 */
export function createPeriod(options: CreatePeriodOptions): Period;

interface CreateRelativeDateOptions {
    /**
     * The ID of the relative date to create. Use the query.DateId enum.
     */
    dateId: DateId;

    /**
     * The value to use to create the relative date (for example, 5 with query.DateId.DAYS_AGO for five days ago).
     */
    value: number;
}


/**
 * Creates a query.RelativeDate object that represents a date relative to the current date.
 * @throws {SuiteScriptError} INVALID_DATE_ID if the specified value for options.dateId is not a value from the query.DateId enum
 * @governance none
 * @since 2019.1
 */
export function createRelativeDate(options: CreateRelativeDateOptions): RelativeDate;

/**
 * Holds the string values for operators supported with the N/query module. Use with Query.createCondition(options) and Component.createCondition(options).
 * @since 2018.1
 */
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
    EXCLUDE_ALL = "MN_EXCLUDE",
    EXCLUDE_ANY = "MN_EXCLUDE_ALL",
    EXCLUDE_EXACTLY = "MN_EXCLUDE_EXACTLY",
    GREATER = "GREATER",
    GREATER_NOT = "GREATER_NOT",
    GREATER_OR_EQUAL = "GREATER_OR_EQUAL",
    GREATER_OR_EQUAL_NOT = "GREATER_OR_EQUAL_NOT",
    INCLUDE_ALL = "MN_INCLUDE_ALL",
    INCLUDE_ANY = "MN_INCLUDE",
    INCLUDE_EXACTLY = "MN_INCLUDE_EXACTLY",
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

/**
 * Holds the string values for query types used in the query definition. Use with query.create(options).
 * A query type is not the same as a record type. Custom record types are not included in this enum.
 * @since 2018.1
 */
export enum Type {
    ACCOUNT = "account",
    ACCOUNTING_BOOK = "accountingbook",
    ACCOUNTING_CONTEXT = "accountingcontext",
    ACCOUNTING_PERIOD = "accountingperiod",
    ACTIVITY = "activity",
    ADDRESS_BOOK = "addressbook",
    ADVANCED_NUMBERING_LOG = "advancednumberinglog",
    ADVANCED_PDF_TEMPLATE = "advancedpdftemplate",
    ALLOCATION_METHOD = "allocationmethod",
    ALL_PARSER_PLUGIN = "allparserplugin",
    AMORTIZATION_SCHEDULE = "amortizationschedule",
    AMORTIZATION_TEMPLATE = "amortizationtemplate",
    AUTHORIZATION_CONSENT = "authorizationconsent",
    AUTOMATED_CLEARING_HOUSE = "automatedclearinghouse",
    BALANCING_SEGMENTS_PREFERENCE = "balancingsegmentspreference",
    BILLING_CLASS = "billingclass",
    BILLING_RATE_CARD = "billingratecard",
    BILLING_SCHEDULE = "billingschedule",
    BILL_OF_DISTRIBUTION = "billofdistribution",
    BILL_RUN = "billrun",
    BILL_RUN_SCHEDULE = "billrunschedule",
    BIN = "bin",
    BOM = "bom",
    BOM_REVISION = "bomrevision",
    BOM_REVISION_COMPONENT = "bomrevisioncomponent",
    BUDGETCATEGORY = "budgetcategory",
    BUDGETIMPORT = "budgetimport",
    BUDGETS = "budgets",
    BUDGET_EXCHANGE_RATE = "budgetexchangerate",
    BUDGET_LEGACY = "budgetlegacy",
    BULK_PROC_SUBMISSION = "bulkprocsubmission",
    BUNDLE_INSTALLATION_SCRIPT = "bundleinstallationscript",
    BUNDLE_INSTALLATION_SCRIPT_DEPLOYMENT = "bundleinstallationscriptdeployment",
    BUSINESS_EVENTS_PROCESSING_HISTORY = "businesseventsprocessinghistory",
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
    CHARGE = "charge",
    CHARGE_RULE = "chargerule",
    CHARGE_RUN = "chargerun",
    CHARGE_TYPE = "chargetype",
    CLASSIFICATION = "classification",
    CLIENT_SCRIPT = "clientscript",
    CLIENT_SCRIPT_DEPLOYMENT = "clientscriptdeployment",
    COMPANY_FEATURE_SETUP = "companyfeaturesetup",
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
    CURRENCY_RATE_TYPE = "currencyratetype",
    CUSTOMER = "customer",
    CUSTOMER_CATEGORY = "customercategory",
    CUSTOMER_MESSAGE = "customermessage",
    CUSTOMER_SEGMENT = "customersegment",
    CUSTOMER_SUBSIDIARY_RELATIONSHIP = "customersubsidiaryrelationship",
    CUSTOM_FIELD = "customfield",
    CUSTOM_FIELD_2 = "customfield2",
    CUSTOM_GL_PLUGIN = "customglplugin",
    CUSTOM_LIST = "customlist",
    CUSTOM_RECORD_ACTION_SCRIPT = "customrecordactionscript",
    CUSTOM_RECORD_TYPE = "customrecordtype",
    CUSTOM_SEGMENT = "customsegment",
    CUSTOM_SEGMENT_FIELD = "customsegmentfield",
    CUSTOM_TRANSACTION_TYPE = "customtransactiontype",
    DATASET_BUILDER_PLUGIN = "datasetbuilderplugin",
    DELETED_RECORD = "deletedrecord",
    DELETED_RECORD_IN_CONNECT = "deletedrecordinconnect",
    DEPARTMENT = "department",
    DEVICE_ID = "deviceid",
    DISTRIBUTION_CATEGORY = "distributioncategory",
    DISTRIBUTION_NETWORK = "distributionnetwork",
    DOMAIN = "domain",
    DUAL = "dual",
    EMAIL_CAPTURE_PLUGIN = "emailcaptureplugin",
    EMAIL_TEMPLATE = "emailtemplate",
    EMPLOYEE = "employee",
    EMPLOYEE_EXPENSE_SOURCE_TYPE = "employeeexpensesourcetype",
    EMPLOYEE_LIST = "employeelist",
    EMPLOYEE_STATUS = "employeestatus",
    EMPLOYEE_SUBSIDIARY_RELATIONSHIP = "employeesubsidiaryrelationship",
    EMPLOYEE_TYPE = "employeetype",
    ENTITY = "entity",
    ENTITY_GROUP = "entitygroup",
    ENTITY_SUBSIDIARY_RELATIONSHIP = "entitysubsidiaryrelationship",
    EXPENSE_CATEGORY = "expensecategory",
    EXPENSE_REPORT_POLICY = "expensereportpolicy",
    FAX_TEMPLATE = "faxtemplate",
    FILE = "file",
    FISCAL_CALENDAR = "fiscalcalendar",
    FI_CONNECTIVITY_PLUGIN = "ficonnectivityplugin",
    FORECAST = "forecast",
    FORMAT_PROFILE = "formatprofile",
    FULFILLMENT_EXCEPTION_REASON = "fulfillmentexceptionreason",
    FULFILLMENT_REQUEST = "fulfillmentrequest",
    F_I_PARSER_PLUGIN = "fiparserplugin",
    GATEWAY_NOTIFICATION = "gatewaynotification",
    GENERALIZED_ITEM = "generalizeditem",
    GENERAL_ALLOCATION_SCHEDULE = "generalallocationschedule",
    GENERAL_TOKEN = "generaltoken",
    GENERIC_RESOURCE = "genericresource",
    GENERIC_RESOURCE_SUBSIDIARY_RELATIONSHIP = "genericresourcesubsidiaryrelationship",
    GIFT_CERTIFICATE = "giftcertificate",
    GLOBAL_ACCOUNT_MAPPING = "globalaccountmapping",
    GLOBAL_INVENTORY_RELATIONSHIP = "globalinventoryrelationship",
    GL_LINES_AUDIT_LOG = "gllinesauditlog",
    GL_LINES_PLUGIN_REVISION = "gllinespluginrevision",
    G_L_NUMBERING_SEQUENCE = "glnumberingsequence",
    IMPORTED_EMPLOYEE_EXPENSE = "importedemployeeexpense",
    INBOUND_SHIPMENT = "inboundshipment",
    /** Oracle documents this key; INCO_TERM is kept for backward compatibility. */
    INCOTERM = "incoterm",
    INCO_TERM = "incoterm",
    INVENTORY_COST_TEMPLATE = "inventorycosttemplate",
    INVENTORY_NUMBER = "inventorynumber",
    INVENTORY_STATUS = "inventorystatus",
    INVOICE_GROUP = "invoicegroup",
    INVT_ITEM_PRICE_HISTORY = "invtitempricehistory",
    ISSUE = "issue",
    ISSUE_PRIORITY = "issuepriority",
    ISSUE_SEVERITY = "issueseverity",
    ISSUE_STATUS = "issuestatus",
    ITEM = "item",
    ITEM_ACCOUNT_MAPPING = "itemaccountmapping",
    ITEM_COLLECTION = "itemcollection",
    ITEM_DEMAND_PLAN = "itemdemandplan",
    ITEM_LOCATION_CONFIGURATION = "itemlocationconfiguration",
    ITEM_PROCESS_FAMILY = "itemprocessfamily",
    ITEM_PROCESS_GROUP = "itemprocessgroup",
    ITEM_REVISION = "itemrevision",
    ITEM_SEGMENT_CUSTOMER_SEGMENT_MAP = "itemsegmentcustomersegmentmap",
    ITEM_SEGMENT_INCLUDING_SYNTHETIC = "itemsegmentincludingsynthetic",
    ITEM_SUPPLY_PLAN = "itemsupplyplan",
    I_P_RESTRICTIONS = "iprestrictions",
    JOB = "job",
    JOB_RESOURCE_ROLE = "jobresourcerole",
    JOB_STATUS = "jobstatus",
    JOB_TYPE = "jobtype",
    KNOWLEDGE_BASE = "knowledgebase",
    LOCATION = "location",
    LOCATION_COSTING_GROUP = "locationcostinggroup",
    LOGIN_AUDIT = "loginaudit",
    MAIL_TEMPLATE = "mailtemplate",
    MANUFACTURING_COMPONENT = "manufacturingcomponent",
    MANUFACTURING_COST_TEMPLATE = "manufacturingcosttemplate",
    MANUFACTURING_OPERATION_TASK = "manufacturingoperationtask",
    MANUFACTURING_ROUTING = "manufacturingrouting",
    MANUFACTURING_TRANSACTION = "manufacturingtransaction",
    MAP_REDUCE_SCRIPT = "mapreducescript",
    MAP_REDUCE_SCRIPT_DEPLOYMENT = "mapreducescriptdeployment",
    MASS_UPDATE_SCRIPT = "massupdatescript",
    MASS_UPDATE_SCRIPT_DEPLOYMENT = "massupdatescriptdeployment",
    MEDIA_ITEM_FOLDER = "mediaitemfolder",
    MEM_DOC = "memdoc",
    MEM_DOC_TRANSACTION_TEMPLATE = "memdoctransactiontemplate",
    MERCHANDISE_HIERARCHY_LEVEL = "merchandisehierarchylevel",
    MERCHANDISE_HIERARCHY_NODE = "merchandisehierarchynode",
    MERCHANDISE_HIERARCHY_VERSION = "merchandisehierarchyversion",
    MESSAGE = "message",
    MFG_PLANNED_TIME = "mfgplannedtime",
    NETTING_STATEMENT = "nettingstatement",
    NEXUS = "nexus",
    NOTE = "note",
    OCR_IMPORT_JOB = "ocrimportjob",
    OCR_IMPORT_JOB_REVIEW = "ocrimportjobreview",
    OCR_PLUGIN = "ocrplugin",
    ONLINE_CASE_FORM = "onlinecaseform",
    ONLINE_FORM_TEMPLATE = "onlineformtemplate",
    ONLINE_LEAD_FORM = "onlineleadform",
    ORDER_ALLOCATION_STRATEGY = "orderallocationstrategy",
    /** Key as documented by Oracle (the value is "orderreleaseline"). */
    ORDER_RELEASE_LIN = "orderreleaseline",
    ORDER_RESERVATION = "orderreservation",
    ORDER_TYPE_RECORD = "ordertyperecord",
    OTHER_NAME = "othername",
    OTHER_NAME_CATEGORY = "othernamecategory",
    OTHER_NAME_SUBSIDIARY_RELATIONSHIP = "othernamesubsidiaryrelationship",
    OUTBOUND_REQUEST = "outboundrequest",
    /** Value as documented by Oracle (possibly a typo for "oauth2clientcredentials"). */
    O_AUTH2_CLIENT_CREDENTIALS = "oauth22clientcredentials",
    O_AUTH_TOKEN = "oauthtoken",
    PARTNER = "partner",
    PARTNER_SUBSIDIARY_RELATIONSHIP = "partnersubsidiaryrelationship",
    PAYCHECK = "paycheck",
    PAYMENT_CARD = "paymentcard",
    PAYMENT_CARD_SEARCH_RECORD = "paymentcardsearchrecord",
    PAYMENT_CARD_TOKEN = "paymentcardtoken",
    PAYMENT_EVENT = "paymentevent",
    PAYMENT_GATEWAY_PLUGIN = "paymentgatewayplugin",
    PAYMENT_INSTRUMENT = "paymentinstrument",
    PAYMENT_METHOD = "paymentmethod",
    PAYMENT_PROCESSING_PROFILE = "paymentprocessingprofile",
    PAYMENT_RESULT_PREVIEW = "paymentresultpreview",
    PAYROLL_BATCH = "payrollbatch",
    PAYROLL_ITEM = "payrollitem",
    PAYROLL_ITEM_GROUP = "payrollitemgroup",
    PDF_TEMPLATE = "pdftemplate",
    PERFORMANCE_REVIEW_SCHEDULE_TALENT_DATASET = "performancereviewscheduletalentdataset",
    PHONE_CALL = "phonecall",
    PICK_STRATEGY = "pickstrategy",
    PICK_TASK = "picktask",
    PICK_TASK_INVENTORY_BALANCE = "picktaskinventorybalance",
    PLANNED_ORDER = "plannedorder",
    PLANNED_STANDARD_COST = "plannedstandardcost",
    PLANNING_ITEM_CATEGORY = "planningitemcategory",
    PLANNING_ITEM_GROUP = "planningitemgroup",
    PLANNING_ITEM_GROUP_SOURCE = "planningitemgroupsource",
    PLANNING_RULE_GROUP = "planningrulegroup",
    PLANNING_VIEW = "planningview",
    PLATFORM_EXTENSION_PLUGIN = "platformextensionplugin",
    PLUG_IN_TYPE = "plugintype",
    PLUG_IN_TYPE_IMPL = "plugintypeimpl",
    PORTLET = "portlet",
    PORTLET_DEPLOYMENT = "portletdeployment",
    POSTING_ACCOUNT_ACTIVITY = "postingaccountactivity",
    PREDICTED_RISK_TRAIN_EVAL_HISTORY = "predictedrisktrainevalhistory",
    PRICE_LEVEL = "pricelevel",
    PRICING = "pricing",
    PRICING_GROUP = "pricinggroup",
    PRICING_WITH_CUSTOMERS = "pricingwithcustomers",
    PROJECT_BUDGET = "projectbudget",
    PROJECT_EXPENSE_TYPE = "projectexpensetype",
    PROJECT_FINANCIALS = "projectfinancials",
    PROJECT_IC_CHARGE_REQUEST = "projecticchargerequest",
    PROJECT_SUBSIDIARY_RELATIONSHIP = "projectsubsidiaryrelationship",
    PROJECT_TASK = "projecttask",
    PROJECT_TEMPLATE = "projecttemplate",
    PROJECT_TEMPLATE_SUBSIDIARY_RELATIONSHIP = "projecttemplatesubsidiaryrelationship",
    PROMOTIONS_PLUGIN = "promotionsplugin",
    PROMOTION_CODE = "promotioncode",
    PROMPT = "prompt",
    PUBLISHED_SAVED_SEARCH = "publishedsavedsearch",
    QUANTITY_PRICING_SCHEDULE = "quantitypricingschedule",
    QUOTA = "quota",
    RECENT_RECORD = "recentrecord",
    RECORD_ACTION_SCRIPT_DEPLOYMENT = "recordactionscriptdeployment",
    REC_SYS_ALGORITHM = "recsysalgorithm",
    REC_SYS_ANALYTICS_REPORT = "recsysanalyticsreport",
    REC_SYS_ANALYTICS_REPORT_AGG = "recsysanalyticsreportagg",
    REC_SYS_BLOCKLIST = "recsysblocklist",
    REC_SYS_CONVERSION = "recsysconversion",
    REC_SYS_ELIGIBILITY = "recsyseligibility",
    REC_SYS_SCENARIO = "recsysscenario",
    REDIRECT = "redirect",
    RESOURCE_ALLOCATION = "resourceallocation",
    RESOURCE_GROUP = "resourcegroup",
    RESTLET = "restlet",
    RESTLET_DEPLOYMENT = "restletdeployment",
    RETIREMENT_PLAN = "retirementplan",
    REVENUE_ELEMENT = "revenueelement",
    REV_REC_SCHEDULE = "revrecschedule",
    REV_REC_TEMPLATE = "revrectemplate",
    ROLE = "role",
    SALES_CHANNEL = "saleschannel",
    SALES_INVOICED = "salesinvoiced",
    SALES_ORDERED = "salesordered",
    SALES_ROLE = "salesrole",
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
    SHIPPING_PARTNER_REGISTRATION = "shippingpartnerregistration",
    SHIP_ITEM = "shipitem",
    SHOPPING_CART = "shoppingcart",
    SITE_CATEGORY = "sitecategory",
    SITE_THEME = "sitetheme",
    SOLUTION = "solution",
    STANDARD_COST_VERSION = "standardcostversion",
    STATE = "state",
    STATISTICAL_JOURNAL_ENTRY = "statisticaljournalentry",
    STATISTICAL_SCHEDULE = "statisticalschedule",
    STORE_PICKUP_FULFILLMENT = "storepickupfulfillment",
    STORE_TAB = "storetab",
    SUBLIST = "sublist",
    SUBSIDIARY = "subsidiary",
    SUBSIDIARY_SETTINGS = "subsidiarysettings",
    SUITELET = "suitelet",
    SUITELET_DEPLOYMENT = "suiteletdeployment",
    SUITE_SCRIPT_DETAIL = "suitescriptdetail",
    SUPPLY_CHAIN_SNAPSHOT = "supplychainsnapshot",
    SUPPLY_CHAIN_SNAPSHOT_SIMULATION = "supplychainsnapshotsimulation",
    SUPPLY_CHANGE_ORDER = "supplychangeorder",
    SUPPLY_PLAN_DEFINITION = "supplyplandefinition",
    SUPPORT_CASE = "supportcase",
    SUPPORT_CASE_PRIORITY = "supportcasepriority",
    SUPPORT_CASE_STATUS = "supportcasestatus",
    SYSTEM_EMAIL_TEMPLATE = "systememailtemplate",
    SYSTEM_NOTE = "systemnote",
    SYSTEM_NOTE2 = "systemnote2",
    SYSTEM_NOTE_FIELD = "systemnotefield",
    SYSTEM_NOTE_TYPE = "systemnotetype",
    TASK = "task",
    TASK_ITEM_STATUS = "taskitemstatus",
    TAX_CALCULATION_PLUGIN = "taxcalculationplugin",
    TAX_ITEM_TAX_GROUP = "taxitemtaxgroup",
    TAX_TYPE = "taxtype",
    TERM = "term",
    TEST_PLUGIN = "testplugin",
    TEXT_ENHANCE_ACTION = "textenhanceaction",
    TIME_BILL = "timebill",
    TIME_MODIFICATION_REQUEST = "timemodificationrequest",
    TIME_SHEET = "timesheet",
    TOPIC = "topic",
    TRACKING_NUMBER = "trackingnumber",
    TRANSACTION = "transaction",
    TRANSACTION_ADDRESSBOOK = "transactionaddressbook",
    TRANSACTION_APPLIED_RULES_LOG = "transactionappliedruleslog",
    TRANSACTION_BILLING = "transactionbilling",
    TRANSACTION_BILLING_ADDRESSBOOK = "transactionbillingaddressbook",
    TRANSACTION_DELETION_REASON = "transactiondeletionreason",
    TRANSACTION_HISTORY = "transactionhistory",
    TRANSACTION_NUMBERING_AUDIT_LOG = "transactionnumberingauditlog",
    TRANSACTION_PAYEE_ADDRESSBOOK = "transactionpayeeaddressbook",
    TRANSACTION_RETURN_ADDRESSBOOK = "transactionreturnaddressbook",
    TRANSACTION_SHIPPING_ADDRESSBOOK = "transactionshippingaddressbook",
    TRANSACTION_STATUS = "transactionstatus",
    UMD_FIELD = "umdfield",
    UNDELIVERED_EMAIL = "undeliveredemail",
    UNITS_TYPE = "unitstype",
    UNLOCKED_TIME_PERIOD = "unlockedtimeperiod",
    USER_AUTHORIZATION_CONSENT = "userauthorizationconsent",
    USER_EVENT_SCRIPT = "usereventscript",
    USER_EVENT_SCRIPT_DEPLOYMENT = "usereventscriptdeployment",
    USER_O_AUTH_TOKEN = "useroauthtoken",
    USRSAVEDSEARCH = "usrsavedsearch",
    USR_AUDIT_LOG = "usrauditlog",
    USR_DS_AUDIT_LOG = "usrdsauditlog",
    USR_DS_EXECUTION_LOG = "usrdsexecutionlog",
    USR_EXECUTION_LOG = "usrexecutionlog",
    U_S_R_SNAPSHOT = "usrsnapshot",
    VENDOR = "vendor",
    VENDOR_CATEGORY = "vendorcategory",
    VENDOR_SUBSIDIARY_RELATIONSHIP = "vendorsubsidiaryrelationship",
    WBS = "wbs",
    WEBAPP = "webapp",
    WEB_SITE = "website",
    WORKBOOK_BUILDER_PLUGIN = "workbookbuilderplugin",
    WORKFLOW_ACTION_SCRIPT = "workflowactionscript",
    WORKFLOW_ACTION_SCRIPT_DEPLOYMENT = "workflowactionscriptdeployment",
    WORKPLACE = "workplace",
    WORK_CALENDAR = "workcalendar",
    ZONE = "zone",
}

/**
 * Holds the string values for aggregate functions supported with the N/query module.
 * @since 2018.1
 */
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

/**
 * Holds the string values for the formula return types supported with the N/query module.
 * @since 2018.1
 */
export enum ReturnType {
    ANY = "ANY",
    BOOLEAN = "BOOLEAN",
    CLOBTEXT = "CLOBTEXT",
    CURRENCY = "CURRENCY",
    DATE = "DATE",
    DATETIME = "DATETIME",
    DURATION = "DURATION",
    FLOAT = "FLOAT",
    INTEGER = "INTEGER",
    KEY = "KEY",
    PERCENT = "PERCENT",
    RELATIONSHIP = "RELATIONSHIP",
    STRING = "STRING",
    UNKNOWN = "UNKNOWN",
}

/**
 * Holds the string values for the field context to use when creating a column.
 * The field context determines how field values are displayed in a column.
 * @since 2019.1
 */
export enum FieldContext {
    /** Displays consolidated debit / credit amount in the base currency. */
    SIGN_CONSOLIDATED = "SIGN_CONSOLIDATED",
    /** Displays converted currency amounts using the exchange rate that was in effect on a specific date. */
    CONVERTED = "CONVERTED",
    /** Displays consolidated currency amounts in the base currency. */
    CURRENCY_CONSOLIDATED = "CURRENCY_CONSOLIDATED",
    /**
     * Displays user-friendly field values.
     * For example, for the entity field on Transaction records, using the DISPLAY enum value displays the name of the entity instead of its ID.
     */
    DISPLAY = "DISPLAY",
    /**
     * Displays user-friendly field values for hierarchical fields (for example, “Parent Company : SUB CAD”).
     * This value is similar to the DISPLAY enum value but applies to hierarchical fields.
     */
    HIERARCHY = "HIERARCHY",
    /**
     * Displays raw field values for hierarchical fields (for example, “1 : 5”).
     * This value is similar to the RAW enum value but applies to hierarchical fields.
     */
    HIERARCHY_IDENTIFIER = "HIERARCHY_IDENTIFIER",
    /**
     * Displays raw field values.
     * For example, for the entity field on Transaction records, using the RAW enum value displays the ID of the entity.
     */
    RAW = "RAW"
}

/**
 * Holds the string values for adjustment types for a period. Use with query.createPeriod(options).
 * @since 2020.1
 */
export enum PeriodAdjustment {
    ALL,
    NOT_LAST
}

/**
 * Holds the string values for period codes for a period. Use with query.createPeriod(options).
 * Each value sets the Period.code property to the corresponding period code string.
 * @since 2020.1
 */
export enum PeriodCode {
    FIRST_FISCAL_QUARTER_LAST_FY = "Q1LFY",
    FIRST_FISCAL_QUARTER_THIS_FY = "Q1TFY",
    FISCAL_QUARTER_BEFORE_LAST = "QBL",
    FISCAL_YEAR_BEFORE_LAST = "FYBL",
    FOURTH_FISCAL_QUARTER_LAST_FY = "Q4LFY",
    FOURTH_FISCAL_QUARTER_THIS_FY = "Q4TFY",
    LAST_FISCAL_QUARTER = "LQ",
    LAST_FISCAL_QUARTER_ONE_FISCAL_YEAR_AGO = "LQOLFY",
    LAST_FISCAL_QUARTER_TO_PERIOD = "LFQTP",
    LAST_FISCAL_YEAR = "LFY",
    LAST_FISCAL_YEAR_TO_PERIOD = "LFYTP",
    LAST_PERIOD = "LP",
    LAST_PERIOD_ONE_FISCAL_QUARTER_AGO = "LPOLQ",
    LAST_PERIOD_ONE_FISCAL_YEAR_AGO = "LPOLFY",
    LAST_ROLLING_18_PERIODS = "LR18FP",
    LAST_ROLLING_6_FISCAL_QUARTERS = "LR6FQ",
    PERIOD_BEFORE_LAST = "PBL",
    SAME_FISCAL_QUARTER_LAST_FY = "TQOLFY",
    SAME_FISCAL_QUARTER_LAST_FY_TO_PERIOD = "TFQOLFYTP",
    SAME_PERIOD_LAST_FY = "TPOLFY",
    SAME_PERIOD_LAST_FISCAL_QUARTER = "TPOLQ",
    SECOND_FISCAL_QUARTER_LAST_FY = "Q2LFY",
    SECOND_FISCAL_QUARTER_THIS_FY = "Q2TFY",
    THIRD_FISCAL_QUARTER_LAST_FY = "Q3LFY",
    THIRD_FISCAL_QUARTER_THIS_FY = "Q3TFY",
    THIS_FISCAL_QUARTER = "TQ",
    THIS_FISCAL_QUARTER_TO_PERIOD = "TFQTP",
    THIS_FISCAL_YEAR = "TFY",
    THIS_FISCAL_YEAR_TO_PERIOD = "TFYTP",
    THIS_PERIOD = "TP"
}

/**
 * Holds the string values for period types for a period. Use with query.createPeriod(options).
 * @since 2020.1
 */
export enum PeriodType {
    END,
    START
}

/**
 * Holds the string values for sort locales supported with the N/query module. Use with Query.createSort(options) and Component.createSort(options).
 * You must enable the specified locale in your company settings to avoid potential scripting errors.
 * @since 2018.2
 */
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
    FI_FI = "FI_FI",
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
    ID_ID = "ID_ID",
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
    NO_NO = "NO_NO",
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
    VI_VN = "VI_VN",
    WEST_EUROPEAN = "WEST_EUROPEAN",
    WEST_EUROPEAN_AI = "WEST_EUROPEAN_AI",
    WEST_EUROPEAN_CI = "WEST_EUROPEAN_CI",
    ZH_CN = "ZH_CN",
    ZH_TW = "ZH_TW",
}

/**
 * Holds query.RelativeDate object values for supported date ranges in relative dates.
 * Use with Query.createCondition(options) and Component.createCondition(options).
 * @since 2019.1
 */
export enum RelativeDateRange {
    FISCAL_HALF_BEFORE_LAST,
    FISCAL_HALF_BEFORE_LAST_TO_DATE,
    FISCAL_QUARTER_BEFORE_LAST,
    FISCAL_QUARTER_BEFORE_LAST_TO_DATE,
    FISCAL_YEAR_BEFORE_LAST,
    FISCAL_YEAR_BEFORE_LAST_TO_DATE,
    FIVE_DAYS_AGO,
    FIVE_DAYS_FROM_NOW,
    FOUR_DAYS_AGO,
    FOUR_DAYS_FROM_NOW,
    FOUR_WEEKS_STARTING_THIS_WEEK,
    LAST_BUSINESS_WEEK,
    LAST_FISCAL_HALF,
    LAST_FISCAL_HALF_ONE_FISCAL_YEAR_AGO,
    LAST_FISCAL_HALF_TO_DATE,
    LAST_FISCAL_QUARTER,
    LAST_FISCAL_QUARTER_ONE_FISCAL_YEAR_AGO,
    LAST_FISCAL_QUARTER_TO_DATE,
    LAST_FISCAL_QUARTER_TWO_FISCAL_YEARS_AGO,
    LAST_FISCAL_YEAR,
    LAST_FISCAL_YEAR_TO_DATE,
    LAST_MONTH,
    LAST_MONTH_ONE_FISCAL_QUARTER_AGO,
    LAST_MONTH_ONE_FISCAL_YEAR_AGO,
    LAST_MONTH_TO_DATE,
    LAST_MONTH_TWO_FISCAL_QUARTERS_AGO,
    LAST_MONTH_TWO_FISCAL_YEARS_AGO,
    LAST_ROLLING_HALF,
    LAST_ROLLING_QUARTER,
    LAST_ROLLING_YEAR,
    LAST_WEEK,
    LAST_WEEK_TO_DATE,
    LAST_YEAR,
    LAST_YEAR_TO_DATE,
    MONTH_AFTER_NEXT,
    MONTH_AFTER_NEXT_TO_DATE,
    MONTH_BEFORE_LAST,
    MONTH_BEFORE_LAST_TO_DATE,
    NEXT_BUSINESS_WEEK,
    NEXT_FISCAL_HALF,
    NEXT_FISCAL_QUARTER,
    NEXT_FISCAL_YEAR,
    NEXT_FOUR_WEEKS,
    NEXT_MONTH,
    NEXT_ONE_HALF,
    NEXT_ONE_MONTH,
    NEXT_ONE_QUARTER,
    NEXT_ONE_WEEK,
    NEXT_ONE_YEAR,
    NEXT_WEEK,
    NINETY_DAYS_AGO,
    NINETY_DAYS_FROM_NOW,
    ONE_YEAR_BEFORE_LAST,
    PREVIOUS_FISCAL_QUARTERS_LAST_FISCAL_YEAR,
    PREVIOUS_FISCAL_QUARTERS_THIS_FISCAL_YEAR,
    PREVIOUS_MONTHS_LAST_FISCAL_HALF,
    PREVIOUS_MONTHS_LAST_FISCAL_QUARTER,
    PREVIOUS_MONTHS_LAST_FISCAL_YEAR,
    PREVIOUS_MONTHS_SAME_FISCAL_HALF_LAST_FISCAL_YEAR,
    PREVIOUS_MONTHS_SAME_FISCAL_QUARTER_LAST_FISCAL_YEAR,
    PREVIOUS_MONTHS_THIS_FISCAL_HALF,
    PREVIOUS_MONTHS_THIS_FISCAL_QUARTER,
    PREVIOUS_MONTHS_THIS_FISCAL_YEAR,
    PREVIOUS_ONE_DAY,
    PREVIOUS_ONE_HALF,
    PREVIOUS_ONE_MONTH,
    PREVIOUS_ONE_QUARTER,
    PREVIOUS_ONE_WEEK,
    PREVIOUS_ONE_YEAR,
    PREVIOUS_ROLLING_HALF,
    PREVIOUS_ROLLING_QUARTER,
    PREVIOUS_ROLLING_YEAR,
    SAME_DAY_FISCAL_QUARTER_BEFORE_LAST,
    SAME_DAY_FISCAL_YEAR_BEFORE_LAST,
    SAME_DAY_LAST_FISCAL_QUARTER,
    SAME_DAY_LAST_FISCAL_YEAR,
    SAME_DAY_LAST_MONTH,
    SAME_DAY_LAST_WEEK,
    SAME_DAY_MONTH_BEFORE_LAST,
    SAME_DAY_WEEK_BEFORE_LAST,
    SAME_FISCAL_HALF_LAST_FISCAL_YEAR,
    SAME_FISCAL_HALF_LAST_FISCAL_YEAR_TO_DATE,
    SAME_FISCAL_QUARTER_FISCAL_YEAR_BEFORE_LAST,
    SAME_FISCAL_QUARTER_LAST_FISCAL_YEAR,
    SAME_FISCAL_QUARTER_LAST_FISCAL_YEAR_TO_DATE,
    SAME_MONTH_FISCAL_QUARTER_BEFORE_LAST,
    SAME_MONTH_FISCAL_YEAR_BEFORE_LAST,
    SAME_MONTH_LAST_FISCAL_QUARTER,
    SAME_MONTH_LAST_FISCAL_QUARTER_TO_DATE,
    SAME_MONTH_LAST_FISCAL_YEAR,
    SAME_MONTH_LAST_FISCAL_YEAR_TO_DATE,
    SAME_WEEK_FISCAL_YEAR_BEFORE_LAST,
    SAME_WEEK_LAST_FISCAL_YEAR,
    SIXTY_DAYS_AGO,
    SIXTY_DAYS_FROM_NOW,
    TEN_DAYS_AGO,
    TEN_DAYS_FROM_NOW,
    THIRTY_DAYS_AGO,
    THIRTY_DAYS_FROM_NOW,
    THIS_BUSINESS_WEEK,
    THIS_FISCAL_HALF,
    THIS_FISCAL_HALF_TO_DATE,
    THIS_FISCAL_QUARTER,
    THIS_FISCAL_QUARTER_TO_DATE,
    THIS_FISCAL_YEAR,
    THIS_FISCAL_YEAR_TO_DATE,
    THIS_MONTH,
    THIS_MONTH_TO_DATE,
    THIS_ROLLING_HALF,
    THIS_ROLLING_QUARTER,
    THIS_ROLLING_YEAR,
    THIS_WEEK,
    THIS_WEEK_TO_DATE,
    THIS_YEAR,
    THIS_YEAR_TO_DATE,
    THREE_DAYS_AGO,
    THREE_DAYS_FROM_NOW,
    THREE_FISCAL_QUARTERS_AGO,
    THREE_FISCAL_QUARTERS_AGO_TO_DATE,
    THREE_FISCAL_YEARS_AGO,
    THREE_FISCAL_YEARS_AGO_TO_DATE,
    THREE_MONTHS_AGO,
    THREE_MONTHS_AGO_TO_DATE,
    TODAY,
    TODAY_TO_END_OF_THIS_MONTH,
    TOMORROW,
    TWO_DAYS_AGO,
    TWO_DAYS_FROM_NOW,
    WEEK_AFTER_NEXT,
    WEEK_AFTER_NEXT_TO_DATE,
    WEEK_BEFORE_LAST,
    WEEK_BEFORE_LAST_TO_DATE,
    YESTERDAY
}
