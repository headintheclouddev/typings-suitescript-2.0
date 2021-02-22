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

interface LimitingFilter {
  
}

interface Measure {

}

interface Section {

}

interface SortDefinition {

}

interface Legend {

}

interface Series {

}

interface Sort {
  ascending: boolean,
  caseSensitive: boolean,
  locale: ,
  nullsLast:
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
  AFTER       = 'AFTER', /** Date/time values */
  AFTER_NOT	  =	'AFTER_NOT', /** Date/time values */
  ANY_OF		  = 'ANY_OF',	/** Single-select fields or Multi-select fields" */
  ANY_OF_NOT  = 'ANY_OF_NOT', /**	Single-select fields or Multi-select fields */
  BEFORE      =	'BEFORE', /** Date/time values */
  BEFORE_NOT	=	'BEFORE_NOT', /** Date/time values */
  BETWEEN		  = 'BETWEEN',	/** Date/time values */
  BETWEEN_NOT	= 'BETWEEN_NOT',	/** Date/time values */
  CONTAIN		  = 'CONTAIN',	/** String */
  CONTAIN_NOT = 'CONTAIN_NOT',	/** String */
  EMPTY		    = 'EMPTY', /**	Single-select fields or Multi-select fields */
  EMPTY_NOT		= 'EMPTY_NOT',	/**	Single-select fields or Multi-select fields */
  ENDWITH		  = 'ENDWITH',	/** String */
  ENDWITH_NOT = 'ENDWITH_NOT', /** String */
EQUAL		EQUAL	Numbers
EQUAL_NOT		EQUAL_NOT	Numbers
EXCLUDE_ALL		MN_EXCLUDE	Multi-select fields
EXCLUDE_ANY		MN_EXCLUDE_ALL	Multi-select fields
EXCLUDE_EXACTLY		MN_EXCLUDE_EXACTLY	Multi-select fields
GREATER		GREATER	Numbers
GREATER_NOT		GREATER_NOT	Numbers
GREATER_OR_EQUAL		GREATER_OR_EQUAL	Numbers
GREATER_OR_EQUAL_NOT		GREATER_OR_EQUAL_NOT	Numbers
INCLUDE_ALL		MN_INCLUDE_ALL	Multi-select fields
INCLUDE_ANY		MN_INCLUDE	Multi-select fields
INCLUDE_EXACTLY		MN_INCLUDE_EXACTLY	Multi-select fields
IS		IS	Boolean values
IS_NOT		IS_NOT	Boolean values
LESS		LESS	Numbers
LESS_NOT		LESS_NOT	Numbers
LESS_OR_EQUAL		LESS_OR_EQUAL	Numbers
LESS_OR_EQUAL_NOT		LESS_OR_EQUAL_NOT	Numbers
ON		ON	Date/time values
ON_NOT		ON_NOT	Date/time values
ON_OR_AFTER		ON_OR_AFTER	Date/time values
ON_OR_AFTER_NOT		ON_OR_AFTER_NOT	Date/time values
ON_OR_BEFORE		ON_OR_BEFORE	Date/time values
ON_OR_BEFORE_NOT		ON_OR_BEFORE_NOT	Date/time values
START_WITH		START_WITH	Strings
START_WITH_NOT		START_WITH_NOT	Strings
WITHIN		WITHIN	Date/time values
WITHIN_NOT		WITHIN_NOT	Date/time values
}
