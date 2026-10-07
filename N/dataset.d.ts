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

import type {PagedData, Period, RelativeDate, ResultSet} from "./query";
import type {Expression} from "./workbook";

/**
 * Encapsulates the record fields in the dataset. Columns are equivalent to the fields you use when you build a dataset in SuiteAnalytics.
 * Use dataset.createColumn(options) to create this object.
 * @since 2020.2
 */
interface Column {
  /**
   * The alias of the column.
   * @since 2020.2
   */
  readonly alias: string;
  /**
   * The ID of the record field associated with the column.
   * @since 2020.2
   */
  readonly fieldId: string;
  /**
   * The formula of the column.
   * @since 2020.2
   */
  readonly formula: string;
  /**
   * The ID of the column.
   * @since 2020.2
   */
  readonly id: number;
  /**
   * The join for the column. Used only when the column is from a joined record.
   * @since 2020.2
   */
  readonly join: Join;
  /**
   * The label of the column.
   * @since 2020.2
   */
  readonly label: string;
  /**
   * The return type of the formula.
   * @since 2020.2
   */
  readonly type: string;
}

/**
 * The conditions for the dataset. Conditions are equivalent to criteria you use when you build a dataset in SuiteAnalytics.
 * Use dataset.createCondition(options) to create this object.
 * @since 2020.2
 */
interface Condition {
  /**
   * Indicates whether the condition in a sort is case sensitive.
   * @since 2020.2
   */
  caseSensitive: boolean;
  /**
   * The children of the condition (for example, subconditions AND'd or OR'd).
   * @since 2020.2
   */
  readonly children: Condition[];
  /**
   * The column on which the condition is placed.
   * @since 2020.2
   */
  readonly column: Column;
  /**
   * The operator of the condition (a query.Operator value, or 'AND' / 'OR').
   * @since 2020.2
   */
  readonly operator: string;
  /**
   * The values for the condition.
   * @since 2020.2
   */
  readonly values: string[]|number[]|boolean[]|Date[]|object[];
}

/**
* Encapsulates joined records used in the dataset. This object is created using the dataset.createJoin(options) method.
* For more information on using joins in SuiteAnalytics, see Joining Records Types in a Dataset.
* @since 2020.2
*/
interface Join {
  /**
   * The ID of the record field on which the join is performed (for example, 'entity').
   * @since 2020.2
   */
  readonly fieldId: string;
  /**
   * The child join, if the join is a multilevel join.
   * @since 2020.2
   */
  readonly join: Join;
  /**
   * The internal ID for the source record type of the join.
   * @since 2020.2
   */
  readonly source: string;
  /**
   * The polymorphic target of the join.
   * @since 2020.2
   */
  readonly target: string;
}

/**
 * Encapsulates the entire dataset, including columns, conditions, and joins. This object is created using the dataset.create(options) method.
 * @since 2020.2
 */
export interface Dataset {
  /**
   * Returns an expression which can be used in a workbook.
   * Specify either options.alias or options.columnId, but not both.
   * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.columnId and options.alias are specified
   * @throws {SuiteScriptError} NEITHER_ARGUMENT_DEFINED if neither options.columnId nor options.alias is specified
   * @governance none
   * @since 2020.2
   */
  getExpressionFromColumn(options: GetExpressionFromColumnOptions): Expression;
  /**
   * Executes the dataset and returns the result set (the same as in N/query Module).
   * Also available as Dataset.run.promise(), which has the same errors and governance.
   * @governance 10 units
   * @since 2020.2
   */
  readonly run: DatasetRunFunction;
  /**
   * Executes the dataset and returns the result set as paginated data (the same as in N/query Module).
   * The maximum number of results per page is 1000. The minimum number of results per page is 5, except for the last page, which may include fewer than 5 results.
   * Oracle lists options.pageSize as required, but also says the default page size is 50 results per page.
   * @governance 10 units
   * @since 2020.2
   */
  runPaged(options?: { pageSize: number }): PagedData;
  /**
   * Saves the dataset. You must provide a name; if options.id is not specified, an ID is generated automatically.
   * The returned object includes only the id property.
   * @throws {SuiteScriptError} INVALID_ID_PREFIX if the value of the options.id parameter does not start with custdataset
   * @governance 10 units
   * @since 2020.2
   */
  save(options: SaveOptions): SaveResult;
  /**
   * The columns in the dataset.
   * @since 2020.2
   */
  columns: Column[];
  /**
   * The condition (criteria) for the entire dataset.
   * @since 2020.2
   */
  condition: Condition;
  /**
   * The description of the dataset.
   * @since 2020.2
   */
  description: string;
  /**
   * The ID of the dataset.
   * @since 2020.2
   */
  id: string;
  /**
   * The name of the dataset.
   * @since 2020.2
   */
  name: string;
  /**
   * The internal ID for the base record type for the dataset.
   * @since 2020.2
   */
  type: string;
}

interface DatasetRunFunction {
  (): ResultSet;
  promise(): Promise<ResultSet>;
}

type GetExpressionFromColumnOptions =
  | {
    /** The alias of the column. Required if options.columnId is not specified. */
    alias: string;
    columnId?: never;
  }
  | {
    alias?: never;
    /** The ID of the column. Required if options.alias is not specified. */
    columnId: number;
  };

type DatasetId = `custdataset${string}`; // This type is a template literal type where the Dataset ID must begin with the fixed prefix "custdataset"

interface SaveOptions {
  /** The name of the dataset. */
  name: string | Expression;
  /** The description of the dataset. */
  description?: string | Expression;
  /** The ID of the dataset. Must begin with 'custdataset'. Generated automatically if not specified. */
  id?: DatasetId;
}

interface SaveResult {
    id: string;
}

interface CreateOptions {
  /** The columns of the dataset. */
  columns?: Column[];
  /** The condition (criteria) of the dataset. */
  condition?: Condition;
  /** The description of the dataset. */
  description?: string;
  /** The script ID of the dataset. */
  id?: string;
  /** The name of the dataset. */
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
  /** The joined record on which the field is present. */
  join?: Join;
  /** The ID of the column. Can be used with Dataset.getExpressionFromColumn(options). */
  id?: number;
  /** The column label to display in the UI. */
  label?: string;
  /** The return type of the formula, such as ‘INTEGER’ or ‘STRING’. Required only if options.fieldId is not specified. */
  type?: string;
}

interface CreateConditionOptions {
  /** The child conditions to combine. Use when options.operator is 'AND' or 'OR'. */
  children?: Condition[];
  /** Required, unless options.children is specified. */
  column?: Column;
  /** Uses the query.Operator enumeration, otherwise can be 'AND' or 'OR' when you are combining condition children. */
  operator: string;
  /** The values attribute is required unless the operator is 'AND' or 'OR', as it is when you are combining condition children. */
  values?: string[]|number[]|boolean[]|Date[]|{ dateId: string, type: string }[]|RelativeDate[]|Period[]|(string|number|boolean|Date|RelativeDate|Period|{ dateId: string, type: string }|null)[]; // For example, for after Start of Last Fiscal Year, use: { dateId: "SOLFY", type: "end" }
}

interface CreateJoinOptions {
  /** The ID of the record field for the join (for example, 'entity' to join a transaction to its customer). */
  fieldId: string;
  /** The existing (parent) join used to create a multi-level join. */
  join?: Join;
  /** The internal ID of the source record type, used to create an inverse join. Mutually exclusive with options.target. */
  source?: string;
  /** The polymorphic target of the join. Mutually exclusive with options.source. */
  target?: string;
}

/**
 * Creates a dataset based on a record type. A dataset can include columns and conditions (criteria).
 * @throws {SuiteScriptError} INVALID_SEARCH_TYPE if the options.type parameter is invalid
 * @governance none
 * @since 2020.2
 */
export function create(options: CreateOptions): Dataset;
/**
 * Creates a dataset column based on a field, or on a formula and a type.
 * @throws {SuiteScriptError} INVALID_FORMULA_TYPE if the options.type parameter is invalid
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.formula and options.fieldId are specified, or both options.formula and options.join are specified
 * @governance none
 * @since 2020.2
 */
export function createColumn(options: CreateColumnOptions): Column;
/**
 * Creates a dataset condition (criteria). A condition is applied to a dataset column and includes an operator.
 * @throws {SuiteScriptError} INVALID_OPERATOR if the options.operator parameter is invalid
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.column and options.children are specified
 * @governance none
 * @since 2020.2
 */
export function createCondition(options: CreateConditionOptions): Condition;
/**
 * Creates a dataset join. Multi-level, inverse, and polymorphic joins can be created.
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.source and options.target are specified
 * @governance none
 * @since 2020.2
 */
export function createJoin(options: CreateJoinOptions): Join;
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

interface DescribeFunction {
  (options: { id: string }): object[];
  promise(options: { id: string }): Promise<object[]>;
}

/**
 * Retrieves information about a dataset, including name, description, and a list of columns and formulas with their labels and types.
 * Also available as dataset.describe.promise(options), which has the same parameters, errors, and governance.
 * @governance 10 units
 * @since 2021.2
 */
export const describe: DescribeFunction;
/**
 * Lists all existing datasets.
 * @returns An array of objects with the properties id, name, record, and an optional description.
 * @governance 10 units
 * @since 2020.2
 */
export function list(): { id: string, name: string, record: string, description?: string }[];
/**
 * Retrieves metadata about datasets as a set of paged results.
 * Oracle documents the return type only as PagedInfoData, which it does not otherwise describe.
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

interface LoadFunction {
  (options: {
    /** The ID of the dataset to load. */
    id: string
  }): Dataset;
  promise(options: {
    /** The ID of the dataset to load. */
    id: string
  }): Promise<Dataset>;
}

/**
 * Loads an existing dataset.
 * Also available as dataset.load.promise(options), which has the same parameters, errors, and governance.
 * @governance 10 units
 * @since 2020.2
 */
export const load: LoadFunction;
