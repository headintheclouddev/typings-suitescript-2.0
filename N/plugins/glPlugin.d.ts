import * as N_record from '../record';

interface CustomLine {
    isBookSpecific(): boolean;
    setBookSpecific(bookSpecific: boolean): void;
    setAccountId(accountId: number): void;
    setClassId(classId: number): void;
    setCreditAmount(credit: string): void;
    setDebitAmount(debit: string): void;
    setDepartmentId(departmentId: number): void;
    setEntityId(entityId: number): void;
    setLocationId(locationId: number): void;
    setMemo(memo: string): void;
    setSegmentValueId(segmentId: string, segmentValueId: number): void
}

interface CustomLines {
    addNewLine(): CustomLine;
    getCount(): number;
    getLine(index: number): StandardLine
}

interface StandardLine {
    getEntityId(): number;
    getId(): number;
    getSubsidiaryId(): number;
    getTaxableAmount(): string;
    getTaxAmount(): string;
    getTaxItemId(): number;
    getTaxType(): string;
    isPosting(): boolean;
    isTaxable(): boolean;
}

interface StandardLines {
    getCount(): number;
    getLine(index: number): StandardLine
}

interface AccountingBook {
    getId(): number;
    isPrimary(): boolean;
}

interface glPluginContext {
    standardLines: StandardLines;
    customLines: CustomLines;
    readonly transactionRecord: N_record.ReadOnlyTransactionRecord;
    accountingBook: AccountingBook;

}

export type customizeGlImpact = (context: glPluginContext) => void;
