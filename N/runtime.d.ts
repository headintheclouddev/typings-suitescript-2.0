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
    getPermission(options: GetParameterOptions): Permission;
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

export var accountId: string;
export var envType: string;
export var executionContext: string;
export var queueCount: number;
export var version: string;
export function getCurrentScript(): Script;
export function getCurrentSession(): Session;
export function getCurrentUser(): User;
export function isFeatureInEffect(options: FeatureOptions): boolean;
export enum ContextType {
    USER_INTERFACE,
    WEBSERVICES,
    WEBSTORE,
    PORTLET,
    SCHEDULED,
    SUITELET,
    CSV_IMPORT,
    CUSTOM_MASSUPDATE,
    WORKFLOW,
    USEREVENT,
}
export enum EnvType {
    SANDBOX,
    PRODUCTION,
    BETA,
    INTERNAL,
}
export enum Permission {
    FULL,
    EDIT,
    CREATE,
    VIEW,
    NONE,
}