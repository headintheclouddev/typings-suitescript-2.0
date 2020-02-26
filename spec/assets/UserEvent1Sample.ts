/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types'
import log = require('N/log');

export function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {
  if (~[ctx.UserEventType.CREATE, ctx.UserEventType.EDIT].indexOf(ctx.type)) { // If type is create or edit, log the company name (applies to customer records).
    const companyName = ctx.newRecord.getValue({ fieldId: 'companyname' });
    log.audit('Before Submit', `companyname is: ${companyName}`);
  }
}
