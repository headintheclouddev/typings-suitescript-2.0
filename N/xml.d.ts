/// <reference path="../typings/tsd.d.ts" />

interface NSNode {
  
}

interface NSAttr extends NSNode {
  
}

interface NSElement extends NSNode {
  
}

interface NSXMLDocument extends NSNode {
  
}

interface ParserFromStringOptions {
  text: string;
}

interface ParserToStringOptions {
  document: XMLDocument;
}

interface Parser {
  fromString: (options: ParserFromStringOptions) => XMLDocument;
  toString: (options: ParserToStringOptions) => string;
}

interface XMLModule {
    Attr: NSAttr;
    Document: NSXMLDocument;
    Element: NSElement;
    Node: NSNode;
    Parser: Parser;
}

declare module N {
    var xml: XMLModule;
}

declare module 'N/xml' {
    export = N.xml;
}
