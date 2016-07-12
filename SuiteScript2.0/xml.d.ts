/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface XMLModule {
    Attr: NSAttr;
    Document: NSXMLDocument;
    Element: NSElement;
    Node: NSNode;
    Parser: Parser;
    XPath: XPath;
    escape(options: EscapeOptions): string;
    validate(options: ValidateOptions): void;
    NodeType: NodeType;
}

declare var _: XMLModule;
export = _;
