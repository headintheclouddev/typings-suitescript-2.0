/** Load the N/workbook module when you want to create a new workbook, load an existing workbook, or list all existing workbooks. */

import type {Dataset} from "./dataset";
import type {PagedData, ResultSet, SortLocale} from "./query";
import type {DatasetLink} from "./datasetLink";

interface Aspect {
  measure: Measure;
  type: AspectType;
}

interface CalculatedMeasure {
  expression: Expression;
  label: string | Expression;
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
 * @since 2020.2
 */
interface ChartDefinition {
  /** The limiting and conditional filters of the chart definition. */
  aggregationFilters: (LimitingFilter|ConditionalFilter)[];
  /**
   * The category of the chart definition.
   * @since 2020.2
   */
  category: Category;
  /** The underlying dataset for the chart definition. */
  dataset: Dataset;
  /** The filter expressions for the chart definition. */
  filterExpressions: Expression[];
  /** The ID of chart definition. */
  id: string;
  /** The legend of the chart definition. */
  legend: Legend;
  /** The name of the chart definition. */
  name: string;
  /**
   * The series of the chart definition.
   * @since 2020.2
   */
  series: Series[];
  /** The stacking type for the chart definition. */
  stacking: Stacking;
  /** The subtitle of the chart definition. */
  subTitle: string;
  /** The title of chart definition. */
  title: string;
  /** The chart type of the chart definition. */
  type: ChartType;
  /** The dataset link of the chart definition. */
  datasetLink?: DatasetLink;
}

/**
 * A color, which is made up of red, green, blue, and alpha components.
 * Object is called `Color` in documentation, used different name here to avoid naming collision with `Color` enum.
 * @since 2021.2
 */
interface ColorRGBA {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

/**
 * A conditional filter.
 * A conditional filter can be used when you create a pivot definition or a chart definition.
 * You can create a conditional filter using workbook.createConditionalFilter(options).
 * @since 2020.2
 */
interface ConditionalFilter {
  /** The selected filters in the condition filter. */
  filteredNodesSelector: PathSelector|DimensionSelector;
  /** The measure of the conditional filter. */
  measure: Measure;
  /** The selector for the other axis in the conditional filter. */
  otherAxisSelector: PathSelector|DimensionSelector;
  /** The actual predicate for the conditional filter, which indicates whether the condition is met. */
  predicate: Expression;
  /** The row axis indicator for the conditional filter. */
  row: boolean;
}

interface ConditionalFormat {
  rules: ConditionalFormatRule[];
}

interface ConditionalFormatRule {
  /** The filter that determines which rows or cells to apply the conditional format to. */
  filter: TableColumnFilter;
  style: Style;
}

interface Currency {
  amount: number;
  /** The ID of the currency (for example, USD, EUR, GBP, and so on). */
  id: string;
}

/**
 * A data dimension. A data dimension can be used when you create a category, a legend, a pivot axis, a dimension selector, or a section.
 * You can create a data dimension using workbook.createDataDimension(options).
 * @since 2020.2
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
 * @since 2020.2
 */
interface DataDimensionItem {
  /** The expression for data dimension item. */
   expression: Expression;
   /** The label for the data dimension item. */
   label: string;
}

interface DataDimensionItemValue {
  item: DataDimensionItem;
  value: string | number | boolean | Record | Currency | Range | Duration;
}

interface DataDimensionValue {
  dataDimension: DataDimension;
  itemValues: DataDimensionItemValue[];
}

interface DataMeasure {
  aggregation: string|Aggregation;
  /** This property is used if the data measure is a single-expression measure. */
  expression: Expression;
  /** This property is used if the data measure is a multiple-expression measure. */
  expressions: Expression[];
  label: string;
}

/**
 * A dimension selector. A dimension selector is used when you create a path selector, a sort definition, a conditional filter, a limiting filter or a measure sort.
 * You can create a dimension selector using workbook.createDimensionSelector(options).
 * @since 2020.2
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

interface Duration {
  amount: number;
  units: unknown;
}

/**
 * An expression. An expression can be used when you create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, or a constant.
 * You can create an expression using workbook.createExpression(options).
 * @since 2020.2
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
 * @since 2020.2
 */
interface FieldContext {
  /** The name of the field context (for example, DISPLAY or CONSOLIDATED) */
  name: string;
  /** The user-specified parameters of the field context, specified as key:value pairs. */
  parameters: Object;
}

/**
 * A font size.
 * Object is called `FontSize` in documentation, used different name here to avoid naming collision with `FontSize` enum.
 * @since 2021.2
 */
interface FontSizeObj {
  size: number;
  unit: string;
}

/**
 * A legend. A legend can be used when you create a chart definition.
 * You can create a legend using workbook.createLegend(options).
 * @since 2020.2
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
 * @since 2020.2
 */
interface LimitingFilter {
  /** The selections for the limiting filter. */
  filteredNodesSelector: PathSelector|DimensionSelector;
  /** The limit number for the limiting filter. */
  limit: number;
  /** The row axis indicator for the limiting factor.*/
  row: boolean;
  /** The ordering elements of the limiting filter.*/
  sortBys: (DimensionSort|MeasureSort)[];
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
  expressions: Expression[];
  /** The label of the measure. */
  label: string;
}

interface MeasureSelector {
  measures: CalculatedMeasure[] | DataMeasure;
}

/**
 * A measure sort. A measure sort can be used when you create a limiting filter or a sort definition.
 * You can create a measure sort using workbook.createMeasureSort(options).
 */
interface MeasureSort {
  /** The sort of the measure sort. */
  measure: Measure;
  /** The other axis selector for the measure sort. */
  otherAxisSelector: PathSelector|DimensionSelector;
  /** The sort for the measure sort. */
  sort: Sort;
}

interface MeasureValue {
  measure: Measure;
  value: string | number | boolean | Record | Currency | Range | Duration;
}

interface MeasureValueSelector {
  columnSelector: DimensionSelector | PathSelector;
  measureSelector: MeasureSelector[];
  rowSelector: DimensionSelector | PathSelector;
}

/**
 * A path selector. A path selector can be used when you create a sort definition, a conditional filter, a limiting filter, or a measure sort.
 * You can create a path selector using workbook.createPathSelector(options).
 * @since 2020.2
 */
interface PathSelector {
  /** The elements denoting 'xpath' of the path selector. */
  elements: PathSelector|DimensionSelector|(PathSelector|DimensionSelector)[];
}

/**
 * You can create a pivot axis using workbook.createPivotAxis(options).
 * @since 2020.2
 */
interface PivotAxis {
  /** The root data for the pivot axis. */
  root: DataDimension|Section;
  /** The sort definitions of the pivot axis. */
  sortDefinitions: SortDefinition|SortDefinition[];
}

/**
 * A pivot is a workbook component that enables you to pivot your dataset query results by defining measures and dimensions, so that you can analyze different subsets of data.
 * You can create a pivot using workbook.createPivot(options).
 * @since 2020.2
 */
interface Pivot {
  aggregationFilters: (ConditionalFilter|LimitingFilter)[];
  columnAxis: PivotAxis;
  dataset: Dataset;
  filterExpressions: Expression[];
  id: string;
  name: string;
  rowAxis: PivotAxis;
}

interface PivotIntersection {
  column: DataDimensionValue | SectionValue;
  measureValues: MeasureValue[];
  row: DataDimensionValue | SectionValue;
}

interface PositionPercent {
  percentX: number;
  percentY: number;
}

interface PositionUnits {
  unit: string;
  x: number;
  y: number;
}

interface PositionValues {
  horizontal: string;
  vertical: string;
}

/**
 * A date or date-time range.
 * The dates in the range are formatted according to the user’s preferences in their account. This object can be returned from a pivot execution.
 * @since 2021.2
 */
interface Range {
  end: string;
  start: string;
}

interface Record {
  name: string;
  primaryKey: number;
  properties: unknown;
}

interface RecordKey {
  properties: unknown
}

interface ReportStyle {
  rules: ReportStyleRule[];
  selectors: MeasureValueSelector[];
}

interface ReportStyleRule {
  /** A Boolean expression indicating whether the style should be applied. */
  expression: Expression;
  style: Style;
}

/**
 * A section. A section can be used when you create a category, a legend, a data dimension, a dimension selector, a pivot axis, or a pivot definition.
 * You can create a section using workbook.createSection(options).
 * @since 2020.2
 */
interface Section {
  /** The children of the section. */
  children: (DataDimension|Measure|Section)[];
  /** The format for the total line on a section. */
  totalLine: TotalLine;
}

interface SectionValue {
  section: Section;
}

/**
 * A series in a workbook. A series is used when you create a chart definition.
 * You can create a series using workbook.createSeries(options).
 * @since 2020.2
 */
interface Series {
  /** The aspects for the series. */
  aspects: Aspect[];
}

/**
 * A sort. A sort is used when you create a table column, a dimension sort, or a measure sort.
 * You can create a sort using workbook.createSort(options).
 * @since 2020.2
 */
interface Sort {
  /** The ascending sort indicator of the sort. */
  ascending: boolean;
  /** The indicator that determines if the sort is case-sensitive. */
  caseSensitive: boolean;
  /** The locale of the sort. */
  locale: Operator;
  /** The indicator for placing nulls last of the sort. */
  nullsLast: boolean;
}

/**
 * A sort definition. A sort definition can be used with you create a category, a legend, and a pivot axis.
 * You can create a sort definition using workbook.createSortDefinition(options).
 * @since 2020.2
 */
interface SortDefinition {
  /** The selector for the sort definition. */
  selector: DimensionSelector|PathSelector;
  /** The ordering elements for the sort definition. */
  sortBys: (DimensionSort|MeasureSort)[];
}

interface SortByDataDimensionItem {
  item: DataDimensionItem;
  sort: Sort;
}

interface SortByMeasure {
  measure: CalculatedMeasure | DataMeasure;
  otherAxisSelector: PathSelector | DimensionSelector;
  sort: Sort;
}

interface Style {
  backgroundColor: string | Color | ColorRGBA;
  backgroundImage: string;
  backgroundPosition: PositionPercent | PositionUnits | PositionValues;
  color: string | ColorRGBA;
  fontSize: string | FontSizeObj;
  fontStyle: string;
  fontWeight: string;
  textAlign: string;
  textDecorationColor: string | Color | ColorRGBA;
  textDecorationLine: string;
  textDecorationStyle: string;
}

/**
 * A table column. A table column is used when you create a table definition.
 * You can create a table column using workbook.createTableColumn(options).
 * @since 2020.2
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
  filters: TableColumnFilter[];
  /** The label of table column. */
  label: string;
  /** The sort of the table column. */
  sort: Sort;
  /** The width of the table column when displayed in the UI. */
  width: number;
}

/**
 * A table definition. A table is a workbook component that enables you to view your dataset query results in a simple table.
 * You can create a table definition using workbook.createTable(options).
 * @since 2021.2
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
 * @since 2021.2
 */
interface TableColumnFilter {
  /** The operator of the table filter. */
  operator: Operator;
  /** The values of the table filter. */
  values: (null|Object|boolean|number|string|Date)[];
}

/**
 * A workbook.
 * Workbooks are where you analyze the results of your dataset queries using different components, such as table views, pivot tables, and charts.
 * All workbooks are based on a dataset, and a single dataset can be used as the basis for multiple workbooks.
 * A workbook can include tables, pivots, and charts. A workbook is created using workbook.create(options).
 * @since 2020.2
 */
export interface Workbook {
  /**
   * @throws {SuiteScriptError} PIVOT_DOES_NOT_EXIST if the pivot specified by options.id is not included in the workbook.
   * @governance 10 units for each intersection returned
   * @since 2021.2
   */
  runPivot(options: RunPivot): PivotIntersection[];
  /** Executes the table and returns the result set (the same as in N/query Module). */
  runTable(options: RunTable): ResultSet;
  /** Executes the table and returns paginated data (the same as in N/query Module). */
  runTablePaged(options: RunTablePaged): PagedData;
  /** Chart definitions that can be included in a workbook when you create a new workbook. */
  charts: ChartDefinition[];
  /** The description of the workbook. This is set when you create a workbook. */
  description: string;
  /** The ID of the workbook, that is set when you create a workbook. */
  id: string;
  /** The name of the workbook. */
  name: string;
  /** Pivot definitions that can be included in a workbook when you create a new workbook. */
  pivots: Pivot[];
  /** *Table definitions that can be included in a workbook when you create a new workbook. */
  tables: TableDefinition[];
}

/**
 * A selector that is used to select nodes to use in conditions. It can be used when creating a path selector, a sort definition, a conditional filter, a limiting filter, or a measure sort.
 * You can create an AllSubNodesSelector using workbook.createAllSubNodesSelector().
 */
// interface AllSubNodesSelector { } // Commented out on 6 Dec 2021 - this is no longer in the Help?

interface CreateOptions {
  charts?: ChartDefinition[];
  description?: string;
  name?: string;
  pivots?: Pivot[];
  tables?: TableDefinition[];
}

interface CreateAspectOptions {
  measure: Measure|DataMeasure;
  type?: AspectType;
}

interface CreateCalculatedMeasure {
  expression: Expression;
  label?: string | Expression;
  name?: string;
  pivotDefinitions?: Pivot[];
  tableDefinitions?: TableDefinition[];
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
  dataset?: Dataset;
  filterExpressions?: Expression[];
  id: string;
  legend: Legend;
  name: string;
  series: Series[];
  stacking?: Stacking;
  subTitle?: string;
  title?: string;
  type: ChartType;
  datasetLink?: DatasetLink;
}

interface CreateColor {
  alpha?: number;
  blue?: number;
  green?: number;
  red?: number;
}

interface CreateConditionalFilter {
  filteredNodesSelector: DimensionSelector|PathSelector;
  measure: Measure;
  otherAxisSelector: DimensionSelector|PathSelector;
  predicate: Expression;
  row: boolean;
}

interface CreateConditionalFormat {
  rules: ConditionalFormatRule[];
}

interface CreateConditionalFormatRule {
  filter: TableColumnFilter;
  style: Style;
}

interface CreateConstant {
  constant: string|number|boolean|Date;
  type?: ConstantType;
}

interface CreateDataDimension {
  children?: (DataDimension|Section|Measure)[];
  items: DataDimensionItem[];
  totalLine?: TotalLine | string;
}

interface CreateDataDimensionItem {
  expression: Expression;
  label?: string;
}

interface CreateDataMeasure {
  aggregation: string|Aggregation;
  expression?: Expression;
  expressions?: Expression[];
  label: string;
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

interface CreateFontSize {
  size: number;
  unit: string;
}

interface CreateLegend {
  axes: ChartAxis[];
  root: Section|DataDimension;
  sortDefinitions?: SortDefinition[];
}

interface CreateLimitingFilter {
  filteredNodesSelector: DimensionSelector|PathSelector;
  limit: number;
  row: boolean;
  sortBys: (DimensionSort|MeasureSort)[];
}

interface CreateMeasure {
  aggregation?: string;
  expression?: Expression;
  expressions?: Expression[];
  label: string;
}

interface CreateMeasureSelector {
  measures: (CalculatedMeasure | DataMeasure)[];
}

interface CreateMeasureSort {
  measure: Measure;
  otherAxisSelector: DimensionSelector|PathSelector;
  selector: DimensionSelector|PathSelector;
  sort: Sort;
}

interface CreateMeasureValueSelector {
  columnSelector: DimensionSelector | PathSelector;
  measureSelector: MeasureSelector;
  rowSelector: DimensionSelector | PathSelector;
}

interface CreatePathSelector {
  elements: DimensionSelector[];
}

interface CreatePivotAxis {
  root: DataDimension|Section;
  sortDefinitions?: SortDefinition[];
}

interface CreatePivotDefinition {
  aggregationFilters?: (ConditionalFilter|LimitingFilter)[];
  columnAxis: PivotAxis;
  dataset?: Dataset;
  filterExpressions?: Expression[];
  id: string;
  name: string;
  rowAxis: PivotAxis;
  datasetLink?: DatasetLink;
}

interface CreatePositionPercent {
  percentX: number;
  percentY: number;
}

interface CreatePositionUnits {
  unit: string;
  x: number;
  y: number;
}

interface CreatePositionValues {
  horizontal: string;
  vertical: string;
}

interface CreateReportStyle {
  rules: ReportStyleRule[];
  selectors: MeasureValueSelector[];
}

interface CreateReportStyleRule {
  expression: Expression;
  style: Style;
}

interface CreateSection {
  children: (DataDimension|Measure|Section|DataMeasure)[];
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

interface CreateSortByDataDimensionItem {
  item: DataDimensionItem;
  sort: Sort;
}

interface CreateSortByMeasure {
  measure: Measure;
  otherAxisSelector: (DimensionSelector | PathSelector)[];
  selector: (DimensionSelector | PathSelector)[];
  sort: Sort;
}

interface CreateSortDefinition {
  selector: DimensionSelector|PathSelector;
  sortBys: (DimensionSort|MeasureSort)[];
}

interface CreateStyle {
  backgroundColor?: Color | string;
  backgroundImage?: string;
  backgroundPosition?: PositionPercent | PositionUnits | PositionValues;
  color?: Color | string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
  textAlign?: string;
  textDecorationColor?: Color | string;
  textDecorationLine?: string;
  textDecorationStyle?: string;
}

interface CreateTableColumn {
  alias?: string;
  datasetColumnAlias: string;
  datasetColumnId: number;
  fieldContext?: FieldContext;
  filters?: TableColumnFilter;
  label?: string;
  sort: Sort;
  width?: number;
}

interface CreateTableDefinition {
  columns: TableColumn[];
  dataset: Dataset;
  id: string;
  name: string;
}

interface CreateTableColumnFilter {
  operator: string;
  values?: (null|Object|number|string|boolean|Date)[];
}

interface Load {
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
  id: string;
}

/**
 * Creates a new workbook. Workbooks are where you analyze the results of your dataset queries using different components, such as table views, pivot tables, and charts.
 * All workbooks are based on a dataset, and a single dataset can be used as the basis for multiple workbooks.
 * A workbook can include an ID, a name, a description, pivot definitions, chart definitions, and table definitions.
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
 * Creates a chart category, which includes an axis, a data root, and a sort definition. A chart category is used in a workbook.ChartDefinition.
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
 * Creates a chart definition.
 * A chart is a workbook component that enables you to visualize your dataset query results using predefined chart and graph types, such as line graphs and bar charts.
 * A chart is built from an underlying dataset and can also include a category, a legend, series, a type, expressions, filters, stacking behavior indicators, along with an ID, a name, a title, and a subtitle.
 * For more information on charts in SuiteAnalytics, see Workbook Charts.
 * @throws {SuiteScriptError} INVALID_CHART_TYPE if options.type is invalid. Set this value using workbook.ChartType.
 * @throws {SuiteScriptError} INVALID_STACKING_TYPE if options.stacking is invalid. Set this value using workbook.Stacking.
 * @governance none
 * @since 2020.2
 */
export function createChart(options: CreateChartDefinition): ChartDefinition;

/**
 * Creates a color.
 * @throws {SuiteScriptError} INVALID_COLOR_VALUE if options.blue, options.green, or options.red is less than 0 or greater than 255.
 * @throws {SuiteScriptError} INVALID_INVALID_ALPHA_VALUE if options.alpha is less than 0 or greater than 1.
 * @governance none
 * @since 2021.2
 */
export function createColor(options: CreateColor): ColorRGBA;

/**
 * Creates a conditional filter, which includes a selector of what to filter, a row axis and other axis, a measure and a predicate.
 * Conditional filters can be used in pivot definitions and chart definitions.
 * @governance none
 * @since 2020.2
 */
export function createConditionalFilter(options: CreateConditionalFilter): ConditionalFilter;

/**
 * Creates a conditional format.
 * @throws {SuiteScriptError} NO_RULE_DEFINED if options.rules is an empty array.
 * @governance none
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
 * @governance none
 * @since 2020.2
 */
export function createConstant(options: CreateConstant): Expression;

/**
 * Creates a data dimension, which includes items, child data items, and a total line.
 * A data dimension is used in a workbook.Category, a workbook.Legend a workbook.PivotAxis, a workbook.DimensionSelector, and a workbook.Section.
 * @throws {SuiteScriptError} INVALID_TOTAL_LINE if options.totalLine is invalid. Set this value using workbook.TotalLine.
 * @throws {SuiteScriptError} NO_DIMENSION_ITEM_DEFINED if options.items is empty.
 * @governance none
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
 * Creates a data measure. TODO: Test this, this method doesn't seem to actually exist in NetSuite as of December 2021.
 * @throws {SuiteScriptError} AT_LEAST_ONE_EXPRESSION_IS_NEEDED if options.expression is not provided and options.expressions is an empty array.
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.expression and options.expressions are provided.
 * @governance none
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
 */
export function createDimensionSort(options: CreateDimensionSort): DimensionSort;

/**
 * Creates an expression, that includes a function ID and parameters.
 * Expressions can be used to create a pivot definition, a chart definition, a data dimension item, a measure, a conditional filter, and a dimension sort.
 * @governance none
 * @since 2020.2
 */
export function createExpression(options: CreateExpression): Expression;

/**
 * Creates a field context for a table definition column.
 * @governance none
 * @since 2020.2
 */
export function createFieldContext(options: CreateFieldContext): FieldContext;

/**
 * Creates a font size defined using units.
 * @throws {SuiteScriptError} INVALID_UNIT if options.unit is not included in the workbook.Unit enum.
 * @governance none
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
 */
export function createMeasure(options: CreateMeasure): Measure;

/**
 * Creates a measure selector.
 * @throws {SuiteScriptError} NO_MEASURE_DEFINED if options.measures is an empty array.
 * @governance none
 * @since 2021.2
 */
export function createMeasureSelector(options: CreateMeasureSelector): MeasureSelector;

/**
 * Creates a measure sort, which defines a sort on a measure.
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
 * A pivot definition is based on an underlying dataset and can include an ID, a name, a row axis, a column axis, conditional/limiting filters, and filter expressions.
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
 * @throws {SuiteScriptError} INVALID_POSITION if the resulting position is not included in the workbook.Position enum.
 * @throws {SuiteScriptError} INVALID_UNIT if options.unit is not included in the workbook.Unit enum.
 * @governance none
 * @since 2021.2
 */
export function createPositionUnits(options: CreatePositionUnits): PositionUnits;

/**
 * Creates a background position defined using position values.
 * @throws {SuiteScriptError} INVALID_POSITION if options.horizontal or options.vertical is not included in the workbook.Position enum.
 * @governance none
 * @since 2021.2
 */
export function createPositionValues(options: CreatePositionValues): PositionValues;

/**
 * Creates a report style.
 * @throws {SuiteScriptError} NO_RULE_DEFINED if options.rules is an empty array.
 * @throws {SuiteScriptError} NO_SELECTORS_DEFINED if options.selectors is an empty array.
 * @governance none
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
 * @throws {SuiteScriptError} INVALID_TOTAL_LINE if options.totalLine is invalid. Set this value using workbook.TotalLine.
 * @governance none
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
 * Creates a sort, which includes indicators for sorting in ascending order, case sensitivity, sort locale, and whether nulls should be placed last.
 * @throws {SuiteScriptError} INVALID_SORT_LOCALE if options.locale is invalid. Set this value using query.SortLocale.
 * @governance none
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
 * @throws {SuiteScriptError} NO_SORT_BY_DEFINED if options.sortBys is empty.
 * @governance none
 * @since 2020.2
 */
export function createSortDefinition(options: CreateSortDefinition): SortDefinition;

/**
 * Creates a style to be used for conditional formatting.
 * @throws {SuiteScriptError} INVALID_COLOR if options.backgroundColor, options.color, or options.textDecorationColor is not included in the workbook.Color enum and is not a workbook.Color object.
 * @throws {SuiteScriptError} INVALID_FONT_SIZE if options.fontSize is not included in the workbook.FontSize enum.
 * @throws {SuiteScriptError} INVALID_FONT_STYLE if options.fontStyle is not included in the workbook.FontStyle enum.
 * @throws {SuiteScriptError} INVALID_FONT_WEIGHT if options.fontWeight is not included in the workbook.FontWeight enum.
 * @throws {SuiteScriptError} INVALID_IMAGE if options.backgroundImage is not included in the workbook.Image enum.
 * @throws {SuiteScriptError} INVALID_TEXT_ALIGN if options.textAlign is not included in the workbook.TextAlign enum.
 * @throws {SuiteScriptError} INVALID_TEXT_DECORATION_LINE if options.textDecorationLine is not included in the workbook.TextDecorationLine enum.
 * @throws {SuiteScriptError} INVALID_TEXT_DECORATION_STYLE if options.textDecorationStyle is not included in the workbook.TextDecorationStyle enum.
 * @governance none
 * @since 2021.2
 */
export function createStyle(options: CreateStyle): Style;

/**
 * Creates a table column.
 * Table columns are used in table definitions, and include an alias, dataset column alias/ID, filters, a label, sorts, and a column width.
 * @governance none
 * @since 2020.2
 */
export function createTableColumn(options: CreateTableColumn): TableColumn;

/**
 * Creates a table.
 * A table is a workbook component that enables you to view your dataset query results in a simple table.
 * A table is based on an underlying dataset and can include an ID, a name, a dataset, and table columns,
 * @governance none
 * @since 2020.2
 */
export function createTable(options: CreateTableDefinition): TableDefinition;

/**
 * Creates a table filter, which includes an operator and values.
 * @governance none
 * @since 2020.2
 */
export function createTableColumnFilter(options: CreateTableColumnFilter): TableColumnFilter;

/**
 * Creates a record key.
 * @governance none
 * @since 2021.2
 */
export function createSimpleRecordKey(options: { key: number }): number;

/**
 * Lists all existing workbooks.
 * @governance 10 units
 * @since 2020.2
 */
export function list(): Object[];

/**
 * Loads an existing workbook. Once you load a workbook, you can execute a table and view the results.
 * @governance 10 units
 * @since 2020.2
 */
export function load(options: { id: string }): Workbook;

/**
 * A selector for descendant or self nodes object.
 *
 * A selector for descendant or self nodes object is used as a parameter in the workbook.createMeasureValueSelector(options), and workbook.createSortByMeasure(options) methods.
 * @since 2021.2
 */
export const DescendantOrSelfNodesSelector: unknown;

declare enum Aggregation {
  COUNT,
  COUNT_DISTINCT,
  MAX,
  MEDIAN,
  MIN,
  SUM
}

declare enum AspectType {
  COLOR = 'color',
  VALUE = 'value'
}

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

declare enum ChartType {
  AREA,
  BAR,
  COLUMN,
  LINE
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

declare enum DateTimeHierarchy {
  MONTH_BASED,
  WEEK_BASED
}

declare enum DateTimeProperty {
  DATE,
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  MONTH,
  QUARTER,
  WEEK_OF_YEAR,
  YEAR
}

/** @since 2020.2 */
declare enum ExpressionType { // Last updated 22 June 2022, NetSuite version 2022.1
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
  TRUNCATE_DATE_TIME
}

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

declare enum FontStyle {
  ITALIC,
  NORMAL,
  OBLIQUE,
}

declare enum FontWeight {
  BOLD,
  NORMAL
}

declare enum Image {
  EXCLAMATION,
  QUESTION,
  SMILE
}

declare enum Position {
  BOTTOM,
  CENTER,
  LEFT,
  RIGHT,
  TOP
}

declare enum Stacking {
  DISABLED,
  NORMAL,
  PERCENT
}

declare enum TemporalUnit {
  HOURS,
  MINUTES
}

declare enum TextAlign {
  CENTER,
  JUSTIFY,
  LEFT,
  RIGHT
}

declare enum TextDecorationLine {
  LINE_THROUGH,
  NONE,
  OVERLINE,
  UNDERLINE
}

declare enum TextDecorationStyle {
  DASHED,
  DOTTED,
  DOUBLE,
  SOLID,
  WAVY
}

declare enum TotalLine {
  FIRST_LINE,
  HIDDEN,
  LAST_LINE
}

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
