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
