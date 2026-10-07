/**
 * Use the N/transaction module to void transactions. When you void a transaction, the total and all the line items for the transaction are set to zero.
 * The transaction is not removed from the system.
 * The type of void performed (direct void or void by reversing journal) depends on the account's Using Reversing Journals preference.
 * Supported script types: Client and server scripts.
 */

import type {Type as RecordType} from './record';

interface VoidOptions {
    /** Internal ID of the specific transaction record instance to void. */
    id: number | string;
    /** The type of transaction record to void. Use the transaction.Type enum. */
    type: Type | RecordType | string;
}

interface TransactionVoidFunction {
    /**
     * Voids a transaction record.
     * @returns The ID of the voided record for a direct void, or the ID of the newly created voiding journal for a void by reversing journal.
     * @throws {SuiteScriptError} INVALID_RECORD_TYPE if the type argument is not valid or the record type is not voidable
     * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if the id argument is not valid
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the type or id argument is missing
     * @governance 10 units
     * @since 2015.2
     */
    (options: VoidOptions): number;
    /**
     * Voids a transaction record asynchronously. The parameters and errors are the same as those for transaction.void(options).
     * @returns A promise for the ID of the voided record (direct void) or of the newly created voiding journal (void by reversing journal).
     * @throws {SuiteScriptError} INVALID_RECORD_TYPE if the type argument is not valid or the record type is not voidable
     * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if the id argument is not valid
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the type or id argument is missing
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: VoidOptions): Promise<number>;
}

/**
 * Voids a transaction record. After you successfully void a transaction, you can no longer make changes to the transaction that impact the general ledger.
 * For transaction types that use direct void, the Void Transactions Using Reversing Journals preference must be disabled to avoid an error.
 *
 * @returns The ID of the voided record for a direct void, or the ID of the newly created voiding journal for a void by reversing journal.
 * @throws {SuiteScriptError} INVALID_RECORD_TYPE if the type argument is not valid or the record type is not voidable
 * @throws {SuiteScriptError} THAT_RECORD_DOES_NOT_EXIST if the id argument is not valid
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if the type or id argument is missing
 * @governance 10 units
 * @since 2015.2
 */
declare const voidFunc: TransactionVoidFunction;
export {voidFunc as void};

/**
 * N/transaction.Type enum. Holds the string values for supported transaction record types.
 * Used for the options.type parameter of transaction.void(options). Not every type supports voiding; see the "transaction.Type" Help Center topic.
 * @since 2015.2
 */
export enum Type { // Matches Oracle's transaction.Type values as of 2026.2
    ASSEMBLY_BUILD = 'assemblybuild',
    ASSEMBLY_UNBUILD = 'assemblyunbuild',
    BIN_TRANSFER = 'bintransfer',
    BIN_WORKSHEET = 'binworksheet',
    BLANKET_PURCHASE_ORDER = 'blanketpurchaseorder',
    CASH_REFUND = 'cashrefund',
    CASH_SALE = 'cashsale',
    CHECK = 'check',
    CREDIT_CARD_CHARGE = 'creditcardcharge',
    CREDIT_CARD_REFUND = 'creditcardrefund',
    CREDIT_MEMO = 'creditmemo',
    CUSTOMER_DEPOSIT = 'customerdeposit',
    CUSTOMER_PAYMENT = 'customerpayment',
    CUSTOMER_PAYMENT_AUTHORIZATION = 'customerpaymentauthorization',
    CUSTOMER_REFUND = 'customerrefund',
    CUSTOM_TRANSACTION = 'customtransaction',
    DEPOSIT = 'deposit',
    DEPOSIT_APPLICATION = 'depositapplication',
    ESTIMATE = 'estimate',
    EXPENSE_REPORT = 'expensereport',
    FULFILLMENT_REQUEST = 'fulfillmentrequest',
    INBOUND_SHIPMENT = 'inboundshipment',
    INVENTORY_ADJUSTMENT = 'inventoryadjustment',
    INVENTORY_COST_REVALUATION = 'inventorycostrevaluation',
    INVENTORY_COUNT = 'inventorycount',
    INVENTORY_STATUS_CHANGE = 'inventorystatuschange',
    INVENTORY_TRANSFER = 'inventorytransfer',
    INVOICE = 'invoice',
    ITEM_FULFILLMENT = 'itemfulfillment',
    ITEM_RECEIPT = 'itemreceipt',
    JOURNAL_ENTRY = 'journalentry',
    OPPORTUNITY = 'opportunity',
    ORDER_RESERVATION = 'orderreservation',
    PAYCHECK = 'paycheck',
    PAYCHECK_JOURNAL = 'paycheckjournal',
    PERIOD_END_JOURNAL = 'periodendjournal',
    PURCHASE_CONTRACT = 'purchasecontract',
    PURCHASE_ORDER = 'purchaseorder',
    PURCHASE_REQUISITION = 'purchaserequisition',
    RETURN_AUTHORIZATION = 'returnauthorization',
    REVENUE_ARRANGEMENT = 'revenuearrangement',
    REVENUE_COMMITMENT = 'revenuecommitment',
    REVENUE_COMMITMENT_REVERSAL = 'revenuecommitmentreversal',
    SALES_ORDER = 'salesorder',
    STORE_PICKUP_FULFILLMENT = 'storepickupfulfillment',
    TRANSFER_ORDER = 'transferorder',
    VENDOR_BILL = 'vendorbill',
    VENDOR_CREDIT = 'vendorcredit',
    VENDOR_PAYMENT = 'vendorpayment',
    VENDOR_PREPAYMENT = 'vendorprepayment',
    VENDOR_PREPAYMENT_APPLICATION = 'vendorprepaymentapplication',
    VENDOR_RETURN_AUTHORIZATION = 'vendorreturnauthorization',
    WAVE = 'wave',
    WORK_ORDER = 'workorder',
    WORK_ORDER_CLOSE = 'workorderclose',
    WORK_ORDER_COMPLETION = 'workordercompletion',
    WORK_ORDER_ISSUE = 'workorderissue',
}
