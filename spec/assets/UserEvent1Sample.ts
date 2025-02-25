/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

import type {EntryPoints} from 'N/types';
import * as log from 'N/log';

export function beforeSubmit(context: EntryPoints.UserEvent.beforeSubmitContext) {
  if (~[context.UserEventType.CREATE, context.UserEventType.EDIT].indexOf(context.type)) { // If type is create or edit, log the company name (applies to customer records).
    const companyName = context.newRecord.getValue({ fieldId: 'companyname' });
    log.audit('Before Submit', `companyname is: ${companyName}`);
  }
}
