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

import {PagedData, RelativeDate, ResultSet} from "./query";
import {Expression} from "./workbook";

/** Encapsulates the record fields in the dataset. Columns are equivalent to the fields you use when you build a dataset in SuiteAnalytics. */
interface Column {
  readonly alias: string;
  readonly fieldId: string;
  readonly formula: string;
  readonly id: string;
  readonly join: string;
  readonly label: string;
  readonly type: string;
}

/** The conditions for the dataset. Conditions are equivalent to criteria you use when you build a dataset in SuiteAnalytics. */
interface Condition {
  readonly children: Condition[];
  readonly column: Column;
  readonly operator: string;
  readonly values: string[]|number[]|boolean[]|Date[];
}

/**
* Encapsulates joined records used in the dataset. This object is created using the dataset.createJoin(options) method.
* For more information on using joins in SuiteAnalytics, see Joining Records Types in a Dataset.
*/
interface Join {
  readonly fieldId: string;
  readonly join: Join;
  readonly source: string;
  readonly target: string;
}

/** Encapsulates the entire dataset, including columns, conditions, and joins. This object is created using the dataset.create(options) method. */
export interface Dataset {
  /**
  * Returns an expression which can be used in workbook.
  * The Help Center documentation shows alias is optional and columnId is required.
  * Testing on version 2021.2 indicates that alias is required and columnId is optional.
  */
  getExpressionFromColumn(options: { alias: string, columnId?: number }): Expression;
  /** Executes the dataset and returns the result set (the same as in N/query Module). */
  run(): ResultSet;
  /**
   * Executes the dataset and returns the result set as paginated data (the same as in N/query Module).
   * The maximum number of results per page is 1000. The minimum number of results per page is 5, except for the last page, which may include fewer than 5 results.
   */
  runPaged(options?: { pageSize: number }): PagedData;
  save(): void; // May need to test what this returns.  Documentation says an object, but what object? The dataset itself?
  columns: Column[];
  condition: Condition;
  description: string;
  id: string;
  name: string;
  type: string;
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

export function create(options: CreateOptions): Dataset;
export function createColumn(options: CreateColumnOptions): Column;
export function createCondition(options: CreateConditionOptions): Condition;
export function createJoin(options: CreateJoinOptions): Join;
export function list(): { id: string, name: string, record: string, description?: string }[];
export function load(options: { id: string }): Dataset;
