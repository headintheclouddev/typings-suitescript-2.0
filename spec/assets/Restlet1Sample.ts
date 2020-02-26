/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types'
import log = require('N/log');

const del: EntryPoints.RESTlet.delete_ = requestParams => {
  const type = requestParams.type;
  const id   = requestParams.id;

  log.debug('Delete', `Input record type ${type} id ${id}.`);
  return { success: true };
};

export { del as delete };

export const post: EntryPoints.RESTlet.post = (requestBody) => {
  log.debug('Post', `Body: ${JSON.stringify(requestBody)}.`); // Assuming its an object
  return { success: true };
};
