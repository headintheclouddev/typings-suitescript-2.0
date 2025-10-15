import type { EntryPoints } from '../types'
import type { Form } from '../ui/serverWidget'

/** Taken from https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0724075122.html */
interface epForm {
	/** Adds a column on the sublist of the Invoice Payment Processing page to display field values from the records searched */
	AddColumn(
		/**
		 * The field type of the column
		 */
		type: ColumnType,
		/**
		 * The name of the column displayed on the sublist of the Invoice Payment Processing page.
		 */
		name: string,
		/**
		 * The internal ID name of the column you want to add on the sublist.
		 * The reference argument can be a standard or custom entity field.
		 * The reference argument can also be a standard or custom transaction field.
		 */
		reference: string,
		/**
		 * If value is true, the column displays the text or readable value of the field.
		 * If the value is false, the column displays the id of the field value.
		 */
		isText?: boolean,
		/**
		 * The display type of the column added to the sublist on the Invoice Payment Processing page.
		 */
		displayType?: ColumnDisplayType,
		/**
		 * The default value of the column that is displayed on the sublist automatically when the Invoice Payment Processing page loads.
		 */
		defaultValue?: string,
		/**
		 * The join id for the search return column.
		 */
		join?: string
	): void;
	/** Adds a filter on the Bill Payment Processing page. The filter refines the search of bills to be processed */
	AddFilter(
		/**
		 * If value is true, the filter is added to the existing Search Filters group on the Bill Payment Processing page.
		 * If value is false, a new group of filters, named Custom Transaction Filters, is added to the Bill Payment Processing page.
		 */
		isDefaultFilter: boolean,
		/**
		 * The internal ID name of the field you want to add as a filter.
		 * Note that you can only add fields from the transaction record.
		 * If you want to source a newly created transaction body field or transaction column field, the reference argument must be the id of the newly created field.
		 */
		reference: string,
		/**
		 * The field type of the filter
		 */
		type: FilterType,
		/**
		 * The label of the filter displayed on the Bill Payment Processing page.
		 */
		label: string,
		/**
		 * The display type of the filter on the Bill Payment Processing page.
		 */
		displayType?: FilterDisplayType,
		/**
		 * The default value of the filter that is displayed automatically when the Bill Payment Processing page loads
		 */
		defaultValue?: string,
		/**
		 * The text displayed when the filter label is clicked.
		 * The helpText value describes the data searched for when the filter is used
		 */
		helpText?: string,
		/**
		 * Specifies the source where the filter gets its autopopulated values.
		 * An example value is the internal id of a list or record.
		 * Note that source must have a value if the type argument is select or multiselect, for the values of the filter to be displayed.
		 */
		source?: string,
		/**
		 * A whole number that defines the allowed length of the value entered on the filter.
		 */
		maxLength?: number
	): void;
	/** Builds the customized Invoice Payment Processing page. This method must be called after all changes are made. */
	BuildUI(context: EntryPoints.Suitelet.onRequestContext): void;
	/** Get the form and generate it. */
	GetForm(): Form;
	/** Removes an existing (default) field from the Payment Information group of the Invoice Payment Processing page. */
	RemoveField(fieldId: string): void;
	/** Removes an existing (default) filter from the “Search Filter” group of the Invoice Payment Processing page. */
	RemoveFilter(fieldId: string): void;
	/** Use the setPaymentType method to setup the payment type */
	setPaymentType(type: PaymentType): void;
	/** Use setGlobalPayment to setup the global payments Suitelet */
	setGlobalPayment(isGlobal: boolean): void;
}

export enum ColumnType {
	TEXT = 'text',
	INTEGER = 'integer',
	DATE = 'date',
	CURRENCY = 'currency',
}

export enum ColumnDisplayType {
	NORMAL = 'normal',
	HIDDEN = 'hidden',
}

export enum FilterType {
	TEXT = 'text',
	DATE = 'date',
	CHECKBOX = 'checkbox',
	SELECT = 'select',
	MULTISELECT = 'multiselect',
	INTEGER = 'integer',
	CURRENCY = 'currency',
	LONGTEXT = 'longtext',
}

export enum FilterDisplayType {
	INLINE = 'inline',
	NORMAL = 'normal',
	HIDDEN = 'hidden',
	DISABLED = 'disabled',
}

export enum PaymentType {
	DD = 'DD',
	EFT = 'EFT',
	CR = 'CR',
	PP = 'PP',
}

export interface epPlugin extends Record<string, (...s: unknown[]) => unknown> {
	/** Returns an epForm object to customize the Invoice Payment Processing page */
	getEPForm: () => epForm;
}
