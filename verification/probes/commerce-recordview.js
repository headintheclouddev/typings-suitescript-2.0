/**
 * What do `recordView.viewItems` and `recordView.viewWebsite` return in a
 * deployed server script, and what does `fields` accept? Oracle's sample (copied
 * from one method to the other) shows an array of `{ value }` wrappers; the
 * module members table says `Object`.
 *
 * The account needs SuiteCommerce (the N/commerce modules), one website and at
 * least two items available on it. Pass their internal ids:
 *
 *   npx suitescript-verify run commerce-recordview --dir . --param websiteId=<id> --param itemIds=<id>,<id>
 *
 * Output shows shapes only (types, keys, lengths); no ids, names or field
 * values, since the website and items are real records.
 *
 * Supports pull request #385.
 *
 * @NApiVersion 2.1
 * @scriptType Restlet
 * @param websiteId ^\d+$
 * @param itemIds ^\d+(,\d+)*$
 */
define(["N/commerce/recordView"], (recordView) => ({
  run(params) {
    const websiteId = Number(params.websiteId);
    const itemIds = params.itemIds.split(",").map(Number);
    const result = {};
    const t = (key, fn) => {
      try {
        result[key] = fn();
      } catch (e) {
        result[key] = `THROWS: ${e.name}: ${e.message}`;
      }
    };
    // A value's shape without its content: real record data stays out of the output.
    const shape = (v) => {
      if (v === null || v === undefined) return { typeof: v === null ? "null" : "undefined" };
      if (Array.isArray(v)) {
        return { isArray: true, length: v.length, first: v.length ? shape(v[0]) : null };
      }
      if (typeof v === "object") {
        const keys = Object.keys(v);
        const fields = {};
        for (const key of keys.slice(0, 10)) fields[key] = typeof v[key];
        // Only a generic tag ("[object Object]"); a custom toString could carry data.
        const tag = String(v);
        const string = tag.startsWith("[object ") ? tag.slice(0, 40) : "(custom toString)";
        return { isArray: false, string, typeof: "object", fields };
      }
      if (typeof v === "string") return { length: v.length, typeof: "string" };
      return { typeof: typeof v };
    };
    // Whether the result is keyed by the requested ids, without printing them.
    const keyedByIds = (r) => {
      const keys = Object.keys(r).sort();
      const wanted = itemIds.map(String).sort();
      return keys.length === wanted.length && keys.every((k, i) => k === wanted[i]);
    };
    for (const field of ["displayname", "internalid", "languages", "name"]) {
      t(`viewWebsite field ${field}`, () => {
        const r = recordView.viewWebsite({ fields: [field], id: websiteId });
        return {
          top: { isArray: Array.isArray(r), keys: Object.keys(r) },
          value: shape(r[field]),
        };
      });
    }
    t("viewItems", () => {
      const r = recordView.viewItems({
        fields: ["itemid", "itemtype"],
        ids: itemIds,
      });
      const keys = Object.keys(r);
      return {
        first: keys.length ? shape(r[keys[0]]) : null,
        isArray: Array.isArray(r),
        keyCount: keys.length,
        keyedByRequestedIds: keyedByIds(r),
        typeof: typeof r,
      };
    });
    t("viewItems with fields as a string", () => {
      const r = recordView.viewItems({ fields: "itemid", ids: itemIds });
      return {
        isArray: Array.isArray(r),
        keyCount: Object.keys(r).length,
        keyedByRequestedIds: keyedByIds(r),
      };
    });
    return result;
  },
}));
