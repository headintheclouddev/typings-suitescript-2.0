/**
 * @NAPIVersion 2.0
 * @NScriptType UserEventScript
 */

import type { EntryPoints } from "N/types";

const del: EntryPoints.RESTlet.delete_ = (requestParams) => {
	let type: unknown;
	if (requestParams && "type" in requestParams) {
		type = requestParams.type;
	}
	let id: unknown;
	if (requestParams && "id" in requestParams) {
		id = requestParams.id;
	}
	return Promise.resolve("{ success: true }");
};

export { del as delete };

export const post: EntryPoints.RESTlet.post = (requestBody) => {
	return Promise.resolve("{ success: true }");
};
