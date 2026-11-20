# Result.getText on a select column with an empty value

- **NetSuite version:** 2026.2
- **Account type:** sandbox
- **Date:** 2026-11-19
- **Method:** deployed RESTlet (the suitescript-verify runner)
- **Probe:** [search-result-gettext-empty-select](../probes/search-result-gettext-empty-select.js)

## Test

```js
/**
 * What does `Result.getText` return for a select column with an empty value,
 * such as a transaction's `salesrep` when no sales rep is set? Oracle says
 * getText is "Used on select, image, and document fields". The typings say
 * `string`; on text columns getText returns null (see
 * search-result-getvalue-options). If an empty select column also returns null,
 * documented code meets null too.
 * Read-only. Returns plain data only (value types, no ids or values).
 *
 * Supports pull request #469.
 *
 * @NApiVersion 2.1
 * @scriptType Restlet
 * @permission TRAN_FIND VIEW
 * @permission TRAN_SALESORD VIEW
 * @permission TRAN_CUSTINVC VIEW
 * @permission LIST_CUSTJOB VIEW
 * @permission LIST_EMPLOYEE VIEW
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
    const shape = (v) =>
      v === null
        ? "null"
        : v === undefined
          ? "undefined"
          : v === ""
            ? "empty string"
            : typeof v === "string"
              ? "non-empty string"
              : Array.isArray(v)
                ? "array"
                : typeof v;
    // Run one search and describe getValue/getText on its first result, in the
    // Column form and the options form. No value is returned, only its shape.
    const describe = (type, filters, name, join, summary) => {
      const column = search.createColumn({ name, join, summary });
      const columns = [column];
      if (!summary) columns.push(search.createColumn({ name: "internalid" }));
      const rows = search
        .create({ type, filters, columns })
        .run()
        .getRange({ start: 0, end: 1 });
      if (!rows.length) return "no matching result in this account";
      const r = rows[0];
      const options = { name };
      if (join) options.join = join;
      if (summary) options.summary = summary;
      return {
        "getValue(column)": shape(r.getValue(column)),
        "getText(column)": shape(r.getText(column)),
        "getText(options)": shape(r.getText(options)),
      };
    };
    const NONE = "@NONE@";
    const cases = {
      // The example from the review: a transaction with no sales rep.
      "salesorder salesrep, empty": ["salesorder", [["mainline", "is", "T"], "and", ["salesrep", "anyof", NONE]], "salesrep"],
      "salesorder salesrep, set": ["salesorder", [["mainline", "is", "T"], "and", ["salesrep", "noneof", NONE]], "salesrep"],
      "invoice salesrep, empty": ["invoice", [["mainline", "is", "T"], "and", ["salesrep", "anyof", NONE]], "salesrep"],
      "salesorder department, empty": ["salesorder", [["mainline", "is", "T"], "and", ["department", "anyof", NONE]], "department"],
      "salesorder department, set": ["salesorder", [["mainline", "is", "T"], "and", ["department", "noneof", NONE]], "department"],
      "customer salesrep, empty": ["customer", [["salesrep", "anyof", NONE]], "salesrep"],
      "employee supervisor, empty": ["employee", [["supervisor", "anyof", NONE]], "supervisor"],
      "employee supervisor, set": ["employee", [["supervisor", "noneof", NONE]], "supervisor"],
    };
    for (const [key, [type, filters, name]] of Object.entries(cases)) {
      t(key, () => describe(type, filters, name));
    }
    // A joined select column with an empty value: the customer's sales rep.
    t("salesorder customer.salesrep (joined), empty", () =>
      describe(
        "salesorder",
        [["mainline", "is", "T"], "and", ["customer.salesrep", "anyof", NONE]],
        "salesrep",
        "customer",
      ),
    );
    // A summary (GROUP) select column whose group is empty.
    t("salesorder salesrep, GROUP, empty", () =>
      describe(
        "salesorder",
        [["mainline", "is", "T"], "and", ["salesrep", "anyof", NONE]],
        "salesrep",
        undefined,
        search.Summary.GROUP,
      ),
    );
    return result;
  },
}));
```

## Results

```json
{
  "customer salesrep, empty": {
    "getText(column)": "empty string",
    "getText(options)": "empty string",
    "getValue(column)": "empty string"
  },
  "employee supervisor, empty": "THROWS: YOU_CANNOT_PERFORM_THIS_SEARCH_BECAUSE_YOU_DO_NOT_HAVE_PERMISSION_TO_ACCESS_EMPLOYEE_DATA: You cannot perform this search because you do not have permission to access employee data. For more information, contact your system administrator.",
  "employee supervisor, set": "THROWS: YOU_CANNOT_PERFORM_THIS_SEARCH_BECAUSE_YOU_DO_NOT_HAVE_PERMISSION_TO_ACCESS_EMPLOYEE_DATA: You cannot perform this search because you do not have permission to access employee data. For more information, contact your system administrator.",
  "invoice salesrep, empty": {
    "getText(column)": "empty string",
    "getText(options)": "empty string",
    "getValue(column)": "empty string"
  },
  "salesorder customer.salesrep (joined), empty": {
    "getText(column)": "empty string",
    "getText(options)": "empty string",
    "getValue(column)": "empty string"
  },
  "salesorder department, empty": {
    "getText(column)": "empty string",
    "getText(options)": "empty string",
    "getValue(column)": "empty string"
  },
  "salesorder department, set": {
    "getText(column)": "non-empty string",
    "getText(options)": "non-empty string",
    "getValue(column)": "non-empty string"
  },
  "salesorder salesrep, GROUP, empty": {
    "getText(column)": "non-empty string",
    "getText(options)": "non-empty string",
    "getValue(column)": "empty string"
  },
  "salesorder salesrep, empty": {
    "getText(column)": "empty string",
    "getText(options)": "empty string",
    "getValue(column)": "empty string"
  },
  "salesorder salesrep, set": {
    "getText(column)": "non-empty string",
    "getText(options)": "non-empty string",
    "getValue(column)": "non-empty string"
  }
}
```

## Explanation

On a select column with no value, `getText` returns an empty string, not `null`. This held for a transaction's `salesrep` (sales orders and invoices), a sales order's `department`, a customer's `salesrep`, and the customer's `salesrep` joined from a sales order, in both the `search.Column` form and the options form. `getValue` returned an empty string for the same columns. With a value set, both methods return a non-empty string.

A grouped (`search.Summary.GROUP`) select column whose group is empty is different: `getText` returns a non-empty text for the empty group while `getValue` returns an empty string. The probe returns only the type of each value, so this page doesn't record what that text is.

The two employee cases failed on a permission (`YOU_CANNOT_PERFORM_THIS_SEARCH_BECAUSE_YOU_DO_NOT_HAVE_PERMISSION_TO_ACCESS_EMPLOYEE_DATA`) even with `LIST_EMPLOYEE` at View. They aren't needed for the answer, since the other select columns agree.

Together with [search-result-getvalue-options](search-result-getvalue-options.md), where `getText` on text columns returned `null`: `getText` returns `null` only when it is used on a column without a text representation, where Oracle's [Result.getText](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_460663391112.html) page says to use `getValue` ("Used on select, image, and document fields"). Used as documented, it returns a string, empty when the field is empty.

## Decision

[Pull request 469](https://github.com/headintheclouddev/typings-suitescript-2.1/pull/469) keeps the return type `string`, as the maintainer suggested for this outcome, and its JSDoc says when `getText` returns an empty string and when `null`.
