/// <reference path="../N/record.d.ts" />

interface NS2_Client_PageInitContext {
	currentRecord: Record;
	mode: string;
}

interface NS2_Client_FieldChangeContext {
	currentRecord: Record;
	sublistId: string;
	fieldId: string;
	lineNum: string;
	columnNum: string;
}

interface NS2_Client_ValidateFieldContext {
  currentRecord: Record;
  sublistId: string;
  fieldId: string;
  lineNum?: string;
  columnNum?: string;
}

interface ScriptEntry {
  NS2_Client_PageInit: (scriptContext: NS2_Client_PageInitContext) => void;
  NS2_Client_FieldChanged: (scriptContext: NS2_Client_FieldChangeContext) => void;
  NS2_Client_ValidateField: (scriptContext: NS2_Client_ValidateFieldContext) => boolean;
}
