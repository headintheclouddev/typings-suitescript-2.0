/** Load the N/task/accounting/recognition module to merge revenue arrangements or revenue elements. */

export function create(options: { taskType: string }): MergeArrangementsTask|MergeElementsTask;
export function checkStatus(options: { taskId: number|string }): MergeArrangementsTaskStatus;

interface MergeArrangementsTask {
  /** Submits the merge task for processing. This method returns a task ID that uniquely identifies the merge task. */
  submit: () => number;
  /** Holds an array of internal IDs of the revenue arrangement records to merge. */
  readonly arrangements: (number|string)[];
  /** References the contract acquisition deferred expense account for the new revenue arrangement. */
  readonly contractAcquisitionDeferredExpenseAccount: number|string;
  /** References the contract acquisition expense account for the new revenue arrangement. */
  readonly contractAcquisitionExpenseAccount: number|string;
  /** Describes the contract cost accrual date to use for the new revenue arrangement. */
  readonly contractCostAccrualDate: Date;
  /** Indicates whether the revenue arrangements are merged prospectively. */
  readonly mergeResidualRevenueAmounts: boolean;
  /** Indicates whether to recalculate the fair value on residual elements when revenue arrangements are prospectively merged. */
  readonly recalculateResidualFairValue: boolean;
  /** Describes the date of the new revenue arrangement. The default value is today’s date. */
  readonly revenueArrangementDate: Date;
}

interface MergeArrangementsTaskStatus {
  /** Holds an error message that describes the failure of the merge task. This property is valid only if the value of the status property is TaskStatus.FAILED. */
  readonly errorMessage: string;
  /** Holds an array of internal IDs of the revenue arrangement records to merge. This property is valid only if the merge task was created using a task type of TaskType.MERGE_ARRANGEMENTS_TASK. */
  readonly inputArrangements: number[];
  /** Holds an array of internal IDs of the revenue elements to merge. This property is valid only if the merge task was created using a task type of TaskType.MERGE_ELEMENTS_TASK. */
  readonly inputElements: number[];
  /** References the internal ID of the new revenue arrangement that was created. This property is valid only if the value of the status property is TaskStatus.COMPLETE. */
  readonly resultingArrangement: number|string;
  /** Represents the current status of the merge task. This property uses values in the recognition.TaskStatus enum. */
  readonly status: string;
  /** References the submission ID of the merge arrangements bulk process. */
  readonly submissionId: number|string;
  /** Holds the task ID of the merge task. The task ID is assigned to the merge task when you call recognition.create(options). */
  readonly taskId: number|string;
}

interface MergeElementsTask {
  /** Submits the merge task for processing. This method returns a task ID that uniquely identifies the merge task. */
  submit: () => number;
  /** References the contract acquisition deferred expense account for the new revenue arrangement. */
  readonly contractAcquisitionDeferredExpenseAccount: number|string;
  /** References the contract acquisition expense account for the new revenue arrangement. */
  readonly contractAcquisitionExpenseAccount: number|string;
  /** Describes the contract cost accrual date to use for the new revenue arrangement. */
  readonly contractCostAccrualDate: Date;
  /** Holds an array of internal IDs of the revenue element records to merge. */
  readonly elements: (number|string)[];
  /** Describes the date of the new revenue arrangement. The default value is today’s date. */
  readonly revenueArrangementDate: Date;
}
