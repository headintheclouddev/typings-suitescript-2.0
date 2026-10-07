/**
 * Use the N/xml module to validate, parse, read, and modify XML documents.
 *
 * Supported script types: Client and server scripts (xml.validate(options) is server scripts only).
 * Members of this module have no governance cost.
 *
 * Note: Oracle documents several members as possibly returning null (for example, Node.firstChild, Node.lookupPrefix(options), Document.getElementById(options),
 * and Document.documentURI). They are not typed as nullable here, to avoid breaking existing code.
 */

/**
 * Represents a generic XML node in an XML document. A node can be a Document, Element, or Attribute.
 * @since 2015.2
 */
interface NSNode {
    /**
     * Appends a node after the last child node of a specific element node. Returns the new child node.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be appended (HIERARCHY_REQUEST_ERR).
     * @governance none
     * @since 2015.2
     */
    appendChild: (options: AppendChildOptions) => NSNode;
    /**
     * Creates a copy of a node. Returns the copied node.
     * @governance none
     * @since 2015.2
     */
    cloneNode: (options?: CloneNodeOptions) => NSNode;
    /**
     * Returns a number that reflects where two nodes are located, compared to each other.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if options.other is not an xml.Node.
     * @governance none
     * @since 2015.2
     */
    compareDocumentPosition: (options: CompareDocumentOptions) => number;
    /**
     * Returns true if the current node has attributes defined, or false otherwise.
     * @governance none
     * @since 2015.2
     */
    hasAttributes: () => boolean;
    /**
     * Returns true if the current node has child nodes, or false otherwise.
     * @governance none
     * @since 2015.2
     */
    hasChildNodes: () => boolean;
    /**
     * Inserts a new child node before an existing child node for the current node.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be inserted (HIERARCHY_REQUEST_ERR).
     * @governance none
     * @since 2015.2
     */
    insertBefore: (options: InsertBeforeOptions) => NSNode;
    /**
     * Returns true if the specified namespace URI is the default namespace for the current node, or false otherwise.
     * @governance none
     * @since 2015.2
     */
    isDefaultNamespace: (options: IsDefaultNamespaceOptions) => boolean;
    /**
     * Returns true if two nodes are equal, or false otherwise.
     * @governance none
     * @since 2015.2
     */
    isEqualNode: (options: CompareDocumentOptions) => boolean;
    /**
     * Returns true if two nodes reference the same object, or false otherwise.
     * @governance none
     * @since 2015.2
     */
    isSameNode: (options: CompareDocumentOptions) => boolean;
    /**
     * Returns the namespace URI that matches the specified namespace prefix, or null if the prefix does not have an associated URI.
     * @governance none
     * @since 2015.2
     */
    lookupNamespaceURI: (options: LookupNamespaceURIOptions) => string;
    /**
     * Returns the namespace prefix associated with the specified namespace URI, or null if the URI does not have an associated prefix.
     * @governance none
     * @since 2015.2
     */
    lookupPrefix: (options: LookupPrefixOptions) => string;
    /**
     * Puts all text nodes underneath a node, including attribute nodes, into a normal form.
     * @governance none
     * @since 2015.2
     */
    normalize: () => void;
    /**
     * Removes the specified child node.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be removed (NOT_FOUND_ERR).
     * @governance none
     * @since 2015.2
     */
    removeChild: (options: RemoveChildOptions) => NSNode;
    /**
     * Replaces a specific child node with another child node in a list of child nodes.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the child node cannot be found (NOT_FOUND_ERR) or cannot be replaced (HIERARCHY_REQUEST_ERR).
     * @governance none
     * @since 2015.2
     */
    replaceChild: (options: ReplaceChildOptions) => NSNode;
    /**
     * Key-value pairs for all attributes for an xml.Element node. Returns null for all other node types.
     * @since 2015.2
     */
    readonly attributes: Record<string, Attribute>;
    /**
     * Absolute base URI of a node or null if the URI cannot be determined. For client scripts, this property always returns null.
     * @since 2015.2
     */
    readonly baseURI: string;
    /**
     * Array of all child nodes of a node or an empty array if there are no child nodes.
     * @since 2015.2
     */
    childNodes: NSNode[];
    /**
     * First child node for a specific node or null if there are no child nodes.
     * @since 2015.2
     */
    firstChild: NSNode;
    /**
     * Last child node for a specific node or null if there is no last child node.
     * @since 2015.2
     */
    lastChild: NSNode;
    /**
     * The local part of the qualified name of a node.
     * @since 2015.2
     */
    readonly localName: string;
    /**
     * The namespace URI of a node or null if there is no namespace URI for the node.
     * @since 2015.2
     */
    readonly namespaceURI: string;
    /**
     * The next node in a node list or null if the current node is the last node.
     * @since 2015.2
     */
    readonly nextSibling: NSNode;
    /**
     * Name of a node, depending on the type. For example, for a node of type xml.Element, the name is the name of the element.
     * @since 2015.2
     */
    readonly nodeName: string;
    /**
     * The type of node defined as a value from the xml.NodeType enum.
     * @since 2015.2
     */
    nodeType: NodeType;
    /**
     * The value of a node, depending on its type. If the value is null, setting this value has no effect.
     * @since 2015.2
     */
    nodeValue: string;
    /**
     * The root element for a node as an xml.Document object.
     * @since 2015.2
     */
    ownerDocument: NSXMLDocument;
    /**
     * The parent node of a node.
     * @since 2015.2
     */
    parentNode: NSNode;
    /**
     * The namespace prefix of the node, or null if the node does not have a namespace.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node prefix cannot be edited (NAMESPACE_ERR).
     * @since 2015.2
     */
    prefix: string;
    /**
     * The previous node in a node list or null if the current node is the first node.
     * @since 2015.2
     */
    previousSibling: NSNode;
    /**
     * The textual content of a node and its descendants. If you set this value, any child nodes are replaced by a single text node with this value.
     * @since 2015.2
     */
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

/**
 * Represents an attribute node of an xml.Element object.
 * @since 2015.2
 */
interface NSAttr extends NSNode {
    /**
     * The name of the attribute.
     * @since 2015.2
     */
    readonly name: string;
    /**
     * The xml.Element object that is the parent of the xml.Attr object. Value is null if the attribute is not used by an element.
     * @since 2015.2
     */
    readonly ownerElement: NSElement;
    /**
     * Returns true if the attribute value is set in the parsed XML document, and false if it is a default value in a DTD or Schema.
     * @since 2015.2
     */
    specified: boolean;
    /**
     * Value of the attribute. Character and general entity references are replaced with their values.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute value cannot be set with the specified value.
     * @since 2015.2
     */
    value: string;
}

interface EscapeOptions {
    /** String being escaped. */
    xmlText: string;
}

interface ValidateOptions {
    /** The xml.Document object to validate. */
    xml: NSXMLDocument;
    /** The file ID or path to the XSD in the File Cabinet to validate the XML document against. */
    xsdFilePathOrId: number | string;
    /** The folder ID or path to a folder in the File Cabinet containing additional XSD schemas which are imported by the parent XSD. */
    importFolderPathOrId?: number | string;
}

/**
 * Represents an element in an XML document. Elements may contain attributes, other elements, or text.
 * @since 2015.2
 */
interface NSElement extends NSNode {
    /**
     * Returns the value of the specified attribute. Note: Oracle docs list both string (Members table) and xml.Attr (method page) as the return type.
     * @governance none
     * @since 2015.2
     */
    getAttribute: (options: GetAttributeOptions) => NSAttr;
    /**
     * Retrieves an attribute node by name.
     * @governance none
     * @since 2015.2
     */
    getAttributeNode: (options: GetAttributeOptions) => NSAttr;
    /**
     * Returns an attribute node with the specified namespace URI and local name. Note: Oracle lists the return type as string (members table and method page); typed as xml.Attr here.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node with the specified namespace cannot be retrieved.
     * @governance none
     * @since 2015.2
     */
    getAttributeNodeNS: (options: GetAttributeNodeNSOpts) => NSAttr;
    /**
     * Returns an attribute value with the specified namespace URI and local name. Note: Oracle's members table lists the return type as xml.Attr, but the method page lists string.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified namespace cannot be retrieved.
     * @governance none
     * @since 2015.2
     */
    getAttributeNS: (options: GetAttributeNodeNSOpts) => string;
    /**
     * Returns an array of descendant xml.Element objects with a specific tag name, in the order in which they appear in the XML document.
     * @governance none
     * @since 2015.2
     */
    getElementsByTagName: (options: CreateElementOptions) => NSElement[];
    /**
     * Returns an array of descendant xml.Element objects with a specific tag name and namespace, in the order in which they appear in the XML document.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the elements with the specified namespace cannot be retrieved.
     * @governance none
     * @since 2015.2
     */
    getElementsByTagNameNS: (options: GetAttributeNodeNSOpts) => NSElement[];
    /**
     * Returns true if the current element has an attribute with the specified name or if that attribute has a default value. Otherwise, returns false.
     * @governance none
     * @since 2015.2
     */
    hasAttribute: (options: GetAttributeOptions) => boolean;
    /**
     * Returns true if the current element has an attribute with the specified local name and namespace or if that attribute has a default value. Otherwise, returns false.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the method is called with an illegal namespace value.
     * @governance none
     * @since 2015.2
     */
    hasAttributeNS: (options: GetAttributeNodeNSOpts) => boolean;
    /**
     * Removes the attribute with the specified name.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified name cannot be removed.
     * @governance none
     * @since 2015.2
     */
    removeAttribute: (options: GetAttributeOptions) => void;
    /** @deprecated Not documented by Oracle (likely a typo). Use removeAttribute(options) instead. */
    removeAttributes: (options: GetAttributeOptions) => void;
    /**
     * Removes the attribute specified as an xml.Attr object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node cannot be removed (NOT_FOUND_ERR).
     * @governance none
     * @since 2015.2
     */
    removeAttributeNode: (options: RemoveAttributeNodeOptions) => NSAttr;
    /**
     * Removes the attribute with the specified namespace URI and local name.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified namespace cannot be removed.
     * @governance none
     * @since 2015.2
     */
    removeAttributeNS: (options: GetAttributeNodeNSOpts) => void;
    /**
     * Adds a new attribute with the specified name. If an attribute with that name is already present in the element, its value is changed.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the value for the attribute cannot be set (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttribute: (options: SetAttributeOptions) => void;
    /**
     * Adds the specified attribute node. If an attribute with the same name is already present in the element, it is replaced by the new one.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node cannot be added (INUSE_ATTRIBUTE_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttributeNode: (options: SetAttributeNodeOpts) => NSAttr;
    /**
     * Adds the specified attribute node. If an attribute with the same local name and namespace URI is already present in the element, it is replaced by the new one.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node cannot be added (INUSE_ATTRIBUTE_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttributeNodeNS: (options: SetAttributeNodeOpts) => NSAttr;
    /**
     * Adds a new attribute with the specified name and namespace URI. If an attribute with the same name and namespace URI is already present in the element, its value is changed.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute node with the specified value cannot be added (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    setAttributeNS: (options: SetAttributeNSOpts) => void;
    /**
     * The tag name of this xml.Element object.
     * @since 2015.2
     */
    readonly tagName: string;
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

/**
 * Represents an entire XML document.
 * @since 2015.2
 */
interface NSXMLDocument extends NSNode {
    /**
     * Attempts to adopt a node from another document to this document.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be adopted (NOT_FOUND_ERR).
     * @governance none
     * @since 2015.2
     */
    adoptNode: (options: AdoptNodeOptions) => NSNode;
    /**
     * Creates an attribute node of type ATTRIBUTE_NODE with the optional specified value and returns the new xml.Attr object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified name or value cannot be created (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createAttribute: (options: CreateAttributeOptions) => NSAttr;
    /**
     * Creates an attribute node of type ATTRIBUTE_NODE, with the specified namespace value and optional specified value, and returns the new xml.Attr object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the attribute with the specified value cannot be created (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createAttributeNS: (options: CreateAttributeNSOpts) => NSAttr;
    /**
     * Creates a CDATA section node with the specified data and returns the new xml.Node object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the CDATA section node cannot be created with the specified data.
     * @governance none
     * @since 2015.2
     */
    createCDATASection: (options: CDATAOptions) => NSNode;
    /**
     * Creates a Comment node of type COMMENT_NODE with the specified string.
     * @governance none
     * @since 2015.2
     */
    createComment: (options: CreateCommentOptions) => NSNode;
    /** @deprecated Not documented by Oracle (likely a typo). Use createComment(options) instead. */
    createComments: (options: CreateCommentOptions) => NSNode;
    /**
     * Creates a node of type DOCUMENT_FRAGMENT_NODE and returns the new xml.Node object.
     * @governance none
     * @since 2015.2
     */
    createDocumentFragment: () => NSNode;
    /**
     * Creates a new node of type ELEMENT_NODE with the specified name and returns the new xml.Element node.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the element cannot be created with the specified tagName value (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createElement: (options: CreateElementOptions) => NSElement;
    /**
     * @deprecated Not documented by Oracle (likely a typo). Use createElement(options) instead.
     */
    createElements: (options: CreateElementOptions) => NSElement;
    /**
     * Creates a new node of type ELEMENT_NODE with the specified namespace URI and name and returns the new xml.Element object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the element with the specified namespace cannot be created (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createElementNS: (options: CreateElementNSOptions) => NSElement;
    /**
     * Creates a new node of type PROCESSING_INSTRUCTION_NODE with the specified target and data and returns the new xml.Node object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the processing instruction node cannot be created with the specified target or data (INVALID_CHARACTER_ERR).
     * @governance none
     * @since 2015.2
     */
    createProcessingInstruction: (options: CreateProcessingOpts) => NSNode;
    /**
     * Creates a new text node and returns the new xml.Node object.
     * @governance none
     * @since 2015.2
     */
    createTextNode: (options: CreateTextNodeOptions) => NSNode;
    /**
     * Returns the element that has an ID attribute with the specified value as an xml.Element object. Returns null if no such element exists.
     * @governance none
     * @since 2015.2
     */
    getElementById: (options: GetElementByIdOptions) => NSElement;
    /**
     * Returns an array of xml.Element objects with a specific tag name, in the order in which they appear in the XML document.
     * @governance none
     * @since 2015.2
     */
    getElementsByTagName: (options: GetElementsByTagNameOptions) => NSElement[];
    /**
     * Returns an array of xml.Element objects with a specific tag name and namespace, in the order in which they appear in the XML document.
     * @governance none
     * @since 2015.2
     */
    getElementsByTagNameNS: (options: GetElementsByTagNameNSOpts) => NSElement[];
    /**
     * Imports a node from another document to this document. This method creates a new copy of the source node.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the node cannot be imported (NOT_SUPPORTED_ERR).
     * @governance none
     * @since 2015.2
     */
    importNode: (options: ImportNodeOptions) => NSNode;
    /**
     * Returns a node of type DOCUMENT_TYPE_NODE that represents the doctype of the XML document.
     * @since 2015.2
     */
    readonly doctype: NSElement;
    /**
     * Root node of the XML document.
     * @since 2015.2
     */
    readonly documentElement: NSElement;
    /**
     * Location of the document or null if undefined.
     * @since 2015.2
     */
    documentURI: string;
    /**
     * Encoding used for an XML document at the time the document was parsed.
     * @since 2015.2
     */
    readonly inputEncoding: string;
    /**
     * Part of the XML declaration, the XML encoding of the XML document.
     * @since 2015.2
     */
    readonly xmlEncoding: string;
    /**
     * Part of the XML declaration, returns true if the current XML document is standalone or returns false if it is not.
     * @since 2015.2
     */
    xmlStandalone: boolean;
    /**
     * Part of the XML declaration, the version number of the XML document.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if you attempt to edit the XML version for the document.
     * @since 2015.2
     */
    readonly xmlVersion: string;
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

/**
 * Encapsulates the functionality used by NetSuite to parse XML.
 * @since 2015.2
 */
interface ParserObject {
    /**
     * Parses a string into a W3C XML document object.
     * @throws {SuiteScriptError} SSS_XML_DOM_EXCEPTION if the input XML string is malformed.
     * @governance none
     * @since 2015.2
     */
    fromString: (options: ParserFromStringOptions) => NSXMLDocument;
    /**
     * Converts (serializes) an xml.Document object into a string.
     * @governance none
     * @since 2015.2
     */
    toString: (options: ParserToStringOptions) => string;
}

/**
 * Encapsulates the functionality used by NetSuite to run XPath expressions.
 * @since 2015.2
 */
interface XPathObject {
    /**
     * Selects an array of nodes from an XML document that match an XPath expression.
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
 * Prepares a string for use in XML by escaping XML markup, such as angle brackets, quotation marks, and ampersands.
 * Use this to escape untrusted values before including them in XML (for example, XML passed to render.xmlToPdf(options)).
 * @governance none
 * @since 2015.2
 */
export function escape(options: EscapeOptions): string;
/**
 * Validates an XML document against an XML Schema (XSD). Only XSD validation is supported.
 * Supported script types: Server scripts.
 * @throws {SuiteScriptError} SSS_XML_DOES_NOT_CONFORM_TO_SCHEMA if the provided XML is invalid for the provided schema.
 * @throws {SuiteScriptError} SSS_INVALID_XML_SCHEMA_OR_DEPENDENCY if the schema is an incorrectly structured XSD or a dependent schema cannot be found.
 * @throws {SuiteScriptError} ILLEGAL_REQUEST_FOR_A_FILE_THAT_ISNT_DOWNLOADABLE if the user doesn't have permission to access the XSD file.
 * @governance none
 * @since 2015.2
 */
export function validate(options: ValidateOptions): void;
/**
 * Holds the string values for the supported node types.
 * @since 2015.2
 */
export enum NodeType {
    ATTRIBUTE_NODE,
    CDATA_SECTION_NODE,
    COMMENT_NODE,
    DOCUMENT_FRAGMENT_NODE,
    DOCUMENT_NODE,
    DOCUMENT_TYPE_NODE,
    ELEMENT_NODE,
    ENTITY_NODE,
    ENTITY_REFERENCE_NODE,
    NOTATION_NODE,
    PROCESSING_INSTRUCTION_NODE,
    TEXT_NODE,
}
