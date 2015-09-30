/// <reference path="../N/record.d.ts" />

interface PageInitContext {
	currentRecord: Record;
	mode: string;
}

interface FieldChangeContext {
	currentRecord: Record;
	sublistId: string;
	fieldId: string;
	lineNum: string;
	columnNum: string;
}
