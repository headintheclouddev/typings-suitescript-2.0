export interface FindImplementationsOptions {
    type: string;
    includeDefault?: boolean;
}

export interface LoadImplementationsOptions {
    type: string;
    implementation?: string;
}

export interface PluginModule {
    findImplementations(options: FindImplementationsOptions): string[];
    loadImplementations(options: LoadImplementationsOptions): Object;
}

export default PluginModule;
