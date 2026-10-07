/**
 * Load the N/workbook module when you want to create a new workbook, load an existing workbook, or list all existing workbooks.
 * A workbook can contain pivots, tables, charts, selectors, sections, data dimensions, sorts, conditional and limiting filters,
 * expressions, data measures, and calculated measures. Every workbook is based on a dataset (see N/dataset).
 *
 * Supported script types: Server scripts. The module doesn't work in unauthenticated client-side contexts.
 * @since 2020.2
 */

import type {Dataset} from "./dataset";
import type {PagedData, ResultSet, SortLocale} from "./query";
import type {DatasetLink} from "./datasetLink";

/** An aspect of a chart series. An aspect includes a measure and an aspect type. Use workbook.createAspect(options) to create this object. @since 2020.2 */
interface Aspect {
  /** The measure of the aspect. @since 2020.2 */
  measure: CalculatedMeasure | DataMeasure;
  /** The type of the aspect. Set this value using workbook.AspectType. @since 2020.2 */
  type: AspectType;
}

/** A calculated measure. Use workbook.createCalculatedMeasure(options) to create this object. @since 2021.2 */
interface CalculatedMeasure {
  /** The expression for the calculated measure. @since 2021.2 */
  expression: Expression;
  /** The label of the calculated measure. @since 2021.2 */
  label: string | Expression;
}

/** A chart category. A chart category is used in a workbook.Chart. Use workbook.createCategory(options) to create this object. @since 2020.2 */
interface Category {
  /** The axis of the category. @since 2020.2 */
  axis: ChartAxis;
  /** The section or data dimension (that is, the fields for the x-axis). @since 2020.2 */
  root: DataDimension | Section;
  /** The sort definitions of the category. @since 2020.2 */
  sortDefinitions: SortDefinition[];
}

/** A chart axis. A chart axis is used when you create a category or a legend. You can create a chart axis using workbook.createChartAxis(options). @since 2020.2 */
interface ChartAxis {
  /** The title of the chart axis. @since 2020.2 */
  title: string;
}

/**
 * A chart definition (called `workbook.Chart` in the documentation).
 * A chart is a workbook component that enables you to visualize your dataset query results using predefined chart and graph types, such as line graphs and bar charts.
 * You can create a chart using workbook.createChart(options).
 * @since 2020.2
 */
interface ChartDefinition {
  /** The limiting and conditional filters of the chart. @since 2020.2 */
  aggregationFilters: (LimitingFilter | ConditionalFilter)[];
  /**
   * The category of the chart.
   * Oracle's members table and property page list the type as string, but workbook.createChart(options) takes a workbook.Category.
   * @since 2020.2
   */
  category: Category;
  /** The underlying dataset for the chart. @since 2020.2 */
  dataset: Dataset;
  /** The filter expressions of the chart. @since 2020.2 */
  filterExpressions: Expression[];
  /** The ID of the chart. @since 2020.2 */
  id: string;
  /** The legend of the chart. @since 2020.2 */
  legend: Legend;
  /** The name of the chart. @since 2020.2 */
  name: string;
  /**
   * The series of the chart.
   * Oracle's property page lists the type as a single workbook.Series, but workbook.createChart(options) takes workbook.Series[] and Oracle's samples index into it.
   * @since 2020.2
   */
  series: Series[];
  /** The stacking type for the chart. Oracle's members table lists the type as string; the property page lists workbook.Stacking. @since 2020.2 */
  stacking: Stacking;
  /** The subtitle of the chart. @since 2020.2 */
  subTitle: string;
  /** The title of the chart. @since 2020.2 */
  title: string;
  /** The type of the chart. @since 2020.2 */
  type: ChartType;
  /** The dataset link of the chart. */
  datasetLink?: DatasetLink;
}

/**
 * A selector for child nodes. There is no method that creates this object; use `workbook.ChildNodesSelector` directly.
 * Oracle documents no properties for this object. The `__selectorType` property is a type-only brand that keeps it distinct from
 * other selectors during type checking; it is not present at runtime.
 * @since 2021.2
 */
interface ChildNodesSelector {
  /** Type-only brand. Not present at runtime. */
  readonly __selectorType: "ChildNodesSelector";
}

/**
 * A color, which is made up of red, green, blue, and alpha components. Use workbook.createColor(options) to create this object.
 * Object is called `Color` in documentation, used different name here to avoid naming collision with `Color` enum.
 * @since 2021.2
 */
interface ColorRGBA {
  /** The opacity, or transparency, of the color (0 to 1). @since 2021.2 */
  alpha: number;
  /** The blue portion of the color (0 to 255). @since 2021.2 */
  blue: number;
  /** The green portion of the color (0 to 255). @since 2021.2 */
  green: number;
  /** The red portion of the color (0 to 255). @since 2021.2 */
  red: number;
}

/**
 * A conditional filter.
 * A conditional filter can be used when you create a pivot definition or a chart definition.
 * You can create a conditional filter using workbook.createConditionalFilter(options).
 * @since 2020.2
 */
interface ConditionalFilter {
  /** The column selector. @since 2020.2 */
  columnSelector: DescendantOrSelfNodesSelector | PathSelector | DimensionSelector | ChildNodesSelector;
  /** The selected filters in the condition filter. @since 2020.2 */
  filteredNodesSelector: PathSelector | DimensionSelector;
  /** The measure of the conditional filter. @since 2020.2 */
  measure: CalculatedMeasure | DataMeasure;
  /** The selector for the other axis in the conditional filter. @since 2020.2 */
  otherAxisSelector: PathSelector | DimensionSelector;
  /** The actual predicate for the conditional filter, which indicates whether the condition is met. @since 2020.2 */
  predicate: Expression;
  /** The row axis indicator for the conditional filter. @since 2020.2 */
  row: boolean;
  /** The row selector. */
  rowSelector: DescendantOrSelfNodesSelector | PathSelector | DimensionSelector | ChildNodesSelector;
}

/** A conditional format. Use workbook.createConditionalFormat(options) to create this object. @since 2021.2 */
interface ConditionalFormat {
  /** The conditional formatting rules that are included in the conditional format. @since 2021.2 */
  rules: ConditionalFormatRule[];
}

/** A conditional format rule. Use workbook.createConditionalFormatRule(options) to create this object. @since 2021.2 */
interface ConditionalFormatRule {
  /** The filter that determines which rows or cells to apply the conditional format to. @since 2021.2 */
  filter: TableColumnFilter;
  /** The style to apply as the conditional format. @since 2021.2 */
  style: Style;
}

/** A currency amount and currency type. Use workbook.createCurrency(options) to create this object. @since 2021.2 */
interface Currency {
  /** The amount of the currency. @since 2021.2 */
  amount: number;
  /** The ID of the currency (for example, USD, EUR, GBP, and so on). @since 2021.2 */
  id: string;
}

/**
 * A data dimension. A data dimension can be used when you create a category, a legend, a pivot axis, a dimension selector, or a section.
 * You can create a data dimension using workbook.createDataDimension(options).
 * @since 2020.2
 */
interface DataDimension {
  /** The children of the data dimension. @since 2020.2 */
  children: (DataDimension | Section | CalculatedMeasure | DataMeasure | Measure)[];
  /** The items of the data dimension. @since 2020.2 */
  items: DataDimensionItem[];
  /** The formatting option for the total line. Set this value using workbook.TotalLine. @since 2020.2 */
  totalLine: TotalLine;
}

/**
 * A data dimension item. A data dimension item is used when you create a data dimension or a dimension sort.
 * You can create a data dimension item using workbook.createDataDimensionItem(options).
 * @since 2020.2
 */
interface DataDimensionItem {
  /** The expression for data dimension item. @since 2020.2 */
  expression: Expression;
  /** The label for the data dimension item. @since 2020.2 */
  label: string;
}

/** The value of a data dimension item. Returned as part of a pivot intersection. @since 2021.2 */
interface DataDimensionItemValue {
  /** The data dimension item. Oracle's property page lists the type as workbook.DataDimension; the members table lists workbook.DataDimensionItem. @since 2021.2 */
  item: DataDimensionItem;
  /** The value of the data dimension item. @since 2021.2 */
  value: string | number | boolean | Record | Currency | Range | Duration;
}

/** The value of a data dimension. Returned as part of a pivot intersection. @since 2021.2 */
interface DataDimensionValue {
  /** The data dimension. @since 2021.2 */
  dataDimension: DataDimension;
  /** The item values for the data dimension. @since 2021.2 */
  itemValues: DataDimensionItemValue[];
}

/** A data measure. Use workbook.createDataMeasure(options) to create this object. @since 2021.2 */
interface DataMeasure {
  /** The aggregation of the data measure. @since 2021.2 */
  aggregation: string | Aggregation;
  /** The expression for the data measure. This property is used if the data measure is a single-expression measure. @since 2021.2 */
  expression: Expression;
  /** The expressions for the data measure. This property is used if the data measure is a multiple-expression measure. @since 2021.2 */
  expressions: Expression[];
  /** The label of the data measure. @since 2021.2 */
  label: string | Expression;
}

/**
 * A selector for descendant or self nodes. There is no method that creates this object; use `workbook.DescendantOrSelfNodesSelector` directly.
 * It is used as a parameter in workbook.createMeasureValueSelector(options) and workbook.createSortByMeasure(options).
 * Oracle documents no properties for this object. The `__selectorType` property is a type-only brand that keeps it distinct from
 * other selectors during type checking; it is not present at runtime.
 * Called `workbook.DescendantorSelfNodesSelector` in the documentation.
 * @since 2021.2
 */
interface DescendantOrSelfNodesSelector {
  /** Type-only brand. Not present at runtime. */
  readonly __selectorType: "DescendantOrSelfNodesSelector";
}

/**
 * A dimension selector. A dimension selector is used when you create a path selector, a sort definition, a conditional filter, a limiting filter or a measure sort.
 * You can create a dimension selector using workbook.createDimensionSelector(options).
 * @since 2020.2
 */
interface DimensionSelector {
  /** The dimension of the dimension selector. @since 2020.2 */
  dimension: DataDimension | Section;
}

/**
 * A dimension sort. A dimension sort can be used when you create a sort definition or a limiting filter.
 * You can create a dimension sort using workbook.createDimensionSort(options).
 * @deprecated Oracle's N/workbook documentation no longer includes this member (its help page was removed). Use workbook.SortByDataDimensionItem instead.
 */
interface DimensionSort {
  /** The data dimension item for the dimension sort. */
  item: DataDimensionItem;
  /** The sort object for the dimension sort. */
  sort: Sort;
}

/** A duration. Use workbook.createDuration(options) to create this object. @since 2021.2 */
interface Duration {
  /** The amount of the duration. @since 2021.2 */
  amount: number;
  /** The units of the duration. @since 2021.2 */
  units: string;
}

/**
 * An expression. An expression can be used when you create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, or a constant.
 * You can create an expression using workbook.createExpression(options).
 * @since 2020.2
 */
export interface Expression {
  /** The ID of the function used in the expression. @since 2020.2 */
  functionId: ExpressionType;
  /** The parameters for the expression. The supported parameter names depend on the expression type (see workbook.ExpressionType). @since 2020.2 */
  parameters: {[key: string]: unknown};
}

/**
 * A field context. A field context is used when you create a table column.
 * You can create a field context using workbook.createFieldContext(options).
 * @since 2020.2
 */
interface FieldContext {
  /** The name of the field context (for example, DISPLAY or CONSOLIDATED) @since 2020.2 */
  name: string;
  /** The user-specified parameters of the field context, specified as key:value pairs. @since 2020.2 */
  parameters: {[key: string]: unknown};
}

/**
 * A font size. Use workbook.createFontSize(options) to create this object.
 * Object is called `FontSize` in documentation, used different name here to avoid naming collision with `FontSize` enum.
 * @since 2021.2
 */
interface FontSizeObj {
  /** The numeric size of the font size. @since 2021.2 */
  size: number;
  /** The unit of the font size. @since 2021.2 */
  unit: string;
}

/**
 * A legend. A legend can be used when you create a chart definition.
 * You can create a legend using workbook.createLegend(options).
 * @since 2020.2
 */
interface Legend {
  /** The axes for the legend. @since 2020.2 */
  axes: ChartAxis[];
  /** The section or data dimension (that is, the fields for the y-axis). @since 2020.2 */
  root: DataDimension | Section;
  /** The sort definitions of the legend. @since 2020.2 */
  sortDefinitions: SortDefinition[];
}

/**
 * A limiting filter. A limiting filter can be used when you create a chart definition or a pivot definition.
 * You can create a limiting filter using workbook.createLimitingFilter(options).
 * @since 2020.2
 */
interface LimitingFilter {
  /** The selections for the limiting filter. @since 2020.2 */
  filteredNodesSelector: PathSelector | DimensionSelector;
  /** The limit number for the limiting filter. @since 2020.2 */
  limit: number;
  /** The row axis indicator for the limiting filter. @since 2020.2 */
  row: boolean;
  /** The ordering elements of the limiting filter. @since 2020.2 */
  sortBys: (SortByDataDimensionItem | SortByMeasure | DimensionSort | MeasureSort)[];
}

/**
 * A measure. A measure can be used when you create an aspect, a section, a conditional filter, or a measure sort.
 * You can create a measure using workbook.createMeasure(options).
 * @deprecated Oracle's N/workbook documentation no longer includes this member (its help page was removed). Use workbook.DataMeasure or workbook.CalculatedMeasure instead.
 */
interface Measure {
  /** The aggregation for the measure. */
  aggregation: Aggregation;
  /** The expression for the measure. Only used for a single expression measure. */
  expression: Expression;
  /** The expressions (multiple) for the measure. Only used for a multi expression measure. */
  expressions: Expression[];
  /** The label of the measure. */
  label: string;
}

/** A measure selector. Use workbook.createMeasureSelector(options) to create this object. @since 2021.2 */
interface MeasureSelector {
  /** The measures for the measure selector. @since 2021.2 */
  measures: (CalculatedMeasure | DataMeasure)[];
}

/**
 * A measure sort. A measure sort can be used when you create a limiting filter or a sort definition.
 * You can create a measure sort using workbook.createMeasureSort(options).
 * @deprecated Oracle's N/workbook documentation no longer includes this member (its help page was removed). Use workbook.SortByMeasure instead.
 */
interface MeasureSort {
  /** The measure of the measure sort. */
  measure: Measure;
  /** The other axis selector for the measure sort. */
  otherAxisSelector: PathSelector | DimensionSelector;
  /** The sort for the measure sort. */
  sort: Sort;
}

/** A measure value. Returned as part of a pivot intersection. @since 2021.2 */
interface MeasureValue {
  /** The measure to use for the measure value. Oracle's docs list the type as workbook.MeasureValue, which appears to be an error. @since 2021.2 */
  measure: CalculatedMeasure | DataMeasure;
  /** The value to use for the measure value. @since 2021.2 */
  value: string | number | boolean | Record | Currency | Range | Duration;
}

/** A measure value selector. Use workbook.createMeasureValueSelector(options) to create this object. @since 2021.2 */
interface MeasureValueSelector {
  /** The column selector. @since 2021.2 */
  columnSelector: DimensionSelector | PathSelector | DescendantOrSelfNodesSelector;
  /** The measure selectors. @since 2021.2 */
  measureSelector: MeasureSelector[];
  /** The row selector. @since 2021.2 */
  rowSelector: DimensionSelector | PathSelector | DescendantOrSelfNodesSelector;
}

/**
 * A path selector. A path selector can be used when you create a sort definition, a conditional filter, a limiting filter, or a measure sort.
 * You can create a path selector using workbook.createPathSelector(options).
 * @since 2020.2
 */
interface PathSelector {
  /** The elements denoting 'xpath' of the path selector. @since 2020.2 */
  elements: PathSelector | DimensionSelector | (PathSelector | DimensionSelector)[];
}

/**
 * A pivot axis. A pivot axis is used when you create a pivot definition.
 * You can create a pivot axis using workbook.createPivotAxis(options).
 * @since 2020.2
 */
interface PivotAxis {
  /** The root data for the pivot axis. @since 2020.2 */
  root: DataDimension | Section;
  /** The sort definitions of the pivot axis. @since 2020.2 */
  sortDefinitions: SortDefinition[];
}

/**
 * A pivot is a workbook component that enables you to pivot your dataset query results by defining measures and dimensions, so that you can analyze different subsets of data.
 * You can create a pivot using workbook.createPivot(options).
 * @since 2020.2
 */
interface Pivot {
  /** The limiting and conditional filters of the pivot definition. @since 2020.2 */
  aggregationFilters: (ConditionalFilter | LimitingFilter)[];
  /** The column axis of the pivot definition. @since 2020.2 */
  columnAxis: PivotAxis;
  /** The underlying dataset of the pivot definition. @since 2020.2 */
  dataset: Dataset;
  /** The underlying dataset link for the pivot. @since 2020.2 */
  datasetLink?: DatasetLink;
  /** The filter expressions of the pivot definition. @since 2020.2 */
  filterExpressions: Expression[];
  /** The ID of the pivot definition. @since 2020.2 */
  id: string;
  /** The name of the pivot definition. @since 2020.2 */
  name: string;
  /** The name of the portlet for the pivot. @since 2021.2 */
  portletName?: string | Expression;
  /** Report styles for the pivot. @since 2021.1 */
  reportStyles?: ReportStyle[];
  /** The row axis of the pivot definition. @since 2020.2 */
  rowAxis: PivotAxis;
}

/** A pivot intersection (a row-column intersection). Returned by Workbook.runPivot(options). @since 2021.2 */
interface PivotIntersection {
  /** The column dimension value. @since 2021.2 */
  column: DataDimensionValue | SectionValue;
  /** The measure values in the pivot intersection. @since 2021.2 */
  measureValues: MeasureValue[];
  /** The row dimension value. @since 2021.2 */
  row: DataDimensionValue | SectionValue;
}

/** A position defined by percentages of the x and y axes. Use workbook.createPositionPercent(options) to create this object. @since 2021.2 */
interface PositionPercent {
  /** The percentage of the x dimension. @since 2021.2 */
  percentX: number;
  /** The percentage of the y dimension. @since 2021.2 */
  percentY: number;
}

/** A position defined by units. Use workbook.createPositionUnits(options) to create this object. @since 2021.2 */
interface PositionUnits {
  /** The units for the position. @since 2021.2 */
  unit: string;
  /** The x value of the position. @since 2021.2 */
  x: number;
  /** The y value of the position. @since 2021.2 */
  y: number;
}

/** A position defined by horizontal and vertical position values. Use workbook.createPositionValues(options) to create this object. @since 2021.2 */
interface PositionValues {
  /** The horizontal value of the position. @since 2021.2 */
  horizontal: string;
  /** The vertical value of the position. @since 2021.2 */
  vertical: string;
}

/**
 * A date or date-time range. Use workbook.createRange(options) to create this object.
 * The dates in the range are formatted according to the user’s preferences in their account. This object can be returned from a pivot execution.
 * @since 2021.2
 */
interface Range {
  /** The end date or date-time of the range. @since 2021.2 */
  end: string;
  /** The start date or date-time of the range. @since 2021.2 */
  start: string;
}

/** A record. This object can be returned from a pivot execution. @since 2021.2 */
interface Record {
  /** The name of the record type for the record. @since 2021.2 */
  name: string;
  /** The primary key of the record. @since 2021.2 */
  primaryKey: number;
  /** The properties of the record. @since 2021.2 */
  properties: {[key: string]: unknown};
}

/** A record key. Use workbook.createSimpleRecordKey(options) or workbook.createComplexRecordKey(options) to create this object. @since 2021.2 */
interface RecordKey {
  /** The properties of the record key. @since 2021.2 */
  properties: {[key: string]: unknown};
}

/** A report style. Use workbook.createReportStyle(options) to create this object. @since 2021.2 */
interface ReportStyle {
  /** The formatting rules for the report style. @since 2021.2 */
  rules: ReportStyleRule[];
  /** The selectors for the report style. @since 2021.2 */
  selectors: MeasureValueSelector[];
}

/** A report style rule. Use workbook.createReportStyleRule(options) to create this object. @since 2021.2 */
interface ReportStyleRule {
  /** A Boolean expression indicating whether the style should be applied. @since 2021.2 */
  expression: Expression;
  /** The style to be applied. @since 2021.2 */
  style: Style;
}

/**
 * A section. A section can be used when you create a category, a legend, a data dimension, a dimension selector, a pivot axis, or a pivot definition.
 * You can create a section using workbook.createSection(options).
 * @since 2020.2
 */
interface Section {
  /** The children of the section. @since 2020.2 */
  children: (DataDimension | Section | CalculatedMeasure | DataMeasure | Measure)[];
  /** The formatting option for the total line. Set this value using workbook.TotalLine. @since 2020.2 */
  totalLine: TotalLine;
}

/** A section value. Returned as part of a pivot intersection. @since 2021.2 */
interface SectionValue {
  /** The section of the section value. @since 2021.2 */
  section: Section;
}

/**
 * A series in a workbook. A series is used when you create a chart definition.
 * You can create a series using workbook.createSeries(options).
 * @since 2020.2
 */
interface Series {
  /** The aspects for the series. @since 2020.2 */
  aspects: Aspect[];
}

/**
 * A sort. A sort is used when you create a table column, a sort by data dimension item, or a sort by measure.
 * You can create a sort using workbook.createSort(options).
 * @since 2020.2
 */
interface Sort {
  /** When set to true, indicates the sort is in ascending order. @since 2020.2 */
  ascending: boolean;
  /** When set to true, indicates the sort is case sensitive. @since 2020.2 */
  caseSensitive: boolean;
  /** The locale of the sort. Oracle's members table lists the type as query.SortLocale (read-only); the property page says query.Operator, which appears to be an error. @since 2020.2 */
  readonly locale: SortLocale;
  /** When set to true, indicates that nulls are placed last in the sort. @since 2020.2 */
  nullsLast: boolean;
  /** Sort order indicator. @since 2022.2 */
  order: number;
}

/**
 * A sort definition. A sort definition can be used when you create a category, a legend, and a pivot axis.
 * You can create a sort definition using workbook.createSortDefinition(options).
 * @since 2020.2
 */
interface SortDefinition {
  /** The selector for the sort definition. @since 2020.2 */
  selector: DimensionSelector | PathSelector;
  /** The sort order for the sort definition. @since 2020.2 */
  sortBys: (SortByDataDimensionItem | SortByMeasure | DimensionSort | MeasureSort)[];
}

/** A sort based on a data dimension item. Use workbook.createSortByDataDimensionItem(options) to create this object. @since 2021.2 */
interface SortByDataDimensionItem {
  /** The data dimension item to use for the sort. @since 2021.2 */
  item: DataDimensionItem;
  /** The sort to use. @since 2021.2 */
  sort: Sort;
}

/** A sort based on a measure. Use workbook.createSortByMeasure(options) to create this object. @since 2021.2 */
interface SortByMeasure {
  /** The measure for the sort. @since 2021.2 */
  measure: CalculatedMeasure | DataMeasure;
  /** The selector for the axis that is not defined in the associated sort definition. @since 2021.2 */
  otherAxisSelector: DescendantOrSelfNodesSelector | PathSelector | DimensionSelector;
  /** The sort to use. @since 2021.2 */
  sort: Sort;
}

/** A style. Use workbook.createStyle(options) to create this object. @since 2021.2 */
interface Style {
  /** The background color of the style. @since 2021.2 */
  backgroundColor: string | Color | ColorRGBA;
  /** The background image of the style. @since 2021.2 */
  backgroundImage: string;
  /** The background position of the style. @since 2021.2 */
  backgroundPosition: PositionPercent | PositionUnits | PositionValues;
  /** The color of the style. @since 2021.2 */
  color: string | Color | ColorRGBA;
  /** The font size of the style. @since 2021.2 */
  fontSize: string | FontSize | FontSizeObj;
  /** The font style of the style. @since 2021.2 */
  fontStyle: string;
  /** The font weight of the style. @since 2021.2 */
  fontWeight: string;
  /** The text alignment of the style. @since 2021.2 */
  textAlign: string;
  /** The text decoration color of the style. @since 2021.2 */
  textDecorationColor: string | Color | ColorRGBA;
  /** The text decoration line of the style. @since 2021.2 */
  textDecorationLine: string;
  /** The text decoration style of the style. @since 2021.2 */
  textDecorationStyle: string;
}

/**
 * A table column. A table column is used when you create a table definition.
 * You can create a table column using workbook.createTableColumn(options).
 * @since 2020.2
 */
interface TableColumn {
  /** The alias for the column. @since 2020.2 */
  alias: string;
  /** The alias of the dataset column from which the table column was created. @since 2020.2 */
  datasetColumnAlias: string;
  /** The ID of the dataset column from which the table column was created. Not in Oracle's TableColumn members table, but used in the workbook.TableColumn syntax sample. Prefer datasetColumnAlias. */
  datasetColumnId: number;
  /** The field context specification for the field used in the table column. @since 2020.2 */
  fieldContext: FieldContext;
  /** The filters for the table column. @since 2020.2 */
  filters: TableColumnFilter[];
  /** The label of table column. @since 2020.2 */
  label: string;
  /** The sort of the table column. @since 2020.2 */
  sort: Sort;
  /** The width of the table column when displayed in the UI. @since 2020.2 */
  width: number;
}

/**
 * A condition for a table view column. Use workbook.createTableColumnCondition(options) to create this object.
 * @since 2021.1
 */
interface TableColumnCondition {
  /** The filters for the condition. @since 2021.1 */
  filters: TableColumnFilter[];
  /** The operator for the condition. @since 2021.1 */
  operator: string;
}

/**
 * A table definition (called `workbook.Table` in the documentation). A table is a workbook component that enables you to view your dataset query results in a simple table.
 * You can create a table definition using workbook.createTable(options).
 * @since 2021.2
 */
interface TableDefinition {
  /** The columns of the table definition. @since 2021.2 */
  columns: TableColumn[];
  /** The dataset of the table definition. @since 2021.2 */
  dataset: Dataset;
  /** The ID of the table definition. @since 2021.2 */
  id: string;
  /** The name (label) of the table definition. @since 2021.2 */
  name: string | Expression;
}

/**
 * A table column filter. A table column filter can be used when you create a table column or a conditional format rule.
 * You can create a table column filter using workbook.createTableColumnFilter(options).
 * @since 2021.2
 */
interface TableColumnFilter {
  /** The operator of the table filter. Values correspond to those in query.Operator. @since 2021.2 */
  operator: Operator;
  /** The values of the table filter. @since 2021.2 */
  values: (null | object | boolean | number | string | Date)[];
}

/**
 * A workbook.
 * Workbooks are where you analyze the results of your dataset queries using different components, such as table views and pivots.
 * All workbooks are based on a dataset, and a single dataset can be used as the basis for multiple workbooks.
 * A workbook can include tables, pivots, and charts. A workbook is created using workbook.create(options).
 * @since 2020.2
 */
export interface Workbook {
  /**
   * Runs the pivot and returns the results as a set of row-column intersections.
   * @governance 10 units for each intersection returned
   * @throws {SuiteScriptError} PIVOT_DOES_NOT_EXIST if the pivot specified by options.id is not included in the workbook.
   * @since 2021.2
   */
  runPivot(options: RunPivot): PivotIntersection[];
  /**
   * Executes the table and returns the result set (the same as in N/query Module).
   * @deprecated Not documented by Oracle; the Workbook object members are runPivot(options) and the description, id, name, pivots, and tables properties.
   */
  runTable(options: RunTable): ResultSet;
  /**
   * Executes the table and returns paginated data (the same as in N/query Module).
   * @deprecated Not documented by Oracle; the Workbook object members are runPivot(options) and the description, id, name, pivots, and tables properties.
   */
  runTablePaged(options: RunTablePaged): PagedData;
  /** The charts in the workbook. Not in Oracle's Workbook members table, but workbook.create(options) accepts options.charts and Oracle's Chart and Aspect samples read `myWorkbook.charts`. */
  charts: ChartDefinition[];
  /** The description of the workbook. This is set when you create a workbook. @since 2020.2 */
  description: string;
  /** The ID of the workbook, that is set when you create a workbook. @since 2020.2 */
  id: string;
  /** The name of the workbook. @since 2020.2 */
  name: string;
  /** The pivots in the workbook. @since 2020.2 */
  pivots: Pivot[];
  /** The tables in the workbook. @since 2020.2 */
  tables: TableDefinition[];
}

/**
 * A selector that is used to select nodes to use in conditions. It can be used when creating a path selector, a sort definition, a conditional filter, a limiting filter, or a measure sort.
 * You can create an AllSubNodesSelector using workbook.createAllSubNodesSelector().
 */
// interface AllSubNodesSelector { } // Commented out on 6 Dec 2021 - this is no longer in the Help?

interface CreateOptions {
  /** The charts to include in the workbook. */
  charts?: ChartDefinition[];
  /** The description of the workbook. */
  description?: string;
  /** The name of the workbook. */
  name?: string;
  /** The pivots to include in the workbook. */
  pivots?: Pivot[];
  /** The tables to include in the workbook. */
  tables?: TableDefinition[];
}

interface CreateAspectOptions {
  /** The measure of the chart series. */
  measure: CalculatedMeasure | DataMeasure | Measure;
  /** The aspect type of the chart series. */
  type?: AspectType;
}

interface CreateCalculatedMeasure {
  /** The expression for the calculated measure. */
  expression: Expression;
  /** The label for the calculated measure. */
  label?: string | Expression;
  /** @deprecated Not a documented parameter of workbook.createCalculatedMeasure(options). */
  name?: string;
  /** @deprecated Not a documented parameter of workbook.createCalculatedMeasure(options). */
  pivotDefinitions?: Pivot[];
  /** @deprecated Not a documented parameter of workbook.createCalculatedMeasure(options). */
  tableDefinitions?: TableDefinition[];
}

interface CreateCategoryOptions {
  /** The chart category axis definition. */
  axis: ChartAxis;
  /** The data that feeds the chart category. */
  root: DataDimension | Section;
  /** The sorting for the chart category. */
  sortDefinitions?: SortDefinition[];
}

interface CreateChartAxis {
  /** The title of the chart axis. */
  title: string;
}

interface CreateChartDefinition {
  /** The set of conditional filters or limiting filters that are applied to the chart. When multiple filters are defined, they are aggregated together to form a single compounded filter. */
  aggregationFilters?: (ConditionalFilter | LimitingFilter)[];
  /** The category of the chart. */
  category: Category;
  /**
   * The underlying dataset that the chart is based on. A chart can include only the data (fields) that are included in the dataset. Specify this or datasetLink.
   * Oracle's parameter table marks dataset, datasetLink, and portletName as required, but its samples omit datasetLink and portletName, so all three are optional here.
   */
  dataset?: Dataset;
  /** The simple, non-aggregated value-based filters for the chart. */
  filterExpressions?: Expression[];
  /** The ID of the chart. */
  id: string;
  /** The legend for the chart. */
  legend: Legend;
  /** The name of the chart. */
  name: string;
  /** The name of the portlet for the chart. */
  portletName?: string | Expression;
  /** The set of series for the chart. Each series includes information about how each data point is calculated. */
  series: Series[];
  /** The stacking type that describes how the chart data is stacked. */
  stacking?: Stacking;
  /** The subtitle of the chart. */
  subTitle?: string | Expression;
  /** The title of the chart. */
  title?: string | Expression;
  /** The type of the chart. */
  type: ChartType;
  /** The dataset link on which the chart is based. Specify this or dataset. */
  datasetLink?: DatasetLink;
}

interface CreateColor {
  /** The alpha portion (opacity or transparency) of the color. Must be between 0 and 1. */
  alpha?: number;
  /** The blue portion of the color. Must be between 0 and 255. */
  blue?: number;
  /** The green portion of the color. Must be between 0 and 255. */
  green?: number;
  /** The red portion of the color. Must be between 0 and 255. */
  red?: number;
}

interface CreateConditionalFilter {
  /** The selector for the conditional filter. */
  filteredNodesSelector: DimensionSelector | PathSelector;
  /** The measure for the conditional filter. */
  measure: CalculatedMeasure | DataMeasure | Measure;
  /** The other axis selector for the conditional filter. */
  otherAxisSelector: DimensionSelector | PathSelector;
  /** The predicate for the conditional filter. */
  predicate: Expression;
  /** Indicator for a row axis filter. If set to false, the filter is on a column axis. */
  row: boolean;
}

interface CreateConditionalFormat {
  /** The style rules to use for this conditional format. */
  rules: ConditionalFormatRule[];
}

interface CreateConditionalFormatRule {
  /** A filter indicating when the conditional format rule should be applied. */
  filter: TableColumnFilter;
  /** The style to use for the conditional format rule. */
  style: Style;
}

interface CreateConstant {
  /** The value of the constant. */
  constant: string | number | boolean | Date;
  /** The type of constant. */
  type?: ConstantType;
}

interface CreateCurrency {
  /** The amount of the currency. */
  amount: number;
  /** The ID of the currency (for example, USD, EUR, GBP, and so on). */
  id: string;
}

interface CreateDataDimension {
  /** The child data dimensions or sections of the data dimension. */
  children?: (DataDimension | Section | CalculatedMeasure | DataMeasure | Measure)[];
  /** The items of the data dimension. */
  items: DataDimensionItem[];
  /** The predefined format for the total line. */
  totalLine?: TotalLine | string;
}

interface CreateDataDimensionItem {
  /** The expression for the data dimension item. */
  expression: Expression;
  /** The label for the data dimension item. */
  label?: string;
}

interface CreateDataMeasure {
  /** The type of aggregation to use for the data measure. */
  aggregation: string | Aggregation;
  /** The expression for the data measure (required for single-expression measures; mutually exclusive with expressions). */
  expression?: Expression;
  /** The expressions for the data measure (required for multi-expression measures; mutually exclusive with expression). */
  expressions?: Expression[];
  /** The label for the data measure. */
  label?: string | Expression;
}

interface CreateDimensionSelector {
  /** The dimension of the selector (the dimension to be selected). */
  dimension: DataDimension | Section;
}

interface CreateDimensionSort {
  item: DataDimensionItem;
  sort: Sort;
}

interface CreateDuration {
  /** Start date or date time. Use the workbook.TemporalUnit enum to set the value. */
  start: TemporalUnit | string;
  /** End date or date time. Use the workbook.TemporalUnit enum to set the value. */
  end: TemporalUnit | string;
}

interface CreateExpression {
  /** The function for the expression. */
  functionId: ExpressionType;
  /** The parameters for the expression. Use the exact parameter names supported by the expression type (for example, operand1 and operand2 for EQUALS). */
  parameters?: {[key: string]: unknown};
}

interface CreateFieldContext {
  /** The name of the field context. */
  name: string;
  /** The parameters for the field context, as key: value pairs. */
  parameters?: {[key: string]: unknown};
}

interface CreateFontSize {
  /** The numeric value of the font size. */
  size: number;
  /** The units of the font size. Use the workbook.Unit enum to set the value. */
  unit: Unit | string;
}

interface CreateLegend {
  /** The axes for the legend. */
  axes: ChartAxis[];
  /** The data for the legend. */
  root: Section | DataDimension;
  /** The sort definition for the corresponding legend axes. */
  sortDefinitions?: SortDefinition[];
}

interface CreateLimitingFilter {
  /** The selector for the limiting filter. */
  filteredNodesSelector: DimensionSelector | PathSelector;
  /** The limit for the limiting filter. */
  limit: number;
  /** Indicator for a row axis filter. If set to false, the filter is on a column axis. */
  row: boolean;
  /** The sort order for the limiting filter. */
  sortBys: (SortByDataDimensionItem | SortByMeasure | DimensionSort | MeasureSort)[];
}

interface CreateListPaged {
  /** The page size. */
  pageSize: number;
  /** The category of workbooks to retrieve metadata for. */
  category?: string;
}

interface CreateMeasure {
  aggregation?: string | Aggregation;
  expression?: Expression;
  expressions?: Expression[];
  label: string;
}

interface CreateMeasureSelector {
  /** The measures for the measure selector. */
  measures: (CalculatedMeasure | DataMeasure)[];
}

interface CreateMeasureSort {
  measure: Measure;
  otherAxisSelector: DimensionSelector | PathSelector;
  selector: DimensionSelector | PathSelector;
  sort: Sort;
}

interface CreateMeasureValueSelector {
  /** The column to style. */
  columnSelector: DescendantOrSelfNodesSelector | DimensionSelector | PathSelector;
  /** The measures to apply conditional formatting to. */
  measureSelector: MeasureSelector;
  /** The row to style. */
  rowSelector: DescendantOrSelfNodesSelector | DimensionSelector | PathSelector;
}

interface CreatePathSelector {
  /** The elements in the path selector. Oracle documents this parameter as workbook.DimensionSelector[]; the node selectors are also accepted here. */
  elements: (DimensionSelector | DescendantOrSelfNodesSelector | ChildNodesSelector)[];
}

interface CreatePivotAxis {
  /** The data for the pivot axis. */
  root: DataDimension | Section;
  /** The sorting definition for the pivot axis. */
  sortDefinitions?: SortDefinition[];
}

interface CreatePivotDefinition {
  /** The set of conditional filters or limiting filters that are applied to the pivot. When multiple filters are defined, they are aggregated together to form a single compounded filter. */
  aggregationFilters?: (ConditionalFilter | LimitingFilter)[];
  /** The column axis (X-axis) for the pivot. */
  columnAxis: PivotAxis;
  /** The underlying dataset that the pivot is based on. A pivot can include only the data (fields) that are included in the dataset. Specify this or datasetLink. */
  dataset?: Dataset;
  /** The simple, non-aggregated value-based filters for the pivot. */
  filterExpressions?: Expression[];
  /** The ID of the pivot. */
  id: string;
  /** The name of the pivot. */
  name: string;
  /** The name of the portlet for the pivot. */
  portletName?: string | Expression;
  /** The report styles for the pivot. */
  reportStyles?: ReportStyle[];
  /** The row axis (Y-axis) for the pivot. */
  rowAxis: PivotAxis;
  /** The underlying dataset link for the pivot. Specify this or dataset. */
  datasetLink?: DatasetLink;
}

interface CreatePositionPercent {
  /** The percent of the X dimension. */
  percentX: number;
  /** The percent of the Y dimension. */
  percentY: number;
}

interface CreatePositionUnits {
  /** The units to use for x-y coordinates. Use the workbook.Unit enum to set the value. */
  unit: Unit | string;
  /** The x coordinate. */
  x: number;
  /** The y coordinate. */
  y: number;
}

interface CreatePositionValues {
  /** The horizontal position. Use the workbook.Position enum to set the value. */
  horizontal: Position | string;
  /** The vertical position. Use the workbook.Position enum to set the value. */
  vertical: Position | string;
}

interface CreateRange {
  /** Start date or date time in the range. */
  start: string;
  /** End date or date time in the range. */
  end: string;
}

interface CreateReportStyle {
  /** The report style rules to apply to the report style. */
  rules: ReportStyleRule[];
  /** Selectors indicating where to apply the report style. */
  selectors: MeasureValueSelector[];
}

interface CreateReportStyleRule {
  /** An expression indicating when the report style rule should be applied. */
  expression: Expression;
  /** The style to use for the report style rule. */
  style: Style;
}

interface CreateSection {
  /** The child data. */
  children: (DataDimension | Measure | Section | DataMeasure | CalculatedMeasure)[];
  /** Predefined format values for the total line. */
  totalLine?: TotalLine;
}

interface CreateSeries {
  /** The aspects for the series. */
  aspects: Aspect[];
}

interface CreateSort {
  /** Indicator for sorting in ascending order. If set to false, sorting is done in descending order. Defaults to true. */
  ascending?: boolean;
  /** Indicator that the sort should consider case sensitivity. */
  caseSensitive?: boolean;
  /** The option for locale specific sorting. */
  locale?: SortLocale;
  /** Indicator that the sort should place null items last. Defaults to the value of options.ascending. */
  nullsLast?: boolean;
}

interface CreateSortByDataDimensionItem {
  /** The data dimension item to sort by. */
  item: DataDimensionItem;
  /** The sort to use. */
  sort: Sort;
}

interface CreateSortByMeasure {
  /** The measure to sort by. */
  measure: CalculatedMeasure | DataMeasure | Measure;
  /** The selector for the other axis. */
  otherAxisSelector: DescendantOrSelfNodesSelector | DimensionSelector | PathSelector | (DescendantOrSelfNodesSelector | DimensionSelector | PathSelector)[];
  /** The selector for the sort. */
  selector: DescendantOrSelfNodesSelector | DimensionSelector | PathSelector | (DescendantOrSelfNodesSelector | DimensionSelector | PathSelector)[];
  /** The sort to use. */
  sort: Sort;
}

interface CreateSortDefinition {
  /** The selector for the sort definition. Oracle documents workbook.DimensionSelector | workbook.PathSelector; DescendantOrSelfNodesSelector is also accepted here. */
  selector: DimensionSelector | PathSelector | DescendantOrSelfNodesSelector;
  /** The sort order for the sort definition. */
  sortBys: (SortByDataDimensionItem | SortByMeasure | DimensionSort | MeasureSort)[];
}

interface CreateStyle {
  /** The background color. Use the workbook.Color enum or a workbook.Color object (workbook.createColor(options)). */
  backgroundColor?: Color | ColorRGBA | string;
  /** The background image. Use the workbook.Image enum to set the value. */
  backgroundImage?: Image | string;
  /** The background position. */
  backgroundPosition?: PositionPercent | PositionUnits | PositionValues;
  /** The font color. Use the workbook.Color enum or a workbook.Color object (workbook.createColor(options)). */
  color?: Color | ColorRGBA | string;
  /** The font size. Use the workbook.FontSize enum or a workbook.FontSize object (workbook.createFontSize(options)). */
  fontSize?: FontSize | FontSizeObj | string;
  /** The font style. Use the workbook.FontStyle enum to set the value. */
  fontStyle?: FontStyle | string;
  /** The font weight. Use the workbook.FontWeight enum to set the value. */
  fontWeight?: FontWeight | string;
  /** The alignment of text. Use the workbook.TextAlign enum to set the value. */
  textAlign?: TextAlign | string;
  /** The text decoration color. Use the workbook.Color enum or a workbook.Color object (workbook.createColor(options)). */
  textDecorationColor?: Color | ColorRGBA | string;
  /** The text decoration line. Use the workbook.TextDecorationLine enum to set the value. */
  textDecorationLine?: TextDecorationLine | string;
  /** The text decoration style. Use the workbook.TextDecorationStyle enum to set the value. */
  textDecorationStyle?: TextDecorationStyle | string;
}

interface CreateTableColumn {
  /** The alias for the table column. The alias can be used for mapping results. */
  alias?: string;
  /** Additional conditions for the table column. Oracle documents the type as workbook.ConditionalFilter; workbook.TableColumnCondition is also accepted here. */
  condition?: ConditionalFilter | TableColumnCondition;
  /** The conditional formatting to apply to the table column. Oracle marks this parameter as required, but its samples omit it. */
  conditionalFormats?: ConditionalFormat[];
  /** The alias of the underlying dataset column. */
  datasetColumnAlias: string;
  /** The ID of the underlying dataset column. Not in Oracle's parameter table, but used in Oracle's samples. Prefer datasetColumnAlias. */
  datasetColumnId?: number;
  /** The field context for the field used in the table column. */
  fieldContext?: FieldContext;
  /** The filters for the table column. */
  filters?: TableColumnFilter | TableColumnFilter[];
  /** The label for the table column. */
  label?: string | Expression;
  /** The sorting behavior for the table column. */
  sort?: Sort;
  /** The width of the table column in the UI, in pixels. */
  width?: number;
}

interface CreateTableColumnCondition {
  /** Filters for the condition. */
  filters?: TableColumnFilter[];
  /** Operator of the condition. */
  operator: string;
}

interface CreateTableDefinition {
  /** The columns to include in the table view. */
  columns: TableColumn[];
  /** The dataset containing the columns to include in the table view. */
  dataset: Dataset;
  /** The ID of the table view. */
  id: string;
  /** The name of the table view. */
  name: string | Expression;
}

interface CreateTableColumnFilter {
  /** The operator for the filter. Values correspond to those in query.Operator (for example, 'EMPTY' for query.Operator.EMPTY). */
  operator: string;
  /** The values for the filter, based on the table column the filter is placed on and the operator. */
  values?: (null | object | number | string | boolean | Date)[];
}

interface CreateTranslation {
  /** Key of the translation. */
  key: string;
  /** Collection of the translation. */
  collection: string;
}

interface Load {
  /** The ID of the existing workbook. */
  id: string;
}

interface RunTable {
  id: string;
}

interface RunTablePaged {
  id: string;
  pageSize?: number;
}

interface RunPivot {
  /** The ID of the pivot. */
  id: string;
}

/**
 * Creates a new workbook. Workbooks are where you analyze the results of your dataset queries using different components, such as table views and pivots.
 * All workbooks are based on a dataset, and a single dataset can be used as the basis for multiple workbooks.
 * A workbook can include an ID, a name, a description, pivots, charts, and tables.
 * @governance none
 * @since 2020.2
 */
export function create(options: CreateOptions): Workbook;

/**
 * Creates an AllSubNodesSelector, which can be used when creating a path selector, a sort definition, a conditional filter, a limiting filter, or a measure sort.
 */
// export function createAllSubNodesSelector(): AllSubNodesSelector;

/**
 * Creates an aspect for a chart series. An aspect includes a measure and an aspect type.
 * @governance none
 * @since 2020.2
 */
export function createAspect(options: CreateAspectOptions): Aspect;

/**
 * Creates a calculated measure.
 * @governance none
 * @since 2021.2
 */
export function createCalculatedMeasure(options: CreateCalculatedMeasure): CalculatedMeasure;

/**
 * Creates a chart category, which includes an axis, a data root, and a sort definition. A chart category is used in a workbook.Chart.
 * @governance none
 * @since 2020.2
 */
export function createCategory(options: CreateCategoryOptions): Category;

/**
 * Creates an X-axis or a Y-axis for the chart.
 * @governance none
 * @since 2020.2
 */
export function createChartAxis(options: CreateChartAxis): ChartAxis;

/**
 * Creates a chart.
 * A chart is a workbook component that enables you to visualize your dataset query results using predefined chart and graph types, such as line graphs and bar charts.
 * A chart is built from an underlying dataset and can also include a category, a legend, series, a type, expressions, filters, stacking behavior indicators, along with an ID, a name, a title, and a subtitle.
 * For more information on charts in SuiteAnalytics, see Workbook Charts.
 * @governance none
 * @throws {SuiteScriptError} INVALID_CHART_TYPE if options.type is invalid. Set this value using workbook.ChartType.
 * @throws {SuiteScriptError} INVALID_STACKING_TYPE if options.stacking is invalid. Set this value using workbook.Stacking.
 * @since 2020.2
 */
export function createChart(options: CreateChartDefinition): ChartDefinition;

/**
 * Creates a color.
 * @governance none
 * @throws {SuiteScriptError} INVALID_COLOR_VALUE if options.blue, options.green, or options.red is less than 0 or greater than 255.
 * @throws {SuiteScriptError} INVALID_INVALID_ALPHA_VALUE if options.alpha is less than 0 or greater than 1.
 * @since 2021.2
 */
export function createColor(options: CreateColor): ColorRGBA;

/**
 * Creates a complex RecordKey object from another object.
 * @param options Properties of the record key (for example, `{numberkey: 1, stringkey: "a"}`).
 * @governance none
 * @since 2021.2
 */
export function createComplexRecordKey(options: {[key: string]: string | number}): RecordKey;

/**
 * Creates a conditional filter, which includes a selector of what to filter, a row axis and other axis, a measure and a predicate.
 * Conditional filters can be used in pivot definitions and chart definitions.
 * @governance none
 * @since 2020.2
 */
export function createConditionalFilter(options: CreateConditionalFilter): ConditionalFilter;

/**
 * Creates a conditional format.
 * @governance none
 * @throws {SuiteScriptError} NO_RULE_DEFINED if options.rules is an empty array.
 * @since 2021.2
 */
export function createConditionalFormat(options: CreateConditionalFormat): ConditionalFormat;

/**
 * Creates a conditional format rule.
 * @governance none
 * @since 2021.2
 */
export function createConditionalFormatRule(options: CreateConditionalFormatRule): ConditionalFormatRule;

/**
 * Creates a constant expression.
 * Oracle's samples also pass the constant value directly (for example, `workbook.createConstant(workbook.createCurrency({...}))`).
 * @governance none
 * @since 2020.2
 */
export function createConstant(options: CreateConstant | Currency | string | number | boolean | Date): Expression;

/**
 * Creates a currency.
 * @governance none
 * @throws {SuiteScriptError} INVALID_CURRENCY if options.id is not valid.
 * @since 2021.2
 */
export function createCurrency(options: CreateCurrency): Currency;

/**
 * Creates a data dimension, which includes items, child data items, and a total line.
 * A data dimension is used in a workbook.Category, a workbook.Legend, a workbook.PivotAxis, a workbook.DimensionSelector, and a workbook.Section.
 * @governance none
 * @throws {SuiteScriptError} INVALID_TOTAL_LINE if options.totalLine is invalid. Set this value using workbook.TotalLine.
 * @throws {SuiteScriptError} NO_DIMENSION_ITEM_DEFINED if options.items is empty.
 * @since 2020.2
 */
export function createDataDimension(options: CreateDataDimension): DataDimension;

/**
 * Creates a data dimension item, which includes an expression and a label.
 * @governance none
 * @since 2020.2
 */
export function createDataDimensionItem(options: CreateDataDimensionItem): DataDimensionItem;

/**
 * Creates a data measure. Specify either options.expression or options.expressions, but not both.
 * @governance none
 * @throws {SuiteScriptError} AT_LEAST_ONE_EXPRESSION_IS_NEEDED if options.expression is not provided and options.expressions is an empty array.
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.expression and options.expressions are provided.
 * @since 2021.2
 */
export function createDataMeasure(options: CreateDataMeasure): DataMeasure;

/**
 * Creates a dimension selector.
 * @governance none
 * @since 2020.2
 */
export function createDimensionSelector(options: CreateDimensionSelector): DimensionSelector;

/**
 * Creates a dimension sort.
 * @deprecated Oracle's N/workbook documentation no longer includes this method (its help page was removed). Use workbook.createSortByDataDimensionItem(options) instead.
 */
export function createDimensionSort(options: CreateDimensionSort): DimensionSort;

/**
 * Creates a duration.
 * @governance none
 * @throws {SuiteScriptError} INVALID_TEMPORAL_UNIT if options.start or options.end is not a valid temporal unit value.
 * @since 2021.2
 */
export function createDuration(options: CreateDuration): Duration;

/**
 * Creates an expression, that includes a function ID and parameters.
 * Expressions can be used to create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, and a dimension sort.
 * @governance none
 * @since 2020.2
 */
export function createExpression(options: CreateExpression): Expression;

/**
 * Creates a field context for a table column.
 * @governance none
 * @since 2020.2
 */
export function createFieldContext(options: CreateFieldContext): FieldContext;

/**
 * Creates a font size defined using units.
 * @governance none
 * @throws {SuiteScriptError} INVALID_UNIT if options.unit is not included in the workbook.Unit enum.
 * @since 2021.2
 */
export function createFontSize(options: CreateFontSize): FontSizeObj;

/**
 * Creates a chart legend.
 * @governance none
 * @since 2020.2
 */
export function createLegend(options: CreateLegend): Legend;

/**
 * Creates a limiting filter, which includes a selector of what to filter, a row axis, a limit, and a sorting order.
 * Limiting filters can be used in pivot definitions and chart definitions to limit the data shown on a pivot or chart.
 * @governance none
 * @since 2020.2
 */
export function createLimitingFilter(options: CreateLimitingFilter): LimitingFilter;

/**
 * Creates a measure, which includes an aggregation, a label, and one or more expressions.
 * @deprecated Oracle's N/workbook documentation no longer includes this method (its help page was removed). Use workbook.createDataMeasure(options) or workbook.createCalculatedMeasure(options) instead.
 */
export function createMeasure(options: CreateMeasure): Measure;

/**
 * Creates a measure selector.
 * @governance none
 * @throws {SuiteScriptError} NO_MEASURE_DEFINED if options.measures is an empty array.
 * @since 2021.2
 */
export function createMeasureSelector(options: CreateMeasureSelector): MeasureSelector;

/**
 * Creates a measure sort, which defines a sort on a measure.
 * @deprecated Oracle's N/workbook documentation no longer includes this method (its help page was removed). Use workbook.createSortByMeasure(options) instead.
 */
export function createMeasureSort(options: CreateMeasureSort): MeasureSort;

/**
 * Creates a measure value selector.
 * @governance none
 * @since 2021.2
 */
export function createMeasureValueSelector(options: CreateMeasureValueSelector): MeasureValueSelector;

/**
 * Creates a path selector.
 * @governance none
 * @since 2020.2
 */
export function createPathSelector(options: CreatePathSelector): PathSelector;

/**
 * Creates a pivot axis, which includes a data root and a sort definition.
 * @governance none
 * @since 2020.2
 */
export function createPivotAxis(options: CreatePivotAxis): PivotAxis;

/**
 * Creates a pivot definition.
 * A pivot is a workbook component that enables you to pivot your dataset query results by defining measures and dimensions, so that you can analyze different subsets of data.
 * A pivot definition is based on an underlying dataset and can include an ID, a name, a row axis, a column axis, conditional/limiting filters, filter expressions, and report styles.
 * @governance none
 * @since 2020.2
 */
export function createPivot(options: CreatePivotDefinition): Pivot;

/**
 * Creates a percent-defined background position.
 * @governance none
 * @since 2021.2
 */
export function createPositionPercent(options: CreatePositionPercent): PositionPercent;

/**
 * Creates a background position defined using x-y coordinates and units.
 * @governance none
 * @throws {SuiteScriptError} INVALID_POSITION if the resulting position is not included in the workbook.Position enum.
 * @throws {SuiteScriptError} INVALID_UNIT if options.unit is not included in the workbook.Unit enum.
 * @since 2021.2
 */
export function createPositionUnits(options: CreatePositionUnits): PositionUnits;

/**
 * Creates a background position defined using position values.
 * @governance none
 * @throws {SuiteScriptError} INVALID_POSITION if options.horizontal or options.vertical is not included in the workbook.Position enum.
 * @since 2021.2
 */
export function createPositionValues(options: CreatePositionValues): PositionValues;

/**
 * Creates a date or date-time range.
 * @governance none
 * @since 2021.2
 */
export function createRange(options: CreateRange): Range;

/**
 * Creates a report style.
 * @governance none
 * @throws {SuiteScriptError} NO_RULE_DEFINED if options.rules is an empty array.
 * @throws {SuiteScriptError} NO_SELECTORS_DEFINED if options.selectors is an empty array.
 * @since 2021.2
 */
export function createReportStyle(options: CreateReportStyle): ReportStyle;

/**
 * Creates a report style formatting rule.
 * @governance none
 * @since 2021.2
 */
export function createReportStyleRule(options: CreateReportStyleRule): ReportStyleRule;

/**
 * Creates a section, which includes children and a total line.
 * @governance none
 * @throws {SuiteScriptError} INVALID_TOTAL_LINE if options.totalLine is invalid. Set this value using workbook.TotalLine.
 * @since 2020.2
 */
export function createSection(options: CreateSection): Section;

/**
 * Creates a chart series, which is a set of aspects.
 * @governance none
 * @since 2020.2
 */
export function createSeries(options: CreateSeries): Series;

/**
 * Creates a record key.
 * @governance none
 * @since 2021.2
 */
export function createSimpleRecordKey(options: { key: string | number }): RecordKey;

/**
 * Creates a sort, which includes indicators for sorting in ascending order, case sensitivity, sort locale, and whether nulls should be placed last.
 * @governance none
 * @throws {SuiteScriptError} INVALID_SORT_LOCALE if options.locale is invalid. Set this value using query.SortLocale.
 * @since 2020.2
 */
export function createSort(options: CreateSort): Sort;

/**
 * Creates a sort based on data dimension items.
 * @governance none
 * @since 2021.2
 */
export function createSortByDataDimensionItem(options: CreateSortByDataDimensionItem): SortByDataDimensionItem;

/**
 * Creates a sort based on a measure.
 * @governance none
 * @since 2021.2
 */
export function createSortByMeasure(options: CreateSortByMeasure): SortByMeasure;

/**
 * Creates a sort definition.
 * A sort definition is used to specify sorting for a category, legend, pivot definition, or pivot axis.
 * @governance none
 * @throws {SuiteScriptError} NO_SORT_BY_DEFINED if options.sortBys is empty.
 * @since 2020.2
 */
export function createSortDefinition(options: CreateSortDefinition): SortDefinition;

/**
 * Creates a style to be used for conditional formatting.
 * @governance none
 * @throws {SuiteScriptError} INVALID_COLOR if options.backgroundColor, options.color, or options.textDecorationColor is not included in the workbook.Color enum and is not a workbook.Color object.
 * @throws {SuiteScriptError} INVALID_FONT_SIZE if options.fontSize is not included in the workbook.FontSize enum.
 * @throws {SuiteScriptError} INVALID_FONT_STYLE if options.fontStyle is not included in the workbook.FontStyle enum.
 * @throws {SuiteScriptError} INVALID_FONT_WEIGHT if options.fontWeight is not included in the workbook.FontWeight enum.
 * @throws {SuiteScriptError} INVALID_IMAGE if options.backgroundImage is not included in the workbook.Image enum.
 * @throws {SuiteScriptError} INVALID_TEXT_ALIGN if options.textAlign is not included in the workbook.TextAlign enum.
 * @throws {SuiteScriptError} INVALID_TEXT_DECORATION_LINE if options.textDecorationLine is not included in the workbook.TextDecorationLine enum.
 * @throws {SuiteScriptError} INVALID_TEXT_DECORATION_STYLE if options.textDecorationStyle is not included in the workbook.TextDecorationStyle enum.
 * @since 2021.2
 */
export function createStyle(options: CreateStyle): Style;

/**
 * Creates a table column.
 * Table columns are used in table definitions, and include an alias, dataset column alias, conditions, conditional formats, a label, sorts, and a column width.
 * @governance none
 * @since 2020.2
 */
export function createTableColumn(options: CreateTableColumn): TableColumn;

/**
 * Creates a table column condition.
 * Oracle's method page lists the return type as workbook.TableColumnFilter; the members table lists workbook.TableColumnCondition.
 * @governance none
 * @throws {SuiteScriptError} INVALID_OPERATOR if options.operator is invalid.
 * @since 2021.1
 */
export function createTableColumnCondition(options: CreateTableColumnCondition): TableColumnCondition;

/**
 * Creates a table view.
 * A table is a workbook component that enables you to view your dataset query results in a simple table.
 * A table is based on an underlying dataset and can include an ID, a name, a dataset, and table columns.
 * @governance none
 * @since 2020.2
 */
export function createTable(options: CreateTableDefinition): TableDefinition;

/**
 * Creates a table column filter, which includes an operator and values.
 * @governance none
 * @since 2020.2
 */
export function createTableColumnFilter(options: CreateTableColumnFilter): TableColumnFilter;

/**
 * Creates a translation (a translation expression).
 * @governance none
 * @since 2021.2
 */
export function createTranslation(options: CreateTranslation): Expression;

/**
 * Lists all existing workbooks.
 * @governance 10 units
 * @since 2020.2
 */
export function list(): object[];

/**
 * Retrieves a set of pages with metadata about workbooks.
 * Oracle documents the return type as PagedInfoData but does not document its shape.
 * @governance 10 units
 * @throws {SuiteScriptError} INVALID_OWNER_CATEGORY if options.category is not included in the workbook.OwnerCategory enum (that enum is not otherwise documented).
 * @since 2021.2
 */
export function listPaged(options: CreateListPaged): unknown;

/**
 * Loads an existing workbook. After you load a workbook, you can execute a pivot and view the results.
 * Oracle's syntax samples call `workbook.load(options)`, while the members table and method page title use `workbook.loadWorkbook(options)`.
 * @governance 10 units
 * @since 2020.2
 */
export function load(options: Load): Workbook;

/**
 * Loads an existing workbook. Listed in the N/workbook members table as `workbook.loadWorkbook(options)`; Oracle's syntax sample calls `workbook.load(options)`.
 * @governance 10 units
 * @since 2020.2
 */
export function loadWorkbook(options: Load): Workbook;

/**
 * A selector for child nodes. There is no method that creates this object; use it directly in scripts.
 * @since 2021.2
 */
export const ChildNodesSelector: ChildNodesSelector;

/**
 * A selector for descendant or self nodes object.
 *
 * A selector for descendant or self nodes object is used as a parameter in the workbook.createMeasureValueSelector(options), workbook.createSortByMeasure(options), and workbook.createPathSelector(options) methods.
 * @since 2021.2
 */
export const DescendantOrSelfNodesSelector: DescendantOrSelfNodesSelector;

/** Holds string values for aggregation types. Used to set the options.aggregation parameter of workbook.createDataMeasure(options). @since 2020.2 */
declare enum Aggregation {
  COUNT,
  COUNT_DISTINCT,
  MAX,
  MEDIAN,
  MIN,
  SUM,
  AVG
}

/** Holds string values for aspect types. Used to set the options.type parameter of workbook.createAspect(options). @since 2020.2 */
declare enum AspectType {
  COLOR = 'color',
  VALUE = 'value'
}

/** Holds string values for colors. Used to set the options.backgroundColor, options.color, and options.textDecorationColor parameters of workbook.createStyle(options). @since 2021.2 */
declare enum Color {
  BLACK,
  BLUE,
  BROWN,
  GRAY,
  GREEN,
  ORANGE,
  PINK,
  PURPLE,
  RED,
  WHITE,
  YELLOW
}

/** Holds string values for chart types. Used to set the options.type parameter of workbook.createChart(options). @since 2020.2 */
declare enum ChartType {
  AREA,
  BAR,
  COLUMN,
  LINE
}

/** Holds string values for constant types. Used to set the options.type parameter of workbook.createConstant(options). @since 2020.2 */
declare enum ConstantType {
  BOOLEAN,
  CURRENCY,
  DATE,
  DATE_TIME,
  DURATION,
  NUMBER,
  TEXT,
  DECIMAL,
  INTEGER,
  RANGE,
  RECORD
}

/** Holds string values for date-time hierarchy types. @since 2020.2 */
declare enum DateTimeHierarchy {
  MONTH_BASED,
  WEEK_BASED
}

/** Holds string values for date-time property types. Used as the `property` parameter of a DATE_TIME_PROPERTY expression. @since 2020.2 */
declare enum DateTimeProperty {
  DATE,
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  MONTH,
  QUARTER,
  WEEK_OF_YEAR,
  YEAR
}

/**
 * Holds string values for expression types. Use these values for the options.functionId parameter of workbook.createExpression(options).
 * Each expression type supports a specific set of parameter names, specified using options.parameters (for example, operand1 and operand2 for EQUALS).
 * @since 2020.2
 */
declare enum ExpressionType { // Last updated October 2026, NetSuite version 2026.2
  AND,
  // ANY_IN_HIERARCHY,
  ANY_OF,
  BETWEEN,
  CHILD_OF,
  COMPARE,
  CONSTANT,
  // CONSOLIDATE,
  CURRENCY_CONVERSION,
  DATE_RANGE_SELECTOR_ID,
  DATE_SELECTOR_ID,
  DATE_TIME_PROPERTY,
  DIVIDE,
  EQUALS,
  FIELD,
  HIERARCHY,
  HIERARCHY_TO_TEXT,
  IN_RANGE,
  IS_NULL,
  LAMBDA,
  MEASURE_VALUE,
  MINUS,
  MULTIPLY,
  NOT,
  OR,
  RECORD_DISPLAY_VALUE,
  RECORD_KEY,
  SIMPLE_CONSOLIDATE,
  TRANSLATE,
  TRUNCATE_DATE_TIME,
  DATASET_COLUMN,
  IF,
  PLUS
}

/** Holds string values for font sizes. Used to set the options.fontSize parameter of workbook.createStyle(options). @since 2021.2 */
declare enum FontSize {
  LARGE,
  LARGER,
  MEDIUM,
  SMALL,
  SMALLER,
  XX_LARGE,
  XX_SMALL,
  X_LARGE,
  X_SMALL
}

/** Holds string values for font styles. Used to set the options.fontStyle parameter of workbook.createStyle(options). @since 2021.2 */
declare enum FontStyle {
  ITALIC,
  NORMAL,
  OBLIQUE,
}

/** Holds string values for font weights. Used to set the options.fontWeight parameter of workbook.createStyle(options). @since 2021.2 */
declare enum FontWeight {
  BOLD,
  NORMAL
}

/** Holds string values for images that you can use in workbooks. Used as a value for the options.backgroundImage parameter of workbook.createStyle(options). @since 2021.2 */
declare enum Image {
  EXCLAMATION,
  QUESTION,
  SMILE
}

/** Holds string values for positions. Used to set the options.horizontal and options.vertical parameters of workbook.createPositionValues(options). @since 2021.2 */
declare enum Position {
  BOTTOM,
  CENTER,
  LEFT,
  RIGHT,
  TOP
}

/** Holds stacking types. Used to set the options.stacking parameter of workbook.createChart(options). @since 2020.2 */
declare enum Stacking {
  DISABLED,
  NORMAL,
  PERCENT
}

/** Holds string values for temporal units, such as hours or minutes. Used to set the options.start and options.end parameters of workbook.createDuration(options). @since 2021.2 */
declare enum TemporalUnit {
  HOURS,
  MINUTES,
  CENTURIES,
  DAYS,
  DECADES,
  ERA,
  HALF_DAYS,
  MICROS,
  MILLENIA,
  MILLIS,
  MONTHS,
  NANOS,
  SECONDS,
  WEEKS,
  YEARS
}

/** Holds string values for text alignments. Used to set the options.textAlign parameter of workbook.createStyle(options). @since 2021.2 */
declare enum TextAlign {
  CENTER,
  JUSTIFY,
  LEFT,
  RIGHT
}

/** Holds string values for text decoration line types, such as underline and strikethrough. Used to set the options.textDecorationLine parameter of workbook.createStyle(options). @since 2021.2 */
declare enum TextDecorationLine {
  LINE_THROUGH,
  NONE,
  OVERLINE,
  UNDERLINE
}

/** Holds string values for text decoration line styles, such as solid and dashed. Used to set the options.textDecorationStyle parameter of workbook.createStyle(options). @since 2021.2 */
declare enum TextDecorationStyle {
  DASHED,
  DOTTED,
  DOUBLE,
  SOLID,
  WAVY
}

/** Holds formatting presets for the total line. Used to set the options.totalLine parameter of workbook.createDataDimension(options) and workbook.createSection(options). @since 2020.2 */
declare enum TotalLine {
  FIRST_LINE,
  HIDDEN,
  LAST_LINE
}

/** Holds string values for units of measurement. Used to set the options.unit parameter of workbook.createPositionUnits(options) and workbook.createFontSize(options). @since 2020.2 */
declare enum Unit {
  CH,
  CM,
  EM,
  EX,
  IN,
  MM,
  PC,
  PT,
  PX,
  REM,
  VH,
  VMAX,
  VMIN,
  VW
}

/**
 * Table column filter operators. Not a documented workbook enum; mirrors query.Operator, whose values Oracle documents exactly as below
 * (including EXCLUDE_ALL = 'MN_EXCLUDE' and EXCLUDE_ANY = 'MN_EXCLUDE_ALL').
 */
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
