/// <reference path="../typings/tsd.d.ts" />

interface AddButtonOptions {
    id: string;
    label: string;
    script?: string;
}

interface AddCredentialFieldOptions {
    id: string;
    label: string;
    restrictToCurrentUser?: boolean;
    restrictToDomains?: string|string[];
    restrictToScriptId?: string;
    tab?: string;
}

interface AddFieldGroupOptions {
    id: string;
    label: string;
}

interface AddFieldOptions {
    id: string;
    label: string;
    type: string;
    source?: string;
    tab?: string;
}

interface AddPageLinkOptions {
    title: string;
    type: string;
    url: string;
}

interface AddResetButtonOptions {
    label: string;
}

interface AddSelectOptionOptions {
    value: string;
    text: string;
    isSelected?: boolean;
}

interface AddSublistOptions {
    id: string;
    label: string;
    tab?: string;
    type: string;
}

interface AddSubtabOptions {
    id: string;
    label: string;
    tab?: string;
}

interface ClientScriptOptions {
    script: string; // The scriptId or internal ID
}

interface CreateAssistantOptions {
    title: string;
    hideNavBar?: boolean;
}

interface IDOptions {
    id: string;
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

interface SetSplashOptions {
    title: string,
    text1: string,
    text2?: string 
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
    addField: (options: AddFieldOptions) => UIField;
    addFieldGroup: (options: AddFieldGroupOptions) => UIFieldGroup;
    addStep: (options: AddFieldGroupOptions) => UIAssistantStep;
    addSublist: (options: AddSublistOptions) => UISublist;
    clientScript: (options: ClientScriptOptions) => void;
    getField: (options: IDOptions) => UIField;
    getFieldGroup: (options: IDOptions) => UIFieldGroup;
    getFieldGroupIds: () => string[];
    getFieldIds: () => string; // not string[]?? may need testing.
    getLastAction: () => AssistantSubmitActions;
    getLastStep: () => UIAssistantStep;
    getNextStep: () => UIAssistantStep;
    getStep: (options: IDOptions) => UIAssistantStep;
    getStepCount: () => number;
    getSteps: () => UIAssistantStep[];
    getSublist: (options: IDOptions) => UISublist;
    getSublistIds: () => string[];
    hasErrorHtml: () => boolean;
    isFinished: () => boolean;
    sendRedirect: () => void;
    setSplash: (options: SetSplashOptions) => void;
    currentStep: void;
    defaultValues: string[];
    errorHtml: string; // Error message text for the current step
    finishedHtml: string; // The text to display after the assistant finishes. For example “You have completed the Small Business Setup Assistant. Take the rest of the day off”.
    hideAddToShortcutsLink: boolean;
    hideStepNumber: boolean;
    isNotOrdered: boolean;
    title: string;
}

interface AssistantStep {
    
}

interface UIAssistantStep {
    
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
    addCredentialField: (options: AddCredentialFieldOptions) => UIField;
    addField: (options: AddFieldOptions) => UIField;
    addFieldGroup: (options: AddFieldGroupOptions) => UIFieldGroup;
    addPageLink: (options: AddPageLinkOptions) => void;
    addResetButton: (options: AddResetButtonOptions) => UIButton;
    addSublist: (options: AddSublistOptions) => UISublist;
    addSubtab: (options: AddSubtabOptions) => UITab;
    getField: (options: UIGetFieldOptions) => UIField;
    clientScript: (options: ClientScriptOptions) => void;
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
