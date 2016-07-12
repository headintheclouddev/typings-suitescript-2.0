/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface PluginModule {
    findImplementations(options: FindImplementationsOptions): string[];
    loadImplementations(options: LoadImplementationsOptions): Object;
}

export default PluginModule;
