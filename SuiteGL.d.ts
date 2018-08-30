/**
 * Represents the accounting book passed to a Custom GL Lines plug-in implementation when you save a transaction.
 * Use the methods available to the book object to determine if the book is a primary or secondary book or get
 * the internal NetSuite ID of the accounting book.  If you use the Multi-Book Accounting feature, the
 * AccountingBook object represents a different accounting book each time the plug-in implementation executes.
 */
interface AccountingBook {

}

/** These methods exist for both Custom lines and Standard lines. */
interface GLLine {
  /** Get Account ID for a line. */
  getAccountId(): string;
  /** Returns the internal NetSuite ID for the class on a StandardLine or CustomLine object. */
  getClassId(): number;
  /** Returns the credit amount for a StandardLine or CustomLine object. */
  getCreditAmount(): string;
  /** Returns the debit amount for a StandardLine or CustomLine object. */
  getDebitAmount(): string;
  /** Returns the internal NetSuite ID for the department on a StandardLine or CustomLine object. */
  getDepartmentId(): number;
  /** Returns the internal NetSuite ID of the entity for a standard line. */
  getEntityId(): number;
  /** Returns the internal NetSuite ID for the location on a StandardLine or CustomLine object. */
  getLocationId(): number;
  /** Returns the Memo field on a StandardLine or CustomLine object. */
  getMemo(): string;
  /**
   * Returns the internal NetSuite ID for the custom segment value set on the line on a StandardLine or CustomLine object.
   * @param {string} segmentId
   */
  getSegmentValueId(segmentId: string): number;
}

/** 
 * Contains all properties for a single custom line for the GL impact on a transaction.
 * Use the methods available to the CustomLine object to set the values for the custom
 * line and define plug-in implementation functionality based on the values. The CustomLines
 * object contains a reference to each custom GL impact line.
 */
interface CustomLine extends GLLine {
  // TODO: Add the rest of the methods here.  There are a few more that may be used in special situations.
  /**
   * Sets the account ID property for a CustomLine object in a primary or secondary book.
   * @param {number} accountId Internal NetSuite ID for an account.
   */
  setAccountId (accountId: number): void; 
  /**
   * Sets the class ID property for a CustomLine object in a primary or secondary book.
   * @param {number} classId Internal NetSuite ID for a class
   */
  setClassId (classId: number): void;
  /**
   * Sets the credit amount of a CustomLine object in a primary or secondary book.
   * @param {string|number} credit String value of a credit on a general ledger account. Requires a positive value.
   */
  setCreditAmount (credit: string|number): void;
  /**
   * Sets the credit amount of a CustomLine object in a primary or secondary book.
   * @param {string|number} debit String value of a debit on a general ledger account. Requires a positive value.
   */
  setDebitAmount (debit: string|number): void;
  /**
   * Sets the department ID of a CustomLine object in a primary or secondary book.
   * @param {number} departmentId
   */
  setDepartmentId (departmentId: number): void;
  /**
   * Sets the entity ID property for a CustomLine object in a primary or secondary book to the internal NetSuite ID.
   * @param {number} entityId
   */
  setEntityId (entityId: number): void;
  /**
   * Sets the Location ID of a CustomLine object in a primary or secondary book.
   * @param {number} locationId
   */
  setLocationId (locationId: number): void;
  /**
   * Sets the Memo field on a CustomLine object. See also getMemo().
   * @param {string} memo
   */
  setMemo (memo: string): void;
}

/** 
 * Contains an array of all custom lines with GL impact in a transaction as CustomLine objects.
 * Use this object to add and modify custom lines with GL impact on a transaction.
 * Create a new CustomLine object with addNewLine().
 */
interface CustomLines {
  /**
   * Adds a CustomLine object to the parent CustomLines object in a Custom GL Lines plug-in
   * implementation and returns the new object. Use this method to add a custom line with
   * GL impact to a transaction. After you create the custom line, use the methods available
   * to the CustomLine object to set the properties of the custom line, including the general
   * ledger account ID and the amount of the custom line.
   */
  addNewLine(): CustomLine;
}

/** 
 * Contains all properties for a single standard line on the GL impact on a transaction.
 * Use the methods available to the StandardLine object to get the values for the standard
 * line and define plug-in implementation functionality based on the values. The
 * StandardLines object has a StandardLine object for each standard GL impact line.
 */
interface StandardLine extends GLLine {
  /**
   * Returns the internal NetSuite database ID for a standard GL impact line.
   * The summary line for the GL impact on a transaction occurs for most transaction types at ID of 0.
   * Some transactions, like journals, do not have a summary line.
   */
  getId(): number;
  /** Returns the internal NetSuite ID of the subsidiary for the entity associated with a standard GL impact line. */
  getSubsidiaryId(): number;
  /** Returns a string that represents the amount of a standard GL line that was subject to tax. */
  getTaxableAmount(): string;
  /** Returns a string that represents the amount of tax charged on a standard GL line. */
  getTaxAmount(): string;
  /** Returns the internal NetSuite ID of the tax code for a standard GL line. */
  getTaxItemId(): number;
  /** Returns the tax type for a standard GL line that was subject to tax. */
  getTaxType(): string;
  /** Returns true if the transaction is a posting transaction and the associated standard GL impact line posts to the general ledger. */
  isPosting(): boolean;
  /** Returns true if a standard GL impact line is a credit to a tax account. */
  isTaxable(): boolean;
}

/** 
 * Contains an array of all standard lines with GL impact in a transaction as StandardLine objects.
 * Standard lines are the general ledger impacts that appear on the GL Impact report for a transaction.
 * Use this object to access individual standard lines for an accounting book in a transaction.
 */
interface StandardLines {
  /**
   * Returns the number of standard lines with GL impact for a specific accounting book in a transaction.
   * Use this method in conjunction with getLine(index) to read individual standard lines.
   */
  getCount(): number;
  /**
   * Returns a StandardLine object that represents a standard line with GL impact.
   * StandardLine objects are stored in the StandardLines object starting at index 0.
   * @param {number} index
   */
  getLine (index: number): StandardLine;
}
