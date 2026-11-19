# query.Type member for the order release line

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-14, rerun 2026-11-19 under suitescript-verify 2.0.0
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

## Explanation

Inconclusive in this account. Runtime `query.Type` has 80 keys, and none contains `RELEASE` or `ORDER`, nor is any value `orderrelease...`. So neither `ORDER_RELEASE_LIN` nor `ORDER_RELEASE_LINE` exists here. The probe's header expected this: the member probably depends on a feature the account has not enabled, or, since the enum changes with the role (see the rerun above), on a permission the runner's role lacks. The result says nothing about which spelling Oracle uses when the feature is on.

## Decision

[Pull request 395](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/395) (merged) keeps Oracle's documented spelling, `ORDER_RELEASE_LIN = "orderreleaseline"`. That spelling stays **unverified**: rerun this probe in an account with the order release feature enabled before changing it.
