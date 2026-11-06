interface ChangePasswordOptions {
    currentPassword: string;
    newPassword: string;
}

interface ChangeEmailOptions {
    password: string;
    newEmail: string;
    onlyThisAccount?: boolean;
}

/**
 * Method used to change the current user’s NetSuite email address (user name).
 * @throws {SuiteScriptError} INVALID_EMAIL if options.newEmail is invalid.
 * @throws {SuiteScriptError} INVALID_PSWD if options.password does not conform to the password rules.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_PARAMETER if options.newEmail or options.password is not specified.
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.onlyThisAccount is not a boolean value.
 * @governance 10 units
 * @since 2015.2
 */
export declare function changeEmail(options: ChangeEmailOptions): void;

/**
 * Method used to change the current user’s NetSuite password.
 * @throws {SuiteScriptError} INVALID_PSWD if the password does not conform to the password rules.
 * @throws {SuiteScriptError} INVALID_EMAIL if the email is invalid. (Listed on Oracle's changePassword page, which refers to options.newEmail even though this method has no such parameter.)
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.currentPassword or options.newPassword is not specified.
 * @governance 10 units
 * @since 2015.2
 */
export declare function changePassword(options: ChangePasswordOptions): void;
