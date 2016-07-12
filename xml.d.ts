export interface NSNode {
    appendChild: (options: AppendChildOptions) => NSNode;
    cloneNode: (options?: CloneNodeOptions) => NSNode;
    compareDocumentPosition: (options: CompareDocumentOptions) => number;
    hasAttributes: () => boolean;
    hasChildNodes: () => boolean;
    insertBefore: (options: InsertBeforeOptions) => NSNode;
    isDefaultNamespace: (options: IsDefaultNamespaceOptions) => boolean;
    isEqualNode: (options: CompareDocumentOptions) => boolean;
    isSameNode: (options: CompareDocumentOptions) => boolean;
    lookupNamespaceURI: (options: LookupNamespaceURIOptions) => string;
    lookupPrefix: (options: LookupPrefixOptions) => string;
    normalize: () => void;
    removeChild: (options: RemoveChildOptions) => NSNode;
    replaceChild: (options: ReplaceChildOptions) => NSNode;
    attributes: string;
    baseURI: string;
    childNodes: NSNode[];
    firstChild: NSNode;
    lastChild: NSNode;
    localName: string;
    namespaceURI: string;
    nextSibling: NSNode;
    nodeName: string;
    nodeType: NodeType;
    nodeValue: string;
    ownerDocument: NSXMLDocument;
    parentNode: NSNode;
    prefix: string;
    previousSibling: NSNode;
    textContent: string;
}

export interface AppendChildOptions {
    newChild: NSNode;
}

export interface CloneNodeOptions {
    deep?: boolean;
}

export interface CompareDocumentOptions {
    other: NSNode;
}

export interface InsertBeforeOptions {
    newChild: NSNode;
    refChild: NSNode;
}

export interface IsDefaultNamespaceOptions {
    namespaceURI: string;
}

export interface LookupNamespaceURIOptions {
    prefix: string;
}

export interface LookupPrefixOptions {
    namespaceURI: string;
}

export interface RemoveChildOptions {
    oldChild: NSNode;
}

export interface ReplaceChildOptions {
    newChild: NSNode;
    oldChild: NSNode;
}

export interface NodeType {
    ATTRIBUTE_NODE;
    CDATA_SECTION_NODE;
    COMMENT_NODE;
    DOCUMENT_FRAGMENT_NODE;
    DOCUMENT_NODE;
    DOCUMENT_TYPE_NODE;
    ELEMENT_NODE;
    ENTITY_NODE;
    ENTITY_REFERENCE_NODE;
    NOTATION_NODE;
    PROCESSING_INSTRUCTION_NODE;
    TEXT_NODE;
}

export interface NSAttr extends NSNode {
    name: string;
    ownerElement: NSElement;
    specified: boolean;
    value: string;
}

export interface EscapeOptions {
    xmlText: string;
}

export interface ValidateOptions {
    xml: NSXMLDocument;
    xsdFilePathOrId: number | string;
    importFolderPathOrId?: number | string;
}

export interface NSElement extends NSNode {
    getAttribute: (options: GetAttributeOptions) => NSAttr;
    getAttributeNodeNS: (options: GetAttributeNodeNSOpts) => NSAttr;
    getAttributeNS: (options: GetAttributeNodeNSOpts) => string;
    getElementsByTagName: (options: CreateElementOptions) => NSElement[];
    getElementsByTagNameNS: (options: GetAttributeNodeNSOpts) => NSElement[];
    hasAttribute: (options: GetAttributeOptions) => boolean;
    hasAttributeNS: (options: GetAttributeNodeNSOpts) => boolean;
    removeAttributes: (options: GetAttributeOptions) => void;
    removeAttributeNode: (options: RemoveAttributeNodeOptions) => NSAttr;
    removeAttributeNS: (options: GetAttributeNodeNSOpts) => void;
    setAttribute: (options: SetAttributeOptions) => void;
    setAttributeNode: (options: SetAttributeNodeOpts) => NSAttr;
    setAttributeNodeNS: (options: SetAttributeNodeOpts) => NSAttr;
    setAttributeNS: (options: SetAttributeNSOpts) => void;
    tagName: string;
}

export interface GetAttributeOptions {
    name: string;
}

export interface GetAttributeNodeNSOpts {
    namespaceURI: string;
    localName: string;
}

export interface RemoveAttributeNodeOptions {
    oldAttr: NSAttr;
}

export interface SetAttributeOptions {
    name: string;
    value: string;
}

export interface SetAttributeNodeOpts {
    newAttr: NSAttr;
}

export interface SetAttributeNSOpts {
    namespaceURI: string;
    qualifiedName: string;
    value: string;
}

export interface NSXMLDocument extends NSNode {
    adoptNode: (options: AdoptNodeOptions) => NSNode;
    createAttribute: (options: CreateAttributeOptions) => NSAttr;
    createAttributeNS: (options: CreateAttributeNSOpts) => NSAttr;
    createCDATASection: (options: CDATAOptions) => NSNode;
    createComments: (options: CreateCommentOptions) => NSNode;
    createDocumentFragment: () => NSNode;
    createElements: (options: CreateElementOptions) => NSElement;
    createElementNS: (options: CreateElementNSOptions) => NSElement;
    createProcessingInstruction: (options: CreateProcessingOpts) => NSNode;
    createTextNode: (options: CreateTextNodeOptions) => NSNode;
    getElementById: (options: GetElementByIdOptions) => NSElement;
    getElementsByTagName: (options: GetElementsByTagNameOptions) => NSElement[];
    getElementsByTagNameNS: (options: GetElementsByTagNameNSOpts) => NSElement[];
    importNodes: (options: ImportNodeOptions) => NSNode;
    doctype: NSElement;
    documentElement: NSElement;
    documentURI: string;
    inputEncoding: string;
    xmlEncoding: string;
    xmlStandalone: boolean;
    xmlVersion: string;
}

export interface AdoptNodeOptions {
    source: NSNode;
}

export interface CreateAttributeOptions {
    name: string;
    value?: string;
}

export interface CreateAttributeNSOpts {
    namespaceURI: string;
    qualifiedName: string;
    value?: string;
}

export interface CDATAOptions {
    data: string;
}

export interface CreateCommentOptions {
    data: string;
}

export interface CreateElementOptions {
    tagName: string;
}

export interface CreateElementNSOptions {
    namespaceURI: string;
    qualifiedName: string;
}

export interface CreateProcessingOpts {
    target: string;
    data: string;
}

export interface CreateTextNodeOptions {
    data: string;
}

export interface GetElementByIdOptions {
    elementId: string;
}

export interface GetElementsByTagNameOptions {
    tagName: string;
}

export interface GetElementsByTagNameNSOpts {
    namespaceURI: string;
    localName: string;
}

export interface ImportNodeOptions {
    importedNode: NSNode;
    deep: boolean;
}

export interface ParserFromStringOptions {
    text: string;
}

export interface ParserToStringOptions {
    document: NSXMLDocument;
}

export interface Parser {
    fromString: (options: ParserFromStringOptions) => NSXMLDocument;
    toString: (options: ParserToStringOptions) => string;
}

export interface XPath {
    select: (options: SelectOptions) => NSNode[];
}

export interface SelectOptions {
    node: NSNode;
    xpath: string;
}

export interface XMLModule {
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

export default XMLModule;
