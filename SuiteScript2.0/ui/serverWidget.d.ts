/// <reference path="../../SuiteScript2.0-Globals/index.d.ts" />

interface ServerWidgetModule {
    Assitant: Assistant;
    AssistantStep: AssistantStep;
    Button: UIButton;
    Field: UIField;
    FieldGroup: UIFieldGroup;
    Form: UIForm;
    Sublist: UISublist;
    Tab: UITab;
    FieldBreakType: FieldBreakTypes;
    FieldDisplayType: FieldDisplayTypes;
    FieldLayoutType: FieldLayoutTypes;
    FieldType: FieldTypeLists;
    AssistantSubmitAction: AssistantSubmitActions;
    createAssistant(options: CreateAssistantOptions): Assistant;
    /**
     * Creates a form object.
     */
    createForm(options: CreateAssistantOptions): UIForm;
}

declare var _: ServerWidgetModule;
export = _;
