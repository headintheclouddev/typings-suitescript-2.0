import {log, util, EntryPoints} from 'N/index';
import N_search = require('N/search');

export var pageInit: EntryPoints.Client.pageInit = (ctx) => {
    if (ctx.mode != 'edit') return;

    N_search.create.promise({
        type: 'customer',
        filters: [
            N_search.createFilter({
                name: 'companyname',
                operator: N_search.Operator.ISNOTEMPTY,
            }),
        ],
        columns: [
            N_search.createColumn({
                name: 'companyname',
                sort: N_search.Sort.ASC,
            }),
        ],
    }).then(search => {
        return search.run().getRange.promise({
            start: 0,
            end: 1,
        });
    }).then(results => {
        if(results.length == 0) return alert("No companies");
        alert(`First company alphabetically: ${results[0].getValue('companyname')}`);
    });
}

export var beforeSubmit: EntryPoints.UserEvent.afterSubmit = (ctx) => {
    if (ctx.type == ctx.UserEventType.CHANGEPASSWORD) return;
}
