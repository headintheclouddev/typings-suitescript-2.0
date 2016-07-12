interface VoidOptions {
    id: number | string;
    type: string;
}

interface TransactionVoidFunction {
    (options: VoidOptions): number;
    promise(options: VoidOptions): Promise<number>;
}
