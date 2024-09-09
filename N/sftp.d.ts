import { File } from './file';

interface DownloadOptions {
    filename: string;
    directory?: string;
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

    /** The number of seconds to allow for the file to upload. By default, this value is set to 300 seconds. */
    timeout?: number;

    /** Indicates whether the file being uploaded should overwrite any file with the name options.filename that already exists in options.directory. If false, the FTP_FILE_ALREADY_EXISTS exception is thrown when a file with the same name already exists in the options.directory. By default, this value is false. */
    replaceExisting?: boolean;
}

export interface Connection {
    /** Downloads a file from the remote FTP server */
    download: (options: DownloadOptions) => File;
    /** Uploads a file to the remote FTP server */
    upload: (options: UploadOptions) => void;
    /** Creates an empty directory. */
    makeDirectory: (options: { path: string }) => void;
    /** Removes an empty directory. */
    removeDirectory: (options: { path: string }) => void;
    /** Removes a file. */
    removeFile: (options: { path: string }) => void;
    /** Moves a file or directory from one location to another. */
    move: (options: { from: string; to: string }) => void;
    /** Lists the remote directory. */
    list: (options: { path: string; sort: Sort }) => {
        directory: boolean;
        name: string;
        size: string;
        lastModified: string;
    }[];
}
interface CreateSFTPConnectionOptions {
    /** The host of the remote account. */
    url: string;

    /** The host key for the trusted fingerprint on the server. */
    hostKey: string;

    /** The username of the remote account. By default, the login is anonymous. */
    username?: string;

    /** The port used to connect to the remote account. By default, port 22 is used. */
    port?: number;

    /** The remote directory of the connection. */
    directory?: string;

    /** The number of seconds to allow for an established connection. By default, this value is set to 20 seconds. */
    timeout?: number;

    /** The type of host key specified by options.hostKey */
    hostKeyType?: 'dsa' | 'ecdsa' | 'rsa';
}

interface CreateSFTPConnectionWithPasswordOptions extends CreateSFTPConnectionOptions {
    /** The password GUID for the remote account. */
    passwordGuid: string;
}
interface CreateSFTPConnectionWithKeyOptions extends CreateSFTPConnectionOptions {
    /** The Key ID for the private key file uploaded to NetSuite */
    keyId: string;
}
interface CreateSFTPConnectionWithSecretOptions extends CreateSFTPConnectionOptions {
    /** The script ID of the secret used for authentication. Secrets are stored at Setup > Company > API Secrets. Since 2021.1. */
    secret: string;
}

/**
 * Establishes a connection to a remote FTP server.
 * To generate the passwordguid, you can create a suitelet that uses Form.addCredentialField(options).
 * Use the N/https Module to fetch the GUID value returned from the Suitelet's credential field.
 * For a Suitelet example, see N/https Module Script Sample.
 * For more information about supported SFTP protocol, see Supported Cipher Suites and Host Key Types
 */
export function createConnection(
    options:
        | CreateSFTPConnectionWithKeyOptions
        | CreateSFTPConnectionWithPasswordOptions
        | CreateSFTPConnectionWithSecretOptions,
): Connection;

export enum Sort {
    DATE,
    DATE_DESC,
    SIZE,
    SIZE_DESC,
    NAME,
    NAME_DESC,
}
