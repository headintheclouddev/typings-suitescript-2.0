/**
 * A file object, such as one returned by {@link create}.
 *
 * A file that has not been saved has no ID or URL. Saving it does not change this:
 * {@link File.save} returns the new ID (as a number), but does not update the object.
 * Use {@link load} to get an object for the saved file.
 * @since 2015.2
 */
export interface File {
    /** @since 2015.2 */
    description: string | null;
    /**
     * The encoding, one of the values of {@link Encoding}, such as `UTF-8`. This may be null if the file has not been saved.
     * @since 2015.2
     */
    encoding: string | null;
    /**
     * The file type. A file in the File Cabinet can have a type that {@link Type} does not list, such as `MISCBINARY` or `WOFF2`.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property after it is set with file.create(options).
     * @since 2015.2
     */
    fileType: Type | string;
    /**
     * The internal ID of the containing folder. This is -1 if the file has not been saved and no folder has been set.
     * @since 2015.2
     */
    folder: number;
    /**
     * The internal ID of the file, as a string such as `"123"`. This is null if the file has not been saved.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly id: string | null;
    /** @since 2015.2 */
    isInactive: boolean;
    /** @since 2015.2 */
    isOnline: boolean;
    /**
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly isText: boolean;
    /** @since 2015.2 */
    name: string;
    /**
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly path: string;
    /**
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly size: number;
    /**
     * The URL of the file. This is null if the file has not been saved.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly url: string | null;
    /**
     * @throws {SuiteScriptError} INVALID_KEY_OR_REF if the folder does not exist or the user does not have permission.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the File.folder property is not set before save() is called.
     * @governance 20 units
     * @since 2015.2
     */
    save: () => number;
    /**
     * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if the file is larger than 10 MB.
     * @governance none
     * @since 2015.2
     */
    getContents: () => string;
    /**
     * @governance none
     * @since 2019.1
     */
    getReader: () => FileReader; // Since 2019.1
    /**
     * Method used to return the iterator of segments delimited by a separator. Separator is included in each segment. Empty separator is not allowed
     * @throws {SuiteScriptError} SSS_INVALID_SEGMENT_SEPARATOR if options.separator is empty.
     * @throws {SuiteScriptError} SSS_INVALID_ARG_TYPE if options.separator is not a string.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
     * @governance none
     * @since 2019.1
     */
    getSegments: (options: { separator: string }) => FileIterator; // Since 2019.1
    /**
     * @governance none
     * @since 2017.1
     */
    resetStream: () => void;
    /**
     * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if the line is larger than 10 MB.
     * @throws {SuiteScriptError} YOU_CANNOT_WRITE_TO_A_FILE_AFTER_YOU_BEGAN_READING_FROM_IT if called after File.lines.iterator(). Call File.resetStream() or save the file first.
     * @governance none
     * @since 2017.1
     */
    appendLine: (option: FileAppendLineOptions) => File;
    lines: { iterator: () => FileIterator; };
}

/** A file in the File Cabinet, such as one returned by {@link load} or {@link copy}. */
export interface FileCabinetFile extends File {
    encoding: string;
    readonly id: string;
    readonly url: string;
}

/**
 * Use for special read operations. Reads from a file until a specified delimiter is reached. Reads an arbitrary number of characters from a file. Since 2019.1.
 * @since 2019.1
 */
interface FileReader {
    /**
     * Returns string from current position to the next occurrence of options.tag.
     * Returns the rest of the string if tag is not found. Returns null if reading is already finished.
     * All types of characters are supported. If there's a character that does not exist until the end of the file, the rest of the file is returned.
     * @throws {SuiteScriptError} SSS_TAG_CANNOT_BE_EMPTY if options.tag is empty.
     * @throws {SuiteScriptError} SSS_INVALID_ARG_TYPE if options.tag is not a string.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
     * @governance none
     * @since 2019.1
     */
    readUntil: (options: { tag: string }) => string;
    /**
     * Returns the next options.number characters from the current position.
     * Returns less than the number if there is not enough characters to read in the file.
     * Returns null if reading is already finished.
     * @throws {SuiteScriptError} SSS_INVALID_READ_SIZE if options.number is not greater than zero.
     * @throws {SuiteScriptError} SSS_INVALID_ARG_TYPE if options.number is not a number.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
     * @governance none
     * @since 2019.1
     */
    readChars: (options: { number: number }) => string;
}

interface FileIteratorEachFunction {
    (callback: (line: {value: string}) => boolean): void;
}

interface FileIterator {
    each: FileIteratorEachFunction;
}

interface FileAppendLineOptions {
    /** Internal ID of the file as a number or a string, or the relative file path to the file in the file cabinet. */
    value: string;
}

export interface FileLoadOptions {
    /**  Internal ID of the file as a number or a string, or the relative file path to the file in the file cabinet. */
    id: (number | string);
}

export interface FileDeleteOptions {
    /** Internal ID of the file. */
    id: (number | string);
}

export interface FileCopyOptions {
    /** The internal ID of the folder to copy the file to.  This folder must already exist in the File Cabinet. */
    folder: number;
    /**
     * The internal ID of the file to copy. The file must already exist in the file cabinet.
     * It must be a number: a string, such as the ID of a loaded file, throws SSS_INVALID_TYPE_ARG.
     */
    id: number;
    /**
     * The conflict resolution value.
     * This parameter specifies the type of conflict resolution to apply when a conflict occurs while copying a file
     * (for example, if the target folder already contains a file with the same name).
     * Use the values in the file.ConflictResolution enum to set this parameter. The default value is ConflictResolution.FAIL.
     */
    conflictResolution: NameConflictResolution;
}

export interface FileCreateOptions {
    /** The file name. */
    name: string;
    /** The file type. */
    fileType: Type;
    /** The file content. */
    contents?: string;
    /** The file content. */
    description?: string;
    /** The internal ID of the folder used when the file is saved. */
    folder?: number;
    /** The file encoding. */
    encoding?: Encoding;
    /** The file status. */
    isInactive?: boolean;
    /** The file status. */
    isOnline?: boolean;
}

/**
 * Method used to create a new file in the NetSuite file cabinet.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if the options.fileType argument is invalid.
 * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if the file is larger than 10 MB.
 * @governance none
 * @since 2015.2
 */
export function create(options: FileCreateOptions): File;

/**
 * Copy an existing file in the NetSuite File Cabinet.
 * @throws {SuiteScriptError} INVALID_CONFLICT_RESOLUTION_1 if options.conflictResolution is not a value from the file.NameConflictResolution enum.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @governance 20 units
 * @since 2021.1
 */
export function copy(options: FileCopyOptions): FileCabinetFile;

/**
 * Method used to delete an existing file from the NetSuite file cabinet.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @governance 20 units
 * @since 2015.2
 */
declare function deleteFunc(options: FileDeleteOptions): void;
export {deleteFunc as delete};

/**
 * Method used to load an existing file from the NetSuite file cabinet.
 * @throws {SuiteScriptError} INSUFFICIENT_PERMISSION if the internal ID passed is invalid.
 * @throws {SuiteScriptError} RCRD_DSNT_EXIST if the relative file path passed is invalid.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @governance 10 units
 * @since 2015.2
 */
export function load(options: FileLoadOptions): FileCabinetFile;

/**
 * Method used to load an existing file from the NetSuite file cabinet.
 * @governance 10 units
 * @since 2015.2
 */
export function load(idOrPath: number | string): FileCabinetFile;

/** @since 2021.1 */
export enum NameConflictResolution {
    /** Fail with an error if a conflict occurs. */
    FAIL,
    /** Overwrite the existing file if a conflict occurs.
     * The attributes and permissions of the overwritten file are preserved (meaning that the copied file has the same attributes and permissions as the file that was overwritten).
     */
    OVERWRITE,
    /**
     * Add a numeric suffix to the name of the copied file if a conflict occurs.
     * For example, if you are copying a file named file.txt and a conflict occurs, the name of the copied file is file (1).txt.
     */
    RENAME_TO_UNIQUE
}

/**
 * Enumeration that holds the string values for supported character encoding.
 * @since 2015.2
 */
export enum Encoding {
    UTF_8,
    WINDOWS_1252,
    ISO_8859_1,
    GB18030,
    SHIFT_JIS,
    MAC_ROMAN,
    GB2312,
    BIG5,
}

/**
 * Enumeration that holds the string values for supported file types.
 * @since 2015.2
 */
export enum Type {
    APPCACHE,
    AUTOCAD,
    BMPIMAGE,
    CERTIFICATE,
    CONFIG,
    CSV,
    EXCEL,
    FLASH,
    FREEMARKER,
    GIFIMAGE,
    GZIP,
    HTMLDOC,
    ICON,
    JAVASCRIPT,
    JPGIMAGE,
    JSON,
    MESSAGERFC,
    MP3,
    MPEGMOVIE,
    MSPROJECT,
    PDF,
    PJPGIMAGE,
    PLAINTEXT,
    PNGIMAGE,
    POSTSCRIPT,
    POWERPOINT,
    QUICKTIME,
    RTF,
    SCSS,
    SMS,
    STYLESHEET,
    SVG,
    TAR,
    TIFFIMAGE,
    VISIO,
    WEBAPPPAGE,
    WEBAPPSCRIPT,
    WORD,
    XMLDOC,
    XSD,
    ZIP,
}
