/// <reference path="../typings/tsd.d.ts" />
/// <reference path="crypto.d.ts" />
/// <reference path="http.d.ts" />

interface CreateSecureKeyOptions {
    encoding: string;
    guid: string;
}

interface CreateSecureStringOptions {
    input: string;
    inputEncoding: string;
}

interface AppendStringOptions {
    input: string;
    encoding: string;
}

interface AppendSecureStringOptions {
    token: SecureString;
}

interface ConvertEncodingOptions {
    toEncoding: string;
}

interface HashOptions {
    algorithm: string;
}

interface HmacOptions {
    algorithm: string;
    key: SecretKey;
}

interface SecureString {
    appendString(options: AppendStringOptions): SecureString;
    appendSecureString(options: AppendSecureStringOptions): SecureString;
    convertEncoding(options: ConvertEncodingOptions): SecureString;
    hash(options: HashOptions): SecureString;
    hmac(options: HmacOptions): SecureString;
    toString(): string;
}

interface HttpsCreateSecureKeyFunction {
    (options: CreateSecureKeyOptions): SecretKey;
    promise(options: CreateSecureKeyOptions): Promise<SecretKey>;
}

interface HttpsCreateSecureStringFunction {
    (options: CreateSecureStringOptions): any;
    promise(options: CreateSecureStringOptions): Promise<any>;
}

interface HttpsModule {
    createSecureKey: HttpsCreateSecureKeyFunction;
    createSecureString: HttpsCreateSecureStringFunction;
    // This module encapsulates the HTTP module (any better way to do this?):
    get: HttpGetFunction;
    delete: HttpDeleteFunction;
    request: HttpRequestFunction;
    post: HttpPostFunction;
    put: HttpPutFunction;
}

declare module N {
    var https: HttpsModule;
}

declare module 'N/https' {
    export = N.https;
}
