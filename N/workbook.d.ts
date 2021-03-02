/** Load the N/workbook module when you want to create a new workbook, load an existing workbook, or list all existing workbooks. */
// TODO: Implement this module.  May want to wait until 2021.1, as it still looks like an early beta feature in 2020.2.

import { Dataset } from "./dataset";

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
  filteredNodesSelector: ;
  /** The measure of the conditional filter. */
  measure: Measure;
  /** The selector for the other axis in the conditional filter. */
  otherAxisSelector: (AllSubNodeSelector|PathSelector|DimensionSelector);
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
   measure:
  otherAxisSelector:
}
interface Section {

}

interface SortDefinition {

}

interface Series {

}

interface Sort {
  ascending: boolean,
  caseSensitive: boolean,
  locale: ,
  nullsLast:
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
