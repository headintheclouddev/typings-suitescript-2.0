/// <reference path="../typings/tsd.d.ts" />

interface Script {
  deploymentId: string;
  id: string;
  logLevel: string;
  percentComplete: number;
  bundleIds: string[];
  // TODO: Define the Script methods
}

interface Session {
  
}

interface User {
  // TODO: Define getPermissions and getPreference
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

interface RuntimeModule {
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

declare module N {
  var runtime: RuntimeModule;
}

declare module 'N/runtime' {
  export = N.runtime;
}
