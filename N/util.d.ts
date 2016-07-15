interface UtilInterface {
    each: any;
    extend: any;
    isArray: (toTest: any) => boolean;
    isBoolean: (toTest: any) => boolean;
    isDate: (toTest: any) => boolean;
    isFunction: (toTest: any) => boolean;
    isNumber: (toTest: any) => boolean;
    isObject: (toTest: any) => boolean;
    isRegExp: (toTest: any) => boolean;
    isString: (toTest: any) => boolean;
    trim: (toTrim: string) => string;
}

export var util: UtilInterface;
