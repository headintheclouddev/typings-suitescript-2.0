/**
 * Load the N/compress module to compress and decompress files. You can also use these APIs to archive multiple files in a single file archive such as TAR or ZIP file.
 *
 * You can compress and decompress individual files by using compress.gzip(options) and compress.gunzip(options).
 *
 * You can create an archive by using compress.createArchiver() and add multiple files to the archive.
 *
 * Supported script types: Server scripts.
 * @since 2020.2
 */

import type {File} from './file';

interface ArchiverAddOptions {
    /** The file to be archived. */
    file: File;
    /** The target directory in the archive. If this parameter is not specified, the file is placed in the root directory of the archive. */
    directory?: string;
}

interface ArchiverArchiveOptions {
    /** The name of the archive file. */
    name: string;
    /**
     * The archive type. See the compress.Type enum.
     * This parameter does not need to be specified if options.name has one of the following extensions: .cpio, .tar, .tar.gz, .tar.bz2, .tgz, .tbz2, .zip.
     */
    type?: Type | string;
}

/**
 * The functionality for creating an archive file. Use compress.createArchiver() to create this object.
 * @since 2020.2
 */
export interface Archiver {
    /**
     * Adds a file to be archived. In the archive, the path to the target file is options.directory or options.file.name.
     * @throws {SuiteScriptError} COMPRESS_API_DUPLICATE_PATH if a file has already been added using the same target path.
     * @throws {SuiteScriptError} COMPRESS_API_FILE_IS_TOO_LARGE if the file cannot be compressed due to size.
     * @governance none
     * @since 2020.2
     */
    add(options: ArchiverAddOptions): void;
    /**
     * Creates an archive with the added files and returns it as a temporary file object.
     * @throws {SuiteScriptError} COMPRESS_API_UNSUPPORTED_ARCHIVE_TYPE if options.type is an invalid archive type.
     * @throws {SuiteScriptError} COMPRESS_API_UNRECOGNIZED_ARCHIVE_FILE_EXTENSION if options.type is not specified and the archive type cannot be determined.
     * @throws {SuiteScriptError} COMPRESS_API_UNABLE_TO_RETRIEVE_FILE_CONTENTS if the contents cannot be retrieved for any of the files to be archived.
     * @governance 25 units
     * @since 2020.2
     */
    archive(options: ArchiverArchiveOptions): File;
}

interface GZipOptions {
    /** The file to be compressed. */
    file: File;
    /** The compression level. 0 is no compression. 9 is the best compression level. */
    level?: number;
}

/**
 * Compresses a file by using gzip and returns it as a temporary file object.
 * @throws {SuiteScriptError} COMPRESS_API_UNABLE_TO_RETRIEVE_FILE_CONTENTS if the contents of the file cannot be retrieved.
 * @throws {SuiteScriptError} COMPRESS_API_COMPRESSION_LEVEL_OUT_OF_RANGE if options.level is outside of the valid range (0 - 9).
 * @throws {SuiteScriptError} COMPRESS_API_FILE_IS_TOO_LARGE if the file cannot be compressed due to size.
 * @governance none
 * @since 2020.2
 */
export function gzip(options: GZipOptions): File;

/**
 * Decompresses a file that was compressed using gzip and returns it as a temporary file object.
 * @throws {SuiteScriptError} COMPRESS_API_DECOMPRESS_ERROR if the file cannot be decompressed.
 * @throws {SuiteScriptError} COMPRESS_API_UNABLE_TO_RETRIEVE_FILE_CONTENTS if the contents of the file cannot be retrieved.
 * @governance none
 * @since 2020.2
 */
export function gunzip(options: { file: File }): File;

/**
 * Creates a compress.Archiver object that can be used for creating file archives, such as ZIP or TAR files.
 * @governance none
 * @since 2020.2
 */
export declare function createArchiver(): Archiver;

/**
 * Holds the string values for the archive types. Use this enum to set the options.type parameter of Archiver.archive(options).
 * @since 2020.2
 */
export enum Type {
    CPIO,
    TAR,
    TBZ2,
    TGZ,
    ZIP
}
