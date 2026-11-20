# Result.getValue and getText with the options form

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [search-result-getvalue-options](../probes/search-result-getvalue-options.js)

## Test

```js
/**
 * Do Result.getValue/getText accept the documented options
 * form {name, join, summary} as well as a search.Column? Read-only. Returns
 * plain data only (value types, no ids or values).
 *
 * Supports issue #320.
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
    const shape = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);
    const first = (columns) =>
      search.create({ type: TYPE, columns }).run().getRange({ start: 0, end: 1 })[0];
    // Joins need role permissions; use the first (type, column, join) the role can search.
    const candidates = [
      ["scriptdeployment", "scriptid", "script"],
      ["scriptdeployment", "name", "script"],
      ["transaction", "email", "customer"],
      ["transaction", "email", "employee"],
      ["transaction", "name", "item"],
      ["customer", "email", "salesrep"],
      ["employee", "name", "department"],
    ];
    let J = null;
    for (const c of candidates) {
      try {
        search
          .create({ type: c[0], columns: [search.createColumn({ name: c[1], join: c[2] })] })
          .run()
          .getRange({ start: 0, end: 1 });
        J = c;
        break;
      } catch (e) {
        result[`join ${c[0]}.${c[2]}`] = `THROWS: ${e.name}`;
      }
    }
    // No permitted join: still test the non-joined forms on a plain search.
    if (!J) J = ["scriptdeployment", "scriptid", null];
    const TYPE = J[0];
    result["joined cases possible"] = !!J[2];
    const plain = (() => {
      try {
        return first([
          search.createColumn({ name: "internalid" }),
          search.createColumn({ name: "scriptid" }),
          search.createColumn({ name: J[1], join: J[2] }),
        ]);
      } catch (e) {
        result["plain search"] = `THROWS: ${e.name}: ${e.message}`;
      }
    })();
    // Grouped search so a summary is legal; every column needs a summary.
    const grp = (() => {
      try {
        return first([
          search.createColumn({ name: "scriptid", summary: search.Summary.GROUP }),
          search.createColumn({ name: J[1], join: J[2], summary: search.Summary.GROUP }),
          search.createColumn({ name: "internalid", summary: search.Summary.COUNT }),
        ]);
      } catch (e) {
        result["grouped search"] = `THROWS: ${e.name}: ${e.message}`;
      }
    })();
    result["plain row found"] = !!plain;
    result["grouped row found"] = !!grp;
    if (plain) {
      t("getValue({name})", () => shape(plain.getValue({ name: "internalid" })));
      t("getValue({name, join})", () => shape(plain.getValue({ name: J[1], join: J[2] })));
      t("getText({name})", () => shape(plain.getText({ name: "scriptid" })));
      t("getText({name, join})", () => shape(plain.getText({ name: J[1], join: J[2] })));
      t("getValue(Column)", () => shape(plain.getValue(plain.columns[0])));
      t("getText(Column)", () => shape(plain.getText(plain.columns[1])));
      t("getValue('internalid')", () => shape(plain.getValue("internalid")));
    }
    if (grp) {
      const G = search.Summary.GROUP;
      t("getValue({name, summary})", () =>
        shape(grp.getValue({ name: "internalid", summary: search.Summary.COUNT })));
      t("getValue({name, summary: 'COUNT'})", () =>
        shape(grp.getValue({ name: "internalid", summary: "COUNT" })));
      t("getValue({name, join, summary})", () =>
        shape(grp.getValue({ name: J[1], join: J[2], summary: G })));
      t("getText({name, summary})", () => shape(grp.getText({ name: "scriptid", summary: G })));
      t("getText({name, join, summary})", () =>
        shape(grp.getText({ name: J[1], join: J[2], summary: G })));
    }
    return result;
  },
}));
```

## Results

```json
{
  "joined cases possible": true,
  "plain row found": true,
  "grouped row found": true,
  "getValue({name})": "string",
  "getValue({name, join})": "string",
  "getText({name})": "null",
  "getText({name, join})": "null",
  "getValue(Column)": "string",
  "getText(Column)": "null",
  "getValue('internalid')": "string",
  "getValue({name, summary})": "string",
  "getValue({name, summary: 'COUNT'})": "string",
  "getValue({name, join, summary})": "string",
  "getText({name, summary})": "null",
  "getText({name, join, summary})": "null"
}
```

## Explanation

`Result.getValue` and `Result.getText` accept the documented options form `{ name, join, summary }` as well as a `search.Column` and a plain column name. Plain, joined, summary and joined summary forms all ran without throwing, and `summary` worked both as `search.Summary.COUNT` and as the string `'COUNT'`. `getValue` returned a string in every case.

`getText` returned `null` in every case. The probe asks for the text of `scriptid` and of a joined `scriptid` / `name` column, which are text fields, not select fields, so they have no separate display text. The options form is accepted. But `getText` on a column without display text returns `null`, while the typings say `string`.

## Decision

Supports [issue 320](https://github.com/headintheclouddev/typings-suitescript-2.1/issues/320) (closed) and [pull request 463](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/463) (merged). Their typings match: `getValue(options: ResultGetOptions)` and `getText(options: ResultGetOptions)`. Separately, `getText` returning `null` for a non-select column was followed up in [pull request 469](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/469). An empty select column returns an empty string instead (see [search-result-gettext-empty-select](search-result-gettext-empty-select.md)), so the return type stays `string` and the JSDoc explains when `null` comes back.
