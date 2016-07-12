/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

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

declare var _: RuntimeModule;
export = _;
