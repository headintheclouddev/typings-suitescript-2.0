import {ClientCurrentRecord} from './record';

interface GetCurrentRecordFunction {
    (): ClientCurrentRecord;
    promise(): Promise<ClientCurrentRecord>;
}

export var get: GetCurrentRecordFunction;
