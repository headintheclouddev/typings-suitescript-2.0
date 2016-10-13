
interface VoidOptions {
    id: number | string;
    type: string;
}

interface TransactionVoidFunction {
    (options: VoidOptions): number;
    promise(options: VoidOptions): Promise<number>;
}

declare var voidFunc: TransactionVoidFunction;
export {voidFunc as void};
