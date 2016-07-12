
interface NS2_Client_FieldChangedContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
    fieldId: string;
    lineNum: string;
    columnNum: string;
}

interface NS2_Client_FieldChanged {
    (scriptContext?: NS2_Client_FieldChangedContext): void;
}

interface NS2_Client_LineInitContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_LineInit {
    (scriptContext?: NS2_Client_LineInitContext): void;
}

interface NS2_Client_PageInitContext {
    currentRecord: ClientCurrentRecord;
    mode: string;
}

interface NS2_Client_PageInit {
    (scriptContext?: NS2_Client_PageInitContext): void;
}

interface NS2_Client_PostSourcingContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
    fieldId: string;
}

interface NS2_Client_PostSourcing {
    (scriptContext?: NS2_Client_PostSourcingContext): void;
}

interface NS2_Client_SaveRecord {
    (scriptContext?: NS2_Client_SaveRecordContext): boolean;
}

interface NS2_Client_SaveRecordContext {
    currentRecord: ClientCurrentRecord;
}

interface NS2_Client_SublistChangedContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
    /**
     * Commit, etc.
     */
    operation: string;
}

interface NS2_Client_SublistChanged {
    (scriptContext?: NS2_Client_SublistChangedContext): void;
}

interface NS2_Client_ValidateDeleteContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_ValidateDelete {
    (scriptContext?: NS2_Client_ValidateDeleteContext): boolean;
}

interface NS2_Client_ValidateFieldContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
    fieldId: string;
    lineNum?: string;
    columnNum?: string;
}

interface NS2_Client_ValidateField {
    (scriptContext?: NS2_Client_ValidateFieldContext): boolean;
}

interface NS2_Client_ValidateInsertContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_ValidateInsert {
    (scriptContext?: NS2_Client_ValidateInsertContext): boolean;
}

interface NS2_Client_ValidateLineContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_ValidateLine {
    (scriptContext?: NS2_Client_ValidateLineContext): boolean;
}

interface NS2_UE_BeforeLoadContext {
    newRecord: Record;
    type: string;
    form: UIForm;
    UserEventType: NS2_UserEventTypes;
}

interface NS2_UE_BeforeSubmitContext {
    newRecord: Record;
    oldRecord: Record;
    type: string;
    UserEventType: NS2_UserEventTypes;
}

interface NS2_UE_AfterSubmitContext {
    newRecord: Record;
    oldRecord: Record;
    type: string;
    UserEventType: NS2_UserEventTypes;
}

interface NS2_UserEventTypes {
    APPROVE: string;
    CANCEL: string;
    CHANGEPASSWORD: string;
    COPY: string;
    CREATE: string;
    DELETE: string;
    DROPSHIP: string;
    EDIT: string;
    EDITFORECAST: string;
    EMAIL: string;
    MARKCOMPLETE: string;
    ORDERITEMS: string;
    PACK: string;
    PAYBILLS: string;
    PRINT: string;
    QUICKVIEW: string;
    REASSIGN: string;
    REJECT: string;
    SHIP: string;
    SPECIALORDER: string;
    TRANSFORM: string;
    VIEW: string;
    XEDIT: string;
}

interface NS2_ScheduledScriptContext {
    type: NS2_ScheduledInvocationTypes;
}

interface NS2_ScheduledInvocationTypes {
    SCHEDULED: string;
    ON_DEMAND: string;
    USER: string;
    ABORTED: string;
    SKIPPED: string;
}

interface NS2_MapReduce_MapContext {
    key: string;
    value: string;
    write: (key: string, value: string) => void;
}

interface NS2_MapReduce_ReduceContext {
    key: string;
    values: string[];
    write: (key: string, value: string[]) => void;
}

interface NS2_MapReduce_Iterator {
    each(callback: (key: string, value: string) => void): void;
}

interface NS2_MapReduce_IteratorContainer {
    iterator(): NS2_MapReduce_Iterator;
}

interface NS2_MapReduce_SummaryContext {
    dateCreated: Date;
    seconds: number;
    usage: number;
    concurrency: number;
    yields: number;
    inputSummary: NS2_MapReduce_InputSummary;
    mapSummary: NS2_MapReduce_MapSummary;
    reduceSummary: NS2_MapReduce_ReduceSummary;
    output: NS2_MapReduce_IteratorContainer;
}

interface NS2_MapReduce_InputSummary {
    dateCreated: Date;
    seconds: number;
    usage: number;
    error: string;
}

interface NS2_MapReduce_MapSummary {
    dateCreated: Date;
    seconds: number;
    usage: number;
    concurrency: number;
    yields: number;
    keys: NS2_MapReduce_IteratorContainer;
    errors: NS2_MapReduce_IteratorContainer;
}

interface NS2_MapReduce_ReduceSummary {
    dateCreated: Date;
    seconds: number;
    usage: number;
    concurrency: number;
    yields: number;
    keys: NS2_MapReduce_IteratorContainer;
    errors: NS2_MapReduce_IteratorContainer;
}

interface NS2_MapReduce_SummaryFunction {
    (summary: NS2_MapReduce_SummaryContext): void;
}

interface NS2_MassUpdate_Context {
    id: string;
    type: string;
}

interface NS2_Portlet_Form_Context {
    portlet: PortletForm;
}

interface NS2_Portlet_HTML_Context {
    portlet: PortletHTML;
}

interface NS2_Suitelet_Context {
    request: ServerRequest;
    response: ServerResponse;
}

/**
 * Almost like a full Record, except without things like save().
 */
interface ClientCurrentRecord {
    cancelLine(options: CancelCommitLineOptions): void;
    cancelLine(sublistId: string): void;
    commitLine(options: CancelCommitLineOptions): void;
    findMatrixSublistLineWithValue(options: any): number; // TODO: Document this?
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    getCurrentMatrixSublistValue(options: any): string; // TODO: Document this?
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    getCurrentSublistSubrecord(options: any): Record; // TODO: Document this?
    getCurrentSublistText(options: GetCurrentSublistValueOptions): string; // TODO: Document this?
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): string;
    getCurrentSublistValue(sublistId: string, fieldId: string): string;
    getField(options: GetFieldOptions): Field;
    // getFields(): string[];
    getLineCount(options: RecordGetLineCountOptions): number;
    getLineCount(sublistId: string): number;
    getMatrixHeaderCount(options: any): number; // TODO: Document this?
    getMatrixHeaderField(options: any): Field;  // TODO: Document this?
    getMatrixHeaderValue(options: any): string; // TODO: Document this?
    getMatrixSublistField(options: any): Field; // TODO: Document this?
    getMatrixSublistValue(options: any): string; // TODO: Document this?
    getSublist(options: any): UISublist; // TODO: Document this?
    getSublistField(options: GetSublistValueOptions): Field;
    // getSublistFields(options: RecordGetLineCountOptions): string[];
    // getSublistSubrecord(options: GetSublistValueOptions): Record;
    getSublistText(options: GetSublistValueOptions): string;
    getSublistValue(options: GetSublistValueOptions): string;
    getSublistValue(sublistId: string, fieldId: string, line: number): string;
    getSubRecord(options: GetFieldOptions): Record;
    getText(options: GetFieldOptions): string | string[];
    getText(fieldId: string): string | string[];
    getValue(options: GetFieldOptions): Date | number | string | string[] | boolean;
    getValue(fieldId: string): Date | number | string | string[] | boolean;
    hasCurrentSublistSubrecord(options: any): boolean; // TODO: Document this?
    hasSublistSubrecord(options: any): boolean; // TODO: Document this?
    hasSubrecord(options: any): boolean; // TODO: Document this?
    id: string;
    insertLine(options: InsertLineOptions): void;
    isDynamic: boolean;
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): void;
    removeLine(options: InsertLineOptions): void;
    // removeSublistSubrecord(options: GetSublistValueOptions): Record;
    removeSubrecord(options: RecordGetLineCountOptions): void;
    // save(): RecordSaveFunction;
    selectLine(options: SelectLineOptions): void;
    selectLine(sublistId: string, line: number): void;
    selectNewLine(options: RecordGetLineCountOptions): void;
    setCurrentMatrixSublistValue(options: any): void; // TODO: Document this?
    setCurrentSublistText(options: SetCurrentSublistTextOptions): void;
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): void;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: string | number): void;
    setMatrixHeaderValue(options: any): void; // TODO: Document this?
    setMatrisSublistValue(options: any): void; // TODO: Document this?
    // setSublistText(options: SetSublistTextOptions): Record;
    // setSublistValue(options: SetSublistValueOptions): Record;
    setText(options: SetFieldTextOptions): void;
    setText(fieldId: string, value: string): void;
    setValue(options: SetFieldOptions): void;
    setValue(fieldId: string, value: string): void;
    // toString(): string;
    type: string;
}

interface PortletForm { // Haven't validated that all these methods actually exist yet 
    // addButton(options: AddButtonOptions): UIButton;
    addCredentialField(options: AddCredentialFieldOptions): UIField;
    addField(options: AddFieldOptions): UIField;
    addFieldGroup(options: AddFieldGroupOptions): UIFieldGroup;
    addPageLink(options: AddPageLinkOptions): void;
    addResetButton(options: AddResetButtonOptions): UIButton;
    addSublist(options: AddSublistOptions): UISublist;
    addSubmitButton(label: string): void; // Not documented. Is there some other way to do this now?
    addSubtab(options: AddSubtabOptions): UITab;
    addTab(options: AddFieldGroupOptions): UITab;
    // clientScript(options: ClientScriptOptions): void;
    getButton(options: IDOptions): UIButton;
    getField(options: UIGetFieldOptions): UIField;
    getSublist(options: IDOptions): UISublist;
    getSubtab(options: IDOptions): UITab;
    getTabs(): UITab[];
    insertField(options: InsertFieldOptions): UIField;
    insertSublist(options: InsertSublistOptions): UISublist;
    insertSubtab(options: InsertSubtabOptions): UITab;
    insertTab(options: InsertSubtabOptions): UITab;
    // removeButton(options: IDOptions): void;
    setDefaultValues(options: SetDefaultValuesOptions): void;
    clientScriptFileId: number;
    title: string;
}

interface PortletHTML {
    html: string;
    title: string;
}
interface LogFunction {
    (title: string, details: string);
}

interface LogInterface {
    debug: LogFunction;
    audit: LogFunction;
    error: LogFunction;
    emergency: LogFunction;
}

declare var log: LogInterface;

interface UtilInterface {
    each: any;
    extend: any;
    isArray: (toTest: any) => boolean;
    isBoolean: (toTest: any) => boolean;
    isDate: (toTest: any) => boolean;
    isFunction: (toTest: any) => boolean;
    isNumber: (toTest: any) => boolean;
    isObject: (toTest: any) => boolean;
    isRegExp: (toTest: any) => boolean;
    isString: (toTest: any) => boolean;
    trim: (toTrim: string) => string;
}

declare var util: UtilInterface;

interface Window { // Fun undocumented NetSuite stuff
    /**
     * Gets the value of a URL parameter (undocumented NetSuite method).
     * @param {string} parameter The URL parameter to get the value of.
     */
    getParameter(parameter: string): string;
}

/**
 * Client method to submit the current record (undocumented NetSuite method).
 * @param {string} name The name of the save button to trigger.
 * @param {boolean} arg2 Not really sure what this parameter is used for.
 */
declare function NLDoMainFormButtonAction(name: string, arg2: boolean): void;

/**
 * Standard module loading function ala RequireJS.
 * Always available in SSv2 contexts.
 */
declare function require(modules: string[], callback?: (...any) => any);
// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/71c9d2336c0c802f89d530e07563e00b9ac07792/es6-promise/es6-promise.d.ts
interface Thenable<T> {
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
}

declare class Promise<T> implements Thenable<T> {
	/**
	 * If you call resolve in the body of the callback passed to the constructor,
	 * your promise is fulfilled with result object passed to resolve.
	 * If you call reject your promise is rejected with the object passed to reject.
	 * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
	 * Any errors thrown in the constructor callback will be implicitly passed to reject().
	 */
	constructor(callback: (resolve : (value?: T | Thenable<T>) => void, reject: (error?: any) => void) => void);

	/**
	 * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
	 * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
	 * Both callbacks have a single parameter , the fulfillment value or rejection reason.
	 * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
	 * If an error is thrown in the callback, the returned promise rejects with that error.
	 *
	 * @param onFulfilled called when/if "promise" resolves
	 * @param onRejected called when/if "promise" rejects
	 */
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Promise<U>;

	/**
	 * Sugar for promise.then(undefined, onRejected)
	 *
	 * @param onRejected called when/if "promise" rejects
	 */
	catch<U>(onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
}

declare namespace Promise {
	/**
	 * Make a new promise from the thenable.
	 * A thenable is promise-like in as far as it has a "then" method.
	 */
	function resolve<T>(value?: T | Thenable<T>): Promise<T>;

	/**
	 * Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
	 */
	function reject(error: any): Promise<any>;
	function reject<T>(error: T): Promise<T>;

	/**
	 * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
	 * the array passed to all can be a mixture of promise-like objects and other objects.
	 * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
	 */
	function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>, T9 | Thenable<T9>, T10 | Thenable<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
    function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>, T9 | Thenable<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
    function all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
    function all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
    function all<T1, T2, T3, T4, T5, T6>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;
    function all<T1, T2, T3, T4, T5>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>]): Promise<[T1, T2, T3, T4, T5]>;
    function all<T1, T2, T3, T4>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>]): Promise<[T1, T2, T3, T4]>;
    function all<T1, T2, T3>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>]): Promise<[T1, T2, T3]>;
    function all<T1, T2>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>]): Promise<[T1, T2]>;
    function all<T>(values: (T | Thenable<T>)[]): Promise<T[]>;

	/**
	 * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
	 */
	function race<T>(promises: (T | Thenable<T>)[]): Promise<T>;
}

declare module 'es6-promise' {
	var foo: typeof Promise; // Temp variable to reference Promise in local context
	namespace rsvp {
		export var Promise: typeof foo;
		export function polyfill(): void;
	}
	export = rsvp;
}/// <reference path="globals/es6-promise/index.d.ts" />
interface ChangePasswordOptions {
    currentPassword: string;
    newPassword: string;
}

interface ChangeEmailOptions {
    password: string;
    newEmail: string;
    onlyThisAccount?: boolean;
}
interface ConfigSetValueOptions {
    name: string;
    text: (string | string[]);
}

interface ConfigSetTextOptions {
    name: string;
    text: (string | string[]);
}

interface ConfigGetOptions {
    name: string;
}

interface Config {
    names: string;
    type: string;
    /**
     * Description TBA (5/9/2016)
     */
    getField(options: ConfigGetOptions): Object;

    getText(options: ConfigGetOptions): (string | string[]);
    /**
     * Description TBA (5/9/2016)
     */
    getValue(options: ConfigGetOptions): (string | string[] | boolean);
    /**
     * Description TBA (5/9/2016)
     */
    save(): void;
    /**
     * Description TBA (5/9/2016)
     */
    setText(options: ConfigSetTextOptions): Config;
    /**
     * Description TBA (5/9/2016)
     */
    setValue(options: ConfigSetValueOptions): Config;
}

interface ConfigTypes {
    USER_PREFERENCES: string;
    COMPANY_INFORMATION: string;
    COMPANY_PREFERENCES: string;
    ACCOUNTING_PREFERENCES: string;
    ACCOUNTING_PERIODS: string;
    TAX_PERIODS: string;
    FEATURES: string;
}

interface LoadOptions {
    /**
     * Use the config.Type enumeration.
     */
    type: string;
}
interface ConvertOptions {
    string: string;
    inputEncoding: string;
    outputEncoding: string;
}

interface Encoding {
    UTF_8: string;
    BASE_16: string;
    BASE_32: string;
    BASE_64: string;
    BASE_64_URL_SAFE: string;
    HEX: string;
}
/// <reference path="encode.d.ts" />

/**
 * Encapsulates a cipher.
 */
interface Cipher {
  /**
   * Description TBA (5/9/2016)
   */
  final(options: FinalOptions): CipherPayload;
  /**
   * Description TBA (5/9/2016)
   */
  update(options: UpdateOptions): void;
}
/**
 * Encapsulates a cipher payload.
 */
interface CipherPayload {
  encoding: string;
  iv: number;
}

interface Decipher {
  /**
   * Description TBA (5/9/2016)
   */
  final(options: FinalOptions): string;
  /**
   * Method used to update decipher data with the specified encoding.
   */
  update(options: UpdateOptions): void;
}

interface Hash {
  /**
   * Calculates the digest of the data to be hashed.
   */
  digest(options: FinalOptions): string;
  /**
   * Method used to update hash data with the encoding specified.
   */
  update(options: UpdateOptions): void;
}

interface Hmac {
  /**
   * Gets the computed digest.
   */
  digest(options: FinalOptions): string;
  /**
   * Method used to update the hmac data with the encoding specified.
   */
  update(options: UpdateOptions): void;
}

interface SecretKey {
  guid: string;
  encoding: string;
}

interface FinalOptions {
  /**
   * The output encoding for a crypto.CipherPayload object.
   */
  outputEncoding: string;
}

interface UpdateOptions {
  /** 
   * The cipher data to be updated.
   */
  input: string;
  /**
   * The input encoding using encode.Encoding enum. Default: UTF_8.
   */
  inputEncoding?: Encoding;
}

interface CreateCipherOptions {
  /**
   * The hash algorithm. Set the value using thecrypto.Hash enum.
   */
  algorithm: HashAlgTypes;
  /**
   * The crypto.SecretKey object.
   */
  key: SecretKey;
  /**
   * The encryption mode for the cipher block.
   */
  blockCipherMode: string;
  /**
   * The padding for the cipher. Set the value using the crypto.Padding enum.
   */
  padding: PaddingTypes;
}

interface CreateDecipherOptions {
  /**
   * The hash algorithm. Set by the crypto.Hash enum.
   */
  algorithm: HashAlgTypes;
  /**
   * The crypto.SecretKey object.
   */
  key: SecretKey;
  /**
   * Description TBA (5/9/2016)
   */
  blockCipherMode: string;
  /**
   * Description TBA (5/9/2016)
   */
  padding: PaddingTypes;
  /**
   * Description TBA (5/9/2016)
   */
  iv: string;
}

interface CreateHashOptions {
  /**
   * The hash algorithm. Set by the crypto.Hash enum.
   */
  algorithm: HashAlgTypes;
}

interface CreateHmacOptions {
  /**
   * The hash algorithm. Set by the crypto.Hash enum.
   */
  algorithm: HashAlgTypes;
  /**
   * The crypto.SecretKey object.
   */
  key: SecretKey;
}

interface CreateSecretKeyOptions {
  guid: string;
  encoding: string;
}

interface EncryptionAlgTypes {
  AES: string;
}

interface HashAlgTypes {
  SHA1: string;
  SHA256: string;
  SHA512: string;
  MD5: string;
}

interface PaddingTypes {
  NoPadding: string;
  PKCS5Padding: string;
}
interface ExchangeRateOptions {
    /**
     * The point in time to evaluate currency.
     */
    date?: number | string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting from.
     */
    source: number | string;
    /**
     * The internal ID or three-letter ISO code for the currency you are converting to.
     */
    target: number | string;
}
declare module 'SSv2-Globals/ss2.0-types/currentRecord' {
	/* This is an undocumented module.  Use this when you have a UI button in a 
	   client View mode, as these are the only attributes of the current record
	   that are available in View context.
	   If you are working in create/edit mode, use the ClientCurrentRecord object
	   defined in scriptTypes/scriptEntry.d.ts.  It's more similar to to a full
	   Record object. */
	export interface CurrentRecordModule {
	    id: string;
	    type: string;
	}

	export default CurrentRecordModule;
}
interface NSFile {
    description: string;
    encoding: string;
    fileType: string;
    folder: number;
    id: number;
    isInactive: boolean;
    isOnline: boolean;
    isText: boolean;
    name: string;
    path: string;
    size: string;
    url: string;
    save: () => number;
    getContents: () => string;
}

interface FileType {
    AUTOCAD: string;
    BMPIMAGE: string;
    CSV: string;
    EXCEL: string;
    FLASH: string;
    FREEMARKER: string;
    GIFIMAGE: string;
    GZIP: string;
    HTMLDOC: string;
    ICON: string;
    JAVASCRIPT: string;
    JPGIMAGE: string;
    JSON: string;
    MESSAGERFC: string;
    MP3: string;
    MPEGMOVIE: string;
    MSPROJECT: string;
    PDF: string;
    PJPGIMAGE: string;
    PLAINTEXT: string;
    PNGIMAGE: string;
    POSTSCRIPT: string;
    POWERPOINT: string;
    QUICKTIME: string;
    RTF: string;
    SMS: string;
    STYLESHEET: string;
    TAR: string;
    TIFFIMAGE: string;
    VISIO: string;
    WEBAPPPAGE: string;
    WEBAPPSCRIPT: string;
    WORD: string;
    XMLDOC: string;
    XSD: string;
    ZIP: string;
}

interface FileEncoding {
    UTF8: string;
    WINDOWS_1252: string;
    ISO_8859_1: string;
    GB18030: string;
    SHIFT_JIS: string;
    MAC_ROMAN: string;
    GB2312: string;
    BIG5: string;
}

interface FileLoadOptions {
    /** 
     * Internal ID of the file as a number or a string, or the relative file path to the file in the file cabinet.
     */
    id: (number | string);
}

interface FileDeleteOptions {
    /**
     * Internal ID of the file.
     */
    id: (number | string);
}

interface FileCreateOptions {
    /**
     * The file name.
     */
    name: string;
    /**
     * The file type.
     */
    fileType: string;
    /**
     * The file content.
     */
    contents: string;
    /**
     * The internal ID of the folder used when the file is saved.
     */
    folder?: number
}
/// <reference path="../typings/index.d.ts" />
/// <reference path="file.d.ts" />

interface SendOptions {
    author: number;
    recipients: number[] | string[];
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    attachments?: NSFile[];
    relatedRecords?: RelatedRecordTypes;
    isInternalOnly?: boolean;
}

interface RelatedRecordTypes {
    transactionId?: number;
    activityId?: number;
    entityId?: number;
    customRecord?: CustomRecordObject;
}

interface CustomRecordObject {
    id: number;
    recordType: string;
}

interface SendCampaignOptions {
    campaignEventId: number;
    recipientId: number;
}

interface EmailSendFunction {
    (options: SendOptions): void;
    promise(options: SendOptions): Promise<void>;
}

interface EmailSendCampaignFunction {
    (options: SendCampaignOptions): number;
    promise(options: SendCampaignOptions): Promise<number>;
}
interface SuiteScriptError {
    toString(): string;
    id: string;
    message: string;
    name: string;
    stack: string[];
}

interface UserEventError {
    toString(): string;
    eventType: EventType;
    id: string;
    message: string;
    name: string;
    recordId: string;
    stack: string[];
}

interface EventType {
    beforeLoad: string;
    beforeSubmit: string;
    afterSubmit: string;
}

interface CreateOptions {
    name: string;
    message: string;
    notifyOff?: boolean;
}
interface FormatOptions {
    /**
     * The input data to format.
     */
    value: Date | string | number;
    /**
     * The field type (for example, DATE, CURRENCY, INTEGER). Set using the format.Type enum.
     */
    type: string;
}

interface FormatDateTimeOptions {
    /**
     * The Date Object being converted into a string.
     * If parsing a string to a timezone, the string must include seconds.
     */
    value: Date | string;
    /**
     * The field type (either DATETIME or DATETIMETX). Set using the format.Type enum.
     */
    type: string;
    /**
     * -optional- The time zone specified for the returned string. Set using the format.Timezone enum or key.
     * If a time zone is not specified, the time zone is set based on user preference.
     * If the time zone is invalid, the time zone is set to GMT.
     */
    timezone?: number;
}

interface FormatType {
    CCEXPDATE: string;
    CCNUMBER: string;
    CCVALIDFROM: string;
    CHECKBOX: string;
    COLOR: string;
    CURRENCY: string;
    CURRENCY2: string;
    DATE: string;
    DATETIME: string;
    DATETIMETZ: string;
    FLOAT: string;
    FULLPHONE: string;
    FUNCTION: string;
    IDENTIFIER: string;
    INTEGER: string;
    MMYYDATE: string;
    NONNEGCURRENCY: string;
    NONNEGFLOAT: string;
    PERCENT: string;
    PHONE: string;
    POSCURRENCY: string;
    POSFLOAT: string;
    POSINTEGER: string;
    RATE: string;
    RATEHIGHPRECISION: string;
    TIME: string;
    TIMEOFDAY: string;
    TIMETRACK: string;
    URL: string;
}

interface Timezone {
    ETC_GMT_PLUS_12: number;
    PACIFIC_SAMOA: number;
    PACIFIC_HONOLULU: number;
    AMERICA_ANCHORAGE: number;
    AMERICA_LOS_ANGELES: number;
    AMERICA_TIJUANA: number;
    AMERICA_DENVER: number;
    AMERICA_PHOENIX: number;
    AMERICA_CHIHUAHUA: number;
    AMERICA_CHICAGO: number;
    AMERICA_REGINA: number;
    AMERICA_GUATEMALA: number;
    AMERICA_MEXICO_CITY: number;
    AMERICA_NEW_YORK: number;
    US_EAST_INDIANA: number;
    AMERICA_BOGOTA: number;
    AMERICA_CARACAS: number;
    AMERICA_HALIFAX: number;
    AMERICA_LA_PAZ: number;
    AMERICA_MANAUS: number;
    AMERICA_SANTIAGO: number;
    AMERICA_ST_JOHNS: number;
    AMERICA_SAO_PAULO: number;
    AMERICA_BUENOS_AIRES: number;
    ETC_GMT_PLUS_3: number;
    AMERICA_GODTHAB: number;
    AMERICA_MONTEVIDEO: number;
    AMERICA_NORONHA: number;
    ETC_GMT_PLUS_1: number;
    ATLANTIC_AZORES: number;
    EUROPE_LONDON: number;
    GMT: number;
    ATLANTIC_REYKJAVIK: number;
    EUROPE_WARSAW: number;
    EUROPE_PARIS: number;
    ETC_GMT_MINUS_1: number;
    EUROPE_AMSTERDAM: number;
    EUROPE_BUDAPEST: number;
    AFRICA_CAIRO: number;
    EUROPE_ISTANBUL: number;
    ASIA_JERUSALEM: number;
    ASIA_AMMAN: number;
    ASIA_BEIRUT: number;
    AFRICA_JOHANNESBURG: number;
    EUROPE_KIEV: number;
    EUROPE_MINSK: number;
    AFRICA_WINDHOEK: number;
    ASIA_RIYADH: number;
    EUROPE_MOSCOW: number;
    ASIA_BAGHDAD: number;
    AFRICA_NAIROBI: number;
    ASIA_TEHRAN: number;
    ASIA_MUSCAT: number;
    ASIA_BAKU: number;
    ASIA_YEREVAN: number;
    ETC_GMT_MINUS_3: number;
    ASIA_KABUL: number;
    ASIA_KARACHI: number;
    ASIA_YEKATERINBURG: number;
    ASIA_TASHKENT: number;
    ASIA_CALCUTTA: number;
    ASIA_KATMANDU: number;
    ASIA_ALMATY: number;
    ASIA_DHAKA: number;
    ASIA_RANGOON: number;
    ASIA_BANGKOK: number;
    ASIA_KRASNOYARSK: number;
    ASIA_HONG_KONG: number;
    ASIA_KUALA_LUMPUR: number;
    ASIA_TAIPEI: number;
    AUSTRALIA_PERTH: number;
    ASIA_IRKUTSK: number;
    ASIA_MANILA: number;
    ASIA_SEOUL: number;
    ASIA_TOKYO: number;
    ASIA_YAKUTSK: number;
    AUSTRALIA_DARWIN: number;
    AUSTRALIA_ADELAIDE: number;
    AUSTRALIA_SYDNEY: number;
    AUSTRALIA_BRISBANE: number;
    AUSTRALIA_HOBART: number;
    PACIFIC_GUAM: number;
    ASIA_VLADIVOSTOK: number;
    ASIA_MAGADAN: number;
    PACIFIC_KWAJALEIN: number;
    PACIFIC_AUCKLAND: number;
    PACIFIC_TONGATAPU: number;
}
interface AddButtonOptions {
    id: string;
    label: string;
    functionName?: string;
}

interface AddCredentialFieldOptions {
    id: string;
    label: string;
    restrictToCurrentUser?: boolean;
    restrictToDomains?: string | string[];
    restrictToScriptId?: string;
    tab?: string;
}

interface AddFieldGroupOptions {
    /**
     * An internal ID for the field group.
     */
    id: string;
    /**
     * The label for this field group.
     */
    label: string;
    /**
     * The internal ID of the tab to add the field group to. By default, the field group is added to the main section of the form.
     */
    tab?: string;
}

interface AddFieldOptions {
    /**
     * The internal ID of the field.
     * The internal ID must be in lowercase, contain no spaces, and include
     * the prefix custpage if you are adding the field to an existing page. For
     * example, if you add a field that appears as Purchase Details, the field
     * internal ID should be something similar to custpage_purchasedetails or
     * custpage_purchase_details.
     */
    id: string;
    /**
     * The label for this field.
     */
    label: string;
    /**
     * The field type for the field. Use the serverWidget.FieldType enum to define the field type.
     */
    type: string;
    /**
     * The internalId or scriptId of the source list for this field if it is a select (List/Record) or multi-select field.
     * Note: For radio fields only, the source parameter must contain the internal ID for the field.
     * For more information about working with radio buttons, see "Working with Radio Buttons" in Help.
     */
    source?: string;
    /**
     * The internal ID of the tab or field group to add the field to.
     * By default, the field is added to the main section of the form.
     */
    container?: string;
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
/*
 interface ClientScriptOptions {
    script: string; // The scriptId or internal ID
}
*/
interface CreateAssistantOptions {
    /**
     * The title of the form.
     */
    title: string;
    /**
     * Indicates whether to hide the navigation bar menu.
     * By default, set to false. The header appears in the top-right corner on the form.
     * If set to true, the header on the assistant is hidden from view.
     */
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

interface GetSublistFieldIdsOptions {
    group: string;
}

interface UIGetSublistValueOptions {
    group: string;
    id: number;
    line: string;
}

interface InsertFieldOptions {
    field: string;
    nextfield: string;
}

interface InsertSublistOptions {
    sublist: string;
    nextsublist: string;
}

interface InsertSubtabOptions {
    subtab: string;
    nextsubtab: string;
}

interface SetDefaultValuesOptions {
    values: Object;
}

interface SetHelpTextOptions {
    help: string;
    showInlineForAssistant?: boolean;
}

interface SublistGetSublistValueOptions {
    id: string;
    line: number;
}

interface SublistSetSublistValueOptions {
    id: string;
    line: number;
    value: string;
}

interface SetSplashOptions {
    title: string,
    text1: string,
    text2?: string
}

interface UpdateBreakTypeOptions {
    breakType: string;
}

interface UpdateDisplaySizeOptions {
    height: number;
    width: number;
}

interface UpdateDisplayTypeOptions {
    displayType: number;
}

interface UpdateLayoutTypeOptions {
    layoutType: string;
}

interface AssistantSubmitActions {
    BACK: string;
    CANCEL: string;
    FINISH: string;
    JUMP: string;
    NEXT: string;
}

interface FieldBreakTypes {
    NONE: string;
    STARTCOL: string;
    STARTROW: string;
}

interface FieldDisplayTypes {
    DISABLED: number;
    ENTRY: number;
    HIDDEN: number;
    INLINE: number;
    NORMAL: number;
    READONLY: number;
}

interface FieldLayoutTypes {
    ENDROW: string;
    NORMAL: string;
    MIDROW: string;
    OUTSIDE: string;
    OUTSIDEBELOW: string;
    OUTSIDEABOVE: string;
    STARTROW: string;
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

interface FormPageLinkTypes {
    BREADCRUMB: string;
    CROSSLINK: string;
}

interface LayoutJustifications {
    CENTER: string;
    LEFT: string;
    RIGHT: string;
}

interface ListStyles {
    GRID: string;
    REPORT: string;
    PLAIN: string;
    NORMAL: string;
}

interface SublistDisplayTypes {
    HIDDEN: string;
    NORMAL: string;
}

interface SublistTypes {
    EDITOR: string;
    INLINEEDITOR: string;
    LIST: string;
    STATICLIST: string;
}

interface Assistant {
    addField(options: AddFieldOptions): UIField;
    addFieldGroup(options: AddFieldGroupOptions): UIFieldGroup;
    addStep(options: AddFieldGroupOptions): AssistantStep;
    addSublist(options: AddSublistOptions): UISublist;
    // clientScript(options: ClientScriptOptions): void;
    getField(options: IDOptions): UIField;
    getFieldGroup(options: IDOptions): UIFieldGroup;
    getFieldGroupIds(): string[];
    getFieldIds(): string; // not string[]?? may need testing.
    getLastAction(): AssistantSubmitActions;
    getLastStep(): AssistantStep;
    getNextStep(): AssistantStep;
    getStep(options: IDOptions): AssistantStep;
    getStepCount(): number;
    getSteps(): AssistantStep[];
    getSublist(options: IDOptions): UISublist;
    getSublistIds(): string[];
    hasErrorHtml(): boolean;
    isFinished(): boolean;
    sendRedirect(): void;
    setSplash(options: SetSplashOptions): void;
    clientScriptFileId: number;
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
    getFieldIds(): string[];
    getSublistFieldIds(options: GetSublistFieldIdsOptions): string[];
    getLineCount(options: GetSublistFieldIdsOptions): number;
    getSubmittedSublistIds(): string[];
    getSublistValue(options: UIGetSublistValueOptions): string;
    getValue(options: IDOptions): string | string[];
    helpText: string;
    id: string;
    label: string;
    stepNumber: number;
}

interface UIButton {
    isDisabled: boolean;
    isHidden: boolean;
    label: string;
}

interface UIField {
    addSelectOption(options: AddSelectOptionOptions): void;
    getSelectOptions(options: GetSelectOptionsOpts): Object[];
    setHelpText(options: SetHelpTextOptions): UIField;
    updateDisplaySize(options: UpdateDisplaySizeOptions): UIField;
    updateDisplayType(options: UpdateDisplayTypeOptions): UIField;
    updateBreakType(options: UpdateBreakTypeOptions): UIField;
    updateLayoutType(options: UpdateLayoutTypeOptions): UIField;
    alias: string;
    // breakType: string; // no longer documented as of 2016.1
    defaultValue: string;
    // displaySize: number; // no longer documented as of 2016.1
    // displayType: string;  // no longer documented as of 2016.1
    id: string;
    isMandatory: boolean;
    label: string;
    // layoutType: string; // This isn't a thing anymore, as of 2016.1
    linkText: string;
    maxLength: number;
    padding: number;
    richTextHeight: number;
    richTextWidth: number;
    type: string;
}

interface UIFieldGroup {
    isBorderHidden: boolean;
    isCollapsible: boolean;
    isCollapsed: boolean;
    isSingleColumn: boolean;
    label: string;
}

interface UIForm {
    addButton(options: AddButtonOptions): UIButton;
    addCredentialField(options: AddCredentialFieldOptions): UIField;
    /**
     * Adds a field to a form.
     */
    addField(options: AddFieldOptions): UIField;
    /**
     * Adds a group of fields to a form.
     */
    addFieldGroup(options: AddFieldGroupOptions): UIFieldGroup;
    addPageLink(options: AddPageLinkOptions): void;
    addResetButton(options: AddResetButtonOptions): UIButton;
    addSublist(options: AddSublistOptions): UISublist;
    addSubmitButton(label: string): void; // Not documented. Is there some other way to do this now?
    addSubtab(options: AddSubtabOptions): UITab;
    addTab(options: AddFieldGroupOptions): UITab;
    // clientScript(options: ClientScriptOptions): void;
    getButton(options: IDOptions): UIButton;
    getField(options: UIGetFieldOptions): UIField;
    getSublist(options: IDOptions): UISublist;
    getSubtab(options: IDOptions): UITab;
    getTabs(): UITab[];
    insertField(options: InsertFieldOptions): UIField;
    insertSublist(options: InsertSublistOptions): UISublist;
    insertSubtab(options: InsertSubtabOptions): UITab;
    insertTab(options: InsertSubtabOptions): UITab;
    removeButton(options: IDOptions): void;
    setDefaultValues(options: SetDefaultValuesOptions): void;
    /**
     * The file cabinet ID of client script file to be used in this form.
     */
    clientScriptFileId: number;
    title: string;
}

interface UISublist {
    addButton(options: AddButtonOptions): UIButton;
    addField(options: AddFieldOptions): UIField;
    addMarkAllButtons(): UIButton;
    addRefreshButton(): UIButton;
    getSublistValue(options: SublistGetSublistValueOptions): string;
    setSublistValue(options: SublistSetSublistValueOptions): string;
    displayType: string;
    helpText: string;
    label: string;
    lineCount: number;
    totallingFieldId: string;
    uniqueFieldId: string;
}

interface UITab {
    helpText: string;
    label: string;
}
/// <reference path="ui/serverWidget.d.ts" />

interface RecordSaveFunction {
    (options?: SubmitConfig): number;
    promise(options?: SubmitConfig): Promise<number>;
}

interface AttachOptions {
    record: AttachRecordOptions;
    to: AttachRecordOptions;
    attributes?: Object;
}

interface AttachRecordOptions {
    type: string;
    id: number | string;
}

interface CancelCommitLineOptions {
    sublistId: string;
}

interface CopyLoadOptions {
    type: string;
    id: number | string;
    isDynamic?: boolean;
    defaultValue?: Object;
}

interface DetachOptions {
    record: AttachRecordOptions;
    from: AttachRecordOptions;
    attributes?: Object;
}

interface FindSublistLineWithValueOptions {
    sublistId: string;
    fieldId: string;
    value: any;
}

interface GetCurrentSublistValueOptions {
    sublistId: string;
    fieldId: string;
}

interface GetFieldOptions {
    fieldId: string;
}

interface RecordGetLineCountOptions {
    sublistId: string;
}

interface GetSublistValueOptions {
    sublistId: string;
    fieldId: string;
    line: number;
}

interface InsertLineOptions {
    sublistId: string,
    line: number,
    ignoreRecalc?: boolean // Default is false
}

interface SelectLineOptions {
    sublistId: string;
    line: number;
}

interface SetCurrentSublistValueOptions {
    sublistId: string;
    fieldId: string;
    value: boolean | string | number | Date;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetCurrentSublistTextOptions {
    sublistId: string;
    fieldId: string;
    text: number | Date | string | string[];
    ignoreFieldChange?: boolean; // Default false
}

interface SetFieldOptions {
    fieldId: string;
    value: any;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetFieldTextOptions {
    fieldId: string;
    text: any;
    ignoreFieldChange?: boolean;
    fireSlavingSync?: boolean;
}

interface SetSublistTextOptions {
    sublistId: string;
    fieldId: string;
    line: number;
    text: string;
}

interface SetSublistValueOptions {
    sublistId: string;
    fieldId: string;
    line: number;
    value: boolean | number | Date | string | string[];
}

interface Field {
    getSelectOptions(options: GetSelectOptionsOpts): Object[];
    toString(): string;
    label: string;
    id: string;
    sublistId: string;
    type: string;
    isMandatory: boolean;
    isDisabled: boolean;
    isPopup: boolean;
    isDisplay: boolean;
    isVisible: boolean;
    isReadOnly: boolean;
}

interface Record {
    cancelLine(options: CancelCommitLineOptions): void;
    cancelLine(sublistId: string): void;
    commitLine(options: CancelCommitLineOptions): Record;
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): string;
    getCurrentSublistValue(sublistId: string, fieldId: string): string;
    getField(options: GetFieldOptions): Field;
    getFields(): string[];
    getLineCount(options: RecordGetLineCountOptions): number;
    getLineCount(sublistId: string): number;
    getSublistField(options: GetSublistValueOptions): Field;
    getSublistFields(options: RecordGetLineCountOptions): string[];
    getSublistSubrecord(options: GetSublistValueOptions): Record;
    getSublistText(options: GetSublistValueOptions): string;
    getSublistValue(options: GetSublistValueOptions): boolean | string;
    getSublistValue(sublistId: string, fieldId: string, line: number): boolean | string;
    getSubRecord(options: GetFieldOptions): Record;
    getText(options: GetFieldOptions): string | string[];
    getText(fieldId: string): string | string[];
    getValue(options: GetFieldOptions): Date | number | string | string[] | boolean;
    getValue(fieldId: string): Date | number | string | string[] | boolean;
    insertLine(options: InsertLineOptions): Record;
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): Record;
    removeLine(options: InsertLineOptions): Record;
    removeSublistSubrecord(options: GetSublistValueOptions): Record;
    removeSubrecord(options: RecordGetLineCountOptions): Record;
    save: RecordSaveFunction;
    selectLine(options: SelectLineOptions): Record;
    selectLine(sublistId: string, line: number): Record;
    selectNewLine(options: RecordGetLineCountOptions): Record;
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): Record;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: string | number | boolean | Date): Record;
    setCurrentSublistText(options: SetCurrentSublistTextOptions): Record;
    setSublistText(options: SetSublistTextOptions): Record;
    setSublistValue(options: SetSublistValueOptions): Record;
    setText(options: SetFieldTextOptions): Record;
    setText(fieldId: string, value: string): Record;
    setValue(options: SetFieldOptions): Record;
    setValue(fieldId: string, value: string | string[] | number | boolean | Date): Record;
    toString(): string;
    id: string;
    isDynamic: boolean;
    type: string;
}

interface RecordTypes {
    ACCOUNT: string;
    ACCOUNTING_BOOK: string;
    ADDRESS: string;
    AMORTIZATION_SCHEDULE: string;
    AMORTIZATION_TEMPLATE: string;
    ACTIVITY: string;
    ASSEMBLY_BUILD: string;
    ASSEMBLY_UNBUILD: string;
    BILLING_CLASS: string;
    BILLING_SCHEDULE: string;
    BIN: string;
    BIN_PUTAWAY_WORKSHEET: string;
    BIN_TRANSFER: string;
    BLANKET_PURCHASE_ORDER: string;
    BUILD_ASSEMBLY: string;
    CAMPAIGN: string;
    CAMPAIGN_TEMPLATE: string;
    CASE: string;
    CASH_REFUND: string;
    CASH_SALE: string;
    CHARGE: string;
    CHECK: string;
    CLASS: string;
    COMPETITOR: string;
    CONTACT: string;
    COUPON_CODE: string;
    CREDIT_MEMO: string;
    CURRENCY: string;
    CUSTOMER: string;
    CUSTOMER_CATEGORY: string;
    CUSTOMER_DEPOSIT: string;
    CUSTOMER_PAYMENT: string;
    CUSTOMER_REFUND: string;
    CUSTOM_LIST: string;
    DEPARTMENT: string;
    DEPOSIT: string;
    DEPOSIT_APPLICATION: string;
    DESCRIPTION: string;
    DISCOUNT: string;
    DOWNLOAD_ITEM: string;
    EMAIL_TEMPLATE: string;
    EMPLOYEE: string;
    ENTITY: string;
    ESTIMATE_QUOTE: string;
    EVENT: string;
    EXPENSE_CATEGORY: string;
    EXPENSE_REPORT: string;
    FOLDER: string;
    GIFT_CERTIFICATE: string;
    GIFT_CERTIFICATE_ITEM: string;
    GLOBAL_ACCOUNT_MAPPING: string;
    GROUP: string;
    INTERCOMPANY_JOURNAL_ENTRY: string;
    INVENTORY_ADJUSTMENT: string;
    INVENTORY_COST_REVALUATION: string;
    INVENTORY_COUNT: string;
    INVENTORY_DETAIL: string;
    INVENTORY_ITEM: string;
    INVENTORY_NUMBER: string;
    INVENTORY_TRANSFER: string;
    INVOICE: string;
    ISSUE: string;
    ITEM_ACCOUNT_MAPPING: string;
    ITEM_SEARCH: string;
    ITEM_DEMAND_PLAN: string;
    ITEM_FULFILLMENT: string;
    ITEM_GROUP: string;
    ITEM_RECEIPT: string;
    ITEM_REVISION: string;
    ITEM_SUPPLY_PLAN: string;
    JOURNAL_ENTRY: string;
    KIT: string;
    LANDED_COST: string;
    LEAD: string;
    LOCATION: string;
    LOT_NUMBERED_ASSEMBLY_ITEM: string;
    LOT_NUMBERED_INVENTORY_ITEM: string;
    MANUFACTURING_COST_TEMPLATE: string;
    MANUFACTURING_PLANNED_TIME: string;
    MANUFACTURING_OPERATION_TASK: string;
    MANUFACTURING_ROUTING: string;
    MARKUP: string;
    MESSAGE: string;
    MULTIBOOK_ACCOUNTING_TRANSACTION: string;
    NEXUS: string;
    NON_INVENTORY_PART: string;
    NOTE: string;
    OPPORTUNITY: string;
    OTHER_CHARGE_ITEM: string;
    OTHER_NAME: string;
    PARTNER: string;
    PAYCHECK_JOURNAL: string;
    PAYMENT: string;
    PAYROLL_ITEM: string;
    PHONE_CALL: string;
    PRICE_LEVEL: string;
    PROJECT_JOB: string;
    PROJECT_EXPENSE_TYPE: string;
    PROJECT_TASK: string;
    PROMOTION: string;
    PROSPECT: string;
    PURCHASE_CONTRACT: string;
    PURCHASE_ORDER: string;
    REALLOCATE_ITEMS: string;
    REQUISITION: string;
    RESOURCE_ALLOCATION: string;
    RETURN_AUTHORIZATION: string;
    REVENUE_COMMITMENT: string;
    REVENUE_COMMITMENT_REVERSAL: string;
    REVENUE_RECOGNITION_SCHEDULE: string;
    REVENUE_RECOGNITION_TEMPLATE: string;
    SALES_ORDER: string;
    SALES_TAX_ITEM: string;
    SCHEDULED_SCRIPT_INSTANCE: string;
    SERIALIZED_ASSEMBLY_ITEM: string;
    SERIALIZED_INVENTORY_ITEM: string;
    SERVICE: string;
    SOLUTION: string;
    STATISTICAL_JOURNAL_ENTRY: string;
    SUBSIDIARY: string;
    SUBTOTAL: string;
    TASK: string;
    TAX_CONTROL_ACCOUNT: string;
    TAX_GROUP: string;
    TAX_PERIOD: string;
    TAX_TYPE: string;
    TERM: string;
    TIME: string;
    TIME_ENTRY: string;
    TIMESHEET: string;
    TOPIC: string;
    TRANSACTION_SEARCH: string;
    TRANSFER_ORDER: string;
    UNIT_OF_MEASURE: string;
    VENDOR: string;
    VENDOR_BILL: string;
    VENDOR_CATEGORY: string;
    VENDOR_CREDIT: string;
    VENDOR_PAYMENT: string;
    VENDOR_RETURN_AUTHORIZATION: string;
    WEB_SITE_SETUP: string;
    WORK_ORDER: string;
    WORK_ORDER_CLOSE: string;
    WORK_ORDER_COMPLETION: string;
    WORK_ORDER_ISSUE: string;
}

interface SubmitConfig {
    enableSourcing?: boolean;
    disableTriggers?: boolean;
    ignoreMandatoryFields?: boolean;
}

interface SubmitFieldsOptions {
    type: string;
    id: string | number;
    values: any;
    options?: SubmitConfig;
    defaultValues?: Object;
}
/**
 * The 'value' parameter in this function is an object with matching properties and values.
 * ex.: value: {'name': 'Bob', 'department': '12'}
 */
interface SubmitFieldsFunction {
    (options: SubmitFieldsOptions): number;
    promise(options: SubmitFieldsOptions): Promise<number>;
}

interface RecordAttachFunction {
    (options: AttachOptions): void;
    promise(options: AttachOptions): Promise<void>;
}

interface RecordCopyFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
}

interface RecordCreateOptions {
    type: string;
    isDynamic?: boolean;
    defaultValue?: Object;
}

interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    promise(options: RecordCreateOptions): Promise<Record>;
}

interface RecordDeleteOptions {
    type: string;
    id: (string | number);
}

interface RecordDetachFunction {
    (options: DetachOptions): void;
    promise(options: DetachOptions): Promise<void>;
}

interface RecordLoadFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
}

interface RecordDeleteFunction {
    (options: RecordDeleteOptions): void;
    promise(options: RecordDeleteOptions): Promise<void>;
}

interface RecordTransformFunction {
    (options: RecordTransformOptions): Record;
    promise(options: RecordTransformOptions): Promise<Record>;
}

interface RecordTransformOptions {
    fromType: string; // Documented as just "type" but that's wrong.
    fromId: number; // Documented as just "id" but that's wrong.
    toType: string;
    isDynamic?: boolean;
    defaultValues?: Object;
}
/// <reference path="../typings/index.d.ts" />
/// <reference path="file.d.ts" />
/// <reference path="record.d.ts" />
/// <reference path="ui/serverWidget.d.ts" />

interface ClientResponse {
    /**
     * Not Documented. (6/8/2016)
     */
    toString(): string;
    /**
     * The client response body.
     */
    body: string;
    /**
     * The client response code.
     */
    code: number;
    /**
     * The client response headers. Object key/values not yet documented.
     */
    headers: Object;
    /**
     * Not Documented. (6/8/2016)
     */
    method: string;
    /**
     * Not Documented. (6/8/2016)
     */
    parameters: Object;
    /**
     * Not Documented. (6/8/2016)
     */
    url: string;
}

interface ServerRequest {
    /**
     * Method used to return the number of lines in a sublist.
     */
    getLineCount(options: GetLineCountOptions): number;
    /**
     * Method used to return the value of a sublist line item.
     */
    getSublistValue(options: GetSublistValueOptions): string;
    /**
     * Not Documented.
     */
    toString(): string;
    /**
     * The server request body.
     */
    body: string;
    /**
     * The server request files. Object key/values not yet documented.
     */
    files: Object;
    /**
     * The server request headers. Object key/values not yet documented.
     */
    headers: Object;
    /**
     * The server request http method.
     */
    method: string;
    /**
     * The server request parameters. Object key/values not yet documented.
     */
    parameters: Object;
    /**
     * The server request URL.
     */
    url: string;
}

interface ServerResponse {
    /**
     * Method used to add a header to the response.
     * If the same header has already been set, this method adds another line for that header.
     */
    addHeader(options: AddHeaderOptions): void;
    /**
     * Method used to return the value or values of a response header. 
     * If multiple values are assigned to the header name, the values are returned as an Array.
     */
    getHeader(options: GetHeaderOptions): string | string[];
    /**
     * Method used to set the redirect URL by resolving to a NetSuite resource.
     */
    sendRedirect(options: SendRedirectOptions): void;
    /**
     * Method used to set the value of a response header.
     */
    setHeader(options: SetHeaderOptions): void;
    /**
     * Method used to generate and render a PDF directly to the response.
     * This primarily converts XML to PDF.
     */
    renderPdf(options: RenderPDFOptions): void;
    /**
     * Method used to set CDN caching for a period of time.
     */
    setCdnCacheable(options: SetCDNCacheableOptions): void;
    /**
     * Method used to write information to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     */
    write(output: string): void;
    /**
     * Method used to write information to the response.
     * This method only accepts strings. Use writeFile() to pass files.
     */
    write(options: WriteOptions): void;
    /**
     * Method used to write a file to the response.
     */
    writeFile(options: WriteFileOptions): void;
    /**
     * Method used to write line information to the response.
     */
    writeLine(options: WriteLineOptions): void;
    /**
     * Method used to generate a page.
     */
    writePage(options: WritePageOptions): void;
    /**
     * Another method used to generate a page.
     * This isn't documented and shouldn't work, but does.
     */
    writePage(form: UIForm): void;
    /**
     * The server response headers. This property is read-only.
     */
    headers: Object;
}

interface AddHeaderOptions {
    /**
     * The name of the header.
     */
    name: string;
    /**
     * The value used to set the header.
     */
    value: string;
}

interface GetHeaderOptions {
    /**
     * The name of the header.
     */
    name: string;
}

interface SendRedirectOptions {
    /**
     * The base type for this resource. 
     * Use one of the following values: RECORD | TASKLINK | SUITELET
     */
    type: string;
    /**
     * The primary ID for this resource.
     * If the base type is RECORD, pass in the record type as listed on the Records Browser.
     * If the base type is TASKLINK, pass in the task ID. For a list of supported task IDs, see Supported Tasklinks.
     * If the base type is SUITELET, input the script ID.
     */
    identifier: string;
    /**
     * -optional- The secondary ID for this resource. If the base type is SUITLET, pass in the deployment ID.
     */
    id?: string;
    /**
     * -optional- If the base type is RECORD, this value determines whether to return a URL for the record in EDIT or VIEW mode.
     * The default value is false.
     */
    editmode?: boolean;
    /**
     * -optional- Additional URL parameters as name/value pairs.
     */
    parameters?: Object;
}

interface SetHeaderOptions {
    /**
     * The name of the header.
     */
    name: string;
    /**
     * The value used to set the header.
     */
    value: string;
}

interface RenderPDFOptions {
    /**
     * Content of the pdf.
     */
    xmlString: string;
}

interface SetCDNCacheableOptions {
    /**
     * The value of the caching duration. Set using the http.CacheDuration enum.
     */
    type: string;
}

interface WriteOptions {
    /**
     * The output string or file being written.
     */
    output: string;
}

interface WriteFileOptions {
    /**
     * The file to be written
     */
    file: NSFile;
    /**
     * -optional- Determines whether the field is inline. If true, the file is inline.
     */
    isInline?: boolean;
}

interface WriteLineOptions {
    /**
     * The output string being written.
     */
    output: string;
}

interface WritePageOptions {
    /**
     * A standalone page object in the form of an assistant, form or list.
     */
    pageobject: Object;
}

interface GetLineCountOptions {
    /**
     * The sublist internal ID.
     */
    group: string;
}

interface GetOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * -optional- The HTTP headers.
     */
    headers?: Object;
}

interface DeleteOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * -optional- The HTTP headers.
     */
    headers?: Object;
}

interface RequestOptions {
    /**
     * The HTTP request method. Set using the http.Method enum.
     */
    method: string;
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * -optional- The POST data if the method is POST. If method is DELETE, body data is ignored.
     */
    body?: string | Object;
    /**
     * -optional- An object containing request headers.
     */
    headers?: Object;
}

interface PostOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * The POST data.
     */
    body: string | Object;
    /**
     * -optional- The HTTP headers.
     */
    headers?: Object;
}

interface PutOptions {
    /**
     * The HTTP URL being requested.
     */
    url: string;
    /**
     * The PUT data.
     */
    body: string | Object;
    /**
     * The HTTP headers.
     */
    headers?: Object;
}

interface CacheDuration {
    LONG: string;
    MEDIUM: string;
    SHORT: string;
    UNIQUE: string;
}

interface HttpMethod {
    DELETE: string;
    GET: string;
    PUT: string;
    POST: string;
}

interface HttpDeleteFunction {
    (options: DeleteOptions): ClientResponse;
    promise(options: DeleteOptions): Promise<ClientResponse>;
}

interface HttpGetFunction {
    (options: GetOptions): ClientResponse;
    promise(options: GetOptions): Promise<ClientResponse>;
}

interface HttpPostFunction {
    (options: PostOptions): ClientResponse;
    promise(options: PostOptions): Promise<ClientResponse>;
}

interface HttpPutFunction {
    (options: PutOptions): ClientResponse;
    promise(options: PutOptions): Promise<ClientResponse>;
}

interface HttpRequestFunction {
    (options: RequestOptions): ClientResponse;
    promise(options: RequestOptions): Promise<ClientResponse>;
}
/// <reference path="http.d.ts" />
/// <reference path="crypto.d.ts" />

interface CreateSecureKeyOptions {
    /**
     * Specifies the encoding for the SecureKey.
     */
    encoding: string;
    /**
     * A GUID used to generate a secret key.
     * The GUID can resolve to either data or metadata.
     */
    guid: string;
}

interface CreateSecureStringOptions {
    /**
     * The string to convert to a secure string.
     */
    input: string;
    /**
     * Identifies the encoding that the input string uses. The default value is UTF_8
     */
    inputEncoding: string;
}

interface AppendStringOptions {
    /**
     * The string to append.
     */
    input: string;
    /**
     * The encoding of the string that is being appended.
     */
    encoding: string;
}

interface AppendSecureStringOptions {
    /**
     * The https.SecureString to append.
     */
    token: SecureString;
}

interface ConvertEncodingOptions {
    /**
     * The encoding to apply to the returned string.
     */
    toEncoding: string;
}

interface HashOptions {
    /**
     * The hash algorithm. Set the value using the crypto.Hash enum.
     */
    algorithm: string;
}

interface HmacOptions {
    /**
     * The hash algorithm. Set by the crypto.Hash enum.
     */
    algorithm: string;
    /**
     * A key returned from https.createSecureKey(options).
     */
    key: SecretKey;
}

interface SecureString {
    /**
     * Appends a passed in https.SecureString to another https.SecureString.
     */
    appendString(options: AppendStringOptions): SecureString;
    /**
     * Appends a passed in string to a https.SecureString.
     */
    appendSecureString(options: AppendSecureStringOptions): SecureString;
    /**
     * Changes the encoding of a https.SecureString.
     */
    convertEncoding(options: ConvertEncodingOptions): SecureString;
    /**
     * Produces the https.SecureString as a hash.
     */
    hash(options: HashOptions): SecureString;
    /**
     * Produces the https.SecureString as an hmac.
     */
    hmac(options: HmacOptions): SecureString;
    /**
     * Not Documented - 6/9/2016
     */
    toString(): string;
}

interface HttpsCreateSecureKeyFunction {
    (options: CreateSecureKeyOptions): SecretKey;
    promise(options: CreateSecureKeyOptions): Promise<SecretKey>;
}

interface HttpsCreateSecureStringFunction {
    (options: CreateSecureStringOptions): SecureString;
    promise(options: CreateSecureStringOptions): Promise<SecureString>;
}
interface FindImplementationsOptions {
    type: string;
    includeDefault?: boolean;
}

interface LoadImplementationsOptions {
    type: string;
    implementation?: string;
}
 interface SearchOperator {
    AFTER: string;
    ALLOF: string;
    ANY: string;
    ANYOF: string;
    BEFORE: string;
    BETWEEN: string;
    CONTAINS: string;
    DOESNOTCONTAIN: string;
    DOESNOTSTARTWITH: string;
    EQUALTO: string;
    GREATERTHAN: string;
    GREATERTHANOREQUALTO: string;
    HASKEYWORDS: string;
    IS: string;
    ISEMPTY: string;
    ISNOT: string;
    ISNOTEMPTY: string;
    LESSTHAN: string;
    LESSTHANOREQUALTO: string;
    NONEOF: string;
    NOTAFTER: string;
    NOTALLOF: string;
    NOTBEFORE: string;
    NOTBETWEEN: string;
    NOTEQUALTO: string;
    NOTGREATERTHAN: string;
    NOTGREATERTHANOREQUALTO: string;
    NOTLESSTHAN: string;
    NOTLESSTHANOREQUALTO: string;
    NOTON: string;
    NOTONORAFTER: string;
    NOTONORBEFORE: string;
    NOTWITHIN: string;
    ON: string;
    ONORAFTER: string;
    ONORBEFORE: string;
    STARTSWITH: string;
    WITHIN: string;
}

 interface SearchFilter {
    name: string;
    join: string;
    operator: string;
    summary: string;
    formula: string;
}

 interface SearchSummary {
    GROUP: string;
    COUNT: string;
    SUM: string;
    AVG: string;
    MIN: string;
    MAX: string;
}

 interface SearchSort {
    ASC: string;
    DESC: string;
    NONE: string;
}

 interface SearchColumnSetWhenOrderedByOptions {
    name: string;
    join: string;
}

 interface SearchColumn {
    setWhenOrderedBy?(SearchColumnSetWhenOrderedByOptions): SearchColumn;
    name: string;
    join?: string;
    summary?: string;
    formula?: string;
    label?: string;
    function?: string
    sort?: string; // SORT enum: ASC/DESC/NONE
}

 interface SearchResultGetValueTextOptions {
    name: string;
    join: string;
    summary?: string;
}

 interface SearchResult {
    getValue(options: SearchResultGetValueTextOptions): boolean | string | string[];
    getValue(SearchColumn): boolean | string | string[];
    getText(options: SearchResultGetValueTextOptions): string;
    getText(SearchColumn): string;
    recordType: string;
    id: string;
    columns: SearchColumn[];
}

 interface SearchResultSetGetRangeOptions {
    start: number;
    end: number;
}

 interface SearchResultSetGetRangeFunction {
    promise(options: SearchResultSetGetRangeOptions): Promise<SearchResult[]>;
    (options: SearchResultSetGetRangeOptions): SearchResult[];
}

 interface SearchResultSetEachFunction {
    promise(callback: (result: SearchResult, index: number) => boolean): Promise<boolean>;
    (callback: (result: SearchResult, index: number) => boolean): void;
}

 interface SearchResultSet {
    each: SearchResultSetEachFunction;
    getRange: SearchResultSetGetRangeFunction;
    columns: SearchColumn[];
}

 interface FetchOptions {
    /**
     * The index of the page range that bounds the desired data.
     */
    index: number;
}

 interface PageNextFunction {
    promise(): Promise<Page>;
    (): Page;
}

 interface PagePrevFunction {
    promise(): Promise<Page>;
    (): Page;
}

 interface PagedDataFetchFunction {
    promise(options: FetchOptions): Promise<Page>;
    (options: FetchOptions): Page;
}

 interface Page {
    next: PageNextFunction;
    prev: PagePrevFunction;
    data: SearchResult[];
    isFirst: boolean;
    isLast: boolean;
    pagedData: PagedData;
    pagedRange: PageRange;
}

 interface PageRange {
    compoundLabel: string; /** Human-readable label with beginning and ending range identifiers */
    index: number; // Read only
}

 interface PagedData {
    fetch: PagedDataFetchFunction;
    count: number; // Read only
    pageRanges: PageRange[];
    pageSize: number; /** Read Only */
    searchDefinition: Search; // Read only    
}

 interface RunPagedOptions {
    /**
     * Maximum number of entries per page.
     * There is an upper limit, a lower limit, and a default setting:
     * - The maximum number allowed is 1000.
     * - The minimum number allowed is 5.
     * - By default, the page size is set to 50 entries per page.
     */
    pageSize?: number;
}

 interface SearchRunPagedFunction {
    promise(options?: RunPagedOptions): Promise<PagedData>;
    (options?: RunPagedOptions): PagedData;
}

 interface Search {
    searchType: string;
    searchId: number;
    filters: SearchFilter[];
    filterExpression: Object[];
    columns: (SearchColumn[] | string[]);
    title: string;
    id: string;
    isPublic: boolean;
    save(): number;
    run(): SearchResultSet;
    runPaged: SearchRunPagedFunction;
}

 interface CreateSearchFilterOptions {
    name: string;
    join?: string;
    operator: string;
    values?: (string | Date | number | string[]);
    formula?: string;
    summary?: string;
}

 interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: string; // See SearchSummary enum
    formula?: string;
    function?: string;
    label?: string;
    sort?: string; // See SearchSort enum
}

 interface SearchLookupFieldsOptions {
    type: string;
    id: string;
    columns: (string | string[]);
}

 interface SearchLookupFieldsFunction {
    promise(options: SearchLookupFieldsOptions): Promise<Object>;
    (options: SearchLookupFieldsOptions): Object;
}

 interface SearchGlobalOptions {
    keywords: string;
}

 interface SearchGlobalFunction {
    promise(options: SearchGlobalOptions): Promise<SearchResult[]>;
    (options: SearchGlobalOptions): SearchResult[];
}

 interface SearchDuplicatesOptions {
    type: string;
    fields?: string[];
    id?: number;
}

 interface SearchDuplicatesFunction {
    promise(options: SearchDuplicatesOptions): Promise<SearchResult[]>;
    (options: SearchDuplicatesOptions): SearchResult[];
}

 interface SearchDeleteOptions {
    id: string;
}

 interface SearchDeleteFunction {
    promise(options: SearchDeleteOptions): Promise<void>;
    (options: SearchDeleteOptions): void;
}

 interface SearchLoadOptions {
    id: string;
}

 interface SearchLoadFunction {
    promise(options: SearchLoadOptions): Promise<Search>;
    (options: SearchLoadOptions): Search;
}

 interface SearchCreateOptions {
    type: string;
    filters?: (SearchFilter[] | Object[]);
    columns?: (SearchColumn[] | string[]);
    title?: string;
    id?: string;
}

 interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

interface SearchTypes { // as of 3/23/2016
    ACCOUNT: string;
    ACCOUNTING_BOOK: string;
    ADDRESS: string;
    AMORTIZATION_SCHEDULE: string;
    AMORTIZATION_TEMPLATE: string;
    ACTIVITY: string;
    ASSEMBLY_BUILD: string;
    ASSEMBLY_UNBUILD: string;
    BILLING_CLASS: string;
    BILLING_SCHEDULE: string;
    BIN: string;
    BIN_PUTAWAY_WORKSHEET: string;
    BIN_TRANSFER: string;
    BLANKET_PURCHASE_ORDER: string;
    BUILD_ASSEMBLY: string;
    CAMPAIGN: string;
    CAMPAIGN_TEMPLATE: string;
    CASE: string;
    CASH_REFUND: string;
    CASH_SALE: string;
    CHARGE: string;
    CHECK: string;
    CLASS: string;
    COMPETITOR: string;
    CONTACT: string;
    COUPON_CODE: string;
    CREDIT_MEMO: string;
    CURRENCY: string;
    CUSTOMER: string;
    CUSTOMER_CATEGORY: string;
    CUSTOMER_DEPOSIT: string;
    CUSTOMER_PAYMENT: string;
    CUSTOMER_REFUND: string;
    CUSTOM_LIST: string;
    DEPARTMENT: string;
    DEPOSIT: string;
    DEPOSIT_APPLICATION: string;
    DESCRIPTION: string;
    DISCOUNT: string;
    DOWNLOAD_ITEM: string;
    EMAIL_TEMPLATE: string;
    EMPLOYEE: string;
    ENTITY: string;
    ESTIMATE_QUOTE: string;
    EVENT: string;
    EXPENSE_CATEGORY: string;
    EXPENSE_REPORT: string;
    FOLDER: string;
    GIFT_CERTIFICATE: string;
    GIFT_CERTIFICATE_ITEM: string;
    GLOBAL_ACCOUNT_MAPPING: string;
    GROUP: string;
    INTERCOMPANY_JOURNAL_ENTRY: string;
    INVENTORY_ADJUSTMENT: string;
    INVENTORY_COST_REVALUATION: string;
    INVENTORY_COUNT: string;
    INVENTORY_DETAIL: string;
    INVENTORY_ITEM: string;
    INVENTORY_NUMBER: string;
    INVENTORY_TRANSFER: string;
    INVOICE: string;
    ISSUE: string;
    ITEM_ACCOUNT_MAPPING: string;
    ITEM_SEARCH: string;
    ITEM_DEMAND_PLAN: string;
    ITEM_FULFILLMENT: string;
    ITEM_GROUP: string;
    ITEM_RECEIPT: string;
    ITEM_REVISION: string;
    ITEM_SUPPLY_PLAN: string;
    JOURNAL_ENTRY: string;
    KIT: string;
    LANDED_COST: string;
    LEAD: string;
    LOCATION: string;
    LOT_NUMBERED_ASSEMBLY_ITEM: string;
    LOT_NUMBERED_INVENTORY_ITEM: string;
    MANUFACTURING_COST_TEMPLATE: string;
    MANUFACTURING_PLANNED_TIME: string;
    MANUFACTURING_OPERATION_TASK: string;
    MANUFACTURING_ROUTING: string;
    MARKUP: string;
    MESSAGE: string;
    MULTIBOOK_ACCOUNTING_TRANSACTION: string;
    NEXUS: string;
    NON_INVENTORY_PART: string;
    NOTE: string;
    OPPORTUNITY: string;
    OTHER_CHARGE_ITEM: string;
    OTHER_NAME: string;
    PARTNER: string;
    PAYCHECK_JOURNAL: string;
    PAYMENT: string;
    PAYROLL_ITEM: string;
    PHONE_CALL: string;
    PRICE_LEVEL: string;
    PROJECT_JOB: string;
    PROJECT_EXPENSE_TYPE: string;
    PROJECT_TASK: string;
    PROMOTION: string;
    PROSPECT: string;
    PURCHASE_CONTRACT: string;
    PURCHASE_ORDER: string;
    REALLOCATE_ITEMS: string;
    REQUISITION: string;
    RESOURCE_ALLOCATION: string;
    RETURN_AUTHORIZATION: string;
    REVENUE_COMMITMENT: string;
    REVENUE_COMMITMENT_REVERSAL: string;
    REVENUE_RECOGNITION_SCHEDULE: string;
    REVENUE_RECOGNITION_TEMPLATE: string;
    SALES_ORDER: string;
    SALES_TAX_ITEM: string;
    SCHEDULED_SCRIPT_INSTANCE: string;
    SERIALIZED_ASSEMBLY_ITEM: string;
    SERIALIZED_INVENTORY_ITEM: string;
    SERVICE: string;
    SOLUTION: string;
    STATISTICAL_JOURNAL_ENTRY: string;
    SUBSIDIARY: string;
    SUBTOTAL: string;
    TASK: string;
    TAX_CONTROL_ACCOUNT: string;
    TAX_GROUP: string;
    TAX_PERIOD: string;
    TAX_TYPE: string;
    TERM: string;
    TIME: string;
    TOPIC: string;
    TRANSACTION_SEARCH: string;
    TRANSFER_ORDER: string;
    UNIT_OF_MEASURE: string;
    VENDOR: string;
    VENDOR_BILL: string;
    VENDOR_CATEGORY: string;
    VENDOR_CREDIT: string;
    VENDOR_PAYMENT: string;
    VENDOR_RETURN_AUTHORIZATION: string;
    WEB_SITE_SETUP: string;
    WORK_ORDER: string;
    WORK_ORDER_CLOSE: string;
    WORK_ORDER_COMPLETION: string;
    WORK_ORDER_ISSUE: string;
}
/// <reference path="search.d.ts" />

interface RedirectOptions {
    url: string;
    parameters?: Object;
}

interface ToRecordOptions {
    id: string;
    type: string;
    isEditMode?: boolean;
    parameters?: Object;
}

interface ToSavedSearchOptions {
    id: number;
}

interface ToSearchOptions {
    search: Search;
}

interface ToSearchResultOptions {
    Search: Search;
}

interface ToSuiteletOptions {
    scriptId: string;
    deploymentId: string;
    isExternal?: boolean;
    parameters?: Object;
}

interface ToTaskLinkOptions {
    id: string;
    parameters?: Object;
}
/// <reference path="record.d.ts" />
/// <reference path="search.d.ts" />
/// <reference path="http.d.ts" />
/// <reference path="file.d.ts" />

interface AddCustomDataSourceOptions {
    /**
     * Data source alias.
     */
    alias: string;
    /**
     * Data format, uses the render.DataFormat enum.
     */
    format: string;
    /**
     * Object, document, or string.
     */
    data: Object | Document | string;
}

interface AddRecordOptions {
    /**
     * Name of the template.
     */
    templateName: string;
    /**
     * The loaded record object to add.
     */
    record: Record;
}

interface AddSearchResultsOptions {
    templateName: string;
    searchResult: SearchResult;
}

interface BOMOptions {
    entityId: number;
    printMode?: string;
}

interface EmailMergeResult {
    body: string;
    subject: string;
}

interface MergeEmailOptions {
    templateId: number;    // One of the below fields must be included.
    entity?: RecordRef;
    recipient?: RecordRef;
    customRecord?: RecordRef;
    supportCaseId?: number;
    transactionId?: number;
}

interface PackingSlipOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    fulfillmentId?: number;
}

interface PickingTicketOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    shipgroup?: number;
    location?: number;
}

interface PrintModes {
    DEFAULT: string;
    HTML: string;
    PDF: string;
}

interface RecordRef {
    id: number;
    type: string;
}

interface RenderToResponseOptions {
    response: ServerResponse;
}

interface StatementOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
    startDate?: Date;
    statementDate?: Date;
    TransactionsOnly?: boolean;
}

interface XMLToPDFOptions {
    xmlString: string;
}

interface DataSources {
    JSON: string;
    OBJECT: string;
    XML_DOC: string;
    XML_STRING: string;
}

interface TemplateRenderer {
    /**
     * Adds XML or JSON as custom data source to an advanced PDF/HTML template.
     */
    addCustomDataSource(options: AddCustomDataSourceOptions): void;
    /**
     * Binds a record to a template variable.
     */
    addRecord(options: AddRecordOptions): void;
    addSearchResults(options: AddSearchResultsOptions): void;
    renderAsPdf(): NSFile;
    renderAsPdfToResponse(options: RenderToResponseOptions): void;
    renderAsString(): string;
    renderToResponse(options: RenderToResponseOptions): void;
    /**
     * Sets the template using the internal ID.
     */
    setTemplateById(options: { id: number; }): void;
    /**
     * Sets the template using the script ID.
     */
    setTemplateByScriptId(options: { scriptId: string; }): void;
    templateContent: string;
}

interface TransactionOptions {
    entityId: number;
    printMode?: string;
    formId?: number;
}
interface GetParameterOptions {
    name: string;
}

interface SetOptions {
    name: string;
    value: string;
}

interface Script {
    getParameter(options: GetParameterOptions): boolean | number | Date | string | string[];
    getRemainingUsage(): number;
    deploymentId: string;
    id: string;
    logLevel: string;
    percentComplete: number;
    bundleIds: string[];
}

interface Session {
    get(options: GetParameterOptions): string;
    set(options: SetOptions): void;
}

interface User {
    getPermission(options: GetParameterOptions): string;
    getPreference(options: GetParameterOptions): string;
    department: number;
    email: string;
    id: number;
    location: number;
    name: string;
    role: number;
    roleCenter: number;
    roleId: string; // text ID
    subsidiary: number;
}

interface FeatureOptions {
    name: string;
}

interface ContextTypes {
    USER_INTERFACE: string;
    WEBSERVICES: string;
    WEBSTORE: string;
    PORTLET: string;
    SCHEDULED: string;
    SUITELET: string;
    CSV_IMPORT: string;
    CUSTOM_MASSUPDATE: string;
    WORKFLOW: string;
    USEREVENT: string;
}

interface EnvTypes {
    SANDBOX: string;
    PRODUCTION: string;
    BETA: string;
    INTERNAL: string;
}

interface Permissions {
    FULL: string;
    EDIT: string;
    CREATE: string;
    VIEW: string;
    NONE: string;
}
interface GenerateSuiteSignOnTokenOptions {
    suiteSignOnId: string;
}
/// <reference path="file.d.ts" />

 interface CheckStatusOptions {
    taskId: ScheduledScriptTask | MapReduceScriptTask | CsvImportTask | EntityDeduplicationTask | WorkflowTriggerTask;
}

 interface TaskCreateOptions {
    taskType: string;
}

 interface CsvImportTask {
    submit(): string;
    toString(): string;
    importFile: NSFile | string;
    linkedFiles: Object;
    mappingId: number | string;
    name: string;
    queueId: number;
}

 interface CsvImportTaskStatus {
    toString(): string;
    status: string;
}

 interface DedupeEntityTypes {
    CUSTOMER: string;
    CONTACT: string;
    VENDOR: string;
    PARTNER: string;
    LEAD: string;
    PROSPECT: string;
}

 interface DedupeModes {
    MERGE: string;
    DELETE: string;
    MAKE_MASTER_PARENT: string;
    MARK_AS_NOT_DUPES: string;
}

 interface EntityDeduplicationTask {
    submit(): string;
    toString(): string;
    dedupeMode: string;
    entityType: string;
    masterRecordId: number;
    masterSelectionMode: string;
    recordIds: number[];
}

 interface EntityDeduplicationTaskStatus {
    toString(): string;
    status: string;
}

 interface MapReduceScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: Object;
}

 interface MapReduceScriptTaskStatus {
    getCurrentTotalSize(): number;
    getPendingMapCount(): number;
    getPendingMapSize(): number;
    getPendingOutputCount(): number;
    getPendingOutputSize(): number;
    getPendingReduceCount(): number;
    getPendingReduceSize(): number;
    getPercentageCompleted(): number;
    getTotalMapCount(): number;
    getTotalOutputCount(): number;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    stage: string;
    status: string;
}

 interface MapReduceStages {
    GET_INPUT: string;
    MAP: string;
    SHUFFLE: string;
    REDUCE: string;
    SUMMARIZE: string;
}

 interface MasterSelectionModes {
    CREATED_EARLIEST: string;
    MOST_RECENT_ACTIVITY: string;
    MOST_POPULATED_FIELDS: string;
    SELECT_BY_ID: string;
}

 interface ScheduledScriptTask {
    submit(): string;
    toString(): string;
    scriptId: string;
    deploymentId: string;
    params: Object;
}

 interface ScheduledScriptTaskStatus {
    toString(): string;
    scriptId: string;
    deploymentId: string;
    status: string;
}

 interface TaskStatuses {
    PENDING: string;
    PROCESSING: string;
    COMPLETE: string;
    FAILED: string;
}

 interface TaskTypes {
    SCHEDULED_SCRIPT: string;
    MAP_REDUCE: string;
    CSV_IMPORT: string;
    ENTITY_DEDUPLICATION: string;
    WORKFLOW_TRIGGER: string;
}

 interface WorkflowTriggerTask {
    submit(): string;
    toString(): string;
    params: Object;
    recordId: number;
    recordType: string;
    workflowId: number | string;
}

 interface WorkflowTriggerTaskStatus {
    toString(): string;
    status: string;
}
interface VoidOptions {
    id: number | string;
    type: string;
}

interface TransactionVoidFunction {
    (options: VoidOptions): number;
    promise(options: VoidOptions): Promise<number>;
}
interface formatOptions {
    domain: string;
    parameters: Object;
}

interface resolveRecordOptions {
    recordType: string;
    recordId: string;
    isEditMode?: boolean;
    params?: Object;
}

interface resolveScriptOptions {
    scriptId: string;
    deploymentId: string;
    returnExternalUrl?: boolean;
    params?: Object;
}

interface resolveTaskLinkOptions {
    id: string;
    parameters?: Object;
}
interface InitiateOptions {
    recordType: string; // Documentation says number, but examples clearly contradict
    recordId: string | number;
    workflowId: string | number;
    defaultValues?: Object;
}

interface TriggerOptions {
    recordType: string; // Documentation says number, but examples clearly contradict
    recordId: string | number;
    /**
     * Internal ID (number) or script ID (string) for the workflow definition. This is the ID field on the Workflow Definition Page.
     */
    workflowId: string | number;
    workflowInstanceId?: number | string;
    defaultValues?: Object;
    /**
     * Internal ID of a button that appears on the record in the workflow.
     * Use this parameter to trigger the workflow as if the specified button were clicked.
     */
    actionId?: string | number;
}
interface NSNode {
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

interface AppendChildOptions {
    newChild: NSNode;
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

interface NodeType {
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

interface NSAttr extends NSNode {
    name: string;
    ownerElement: NSElement;
    specified: boolean;
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

interface NSElement extends NSNode {
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

interface NSXMLDocument extends NSNode {
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

interface Parser {
    fromString: (options: ParserFromStringOptions) => NSXMLDocument;
    toString: (options: ParserToStringOptions) => string;
}

interface XPath {
    select: (options: SelectOptions) => NSNode[];
}

interface SelectOptions {
    node: NSNode;
    xpath: string;
}
interface AlertOptions {
    title?: string;
    message?: string;
}

interface CreateDialogOptions {
    buttons?: DialogButton[];
    title?: string;
    message?: string;
}

interface DialogButton {
    label: string;
    value: number | string;
}
interface MessageType {
    CONFIRMATION: string; // A green background with a checkmark icon.
    INFORMATION: string;  // A blue background with an Information icon.
    WARNING: string;      // A yellow background with a Warning icon.
    ERROR: string;        // A red background with an X icon.
}

interface Message {
    hide(): void;
    show(options?: MessageShowOptions): void;
}

interface MessageCreateOptions {
    message?: string;
    title?: string;
    type: string;
}

interface MessageShowOptions {
    duration?: number;
}
/// <reference path="typings/index.d.ts" />
/// <reference path="entryPoints.d.ts" />
/// <reference path="globalFunctions.d.ts" />
/// <reference path="ss2.0-types/auth.d.ts" />
/// <reference path="ss2.0-types/config.d.ts" />
/// <reference path="ss2.0-types/crypto.d.ts" />
/// <reference path="ss2.0-types/currency.d.ts" />
/// <reference path="ss2.0-types/currentRecord.d.ts" />
/// <reference path="ss2.0-types/email.d.ts" />
/// <reference path="ss2.0-types/encode.d.ts" />
/// <reference path="ss2.0-types/error.d.ts" />
/// <reference path="ss2.0-types/file.d.ts" />
/// <reference path="ss2.0-types/format.d.ts" />
/// <reference path="ss2.0-types/http.d.ts" />
/// <reference path="ss2.0-types/https.d.ts" />
/// <reference path="ss2.0-types/plugin.d.ts" />
/// <reference path="ss2.0-types/portlet.d.ts" />
/// <reference path="ss2.0-types/record.d.ts" />
/// <reference path="ss2.0-types/redirect.d.ts" />
/// <reference path="ss2.0-types/render.d.ts" />
/// <reference path="ss2.0-types/runtime.d.ts" />
/// <reference path="ss2.0-types/search.d.ts" />
/// <reference path="ss2.0-types/sso.d.ts" />
/// <reference path="ss2.0-types/task.d.ts" />
/// <reference path="ss2.0-types/transaction.d.ts" />
/// <reference path="ss2.0-types/url.d.ts" />
/// <reference path="ss2.0-types/workflow.d.ts" />
/// <reference path="ss2.0-types/xml.d.ts" />
/// <reference path="ss2.0-types/ui/dialog.d.ts" />
/// <reference path="ss2.0-types/ui/message.d.ts" />
/// <reference path="ss2.0-types/ui/serverWidget.d.ts" />
