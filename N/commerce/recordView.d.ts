/** Load the N/commerce/recordView module when you want to provide fast, cached, and public access to the item fields and website settings. */

/** Retrieves one or more Items with requested items fields from an Item Record. */
export declare function viewItems(): { [fieldId: string]: string|number|boolean };

/** Retrieves the website details with requested website fields. */
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
