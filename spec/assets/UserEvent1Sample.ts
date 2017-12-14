/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types'
import * as log from 'N/log'

export function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {

    let x = ctx.newRecord.getValue({fieldId: 'companyname'})

    log.audit('value', `companyname is: ${x}`)

}
