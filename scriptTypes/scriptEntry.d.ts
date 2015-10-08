/// <reference path="../N/record.d.ts" />

interface NS2_Client_FieldChangeContext {
	currentRecord: Record;
	sublistId: string;
	fieldId: string;
	lineNum: string;
	columnNum: string;
}

interface NS2_Client_FieldChanged {
  (scriptContext?: NS2_Client_FieldChangeContext): void;
}

interface NS2_Client_LineInitContext {
	currentRecord: Record;
	sublistId: string;
}

interface NS2_Client_LineInit {
  (scriptContext?: NS2_Client_LineInitContext): void;
}

interface NS2_Client_PageInitContext {
	currentRecord: Record;
	mode: string;
}

interface NS2_Client_PageInit {
  (scriptContext?: NS2_Client_PageInitContext): void;
}

interface NS2_Client_PostSourceContext {
  currentRecord: Record;
  sublistId: string;
  fieldId: string;
}

interface NS2_Client_PostSource {
  (scriptContext?: NS2_Client_PostSourceContext): void;
}

interface NS2_Client_SaveRecord {
  (): boolean;
}

interface NS2_Client_SublistChangedContext {
  currentRecord: Record;
  sublistId: string;
}

interface NS2_Client_SublistChanged {
  (scriptContext?: NS2_Client_SublistChangedContext): void;
}

interface NS2_Client_ValidateDeleteContext {
  currentRecord: Record;
  sublistId: string;
}

interface NS2_Client_ValidateDelete {
  (scriptContext?: NS2_Client_ValidateDeleteContext): boolean;
}

interface NS2_Client_ValidateFieldContext {
  currentRecord: Record;
  sublistId: string;
  fieldId: string;
  lineNum?: string;
  columnNum?: string;
}

interface NS2_Client_ValidateField {
  (scriptContext?: NS2_Client_ValidateFieldContext): boolean;
}

interface NS2_Client_ValidateInsertContext {
  currentRecord: Record;
  sublistId: string;
}

interface NS2_Client_ValidateInsert {
  (scriptContext?: NS2_Client_ValidateInsertContext): boolean;
}

interface NS2_Client_ValidateLineContext {
  currentRecord: Record;
  sublistId: string;
}

interface NS2_Client_ValidateLine {
  (scriptContext?: NS2_Client_ValidateLineContext): boolean;
}
