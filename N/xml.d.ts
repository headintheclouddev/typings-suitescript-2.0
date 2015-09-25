/// <reference path="../typings/tsd.d.ts" />

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
    Attr: Attr;
    Document: XMLDocument;
    Element: Element;
    Node: XMLDocument|Element|Attr;
    Parser: Parser;
}

declare module N {
    var xml: XMLModule;
}

declare module 'N/xml' {
    export = N.xml;
}
