interface FindImplementationsOptions {
    type: string;
    includeDefault?: boolean;
}

interface LoadImplementationOptions {
    type: string;
    implementation?: string;
}

export function findImplementations(options: FindImplementationsOptions): string[];
export function loadImplementation(options: LoadImplementationOptions): any;
