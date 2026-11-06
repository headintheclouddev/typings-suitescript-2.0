/** Load the N/commerce/recordView module when you want to provide fast, cached, and public access to the item fields and website settings. */

/** A flat JSON structure of field:value pairs, where each value is wrapped as `{ value: ... }`. */
export type RecordViewFields = { [fieldId: string]: { value: any } };

/** Retrieves one or more Items with requested items fields from an Item Record. */
export declare function viewItems(options: RecordViewOptions): RecordViewFields[];

/** Retrieves the website details with requested website fields. */
export declare function viewWebsite(options: ViewWebsiteOptions): RecordViewFields[];

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

interface ViewWebsiteOptions {
  /** ID of the website */
  id: number;
  /** Website fields you want to retrieve */
  fields: string|string[];
  /** Options that affect all related fields. No field options are currently supported. */
  fieldOptions?: { [fieldId: string]: string|boolean }[];
}
