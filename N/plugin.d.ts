interface FindImplementationsOptions {
    type: string;
    includeDefault?: boolean;
}

interface LoadImplementationsOptions {
    type: string;
    implementation?: string;
}

export function findImplementations(options: FindImplementationsOptions): string[];
export function loadImplementations(options: LoadImplementationsOptions): any;
