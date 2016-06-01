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
    /**
     * Method used to change the current user’s NetSuite email address (user name).
     */
    changeEmail (options: ChangeEmailOptions): void;
    /**
     * Method used to change the current user’s NetSuite password.
     */
    changePassword (options: ChangePasswordOptions): void;
}

declare module N {
    var auth: AuthModule;
}

/**
 * Load the N/auth module when you want to change your NetSuite login credentials.
 */
declare module 'N/auth' {
    export = N.auth;
}