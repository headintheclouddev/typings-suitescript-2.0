import {File} from "../file";

interface getConfigurationFieldValueOptions {

    /** This property is required and refers to the name of the configuration value to retrieve */
    fieldName: string;
}

/** This object allows the plug-in to retrieve user-supplied configuration data (field values) for this plug-in */
interface pluginConfiguration {

    /**
     * This is an object function of pluginConfiguration that allows the plug-in to retrieve a named
     * configuration value. For all Financial Institution Connectivity Plug-ins that you develop, the
     * configuration_id value is available. This is a unique identifier at the format profile level.
     * It can be used to refer to a format profile, even if the record is not created
     */
    getConfigurationFieldValue: (options: getConfigurationFieldValueOptions) => string;
}

interface createNewTransactionOptions {

    /** The date of the transaction. NetSuite currently accepts the ISO 8601 extended local date format */
    date: string;

    /** The amount of the transactio */
    amount: number;

    /**
     * The raw bank transaction code used to map to a valid bank data type in NetSuite.
     * You can set a transaction code from the Code Type Mapping subtab on the Format Profile page,
     * or via SuiteScript using the getStandardTransactionCodes(context) interface function
     */
    transactionTypeCode?: string;

    /** The unique identifier of a transaction, which is used to detect duplicate imports */
    uniqueId?: string;

    /** The transaction number. For example, a cash sale transaction could have a transaction number of CS0001 */
    id?: string;

    /** The payee to whom the transaction is being sent */
    payee?: string;

    /** One of the standard currency codes to which the user has access */
    currency?: string;

    /** The memo of the transactiont */
    memo?: string;

    /** The status of the transaction */
    transactionStatus?: string;

    /** The customer ID for the transaction */
    customerReferenceId?: string;

    /** The customer name for the transactiont */
    customerName?: string;

    /** The list of invoice reference numbers for the transaction */
    invoiceReferenceIds?: string[];

    /** The amount of the billed tax in the account's billing currency */
    billedTaxAmount?: number;

    /** The transaction amount in local currency */
    localChargeAmount?: number;

    /** The amount of the billed tax in local currency */
    localTaxAmount?: number;

    /**
     * The exchange rate between local currency and the account’s billing currency.
     * The exchange rate on the transaction is based on the capture date.
     * The billing amount is divided by the local amount
     */
    currencyExchangeRate?: number;

    /** The raw expense code used to map to an expense category in NetSuite.
     * You can set an expense code from the Expense Code Mapping subtab on the Format Profile page,
     * or via SuiteScript using the getExpenseCodes(context) interface function
     */
    expenseCode?: string;
}

interface createAccountDataOptions {

    /**
     * The raw ID of the external account, which is used to link to a valid account in NetSuite via the
     * Format Profile or Upload File page
     */
    accountId?: string;

    /**
     * The NetSuite employee ID, if provided To link corporate card expense accounts to employee accounts,
     * the employee ID or cardholder name must be provided.
     */
    employeeId?: string;

    /**
     * The cardholder name for credit cards. To link corporate card expense accounts to employee accounts,
     * the cardholder name or employee ID must be provided.
     */
    cardHolder?: string;

    /**
     * The date when data from a financial services provider was last updated. This can correspond to a file date,
     * statement date, or other declared 'last updated' timestamp from the data source.
     * NetSuite currently accepts the ISO 8601 extended local date format.
     * When dataAsOfDate is set, the following fields are populated from the most recent imported account statement
     * containing a statement date:
     *      Bank Balance and Balance As Of on the Match Bank Data page
     *      Statement End Date and Ending Statement Balance on the Reconcile Account Statement page
     *
     * If no account statements contain a statement date, the following takes place:
     *      The Bank Balance and Balance As Of fields are not populated.
     *      The Statement End Date and Ending Statement Balance fields are populated with the current time, and
     *      the closing balance from the last reconciliation statement, respectively
     *
     * Note If you use a default parser to upload a file without an account statement date, NetSuite uses the
     * most recent imported transaction date to set the statement date. This date may or may not correspond to
     * the real account statement date.
     * The date must be in the format YYYY-MM-DD. For example, "2018-05-28".
     */
    dataAsOfDate?: string;

    /** The amount of money in the account at the start of an accounting period */
    openingBalance?: number;

    /** The amount of money left in the account at the end of an accounting perio */
    closingBalance?: number;

    /** The current amount of money in the accoun */
    currentBalance?: number;

    /** The amount of money owed on an account */
    dueBalance?: number;
}

interface accountData {

    /** Add a new imported transaction to the account data set */
    createNewTransaction: (options: createNewTransactionOptions) => void;
}

export interface parseDataContext {

    /** Allow the plug-in to retrieve user-suppled standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /** Access the input data to be parsed */
    inputData: File

    /** Create a new account data set */
    createAccountData: (options: createAccountDataOptions) => accountData;
}

/** Transform a data file into account and transaction data */
export type parseData = (options: parseDataContext) => void;

type creditDebit =
    "CREDIT" |
    "DEBIT";

type transactionType =
    "ACH" |
    "CHECK" |
    "CREDIT" |
    "CREDIT_OR_DEBIT" |
    "DEBIT" |
    "DEPOSIT" |
    "FEE" |
    "INTEREST" |
    "PAYMENT" |
    "TRANSFER" |
    "OTHER";

interface createNewStandardTransactionCodeOptions {

    /** The raw transaction code from the parsed transaction */
    transactionCode: string;

    /**
     * The bank data type in NetSuite to which the code maps, which can be one of the following:
     * ACH
     * CHECK
     * CREDIT
     * CREDIT_OR_DEBIT
     * DEBIT
     * DEPOSIT
     * FEE
     * INTEREST
     * PAYMENT
     * TRANSFER
     * OTHER
     */
    transactionType: transactionType;

    /**
     * Used by BAI2 or a similar file format to determine whether the amount should be positive or negative.
     * This parameter can be one of the following:
     * CREDIT
     * DEBIT
     */
    creditDebit?: creditDebit;

    /** A description of the kind of transaction that the transaction code represents */
    description?: string;
}

export interface getStandardTransactionCodesContext {

    /** Create a new StandardTransactionCode object for the plug-in to set property values */
    createNewStandardTransactionCode: (options: createNewStandardTransactionCodeOptions) => void;
}

/**
 * Retrieve transaction codes that are standard for this data format. On the format profile record, the Code Type
 * Mapping subtab displays a grid where you can provide custom transaction codes and map them to corresponding bank
 * data types in NetSuite
 */
export type  getStandardTransactionCodes = (options: getStandardTransactionCodesContext) => void;

interface createNewExpenseCodeOptions {

    /** A raw expense code supported by the data file */
    code: string;

    /** A description of the kind of expense that the expense code represents */
    description?: string;
}

export interface getExpenseCodesContext {

    /** Create a new ExpenseCode object for the plug-in to set property values */
    createNewExpenseCode: (options: createNewExpenseCodeOptions) => void;
}

/**
 * Retrieve expense codes as defined by the file format being used. When a format profile record is configured to
 * import corporate card expenses, the Expense Code Mapping subtab appears, which contains a grid populated with
 * values returned by getExpenseCodes(). This subtab enables you to map expense codes to expense categories to
 * automatically populate expense categories in expense reports
 */
export type  getExpenseCodes = (options: getExpenseCodesContext) => void;

export interface getConfigurationPageUrlContext {

    /** Allow the plug-in to retrieve user-suppled standard configuration properties (field values) for this plug-in */
    pluginConfiguration: pluginConfiguration;

    /** Set the URL to use for parser configuration */
    configurationPageUrl: string;
}

/**
 * Access the user interface for configuring the plug-in. For most plug-in authors, this is a URL to a Suitelet.
 * This URL appears on the Parser Configuration subtab on a format profile recor
 */
export type getConfigurationPageUrl = (options: getConfigurationPageUrlContext) => void;
