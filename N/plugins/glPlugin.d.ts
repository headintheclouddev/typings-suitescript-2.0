import * as N_record from '../record';

interface GetSegmentOptions {
    segmentId: string;
}

interface SetsegmentOptions extends GetSegmentOptions {
    segmentValueId: number;
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017098 */
interface CustomLine {
    accountId: number;
    readonly amount: string;
    classId: number;
    creditAmount: string;
    debitAmount: string;
    departmentId: number;
    entityId: number;
    isBookSpecific: boolean;
    locationId: number;
    memo: string;
    segments: string[];
    getSegmentValueId(options: GetSegmentOptions):  number;
    setSegmentValueId(options: SetsegmentOptions): void;
}

interface GetLineOptions {
    index: number
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017095 */
interface CustomLines {
    readonly count: number;
    addNewLine(): CustomLine;
    getLine(options: GetLineOptions): CustomLine
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017097 */
interface StandardLine {
    readonly accountId: number;
    amount: string;
    readonly classId: number;
    readonly creditAmount: string;
    readonly debitAmount: string;
    readonly departmentId: string;
    readonly entityId: string;
    readonly id: number;
    readonly isPosting: boolean;
    readonly isTaxable: boolean;
    readonly locationId: number;
    readonly memo: string;
    readonly subsidiaryId: number;
    readonly taxAmount: string;
    readonly taxableAmount: string;
    readonly taxItemId: number;
    readonly taxType: string;

    getSegmentValueId(options: GetSegmentOptions):  number;
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017094 */
interface StandardLines {
    readonly count: number;
    getLine(options: GetLineOptions): StandardLine
}

interface AccountingBook {
    readonly id: number;
    readonly isPrimary: boolean;
}

interface glPluginContext {
    standardLines: StandardLines;
    customLines: CustomLines;
    transactionRecord: N_record.ReadOnlyTransactionRecord;
    book: AccountingBook;

}

export type customizeGlImpact = (context: glPluginContext) => void;
