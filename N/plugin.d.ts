interface FindImplementationsOptions {
    type: string;
    includeDefault?: boolean;
}

interface LoadImplementationsOptions {
    type: string;
    implementation?: string;
}

interface PluginModule {
    findImplementations(options: FindImplementationsOptions): string[];
    loadImplementations(options: LoadImplementationsOptions): Object;
}

declare module N {
    var plugin: PluginModule;
}

declare module 'N/plugin' {
    export = N.plugin;
}
