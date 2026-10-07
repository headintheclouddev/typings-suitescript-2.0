/**
 * Use the N/sftp module to manage folders and upload or download files from external SSH file transfer (SFTP) servers.
 * All SFTP transfers to or from NetSuite must originate from SuiteScript.
 * Paths, directories, and filenames that contain wildcards such as ? and * must have those characters escaped unless they are intended as wildcards.
 * Supported script types: Server scripts.
 */

import type {File} from './file';

interface DownloadOptions {
    /** The name of the file to download. */
    filename: string;
    /** -optional- The relative path to the directory that contains the file to download. By default, the path is set to the current directory. */
    directory?: string;
    /** -optional- The number of seconds to allow for the file to download. By default, this value is set to 300 seconds. */
    timeout?: number;
}

interface UploadOptions {
    /** The file to upload. */
    file: File;

    /** The name to give the uploaded file on server. By default, the filename is the same specified by options.file.
        Note: Illegal characters are automatically escaped. */
    filename?: string;

    /** The relative path to the directory where the file should be upload to. By default, the path is set to the current directory. */
    directory?: string;

    /**
     * The number of seconds to allow for the file to upload. By default, this value is set to 300 seconds.
     * This is not an overall timeout; it is only applied when no data is received within the specified period.
     */
    timeout?: number;

    /** Indicates whether the file being uploaded should overwrite any file with the name options.filename that already exists in options.directory. If false, the FTP_FILE_ALREADY_EXISTS exception is thrown when a file with the same name already exists in the options.directory. By default, this value is false. */
    replaceExisting?: boolean;
}

interface PathOptions {
    /** The relative path of the directory or file. */
    path: string;
}

interface MoveOptions {
    /** The relative path of the file to be moved from. */
    from: string;
    /** The relative path of the file to be moved to. */
    to: string;
}

interface ListOptions {
    /** The relative path to the directory to list. */
    path: string;
    /** The sort options. Use values from sftp.Sort. */
    sort: Sort;
}

/** A file or directory entry returned by Connection.list(options). */
export interface ListEntry {
    /** If true, the entry is a directory. If false, it is a file. */
    directory: boolean;
    /** The name of the file. */
    name: string;
    /** The size of the file. */
    size: string;
    /** The last modification date. */
    lastModified: string;
}

/**
 * Represents a connection to the account on the remote FTP server.
 * @since 2016.2
 */
export interface Connection {
    /**
     * Downloads a file from the remote FTP server.
     * @throws {SuiteScriptError} FTP_MAXIMUM_FILE_SIZE_EXCEEDED if the file size is greater than the maximum file size allowed by NetSuite.
     * @throws {SuiteScriptError} FTP_NO_SUCH_FILE_OR_DIRECTORY if the file or directory does not exist.
     * @throws {SuiteScriptError} FTP_TRANSFER_TIMEOUT_EXCEEDED if the transfer takes longer than options.timeout.
     * @throws {SuiteScriptError} FTP_INVALID_TRANSFER_TIMEOUT if options.timeout is negative, zero, or greater than 300 seconds.
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
     * @throws {SuiteScriptError} CONNECTION_RESET if the connection was reset.
     * @throws {SuiteScriptError} THE_REMOTE_PATH_FOR_FILE_IS_NOT_VALID if the file's remote path is invalid.
     * @throws {SuiteScriptError} CONNECTION_CLOSED_BY_HOST if the connection was closed by the host.
     * @governance 100 units
     * @since 2016.2
     */
    download: (options: DownloadOptions) => File;
    /**
     * Uploads a file to the remote FTP server. The maximum file size that can be uploaded is 100 MB.
     * @throws {SuiteScriptError} FTP_NO_SUCH_FILE_OR_DIRECTORY if the file or directory does not exist.
     * @throws {SuiteScriptError} FTP_TRANSFER_TIMEOUT_EXCEEDED if the transfer takes longer than options.timeout.
     * @throws {SuiteScriptError} FTP_INVALID_TRANSFER_TIMEOUT if options.timeout is negative, zero, or greater than 300 seconds.
     * @throws {SuiteScriptError} FTP_FILE_ALREADY_EXISTS if options.replaceExisting is false and a file with the same name exists in the remote directory, or if the SFTP server does not support the STAT command and requires the LIST command.
     * @throws {SuiteScriptError} CONNECTION_RESET if the connection was reset.
     * @throws {SuiteScriptError} THE_REMOTE_PATH_FOR_FILE_IS_NOT_VALID if the file's remote path is invalid.
     * @throws {SuiteScriptError} CONNECTION_CLOSED_BY_HOST if the connection was closed by the host.
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
     * @governance 100 units
     * @since 2016.2
     */
    upload: (options: UploadOptions) => void;
    /**
     * Creates an empty directory.
     * (Oracle's Connection members table lists the return type as string; the method page says void.)
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
     * @throws {SuiteScriptError} FTP_DIRECTORY_NOT_FOUND if creating a directory in a non-existent directory.
     * @governance 10 units
     * @since 2019.2
     */
    makeDirectory: (options: PathOptions) => void;
    /**
     * Removes an empty directory.
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
     * @throws {SuiteScriptError} FTP_DIRECTORY_NOT_FOUND if deleting a directory that does not exist.
     * @throws {SuiteScriptError} FTP_DIRECTORY_NOT_EMPTY if deleting a directory that is not empty.
     * @governance 10 units
     * @since 2019.2
     */
    removeDirectory: (options: PathOptions) => void;
    /**
     * Removes a file.
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
     * @throws {SuiteScriptError} FTP_NO_SUCH_FILE_OR_DIRECTORY if the file or directory does not exist.
     * @governance 10 units
     * @since 2019.2
     */
    removeFile: (options: PathOptions) => void;
    /**
     * Moves a file or directory from one location to another.
     * @throws {SuiteScriptError} FTP_INVALID_MOVE if the source is not readable or the target is not writable, or the source or target does not exist.
     * @governance 10 units
     * @since 2019.2
     */
    move: (options: MoveOptions) => void;
    /**
     * Lists the contents of a remote directory. This method can return a maximum of 5000 results.
     * @throws {SuiteScriptError} FTP_INVALID_DIRECTORY if the directory does not exist on the remote FTP server.
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
     * @governance 10 units
     * @since 2019.2
     */
    list: (options: ListOptions) => ListEntry[];
    /**
     * The maximum file size (100000000).
     * Oracle documents this as an enum holding a single value; it is typed as a number constant.
     * @since 2019.2
     */
    readonly MAX_FILE_SIZE: number;
    /**
     * The maximum transfer timeout, in seconds (300).
     * Oracle documents this as an enum holding a single value; it is typed as a number constant.
     * @since 2019.2
     */
    readonly MAX_TRANSFER_TIMEOUT: number;
}

interface CreateSFTPConnectionOptions {
    /** The host of the remote account. */
    url: string;

    /** The host key for the trusted fingerprint on the server. */
    hostKey: string;

    /**
     * The username of the remote account. The script ID of a secret can be accepted for this parameter.
     * By default, the login is anonymous. (Oracle's parameter table marks this as required but also says the login defaults to anonymous, so it is typed as optional.)
     */
    username?: string;

    /** The port used to connect to the remote account. By default, port 22 is used. */
    port?: number;

    /** The remote directory of the connection. Required if the remote server cannot resolve relative paths. */
    directory?: string;

    /** The number of seconds to allow for an established connection. Must be between 1 and 20. By default, this value is set to 20 seconds. */
    timeout?: number;

    /** The type of host key specified by options.hostKey */
    hostKeyType?: 'dsa' | 'ecdsa' | 'rsa';
}

interface CreateSFTPConnectionWithPasswordOptions extends CreateSFTPConnectionOptions{
    /**
     * The password GUID for the remote account. You can create a GUID using Form.addCredentialField(options).
     * Can be combined with options.keyId for two-factor authentication. Cannot be combined with options.secret.
     */
    passwordGuid: string;
}
interface CreateSFTPConnectionWithKeyOptions extends CreateSFTPConnectionOptions {
    /**
     * The script ID of the key (uploaded at Setup > Company > Keys, PEM format) to be used for authentication.
     * @since 2019.2
     */
    keyId: string;
    /** -optional- A password GUID, for two-factor authentication together with options.keyId. Cannot be combined with options.secret. */
    passwordGuid?: string;
    /**
     * -optional- The script ID of a secret, for two-factor authentication together with options.keyId. Cannot be combined with options.passwordGuid.
     * @since 2021.1
     */
    secret?: string;
}
interface CreateSFTPConnectionWithSecretOptions extends CreateSFTPConnectionOptions {
    /**
     * The script ID of the secret used for authentication. Secrets are stored at Setup > Company > API Secrets.
     * Can be combined with options.keyId for two-factor authentication. Cannot be combined with options.passwordGuid.
     * @since 2021.1
     */
    secret: string;
}

/**
 * Establishes a connection to a remote FTP server.
 * To generate the passwordGuid, you can create a Suitelet that uses Form.addCredentialField(options).
 * For more information about supported SFTP protocol, see Supported Cipher Suites and Host Key Types.
 * @throws {SuiteScriptError} FTP_UNKNOWN_HOST if the host could not be found.
 * @throws {SuiteScriptError} FTP_CONNECT_TIMEOUT_EXCEEDED if a connection could not be established within options.timeout.
 * @throws {SuiteScriptError} FTP_CANNOT_ESTABLISH_CONNECTION if the password/username was invalid or permission to access the directory was denied.
 * @throws {SuiteScriptError} FTP_INVALID_PORT_NUMBER if the port number is invalid.
 * @throws {SuiteScriptError} FTP_INVALID_CONNECTION_TIMEOUT if options.timeout is negative, zero, or greater than 20 seconds.
 * @throws {SuiteScriptError} FTP_INVALID_DIRECTORY if the directory does not exist on the remote FTP server.
 * @throws {SuiteScriptError} FTP_INCORRECT_HOST_KEY if options.hostKey does not match the host key presented by the remote FTP server.
 * @throws {SuiteScriptError} FTP_INCORRECT_HOST_KEY_TYPE if options.hostKeyType and the provided host key type do not match.
 * @throws {SuiteScriptError} FTP_MALFORMED_HOST_KEY if options.hostKey is not in the correct format (for example, base 64, 96+ bytes).
 * @throws {SuiteScriptError} FTP_PERMISSION_DENIED if access to the file or directory on the remote FTP server was denied.
 * @throws {SuiteScriptError} FTP_UNSUPPORTED_ENCRYPTION_ALGORITHM if the remote FTP server does not support one of NetSuite's approved algorithms.
 * @throws {SuiteScriptError} AUTHENTICATION_FAIL_TOO_MANY_INCORRECT_AUTHENTICATION_ATTEMPTS if there are too many incorrect authentication attempts.
 * @throws {SuiteScriptError} NO_ROUTE_TO_HOST_FOUND if no route to the host can be found.
 * @throws {SuiteScriptError} CONNECTION_RESET if the connection was reset.
 * @throws {SuiteScriptError} CONNECTION_CLOSED_BY_HOST if the connection was closed by the host.
 * @throws {SuiteScriptError} THE_REMOTE_PATH_FOR_FILE_IS_NOT_VALID if the file's remote path is invalid.
 * @throws {SuiteScriptError} SFTPCREDENTIAL_ENCODING_ERROR if there is an SFTP credential encoding error.
 * @throws {SuiteScriptError} UNABLE_TO_GET_SFTP_SERVER_ADDRESS if the SFTP server address is unavailable.
 * @throws {SuiteScriptError} MUTUALLY_EXCLUSIVE_ARGUMENTS if both options.secret and options.passwordGuid are defined.
 * @governance none
 * @since 2016.2
 */
export function createConnection(options: CreateSFTPConnectionWithKeyOptions | CreateSFTPConnectionWithPasswordOptions | CreateSFTPConnectionWithSecretOptions): Connection;

/**
 * Holds the values to be used to sort the listed directory. Use this enum to set options.sort of Connection.list(options).
 * @since 2019.2
 */
export enum Sort {
    DATE,
    DATE_DESC,
    SIZE,
    SIZE_DESC,
    NAME,
    NAME_DESC
}

/**
 * The maximum connection timeout, in seconds (20).
 * Oracle documents the sftp.MAX_/MIN_/DEFAULT_ values as enums holding a single value; they are typed as number constants.
 * @since 2016.2
 */
export const MAX_CONNECT_TIMEOUT: number;
/**
 * The minimum connection timeout, in seconds (1).
 * @since 2016.2
 */
export const MIN_CONNECT_TIMEOUT: number;
/**
 * The maximum port number (65535).
 * @since 2019.2
 */
export const MAX_PORT_NUMBER: number;
/**
 * The minimum port number (0).
 * @since 2019.2
 */
export const MIN_PORT_NUMBER: number;
/**
 * The default port number (22).
 * @since 2019.2
 */
export const DEFAULT_PORT_NUMBER: number;
