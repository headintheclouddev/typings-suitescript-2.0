/**
 * What does `Search.columns` (and `ResultSet.columns`)
 * actually hold after search.create with string columns, Column objects, or a
 * mix? i.e. is it the same elements that were passed in, or normalized to
 * search.Column objects? Read-only. Returns plain data only.
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
    const shape = (cols) =>
      Array.isArray(cols)
        ? cols.map((c) =>
            c === null
              ? "null"
              : typeof c === "object"
                ? `object{${Object.keys(c).sort().join(",")}} name=${c.name}`
                : typeof c === "string"
                  ? `string(${c})`
                  : typeof c,
          )
        : `not array: ${typeof cols}`;
    const TYPE = "scriptdeployment";
    t("strings: search.columns", () =>
      shape(search.create({ type: TYPE, columns: ["scriptid", "title"] }).columns),
    );
    t("strings: Array.isArray", () =>
      Array.isArray(search.create({ type: TYPE, columns: ["scriptid"] }).columns),
    );
    t("Column objects: search.columns", () =>
      shape(
        search.create({
          type: TYPE,
          columns: [search.createColumn({ name: "scriptid" })],
        }).columns,
      ),
    );
    t("mixed: search.columns", () =>
      shape(
        search.create({
          type: TYPE,
          columns: ["scriptid", search.createColumn({ name: "title" })],
        }).columns,
      ),
    );
    t("strings: run().columns", () =>
      shape(search.create({ type: TYPE, columns: ["scriptid"] }).run().columns),
    );
    t("no columns: search.columns", () => shape(search.create({ type: TYPE }).columns));
    t("single string (not array): search.columns", () =>
      shape(search.create({ type: TYPE, columns: "scriptid" }).columns),
    );
    t("typeof search.columns[0].name", () =>
      typeof search.create({ type: TYPE, columns: ["scriptid"] }).columns[0].name,
    );
    return result;
  },
}));
