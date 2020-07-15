/**
 * @NAPIVersion 2.0
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types'
import log = require('N/log');

export function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {
  if (ctx.type == ctx.UserEventType.CREATE) {
    log.debug('Entity Id', ctx.newRecord.getValue('entity')); // When creating a transaction from an entity, log the entity internal id
  }
}
