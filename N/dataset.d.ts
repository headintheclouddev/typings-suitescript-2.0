/**
 * Load the N/dataset module when you want to create a new dataset, load an existing dataset, or list all existing datasets.
 * This module is available in server scripts only.
 *
 * Datasets are the basis for all workbooks and workbook components in your account.
 * In a dataset, you combine record type fields and criteria filters to create a query.
 * The results of this query can be used as the source data for the workbooks you create in your account.
 * A single dataset can be used in multiple workbooks.
 * For more information on datasets in SuiteAnalytics, see Defining a Dataset.
 * For more information on using workbooks, see N/workbook Module.
 */

import type {PagedData, RelativeDate, ResultSet} from "./query";
import type {Expression} from "./workbook";

/**
 * Encapsulates the record fields in the dataset. Columns are equivalent to the fields you use when you build a dataset in SuiteAnalytics.
 * @since 2020.2
 */
interface Column {
  /** @since 2020.2 */
  readonly alias: string;
  /** @since 2020.2 */
  readonly fieldId: string;
  /** @since 2020.2 */
  readonly formula: string;
  /** @since 2020.2 */
  readonly id: string;
  /** @since 2020.2 */
  readonly join: string;
  /** @since 2020.2 */
  readonly label: string;
  /** @since 2020.2 */
  readonly type: string;
}

/**
 * The conditions for the dataset. Conditions are equivalent to criteria you use when you build a dataset in SuiteAnalytics.
 * @since 2020.2
 */
interface Condition {
  /**
   * Indicates whether the condition in a sort is case sensitive.
   * @since 2020.2
   */
  caseSensitive: boolean;
  readonly children: Condition[];
  /** @since 2020.2 */
  readonly column: Column;
  /** @since 2020.2 */
  readonly operator: string;
  /** @since 2020.2 */
  readonly values: string[]|number[]|boolean[]|Date[];
}

/**
 * Encapsulates joined records used in the dataset. This object is created using the dataset.createJoin(options) method.
 * For more information on using joins in SuiteAnalytics, see Joining Records Types in a Dataset.
 * @since 2020.2
 */
interface Join {
  /** @since 2020.2 */
  readonly fieldId: string;
  /** @since 2020.2 */
  readonly join: Join;
  /** @since 2020.2 */
  readonly source: string;
  /** @since 2020.2 */
  readonly target: string;
}

/**
 * Encapsulates the entire dataset, including columns, conditions, and joins. This object is created using the dataset.create(options) method.
 * @since 2020.2
 */
export interface Dataset {
  /**
   * Returns an expression which can be used in workbook.
   * The Help Center documentation shows alias is optional and columnId is required.
   * Testing on version 2021.2 indicates that alias is required and columnId is optional.
   * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.columnId and options.alias are specified
   * @throws {SuiteScriptError} NEITHER_ARGUMENT_DEFINED if neither options.columnId nor options.alias is specified
   * @governance none
   * @since 2020.2
   */
  getExpressionFromColumn(options: { alias: string, columnId?: number }): Expression;
  /**
   * Executes the dataset and returns the result set (the same as in N/query Module).
   * @governance 10 units
   * @since 2020.2
   */
  run(): ResultSet;
  /**
   * Executes the dataset and returns the result set as paginated data (the same as in N/query Module).
   * The maximum number of results per page is 1000. The minimum number of results per page is 5, except for the last page, which may include fewer than 5 results.
   * @governance 10 units
   * @since 2020.2
   */
  runPaged(options?: { pageSize: number }): PagedData;
  /**
   * @throws {SuiteScriptError} INVALID_ID_PREFIX if the value of the options.id parameter does not start with custdataset
   * @governance 10 units
   * @since 2020.2
   */
  save(options: SaveOptions): SaveResult;
  /** @since 2020.2 */
  columns: Column[];
  /** @since 2020.2 */
  condition: Condition;
  /** @since 2020.2 */
  description: string;
  /** @since 2020.2 */
  id: string;
  /** @since 2020.2 */
  name: string;
  /** @since 2020.2 */
  type: string;
}

type DatasetId = `custdataset${string}`; // This type is a template literal type where the Dataset ID must begin with the fixed prefix "custdataset"

interface SaveOptions {
  name: string;
  description?: string;
  id?: DatasetId;
}

interface SaveResult {
    id: string;
}

interface CreateOptions {
  columns?: Column[];
  condition?: Condition;
  description?: string;
  id?: string;
  name?: string;
  /** The internal ID for the record type on which to build the dataset. */
  type: string;
}

interface CreateColumnOptions {
  /** The alias for the column. This can be used to get the expression for the column which can be used in a workbook. Use Dataset.getExpressionFromColumn(options) to get the expression. */
  alias?: string;
  /** The field ID for the column (exclusive with formula/type). Required only if options.formula and options.type are not specified. */
  fieldId?: string;
  /** The formula for the column, such as ‘{email}’ or ‘{total} — {tax}’. Required only if options.fieldId is not specified. */
  formula?: string;
  join?: Join;
  id?: number;
  label?: string;
  /** The return type of the formula, such as ‘INTEGER’ or ‘STRING’. Required only if options.fieldId is not specified. */
  type?: string;
}

interface CreateConditionOptions {
  children?: Condition[];
  /** Required, unless options.children is specified. */
  column?: Column;
  /** Uses the query.Operator enumeration, otherwise can be 'AND' or 'OR' when you are combining condition children. */
  operator: string;
  /** The values attribute is required unless the operator is 'AND' or 'OR', as it is when you are combining condition children. */
  values?: string[]|number[]|boolean[]|Date[]|{ dateId: string, type: string }[]|RelativeDate[]; // For example, for after Start of Last Fiscal Year, use: { dateId: "SOLFY", type: "end" }
}

interface CreateJoinOptions {
  fieldId: string;
  join?: Join;
  source?: string;
  target?: string;
}

/**
 * @throws {SuiteScriptError} INVALID_SEARCH_TYPE if the options.type parameter is invalid
 * @governance none
 * @since 2020.2
 */
export function create(options: CreateOptions): Dataset;
/**
 * @throws {SuiteScriptError} INVALID_FORMULA_TYPE if the options.type parameter is invalid
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.formula and options.fieldId are specified, or both options.formula and options.join are specified
 * @governance none
 * @since 2020.2
 */
export function createColumn(options: CreateColumnOptions): Column;
/**
 * @throws {SuiteScriptError} INVALID_OPERATOR if the options.operator parameter is invalid
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.column and options.children are specified
 * @governance none
 * @since 2020.2
 */
export function createCondition(options: CreateConditionOptions): Condition;
/**
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.source and options.target are specified
 * @governance none
 * @since 2020.2
 */
export function createJoin(options: CreateJoinOptions): Join;
/**
 * @governance 10 units
 * @since 2020.2
 */
export function list(): { id: string, name: string, record: string, description?: string }[];
/**
 * @governance 10 units
 * @since 2020.2
 */
export function load(options: { id: string }): Dataset;

/**
 * Creates a translation expression based on a Translation Collection.
 * @governance none
 * @since 2021.2
 */
export function createTranslation(options: {
  /** The Translation Collection to use. */
  collection: string;
  /** The translation term to use. */
  key: string;
}): Expression;

/**
 * Retrieves information about a dataset, including name, description, and a list of columns and formulas with their labels and types.
 * @governance 10 units
 * @since 2021.2
 */
export function describe(options: { id: string }): object[];
export namespace describe {
  /**
   * Asynchronously retrieves information about a dataset. Parameters and errors are the same as dataset.describe(options).
   * @governance 10 units
   * @since 2021.2
   */
  function promise(options: { id: string }): Promise<object[]>;
}

/**
 * Retrieves metadata about datasets as a set of paged results.
 * @throws {SuiteScriptError} INVALID_OWNER_CATEGORY if the value of the category parameter is not included in the OwnerCategory enum
 * @governance 10 units
 * @since 2021.2
 */
export function listPaged(options: {
  /** The page size. */
  pageSize: number;
  /** The category of datasets or workbooks to get a paginated listing for. */
  category?: string;
}): object;

export namespace load {
  /**
   * Asynchronously loads an existing dataset. Parameters and errors are the same as dataset.load(options).
   * @governance 10 units
   * @since 2020.2
   */
  function promise(options: { id: string }): Promise<Dataset>;
}
