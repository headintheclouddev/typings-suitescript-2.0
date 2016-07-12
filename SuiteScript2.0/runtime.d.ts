/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

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
