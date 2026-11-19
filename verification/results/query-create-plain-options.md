# query.create with plain option objects in columns and condition

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [query-create-plain-options](../probes/query-create-plain-options.js)

## Test

```js
/**
 * Does `query.create` accept plain option objects (not
 * `createColumn`/`createCondition` results) in `columns` and `condition`, including
 * numeric `values` and formula columns/conditions? Read-only. Returns plain data
 * only (counts and booleans, no ids or values).
 *
 * Supports issue #262.
 *
 * @NApiVersion 2.1
 * @scriptType Restlet
 */
define(["N/query"], (query) => ({
  run() {
    const result = {};
    const t = (key, fn) => {
      try {
        result[key] = fn();
      } catch (e) {
        result[key] = `THROWS: ${e.name}: ${e.message}`;
      }
    };
    const rows = (q) => q.run().asMappedResults().length >= 0;
    // Pick the first record type the token role can query (permissions vary).
    result["Object.keys(query.Type) has CUSTOMER"] = Object.keys(query.Type).includes("CUSTOMER");
    let TYPE;
    result["query.Type key count"] = Object.keys(query.Type).length;
    result["query.Type first keys"] = Object.keys(query.Type).slice(0, 8);
    result["query.Type sample values"] = Object.keys(query.Type).slice(0, 8).map((k) => String(query.Type[k]));
    // Try every enum value until one the role can query works.
    const candidates = Object.keys(query.Type).map((k) => query.Type[k]);
    result["candidate count"] = candidates.length;
    let failures = 0;
    for (const candidate of candidates) {
      try {
        rows(query.create({ type: candidate, columns: [{ fieldId: "id" }] }));
        TYPE = candidate;
        break;
      } catch (e) {
        failures += 1;
      }
    }
    result["types that failed before a usable one"] = failures;
    result["usable type"] = TYPE || "none";
    t("plain column only", () =>
      rows(query.create({ type: TYPE, columns: [{ fieldId: "id" }] })));
    t("plain column + plain condition (numeric values)", () =>
      rows(
        query.create({
          type: TYPE,
          columns: [{ fieldId: "id" }],
          condition: { fieldId: "id", operator: query.Operator.ANY_OF, values: [1] },
        }),
      ));
    t("plain column + plain condition (string values)", () =>
      rows(
        query.create({
          type: TYPE,
          columns: [{ fieldId: "id" }],
          condition: { fieldId: "id", operator: query.Operator.ANY_OF, values: ["1"] },
        }),
      ));
    t("plain formula column", () =>
      rows(
        query.create({
          type: TYPE,
          columns: [{ formula: "1", type: query.ReturnType.INTEGER }],
        }),
      ));
    t("plain formula condition", () =>
      rows(
        query.create({
          type: TYPE,
          columns: [{ fieldId: "id" }],
          condition: {
            formula: "1",
            type: query.ReturnType.INTEGER,
            operator: query.Operator.ANY_OF,
            values: ["1"],
          },
        }),
      ));
    t("plain column with label and alias", () =>
      rows(
        query.create({
          type: TYPE,
          columns: [{ fieldId: "id", label: "x", alias: "y" }],
        }),
      ));
    t("control: createColumn/createCondition", () =>
      rows(
        (() => {
          const q = query.create({ type: TYPE });
          q.columns = [q.createColumn({ fieldId: "id" })];
          q.condition = q.createCondition({
            fieldId: "id",
            operator: query.Operator.ANY_OF,
            values: ["1"],
          });
          return q;
        })(),
      ));
    return result;
  },
}));
```

## Results

```json
{
  "Object.keys(query.Type) has CUSTOMER": false,
  "query.Type key count": 80,
  "query.Type first keys": [
    "ACTIVITY",
    "ADDRESS_BOOK",
    "AGENT_CONVERSATION",
    "AGENT_MESSAGE",
    "ALL_PARSER_PLUGIN",
    "BUNDLE_INSTALLATION_SCRIPT",
    "BUNDLE_INSTALLATION_SCRIPT_DEPLOYMENT",
    "BUSINESS_EVENTS_PROCESSING_HISTORY"
  ],
  "query.Type sample values": [
    "activity",
    "addressbook",
    "agentconversation",
    "agentmessage",
    "allparserplugin",
    "bundleinstallationscript",
    "bundleinstallationscriptdeployment",
    "businesseventsprocessinghistory"
  ],
  "candidate count": 80,
  "types that failed before a usable one": 0,
  "usable type": "activity",
  "plain column only": true,
  "plain column + plain condition (numeric values)": true,
  "plain column + plain condition (string values)": true,
  "plain formula column": true,
  "plain formula condition": true,
  "plain column with label and alias": true,
  "control: createColumn/createCondition": true
}
```

### Rerun under suitescript-verify 2.0.0 (2026-11-19)

The runner now runs as a role that the deploy writes (token login, REST web services, and what probes declare), which may also hold permissions that other projects' probes declare, instead of the earlier hand-built role. `query.Type` then enumerated 78 keys, and `CUSTOMER` was among them (earlier: 80 keys, no `CUSTOMER`). So the members of `query.Type` at runtime depend on the role's permissions, not only on the account's features.

Every other key matched the first run: the usable type was still `activity`, and every plain-options case returned `true`.

## Explanation

`query.create` accepts plain option objects, not just `query.createColumn` / `query.createCondition` results: a plain column, a plain condition with numeric or string `values`, a plain formula column, a plain formula condition, and a plain column with `label` and `alias`. Every case ran (`true`), as did the control with `createColumn` / `createCondition`.

The probe ran against the first usable `query.Type` (`activity`). Runtime `query.Type` enumerated 80 keys in this account, and `CUSTOMER` was not among them, so the probe chose its type from the enum instead of assuming one.

## Decision

Supports [issue 262](https://github.com/headintheclouddev/typings-suitescript-2.1/issues/262) (closed) and [pull request 464](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/464) (merged). Its typings match: `columns` accepts `Column | CreateColumnOptions | CreateColumnWithFormulaOptions` and `condition` accepts `Condition | CreateConditionOptions | CreateConditionWithFormulaOptions`. No further change.
