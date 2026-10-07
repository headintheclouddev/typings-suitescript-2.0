/** Load the N/task/accounting/recognition module to merge revenue arrangements or revenue elements. You cannot merge more than 10,000 revenue elements at one time. Supported script types: Server scripts. */

interface CreateOptions<T extends string> {
  /** The type of merge task to create. Use values from the recognition.TaskType enum. */
  taskType: T;
}

interface CheckStatusOptions {
  /** The task ID of the merge task to check. The task ID is assigned to the merge task when you call recognition.create(options). */
  taskId: number | string;
}

/**
 * Creates a merge task that combines entire revenue arrangements or individual revenue elements.
 * After you create a merge task, you must specify its properties (such as MergeArrangementsTask.arrangements or MergeElementsTask.elements) before you submit it.
 *
 * Supported script types: Server scripts.
 * @throws {SuiteScriptError} INVALID_TASK_TYPE if the options.taskType parameter represents an invalid task type.
 * @governance none
 * @since 2019.2
 */
export function create(options: CreateOptions<TaskType.MERGE_ARRANGEMENTS_TASK | 'MERGE_ARRANGEMENTS_TASK'>): MergeArrangementsTask;
export function create(options: CreateOptions<TaskType.MERGE_ELEMENTS_TASK | 'MERGE_ELEMENTS_TASK'>): MergeElementsTask;
export function create(options: CreateOptions<string>): MergeArrangementsTask | MergeElementsTask;
/**
 * Checks the status of a submitted merge task.
 *
 * Supported script types: Server scripts.
 * @governance 50 units
 * @since 2019.2
 */
export function checkStatus(options: CheckStatusOptions): MergeArrangementsTaskStatus;

/**
 * Encapsulates a task to merge all of the revenue elements from a specified list of revenue arrangements. Use recognition.create(options) to create this object.
 * The arrangements property is required; all other properties are optional.
 * Note: Oracle's members table marks these properties as read-only, but the individual property pages do not, and you must set them before you submit the task.
 * @since 2019.2
 */
interface MergeArrangementsTask {
  /**
   * Submits the merge task for processing. This method returns a task ID that uniquely identifies the merge task.
   * This task ID also represents the submission ID of the internal bulk process that performs the merge.
   * @throws {SuiteScriptError} NO_REVENUE_ARRANGEMENT_IDS_ARE_INCLUDED_IN_YOUR_INPUT if the MergeArrangementsTask.arrangements property is empty.
   * @throws {SuiteScriptError} NO_REVENUE_ELEMENTS_WERE_FOUND_FOR_THE_REVENUE_ARRANGEMENT_IDS_YOU_INPUT if no revenue elements were found for the revenue arrangements specified in the MergeArrangementsTask.arrangements property.
   * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if an invalid date format is specified in the contractCostAccrualDate or revenueArrangementDate property.
   * @governance 20 units
   * @since 2019.2
   */
  submit(): number;
  /**
   * Holds an array of internal IDs of the revenue arrangement records to merge. This property is required before you submit the task. Invalid IDs are ignored.
   * @since 2019.2
   */
  arrangements: (number|string)[];
  /**
   * References the contract acquisition deferred expense account for the new revenue arrangement. Valid only if the Enable Advanced Cost Amortization accounting preference is enabled; otherwise ignored.
   * The default value is the account specified by the Contract Acquisition Deferred Expense Account accounting preference.
   * @since 2019.2
   */
  contractAcquisitionDeferredExpenseAccount: number|string;
  /**
   * References the contract acquisition expense account for the new revenue arrangement. Valid only if the Enable Advanced Cost Amortization accounting preference is enabled; otherwise ignored.
   * The default value is the account specified by the Contract Acquisition Expense Account accounting preference.
   * @since 2019.2
   */
  contractAcquisitionExpenseAccount: number|string;
  /**
   * Describes the contract cost accrual date to use for the new revenue arrangement. Valid only if the Enable Advanced Cost Amortization accounting preference is enabled; otherwise ignored. The default value is today's date.
   * @since 2019.2
   */
  contractCostAccrualDate: Date;
  /**
   * Indicates whether the revenue arrangements are merged prospectively. The default value is false.
   * @since 2019.2
   */
  mergeResidualRevenueAmounts: boolean;
  /**
   * Indicates whether to recalculate the fair value on residual elements when revenue arrangements are prospectively merged.
   * Can be set to true only if mergeResidualRevenueAmounts is also true; otherwise ignored. The default value is false.
   * @since 2019.2
   */
  recalculateResidualFairValue: boolean;
  /**
   * Describes the date of the new revenue arrangement. The default value is today's date.
   * @since 2019.2
   */
  revenueArrangementDate: Date;
}

/**
 * Encapsulates the current status of a submitted merge task. Use recognition.checkStatus(options) to create this object.
 * @since 2019.2
 */
interface MergeArrangementsTaskStatus {
  /**
   * Holds an error message that describes the failure of the merge task. This property is valid only if the value of the status property is TaskStatus.FAILED.
   * @since 2019.2
   */
  readonly errorMessage: string;
  /**
   * Holds an array of internal IDs of the revenue arrangement records to merge. This property is valid only if the merge task was created using a task type of TaskType.MERGE_ARRANGEMENTS_TASK.
   * Note: This property has a potential governance value of 10 units.
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
   * Note: Oracle's property page lists the type as number, but the members table lists number | string.
   * @since 2019.2
   */
  readonly resultingArrangement: number|string;
  /**
   * Represents the current status of the merge task. This property uses values in the recognition.TaskStatus enum.
   * @since 2019.2
   */
  readonly status: TaskStatus | string;
  /**
   * References the submission ID of the merge arrangements bulk process. This ID is the same as the task ID returned by MergeArrangementsTask.submit() or MergeElementsTask.submit().
   * Note: Oracle's property page lists the type as number, but the members table lists number | string.
   * @since 2019.2
   */
  readonly submissionId: number|string;
  /**
   * Holds the task ID of the merge task. The task ID is assigned to the merge task when you call MergeArrangementsTask.submit() or MergeElementsTask.submit().
   * @since 2019.2
   */
  readonly taskId: number|string;
}

/**
 * Encapsulates a task to merge all of the specified revenue elements. Use recognition.create(options) to create this object.
 * The elements property is required; all other properties are optional.
 * Note: Oracle's members table marks these properties as read-only, but the individual property pages do not, and you must set them before you submit the task.
 * @since 2019.2
 */
interface MergeElementsTask {
  /**
   * Submits the merge task for processing. This method returns a task ID that uniquely identifies the merge task.
   * This task ID also represents the submission ID of the internal bulk process that performs the merge.
   * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if an invalid date format is specified in the contractCostAccrualDate or revenueArrangementDate property.
   * @governance 20 units
   * @since 2019.2
   */
  submit(): number;
  /**
   * References the contract acquisition deferred expense account for the new revenue arrangement. Valid only if the Enable Advanced Cost Amortization accounting preference is enabled; otherwise ignored.
   * The default value is the account specified by the Contract Acquisition Deferred Expense Account accounting preference.
   * @since 2019.2
   */
  contractAcquisitionDeferredExpenseAccount: number|string;
  /**
   * References the contract acquisition expense account for the new revenue arrangement. Valid only if the Enable Advanced Cost Amortization accounting preference is enabled; otherwise ignored.
   * The default value is the account specified by the Contract Acquisition Expense Account accounting preference.
   * @since 2019.2
   */
  contractAcquisitionExpenseAccount: number|string;
  /**
   * Describes the contract cost accrual date to use for the new revenue arrangement. Valid only if the Enable Advanced Cost Amortization accounting preference is enabled. The default value is today's date.
   * @since 2019.2
   */
  contractCostAccrualDate: Date;
  /**
   * Holds an array of internal IDs of the revenue element records to merge. This property is required before you submit the task. You cannot merge more than 10,000 revenue elements at one time.
   * @since 2019.2
   */
  elements: (number|string)[];
  /**
   * Describes the date of the new revenue arrangement. The default value is today's date.
   * @since 2019.2
   */
  revenueArrangementDate: Date;
}

/**
 * Holds the string values for supported merge task statuses. Used by MergeArrangementsTaskStatus.status.
 * @since 2019.2
 */
export enum TaskStatus {
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
}

/**
 * Holds the string values for supported merge task types. Used to pass the task type argument to recognition.create(options).
 * @since 2019.2
 */
export enum TaskType {
  MERGE_ARRANGEMENTS_TASK = "MERGE_ARRANGEMENTS_TASK",
  MERGE_ELEMENTS_TASK = "MERGE_ELEMENTS_TASK",
}
