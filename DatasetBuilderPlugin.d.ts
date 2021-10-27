import {Dataset} from "N/dataset";

/** Context object for the main createDataset() plugin interface function. */
interface CreateDatasetContext {
  dataset: Dataset;
  readonly description: string
  readonly name: string;
  readonly owner: number;
  readonly role: number;
}
