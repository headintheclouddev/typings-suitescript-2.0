/**
 * Load the N/compress module to compress and decompress files. You can also use these APIs to archive multiple files in a single file archive such as TAR or ZIP file.
 *
 * You can compress and decompress individual files by using compress.gzip(options) and compress.gunzip(options).
 *
 * You can create an archive by using compress.createArchiver() and add multiple files to the archive.
 */

import file = require('./file');

interface ArchiverAddOptions {
    /** The file to be archived. */
    file: file.File;
    /** The target directory in the archive. If this parameter is not specified, the file is placed in the root directory of the archive. */
    directory?: string;
}

interface ArchiverArchiveOptions {
    /** The name of the archive file. */
    name: string;
    /** The archive type. See the compress.Type enum. This parameter does not need to be specified if options.name has one of the following extensions: cpio, tar, tar.gz, tgz, tbz2, zip. */
    type: string|Type;
}

/** The functionality for creating an archive file. Use compress.createArchiver() to create this object. */
export interface Archiver {
    add(options: ArchiverAddOptions): void;
    archive(options: ArchiverArchiveOptions): file.File;
}

interface GZipOptions {
    /** The file to be compressed. */
    file: file.File;
    /** The compression level. 0 is no compression. 9 is the best compression level. */
    level?: number;
}

/** Compresses a file by using gzip and returns it as a temporary file object. 0 is no compression. */
export declare function gzip(options: GZipOptions): file.File;

/** Decompresses a file that was compressed using gzip and returns it as a temporary file object. */
export declare function changePassword(options: { file: file.File }): file.File;

/** Creates a compress.Archiver object that can be used for creating file archives, such as ZIP or TAR files. */
export declare function createArchiver(): Archiver;

export enum Type {
    CPIO,
    TAR,
    TBZ2,
    TGZ,
    ZIP
}
