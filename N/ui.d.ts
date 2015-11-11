/// <reference path="../typings/tsd.d.ts" />

interface AddButtonOptions {
    id: string;
    label: string;
    script?: string;
}

interface AddFieldOptions {
    id: string;
    label: string;
    type: string;
    source?: string;
    tab?: string;
}

interface AddSelectOptionOptions {
    value: string;
    text: string;
    isSelected?: boolean;
}

interface CreateAssistantOptions {
    title: string;
    hideNavBar?: boolean;
}

interface UIGetFieldOptions {
    id: string;
    radio?: string;
}

interface GetSelectOptionsOpts {
    filter?: string;
    filteroperator?: string;
}

interface SetHelpTextOptions {
    help: string;
    showInlineForAssistant?: boolean;
}

interface AssistantSubmitActions {
    BACK: string;
    CANCEL: string;
    FINISH: string;
    JUMP: string;
    NEXT: string;
}

interface FieldDisplayTypes {
    DISABLED: string;
    ENTRY: string;
    HIDDEN: string;
    INLINE: string;
    NORMAL: string;
    READONLY: string;
}

interface FieldTypeLists {
    CHECKBOX: string;
    CURRENCY: string;
    DATE: string;
    DATETIMETZ: string;
    EMAIL: string;
    FILE: string;
    FLOAT: string;
    HELP: string;
    INLINEHTML: string;
    INTEGER: string;
    IMAGE: string;
    LABEL: string;
    LONGTEXT: string;
    MULTISELECT: string;
    PASSPORT: string;
    PERCENT: string;
    PHONE: string;
    SELECT: string;
    RADIO: string;
    RICHTEXT: string;
    TEXT: string;
    TEXTAREA: string;
    TIMEOFDAY: string;
    URL: string;
}

interface Assistant {
    
}

interface AssistantStep {
    
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
    displayType: string;
}

interface UIFieldGroup {
    
}

interface UIForm {
    addButton: (options: AddButtonOptions) => UIButton;
    addField: (options: AddFieldOptions) => UIField;
    getField: (options: UIGetFieldOptions) => UIField;
}

interface UISublist {
    
}

interface UITab {
    
}

interface uiModule {
    Assitant: Assistant;
    AssistantStep: AssistantStep;
    Button: UIButton;
    Field: UIField;
    FieldGroup: UIFieldGroup;
    Form: UIForm;
    Sublist: UISublist;
    Tab: UITab;
    FieldDisplayType: FieldDisplayTypes;
    FieldType: FieldTypeLists;
    AssistantSubmitAction: AssistantSubmitActions;
    createAssistant: (options: CreateAssistantOptions) => Assistant;
    createForm: (options: CreateAssistantOptions) => UIForm;
}

declare module N {
    var ui: uiModule;
}

declare module 'N/ui' {
    export = N.ui;
}
