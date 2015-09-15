/// <reference path="../typings/tsd.d.ts" />

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

interface FileTypes {
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

interface FileEncodings {
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
    idOrPath: (number|string);
}

interface FileDeleteOptions {
    id: (number|string);
}

interface FileCreateOptions {
    name: string;
    fileType: string;
    contents: string;
}

interface FileModule {
    create: (options: FileCreateOptions) => NSFile;
    delete: (options: FileDeleteOptions) => void;
    load: (options: FileLoadOptions) => NSFile;
    Encoding: FileEncodings;
    Type: FileTypes;
}

declare module N {
    var file:FileModule;
}

declare module 'N/file' {
    export = N.file;
}