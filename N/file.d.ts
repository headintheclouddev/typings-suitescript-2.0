/// <reference path="../typings/tsd.d.ts" />

interface NSFile {
    description: string;
    encoding: FileEncodingValue;
    fileType: FileTypeValue;
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

interface FileTypeValue {}

interface FileType {
    AUTOCAD: FileTypeValue;
    BMPIMAGE: FileTypeValue;
    CSV: FileTypeValue;
    EXCEL: FileTypeValue;
    FLASH: FileTypeValue;
    FREEMARKER: FileTypeValue;
    GIFIMAGE: FileTypeValue;
    GZIP: FileTypeValue;
    HTMLDOC: FileTypeValue;
    ICON: FileTypeValue;
    JAVASCRIPT: FileTypeValue;
    JPGIMAGE: FileTypeValue;
    JSON: FileTypeValue;
    MESSAGERFC: FileTypeValue;
    MP3: FileTypeValue;
    MPEGMOVIE: FileTypeValue;
    MSPROJECT: FileTypeValue;
    PDF: FileTypeValue;
    PJPGIMAGE: FileTypeValue;
    PLAINTEXT: FileTypeValue;
    PNGIMAGE: FileTypeValue;
    POSTSCRIPT: FileTypeValue;
    POWERPOINT: FileTypeValue;
    QUICKTIME: FileTypeValue;
    RTF: FileTypeValue;
    SMS: FileTypeValue;
    STYLESHEET: FileTypeValue;
    TAR: FileTypeValue;
    TIFFIMAGE: FileTypeValue;
    VISIO: FileTypeValue;
    WEBAPPPAGE: FileTypeValue;
    WEBAPPSCRIPT: FileTypeValue;
    WORD: FileTypeValue;
    XMLDOC: FileTypeValue;
    XSD: FileTypeValue;
    ZIP: FileTypeValue;
}

interface FileEncodingValue {}

interface FileEncoding {
    UTF8: FileEncodingValue;
    WINDOWS_1252: FileEncodingValue;
    ISO_8859_1: FileEncodingValue;
    GB18030: FileEncodingValue;
    SHIFT_JIS: FileEncodingValue;
    MAC_ROMAN: FileEncodingValue;
    GB2312: FileEncodingValue;
    BIG5: FileEncodingValue;
}

interface FileLoadOptions {
    idOrPath: (number|string);
}

interface FileDeleteOptions {
    id: (number|string);
}

interface FileCreateOptions {
    name: string;
    fileType: FileTypeValue;
    contents: string;
}

interface FileModule {
    create: (options: FileCreateOptions) => NSFile;
    delete: (options: FileDeleteOptions) => void;
    load: (options: FileLoadOptions) => NSFile;
    Encoding: FileEncoding;
    Type: FileType;
}

declare module N {
    var file:FileModule;
}

declare module 'N/file' {
    export = N.file;
}