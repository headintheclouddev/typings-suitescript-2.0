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
  
}

interface FeatureOptions {
  name: string;
}

interface ContextType {
  USER_INTERFACE;
  WEBSERVICES;
  WEBSTORE;
  PORTLET;
  SCHEDULED;
  SUITELET;
  CSV_IMPORT;
  CUSTOM_MASSUPDATE;
  WORKFLOW;
  USEREVENT;
}

interface EnvType {
  SANDBOX;
  PRODUCTION;
  BETA;
  INTERNAL;
}

interface Permission {
  FULL;
  EDIT;
  CREATE;
  VIEW;
  NONE;
}

interface RuntimeModule {
  accountId: string;
  envType: EnvType;
  executionContext: ContextType;
  queueCount: number;
  version: string;
  getCurrentScript: () => Script;
  getCurrentSession: () => Session;
  getCurrentUser: () => User;
  isFeatureInEffect: (options: FeatureOptions) => boolean;
}

declare module N {
  var runtime: RuntimeModule;
}

declare module 'N/runtime' {
  export = N.runtime;
}
