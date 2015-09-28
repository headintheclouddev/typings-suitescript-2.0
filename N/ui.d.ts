/// <reference path="../typings/tsd.d.ts" />

interface addButtonOptions {
  id?: string;
  label: string;
  script?: string;
}

interface uiButton {
  isDisabled: boolean;
  isHidden: boolean;
  label: string;
}

interface uiForm {
  addButton: (options: addButtonOptions) => uiButton;
}

interface uiModule {
  AssistantStep: Object;
  Button: Object;
  Field: Object;
  FieldGroup: Object;
  Form: uiForm;
  Sublist: Object;
  Tab: Object;
}

declare module N {
    var ui: uiModule;
}

declare module 'N/ui' {
    export = N.ui;
}
