/**
 * @NAPIVersion 2.0
 * @NScriptType UserEventScript
 */

import type {EntryPoints} from 'N/types';
import * as log from 'N/log'

const del: EntryPoints.RESTlet.delete_ = requestParams => {
    let type = requestParams.type;
    let id = requestParams.id;

    return {
        success: true
    };
}
export { del as delete };

export const post: EntryPoints.RESTlet.post = requestBody => {
    return { success: true };
} 
