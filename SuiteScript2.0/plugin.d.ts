/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface PluginModule {
    findImplementations(options: FindImplementationsOptions): string[];
    loadImplementations(options: LoadImplementationsOptions): Object;
}

declare var _: PluginModule;
export = _;
