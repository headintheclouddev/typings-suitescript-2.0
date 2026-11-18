/** Load the N/commerce/recordView module when you want to provide fast, cached, and public access to the item fields and website settings. */

/** A flat JSON structure of field:value pairs. Values are returned as-is (for example a string, a number, or an array of objects). */
export type RecordViewFields = { [fieldId: string]: any };

/** The result of viewItems: an object keyed by item ID, each holding that item's requested fields. */
export type RecordViewItems = { [itemId: string]: RecordViewFields };

/**
 * Retrieves one or more Items with requested items fields from an Item Record.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter is invalid
 * @throws {SuiteScriptError} FIELD_1_CANNOT_BE_EMPTY if a required parameter is missing or empty
 * @governance none
 * @since 2019.1
 */
export declare function viewItems(options: RecordViewOptions): RecordViewItems;

/**
 * Retrieves the website details with requested website fields.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter is invalid
 * @throws {SuiteScriptError} FIELD_1_CANNOT_BE_EMPTY if a required parameter is empty
 * @governance none
 * @since 2019.1
 */
export declare function viewWebsite(options: ViewWebsiteOptions): RecordViewFields;

interface RecordViewOptions {
  /** IDs of the item you want to view */
  ids: number[];
  /** Item fields you want to retrieve for the items. Must be an array: a single string throws SSS_INVALID_TYPE_ARG. */
  fields: string[];
  /**
   * Options that affect related fields. Array of name, value pairs. Type depends upon parameter.
   * Supported field options (viewItems only):
   * - includeVat: this affects onlinecustomerprice_detail field. Default value is false.
   */
  fieldOptions?: { [fieldId: string]: string|boolean }[];
}

interface ViewWebsiteOptions {
  /** ID of the website */
  id: number;
  /** Website fields you want to retrieve */
  fields: string|string[];
  /** Options that affect all related fields. No field options are currently supported. */
  fieldOptions?: { [fieldId: string]: string|boolean }[];
}
