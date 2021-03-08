/** Load the N/workbook module when you want to create a new workbook, load an existing workbook, or list all existing workbooks. */

import { Dataset } from "./dataset";
import {SortLocale} from "N/query";

interface Aspect {
  measure: Measure;
  type: AspectType;
}

interface Category {
  axis: ChartAxis;
  /** The root data (i.e., fields) that defines the category. */
  root: DataDimension|Section;
  sortDefinitions: SortDefinition[];
}

/** A chart axis. A chart axis is used when you create a category or a legend. You can create a chart axis using workbook.createChartAxis(options). */
interface ChartAxis {
  title: string;
}

/**
 * A chart definition.
 * A chart is a workbook component that enables you to visualize your dataset query results using predefined chart and graph types, such as line graphs and bar charts.
 * A chart definition is used when you create a workbook.
 * You can create a chart definition using workbook.createChartDefinition(options).
 */
interface ChartDefinition {
  /** The limiting and conditional filters of the chart definition. */
  aggregationFilters: (LimitingFilter|ConditionalFilter)[];
  /** The category of the chart definition. */
  category: string;
  /** The underlying dataset for the chart definition. */
  dataset: Dataset;
  /** The filter expressions for the chart definition. */
  filterExpression: Expression[];
  /** The ID of chart definition. */
  id: string;
  /** The legend of the chart definition. */
  legend: Legend;
  /** The name of the chart definition. */
  name: string;
  /** The series of the chart definition. */
  series: Series;
  /** The stacking type for the chart definition. */
  stacking: Stacking;
  /** The subtitle of the chart definition. */
  subtitle: string;
  /** The title of chart definition. */
  title: string;
  /** The chart type of the chart definition. */
  chartType: ChartType;
}

/**
 * A conditional filter.
 * A conditional filter can be used when you create a pivot definition or a chart definition.
 * You can create a conditional filter using workbook.createConditionalFilter(options).
 */
interface ConditionalFilter {
  /** The selected filters in the condition filter. */
  filteredNodesSelector: AllSubNodesSelector|PathSelector|DimensionSelector;
  /** The measure of the conditional filter. */
  measure: Measure;
  /** The selector for the other axis in the conditional filter. */
  otherAxisSelector: (AllSubNodesSelector|PathSelector|DimensionSelector);
  /** The actual predicate for the conditional filter, which indicates whether the condition is met. */
  predicate: Expression;
  /** The row axis indicator for the conditional filter. */
  row: boolean;
}

/**
 * A data dimension. A data dimension can be used when you create a category, a legend, a pivot axis, a dimension selector, or a section.
 * You can create a data dimension using workbook.createDataDimension(options).
 */
interface DataDimension {
  /** The children of the data dimension. */
  children: (DataDimension|Section|Measure)[];
  /** The items of the data dimension. */
  items: DataDimensionItem[];
  /**  The formatting specification for the total line of the data dimension. */
  totalLine: TotalLine;
}

/**
 * A data dimension item. A data dimension item is used when you create a data dimension or a dimension sort.
 * You can create a data dimension item using workbook.createDataDimensionItem(options).
 */
interface DataDimensionItem {
  /** The expression for data dimension item. */
   expression: Expression;
   /** The label for the data dimension item. */
   label: string;
}

/**
 * A dimension selector. A dimension selector is used when you create a path selector, a sort definition, a conditional filter, a limiting filter or a measure sort.
 * You can create a dimension selector using workbook.createDimensionSelector(options).
 */
interface DimensionSelector {
  /** The dimension of the dimension selector. */
  dimension: DataDimension|Section;
}

/**
 * A dimension sort. A dimension sort can be used when you create a sort definition or a limiting filter.
 * You can create a dimension sort using workbook.createDimensionSort(options).
 */
interface DimensionSort {
  /** The data dimension item for the dimension sort. */
  item: DataDimensionItem;
  /** The sort object for the dimension sort. */
  sort: Sort;
}

/**
 * An expression. An expression can be used when you create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, or a constant.
 * You can create an expression using workbook.createExpression(options).
 */
export interface Expression {
  /** The ID of the function used in the expression. */
  functionId: ExpressionType;
  /** The parameters for the expression. */
  parameters: Object;
}

/**
 * A field context. A field context is used when you create a table column.
 * You can create a field context using workbook.createFieldContext(options).
 */
interface FieldContext {
  /** The name of the field context (for example, DISPLAY or CONSOLIDATED) */
  name: string;
  /** The user-specified parameters of the field context, specified as key:value pairs. */
  parameters: Object;
}

/**
 * A legend. A legend can be used when you create a chart definition.
 * You can create a legend using workbook.createLegend(options).
 */
interface Legend {
  /** The axes for the legend. */
  axes: ChartAxis[];
  /** The root data (i.e., fields) that defines the legend. */
  root: DataDimension|Section;
  /** The sort definitions of the legend. */
  sortDefinitions: SortDefinition[];
}

/**
 * A limiting filter. A limiting factor can be used when you create a chart definition or a pivot definition.
 * You can create a limiting filter using workbook.createLimitingFilter(options).
 */
interface LimitingFilter {
  /** The selections for the limiting filter. */
  filteredNodesSelector: AllSubNodesSelector|PathSelector|DimensionSelector;
  /** The limit number for the limiting filter. */
  limit: number;
  /** The row axis indicator for the limiting factor.*/
  row: boolean;
  /** The ordering elements of the limiting filter.*/
  sortBys: (DimensionSort|MeasureSort)[]
}

/**
 * A measure. A measure can be used when you create an aspect, a section, a conditional filter, or a measure sort.
 * You can create a measure using workbook.createMeasure(options).
 */
interface Measure {
  /** The aggregation for the measure. */
  aggregation: Aggregation;
  /** The expression for the measure. Only used for a single expression measure. */
  expression: Expression;
  /** The expressions (multiple) for the measure. Only used for a multi expression measure. */
  // TODO fill this in
  /** The label of the measure. */
  label: string;
}

/**
 * A measure sort. A measure sort can be used when you create a limiting filter or a sort definition.
 * You can create a measure sort using workbook.createMeasureSort(options).
 */
interface MeasureSort {
  /** The sort of the measure sort. */
  measure: Measure;
  /** The other axis selector for the measure sort. */
  otherAxisSelector: AllSubNodesSelector|PathSelector|DimensionSelector;
  /** The sort for the measure sort. */
  sort: Sort;
}

/**
 * A path selector. A path selector can be used when you create a sort definition, a conditional filter, a limiting filter, or a measure sort.
 * You can create a path selector using workbook.createPathSelector(options).
 */
interface PathSelector {
  /** The elements denoting 'xpath' of the path selector. */
  elements: PathSelector|DimensionSelector;
}

/** A pivot axis. A pivot axis is used with you create a pivot definition.
 * You can create a pivot axis using workbook.createPivotAxis(options).
 */
interface PivotAxis {
  /** The root data for the pivot axis. */
  root: DataDimension|Section;
  /** The sort definitions of the pivot axis. */
  sortDefinitions: SortDefinition
}
/**
 * A section. A section can be used when you create a category, a legend, a data dimension, a dimension selector, a pivot axis, or a pivot definition.
 * You can create a section using workbook.createSection(options).
 */
interface Section {
  /** The children of the section. */
  children: DataDimension|Measure|Section[];
  /** The format for the total line on a section. */
  totalLine: TotalLine;
}

/**
 * A series in a workbook. A series is used when you create a chart definition.
 * You can create a series using workbook.createSeries(options).
 */
interface Series {
  /** The aspects for the series. */
  aspects: Aspect[];
}

/**
 * A sort. A sort is used when you create a table column, a dimension sort, or a measure sort.
 * You can create a sort using workbook.createSort(options).
 */
interface Sort {
  /** The ascending sort indicator of the sort. */
  ascending: boolean,
  /** The indicator that determines if the sort is case sensitive. */
  caseSensitive: boolean,
  /** The locale of the sort. */
  locale: Operator,
  /** The indicator for placing nulls last of the sort. */
  nullsLast: boolean;
}

/**
 * A sort definition. A sort definition can be used with you create a category, a legend, and a pivot axis.
 * You can create a sort definition using workbook.createSortDefinition(options).
 */
interface SortDefinition {
  /** The selector for the sort definition. */
  selector: AllSubNodesSelector|DimensionSelector|PathSelector;
  /** The ordering elements for the sort definition. */
  sortBys: DimensionSelector|MeasureSort[];
}

/**
 * A table column. A table column is used when you create a table definition.
 * You can create a table column using workbook.createTableColumn(options).
 */
interface TableColumn {
  /** The alias for the column. */
  alias: string;
  /** The alias of the dataset column from which the table column was created. */
  datasetColumnAlias: string;
  /** The ID of the dataset column from which the table column was created. */
  datasetColumnId: number;
  /** The field context specification for the field used in the table column. */
  fieldContext: FieldContext;
  /** The filters for the table column. */
  filters: TableFilter[];
  /** The label of table column. */
  label: string;
  /** The sort of the table column. */
  sort: Sort;
  /** The width of the table column when displayed in the UI. */
  width: number;
}

/**
 * A table definition. A table is a workbook component that enables you to view your dataset query results in a simple table.
 * You can create a table definition using workbook.createTableDefinition(options).
 */
interface TableDefinition {
  /** The columns of the table definition. */
  columns: TableColumn[];
  /** The dataset of the table definition. */
  dataset: Dataset;
  /** The ID of the table definition. */
  id: string;
  /** The name of the table definition. */
  name: string;
}

/**
 * A table filter. A table filter can be used when you create a table column.
 * You can create a table filter using workbook.createTableFilter(options).
 * */
interface TableFilter {
  /** The operator of the table filter. */
  operator: Operator;
  /** The values of the table filter. */
  values: null|Object|boolean|number|string|Date;
}

/**
 * An expression. An expression can be used when you create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, or a constant.
 * You can create an expression using workbook.createExpression(options).
 */
interface Expression {
  /** The ID of the function used in the expression. */
  functionId: ExpressionType
  /** The parameters for the expression. */
  parameters: Object;
}

/**
 * A selector that is used to select nodes to use in conditions. It can be used when creating a path selector, a sort definition, a conditional filter, a limiting filter, or a measure sort.
 * You can create an AllSubNodesSelector using workbook.createAllSubNodesSelector().
 */
interface AllSubNodesSelector {

}

interface Workbook {

}

interface PivotDefinition {

}

interface CreateOptions {
  chartDefinitions?: ChartDefinition[];
  description?: string;
  name?: string;
  pivotDefinitions?: PivotDefinition[];
  tableDefinitions?: TableDefinition[];
}

interface CreateAllSubNodesSelector {

}

interface CreateAspectOptions {
  measure: Measure;
  type?: AspectType;
}

interface CreateCategoryOptions {
  axis: ChartAxis;
  root: DataDimension|Section;
  sortDefinitions?: SortDefinition[];
}

interface CreateChartAxis {
  title: string;
}

interface CreateChartDefinition {
  aggregationFilters?: (ConditionalFilter|LimitingFilter)[];
  category: Category;
  dataset: Dataset;
  filterExpressions?: Expression;
  id: string;
  legend: Legend;
  name: string;
  series: Series;
  stacking?: Stacking;
  subTitle?: string;
  title?: string;
  type: ChartType;
}

interface CreateConditionalFilter {
  filteredNodesSelector: AllSubNodesSelector|DimensionSelector|PathSelector;
  measure: Measure;
  otherAxisSelector: AllSubNodesSelector|DimensionSelector|PathSelector;
  predicate: Expression;
  row: boolean;
}

interface CreateConstant {
  constant: string|number|boolean|Date;
  tye?: ConstantType;
}

interface CreateDataDimension {
  children?: (DataDimension|Section|Measure)[];
  items: DataDimensionItem;
  totalLine?: string;
}

interface CreateDataDimensionItem {
  expression: Expression;
  label?: string;
}

interface CreateDimensionSelector {
  dimension: DataDimension|Section;
}

interface CreateDimensionSort {
  item: DataDimensionItem;
  sort: Sort;
}

interface CreateExpression {
  functionId: ExpressionType;
  parameters?: Object;
}

interface CreateFieldContext {
  name: string;
  parameters?: Object;
}

interface CreateLegend {
  axes: ChartAxis[];
  root: Section|DataDimension;
  sortDefinitions?: SortDefinition[]
}

interface CreateLimitingFilter {
  filteredNodesSelector: AllSubNodesSelector|DimensionSelector|PathSelector;
  limit: number;
  row: boolean;
  sortBys: (DimensionSort|MeasureSort)[];
}

interface CreateMeasure {
  aggregation?: string;
  expression: Expression;
  expressions: Expression[];
  label: string;
}

interface CreateMeasureSort {
  measure: Measure;
  otherAxisSelector: AllSubNodesSelector|DimensionSelector|PathSelector;
  selector: AllSubNodesSelector|DimensionSelector|PathSelector;
  sort: Sort;
}

interface CreatePathSelector {
  elements: (AllSubNodesSelector|DimensionSelector)[];
}

interface CreatePivotAxis {
  root: DataDimension|Section;
  sortDefinitions?: SortDefinition[];
}

interface CreatePivotDefinition {
  aggregationFilters?: (ConditionalFilter|LimitingFilter)[];
  columnAxis: PivotAxis;
  dataset: Dataset;
  filterExpressions?: Expression[];
  id: string;
  name: string;
  rowAxis: PivotAxis;
}

interface CreateSection {
  children: (DataDimension|Measure|Section)[];
  totalLine?: TotalLine;
}

interface CreateSeries {
  aspects: Aspect[];
}

interface CreateSort {
  ascending?: boolean;
  caseSensitive?: boolean;
  locale?: SortLocale;
  nullsLast?: boolean;
}

interface CreateSortDefinition {
  selector: AllSubNodesSelector|DimensionSelector|PathSelector;
  sortBys: (DimensionSort|MeasureSort)[];
}

interface CreateTableColumn {
  alias?: string;
  datasetColumnAlias: string;
  datasetColumnId: number;
  fieldContext?: FieldContext;
  filters?: TableFilter;
  label?: string;
  sort: Sort;
  width?: number;
}

/**
 * Creates a new workbook. Workbooks are where you analyze the results of your dataset queries using different components, such as table views, pivot tables, and charts.
 * All workbooks are based on a dataset, and a single dataset can be used as the basis for multiple workbooks.
 * A workbook can include an ID, a name, a description, pivot definitions, chart definitions, and table definitions.
 */
export function create(options: CreateOptions): Workbook;

/**
 * Creates an aspect for a chart series. An aspect includes a measure and an aspect type.
 */
export function createAspect(options: CreateAspectOptions): Workbook;

/**
 * Creates a chart category, which includes an axis, a data root, and a sort definition. A chart category is used in a workbook.ChartDefinition.
 */
export function createCategory(options: CreateCategoryOptions): Workbook;

/**
 * Creates an X-axis or a Y-axis for the chart.
 */
export function createChartAxis(options: CreateChartAxis): Workbook;

/**
 * Creates a chart definition.
 * A chart is a workbook component that enables you to visualize your dataset query results using predefined chart and graph types, such as line graphs and bar charts.
 * A chart is built from an underlying dataset and can also include a category, a legend, series, a type, expressions, filters, stacking behavior indicators, along with an ID, a name, a title, and a subtitle.
 * For more information on charts in SuiteAnalytics, see Workbook Charts.
 */
export function createChartDefinition(options: CreateChartDefinition): Workbook;

/**
 * Creates a conditional filter, which includes a selector of what to filter, a row axis and other axis, a measure and a predicate.
 * Conditional filters can be used in pivot definitions and chart definitions.
 */
export function createConditionalFilter(options: CreateConditionalFilter): Workbook;

/**
 * Creates a constant expression.
 */
export function createConstant(options: CreateConstant): Workbook;

/**
 * Creates a data dimension, which includes items, child data items, and a total line.
 * A data dimension is used in a workbook.Category, a workbook.Legend a workbook.PivotAxis, a workbook.DimensionSelector, and a workbook.Section.
 */
export function createDataDimension(options: CreateDataDimension): Workbook;

/**
 * Creates a data dimension item, which includes an expression and a label.
 */
export function createDataDimensionItem(options: CreateDataDimensionItem): Workbook;

/**
 * Creates a dimension selector.
 */
export function createDimensionSelector(options: CreateDimensionSelector): Workbook;

/**
 * Creates a dimension sort.
 */
export function createDimensionSort(options: CreateDimensionSort): Workbook;

/**
 * Creates an expression, that includes a function ID and parameters.
 * Expressions can be used to create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, and a dimension sort.
 */
export function createExpression(options: CreateExpression): Workbook;

/**
 * Creates a field context for a table definition column.
 */
export function createFieldContext(options: CreateFieldContext): Workbook;

/**
 * Creates a chart legend.
 */
export function createLegend(options: CreateLegend): Workbook;

/**
 * Creates a limiting filter, which includes a selector of what to filter, a row axis, a limit, and a sorting order.
 * Limiting filters can be used in pivot definitions and chart definitions to limit the data shown on a pivot or chart.
 */
export function createLimitingFilter(options: CreateLimitingFilter): Workbook;

/**
 * Creates a measure, which includes an aggregation, a label, and one or more expressions.
 */
export function createMeasure(options: CreateMeasure): Workbook;

/**
 * Creates a measure sort, which defines a sort on a measure.
 */
export function createMeasureSort(options: CreateMeasureSort): Workbook;

/**
 * Creates a path selector.
 */
export function createPathSelector(options: CreatePathSelector): Workbook;

/**
 * Creates a pivot axis, which includes a data root and a sort definition.
 */
export function createPivotAxis(options: CreatePivotAxis): Workbook;

/**
 * Creates a pivot definition.
 * A pivot is a workbook component that enables you to pivot your dataset query results by defining measures and dimensions, so that you can analyze different subsets of data.
 * A pivot definition is based on an underlying dataset and can include an ID, a name, a row axis, a column axis, conditional/limiting filters, and filter expressions.
 */
export function createPivotDefinition(options: CreatePivotDefinition): Workbook;

/**
 * Creates a section, which includes children and a total line.
 */
export function createSection(options: CreateSection): Workbook;

/**
 * Creates a chart series, which is a set of aspects.
 */
export function createSeries(options: CreateSeries): Workbook;

/**
 * Creates a sort, which includes indicators for sorting in ascending order, case sensitivity, sort locale, and whether nulls should be placed last.
 */
export function createSort(options: CreateSort): Workbook;

/**
 * Creates a sort definition.
 * A sort definition is used to specify sorting for a category, legend, pivot definition, or pivot axis.
 */
export function createSortDefinition(options: CreateSortDefinition): Workbook;

/**
 * Creates a table column.
 * Table columns are used in table definitions, and include an alias, dataset column alias/ID, filters, a label, sorts, and a column width.
 */
export function createTableColumn(options: CreateTableColumn): Workbook;


declare enum Stacking {
  DISABLED,
  NORMAL,
  PERCENT
}

declare enum AspectType {
  COLOR = 'color',
  VALUE = 'value'
}

declare enum ChartType {
  AREA,
  BAR,
  COLUMN,
  LINE
}

declare enum Operator {
  AFTER                 = 'AFTER',
  AFTER_NOT	            =	'AFTER_NOT',
  ANY_OF		            = 'ANY_OF',
  ANY_OF_NOT            = 'ANY_OF_NOT',
  BEFORE                =	'BEFORE',
  BEFORE_NOT	          =	'BEFORE_NOT',
  BETWEEN		            = 'BETWEEN',
  BETWEEN_NOT	          = 'BETWEEN_NOT',
  CONTAIN		            = 'CONTAIN',
  CONTAIN_NOT           = 'CONTAIN_NOT',
  EMPTY		              = 'EMPTY',
  EMPTY_NOT		          = 'EMPTY_NOT',
  ENDWITH		            = 'ENDWITH',
  ENDWITH_NOT           = 'ENDWITH_NOT',
  EQUAL		              = 'EQUAL',
  EQUAL_NOT		          = 'EQUAL_NOT',
  EXCLUDE_ALL	          =	'MN_EXCLUDE',
  EXCLUDE_ANY	          =	'MN_EXCLUDE_ALL',
  EXCLUDE_EXACTLY	      = 'MN_EXCLUDE_EXACTLY',
  GREATER		            = 'GREATER',
  GREATER_NOT		        = 'GREATER_NOT',
  GREATER_OR_EQUAL      = 'GREATER_OR_EQUAL',
  GREATER_OR_EQUAL_NOT	= 'GREATER_OR_EQUAL_NOT',
  INCLUDE_ALL		        = 'MN_INCLUDE_ALL',
  INCLUDE_ANY		        = 'MN_INCLUDE',
  INCLUDE_EXACTLY	      = 'MN_INCLUDE_EXACTLY',
  IS		                = 'IS',
  IS_NOT		            = 'IS_NOT',
  LESS		              = 'LESS',
  LESS_NOT		          = 'LESS_NOT',
  LESS_OR_EQUAL		      = 'LESS_OR_EQUAL',
  LESS_OR_EQUAL_NOT		  = 'LESS_OR_EQUAL_NOT',
  ON	                  =	'ON',
  ON_NOT	              =	'ON_NOT',
  ON_OR_AFTER	          =	'ON_OR_AFTER',
  ON_OR_AFTER_NOT	      =	'ON_OR_AFTER_NOT',
  ON_OR_BEFORE		      = 'ON_OR_BEFORE',
  ON_OR_BEFORE_NOT	    =	'ON_OR_BEFORE_NOT',
  START_WITH	          = 'START_WITH',
  START_WITH_NOT	      =	'START_WITH_NOT',
  WITHIN	              =	'WITHIN',
  WITHIN_NOT	          =	'WITHIN_NOT'
}

declare enum Aggregation {
  COUNT,
  COUNT_DISTINCT,
  MAX,
  MEDIAN,
  MIN,
  SUM
}

declare enum ExpressionType {
  AND,
  ANY_IN_HIERARCHY,
  ANY_OF,
  BETWEEN,
  CHILD_OF,
  COMPARE,
  CONSOLIDATE,
  CURRENCY_CONVERSION,
  DATE_RANGE_SELECTOR_ID,
  DATE_SELECTOR_ID,
  DATE_TIME_PROPERTY,
  EQUALS,
  FIELD,
  HIERARCHY,
  HIERARCHY_TO_TEXT,
  IN_RANGE,
  IS_NULL,
  LAMBDA,
  NOT,
  OR,
  RECORD_DISPLAY_VALUE,
  RECORD_KEY,
  TRUNCATE_DATE_TIME
}

declare enum TotalLine {
  FIRST_LINE,
  HIDDEN,
  LAST_LINE
}

declare enum ConstantType {
  BOOLEAN,
  CURRENCY,
  DATE,
  DATE_TIME,
  DURATION,
  NUMBER,
  TEXT
}