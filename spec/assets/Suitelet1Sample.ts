/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

import { EntryPoints } from 'N/types'
import { load } from 'N/record'
export var onRequest: EntryPoints.Suitelet.onRequest = (ctx) => {
    var folder = load({ type: 'folder', id: 36464 })
    var allfields = folder.getFields().join(', ')
    ctx.response.write(`<br>all fields: ${allfields}`) 
}