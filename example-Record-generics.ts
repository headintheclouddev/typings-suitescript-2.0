/**
 * @NAPIVersion 2.1
 * @NScriptType ClientScript
 */

import { EntryPoints } from "N/types";
import { load as loadRecord, Type as RecordType, RecordFieldsMap } from "N/record";

type InternalId = `${number}`;

interface BillFieldsMap extends RecordFieldsMap {
    tranid: string;
    subsidiary: InternalId;
    trandate: Date;
}

/**
 * By passing a generic to "load record" that maps each field ID to its JavaScript return type,
 * types are now inferred automatically when using "getValue".
 */
function withFieldsMapGeneric() {
    const bill = loadRecord<BillFieldsMap>({
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

    (billTranId as InternalId).split("0");
    (billDate as Date).getUTCMilliseconds();
    billUnmapped.toString();
}

export const pageInit: EntryPoints.Client.pageInit = (_context) => {
    withFieldsMapGeneric();
    withoutFieldsMapGeneric();
};
