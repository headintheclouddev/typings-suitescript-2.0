interface SuiteScriptError {
    toString(): string;
    id: string;
    message: string;
    name: string;
    stack: string[];
}

interface UserEventError {
    toString(): string;
    eventType: EventType;
    id: string;
    message: string;
    name: string;
    recordId: string;
    stack: string[];
}

interface EventType {
    beforeLoad: string;
    beforeSubmit: string;
    afterSubmit: string;
}

interface CreateOptions {
    name: string;
    message: string;
    notifyOff?: boolean;
}
