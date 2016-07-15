interface LogFunction {
    (title: string, details: string);
}

export var debug: LogFunction;
export var audit: LogFunction;
export var error: LogFunction;
export var emergency: LogFunction;
