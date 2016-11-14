/**
 * @NAPIVersion 2.0
 * @NScriptType ClientScript
 */

import {EntryPoints} from 'N/types'
import * as search from 'N/search'

export function pageInit(ctx: EntryPoints.Client.pageInitContext) {

    if (ctx.mode != 'edit') return;

    search.create.promise({
        type: 'customer',
        filters: [
            search.createFilter({
                name: 'companyname',
                operator: search.Operator.ISNOTEMPTY
            }),
        ],
        columns: [
            search.createColumn({
                name: 'companyname',
                sort: search.Sort.ASC
            }),
            { name: 'email', },
            'fax',
        ],
    }).then(search => {
        return search.run().getRange.promise({
            start: 0,
            end: 1
        });
    }).then(results => {
        if (results.length === 0) return alert("No companies");
        alert(`First company alphabetically: ${results[0].getValue('companyname')}`);
    });
}
