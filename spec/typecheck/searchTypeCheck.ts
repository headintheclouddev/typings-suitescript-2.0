// this spec is not meant to be run, it just need to be compiled. It checks that code snippets are able to be written using the typings

import { create, Operator, Search } from 'N/search';
import { expectType } from 'tsd-check';

describe('search types', () => {

    describe('create', () => {
        it('should accept filters with values', () => {
            const s = create({
                type: 'item', columns: ['created'],
                filters: [{
                    name: 'isinactive',
                    operator: Operator.IS,
                    values: 'F'
                }]
            });
            expectType<Search>(s);
        });
    });

});
