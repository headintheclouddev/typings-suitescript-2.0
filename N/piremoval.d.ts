/**
 * Load the N/piremoval module to remove personal information (PI) from system notes, workflow history, and specific field values.
 * Use the N/piremoval module to comply with the General Data Protection Regulation (GDPR), specifically the right to be forgotten.
 * You can remove personal information from system notes only, or you can also remove workflow history and field values on the record.
 * Entity records, transactions, and custom records are supported.
 *
 * You can use the piremoval.createTask(options) method to create a PI removal task, or use piremoval.loadTask(options) to load an existing PI removal task.
 * Both of these methods return a piremoval.PiRemovalTask object that represents the task.
 * Create a piremoval.PiRemovalTask object for each record type that requires removal of personal information.
 * Use the PiRemovalTask.save() method to save the task, then use the PiRemovalTask.run() method to process the task and remove the personal information.
 *
 * You can use the piremoval.getTaskStatus(options) method to check the status of a submitted PI removal task.
 * This method returns a piremoval.PiRemovalTaskStatus object that describes the current status of the removal task.
 * The piremoval.PiRemovalTaskStatus object uses an iterator to provide a list of log entries in the PiRemovalTaskStatus.logList object.
 *
 * To use the N/piremoval module, the following requirements must be met:
 * - Remove Personal Information Create permission is required to create a PI removal task.
 * - Remove Personal Information Run permission is required to run a PI removal task.
 *
 * Supported script types: Server scripts.
 * @since 2019.2
 */

/**
 * Creates a new personal information removal task.
 * Note: Remove Personal Information Create permission is required to create a PI removal task.
 * @returns The new PI removal task.
 * @governance none
 * @since 2019.2
 */
export function createTask(options: CreateTaskOptions): PiRemovalTask;

/**
 * Deletes a personal information removal task.
 * @throws {SuiteScriptError} UNEXPECTED_ERROR if the job is not saved.
 * @governance 20 units
 * @since 2019.2
 */
export function deleteTask(options: TaskIdOptions): void;

/**
 * Retrieves the status of a personal information removal task.
 * @returns The status of the PI removal task.
 * @governance none
 * @since 2019.2
 */
export function getTaskStatus(options: TaskIdOptions): PiRemovalTaskStatus;

/**
 * Retrieves (loads) an existing personal information removal task.
 * @returns The PI removal task.
 * @throws {SuiteScriptError} _1_WAS_NOT_FOUND if a job with the provided ID was not found.
 * @governance none
 * @since 2019.2
 */
export function loadTask(options: TaskIdOptions): PiRemovalTask;

interface TaskIdOptions {
  /** Unique identifier of the personal information removal task. */
  id: number;
}

/** Possible status values of a PI removal task or log item. See task.TaskStatus. */
type PiRemovalStatus = 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';

interface CreateTaskOptions {
  /** Represents IDs of fields whose personal information is removed. */
  fieldIds?: number[] | string[]; // NOTE: The help file indicates that this is number[], but the examples show string[] and the examples are correct.
  /**
   * Indicates whether the PI removal task removes system note information only, not field values or workflow history.
   * If true, the task removes information from system notes only.
   * If false, the task removes information from system notes, workflow history, and field values.
   * The default value is false.
   */
  historyOnly?: boolean;
  /** Represents the text used in system notes to replace the original values. */
  historyReplacement?: string;
  /** Represents IDs of records whose personal information is removed. */
  recordIds?: number[];
  /** Describes the record type that is updated by the PI removal task. */
  recordType?: string;
  /** Represents the workflow IDs whose history is processed by the PI removal task. */
  workflowIds?: number[];
}

/**
 * Encapsulates a personal information removal task. Use piremoval.createTask(options) to create this object,
 * or piremoval.loadTask(options) to load an existing task.
 * @since 2019.2
 */
interface PiRemovalTask {
  /**
   * Deletes the PI removal task.
   * @throws {SuiteScriptError} UNEXPECTED_ERROR if the PI removal job is not saved.
   * @governance 20 units
   * @since 2019.2
   */
  deleteTask(): void;
  /**
   * Runs the PI removal task. All validation for the task occurs when the task is saved, not when it is run.
   * Note: Remove Personal Information Run permission is required to run a PI removal task.
   * @throws {SuiteScriptError} UNEXPECTED_ERROR if the PI removal job is not saved.
   * @governance 20 units
   * @since 2019.2
   */
  run(): void;
  /**
   * Saves the PI removal task. All validation for the task (for example, ensuring that the specified record IDs are valid) occurs when the task is saved.
   * @throws {SuiteScriptError} _1_CANNOT_BE_EMPTY if the record type is not set.
   * @throws {SuiteScriptError} _1_JOB_WAS_NOT_FOUND if the record type, a record ID, a field ID, or a workflow ID does not exist.
   * @governance 20 units
   * @since 2019.2
   */
  save(): void;
  /**
   * IDs of the fields whose PI is removed. If no field IDs are entered, no information changes are performed.
   * @since 2019.2
   */
  readonly fieldIds: string[];
  /**
   * Indicates whether the PI removal task removes system note information only, not field values or workflow history.
   * If true, the task removes information from system notes only. If false, the task removes information from system notes, workflow history, and field values.
   * The default value is false.
   * @since 2019.2
   */
  readonly historyOnly: boolean;
  /**
   * The text used in system notes to replace the original value.
   * @since 2019.2
   */
  readonly historyReplacement: string;
  /**
   * ID that uniquely identifies the PI removal task. Assigned when PiRemovalTask.save() is called.
   * @since 2019.2
   */
  readonly id: number;
  /**
   * ID of records whose PI is removed. If no record IDs are entered, no information changes are performed.
   * @since 2019.2
   */
  readonly recordIds: number[];
  /**
   * Type of record whose PI is removed. All records referenced in the piremoval.PiRemovalTask object must be the same type.
   * @since 2019.2
   */
  readonly recordType: string;
  /**
   * Status of the PI removal task.
   * @since 2019.2
   */
  status: PiRemovalTaskStatus;
  /**
   * IDs of workflows where PI is removed from the workflow history. If no workflow IDs are entered, no information changes are performed.
   * @since 2019.2
   */
  readonly workflowIds: number[];
}

/**
 * Encapsulates the status of a personal information removal task. Use piremoval.getTaskStatus(options) to create this object.
 * @since 2019.2
 */
interface PiRemovalTaskStatus {
  /**
   * List of logs for the PI removal task job.
   * @since 2019.2
   */
  logList: PiRemovalTaskLogItem[];
  /**
   * The status of the PI removal task.
   * @since 2019.2
   */
  readonly status: PiRemovalStatus;
}

/**
 * Encapsulates a log item of the personal information removal task status. The log items are sorted by date.
 * @since 2019.2
 */
interface PiRemovalTaskLogItem {
  /**
   * Exception message for the log item, typically an unexpected error from NetSuite.
   * @since 2019.2
   */
  readonly exception: string;
  /**
   * Log item text message. Specifies if the record type is not set, or if one of record, field, or workflow IDs do not exist.
   * @since 2019.2
   */
  readonly message: string;
  /**
   * The status of the log item.
   * @since 2019.2
   */
  readonly status: PiRemovalStatus;
  /**
   * The change described by this log item: FieldValue (field value), SystemNote (system note), or Workflow (workflow history).
   * @since 2019.2
   */
  readonly type: 'FieldValue' | 'SystemNote' | 'Workflow';
}
