/// <reference path="../typings/tsd.d.ts" />

interface AddButtonOptions {
  id: string;
  label: string;
  script?: string;
}

interface AddFieldOptions {
  id: string;
  label: string;
  type: FieldTypeValue;
  source?: string;
  tab?: string;
}

interface AddSelectOptionOptions {
  value: string;
  text: string;
  isSelected?: boolean;
}

interface GetSelectOptionsOpts {
  filter?: string;
  filteroperator?: string;
}

interface SetHelpTextOptions {
  help: string;
  showInlineForAssistant?: boolean;
}

interface UIButton {
  isDisabled: boolean;
  isHidden: boolean;
  label: string;
}

interface UIField {
  addSelectOption: (options: AddSelectOptionOptions) => void;
  getSelectOptions: (options: GetSelectOptionsOpts) => Object[];
  setHelpText: (options: SetHelpTextOptions) => UIField;
  alias: UIField;
  defaultValue: string;
  displaySize: number;
  displayType: FieldDisplayType;
}

interface FieldDisplayValue {}

interface FieldDisplayType {
  DISABLED: FieldDisplayValue;
  ENTRY: FieldDisplayValue;
  HIDDEN: FieldDisplayValue;
  INLINE: FieldDisplayValue;
  NORMAL: FieldDisplayValue;
  READONLY: FieldDisplayValue;
}

interface FieldTypeValue {}

interface FieldTypeList {
  CHECKBOX: FieldTypeValue;
  CURRENCY: FieldTypeValue;
  DATE: FieldTypeValue;
  DATETIMETZ: FieldTypeValue;
  EMAIL: FieldTypeValue;
  FILE: FieldTypeValue;
  FLOAT: FieldTypeValue;
  HELP: FieldTypeValue;
  INLINEHTML: FieldTypeValue;
  INTEGER: FieldTypeValue;
  IMAGE: FieldTypeValue;
  LABEL: FieldTypeValue;
  LONGTEXT: FieldTypeValue;
  MULTISELECT: FieldTypeValue;
  PASSPORT: FieldTypeValue;
  PERCENT: FieldTypeValue;
  PHONE: FieldTypeValue;
  SELECT: FieldTypeValue;
  RADIO: FieldTypeValue;
  RICHTEXT: FieldTypeValue;
  TEXT: FieldTypeValue;
  TEXTAREA: FieldTypeValue;
  TIMEOFDAY: FieldTypeValue;
  URL: FieldTypeValue;
}

interface uiForm {
  addButton: (options: AddButtonOptions) => UIButton;
  addField: (options: AddFieldOptions) => UIField;
}

interface uiModule {
  AssistantStep: Object;
  Button: Object;
  Field: Object;
  FieldGroup: Object;
  Form: uiForm;
  Sublist: Object;
  Tab: Object;
  FieldDisplayType: FieldDisplayType;
  FieldType: FieldTypeList;
}

declare module N {
    var ui: uiModule;
}

declare module 'N/ui' {
    export = N.ui;
}
