/// <reference path="../typings/tsd.d.ts" />

interface ParserFromStringOptions {
  text: string;
}

interface ParserToStringOptions {
  document: XMLDocument;
}

interface Parser {
  fromString: (options: ParserFromStringOptions) => XMLDocument;
  toString: (opations: ParserToStringOptions) => string;
}

declare module N {
    var xml:any;
}

declare module 'N/xml' {
    export = N.xml;
}
