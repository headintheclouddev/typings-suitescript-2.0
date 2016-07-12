/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface FileModule {
    /**
     * Method used to create a new file in the NetSuite file cabinet.
     */
    create(options: FileCreateOptions): NSFile;
    /**
     * Method used to delete an existing file from the NetSuite file cabinet.
     */
    delete(options: FileDeleteOptions): void;
    /**
     * Method used to load an existing file from the NetSuite file cabinet.
     */
    load(options: FileLoadOptions): NSFile;
    /**
     * Method used to load an existing file from the NetSuite file cabinet.
     */
    load(idOrPath: number | string): NSFile;
    /**
     * Enumeration that holds the string values for supported character encoding.
     */
    Encoding: FileEncoding;
    /**
 * Enumeration that holds the string values for supported file types.
     */
    Type: FileType;
}

declare var _: FileModule;
export = _;
