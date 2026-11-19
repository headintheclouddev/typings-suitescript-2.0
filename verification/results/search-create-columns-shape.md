# Search.columns after search.create with string, Column and mixed columns

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [search-create-columns-shape](../probes/search-create-columns-shape.js)

## Test

```js
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
```

## Results

```json
{
  "strings: search.columns": [
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=scriptid",
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=title"
  ],
  "strings: Array.isArray": true,
  "Column objects: search.columns": [
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=scriptid"
  ],
  "mixed: search.columns": [
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=scriptid",
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=title"
  ],
  "strings: run().columns": [
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=scriptid"
  ],
  "no columns: search.columns": "not array: object",
  "single string (not array): search.columns": [
    "object{_clone,_getIndex,_marshal,_setIndex,_setType,_setUserIndex,_unmarshal,formula,function,join,label,name,setWhenOrderedBy,sort,summary,toJSON,toString} name=scriptid"
  ],
  "typeof search.columns[0].name": "string"
}
```

## Explanation

After `search.create`, `Search.columns` holds `search.Column` objects whatever was passed: strings, Column objects or a mix. A single string (not in an array) becomes an array of one Column. `run().columns` matches, and `columns[0].name` is a string. So reading `Search.columns` never gives back the original strings.

With no columns, `search.create({ type })` gives a `.columns` that this probe reports as "not array: object". [search-create-columns-empty](search-create-columns-empty.md) shows that value is `null`.

This matches the run on the same version recorded earlier in the probe's header.

## Decision

Evidence for [issue 238](https://github.com/headintheclouddev/typings-suitescript-2.1/issues/238) (open). The typings type `Search.columns` as `(Column | string)[]`, which is right for setting it but wider than what reading it returns (always `Column`, observed here). Any change waits on issue 238's design question (getter versus setter types). With no columns, `Search.columns` is `null` ([search-create-columns-empty](search-create-columns-empty.md)), so it is not always an array.
