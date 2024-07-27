/**
 * @NAPIVersion 2.1
 * @NScriptType ClientScript
 */

import { EntryPoints } from "N/types";
import { load as loadRecord, Type as RecordType, RecordFieldSchema } from "N/record";

type InternalId = `${number}`;

interface BillFieldSchema extends RecordFieldSchema {
    tranid: string;
    trandate: Date;
    subsidiary: InternalId;
}

/**
 * By passing a generic to "load record" that maps each field ID to its JavaScript return type,
 * types are now inferred automatically when using "getValue".
 *
 * Types are also inferred for "setValue", helping ensure you are using the type any given
 * field id expects.
 */
function withFieldsMapGeneric() {
    const bill = loadRecord<BillFieldSchema>({
        type: RecordType.VENDOR_BILL,
        id: 1,
    });
    const billTranId = bill.getValue("tranid");
    const billDate = bill.getValue("trandate");
    const billUnmapped = bill.getValue("unmapped");

    /* No error! */
    billTranId.split("0");
    billDate.getUTCMilliseconds();
    billUnmapped.toString();

    /* This line will cause compile-time error, instead of one at runtime: */
    // bill.setValue("subsidiary", "NaN");  # Argument of type '"NaN"' is not assignable to parameter of type '`${number}`'.
    bill.setValue("subsidiary", "3");
}

/**
 * Not passing a generic will mean getValue returns a FieldValue, requiring you to cast the
 * value to use type-specific methods (This is the same behavior as before record maps were implemented).
 */
function withoutFieldsMapGeneric() {
    const bill = loadRecord({
        type: RecordType.VENDOR_BILL,
        id: 1,
    });
    const billTranId = bill.getValue("tranid");
    const billDate = bill.getValue("trandate");
    const billUnmapped = bill.getValue("unmapped");

    // /* This line would now cause a compile-time error: */
    // billDate.getUTCMilliseconds();  # Property 'getUTCMilliseconds' does not exist on type 'FieldValue'. Property 'getUTCMilliseconds' does not exist on type 'string'.

    (billTranId as string).split("0");
    (billDate as Date).getUTCMilliseconds();
    billUnmapped.toString();

    /* This line does not cause a compile-time error, meaning this bug will only surface at runtime: */
    bill.setValue("subsidiary", "NaN");
}

export const pageInit: EntryPoints.Client.pageInit = (_context) => {
    withFieldsMapGeneric();
    withoutFieldsMapGeneric();
};
