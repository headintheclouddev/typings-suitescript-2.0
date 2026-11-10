/**
 * Load the N/task/accounting/recognition module to merge revenue arrangements or revenue elements.
 * @throws {SuiteScriptError} INVALID_TASK_TYPE if the options.taskType parameter represents an invalid task type.
 * @governance none
 * @since 2019.2
 */

export function create(options: { taskType: string }): MergeArrangementsTask|MergeElementsTask;
/**
 * @governance 50 units
 * @since 2019.2
 */
export function checkStatus(options: { taskId: number|string }): MergeArrangementsTaskStatus;

/** @since 2019.2 */
interface MergeArrangementsTask {
  /**
   * Submits the merge task for processing. This method returns a task ID that uniquely identifies the merge task.
   * @throws {SuiteScriptError} NO_REVENUE_ARRANGEMENT_IDS_ARE_INCLUDED_IN_YOUR_INPUT if the MergeArrangementsTask.arrangements property is empty.
   * @throws {SuiteScriptError} NO_REVENUE_ELEMENTS_WERE_FOUND_FOR_THE_REVENUE_ARRANGEMENT_IDS_YOU_INPUT if no revenue elements were found for the revenue arrangements specified in the MergeArrangementsTask.arrangements property.
   * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if an invalid date format is specified in the contractCostAccrualDate or revenueArrangementDate property.
   * @governance 20 units
   * @since 2019.2
   */
  submit: () => number;
  /**
   * Holds an array of internal IDs of the revenue arrangement records to merge.
   * @since 2019.2
   */
  readonly arrangements: (number|string)[];
  /**
   * References the contract acquisition deferred expense account for the new revenue arrangement.
   * @since 2019.2
   */
  readonly contractAcquisitionDeferredExpenseAccount: number|string;
  /**
   * References the contract acquisition expense account for the new revenue arrangement.
   * @since 2019.2
   */
  readonly contractAcquisitionExpenseAccount: number|string;
  /**
   * Describes the contract cost accrual date to use for the new revenue arrangement.
   * @since 2019.2
   */
  readonly contractCostAccrualDate: Date;
  /**
   * Indicates whether the revenue arrangements are merged prospectively.
   * @since 2019.2
   */
  readonly mergeResidualRevenueAmounts: boolean;
  /**
   * Indicates whether to recalculate the fair value on residual elements when revenue arrangements are prospectively merged.
   * @since 2019.2
   */
  readonly recalculateResidualFairValue: boolean;
  /**
   * Describes the date of the new revenue arrangement. The default value is today’s date.
   * @since 2019.2
   */
  readonly revenueArrangementDate: Date;
}

/** @since 2019.2 */
interface MergeArrangementsTaskStatus {
  /**
   * Holds an error message that describes the failure of the merge task. This property is valid only if the value of the status property is TaskStatus.FAILED.
   * @since 2019.2
   */
  readonly errorMessage: string;
  /**
   * Holds an array of internal IDs of the revenue arrangement records to merge. This property is valid only if the merge task was created using a task type of TaskType.MERGE_ARRANGEMENTS_TASK.
   * @since 2019.2
   */
  readonly inputArrangements: number[];
  /**
   * Holds an array of internal IDs of the revenue elements to merge. This property is valid only if the merge task was created using a task type of TaskType.MERGE_ELEMENTS_TASK.
   * @since 2019.2
   */
  readonly inputElements: number[];
  /**
   * References the internal ID of the new revenue arrangement that was created. This property is valid only if the value of the status property is TaskStatus.COMPLETE.
   * @since 2019.2
   */
  readonly resultingArrangement: number|string;
  /**
   * Represents the current status of the merge task. This property uses values in the recognition.TaskStatus enum.
   * @since 2019.2
   */
  readonly status: string;
  /**
   * References the submission ID of the merge arrangements bulk process.
   * @since 2019.2
   */
  readonly submissionId: number|string;
  /**
   * Holds the task ID of the merge task. The task ID is assigned to the merge task when you call recognition.create(options).
   * @since 2019.2
   */
  readonly taskId: number|string;
}

/** @since 2019.2 */
interface MergeElementsTask {
  /**
   * Submits the merge task for processing. This method returns a task ID that uniquely identifies the merge task.
   * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if an invalid date format is specified in the contractCostAccrualDate or revenueArrangementDate property.
   * @governance 20 units
   * @since 2019.2
   */
  submit: () => number;
  /**
   * References the contract acquisition deferred expense account for the new revenue arrangement.
   * @since 2019.2
   */
  readonly contractAcquisitionDeferredExpenseAccount: number|string;
  /**
   * References the contract acquisition expense account for the new revenue arrangement.
   * @since 2019.2
   */
  readonly contractAcquisitionExpenseAccount: number|string;
  /**
   * Describes the contract cost accrual date to use for the new revenue arrangement.
   * @since 2019.2
   */
  readonly contractCostAccrualDate: Date;
  /**
   * Holds an array of internal IDs of the revenue element records to merge.
   * @since 2019.2
   */
  readonly elements: (number|string)[];
  /**
   * Describes the date of the new revenue arrangement. The default value is today’s date.
   * @since 2019.2
   */
  readonly revenueArrangementDate: Date;
}
