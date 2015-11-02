/// <reference path="../typings/tsd.d.ts" />
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
  appendString: (options: AppendStringOptions) => SecureString;
  appendSecureString: (options: AppendSecureStringOptions) => SecureString;
  convertEncoding: (options: ConvertEncodingOptions) => SecureString;
  hash: (options: HashOptions) => SecureString;
  hmac: (options: HmacOptions) => SecureString;
  toString: () => string;
}

interface HttpsModule {
  createSecureKey: (options: CreateSecureKeyOptions) => SecretKey;
  createSecureString: (options: CreateSecureStringOptions) => any;
  // This module encapsulates the HTTP module (any better way to do this?):
  get: (options: GetOptions) => ClientResponse;
  delete: (options: DeleteOptions) => ClientResponse;
  request: (options: RequestOptions) => ClientResponse;
  post: (options: PostOptions) => ClientResponse;
  put: (options: PutOptions) => ClientResponse;
}

declare module N {
    var https: HttpsModule;
}

declare module 'N/https' {
    export = N.https;
}
