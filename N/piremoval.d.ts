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
 */

export function createTask(options: CreateTaskOptions): PiRemovalTask;
export function deleteTask(options: { id: number }): void;
export function getTaskStatus(options: { id: number }): PiRemovalTaskStatus;
export function loadTask(options: { id: number }): PiRemovalTask;

interface CreateTaskOptions {
  /** Represents IDs of fields whose personal information is removed. */
  fieldIds?: number[];
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

interface PiRemovalTask {
  deleteTask: () => void;
  run: () => void;
  save: () => void;
  /** IDs of the fields whose PI is removed. If no field IDs are entered, no information changes are performed. */
  readonly fieldIds: string[];
  /**
   * Indicates whether the PI removal task removes system note information only, not field values or workflow history.
   * If true, the task removes information from system notes only. If false, the task removes information from system notes, workflow history, and field values.
   * The default value is false.
   */
  readonly historyOnly: boolean;
  /** The text used in system notes to replace the original value. */
  readonly historyReplacement: string;
  readonly id: number;
  /** ID of records whose PI is removed. If no record IDs are entered, no information changes are performed. */
  readonly recordIds: number[];
  /** Type of record whose PI is removed. All records referenced in the piremoval.PiRemovalTask object must be the same type. */
  readonly recordType: string;
  status: PiRemovalTaskStatus;
  /** IDs of workflows where PI is removed from the workflow history. If no workflow IDs are entered, no information changes are performed. */
  readonly workflowIds: number[];
}

interface PiRemovalTaskStatus {
  logList: PiRemovalTaskLogItem[];
  readonly status: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
}

interface PiRemovalTaskLogItem {
  readonly exception: string;
  readonly message: string;
  readonly status: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
  readonly type: string;
}
