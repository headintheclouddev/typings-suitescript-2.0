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
