/** @since 2015.2 */
interface NSNode {
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be appended (HIERARCHY_REQUEST_ERR).
     * @governance none
     * @since 2015.2
     */
    appendChild: (options: AppendChildOptions) => NSNode;
    /**
     * @governance none
     * @since 2015.2
     */
    cloneNode: (options?: CloneNodeOptions) => NSNode;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if options.other is not an xml.Node.
     * @governance none
     * @since 2015.2
     */
    compareDocumentPosition: (options: CompareDocumentOptions) => number;
    /**
     * @governance none
     * @since 2015.2
     */
    hasAttributes: () => boolean;
    /**
     * @governance none
     * @since 2015.2
     */
    hasChildNodes: () => boolean;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be inserted (HIERARCHY_REQUEST_ERR).
     * @governance none
     * @since 2015.2
     */
    insertBefore: (options: InsertBeforeOptions) => NSNode;
    /**
     * @governance none
     * @since 2015.2
     */
    isDefaultNamespace: (options: IsDefaultNamespaceOptions) => boolean;
    /**
     * @governance none
     * @since 2015.2
     */
    isEqualNode: (options: CompareDocumentOptions) => boolean;
    /**
     * @governance none
     * @since 2015.2
     */
    isSameNode: (options: CompareDocumentOptions) => boolean;
    /**
     * @governance none
     * @since 2015.2
     */
    lookupNamespaceURI: (options: LookupNamespaceURIOptions) => string;
    /**
     * @governance none
     * @since 2015.2
     */
    lookupPrefix: (options: LookupPrefixOptions) => string;
    /**
     * @governance none
     * @since 2015.2
     */
    normalize: () => void;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be removed (NOT_FOUND_ERR).
     * @governance none
     * @since 2015.2
     */
    removeChild: (options: RemoveChildOptions) => NSNode;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the child node cannot be found (NOT_FOUND_ERR) or cannot be replaced (HIERARCHY_REQUEST_ERR).
     * @governance none
     * @since 2015.2
     */
    replaceChild: (options: ReplaceChildOptions) => NSNode;
    /** @since 2015.2 */
    attributes: { [key: string]: Attribute };
    /** @since 2015.2 */
    baseURI: string;
    /** @since 2015.2 */
    childNodes: NSNode[];
    /** @since 2015.2 */
    firstChild: NSNode;
    /** @since 2015.2 */
    lastChild: NSNode;
    /** @since 2015.2 */
    localName: string;
    /** @since 2015.2 */
    namespaceURI: string;
    /** @since 2015.2 */
    nextSibling: NSNode;
    /** @since 2015.2 */
    nodeName: string;
    /** @since 2015.2 */
    nodeType: NodeType;
    /** @since 2015.2 */
    nodeValue: string;
    /** @since 2015.2 */
    ownerDocument: NSXMLDocument;
    /** @since 2015.2 */
    parentNode: NSNode;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node prefix cannot be edited (NAMESPACE_ERR).
     * @since 2015.2
     */
    prefix: string;
    /** @since 2015.2 */
    previousSibling: NSNode;
    /** @since 2015.2 */
    textContent: string;
}

interface AppendChildOptions {
    newChild: NSNode;
}

interface Attribute {
    name: string;
    ownerElement: {
        name: string;
        type: NodeType,
        value: string | null,
        textContent: string,
    }
    specified: boolean,
    value: string;
}

interface CloneNodeOptions {
    deep?: boolean;
}

interface CompareDocumentOptions {
    other: NSNode;
}

interface InsertBeforeOptions {
    newChild: NSNode;
    refChild: NSNode;
}

interface IsDefaultNamespaceOptions {
    namespaceURI: string;
}

interface LookupNamespaceURIOptions {
    prefix: string;
}

interface LookupPrefixOptions {
    namespaceURI: string;
}

interface RemoveChildOptions {
    oldChild: NSNode;
}

interface ReplaceChildOptions {
    newChild: NSNode;
    oldChild: NSNode;
}

/** @since 2015.2 */
interface NSAttr extends NSNode {
    /** @since 2015.2 */
    name: string;
    /** @since 2015.2 */
    ownerElement: NSElement;
    /** @since 2015.2 */
    specified: boolean;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute value cannot be set with the specified value.
     * @since 2015.2
     */
    value: string;
}

interface EscapeOptions {
    xmlText: string;
}

interface ValidateOptions {
    xml: NSXMLDocument;
    xsdFilePathOrId: number | string;
    importFolderPathOrId?: number | string;
}

/** @since 2015.2 */
interface NSElement extends NSNode {
    /**
     * @governance none
     * @since 2015.2
     */
    getAttribute: (options: GetAttributeOptions) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node with the specified namespace cannot be retrieved.
     * @governance none
     * @since 2015.2
     */
    getAttributeNodeNS: (options: GetAttributeNodeNSOpts) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified namespace cannot be retrieved.
     * @governance none
     * @since 2015.2
     */
    getAttributeNS: (options: GetAttributeNodeNSOpts) => string;
    /**
     * @governance none
     * @since 2015.2
     */
    getElementsByTagName: (options: CreateElementOptions) => NSElement[];
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the elements with the specified namespace cannot be retrieved.
     * @governance none
     * @since 2015.2
     */
    getElementsByTagNameNS: (options: GetAttributeNodeNSOpts) => NSElement[];
    /**
     * @governance none
     * @since 2015.2
     */
    hasAttribute: (options: GetAttributeOptions) => boolean;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the method is called with an illegal namespace value.
     * @governance none
     * @since 2015.2
     */
    hasAttributeNS: (options: GetAttributeNodeNSOpts) => boolean;
    /** @deprecated Not documented by Oracle (likely a typo). Use removeAttribute(options) instead. */
    removeAttributes: (options: GetAttributeOptions) => void;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node cannot be removed (NOT_FOUND_ERR).
     * @governance none
     * @since 2015.2
     */
    removeAttributeNode: (options: RemoveAttributeNodeOptions) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified namespace cannot be removed.
     * @governance none
     * @since 2015.2
     */
    removeAttributeNS: (options: GetAttributeNodeNSOpts) => void;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the value for the attribute cannot be set (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttribute: (options: SetAttributeOptions) => void;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node cannot be added (INUSE_ATTRIBUTE_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttributeNode: (options: SetAttributeNodeOpts) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node cannot be added (INUSE_ATTRIBUTE_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttributeNodeNS: (options: SetAttributeNodeOpts) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node with the specified value cannot be added (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttributeNS: (options: SetAttributeNSOpts) => void;
    /** @since 2015.2 */
    tagName: string;
}

interface GetAttributeOptions {
    name: string;
}

interface GetAttributeNodeNSOpts {
    namespaceURI: string;
    localName: string;
}

interface RemoveAttributeNodeOptions {
    oldAttr: NSAttr;
}

interface SetAttributeOptions {
    name: string;
    value: string;
}

interface SetAttributeNodeOpts {
    newAttr: NSAttr;
}

interface SetAttributeNSOpts {
    namespaceURI: string;
    qualifiedName: string;
    value: string;
}

/** @since 2015.2 */
interface NSXMLDocument extends NSNode {
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be adopted (NOT_FOUND_ERR).
     * @governance none
     * @since 2015.2
     */
    adoptNode: (options: AdoptNodeOptions) => NSNode;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified name or value cannot be created (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createAttribute: (options: CreateAttributeOptions) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified value cannot be created (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createAttributeNS: (options: CreateAttributeNSOpts) => NSAttr;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the CDATA section node cannot be created with the specified data.
     * @governance none
     * @since 2015.2
     */
    createCDATASection: (options: CDATAOptions) => NSNode;
    /** @deprecated Not documented by Oracle (likely a typo). Use createComment(options) instead. */
    createComments: (options: CreateCommentOptions) => NSNode;
    /**
     * @governance none
     * @since 2015.2
     */
    createDocumentFragment: () => NSNode;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the element cannot be created with the specified tagName value (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createElement: (options: CreateElementOptions) => NSElement;
    /**
     * @deprecated The method should not be used
     */
    createElements: (options: CreateElementOptions) => NSElement;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the element with the specified namespace cannot be created (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createElementNS: (options: CreateElementNSOptions) => NSElement;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the processing instruction node cannot be created with the specified target or data (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createProcessingInstruction: (options: CreateProcessingOpts) => NSNode;
    /**
     * @governance none
     * @since 2015.2
     */
    createTextNode: (options: CreateTextNodeOptions) => NSNode;
    /**
     * @governance none
     * @since 2015.2
     */
    getElementById: (options: GetElementByIdOptions) => NSElement;
    /**
     * @governance none
     * @since 2015.2
     */
    getElementsByTagName: (options: GetElementsByTagNameOptions) => NSElement[];
    /**
     * @governance none
     * @since 2015.2
     */
    getElementsByTagNameNS: (options: GetElementsByTagNameNSOpts) => NSElement[];
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be imported (NOT_SUPPORTED_ERR).
     * @governance none
     * @since 2015.2
     */
    importNode: (options: ImportNodeOptions) => NSNode;
    /** @since 2015.2 */
    doctype: NSElement;
    /** @since 2015.2 */
    documentElement: NSElement;
    /** @since 2015.2 */
    documentURI: string;
    /** @since 2015.2 */
    inputEncoding: string;
    /** @since 2015.2 */
    xmlEncoding: string;
    /** @since 2015.2 */
    xmlStandalone: boolean;
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if you attempt to edit the XML version for the document.
     * @since 2015.2
     */
    xmlVersion: string;
}

interface AdoptNodeOptions {
    source: NSNode;
}

interface CreateAttributeOptions {
    name: string;
    value?: string;
}

interface CreateAttributeNSOpts {
    namespaceURI: string;
    qualifiedName: string;
    value?: string;
}

interface CDATAOptions {
    data: string;
}

interface CreateCommentOptions {
    data: string;
}

interface CreateElementOptions {
    tagName: string;
}

interface CreateElementNSOptions {
    namespaceURI: string;
    qualifiedName: string;
}

interface CreateProcessingOpts {
    target: string;
    data: string;
}

interface CreateTextNodeOptions {
    data: string;
}

interface GetElementByIdOptions {
    elementId: string;
}

interface GetElementsByTagNameOptions {
    tagName: string;
}

interface GetElementsByTagNameNSOpts {
    namespaceURI: string;
    localName: string;
}

interface ImportNodeOptions {
    importedNode: NSNode;
    deep: boolean;
}

interface ParserFromStringOptions {
    text: string;
}

interface ParserToStringOptions {
    document: NSXMLDocument;
}

/** @since 2015.2 */
interface ParserObject {
    /**
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the input XML string is malformed.
     * @governance none
     * @since 2015.2
     */
    fromString: (options: ParserFromStringOptions) => NSXMLDocument;
    /**
     * @governance none
     * @since 2015.2
     */
    toString: (options: ParserToStringOptions) => string;
}

/** @since 2015.2 */
interface XPathObject {
    /**
     * @governance none
     * @since 2015.2
     */
    select: (options: SelectOptions) => NSNode[];
}

interface SelectOptions {
    node: NSNode;
    xpath: string;
}

export const Parser: ParserObject;
export const XPath: XPathObject;
export const Node: NSNode;
export const Document: NSXMLDocument;
export const Element: NSElement;
export const Attr: NSAttr;
/**
 * @governance none
 * @since 2015.2
 */
export function escape(options: EscapeOptions): string;
/**
 * @throws {SuiteScriptError} SSS_XML_DOES_NOT_CONFORM_TO_SCHEMA if the provided XML is invalid for the provided schema.
 * @throws {SuiteScriptError} SSS_INVALID_XML_SCHEMA_OR_DEPENDENCY if the schema is an incorrectly structured XSD or a dependent schema cannot be found.
 * @throws {SuiteScriptError} ILLEGAL_REQUEST_FOR_A_FILE_THAT_ISNT_DOWNLOADABLE if the user doesn't have permission to access the XSD file.
 * @governance none
 * @since 2015.2
 */
export function validate(options: ValidateOptions): void;
/** @since 2015.2 */
export enum NodeType {
    ATTRIBUTE_NODE = "ATTRIBUTE_NODE",
    CDATA_SECTION_NODE = "CDATA_SECTION_NODE",
    COMMENT_NODE = "COMMENT_NODE",
    DOCUMENT_FRAGMENT_NODE = "DOCUMENT_FRAGMENT_NODE",
    DOCUMENT_NODE = "DOCUMENT_NODE",
    DOCUMENT_TYPE_NODE = "DOCUMENT_TYPE_NODE",
    ELEMENT_NODE = "ELEMENT_NODE",
    ENTITY_NODE = "ENTITY_NODE",
    ENTITY_REFERENCE_NODE = "ENTITY_REFERENCE_NODE",
    NOTATION_NODE = "NOTATION_NODE",
    PROCESSING_INSTRUCTION_NODE = "PROCESSING_INSTRUCTION_NODE",
    TEXT_NODE = "TEXT_NODE",
}
