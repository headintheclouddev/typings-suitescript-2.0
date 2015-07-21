/// <reference path="./typings/tsd.d.ts" />

declare module N {
    class Record {
    }

    export module record {
        function create(options?: any): Record;
    }

    export module search {
        interface CreateSearchColumnOptions {
            name: string;
            join?: string;
            summary?: string;
        }
        interface SearchColumn {
            name: string;
            join?: string;
            summary?: string;
        }
        function createColumn(options: CreateSearchColumnOptions): SearchColumn;

        interface SearchResultGetValueOptions {
            name: string;
            join?: string;
            summary?: string;
        }
        class SearchResult {
            getValue(options: SearchResultGetValueOptions): string;
        }

        interface SearchInstanceEach {
            promise(callback: (result: SearchResult, index: number) => boolean): Promise<boolean>;
            (callback: (result: SearchResult, index: number) => boolean): void;
        }
        class SearchInstance {
            each: SearchInstanceEach;
        }

        class Search {
            name: string;
            join: string;
            summary: string;
            run(): SearchInstance;
        }

        interface SearchCreateOptions {
            type?: string;

        }
        function create(options: SearchCreateOptions): Search;
        module create {
            function promise(options: SearchCreateOptions): Promise<Search>;
        }
    }
}

declare module "N" {
    export = N;
}
declare module "N/search" {
    export = N.search;
}
declare module "N/record" {
    export = N.record;
}
