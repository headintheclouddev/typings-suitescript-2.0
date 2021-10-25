/**
 * Load the N/datasetLink module to link datasets. When you link two datasets, you can use data from both datasets in your workbooks.
 * 
 * The N/datasetLink module lets you logically link two datasets and use data from both datasets in your workbook visualizations (such as pivots).
 * Linking datasets is useful when you cannot use joins in the SuiteAnalytics Workbook UI or the Workbook API to join record types explicitly.
 * Linking datasets does not merge or join the datasets.
 * Instead, you specify an expression (which usually represents a column that shares common data between the two datasets, such as a date), and this expression is used to link the datasets.
 * After datasets are linked, you can access all of the data in both datasets to use in workbook visualizations.
 * For example, when you create a pivot in a workbook, you can specify a linked dataset (as a datasetLink.DatasetLink object) to use as the data source for the pivot.
 * You can use fields in both datasets to create data dimensions, data measures, sections, and other elements of the pivot.
 * 
 * For more information about linking datasets in SuiteAnalytics Workbook, see Dataset Linking in SuiteAnalytics Workbook.
 */
import { Dataset } from "./dataset";
import { Expression } from "./workbook";


interface CreateDatasetLinkOptions {
    /**
     * The datasets to link.
     */
    datasets: Dataset[];
    /**
     * The column expressions to use to link the datasets.
     */
    expressions: Array<Expression[]>;
    /**
     * The ID of the linked dataset.
     * The Help Center indicates this is optional, but testing on 2021.2 indicates it is required.
     */
    id: string;
}

/** A representation of two datasets that are linked using datasetLink.create(options). */
interface DatasetLink {
    /**
     * The linked datasets that the datasetLink.DatasetLink object represents.
     */
    datasets: Dataset[];
    /**
     * The column expressions for the datasetLink.DatasetLink object.
     */
    expressions: Array<Expression[]>;
    id: string;
}

/**
 * Links two datasets using a common column expression.
 * To link two datasets, both datasets must include a column that shares common data, such as a date.
 * You use Dataset.getExpressionFromColumn(options) to obtain expressions for each column, then you specify these expressions (and the datasets they are part of) when you call datasetLink.create(options).
 * @throws {SuiteScriptError} NO_DATASET_DEFINED if the value of the options.datasets parameter is an empty array.
 */
export function create(option: CreateDatasetLinkOptions): DatasetLink
 