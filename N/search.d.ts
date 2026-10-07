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
 *
 * Supported script types: Client and server scripts.
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
    /**
     * Operator used for the search filter. This value is set with the search.Operator enum.
     * The search.Operator enum contains the valid operator values for this property.
     * @since 2015.2
     */
    readonly operator: Operator;
    /**
     * Summary type for the search filter. Use this property to get or set the value of the summary type. See search.Summary.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_SUM if an unknown summary type is set.
     * @since 2015.2
     */
    summary: Summary;
    /**
     * Formula used by the search filter. Use this property to get or set the formula used by the search filter.
     * Security note: do not concatenate untrusted input into formulas; pass it as a filter value instead.
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
 *
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface Column {
    /**
     * Returns the search column for which the minimal or maximal value should be found when returning the search.Column value.
     * You can only use this method if you use MIN or MAX as the summary type on a search column.
     * @governance none
     * @since 2015.2
     */
    setWhenOrderedBy?(options: SearchColumnSetWhenOrderedByOptions): Column;
    /**
     * Name of a search column as a string.
     * @since 2015.2
     */
    readonly name: string;
    /**
     * Join ID for a search column as a string.
     * @since 2015.2
     */
    readonly join?: string;
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
    function?: string;
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

/** Options for Result.getValue(options). */
interface ResultGetValueOptions {
    /** The search return column name. */
    name: string;
    /** The join id for this search return column. */
    join?: string;
    /** The summary type for this column. See search.Summary. */
    summary?: Summary;
    /** Special function for the search column. See Column.function. */
    func?: string;
}

/** Options for Result.getText(options). */
interface ResultGetTextOptions {
    /** The name of the search column. */
    name: string;
    /** The join internal ID for the search column. */
    join?: string;
    /** The summary type used for the search column. See search.Summary. */
    summary?: Summary;
}

/**
 * Encapsulates a single search result row. Use the methods and properties for the Result object to get the column values for the result row.
 *
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface Result {
    /**
     * Returns the value of a specified search result column. Used on formula and non-formula (standard) fields.
     * Accepts a search.Column, a column name, or an options object with name, join, summary, and func.
     * Note: If you have multiple search return columns and you apply grouping, all columns must include a summary property.
     *
     * Note: Oracle's Result.getValue pages say the value is a boolean for check box fields, a number for record, list,
     * decimal number, or image fields, and a string for all other fields (multiselect values are a comma-separated
     * string of IDs). In practice, record/list and numeric values are returned as strings, so this declaration
     * does not include number.
     * @returns The column value: boolean for check box fields, otherwise a string.
     * @governance none
     * @since 2015.2
     */
    getValue(column: Column | ResultGetValueOptions | string): boolean | string | string[];
    /**
     * Returns the text value (UI display name) of a specified search result column. Used on select, image, and document fields.
     * Accepts a search.Column, a column name, or an options object with name, join, and summary.
     * @governance none
     * @since 2015.2
     */
    getText(options: Column | ResultGetTextOptions | string): string;
    /** This method is undocumented but works in client and server-side scripts in NetSuite 2019.2.  It returns an object containing all column values by name. */
    getAllValues(): Record<string, boolean | string | LookupValueObject[]>;
    /** This method is undocumented but works in client and server-side scripts in NetSuite 2019.2.  It returns an object representing the search result. */
    toJSON(): { recordType?: string, id?: string, values: Record<string, string | boolean> };
    /**
     * The type of record returned in a search result row.
     * @since 2015.2
     */
    recordType: Type | string;
    /**
     * The internal ID for the record returned in a search result row.
     * @since 2015.2
     */
    readonly id: string;
    /**
     * Array of search.Column objects that encapsulate the columns returned in the search result row.
     * @since 2015.2
     */
    readonly columns: Column[];
}

interface SearchResultSetGetRangeOptions {
    /** Index number of the first result to return, inclusive. */
    start: number;
    /** Index number of the last result to return, exclusive. A maximum of 1000 results can be returned per call. */
    end: number;
}

interface SearchResultSetGetRangeFunction {
    /**
     * Asynchronously retrieves a slice of the search result as an array of search.Result objects.
     * Supported script types: Client scripts.
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SearchResultSetGetRangeOptions): Promise<Result[]>;
    /**
     * Retrieves a slice of the search result as an array of search.Result objects.
     * Unlimited rows in the result are supported, however you can only return 1,000 at a time based on the index values.
     * If you specify a range for which there are no results, an empty array is returned.
     * @governance 10 units
     * @since 2015.2
     */
    (options: SearchResultSetGetRangeOptions): Result[];
}

interface SearchResultSetEachFunction {
    /**
     * Asynchronously uses a developer-defined function to invoke on each row in the search results, up to 4000 results at a time.
     * Supported script types: Client scripts.
     * @governance 10 units
     * @since 2015.2
     */
    promise(callback: (result: Result) => boolean): Promise<boolean>;
    /**
     * Uses a developer-defined function to invoke on each row in the search results, up to 4000 results at a time.
     * The callback returns true to continue the iteration or false to stop it.
     * The work done in the callback counts toward the governance of the calling script.
     * @governance 10 units
     * @since 2015.2
     */
    (callback: (result: Result) => boolean): void;
}

/**
 * Encapsulates a set of search results returned by Search.run().
 *
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface ResultSet {
    each: SearchResultSetEachFunction;
    getRange: SearchResultSetGetRangeFunction;
    /**
     * An array of search.Column objects that represent the columns returned in the search results.
     * @since 2015.2
     */
    readonly columns: Column[];
}

interface FetchOptions {
    /** The index of the page range that bounds the desired data. Page range indexes start at 0. */
    index: number;
}

interface PageNextFunction {
    /**
     * Asynchronously fetches the next segment of data (bounded by search.PageRange).
     * Supported script types: Client scripts.
     * @governance 5 units
     * @since 2016.1
     */
    promise(): Promise<Page>;
    /**
     * Fetches the next segment of data (bounded by search.PageRange). Moves the current page to the next range.
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the page range is invalid, or when the page is the last page.
     * @governance 5 units
     * @since 2016.1
     */
    (): Page;
}

interface PagePrevFunction {
    /**
     * Asynchronously fetches the previous segment of data (bounded by search.PageRange).
     * Supported script types: Client scripts.
     * @governance 5 units
     * @since 2016.1
     */
    promise(): Promise<Page>;
    /**
     * Fetches the previous segment of data (bounded by search.PageRange). Moves the current page to the previous range.
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the page range is invalid, or when the page is the first page.
     * @governance 5 units
     * @since 2016.1
     */
    (): Page;
}

interface PagedDataFetchFunction {
    /**
     * Asynchronously retrieves the data within the specified page range.
     * Supported script types: Client scripts.
     * @governance 5 units
     * @since 2016.1
     */
    promise(options: FetchOptions): Promise<Page>;
    /**
     * Retrieves the data within the specified page range.
     * @throws {SuiteScriptError} INVALID_PAGE_RANGE if the page range is not valid.
     * @governance 5 units
     * @since 2016.1
     */
    (options: FetchOptions): Page;
}

/**
 * Encapsulates a set of search results for a single search page.
 *
 * Supported script types: Client and server scripts.
 * @since 2016.1
 */
export interface Page {
    next: PageNextFunction;
    prev: PagePrevFunction;
    /**
     * The results from a paginated search.
     * @since 2016.1
     */
    readonly data: Result[];
    /**
     * Indicates whether a page is the first page of data for a result set.
     * @since 2016.1
     */
    readonly isFirst: boolean;
    /**
     * Indicates whether a page is the last page of data for a result set.
     * @since 2016.1
     */
    readonly isLast: boolean;
    /**
     * The PagedData Object used to fetch this Page Object.
     * @since 2016.1
     */
    readonly pagedData: PagedData;
    /**
     * The PageRange Object used to fetch this Page Object. Page boundary information with the key and label.
     * @since 2016.1
     */
    readonly pageRange: PageRange;
}

/**
 * Defines the page range to bound the result set for a paginated query.
 *
 * Supported script types: Client and server scripts.
 * @since 2016.1
 */
export interface PageRange {
    /**
     * Human-readable label with beginning and ending range identifiers.
     * @since 2016.1
     */
    readonly compoundLabel: string;
    /**
     * The index of this page range.
     * @since 2016.1
     */
    readonly index: number;
}

/**
 * Holds metadata about a paginated query.
 *
 * Supported script types: Client and server scripts.
 * @since 2016.1
 */
export interface PagedData {
    fetch: PagedDataFetchFunction;
    /**
     * The total number of results when Search.runPaged(options) was executed.
     * @since 2016.1
     */
    readonly count: number;
    /**
     * The collection of PageRange objects that divide the entire result set into smaller groups.
     * @since 2016.1
     */
    readonly pageRanges: PageRange[];
    /**
     * The maximum number of entries per page.
     * @since 2016.1
     */
    readonly pageSize: number;
    /**
     * The search criteria used when Search.runPaged(options) was executed.
     * @since 2016.1
     */
    readonly searchDefinition: Search;
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
     * Asynchronously runs the current search and returns a search.PagedData Object.
     * @governance 5 units
     * @since 2016.1
     */
    promise(options?: RunPagedOptions): Promise<PagedData>;
    /**
     * Runs the current search and returns summary information about paginated results.
     * Calling this method does not give you the result set or save the search. To retrieve data, use PagedData.fetch(options).
     * This method can return a maximum of 1000 pages of search results.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING if an unknown search parameter name is provided.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING_VALUE if an unsupported value is set for the provided search parameter name.
     * @governance 5 units
     * @since 2016.1
     */
    (options?: RunPagedOptions): PagedData;
}

interface SearchSaveFunction {
    /**
     * Asynchronously saves a search created by search.create(options) or loaded with search.load(options). Returns the internal ID of the saved search.
     * @governance 5 units
     * @since 2015.2
     */
    promise(): Promise<number>;
    /**
     * Saves a search created by search.create(options) or loaded with search.load(options). Returns the internal ID of the saved search.
     * You must set the title (and optionally id) properties for a new saved search before you save it.
     * @returns The internal search ID of the saved search.
     * @throws {SuiteScriptError} NAME_ALREADY_IN_USE if the Search.title property is not unique.
     * @throws {SuiteScriptError} SSS_DUPLICATE_SEARCH_SCRIPT_ID if the Search.id property is not unique.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the required Search.title property is not set.
     * @governance 5 units
     * @since 2015.2
     */
    (): number;
}

/**
 * A search filter expression: an array whose elements are filter terms (e.g. `['email', 'startswith', 'kwolfe']`),
 * logical operators (`'and'`, `'or'`, `'not'`), or nested filter expressions.
 */
export type FilterExpression = (string | number | boolean | Date | null | Filter | FilterExpression)[];

/**
 * Encapsulates a NetSuite search. Use the methods available to the Search object to create a search, run a search, or save a search.
 *
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface Search {
    /**
     * Internal ID name of the record type on which a search is based (for example, customer or salesorder).
     * @since 2015.2
     */
    readonly searchType: Type | string;
    /**
     * Internal ID of a search.
     * @since 2015.2
     */
    readonly searchId: number;
    /**
     * Filters for the search as an array of search.Filter objects.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER if a value is invalid for the search filter type.
     * @since 2015.2
     */
    filters: Filter[];
    /**
     * Search filter expression for the search as an array of expression objects.
     * Use null to set an empty array and remove any existing filter expressions on this search.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR if the value is not a valid search filter, filter array, or filter expression.
     * @since 2015.2
     */
    filterExpression: FilterExpression;
    /**
     * Columns to return for this search as an array of search.Column objects or a string array of column names.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_COLUMN if the value passed in was not a string or search.Column object.
     * @since 2015.2
     */
    columns: (Column | string)[];
    /**
     * Search settings for this search as an array of search.Setting objects or a string array of setting names.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING if an unknown search parameter name is provided.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING_VALUE if an unsupported value is set for the provided search parameter name.
     * @since 2018.2
     */
    settings: (Setting | string)[];
    /**
     * Title for a saved search. Use this property to set the title for a search before you save it for the first time.
     * @since 2015.2
     */
    title: string;
    /**
     * Script ID for a saved search, starting with customsearch. If you do not set this property and then save the search, NetSuite generates a script ID for you.
     * @since 2015.2
     */
    id: string;
    /**
     * Value is true if the search is public, or false if it is not.
     * @since 2015.2
     */
    isPublic: boolean;
    /**
     * The application ID for the search, in the form publisher_id.project_id (for example, com.netsuite.mysuiteapp).
     * The Show App ID Field preference must be enabled in your NetSuite account.
     * @since 2019.2
     */
    packageId: string;
    save: SearchSaveFunction;
    /**
     * Runs an on-demand search created with search.create(options) or a search loaded with search.load(options), returning the results as a search.ResultSet.
     * Calling this method does not save the search.
     *
     * Note: Oracle's Search.run() page lists only client scripts as supported script types, while the search.Search
     * object page lists client and server scripts. This method is commonly used in server scripts.
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
    values?: FieldValue | FieldValue[] | string | Date | number | string[] | Date[] | number[] | boolean;
    /** Formula used by the search filter. */
    formula?: string;
    /** Summary type for the search filter. */
    summary?: Summary;
}

export interface CreateSearchColumnOptions {
    /** Name of the search column. See Column.name. */
    name: string;
    /** Join ID for the search column. See Column.join. */
    join?: string;
    /** Summary type for the column. See search.Summary and Column.summary. */
    summary?: Summary;
    /** Formula for the search column. See Column.formula. */
    formula?: string;
    /**
     * See the list of Supported Function in NetSuite help.
     * For example, use "day" when creating a column to show a date/time column as just a date.
     * Do not specify this property when calling result.getValue(), only use it when creating the search column.
     */
    function?: string;
    /** Label for the search column. See Column.label. */
    label?: string;
    /** The sort order of the column. Use the search.Sort enum. After you create a column, you cannot change its sort order. */
    sort?: Sort;
}

type LookupValue = string | number | boolean | LookupValueObject[];

export interface LookupValueObject { value: string, text: string }

interface SearchLookupFieldsFunction {
    /**
     * Performs a search asynchronously for one or more body fields on a record.
     * @governance 1 unit
     * @since 2015.2
     */
    promise<T extends string>(options: {
        /** The search type for which you want to look up fields. Use the search.Type enum. */
        type: Type | string;
        /** Internal ID for the record, for example 777 or 87. */
        id: FieldValue | string | number;
        /** Array of column/field names to look up, or a single column/field name. Can reference joined fields (join_id.field_name). */
        columns: T | T[]
    }): Promise<{ [ K in T ]?: LookupValue }>;

    /**
     * Performs a search for one or more body fields on a record.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if options.columns includes invalid columns for the specified record.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 1 unit
     * @since 2015.2
     */
    <T extends string>(options: {
        /** The search type for which you want to look up fields. Use the search.Type enum. */
        type: Type | string;
        /** Internal ID for the record, for example 777 or 87. */
        id: FieldValue | string | number;
        /** Array of column/field names to look up, or a single column/field name. Can reference joined fields (join_id.field_name). */
        columns: T | T[]
    }): { [ K in T ]?: LookupValue };
}

/** Global search keywords string or expression. */
interface SearchGlobalOptions {
    /** Global search keywords string or expression. */
    keywords: string;
}

interface SearchGlobalFunction {
    /**
     * Performs a global search asynchronously against a single keyword or multiple keywords.
     * @returns A promise that resolves to an array of search.Result objects with the columns name, type, info1, and info2, or null if there are no results.
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SearchGlobalOptions): Promise<Result[] | null>;
    /**
     * Performs a global search against a single keyword or multiple keywords.
     * @returns An array of search.Result objects with the columns name, type, info1, and info2. Results are limited to 1000 records.
     * If there are no search results, this method returns null.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 10 units
     * @since 2015.2
     */
    (options: SearchGlobalOptions): Result[] | null;
}

interface SearchDuplicatesOptions {
    /**
     * The search type that you want to check for duplicates. Use the search.Type enum.
     * The type must correspond to a record type that supports duplicate record detection (for example, customer, lead, prospect, contact, partner, and vendor records).
     */
    type: Type | string;
    /**
     * A set of key-value pairs used to detect duplicates. The keys are internal ID names of the fields used to detect duplicates,
     * for example `{ email: 'sample@test.com' }`. Use either this or options.id.
     */
    fields?: Record<string, string>;
    /** Internal ID of an existing record to detect duplicates of. Use either this or options.fields. */
    id?: number;
}

interface SearchDuplicatesFunction {
    /**
     * Performs a search for duplicate records asynchronously based on the account's duplicate detection configuration.
     * @returns A promise that resolves to an array of search.Result objects for the duplicate records, or null if there are no results.
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: SearchDuplicatesOptions): Promise<Result[] | null>;
    /**
     * Performs a search for duplicate records based on the account's duplicate detection configuration.
     * @returns An array of search.Result objects for the duplicate records. Results are limited to 1000 rows.
     * If there are no search results, this method returns null.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 10 units
     * @since 2015.2
     */
    (options: SearchDuplicatesOptions): Result[] | null;
}

interface SearchDeleteOptions {
    /** Internal ID or script ID of a saved search. The script ID starts with customsearch. */
    id: string | number;
    /** The search type of the saved search to delete. Required if the saved search uses a standalone search type. See search.load(options). */
    type?: Type | string;
}

interface SearchDeleteFunction {
    /**
     * Deletes an existing saved search asynchronously.
     * @governance 5 units
     * @since 2015.2
     */
    promise(options: SearchDeleteOptions): Promise<void>;
    /**
     * Deletes an existing saved search.
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
     * Loads an existing saved search asynchronously and returns it as a search.Search object.
     * @governance 5 units
     * @since 2015.2
     */
    promise(options: SearchLoadOptions): Promise<Search>;
    /**
     * Loads an existing saved search and returns it as a search.Search object.
     * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance 5 units
     * @since 2015.2
     */
    (options: SearchLoadOptions): Search;
}

/** Setting definition accepted by search.create(options) in place of a search.Setting object. */
interface SearchSettingDefinition {
    /** The name of the search parameter. See search.createSetting(options). */
    name: SettingName | string;
    /** The value of the search parameter. */
    value: string;
}

export interface SearchCreateOptions {
    /** The search type that you want to base the search on. Use the search.Type enum. */
    type: Type | string;
    /**
     * A single search.Filter object, an array of search.Filter objects, a search filter expression, or an array of search filter expressions.
     * If a provided filter value has an incorrect type (for example, a string instead of a number), the filter value is ignored.
     */
    filters?: Filter | CreateSearchFilterOptions | (Filter | CreateSearchFilterOptions)[] | FilterExpression;
    /** A single search.Column object or array of search.Column objects, column names, or column definition objects. */
    columns?: Column | CreateSearchColumnOptions | string | (Column | CreateSearchColumnOptions | string)[];
    /** The name for a saved search. The title property is required to save a search with Search.save(). */
    title?: string;
    /** Script ID for a saved search. If you do not set the saved search ID, NetSuite generates one for you. */
    id?: string;
    /** Set to true to make the search public. Defaults to false. */
    isPublic?: boolean;
    /** The application ID for this search. */
    packageId?: string;
    /** Search settings for this search as a single search.Setting object or an array of search.Setting objects (or setting definitions/strings). */
    settings?: Setting | SearchSettingDefinition | string | (Setting | SearchSettingDefinition | string)[];
    /** Search filter expression for the search as an array of expression objects. */
    filterExpression?: FilterExpression;
}

interface SearchCreateFunction {
    /**
     * Creates a new search and returns it as a search.Search object.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if the options.columns parameter is not a valid column, string, or column or string array.
     * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR if the options.filters parameter is not a valid search filter, filter array, or filter expression.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
     * @governance none
     * @since 2015.2
     */
    (options: SearchCreateOptions): Search;
    /**
     * Creates a new search asynchronously and returns it as a search.Search object.
     * @governance none
     * @since 2015.2
     */
    promise(options: SearchCreateOptions): Promise<Search>;
}
/**
 * Holds the string values for search types supported in the N/search Module. Use this enum to set the value for the options.type parameter of the search.create(options) method. A search type is not a synonym for a record type.
 * @since 2015.2
 */
export enum Type { // As of NetSuite 2026.2
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
    /** Not listed on Oracle's search.Type page; FinRptAggregateFR is listed as a standalone search type for search.load(options). */
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
 *
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if the options.columns parameter is not a valid column, string, or column or string array.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_FILTER_EXPR if the options.filters parameter is not a valid search filter, filter array, or filter expression.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2015.2
 */
export const create: SearchCreateFunction;
/**
 * Loads an existing saved search and returns it as a search.Search object.
 * The saved search could have been created using the UI or created with search.create(options) and Search.save().
 * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 5 units
 * @since 2015.2
 */
export const load: SearchLoadFunction;
/**
 * Deletes an existing saved search.
 * @throws {SuiteScriptError} INVALID_SEARCH if a saved search with the options.id cannot be found.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 5 units
 * @since 2015.2
 */
declare const deleteFunc: SearchDeleteFunction;
export { deleteFunc as delete };
/**
 * Performs a search for duplicate records based on the account's duplicate detection configuration.
 * This API works only for records that support duplicate record detection (for example, customer, lead, prospect, contact, partner, and vendor records).
 *
 * @returns search.Result[] that contains the duplicate records. Results are limited to 1000 rows.
 * If there are no search results, this method returns null.
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
 * single value, or a collection of values. Single select fields are returned as an array containing one object with value and text
 * properties. Multi-select fields are returned as an array of objects with value and text properties.
 *
 * In the following example, a select field like my_select would return an array of objects containing a value and text
 * property. This select field contains multiple entries to select from, so each entry would have a numerical id (the
 * value) and a text display (the text). For "internalid" in this particular code snippet, the sample returns 1234. The
 * internal id of a record is a single value, so a scalar is returned:
```
{
 internalid: 1234,
 firstname: 'Joe',
 my_select: [{ value: 1, text: 'US Sub' }],
 my_multiselect: [{ value: 1, text: 'US Sub' }, { value: 2, text: 'EU Sub' }]
}
```
 * Custom multiselect fields of type "long text" are truncated at 4,000 characters in search/lookup operations.
 *
 * @returns Returns select fields as an object with value and text properties. Returns multiselect fields as an
 * array of object with value:text pairs.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COL if options.columns includes invalid columns for the specified record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance 1 unit
 * @since 2015.2
 */
export const lookupFields: SearchLookupFieldsFunction;

/**
 * Creates a new search column as a search.Column object.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_COLUMN_SUM if options.summary is not a valid search summary type.
 * @throws {SuiteScriptError} INVALID_SRCH_FUNCTN if an unknown function is provided.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2015.2
 */
export function createColumn(options: CreateSearchColumnOptions): Column;
/** Creates a new search filter as a search.Filter object.
 *
 * Important: You cannot directly create a filter or column for a list/record type field in SuiteScript by passing
 * in its text value. You must use the field’s internal ID. If you must use the field’s text value, you can create
 * a filter or column with a formula using name: 'formulatext'.
 *
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_OPERATOR if options.operator is not a valid operator type.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_SUMMARY_TYP if options.summary is not a valid search summary type.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2015.2
 */
export function createFilter(options: CreateSearchFilterOptions): Filter;

/**
 * Creates a new search setting and returns it as a search.Setting object.
 * Search settings let you specify search parameters that are typically available only in the UI.
 * After you create your settings, assign them as array values to Search.settings.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING if an unknown search parameter name is provided.
 * @throws {SuiteScriptError} SSS_INVALID_SRCH_SETTING_VALUE if an unsupported value is set for the provided search parameter name.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing.
 * @governance none
 * @since 2018.2
 */
export function createSetting<K extends SettingName>(options: CreateSearchSettingOptions<K>): Setting

interface CreateSearchSettingOptions<K extends SettingName> {
    /** The name of the search parameter to set. Use consolidationtype or includeperiodendtransactions. */
    name: K | string
    /**
     * The value of the search parameter. Values are not case sensitive.
     * For consolidationtype use ACCTTYPE (default), AVERAGE, CURRENT, HISTORICAL, or NONE.
     * For includeperiodendtransactions use F, FALSE (default), T, or TRUE.
     */
    value: SettingValueType[K] | string
}

/**
 * Encapsulates a search setting. Search settings let you specify search parameters that are typically available only in the UI.
 *
 * Supported script types: Client and server scripts.
 * @since 2018.2
 */
export interface Setting {
    /**
     * The name of the search parameter.
     * @since 2018.2
     */
    readonly name: string
    /**
     * The value of the search parameter. Oracle documents this property as a string.
     * @since 2018.2
     */
    readonly value: ConsolidationEnum | IncludePeriodTransactionEnum
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
