export interface VoidOptions {
    id: number | string;
    type: string;
}

export interface TransactionVoidFunction {
    (options: VoidOptions): number;
    promise(options: VoidOptions): Promise<number>;
}

export interface TransactionModule {
    void: TransactionVoidFunction;
}

export default TransactionModule;
