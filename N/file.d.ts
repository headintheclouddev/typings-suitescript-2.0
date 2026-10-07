/**
 * Use the N/file module to work with files within NetSuite. You can use this module to upload files to the NetSuite File Cabinet,
 * as well as send files as attachments without uploading them to the File Cabinet.
 *
 * Methods that load content in memory, such as File.getContents(), have a 10 MB size limit.
 * This limit does not apply when content is streamed, such as when File.save() is called.
 *
 * Supported script types: Server scripts.
 */

/**
 * Encapsulates a file within NetSuite.
 * @since 2015.2
 */
export interface File {
    /**
     * Description of the file. In the UI, this value displays in the Description field on the file record.
     * @since 2015.2
     */
    description: string;
    /**
     * Character encoding on the file. Set the value using the file.Encoding enum.
     * @since 2015.2
     */
    encoding: string;
    /**
     * File type of the file.
     * This property is read-only. Set the file type by passing a file.Type enum value to file.create(options).
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property after it is set with file.create(options).
     * @since 2015.2
     */
    readonly fileType: Type;
    /**
     * Internal ID of the folder that houses the file within the NetSuite File Cabinet.
     * You must set this property before you upload a file to the File Cabinet with File.save().
     * Note: Oracle's File.folder page types this property as number | string, but the N/file members table lists number; typed as number here.
     * @since 2015.2
     */
    folder: number;
    /**
     * Internal ID of the file in the NetSuite File Cabinet. Read-only.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly id: number;
    /**
     * Inactive status of the file. If set to true, the file is inactive.
     * @since 2015.2
     */
    isInactive: boolean;
    /**
     * 'Available without Login' status of the file. If set to true, users can download the file outside of a current NetSuite login session.
     * Keep this false for files that contain sensitive data.
     * @since 2015.2
     */
    isOnline: boolean;
    /**
     * Indicates whether the file type is text-based. Read-only.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly isText: boolean;
    /**
     * Name of the file, including the extension.
     * @since 2015.2
     */
    name: string;
    /**
     * Relative path to the file in the NetSuite File Cabinet. Read-only.
     * If the folder is not set with file.create(options), this property holds the file name until the File.folder property is defined.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly path: string;
    /**
     * Size of the file in bytes. Read-only.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly size: number;
    /**
     * URL of the file. Read-only.
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY if you attempt to edit this property.
     * @since 2015.2
     */
    readonly url: string;
    /**
     * Uploads a new file, or saves an updated file, to the NetSuite File Cabinet. Streams files of any size, provided that the file meets File Cabinet limits.
     * The File.folder property must be set before calling this method.
     * @returns The internal ID of the file.
     * @throws {SuiteScriptError} INVALID_KEY_OR_REF if the folder does not exist or the user does not have permission.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the File.folder property is not set before save() is called.
     * @governance 20 units
     * @since 2015.2
     */
    save: () => number;
    /**
     * Returns the content of the file in string format.
     * Content held in memory is limited to 10 MB. Use File.lines.iterator() or File.getSegments(options) for larger text files.
     * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if the file is larger than 10 MB.
     * @governance none
     * @since 2015.2
     */
    getContents: () => string;
    /**
     * Returns a reader object for performing special read operations.
     * @governance none
     * @since 2019.1
     */
    getReader: () => FileReader;
    /**
     * Returns an iterator of segments that are delimited by the specified separator. The separator is included in each segment. An empty separator is not allowed.
     * @throws {SuiteScriptError} SSS_INVALID_SEGMENT_SEPARATOR if options.separator is empty.
     * @throws {SuiteScriptError} SSS_INVALID_ARG_TYPE if options.separator is not a string.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
     * @governance none
     * @since 2019.1
     */
    getSegments: (options: FileGetSegmentsOptions) => FileIterator;
    /**
     * Resets the reading and writing streams that may have been opened by File.appendLine(options) or File.lines.iterator().
     * Serves as an undo action on any unsaved content written with File.appendLine(options). Can be used on text or CSV files.
     * @governance none
     * @since 2017.1
     */
    resetStream: () => void;
    /**
     * Inserts a line to the end of a text or CSV file. Each line must be less than 10 MB.
     * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if the line is larger than 10 MB.
     * @throws {SuiteScriptError} YOU_CANNOT_WRITE_TO_A_FILE_AFTER_YOU_BEGAN_READING_FROM_IT if called after File.lines.iterator(). Call File.resetStream() or save the file first.
     * @governance none
     * @since 2017.1
     */
    appendLine: (option: FileAppendLineOptions) => File;
    lines: {
        /**
         * Returns an iterator over the lines of a text or CSV file. Each line must be less than 10 MB.
         * Return true from the iterator callback to continue the loop, or false to stop it.
         * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if a line is larger than 10 MB.
         * @throws {SuiteScriptError} YOU_CANNOT_READ_FROM_A_FILE_AFTER_YOU_BEGAN_WRITING_TO_IT if called after File.appendLine(options). Call File.resetStream() or save the file first.
         * @governance none
         * @since 2017.1
         */
        iterator: () => FileIterator;
    };
}

/**
 * Use for special read operations. Reads from a file until a specified delimiter is reached, or reads an arbitrary number of characters from a file.
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
    readUntil: (options: { tag: string }) => string | null;
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
    readChars: (options: { number: number }) => string | null;
}

interface FileIteratorEachFunction {
    /** Calls the callback for each line or segment. Return true to continue iterating, or false to stop. */
    (callback: (line: { value: string }) => boolean): void;
}

interface FileIterator {
    each: FileIteratorEachFunction;
}

interface FileGetSegmentsOptions {
    /** The separator to use to divide the segments. For example, a newline character returns each line of the file as a segment. Must not be empty. */
    separator: string;
}

interface FileAppendLineOptions {
    /** The string to insert at the end of the file. */
    value: string;
}

export interface FileLoadOptions {
    /**
     * Internal ID of the file as a number or a string, the absolute file path (for example, 'Images/myImageFile.jpg'),
     * or a path relative to the script's folder (for example, './Images/myImageFile.jpg' or '../Images/myImageFile.jpg').
     */
    id: number | string;
}

export interface FileDeleteOptions {
    /** Internal ID of the file. */
    id: number | string;
}

export interface FileCopyOptions {
    /** The internal ID of the folder to copy the file to. This folder must already exist in the File Cabinet. */
    folder: number;
    /** The internal ID of the file to copy. The file must already exist in the File Cabinet. */
    id: number;
    /**
     * The conflict resolution value.
     * This parameter specifies the type of conflict resolution to apply when a conflict occurs while copying a file
     * (for example, if the target folder already contains a file with the same name).
     * Use the values in the file.NameConflictResolution enum to set this parameter. The default value is NameConflictResolution.FAIL.
     */
    conflictResolution?: NameConflictResolution;
}

export interface FileCreateOptions {
    /** The file name and extension. */
    name: string;
    /** The file type. This value cannot be changed after the file is created. */
    fileType: Type;
    /** The file content. If the file type is binary (for example, PDF), the content must be base64 encoded. */
    contents?: string;
    /** The file description. */
    description?: string;
    /** The internal ID of the folder within the NetSuite File Cabinet. Must be set before the file is uploaded with File.save(). */
    folder?: number;
    /** The character encoding on the file. Use the file.Encoding enum to set the value. */
    encoding?: Encoding;
    /** The inactive status of the file. If set to true, the file is inactive. The default value is false. */
    isInactive?: boolean;
    /**
     * The 'Available without Login' status of the file. If set to true, users can download the file outside of a current NetSuite login session.
     * The default value is false. Keep this false for files that contain sensitive data.
     */
    isOnline?: boolean;
}

/**
 * Creates a new file.File. Content held in memory is limited to 10 MB.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if the options.fileType argument is invalid.
 * @throws {SuiteScriptError} SSS_FILE_CONTENT_SIZE_EXCEEDED if the file is larger than 10 MB.
 * @governance none
 * @since 2015.2
 */
export function create(options: FileCreateOptions): File;

/**
 * Copies an existing file in the NetSuite File Cabinet. The copied file has the same properties as the original file.
 * @throws {SuiteScriptError} INVALID_CONFLICT_RESOLUTION_1 if options.conflictResolution is not a value from the file.NameConflictResolution enum.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @governance 20 units
 * @since 2021.1
 */
export function copy(options: FileCopyOptions): File;

/**
 * Deletes an existing file from the NetSuite File Cabinet.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @governance 20 units
 * @since 2015.2
 */
declare function deleteFunc(options: FileDeleteOptions): void;
export {deleteFunc as delete};

/**
 * Loads an existing file from the NetSuite File Cabinet. The file size limit for this method is 2 GB.
 * @throws {SuiteScriptError} INSUFFICIENT_PERMISSION if the internal ID passed is invalid.
 * @throws {SuiteScriptError} RCRD_DSNT_EXIST if the relative file path passed is invalid.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is not passed.
 * @governance 10 units
 * @since 2015.2
 */
export function load(options: FileLoadOptions): File;

/**
 * Loads an existing file from the NetSuite File Cabinet. The file size limit for this method is 2 GB.
 * @governance 10 units
 * @since 2015.2
 */
export function load(idOrPath: number | string): File;

/**
 * Holds the string values for supported conflict resolution types. Use this enum to set the options.conflictResolution parameter in file.copy(options).
 * @since 2021.1
 */
export enum NameConflictResolution {
    /** Fail with an error if a conflict occurs. */
    FAIL,
    /**
     * Overwrite the existing file if a conflict occurs.
     * The attributes and permissions of the overwritten file are preserved (meaning that the copied file has the same attributes and permissions as the file that was overwritten).
     */
    OVERWRITE,
    /** Overwrite the existing file if a conflict occurs. Attributes and permissions are also overwritten. */
    OVERWRITE_CONTENT_AND_ATTRIBUTES,
    /**
     * Add a numeric suffix to the name of the copied file if a conflict occurs.
     * For example, if you are copying a file named file.txt and a conflict occurs, the name of the copied file is file (1).txt.
     */
    RENAME_TO_UNIQUE
}

/**
 * Enumeration that holds the string values for supported character encoding. Use this enum to set the value of the File.encoding property.
 * @since 2015.2
 */
export enum Encoding {
    /** Unicode */
    UTF_8,
    /** Western */
    WINDOWS_1252,
    /** Western */
    ISO_8859_1,
    /** Chinese Simplified */
    GB18030,
    /** Japanese */
    SHIFT_JIS,
    /** Western */
    MAC_ROMAN,
    /** Chinese Simplified */
    GB2312,
    /** Chinese Traditional */
    BIG5,
}

/**
 * Enumeration that holds the string values for supported file types. Use this enum to set the options.fileType parameter in file.create(options).
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
