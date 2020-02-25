/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

import {EntryPoints} from 'N/types';
import record = require('N/record');

export const onRequest: EntryPoints.Suitelet.onRequest = (ctx) => {
  const folder    = record.load({ type: 'folder', id: 36464 });
  const allFields = folder.getFields().join(', ');
  ctx.response.write(`<br>All fields: ${allFields}`);
};
