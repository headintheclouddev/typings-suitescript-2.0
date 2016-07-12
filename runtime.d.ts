export interface GetParameterOptions {
    name: string;
}

export interface SetOptions {
    name: string;
    value: string;
}

export interface Script {
    getParameter(options: GetParameterOptions): boolean | number | Date | string | string[];
    getRemainingUsage(): number;
    deploymentId: string;
    id: string;
    logLevel: string;
    percentComplete: number;
    bundleIds: string[];
}

export interface Session {
    get(options: GetParameterOptions): string;
    set(options: SetOptions): void;
}

export interface User {
    getPermission(options: GetParameterOptions): string;
    getPreference(options: GetParameterOptions): string;
    department: number;
    email: string;
    id: number;
    location: number;
    name: string;
    role: number;
    roleCenter: number;
    roleId: string; // text ID
    subsidiary: number;
}

export interface FeatureOptions {
    name: string;
}

export interface ContextTypes {
    USER_INTERFACE: string;
    WEBSERVICES: string;
    WEBSTORE: string;
    PORTLET: string;
    SCHEDULED: string;
    SUITELET: string;
    CSV_IMPORT: string;
    CUSTOM_MASSUPDATE: string;
    WORKFLOW: string;
    USEREVENT: string;
}

export interface EnvTypes {
    SANDBOX: string;
    PRODUCTION: string;
    BETA: string;
    INTERNAL: string;
}

export interface Permissions {
    FULL: string;
    EDIT: string;
    CREATE: string;
    VIEW: string;
    NONE: string;
}

export interface RuntimeModule {
    accountId: string;
    envType: string;
    executionContext: string;
    queueCount: number;
    version: string;
    getCurrentScript: () => Script;
    getCurrentSession: () => Session;
    getCurrentUser: () => User;
    isFeatureInEffect: (options: FeatureOptions) => boolean;
    ContextType: ContextTypes;
    EnvType: EnvTypes;
}

export default RuntimeModule;
