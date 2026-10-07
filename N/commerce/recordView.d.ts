/**
 * Load the N/commerce/recordView module when you want to provide fast, cached, and public access to the item fields and website settings.
 * Supported script types: Client and server scripts.
 */

/** A single field returned by recordView, such as `{ value: 523 }`, `{ value: true }`, or `{ value: { id: 1, label: "Option 1" } }` for list fields. */
export interface RecordViewField {
    /** The field value. The type depends on the field. */
    value: unknown;
}

/** A flat JSON structure with field:value pairs, indexed by field ID. */
export type RecordViewFields = { [fieldId: string]: RecordViewField };

interface RecordViewOptions {
  /** IDs of the items you want to view. */
  ids: number[];
  /** Item fields you want to retrieve for the items. See "Supported Fields" in the recordView.viewItems(options) Help Center topic. */
  fields: string|string[];
  /**
   * Options that affect related fields. Array of name, value pairs. Type depends upon parameter.
   * Supported field options (viewItems only):
   * - includeVat: this affects onlinecustomerprice_detail field. Default value is false.
   */
  fieldOptions?: { [optionName: string]: string|boolean }[];
}

interface ViewWebsiteOptions {
  /** ID of the website. */
  id: number;
  /** Website fields you want to retrieve. See "Supported Fields" in the recordView.viewWebsite(options) Help Center topic. */
  fields: string|string[];
  /** Options that affect all related fields that are retrieved. No field options are currently supported. */
  fieldOptions?: { [optionName: string]: string|boolean }[];
}

/**
 * Retrieves one or more items with requested item fields from an Item Record.
 *
 * @returns An array with one flat object of field:value pairs per item.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter is invalid
 * @throws {SuiteScriptError} FIELD_1_CANNOT_BE_EMPTY if a required parameter is missing or empty
 * @governance none
 * @since 2019.1
 */
export declare function viewItems(options: RecordViewOptions): RecordViewFields[];

/**
 * Retrieves the website details with requested website fields.
 * Oracle's module members table says this returns an object, but the example in the method's Returns section shows an array
 * (the example appears to be copied from viewItems). This declaration follows the members table.
 *
 * @returns The website fields as an object with field:value pairs.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if a parameter is invalid
 * @throws {SuiteScriptError} FIELD_1_CANNOT_BE_EMPTY if a required parameter is empty
 * @governance none
 * @since 2019.1
 */
export declare function viewWebsite(options: ViewWebsiteOptions): RecordViewFields;
