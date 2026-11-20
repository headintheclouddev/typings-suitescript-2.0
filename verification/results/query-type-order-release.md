# query.Type member for the order release line

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0, and again on 2026-11-19 with the record type checks
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [query-type-order-release](../probes/query-type-order-release.js)

## Test

```js
/**
 * Is the `query.Type` member for the order release line `ORDER_RELEASE_LIN` (as
 * Oracle spells it) or `ORDER_RELEASE_LINE`? An enum member is a property
 * lookup, so a wrong spelling in the typings returns undefined. The member may
 * depend on a feature that the account has to enable.
 *
 * Supports pull request #395.
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
    t("count of query.Type keys", () => Object.keys(query.Type).length);
    t("keys matching RELEASE or ORDER", () =>
      Object.keys(query.Type).filter((k) => /RELEASE|ORDER/.test(k)),
    );
    t("query.Type.ORDER_RELEASE_LINE", () => query.Type.ORDER_RELEASE_LINE);
    t("query.Type.ORDER_RELEASE_LIN", () => query.Type.ORDER_RELEASE_LIN);
    t("values matching orderrelease", () =>
      Object.keys(query.Type)
        .filter((k) => /orderrelease/i.test(String(query.Type[k])))
        .map((k) => `${k}=${query.Type[k]}`),
    );
    // Is the record type itself available, whatever the enum says?
    t("query.create with type orderreleaseline", () => {
      query.create({ type: "orderreleaseline" });
      return "created";
    });
    t("SuiteQL table orderreleaseline", () => {
      query.runSuiteQL({ query: "SELECT COUNT(*) AS n FROM orderreleaseline" });
      return "exists";
    });
    return result;
  },
}));
```

## Results

```json
{
  "count of query.Type keys": 80,
  "keys matching RELEASE or ORDER": [],
  "values matching orderrelease": []
}
```

### Rerun under suitescript-verify 2.0.0 (2026-11-19)

The runner now runs as a role that the deploy writes (token login, REST web services, and what probes declare), which may also hold permissions that other projects' probes declare, instead of the earlier hand-built role. `query.Type` then enumerated 78 keys, and `CUSTOMER` was among them (earlier: 80 keys, no `CUSTOMER`). So the members of `query.Type` at runtime depend on the role's permissions, not only on the account's features.

Still no key contains `RELEASE` or `ORDER`, and no value is `orderrelease...`.

### Rerun with the record type checks (2026-11-19)

The probe now also asks whether the record type itself exists, whatever the enum says. The runner's role had more permissions by then (transaction and entity searches, declared by another probe), and `query.Type` grew to 97 keys:

```json
{
  "SuiteQL table orderreleaseline": "THROWS: SSS_SEARCH_ERROR_OCCURRED: Search error occurred: Record 'orderreleaseline' was not found.",
  "count of query.Type keys": 97,
  "keys matching RELEASE or ORDER": [
    "ORDERS_AND_RETURNS",
    "SALES_ORDER"
  ],
  "query.create with type orderreleaseline": "THROWS: INVALID_SEARCH_TYPE: Invalid search type: orderreleaseline",
  "values matching orderrelease": []
}
```

`ORDERS_AND_RETURNS` and `SALES_ORDER` are unrelated members that match the probe's `ORDER` pattern. In a second sandbox of the same company, a SuiteQL query for `orderreleaseline` from an administrator-level role also answered `Record 'orderreleaseline' was not found.`. So the record type looks missing from these accounts rather than hidden from the runner's role.

## Explanation

Inconclusive in this account. No run found an order release member in `query.Type` (80, 78 and 97 keys under different roles), and the record type `orderreleaseline` is not available here at all: `query.create` rejects it as an invalid type, and SuiteQL does not find the table (nor does it from an administrator-level role in a second sandbox). So the member depends on a feature this account has not enabled, and the result says nothing about which spelling NetSuite uses when it is on.

## Decision

[Pull request 395](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/395) (merged) keeps Oracle's documented spelling, `ORDER_RELEASE_LIN = "orderreleaseline"`. That spelling stays **unverified**: rerun this probe in an account with the order release feature enabled before changing it.
