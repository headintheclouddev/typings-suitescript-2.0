export interface ChangePasswordOptions {
    currentPassword: string;
    newPassword: string;
}

export interface ChangeEmailOptions {
    password: string;
    newEmail: string;
    onlyThisAccount?: boolean;
}

export interface AuthModule {
    /**
     * Method used to change the current user’s NetSuite email address (user name).
     */
    changeEmail(options: ChangeEmailOptions): void;
    /**
     * Method used to change the current user’s NetSuite password.
     */
    changePassword(options: ChangePasswordOptions): void;
}

export default AuthModule;