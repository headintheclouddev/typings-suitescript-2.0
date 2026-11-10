/** Load the N/commerce/recordView module when you want to provide fast, cached, and public access to the item fields and website settings. */

/**
 * Retrieves one or more Items with requested items fields from an Item Record.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter is invalid
 * @throws {SuiteScriptError} FIELD_1_CANNOT_BE_EMPTY if a required parameter is missing or empty
 * @governance none
 * @since 2019.1
 */
export declare function viewItems(): { [fieldId: string]: string|number|boolean };

/**
 * Retrieves the website details with requested website fields.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter is invalid
 * @throws {SuiteScriptError} FIELD_1_CANNOT_BE_EMPTY if a required parameter is empty
 * @governance none
 * @since 2019.1
 */
export declare function viewWebsite(): { [fieldId: string]: string|number|boolean };

interface RecordViewOptions {
  /** IDs of the item you want to view */
  ids: number[];
  /** Item fields you want to retrieve for the items */
  fields: string|string[];
  /**
   * Options that affect related fields. Array of name, value pairs. Type depends upon parameter.
   * Supported field options (viewItems only):
   * - includeVat: this affects onlinecustomerprice_detail field. Default value is false.
   */
  fieldOptions?: { [fieldId: string]: string|boolean }[];
}
