/** We use this to specify the parsed contents of accountRequestsJSON and returnAccountRequestsJSON */
export interface IAccountRequest {

    /**
     * The requested start time of the data to be retrieved. If a Bank Reconciliation format profile is saved
     * for the first time, NetSuite downloads data up to 60 calendar days old. After the first import,
     * dataStartTime can also be dependent on the last successful import
     */
    dataStartTime: string;

    /** The requested end time of the data to be retrieved. dataEndTime is the time when a bank data
     * import is initiated
     */
    dataEndTime: string;

    /** The financial institution account's unique identifier */
    accountMappingKey: string;

    /** If provided, indicates the reason for the failed imported statement */
    failureReason?: string;
}

interface getConfigurationFieldValueOptions {

    /** This property is required and refers to the name of the configuration value to retrieve */
    fieldName: string;
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

export interface getConfigurationIFrameUrlContext {

    /** Allow the plug-in to retrieve user-suppled standard configuration properties (field values) for this plug-in */
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

/** Valid account types */
type accountType =
    "ACCOUNTS_PAYABLE" |
    "ACCOUNTS_RECEIVABLE" |
    "BANK" |
    "COGS" |
    "CREDIT_CARD" |
    "DEFERRED_EXPENSE" |
    "DEFERRED_REVENUE" |
    "EQUITY" |
    "EXPENSE" |
    "FIXED_ASSET" |
    "INCOME" |
    "LONG_TERM_LIABILITY" |
    "NON_POSTING" |
    "OTHER_ASSET" |
    "OTHER_CURRENT_ASSET" |
    "OTHER_CURRENT_LIABILITY" |
    "OTHER_EXPENSE" |
    "OTHER_INCOME" |
    "STATISTICAL" |
    "UNBILLED_RECEIVABLES";

interface addAccountOptions {

    /**
     * The financial institution account’s unique identifier. For compliance reasons, this cannot be a
     * credit card number. To ensure that the account mapping key does not contain a credit card number,
     * NetSuite removes all non-numeric characters.
     *
     *      If the remaining string is less than 13 characters or greater than 20 characters,
     *      NetSuite accepts the account mapping key.
     *
     *      If the remaining string is greater than 12 characters and less than 21 characters,
     *      NetSuite performs a Luhn check. If the check passes, NetSuite blocks you from using
     *      the account mapping key. If the check fails, NetSuite accepts the account mapping key
     */
    accountMappingKey: string;

    /** The financial institution account name capable of being displayed */
    displayName?: string;

    /**
     * The account type that should map to a NetSuite account type.
     * Valid types include:
     * ACCOUNTS_PAYABLE
     * ACCOUNTS_RECEIVABLE
     * BANK
     * COGS
     * CREDIT_CARD
     * DEFERRED_EXPENSE
     * DEFERRED_REVENUE
     * EQUITY
     * EXPENSE
     * FIXED_ASSET
     * INCOME
     * LONG_TERM_LIABILITY
     * NON_POSTING
     * OTHER_ASSET
     * OTHER_CURRENT_ASSET
     * OTHER_CURRENT_LIABILITY
     * OTHER_EXPENSE
     * OTHER_INCOME
     * STATISTICAL
     * UNBILLED_RECEIVABLES
     */
    accountType: accountType;

    /**
     * The financial institution account currency code. Use this on the Account Linking or Employee Linking
     * subtab to filter by NetSuite accounts with the same currency. The currency input parameter must be a
     * valid ISO 4217 currency code
     */
    currency: string;

    /**
     * The financial institution name that can be displayed, which is used for grouping accounts from
     * the same financial institution
     */
    groupName: string;

    /**
     * The last time the financial institution updated data for an account. If the financial institution has
     * not updated the account since the last import, then you know there is no new data to import.
     * If getAccounts() returns a lastUpdated value for an account, NetSuite calls getTransactionData(),
     * and the dataEndTime field for that account is populated based on the lastUpdated value. This indicates
     * to the plug-in that NetSuite is requesting bank data up to the date provided by the lastUpdated value
     */
    lastUpdated?: string;
}

export interface getAccountsContext {

    /** Allow the plug-in to retrieve user-suppled standard configuration properties (field values) for this plug-in */
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

interface addDataChunkOptions {

    /**
     * This function enables you to transmit the financial institution’s data file to NetSuite as a series of chunks.
     * It encrypts the incoming chunks before storing them in the database.
     * Each chunk size has a 25–million character limit.
     */
    dataChunk: string;
}

interface returnAccountRequestsJSONOptions {

    /**
     * Contains the list of financial institution accounts queried by the plug-in, as well as the reason for any
     * query failures. This information is returned as a JSON format string
     */
    accountsJson: string;
}

interface retryOptions {

    /**
     * How many minutes into the future to schedule the import retry. Must be greater than or equal to 30,
     * and less than or equal to 240
     */
    deltaMinutesLater: number;

    /** The reason an import retry is needed */
    currentFailureReason: string;
}

export interface getTransactionDataContext {

    /** Allow the plug-in to retrieve user-suppled standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /**
     * A list of financial institution accounts required for the plug-in to query bank data, as well as the
     * required data date ranges. The information retrieved is provided as a JSON format string
     */
    accountRequestsJSON: string;

    /**
     * This function enables you to transmit the financial institution’s data file to NetSuite as a series of chunks.
     * It encrypts the incoming chunks before storing them in the database. Each chunk size has a 25–million
     * character limit.
     */
    addDataChunk: (options: addDataChunkOptions) => void;

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