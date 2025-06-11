
interface VoidOptions {
    id: number|string;
    type: string|Type;
}

interface TransactionVoidFunction {
    (options: VoidOptions): number;
    promise(options: VoidOptions): Promise<number>;
}

declare const voidFunc: TransactionVoidFunction;
export {voidFunc as void};

/** N/transaction.Type enum */
export enum Type { // As of 6 June 2025
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
