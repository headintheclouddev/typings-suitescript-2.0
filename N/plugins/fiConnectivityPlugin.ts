interface getConfigurationFieldValueOptions {
    fieldName: string;
}

interface addAccountOptions {
    accountMappingKey: string;
    displayName: string;
    accountType: string;
    currency: string;
    groupName: string;
    lastUpdated: string;
}

interface returnAccountRequestsJSONOptions {
    accountsJson: string;
}

interface addDaraChunkOptions {
    dataChunk: string;
}

interface retryOptions {
    deltaMinutesLater: number;
    currentFailureReason: string;
}

interface pluginConfiguration {

    /**
     * This is an object function of pluginConfiguration that allows the plug-in to retrieve a named
     * configuration value. For all Financial Institution Connectivity Plug-ins that you develop, the
     * configuration_id value is available. This is a unique identifier at the format profile level.
     * It can be used to refer to a format profile, even if the record is not created
     */
    getConfigurationFieldValue: (options: getConfigurationFieldValueOptions) => string;
}


/** We use this to specify the parsed contents of accountRequestsJSON and returnAccountRequestsJSON */
export interface IAccountRequest {
    dataStartTime: string;
    dataEndTime: string;
    accountMappingKey: string;
    failureReason?: string;
}

export interface getConfigurationIFrameUrlContext {

    pluginConfiguration: pluginConfiguration;

    /**
     * The URL to a user interface for configuring a connection to your financial institution.
     * This URL appears on the Connectivity Configuration subtab on the Format Profile page.
     */
    configurationIFrameUrl: string;
}

/**
 * Provides the user interface for configuring a connection to your financial institution. For most plug-in
 * authors, this is a URL to a Suitelet. This URL appears on the Connectivity Configuration subtab on a
 * format profile record
 */
export type getConfigurationIFrameUrl = (options: getConfigurationIFrameUrlContext) => void;

export interface getAccountsContext {

    pluginConfiguration: pluginConfiguration;

    /**
     * This function enables the plug-in to add bank or credit card accounts you want to link to corresponding
     * accounts in NetSuite. NetSuite displays the supplied accounts on the Account Linking subtab on a
     * Bank Reconciliation format profile record.
     */
    addAccount: (options: addAccountOptions) => void;
}

/**
 * Retrieves all available accounts from a financial institution. This function enables you to link bank or
 * credit card accounts to corresponding general ledger accounts in NetSuite. The function is invoked when you
 * open the Account Linking subtab on a Bank Reconciliation format profile record, or when bank data is imported
 * into NetSuite
 */
export type  getAccounts = (options: getAccountsContext) => void;

export interface getTransactionDataContext {

    pluginConfiguration: pluginConfiguration;

    /**
     * A list of financial institution accounts required for the plug-in to query bank data, as well as the
     * required data date ranges. The information retrieved is provided as a JSON format string
     * */
    accountRequestsJSON: string;

    /**
     * This function enables you to transmit the financial institution’s data file to NetSuite as a series of chunks.
     * It encrypts the incoming chunks before storing them in the database. Each chunk size has a 25–million
     * character limit.
     */
    addDataChunk: (options: addDaraChunkOptions) => void;

    /**
     * This function enables you to return the list of accounts queried by the plug-in, as well as the reason
     * for any query failures. The import job fails when one or more accounts return a failure reason during
     * the import. Failure reasons are displayed on the Banking Import History page
     */
    returnAccountRequestsJSON: (options: returnAccountRequestsJSONOptions) => void;

    /**
     * This function is invoked by the plug-in to check whether a bank import retry is allowed.
     * - A retry is not permitted if it is not called during an import job
     * - If a retry is called during an import job, a retry is permitted if there has been no more than one
     * failed import job in the past two hours for a format profile or for a single financial institution account
     */
    isRetryAllowed: () => boolean;

    /**
     * This method is invoked by the plug-in to schedule a bank import retry deltaMinutesLater minutes in the future.
     * The current import job will fail and a failure reason will appear. If your role has the Import Online Banking
     * File permission with create-level access at a minimum, the failure reason will include an error from the
     * plug-in. Otherwise, the failure reason will be more generic.
     */
    retry: (options: retryOptions) => void;
}

/**
 * This function enables the plug-in to invoke a Financial Institution Parser Plug-in or Bank Statement Parser
 * Plug-in to parse content into transactions. This happens when a bank data import is initiated
 */
export type  getTransactionData = (options: getTransactionDataContext) => void;