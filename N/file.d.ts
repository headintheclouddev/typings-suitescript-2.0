export interface File {
    description: string;
    encoding: string;
    fileType: Type;
    folder: number;
    readonly id: number;
    isInactive: boolean;
    isOnline: boolean;
    readonly isText: boolean;
    name: string;
    readonly path: string;
    readonly size: number;
    readonly url: string;
    save: () => number;
    getContents: () => string;
    resetStream: () => void;
    appendLine: (option: FileAppendLineOptions) => File;
    lines: {
        iterator: () => FileIterator;
    }
}

interface FileIterator {
    each: (options: any) => boolean;
}

interface FileAppendLineOptions {
    /**
     * Internal ID of the file as a number or a string, or the relative file path to the file in the file cabinet.
     */
    value: string;
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
    fileType: Type;
    /**
     * The file content.
     */
    contents?: string;
    /**
     * The file content.
     */
    description?: string;
    /**
     * The internal ID of the folder used when the file is saved.
     */
    folder?: number;
    /**
     * The file encoding.
     */
    encoding?: Encoding;
    /**
     * The file status.
     */
    isInactive?: boolean;
    /**
     * The file status.
     */
    isOnline?: boolean;
}

/**
 * Method used to create a new file in the NetSuite file cabinet.
 */
export function create(options: FileCreateOptions): File;
/**
 * Method used to delete an existing file from the NetSuite file cabinet.
 */
declare function deleteFunc(options: FileDeleteOptions): void;
export {deleteFunc as delete};
/**
 * Method used to load an existing file from the NetSuite file cabinet.
 */
export function load(options: FileLoadOptions): File;
/**
 * Method used to load an existing file from the NetSuite file cabinet.
 */
export function load(idOrPath: number | string): File;
/**
 * Enumeration that holds the string values for supported character encoding.
 */
export enum Encoding {
    UTF8,
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
 */
export enum Type {
    AUTOCAD,
    BMPIMAGE,
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
    SMS,
    STYLESHEET,
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
