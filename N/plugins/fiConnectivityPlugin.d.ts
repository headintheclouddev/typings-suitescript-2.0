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

    /**
     * If provided, indicates the reason for the failed imported statement.
     * Note: Oracle is phasing out free-text failure reasons in favor of errorCode.
     */
    failureReason?: string;

    /**
     * Standardized account-level error code for the failure (see Bank Import Error Codes (Reference)).
     * All valid account-level error codes begin with "2".
     */
    errorCode?: string;
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

    /** Allow the plug-in to retrieve user-supplied standard configuration properties (field values) for this plug-in */
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
     * If provided, indicates the reason the account could not be retrieved.
     * Note: Oracle is phasing out free-text failure reasons in favor of errorCode.
     */
    failureReason?: string;

    /**
     * Standardized account-level error code for an account retrieval failure (see Bank Import Error Codes (Reference)).
     * All valid account-level error codes begin with "2".
     */
    errorCode?: string;

    /**
     * The last time the financial institution updated data for an account. If the financial institution has
     * not updated the account since the last import, then you know there is no new data to import.
     * If getAccounts() returns a lastUpdated value for an account, NetSuite calls getTransactionData(),
     * and the dataEndTime field for that account is populated based on the lastUpdated value. This indicates
     * to the plug-in that NetSuite is requesting bank data up to the date provided by the lastUpdated value
     */
    lastUpdated?: string;
}

interface retryOptions {

    /**
     * How many minutes into the future to schedule the import retry. Must be greater than or equal to 30,
     * and less than or equal to 240
     */
    deltaMinutesLater: number;

    /** -optional- The reason an import retry is needed */
    currentFailureReason?: string;
}

export interface getAccountsContext {

    /** Allow the plug-in to retrieve user-supplied standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /**
     * This function enables the plug-in to add bank or credit card accounts you want to link to corresponding
     * accounts in NetSuite. NetSuite displays the supplied accounts on the Account Linking subtab on a
     * Bank Reconciliation format profile record.
     */
    addAccount: (options: addAccountOptions) => void;

    /**
     * This function is invoked by the plug-in to check whether a bank import retry is allowed.
     * - A retry is not permitted if it is not called during an import job
     * - If a retry is called during an import job, a retry is permitted if there has been no more than one
     * failed import job in the past two hours for a format profile or for a single financial institution account
     */
    isRetryAllowed: () => boolean;

    /**
     * This method is invoked by the plug-in to schedule a bank import retry deltaMinutesLater minutes in the future.
     * The current import job is marked as failed, and then a retry is initiated.
     * @throws {SuiteScriptError} SSS_RETRY_NOT_ALLOWED if retry is called when retry is not allowed.
     * @throws {SuiteScriptError} SSS_INVALID_RETRY_DELAY if deltaMinutesLater is outside of the valid range.
     * @throws {SuiteScriptError} SSS_RETRY_FAILURE_REASON_SIZE_LIMIT_EXCEEDED if currentFailureReason is too long.
     */
    retry: (options: retryOptions) => void;
}

/**
 * Retrieves all available accounts from a financial institution. This function enables you to link bank or
 * credit card accounts to corresponding general ledger accounts in NetSuite. The function is invoked when you
 * open the Account Linking subtab on a Bank Reconciliation format profile record, or when bank data is imported
 * into NetSuite
 */
export type getAccounts = (options: getAccountsContext) => void;

interface addDataChunkOptions {

    /**
     * A chunk of data from your financial institution's data file. NetSuite encrypts each chunk before storing it
     * in the database. Encryption and multibyte characters can increase a chunk's size. Each chunk supports
     * approximately 14 million single-byte characters.
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

export interface getTransactionDataContext {

    /** Allow the plug-in to retrieve user-supplied standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /**
     * A list of financial institution accounts required for the plug-in to query bank data, as well as the
     * required data date ranges. The information retrieved is provided as a JSON format string that parses to
     * an IAccountRequest[]. Only applicable to Bank Reconciliation format profile setups.
     */
    accountRequestsJSON: string;

    /**
     * This function sends a financial institution's data file to NetSuite in chunks. NetSuite encrypts each chunk
     * before storing it in the database. Each chunk supports approximately 14 million single-byte characters.
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
     * @throws {SuiteScriptError} SSS_RETRY_NOT_ALLOWED if retry is called when retry is not allowed.
     * @throws {SuiteScriptError} SSS_INVALID_RETRY_DELAY if deltaMinutesLater is outside of the valid range.
     * @throws {SuiteScriptError} SSS_RETRY_FAILURE_REASON_SIZE_LIMIT_EXCEEDED if currentFailureReason is too long.
     */
    retry: (options: retryOptions) => void;
}

/**
 * This function enables the plug-in to invoke a Financial Institution Parser Plug-in or Bank Statement Parser
 * Plug-in to parse content into transactions. This happens when a bank data import is initiated
 */
export type getTransactionData = (options: getTransactionDataContext) => void;
interface addAccountErrorOptions {

    /** The financial institution account's unique identifier. Must match an entry in accountRequestsJSON. */
    accountMappingKey: string;

    /**
     * The error message for the failure. If provided, the account isn't included in accountRequestsJSON when
     * getTransactionData is called.
     */
    failureReason?: string;

    /**
     * Standardized error code for account retrieval failure (see Bank Import Error Codes (Reference)).
     * All valid account-level error codes begin with "2". Values that aren't part of the valid list are converted
     * to "2000000000".
     */
    errorCode?: string;
}

interface setRefreshRequestIdOptions {

    /** The request ID returned from the Account Information Service Provider (AISP) when a data refresh is requested. */
    refreshRequestId: string;
}

export interface refreshDataContext {

    /** Allow the plug-in to retrieve user-supplied standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /**
     * A list of financial institution accounts to refresh, provided as a JSON format string that parses to an
     * IAccountRequest[].
     */
    accountRequestsJSON: string;

    /**
     * Records an error for an account specified in accountRequestsJSON. Use this function to indicate that a data
     * refresh couldn't be initiated for the account.
     */
    addAccountError: (options: addAccountErrorOptions) => void;

    /**
     * Records the request ID returned from the AISP when a data refresh is requested. Do not call this function if
     * the request is unsuccessful. Only applicable to Corporate Card Expenses type format profiles.
     * @throws {SuiteScriptError} SSS_INVALID_REFRESH_REQUEST_ID if refreshRequestId is an empty string, null, or undefined.
     */
    setRefreshRequestId: (options: setRefreshRequestIdOptions) => void;
}

/**
 * Initiates an on-demand request for the latest transaction data from the Account Information Service Provider
 * (AISP) for one or more connected accounts.
 */
export type refreshData = (context: refreshDataContext) => void;

/** The refresh request status values available on getRefreshRequestStatusContext.status. */
interface refreshRequestStatusEnum {
    readonly NOT_FOUND: string;
    readonly IN_PROGRESS: string;
    readonly FAILED: string;
    readonly COMPLETED: string;
}

interface returnRefreshRequestStatusOptions {

    /**
     * The request ID returned from the AISP when a data refresh is requested, which must match
     * context.refreshRequestId. Otherwise, the status is set to NOT_FOUND.
     */
    refreshRequestId: string;

    /** The status returned from the AISP. Must be one of the context.status values. */
    status: string;
}

export interface getRefreshRequestStatusContext {

    /** Allow the plug-in to retrieve user-supplied standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /** The request ID previously recorded with setRefreshRequestId(options). */
    refreshRequestId: string;

    /** Holds the status enumeration values: NOT_FOUND, IN_PROGRESS, FAILED, COMPLETED. */
    status: refreshRequestStatusEnum;

    /** Returns the status of the refresh request for data from the AISP. */
    returnRefreshRequestStatus: (options: returnRefreshRequestStatusOptions) => void;
}

/**
 * Retrieves the status of a data refresh request from the Account Information Service Provider (AISP).
 * Only applicable to connectivity plug-ins used in Corporate Card Expenses type format profiles.
 */
export type getRefreshRequestStatus = (context: getRefreshRequestStatusContext) => void;
