/**
 * Use the N/manufacturing/productionCharges module to update unit costs of manufacturing charges
 * on Assembly Build, Work Order Close, and Work Order Completion transactions.
 *
 * Prerequisites: the Assembly Items feature and the "Allow bulk cost updates for Production Charges"
 * preference must be enabled, and the user needs at least Edit permission on the relevant transactions.
 * Transactions modified by this module must be of type Assembly Build, Work Order Completion, or
 * Work Order Issue, and must be in an open posting period.
 *
 * Note: This module is only usable in server-side SuiteScript 2.1 scripts.
 * Note: Cost changes made using this module do not trigger other SuiteScript scripts.
 * @since 2026.1
 */

/**
 * Updates cost on specific transaction lines to a specified unit cost.
 *
 * Applies to transaction lines that are credit lines (quantity less than 0), are of type
 * Non-Inventory, Service, or Other Charge, use items designated for Purchase or Resale, and use
 * items whose cost category is not of type Outsourcing Charge, Landed, or Service.
 *
 * Supported script types: Server scripts.
 * @governance none
 * @throws {SuiteScriptError} INVALID_NUMBER_MUST_BE_GREATER_THAN_1 if options.transactionId or options.transactionLineIds is not a positive integer.
 * @throws {SuiteScriptError} FEATURE_1_MUST_BE_ENABLED_TO_USE_2_API if the Assembly Items feature is not enabled.
 * @throws {SuiteScriptError} PREFERENCE_1_REQUIRED_FOR_THIS_OPERATION if the "Allow bulk cost updates for Production Charges" preference is not enabled.
 * @throws {SuiteScriptError} ACCESS_DENIED if the user lacks at least Edit permission on the relevant transactions.
 * @throws {SuiteScriptError} TRANSACTION_1_IS_INVALID_OR_HAS_NO_EDITABLE_TRANSACTION_LINES if the transaction does not exist or has no lines editable through this API.
 * @throws {SuiteScriptError} PROVIDED_TRANSACTION_LINES_ARE_NOT_EDITABLE_OR_INVALID_1 if any provided transaction line does not exist or cannot be edited through this API.
 * @since 2026.1
 */
export function updateChargesToCustomUnitCost(options: {
    /** ID of transaction to be updated. */
    transactionId: number,
    /** Array of IDs of lines to be updated. */
    transactionLineIds: number[],
    /** New unit cost of item on transaction line. */
    newUnitCost: number,
    /**
     * Default value is true. When true, for lines with the Multiple Units of Measure feature enabled,
     * the new unit cost is applied as the unit cost of the base unit. When false, it is applied as a
     * fixed unit cost value irrespective of any Multiple Units of Measure conversion rates.
     * This parameter can only be used when the Multiple Units of Measure feature is enabled.
     */
    isUnitCostPerBaseUnit?: boolean,
}): void;

/**
 * Updates cost on specific transaction lines according to the current purchase price of the originating item.
 *
 * Applies to the same transaction line criteria as updateChargesToCustomUnitCost.
 *
 * Supported script types: Server scripts.
 * @governance none
 * @throws {SuiteScriptError} INVALID_NUMBER_MUST_BE_GREATER_THAN_1 if options.transactionId or options.transactionLineIds is not a positive integer.
 * @throws {SuiteScriptError} FEATURE_1_MUST_BE_ENABLED_TO_USE_2_API if the Assembly Items feature is not enabled.
 * @throws {SuiteScriptError} PREFERENCE_1_REQUIRED_FOR_THIS_OPERATION if the "Allow bulk cost updates for Production Charges" preference is not enabled.
 * @throws {SuiteScriptError} ACCESS_DENIED if the user lacks at least Edit permission on the relevant transactions.
 * @throws {SuiteScriptError} TRANSACTION_1_IS_INVALID_OR_HAS_NO_EDITABLE_TRANSACTION_LINES if the transaction does not exist or has no lines editable through this API.
 * @throws {SuiteScriptError} PROVIDED_TRANSACTION_LINES_ARE_NOT_EDITABLE_OR_INVALID_1 if any provided transaction line does not exist or cannot be edited through this API.
 * @since 2026.1
 */
export function updateChargesToItemPurchasePrice(options: {
    /** ID of transaction to be updated. */
    transactionId: number,
    /** Array of IDs of lines to be updated. */
    transactionLineIds: number[],
}): void;

/**
 * Updates cost on all routing and non-inventory transaction lines on a specified transaction to the current price.
 *
 * Supported script types: Server scripts.
 * @governance none
 * @throws {SuiteScriptError} INVALID_NUMBER_MUST_BE_GREATER_THAN_1 if options.transactionId or options.transactionLineIds is not a positive integer.
 * @throws {SuiteScriptError} FEATURE_1_MUST_BE_ENABLED_TO_USE_2_API if the Assembly Items feature is not enabled.
 * @throws {SuiteScriptError} PREFERENCE_1_REQUIRED_FOR_THIS_OPERATION if the "Allow bulk cost updates for Production Charges" preference is not enabled.
 * @throws {SuiteScriptError} ACCESS_DENIED if the user lacks at least Edit permission on the relevant transactions.
 * @throws {SuiteScriptError} TRANSACTION_1_IS_INVALID_OR_HAS_NO_EDITABLE_TRANSACTION_LINES if the transaction does not exist or has no lines editable through this API.
 * @since 2026.1
 */
export function updateAllChargesToItemPurchasePrice(options: {
    /** ID of transaction to be updated. */
    transactionId: number,
}): void;
