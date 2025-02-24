import {ClientCurrentRecord} from './record';

interface GetCurrentRecordFunction {
    (): ClientCurrentRecord;
    promise(): Promise<ClientCurrentRecord>;
}

export const get: GetCurrentRecordFunction;
