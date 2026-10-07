/**
 * Use the N/auth module to change NetSuite login credentials.
 * Supported script types: Server scripts.
 */

interface ChangePasswordOptions {
    /** The logged in user's current NetSuite password. */
    currentPassword: string;
    /** The logged in user's new NetSuite password. */
    newPassword: string;
}

interface ChangeEmailOptions {
    /** The logged in user's current NetSuite password. */
    password: string;
    /** The logged in user's new NetSuite email address. */
    newEmail: string;
    /**
     * -optional- If true, the email address change is applied only to roles within the current account.
     * If false, the change is applied to all accounts and roles. The default value is true.
     */
    onlyThisAccount?: boolean;
}

/**
 * Changes the current user's NetSuite email address (user name).
 * @throws {SuiteScriptError} INVALID_EMAIL if options.newEmail is invalid.
 * @throws {SuiteScriptError} INVALID_PSWD if options.password does not conform to the password rules.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_PARAMETER if options.newEmail or options.password is not specified.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.onlyThisAccount is not a boolean value.
 * @governance 10 units
 * @since 2015.2
 */
export declare function changeEmail(options: ChangeEmailOptions): void;

/**
 * Changes the current user's NetSuite password.
 * @throws {SuiteScriptError} INVALID_PSWD if the password does not conform to the password rules.
 * @throws {SuiteScriptError} INVALID_EMAIL if the email is invalid. (Listed on Oracle's changePassword page, which refers to options.newEmail even though this method has no such parameter.)
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.currentPassword or options.newPassword is not specified.
 * @governance 10 units
 * @since 2015.2
 */
export declare function changePassword(options: ChangePasswordOptions): void;
