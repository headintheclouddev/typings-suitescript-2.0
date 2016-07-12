interface GetParameterOptions {
    name: string;
}

interface SetOptions {
    name: string;
    value: string;
}

interface Script {
    getParameter(options: GetParameterOptions): boolean | number | Date | string | string[];
    getRemainingUsage(): number;
    deploymentId: string;
    id: string;
    logLevel: string;
    percentComplete: number;
    bundleIds: string[];
}

interface Session {
    get(options: GetParameterOptions): string;
    set(options: SetOptions): void;
}

interface User {
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

interface FeatureOptions {
    name: string;
}

interface ContextTypes {
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

interface EnvTypes {
    SANDBOX: string;
    PRODUCTION: string;
    BETA: string;
    INTERNAL: string;
}

interface Permissions {
    FULL: string;
    EDIT: string;
    CREATE: string;
    VIEW: string;
    NONE: string;
}
