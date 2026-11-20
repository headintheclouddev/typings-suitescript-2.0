# Search.columns and ResultSet.columns after search.create with no columns

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [search-create-columns-empty](../probes/search-create-columns-empty.js)

## Test

```js
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
```

## Results

```json
{
  "columns omitted: search.columns": "null",
  "columns: undefined": "null",
  "columns: null": "null",
  "columns: []": {
    "typeof": "object",
    "isArray": true,
    "tag": "[object Array]",
    "string": "",
    "keys": [],
    "ownNames": [
      "length"
    ],
    "typeofLength": "number",
    "length": 0,
    "iterable": true,
    "constructorName": "Array",
    "json": "[]"
  },
  "columns omitted: run().columns": {
    "typeof": "object",
    "isArray": true,
    "tag": "[object Array]",
    "string": "",
    "keys": [],
    "ownNames": [
      "length"
    ],
    "typeofLength": "number",
    "length": 0,
    "iterable": true,
    "constructorName": "Array",
    "json": "[]"
  },
  "columns: []: run().columns": {
    "typeof": "object",
    "isArray": true,
    "tag": "[object Array]",
    "string": "",
    "keys": [],
    "ownNames": [
      "length"
    ],
    "typeofLength": "number",
    "length": 0,
    "iterable": true,
    "constructorName": "Array",
    "json": "[]"
  },
  "columns omitted, then assigned ['scriptid']": {
    "typeof": "object",
    "isArray": true,
    "tag": "[object Array]",
    "string": "(custom toString, length 13)",
    "keys": [
      "0"
    ],
    "ownNames": [
      "0",
      "length"
    ],
    "typeofLength": "number",
    "length": 1,
    "iterable": true,
    "constructorName": "Array",
    "json": "[{\"name\":\"scriptid\",\"join\":null,\"summary\":null,\"label\":null,\"type\":null,\"functio"
  },
  "columns omitted: index 0": "THROWS: TypeError: Cannot read property '0' of null"
}
```

## Explanation

`Search.columns` is `null`, not an array, when `search.create` gets no columns: with `columns` omitted, `undefined` or `null`. Reading an index of it throws (`Cannot read property '0' of null`). With `columns: []` it is an ordinary empty array. Assigning `s.columns = ['scriptid']` to a search created without columns gives an array of one `search.Column`.

`ResultSet.columns` (`run().columns`) is always an array: empty for a search with no columns, whether they were omitted or `[]`.

This explains the "not array: object" result in [search-create-columns-shape](search-create-columns-shape.md): that probe's check could not tell `null` apart from an object (`typeof null` is `"object"`), and the value is `null`.

The typings say `Search.columns: (Column | string)[]`, which misses `null`. They say `ResultSet.columns: Column[]`, which matches.

## Decision

Evidence for [issue 238](https://github.com/headintheclouddev/typings-suitescript-2.1/issues/238) (open). Reading `Search.columns` gives `Column[]` (see search-create-columns-shape) or `null` when the search was created without columns. A typing that reflects reading it is `Column[] | null`. Setting it accepts strings as well. How to split the getter and setter types is issue 238's design question, so no typing change is made here. `ResultSet.columns: Column[]` stays.
