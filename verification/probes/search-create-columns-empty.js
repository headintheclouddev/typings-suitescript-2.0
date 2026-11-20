/**
 * What does `Search.columns` hold after search.create with
 * no columns? search-create-columns-shape saw a value that is not an array
 * ("not array: object", which `null` would also give). The typings say
 * `Search.columns: (Column | string)[]` and `ResultSet.columns: Column[]`.
 * Read-only. Returns plain data only (types and keys, no record data).
 *
 * Supports issue #238.
 *
 * @NApiVersion 2.1
 * @scriptType Restlet
 * @permission ADMI_CUSTOMSCRIPT VIEW
 */
define(["N/search"], (search) => ({
  run() {
    const result = {};
    const t = (key, fn) => {
      try {
        result[key] = fn();
      } catch (e) {
        result[key] = `THROWS: ${e.name}: ${e.message}`;
      }
    };
    // Everything about a value that tells its shape apart, without its content.
    const describe = (v) => {
      if (v === null) return "null";
      if (v === undefined) return "undefined";
      const d = { typeof: typeof v, isArray: Array.isArray(v) };
      if (typeof v !== "object" && typeof v !== "function") return d;
      d.tag = Object.prototype.toString.call(v);
      const tag = String(v);
      d.string = tag.startsWith("[object ") || tag === "" ? tag : `(custom toString, length ${tag.length})`;
      d.keys = Object.keys(v).slice(0, 20);
      d.ownNames = Object.getOwnPropertyNames(v).slice(0, 20);
      d.typeofLength = typeof v.length;
      if (typeof v.length === "number") d.length = v.length;
      d.iterable = typeof v[Symbol.iterator] === "function";
      d.constructorName = v.constructor ? v.constructor.name : null;
      try {
        d.json = JSON.stringify(v).slice(0, 80);
      } catch (e) {
        d.json = `THROWS: ${e.name}`;
      }
      return d;
    };
    const TYPE = "scriptdeployment";
    t("columns omitted: search.columns", () => describe(search.create({ type: TYPE }).columns));
    t("columns: undefined", () => describe(search.create({ type: TYPE, columns: undefined }).columns));
    t("columns: null", () => describe(search.create({ type: TYPE, columns: null }).columns));
    t("columns: []", () => describe(search.create({ type: TYPE, columns: [] }).columns));
    t("columns omitted: run().columns", () => describe(search.create({ type: TYPE }).run().columns));
    t("columns: []: run().columns", () => describe(search.create({ type: TYPE, columns: [] }).run().columns));
    t("columns omitted, then assigned ['scriptid']", () => {
      const s = search.create({ type: TYPE });
      s.columns = ["scriptid"];
      return describe(s.columns);
    });
    t("columns omitted: index 0", () => describe(search.create({ type: TYPE }).columns[0]));
    return result;
  },
}));
