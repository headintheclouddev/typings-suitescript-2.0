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
