/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

import type {EntryPoints} from 'N/types';
import * as record from 'N/record';

export const onRequest: EntryPoints.Suitelet.onRequest = (context) => {
  const folder    = record.load({ type: 'folder', id: 36464 });
  const allFields = folder.getFields().join(', ');
  context.response.write(`<br>All fields: ${allFields}`);
};
