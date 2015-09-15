/// <reference path="../typings/tsd.d.ts" />

interface ChangePasswordOptions {
    currentPassword: string;
    newPassword: string;
}

interface ChangeEmailOptions {
    password: string;
    newEmail: string;
    onlyThisAccount?: boolean;
}

interface AuthModule {
    changeEmail: (options:ChangeEmailOptions) => void;
    changePassword: (options:ChangePasswordOptions) => void;
}

declare module N {
    var auth:AuthModule;
}

declare module 'N/auth' {
    export = N.auth;
}