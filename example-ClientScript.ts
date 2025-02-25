/**
 * @NAPIVersion 2.0
 * @NScriptType ClientScript
 */

import type {EntryPoints} from 'N/types';
import * as search from 'N/search';

export function pageInit(context: EntryPoints.Client.pageInitContext) {
  if (context.mode != 'edit') return;

  const customerId = context.currentRecord.getValue('entity'); // Assume this script is running on a transaction
  search.lookupFields.promise({ type: 'customer', id: customerId, columns: ['companyname', 'datecreated', 'entitystatus'] }).then((values) => {
    const name   = values.companyname as string;
    const date   = values.datecreated as string;
    const status = values.entitystatus as { value: string, text: string }[];
    console.log('Customer', name, 'created at', date, 'status', status);
  });

  search.create.promise({
    type: 'customer',
    filters: [search.createFilter({ name: 'companyname', operator: search.Operator.ISNOTEMPTY })],
    columns: [ // Not generally recommended to mix column creation formats like this, but it is technically acceptable. This demonstrates different ways to do it:
      search.createColumn({ name: 'companyname', sort: search.Sort.ASC }),
      { name: 'email' },
      'fax',
    ],
  }).then(search => {
    return search.run().getRange.promise({ start: 0, end: 1 });
  }).then(results => {
    if (results.length === 0) return alert("No companies");
    alert(`First company alphabetically: ${results[0].getValue('companyname')}`);
  });
}
